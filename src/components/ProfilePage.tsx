/**
 * FrançaisPro - Page de profil utilisateur
 * Gestion des informations personnelles et paramètres du compte
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Calendar, GraduationCap, Trash2, Save, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { db } from '../services/database';
import bcrypt from 'bcryptjs';

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { currentUser, updateProfile, deleteAccount } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    firstName: currentUser?.first_name || '',
    lastName: currentUser?.last_name || '',
    email: currentUser?.email || '',
    birthDate: currentUser?.birth_date || '',
    classLevel: currentUser?.class_level || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!currentUser) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const handleSave = async () => {
    setErrors([]);
    setIsLoading(true);

    try {
      const newErrors: string[] = [];

      // Validation
      if (formData.firstName.length < 2) {
        newErrors.push('Le prénom doit contenir au moins 2 caractères');
      }
      if (formData.lastName.length < 2) {
        newErrors.push('Le nom doit contenir au moins 2 caractères');
      }
      if (!formData.email.includes('@')) {
        newErrors.push('Email invalide');
      }
      if (!formData.birthDate) {
        newErrors.push('La date de naissance est obligatoire');
      }
      if (!formData.classLevel) {
        newErrors.push('La classe est obligatoire');
      }

      // Password validation if changing
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          newErrors.push('Le mot de passe actuel est requis pour changer le mot de passe');
        }
        if (formData.newPassword.length < 6) {
          newErrors.push('Le nouveau mot de passe doit contenir au moins 6 caractères');
        }
        if (formData.newPassword !== formData.confirmPassword) {
          newErrors.push('Les nouveaux mots de passe ne correspondent pas');
        }
      }

      if (newErrors.length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      // Calculate age
      const birth = new Date(formData.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      const updates: any = {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        birth_date: formData.birthDate,
        class_level: formData.classLevel,
        age: age
      };

      // Handle password change
      if (formData.newPassword && formData.currentPassword) {
        const isCurrentPasswordValid = await bcrypt.compare(formData.currentPassword, currentUser.password_hash);
        if (!isCurrentPasswordValid) {
          setErrors(['Mot de passe actuel incorrect']);
          setIsLoading(false);
          return;
        }
        updates.password_hash = await bcrypt.hash(formData.newPassword, 10);
      }

      const success = await updateProfile(updates);
      if (success) {
        setIsEditing(false);
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
        alert('🎉 Profil mis à jour avec succès !');
      } else {
        setErrors(['Erreur lors de la mise à jour du profil']);
      }
    } catch (error) {
      setErrors(['Une erreur est survenue']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setIsLoading(true);
    try {
      const success = await deleteAccount();
      if (success) {
        alert('👋 Compte supprimé avec succès. À bientôt !');
      } else {
        alert('❌ Erreur lors de la suppression du compte');
      }
    } catch (error) {
      alert('❌ Une erreur est survenue');
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleResetProfile = async () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true);
      return;
    }

    setIsLoading(true);
    try {
      // Réinitialiser les données dans la base
      const resetSuccess = db.resetUserProgress(currentUser.id);
      if (resetSuccess) {
        // Forcer la mise à jour du contexte utilisateur
        const updatedUser = db.getUserById(currentUser.id);
        if (updatedUser) {
          await updateProfile(updatedUser);
        }
        alert('🔄 Profil remis à zéro avec succès ! Tu peux recommencer l\'aventure !');
        setShowResetConfirm(false);
        // Recharger la page pour s'assurer que tout est mis à jour
        window.location.reload();
      } else {
        alert('❌ Erreur lors de la remise à zéro du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la remise à zéro:', error);
      alert('❌ Une erreur est survenue');
    } finally {
      setIsLoading(false);
      setShowResetConfirm(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center space-x-2">
                <User className="h-8 w-8" />
                <span>Mon Profil</span>
              </h1>
              <p className="text-indigo-100">Gère tes informations personnelles</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              {errors.map((error, index) => (
                <p key={index} className="text-red-700 text-sm">{error}</p>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informations personnelles */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Informations personnelles</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Classe
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.classLevel}
                      onChange={(e) => handleInputChange('classLevel', e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                    >
                      <optgroup label="Collège">
                        <option value="6eme">6ème - Première année du collège</option>
                        <option value="5eme">5ème - Deuxième année du collège</option>
                        <option value="4eme">4ème - Troisième année du collège</option>
                        <option value="3eme">3ème - Dernière année du collège (Brevet)</option>
                      </optgroup>
                      <optgroup label="Lycée">
                        <option value="2nde">2nde - Seconde générale</option>
                        <option value="1ere">1ère - Première générale</option>
                        <option value="terminale">Terminale - Dernière année (Bac)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sécurité</h2>
              
              {isEditing && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe actuel
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Requis pour changer le mot de passe"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nouveau mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Laisser vide pour ne pas changer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le nouveau mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Confirmer le nouveau mot de passe"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Statistiques du compte */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Statistiques du compte</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Âge :</span>
                    <span className="font-medium">{currentUser.age} ans</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Niveau :</span>
                    <span className="font-medium">{currentUser.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">XP :</span>
                    <span className="font-medium">{currentUser.xp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exercices réalisés :</span>
                    <span className="font-medium">{currentUser.total_exercises}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Série actuelle :</span>
                    <span className="font-medium">{currentUser.streak_days} jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2"
                >
                  <User className="h-5 w-5" />
                  <span>Modifier le profil</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="h-5 w-5" />
                    <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        username: currentUser?.username || '',
                        firstName: currentUser?.first_name || '',
                        lastName: currentUser?.last_name || '',
                        email: currentUser?.email || '',
                        birthDate: currentUser?.birth_date || '',
                        classLevel: currentUser?.class_level || '',
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                      setErrors([]);
                    }}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              )}
              
              {!isEditing && (
                <button
                  onClick={handleResetProfile}
                  disabled={isLoading}
                  className={`${
                    showResetConfirm 
                      ? 'bg-orange-600 hover:bg-orange-700' 
                      : 'bg-orange-500 hover:bg-orange-600'
                  } text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50`}
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>
                    {showResetConfirm 
                      ? (isLoading ? 'Remise à zéro...' : 'Confirmer la remise à zéro') 
                      : 'Remettre à zéro'
                    }
                  </span>
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className={`${
                  showDeleteConfirm 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-red-500 hover:bg-red-600'
                } text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50`}
              >
                <Trash2 className="h-5 w-5" />
                <span>
                  {showDeleteConfirm 
                    ? (isLoading ? 'Suppression...' : 'Confirmer la suppression') 
                    : 'Supprimer le compte'
                  }
                </span>
              </button>
            </div>
          </div>

          {showResetConfirm && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800 text-sm">
                🔄 <strong>Attention !</strong> Cette action va remettre à zéro toute ta progression (niveau, XP, badges, exercices) mais conservera ton profil. Tu pourras recommencer l'aventure depuis le début !
              </p>
            </div>
          )}

          {showDeleteConfirm && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">
                ⚠️ <strong>Attention !</strong> Cette action est irréversible. Toutes tes données (progression, badges, exercices) seront définitivement supprimées.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};