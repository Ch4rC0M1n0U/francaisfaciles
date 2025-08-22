/**
 * FrançaisPro - Service IA pour génération d'exercices
 * Utilise l'API Gemini pour créer des exercices personnalisés
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { skillsMapping, getSkillById, analyzeWeakSkills } from '../data/skillsMapping';
import { db } from './database';
import { getRandomFallbackExercises, getFallbackExercisesByDifficulty, getFallbackExercisesByLevel, type FallbackExercise } from '../data/fallbackExercises';

interface ExerciseRequest {
  module: 'orthographe' | 'grammaire' | 'vocabulaire' | 'comprehension';
  difficulty: 'facile' | 'moyen' | 'difficile';
  userLevel: number;
  userId: string;
  focusSkills?: string[];
}

interface GeneratedExercise {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  skillId?: string;
}

class AIService {
  private gemini: GoogleGenerativeAI | null = null;
  private requestCount = 0;

  constructor() {
    this.initializeGemini();
  }

  private initializeGemini() {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (geminiKey) {
      this.gemini = new GoogleGenerativeAI(geminiKey);
    } else {
      throw new Error('La clé API Gemini est requise. Configurez VITE_GEMINI_API_KEY dans votre fichier .env');
    }
  }

  async generateExercise(request: ExerciseRequest): Promise<GeneratedExercise> {
    this.requestCount++;

    if (!db.isAIAvailable()) {
      console.log('IA indisponible, utilisation des exercices de secours');
      return this.getFallbackExercise(request.module, request.difficulty);
    }

    const weakSkills = db.getWeakSkills(request.userId, 3);
    const recentErrors = db.getRecentErrors(request.userId, request.module, 5);
    const targetSkills = request.focusSkills || analyzeWeakSkills(recentErrors);
    
    const user = db.getUserById(request.userId);
    const userProgress = db.getUserProgress(request.userId);
    const moduleProgress = userProgress.find(p => p.module === request.module);
    
    let autoDifficulty: 'facile' | 'moyen' | 'difficile' = 'facile';
    
    if (user) {
      if (['terminale', '1ere', '2nde'].includes(user.class_level)) {
        autoDifficulty = 'difficile';
      } else if (['3eme', '4eme'].includes(user.class_level)) {
        autoDifficulty = 'moyen';
      }
      
      if (moduleProgress) {
        if (moduleProgress.accuracy >= 85 && moduleProgress.skill_level >= 3) {
          autoDifficulty = 'difficile';
        } else if (moduleProgress.accuracy >= 70 && moduleProgress.skill_level >= 2) {
          autoDifficulty = 'moyen';
        } else {
          autoDifficulty = 'facile';
        }
      }
    }
    
    const adaptedRequest = { ...request, difficulty: autoDifficulty };
    const prompt = this.buildPrompt(adaptedRequest, weakSkills, targetSkills);
    
    try {
      const response = await this.generateWithGemini(prompt);
      const exercise = JSON.parse(response);
      exercise.difficulty = autoDifficulty;
      
      db.resetAIErrors();
      return exercise;
    } catch (error) {
      console.error('Erreur avec Gemini:', error);
      
      db.recordAIError();
      
      return this.getFallbackExercise(request.module, autoDifficulty);
    }
  }

  private async generateWithGemini(prompt: string): Promise<string> {
    if (!this.gemini) throw new Error('Gemini non initialisé');
    
    const model = this.gemini.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();
    
    if (responseText.startsWith('```json\n')) {
      responseText = responseText.substring(8);
    }
    if (responseText.startsWith('```json')) {
      responseText = responseText.substring(7);
    }
    if (responseText.endsWith('\n```')) {
      responseText = responseText.substring(0, responseText.length - 4);
    }
    if (responseText.endsWith('```')) {
      responseText = responseText.substring(0, responseText.length - 3);
    }
    
    return responseText.trim();
  }

  private buildPrompt(request: ExerciseRequest, weakSkills: any[], targetSkills: string[]): string {
    const user = db.getUserById(request.userId);
    const userAge = user?.age || 13;
    const userClass = user?.class_level || '4eme';
    
    const classDescriptions = {
      '6eme': 'Sixième (11-12 ans) - Début du collège, bases fondamentales',
      '5eme': 'Cinquième (12-13 ans) - Consolidation des acquis du primaire',
      '4eme': 'Quatrième (13-14 ans) - Approfondissement des notions',
      '3eme': 'Troisième (14-15 ans) - Préparation au Brevet des collèges',
      '2nde': 'Seconde (15-16 ans) - Entrée au lycée, niveau plus exigeant',
      '1ere': 'Première (16-17 ans) - Préparation au Baccalauréat',
      'terminale': 'Terminale (17-18 ans) - Niveau Baccalauréat, excellence requise'
    };
    
    const moduleDescriptions = {
      orthographe: "orthographe française (accords, conjugaisons, homophones, règles d'écriture)",
      grammaire: "grammaire française (nature des mots, fonctions syntaxiques, analyse de phrases)",
      vocabulaire: "vocabulaire français (synonymes, antonymes, expressions, sens des mots)",
      comprehension: "compréhension de texte (analyse, interprétation, sens implicite)"
    };

    let prompt = `GÉNÉRATION D'EXERCICE FRANÇAIS ADAPTATIF

PROFIL UTILISATEUR:
Âge: ${userAge} ans  
Classe: ${classDescriptions[userClass as keyof typeof classDescriptions] || userClass}
Module: ${moduleDescriptions[request.module]}
Niveau: ${request.userLevel}
Difficulté: ${request.difficulty}

`;

    if (weakSkills.length > 0) {
      prompt += `COMPÉTENCES À RENFORCER:
`;
      weakSkills.forEach((skill, index) => {
        const skillInfo = getSkillById(skill.skill_id);
        if (skillInfo) {
          prompt += `${index + 1}. ${skillInfo.name} (${skill.mastery_level}%) - ${skillInfo.description}
`;
        }
      });
      prompt += `
`;
    }

    if (targetSkills.length > 0) {
      prompt += `COMPÉTENCES CIBLÉES:
`;
      targetSkills.forEach(skillId => {
        const skill = getSkillById(skillId);
        if (skill) {
          prompt += `- ${skill.name}: ${skill.description}
`;
        }
      });
      prompt += `
`;
    }

    prompt += `INSTRUCTIONS:
1. Crée un exercice ciblé sur une compétence faible
2. Adapte au niveau ${userClass} (${userAge} ans)
3. Propose 4 options avec 3 pièges courants
4. Fournis une explication pédagogique claire
5. Réponds UNIQUEMENT avec le JSON demandé, sans texte supplémentaire

Format de réponse JSON exact:
{
  "question": "Question adaptée au niveau",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Explication pédagogique claire et détaillée",
  "skillId": "id_competence"
}

COMPÉTENCES DISPONIBLES:
${skillsMapping.filter(s => s.category === request.module).map(s => `- ${s.id}: ${s.name}`).join('\n')}

IMPORTANT: Réponds UNIQUEMENT avec le JSON, sans markdown ni texte supplémentaire.`;

    return prompt;
  }

  private getFallbackExercise(module: string, difficulty: string): GeneratedExercise {

    // Utiliser la base de données d'exercices de secours
    const fallbackExercises = getFallbackExercisesByDifficulty(
      module, 
      difficulty as 'facile' | 'moyen' | 'difficile', 
      1
    );
    
    if (fallbackExercises.length > 0) {
      const exercise = fallbackExercises[0];
      return {
        question: exercise.question,
        options: exercise.options,
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        difficulty: exercise.difficulty,
        skillId: exercise.skillId
      };
    }
    
    // Fallback ultime si aucun exercice trouvé
    return {
      question: "Exercice temporairement indisponible. Veuillez réessayer plus tard.",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      explanation: "Service temporairement indisponible.",
      difficulty: difficulty as 'facile' | 'moyen' | 'difficile',
      skillId: 'general'
    };
  }

  async generateAdaptiveExercises(request: ExerciseRequest, count: number = 5): Promise<GeneratedExercise[]> {
    if (!db.isAIAvailable()) {
      console.log('IA indisponible, utilisation des exercices de secours pour la série');
      const fallbackExercises = getRandomFallbackExercises(request.module, count);
      return fallbackExercises.map(exercise => ({
        question: exercise.question,
        options: exercise.options,
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        difficulty: exercise.difficulty,
        skillId: exercise.skillId
      }));
    }

    const exercises: GeneratedExercise[] = [];
    
    const weakSkills = db.getWeakSkills(request.userId, 10)
      .filter(skill => {
        const skillInfo = getSkillById(skill.skill_id);
        return skillInfo?.category === request.module;
      });
    
    for (let i = 0; i < count; i++) {
      try {
        const targetSkill = weakSkills[i % weakSkills.length];
        const focusSkills = targetSkill ? [targetSkill.skill_id] : [];
        
        const exercise = await this.generateExercise({
          ...request,
          focusSkills
        });
        
        exercises.push(exercise);
        
        if (i < count - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Erreur génération exercice ${i + 1}:`, error);
        
        db.recordAIError();
        
        const fallbackExercise = getFallbackExercisesByDifficulty(request.module, request.difficulty, 1)[0];
        if (fallbackExercise) {
          exercises.push({
            question: fallbackExercise.question,
            options: fallbackExercise.options,
            correctAnswer: fallbackExercise.correctAnswer,
            explanation: fallbackExercise.explanation,
            difficulty: fallbackExercise.difficulty,
            skillId: fallbackExercise.skillId
          });
        } else {
          exercises.push(this.getFallbackExercise(request.module, request.difficulty));
        }
      }
    }
    
    return exercises;
  }

  getCurrentProvider(): string {
    return 'gemini';
  }

  getRequestCount(): number {
    return this.requestCount;
  }
}

export const aiService = new AIService();