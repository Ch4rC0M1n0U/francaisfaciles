/**
 * FrançaisPro - Service de base de données SQLite
 * Gestion des utilisateurs, progression, badges et exercices
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
let initSqlJs: any;

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  class_level: string;
  age: number;
  email: string;
  password_hash: string;
  level: number;
  xp: number;
  xp_to_next_level: number;
  streak_days: number;
  total_exercises: number;
  correct_answers: number;
  created_at: string;
  last_login: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  module: string;
  progress: number;
  skill_level: number;
  exercises_completed: number;
  accuracy: number;
  updated_at: string;
}

interface Badge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

interface Exercise {
  id: string;
  user_id: string;
  module: string;
  skill_id: string | null;
  question: string;
  options: string;
  correct_answer: number;
  user_answer: number | null;
  is_correct: boolean | null;
  difficulty: string;
  explanation: string;
  completed_at: string | null;
  time_spent: number | null;
}

interface UserSkill {
  id: string;
  user_id: string;
  skill_id: string;
  mastery_level: number; // 0-100
  attempts: number;
  successes: number;
  last_practiced: string;
  needs_review: boolean;
}

class DatabaseService {
  private db: any = null;
  private SQL: any = null;
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;

  async initialize() {
    if (this.initialized) return;
    if (this.initializationPromise) return this.initializationPromise;

    this.initializationPromise = this.doInitialize();
    return this.initializationPromise;
  }

  private async doInitialize(): Promise<void> {
    try {
      if (!initSqlJs) {
        try {
          const sqlJsModule = await import('sql.js');
          initSqlJs = sqlJsModule.default || sqlJsModule.initSqlJs;
        } catch (error) {
          console.warn('Failed to load sql.js from npm, trying CDN fallback:', error);
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
          document.head.appendChild(script);
          
          await new Promise((resolve, reject) => {
            script.onload = () => {
              initSqlJs = (window as any).initSqlJs;
              resolve(void 0);
            };
            script.onerror = reject;
          });
        }
      }

      this.SQL = await initSqlJs({
        locateFile: (file: string) => {
          const sources = [
            `/node_modules/sql.js/dist/${file}`,
            `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
            `https://sql.js.org/dist/${file}`
          ];
          return sources[0];
        }
      });
      try {
        const savedDb = localStorage.getItem('french_app_db');
        if (savedDb) {
          const uint8Array = new Uint8Array(JSON.parse(savedDb));
          this.db = new this.SQL.Database(uint8Array);
        } else {
          this.db = new this.SQL.Database();
        }
      } catch (storageError) {
        console.warn('Failed to load database from localStorage, creating new:', storageError);
        this.db = new this.SQL.Database();
        localStorage.removeItem('french_app_db');
      }

      this.initializeTables();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      
      console.warn('Falling back to in-memory storage');
      this.createFallbackStorage();
      this.initialized = true;
    }
  }

  private createFallbackStorage() {
    const storage = {
      users: new Map(),
      user_progress: new Map(),
      user_badges: new Map(),
      exercises: new Map(),
      user_skills: new Map()
    };
    
    this.db = {
      exec: () => {},
      run: () => {},
      prepare: (query: string) => ({
        getAsObject: () => ({}),
        bind: () => {},
        step: () => false,
        get: () => null
      }),
      close: () => {},
      export: () => new Uint8Array()
    };
    
    console.warn('Database is running in fallback mode with limited functionality');
  }

  private saveToLocalStorage() {
    if (!this.db) return;
    try {
      if (typeof this.db.export === 'function') {
        const data = this.db.export();
        const buffer = Array.from(data);
        
        const dataSize = JSON.stringify(buffer).length;
        if (dataSize > 4 * 1024 * 1024) {
          console.warn('Database too large for localStorage, skipping save');
          return;
        }
        
        localStorage.setItem('french_app_db', JSON.stringify(buffer));
      }
    } catch (error) {
      console.error('Failed to save database to localStorage:', error);
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, clearing old data');
        localStorage.removeItem('french_app_db');
      }
    }
  }

  private initializeTables() {
    if (!this.db) return;

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        birth_date TEXT NOT NULL,
        class_level TEXT NOT NULL,
        age INTEGER NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        level INTEGER DEFAULT 1,
        xp INTEGER DEFAULT 0,
        xp_to_next_level INTEGER DEFAULT 300,
        streak_days INTEGER DEFAULT 0,
        total_exercises INTEGER DEFAULT 0,
        correct_answers INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        last_login TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        module TEXT NOT NULL,
        progress INTEGER DEFAULT 0,
        skill_level INTEGER DEFAULT 1,
        exercises_completed INTEGER DEFAULT 0,
        accuracy INTEGER DEFAULT 0,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, module)
      )
    `);

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_badges (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        badge_id TEXT NOT NULL,
        earned_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, badge_id)
      )
    `);

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        module TEXT NOT NULL,
        skill_id TEXT,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_answer INTEGER NOT NULL,
        user_answer INTEGER,
        is_correct BOOLEAN,
        difficulty TEXT NOT NULL,
        explanation TEXT NOT NULL,
        completed_at TEXT,
        time_spent INTEGER,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_skills (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        skill_id TEXT NOT NULL,
        mastery_level INTEGER DEFAULT 0,
        attempts INTEGER DEFAULT 0,
        successes INTEGER DEFAULT 0,
        last_practiced TEXT DEFAULT CURRENT_TIMESTAMP,
        needs_review BOOLEAN DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, skill_id)
      )
    `);

    this.saveToLocalStorage();
  }

  async createUser(
    username: string, 
    firstName: string, 
    lastName: string, 
    birthDate: string, 
    classLevel: string, 
    email: string, 
    password: string
  ): Promise<User> {
    await this.initialize();
    
    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);
    
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    try {
      this.db.run(`
        INSERT INTO users (id, username, first_name, last_name, birth_date, class_level, age, email, password_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [id, username, firstName, lastName, birthDate, classLevel, age, email, passwordHash]);

      const modules = ['orthographe', 'grammaire', 'vocabulaire', 'comprehension'];
      modules.forEach(module => {
        this.db.run(`
          INSERT INTO user_progress (id, user_id, module)
          VALUES (?, ?, ?)
        `, [uuidv4(), id, module]);
      });

      this.saveToLocalStorage();
      return this.getUserById(id)!;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    await this.initialize();
    
    try {
      const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
      const result = stmt.getAsObject([email]);
      
      if (!result.id) return null;
      
      const user = result as any;
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) return null;

      this.db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);
      this.saveToLocalStorage();

      return user as User;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  getUserById(id: string): User | null {
    if (!this.initialized || !this.db) return null;
    
    try {
      const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
      const result = stmt.getAsObject([id]);
      return result.id ? result as User : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  getUserProgress(userId: string): UserProgress[] {
    if (!this.initialized || !this.db) return [];
    
    try {
      const stmt = this.db.prepare('SELECT * FROM user_progress WHERE user_id = ?');
      const results: UserProgress[] = [];
      
      stmt.bind([userId]);
      while (stmt.step()) {
        results.push(stmt.getAsObject() as UserProgress);
      }
      
      return results;
    } catch (error) {
      console.error('Error getting user progress:', error);
      return [];
    }
  }

  updateUserProgress(userId: string, module: string, points: number): void {
    if (!this.initialized || !this.db) return;
    
    try {
      this.db.run(`
        UPDATE users 
        SET xp = xp + ?, 
            total_exercises = total_exercises + 1,
            correct_answers = correct_answers + ?
        WHERE id = ?
      `, [points, points > 0 ? 1 : 0, userId]);

      const user = this.getUserById(userId);
      if (user && user.xp >= user.xp_to_next_level) {
        const newLevel = user.level + 1;
        const newXpToNext = newLevel * 300;
        this.db.run(`
          UPDATE users 
          SET level = ?, xp_to_next_level = ?
          WHERE id = ?
        `, [newLevel, newXpToNext, userId]);
      }

      this.db.run(`
        UPDATE user_progress 
        SET progress = MIN(100, progress + ?),
            exercises_completed = exercises_completed + 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND module = ?
      `, [Math.floor(points / 10), userId, module]);

      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
  }

  getUserBadges(userId: string): string[] {
    if (!this.initialized || !this.db) return [];
    
    try {
      const stmt = this.db.prepare('SELECT badge_id FROM user_badges WHERE user_id = ?');
      const results: string[] = [];
      
      stmt.bind([userId]);
      while (stmt.step()) {
        const row = stmt.getAsObject() as { badge_id: string };
        results.push(row.badge_id);
      }
      
      return results;
    } catch (error) {
      console.error('Error getting user badges:', error);
      return [];
    }
  }

  addBadge(userId: string, badgeId: string): void {
    if (!this.initialized || !this.db) return;
    
    try {
      this.db.run(`
        INSERT OR IGNORE INTO user_badges (id, user_id, badge_id)
        VALUES (?, ?, ?)
      `, [uuidv4(), userId, badgeId]);
      
      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error adding badge:', error);
    }
  }

  saveExercise(exercise: Omit<Exercise, 'id' | 'created_at'>): void {
    if (!this.initialized || !this.db) return;
    
    const id = uuidv4();
    
    try {
      // Save exercise
      this.db.run(`
        INSERT INTO exercises (
          id, user_id, module, skill_id, question, options, correct_answer, 
          user_answer, is_correct, difficulty, explanation, completed_at, time_spent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id, exercise.user_id, exercise.module, exercise.skill_id, exercise.question,
        exercise.options, exercise.correct_answer, exercise.user_answer,
        exercise.is_correct, exercise.difficulty, exercise.explanation,
        exercise.completed_at, exercise.time_spent
      ]);

      if (exercise.skill_id && exercise.is_correct !== null) {
        this.updateSkillMastery(exercise.user_id, exercise.skill_id, exercise.is_correct);
      }

      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  }

  getUserExercises(userId: string, module?: string): Exercise[] {
    if (!this.initialized || !this.db) return [];
    
    try {
      let query = 'SELECT * FROM exercises WHERE user_id = ?';
      const params: any[] = [userId];
      
      if (module) {
        query += ' AND module = ?';
        params.push(module);
      }
      
      query += ' ORDER BY created_at DESC';
      
      const stmt = this.db.prepare(query);
      const results: Exercise[] = [];
      
      stmt.bind(params);
      while (stmt.step()) {
        results.push(stmt.getAsObject() as Exercise);
      }
      
      return results;
    } catch (error) {
      console.error('Error getting user exercises:', error);
      return [];
    }
  }

  updateSkillMastery(userId: string, skillId: string, isCorrect: boolean): void {
    if (!this.initialized || !this.db) return;
    
    try {
      const existingStmt = this.db.prepare('SELECT * FROM user_skills WHERE user_id = ? AND skill_id = ?');
      const existing = existingStmt.getAsObject([userId, skillId]);
      
      if (existing.id) {
        const newMastery = Math.min(100, Math.max(0, 
          existing.mastery_level + (isCorrect ? 10 : -5)
        ));
        
        this.db.run(`
          UPDATE user_skills SET
            attempts = attempts + 1,
            successes = successes + ?,
            mastery_level = ?,
            needs_review = ?,
            last_practiced = CURRENT_TIMESTAMP
          WHERE user_id = ? AND skill_id = ?
        `, [isCorrect ? 1 : 0, newMastery, newMastery < 80 ? 1 : 0, userId, skillId]);
      } else {
        this.db.run(`
          INSERT INTO user_skills (id, user_id, skill_id, attempts, successes, mastery_level, needs_review)
          VALUES (?, ?, ?, 1, ?, ?, ?)
        `, [uuidv4(), userId, skillId, isCorrect ? 1 : 0, isCorrect ? 10 : 0, isCorrect ? 0 : 1]);
      }
      
      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error updating skill mastery:', error);
    }
  }

  getUserSkills(userId: string): UserSkill[] {
    if (!this.initialized || !this.db) return [];
    
    try {
      const stmt = this.db.prepare('SELECT * FROM user_skills WHERE user_id = ? ORDER BY needs_review DESC, mastery_level ASC');
      const results: UserSkill[] = [];
      
      stmt.bind([userId]);
      while (stmt.step()) {
        results.push(stmt.getAsObject() as UserSkill);
      }
      
      return results;
    } catch (error) {
      console.error('Error getting user skills:', error);
      return [];
    }
  }

  getWeakSkills(userId: string, limit: number = 5): UserSkill[] {
    if (!this.initialized || !this.db) return [];
    
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM user_skills 
        WHERE user_id = ? AND (mastery_level < 70 OR needs_review = 1)
        ORDER BY mastery_level ASC, last_practiced ASC 
        LIMIT ?
      `);
      const results: UserSkill[] = [];
      
      stmt.bind([userId, limit]);
      while (stmt.step()) {
        results.push(stmt.getAsObject() as UserSkill);
      }
      
      return results;
    } catch (error) {
      console.error('Error getting weak skills:', error);
      return [];
    }
  }

  getRecentErrors(userId: string, module?: string, limit: number = 10): string[] {
    if (!this.initialized || !this.db) return [];
    
    try {
      let query = `
        SELECT question FROM exercises 
        WHERE user_id = ? AND is_correct = 0
      `;
      const params: any[] = [userId];
      
      if (module) {
        query += ' AND module = ?';
        params.push(module);
      }
      
      query += ' ORDER BY created_at DESC LIMIT ?';
      params.push(limit);
      
      const stmt = this.db.prepare(query);
      const results: string[] = [];
      
      stmt.bind(params);
      while (stmt.step()) {
        const row = stmt.getAsObject() as { question: string };
        results.push(row.question);
      }
      
      return results;
    } catch (error) {
      console.error('Error getting recent errors:', error);
      return [];
    }
  }

  close(): void {
    if (this.db) {
      this.saveToLocalStorage();
      this.db.close();
    }
  }

  isAIAvailable(): boolean {
    const errorCount = localStorage.getItem('ai_error_count');
    const lastErrorTime = localStorage.getItem('ai_last_error');
    
    if (errorCount && parseInt(errorCount) > 10) {
      const lastError = lastErrorTime ? parseInt(lastErrorTime) : 0;
      const now = Date.now();
      if (now - lastError < 3600000) {
        return false;
      }
    }
    
    return true;
  }

  recordAIError(): void {
    const errorCount = localStorage.getItem('ai_error_count');
    const newCount = errorCount ? parseInt(errorCount) + 1 : 1;
    localStorage.setItem('ai_error_count', newCount.toString());
    localStorage.setItem('ai_last_error', Date.now().toString());
  }

  resetAIErrors(): void {
    localStorage.removeItem('ai_error_count');
    localStorage.removeItem('ai_last_error');
  }

  checkAndAwardBadges(userId: string): string[] {
    if (!this.initialized || !this.db) return [];
    
    const user = this.getUserById(userId);
    if (!user) return [];
    
    const newBadges: string[] = [];
    
    try {
      const userBadges = this.getUserBadges(userId);
      
      if (user.total_exercises >= 1 && !userBadges.includes('first-exercise')) {
        this.addBadge(userId, 'first-exercise');
        newBadges.push('first-exercise');
      }
      
      if (user.streak_days >= 3 && !userBadges.includes('streak-3')) {
        this.addBadge(userId, 'streak-3');
        newBadges.push('streak-3');
      }
      
      if (user.streak_days >= 7 && !userBadges.includes('streak-7')) {
        this.addBadge(userId, 'streak-7');
        newBadges.push('streak-7');
      }
      
      const perfectCount = this.db.prepare(`
        SELECT COUNT(*) as count FROM exercises 
        WHERE user_id = ? AND is_correct = 1
      `).get([userId])?.count || 0;
      
      if (perfectCount >= 10 && !userBadges.includes('perfect-score')) {
        this.addBadge(userId, 'perfect-score');
        newBadges.push('perfect-score');
      }
      
      if (user.total_exercises >= 100 && !userBadges.includes('century-club')) {
        this.addBadge(userId, 'century-club');
        newBadges.push('century-club');
      }
      
      const progress = this.getUserProgress(userId);
      progress.forEach(p => {
        if (p.skill_level >= 3) {
          const badgeId = `${p.module}-master`;
          if (!userBadges.includes(badgeId)) {
            this.addBadge(userId, badgeId);
            newBadges.push(badgeId);
          }
        }
      });
      
    } catch (error) {
      console.error('Error checking badges:', error);
    }
    
    return newBadges;
  }

  getWeeklyActivity(userId: string): Array<{day: string, exercises: number, accuracy: number}> {
    if (!this.initialized || !this.db) return [];
    
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const weeklyData = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      
      try {
        const stmt = this.db.prepare(`
          SELECT 
            COUNT(*) as exercises,
            ROUND(AVG(CASE WHEN is_correct = 1 THEN 100.0 ELSE 0.0 END)) as accuracy
          FROM exercises 
          WHERE user_id = ? AND DATE(completed_at) = ? AND completed_at IS NOT NULL
        `);
        const dayData = stmt.getAsObject([userId, dateStr]);
        
        weeklyData.push({
          day: days[date.getDay()],
          exercises: dayData?.exercises || 0,
          accuracy: dayData?.accuracy || 0
        });
      } catch (error) {
        console.error('Error getting weekly activity for day:', dateStr, error);
        weeklyData.push({
          day: days[date.getDay()],
          exercises: 0,
          accuracy: 0
        });
      }
    }
    
    return weeklyData;
  }

  getPersonalizedRecommendations(userId: string): Array<{title: string, message: string, color: string, icon: string}> {
    if (!this.initialized || !this.db) return [];
    
    const user = this.getUserById(userId);
    const progress = this.getUserProgress(userId);
    const weakSkills = this.getWeakSkills(userId, 1);
    
    if (!user) return [];
    
    const recommendations = [];
    
    const weeklyStmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM exercises 
      WHERE user_id = ? AND completed_at >= date('now', '-7 days') AND completed_at IS NOT NULL
    `);
    const weeklyResult = weeklyStmt.getAsObject([userId]);
    const weeklyExercises = weeklyResult?.count || 0;
    
    if (weeklyExercises < 20) {
      recommendations.push({
        title: 'Objectif de la semaine',
        message: `Plus que ${20 - weeklyExercises} exercices pour atteindre ton objectif hebdomadaire ! 💪`,
        color: 'blue',
        icon: '🎯'
      });
    }
    
    const bestModule = progress.reduce((best, current) => 
      current.accuracy > (best?.accuracy || 0) ? current : best
    );
    
    if (bestModule && bestModule.accuracy >= 80) {
      const messages = [
        `Tu cartonnes en ${bestModule.module} ! Continue comme ça, champion ! 🌟`,
        `Bravo pour tes performances en ${bestModule.module} ! Tu es sur la bonne voie ! 🚀`,
        `Excellent travail en ${bestModule.module} ! Tu maîtrises de mieux en mieux ! 👏`
      ];
      recommendations.push({
        title: 'Point fort',
        message: messages[Math.floor(Math.random() * messages.length)],
        color: 'green',
        icon: '💪'
      });
    }
    
    if (weakSkills.length > 0) {
      const skill = weakSkills[0];
      const skillInfo = this.getSkillById ? this.getSkillById(skill.skill_id) : null;
      const messages = [
        `Concentre-toi sur ${skillInfo?.name || 'cette notion'} pour progresser encore plus ! 📈`,
        `Un petit effort sur ${skillInfo?.name || 'ce point'} et tu vas exploser tes scores ! 🎯`,
        `${skillInfo?.name || 'Cette compétence'} mérite ton attention, tu vas y arriver ! 💡`
      ];
      recommendations.push({
        title: 'Zone d\'amélioration',
        message: messages[Math.floor(Math.random() * messages.length)],
        color: 'orange',
        icon: '📈'
      });
    }
    
    return recommendations;
  }

  getUserStatistics(userId: string): {
    totalExercises: number;
    correctAnswers: number;
    accuracy: number;
    weeklyExercises: number;
    averageTimePerExercise: number;
  } {
    if (!this.initialized || !this.db) {
      return { totalExercises: 0, correctAnswers: 0, accuracy: 0, weeklyExercises: 0, averageTimePerExercise: 0 };
    }

    const user = this.getUserById(userId);
    const weeklyData = this.getWeeklyActivity(userId);
    const weeklyExercises = weeklyData.reduce((sum, day) => sum + day.exercises, 0);
    
    return {
      totalExercises: user?.total_exercises || 0,
      correctAnswers: user?.correct_answers || 0,
      accuracy: user && user.total_exercises > 0 ? Math.round((user.correct_answers / user.total_exercises) * 100) : 0,
      weeklyExercises,
      averageTimePerExercise: 0 // À implémenter si nécessaire
    };
  }

  updateUserProfile(userId: string, updates: Partial<User>): boolean {
    if (!this.initialized || !this.db) return false;
    
    try {
      const fields = Object.keys(updates).filter(key => key !== 'id');
      const values = fields.map(field => updates[field as keyof User]);
      
      if (fields.length === 0) return false;
      
      const setClause = fields.map(field => `${field} = ?`).join(', ');
      this.db.run(`UPDATE users SET ${setClause} WHERE id = ?`, [...values, userId]);
      
      this.saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  deleteUser(userId: string): boolean {
    if (!this.initialized || !this.db) return false;
    
    try {
      this.db.run('DELETE FROM exercises WHERE user_id = ?', [userId]);
      this.db.run('DELETE FROM user_skills WHERE user_id = ?', [userId]);
      this.db.run('DELETE FROM user_badges WHERE user_id = ?', [userId]);
      this.db.run('DELETE FROM user_progress WHERE user_id = ?', [userId]);
      this.db.run('DELETE FROM users WHERE id = ?', [userId]);
      
      this.saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  resetUserProgress(userId: string): boolean {
    if (!this.initialized || !this.db) return false;
    
    try {
      console.log('Début de la remise à zéro pour l\'utilisateur:', userId);
      
      this.db.run(`
        UPDATE users SET
          level = 1,
          xp = 0,
          xp_to_next_level = 300,
          streak_days = 0,
          total_exercises = 0,
          correct_answers = 0,
          last_login = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [userId]);
      
      console.log('Statistiques utilisateur remises à zéro');
      
      this.db.run(`
        UPDATE user_progress SET
          progress = 0,
          skill_level = 1,
          exercises_completed = 0,
          accuracy = 0,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `, [userId]);
      
      console.log('Progression des modules remise à zéro');
      
      const modules = ['orthographe', 'grammaire', 'vocabulaire', 'comprehension'];
      modules.forEach(module => {
        const existingStmt = this.db.prepare('SELECT id FROM user_progress WHERE user_id = ? AND module = ?');
        const existing = existingStmt.getAsObject([userId, module]);
        
        if (!existing.id) {
          this.db.run(`
            INSERT INTO user_progress (id, user_id, module, progress, skill_level, exercises_completed, accuracy)
            VALUES (?, ?, ?, 0, 1, 0, 0)
          `, [this.generateId(), userId, module]);
          console.log(`Module ${module} créé pour l'utilisateur`);
        }
      });
      
      this.db.run('DELETE FROM exercises WHERE user_id = ?', [userId]);
      console.log('Historique des exercices supprimé');
      
      this.db.run('DELETE FROM user_skills WHERE user_id = ?', [userId]);
      console.log('Compétences supprimées');
      
      this.db.run('DELETE FROM user_badges WHERE user_id = ?', [userId]);
      console.log('Badges supprimés');
      
      this.saveToLocalStorage();
      console.log('Remise à zéro terminée avec succès');
      return true;
    } catch (error) {
      console.error('Error resetting user progress:', error);
      return false;
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export const db = new DatabaseService();