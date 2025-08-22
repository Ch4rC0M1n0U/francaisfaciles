/**
 * FrançaisPro - Modal d'authentification
 * Composant de connexion et inscription utilisateur
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React, { useState } from 'react';
import { X, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onRegister: (username: string, firstName: string, lastName: string, birthDate: string, classLevel: string, email: string, password: string) => Promise<boolean>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    classLevel: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    try {
      if (isLoginMode) {
        const success = await onLogin(formData.email, formData.password);
        if (success) {
          onClose();
          setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        } else {
          setErrors(['Email ou mot de passe incorrect']);
        }
      } else {
        // Validation
        const newErrors: string[] = [];
        if (formData.username.length < 3) {
          newErrors.push('Le nom d\'utilisateur doit contenir au moins 3 caractères');
        }
        if (formData.firstName.length < 2) {
          newErrors.push('Le prénom doit contenir au moins 2 caractères');
        }
        if (formData.lastName.length < 2) {
          newErrors.push('Le nom doit contenir au moins 2 caractères');
        }
        if (!formData.birthDate) {
          newErrors.push('La date de naissance est obligatoire');
        } else {
          const birthDate = new Date(formData.birthDate);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 10 || age > 18) {
            newErrors.push('L\'âge doit être entre 10 et 18 ans');
          }
        }
        if (!formData.classLevel) {
          newErrors.push('La classe est obligatoire');
        }
        if (formData.password.length < 6) {
          newErrors.push('Le mot de passe doit contenir au moins 6 caractères');
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.push('Les mots de passe ne correspondent pas');
        }
        if (!formData.email.includes('@')) {
          newErrors.push('Email invalide');
        }

        if (newErrors.length > 0) {
          setErrors(newErrors);
          setIsLoading(false);
          return;
        }

        const success = await onRegister(
          formData.username, 
          formData.firstName, 
          formData.lastName, 
          formData.birthDate, 
          formData.classLevel, 
          formData.email, 
          formData.password
        );
        if (success) {
          onClose();
          setFormData({ 
            username: '', 
            firstName: '', 
            lastName: '', 
            birthDate: '', 
            classLevel: '', 
            email: '', 
            password: '', 
            confirmPassword: '' 
          });
        } else {
          setErrors(['Erreur lors de la création du compte']);
        }
      }
    } catch (error) {
      setErrors(['Une erreur est survenue']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              {isLoginMode ? <LogIn className="h-6 w-6" /> : <UserPlus className="h-6 w-6" />}
              <span>{isLoginMode ? 'Connexion' : 'Inscription'}</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              {errors.map((error, index) => (
                <p key={index} className="text-red-700 text-sm">{error}</p>
              ))}
            </div>
          )}

          {!isLoginMode && (
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ton nom d'utilisateur"
                  required
                />
              </div>
            </div>
          )}

          {!isLoginMode && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ton prénom"
                  required
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ton nom de famille"
                  required
                />
              </div>
            </div>
          )}

          {!isLoginMode && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classe
                </label>
                <select
                  value={formData.classLevel}
                  onChange={(e) => handleInputChange('classLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Sélectionne ta classe</option>
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
          )}

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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ton.email@exemple.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ton mot de passe"
                required
              />
            </div>
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirme ton mot de passe"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Chargement...' : (isLoginMode ? 'Se connecter' : 'Créer mon compte')}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setErrors([]);
                setFormData({ 
                  username: '', 
                  firstName: '', 
                  lastName: '', 
                  birthDate: '', 
                  classLevel: '', 
                  email: '', 
                  password: '', 
                  confirmPassword: '' 
                });
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLoginMode 
                ? "Pas encore de compte ? S'inscrire" 
                : "Déjà un compte ? Se connecter"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};