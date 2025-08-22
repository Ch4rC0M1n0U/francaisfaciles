/**
 * FrançaisPro - Modal d'encouragement
 * Composant de motivation et félicitations pour l'utilisateur
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';
import { X, Star, Trophy, Zap, Heart, Target, Sparkles } from 'lucide-react';

interface EncouragementModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'streak' | 'perfect' | 'improvement' | 'persistence' | 'comeback' | 'milestone';
  data?: {
    streak?: number;
    score?: number;
    improvement?: number;
    exercises?: number;
    level?: number;
  };
}

export const EncouragementModal: React.FC<EncouragementModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  data = {} 
}) => {
  if (!isOpen) return null;

  const getEncouragementContent = () => {
    switch (type) {
      case 'streak':
        return {
          title: '🔥 Série Fantastique !',
          message: `Incroyable ! Tu viens de réussir ${data.streak} exercices d'affilée ! Tu es en feu ! 🚀`,
          color: 'orange',
          icon: Zap,
          animation: 'animate-pulse',
          quotes: [
            "« Que la force soit avec toi ! » - Star Wars ⚡",
            "« Tu es un sorcier, Harry ! » - Harry Potter 🧙‍♂️",
            "« I'll be back ! » - Terminator 🤖",
            "« Hakuna Matata ! » - Le Roi Lion 🦁",
            "« Tu peux voler ! » - Peter Pan ✈️"
          ],
          gif: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
        };

      case 'perfect':
        return {
          title: '💯 Score Parfait !',
          message: `Extraordinaire ! ${data.score}% de réussite ! Tu es un vrai génie du français ! 🧠✨`,
          color: 'green',
          icon: Trophy,
          animation: 'animate-bounce',
          quotes: [
            "« Tu es parfait ! » - Shrek 🏆",
            "« Impossible n'est pas français ! » - Napoléon 👑",
            "« Tu es un génie ! » - Aladdin 🧞‍♂️",
            "« Excellent ! » - Bill & Ted 🎸",
            "« Magnifique ! » - Zoolander 📸"
          ],
          gif: "https://media.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif"
        };

      case 'improvement':
        return {
          title: '📈 Progrès Remarquable !',
          message: `Bravo ! Tu t'es amélioré de ${data.improvement}% ! Tes efforts paient ! 💪`,
          color: 'blue',
          icon: Target,
          animation: 'animate-spin-slow',
          quotes: [
            "« Chaque jour est une nouvelle chance ! » - Raiponce 🌟",
            "« Tu grandis si vite ! » - Toy Story 🚀",
            "« L'avenir nous appartient ! » - Les Indestructibles 💪",
            "« Tu peux tout faire ! » - Zootopie 🦊",
            "« Crois en tes rêves ! » - Cendrillon ✨"
          ],
          gif: "https://media.giphy.com/media/3o7absbD7PbTFQa0c8/giphy.gif"
        };

      case 'persistence':
        return {
          title: '💪 Persévérance Admirable !',
          message: `Respect ! ${data.exercises} exercices réalisés ! Ta détermination est exemplaire ! 🎯`,
          color: 'purple',
          icon: Heart,
          animation: 'animate-pulse',
          quotes: [
            "« N'abandonne jamais ! » - Galaxy Quest 🚀",
            "« Ohana signifie famille ! » - Lilo & Stitch 🌺",
            "« Tu es plus brave que tu ne le crois ! » - Winnie l'Ourson 🐻",
            "« Garde espoir ! » - Star Wars 🌟",
            "« Tu es un héros ! » - Les Indestructibles 🦸‍♂️"
          ],
          gif: "https://media.giphy.com/media/3o6fJeAiIpk5EeoC8o/giphy.gif"
        };

      case 'comeback':
        return {
          title: '🎭 Retour Gagnant !',
          message: `Content de te revoir ! Tu nous as manqué ! Prêt à reprendre l'aventure ? 🚀`,
          color: 'indigo',
          icon: Sparkles,
          animation: 'animate-bounce',
          quotes: [
            "« Je suis de retour ! » - Terminator 🤖",
            "« Ça fait du bien de rentrer ! » - Le Hobbit 🏠",
            "« Hello there ! » - Star Wars 👋",
            "« Tu m'as manqué ! » - E.T. 👽",
            "« Bienvenue à la maison ! » - Maman j'ai raté l'avion 🏡"
          ],
          gif: "https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif"
        };

      case 'milestone':
        return {
          title: '🏆 Étape Franchie !',
          message: `Félicitations ! Tu viens d'atteindre le niveau ${data.level} ! 🎊`,
          color: 'yellow',
          icon: Star,
          animation: 'animate-spin-slow',
          quotes: [
            "« Tu as débloqué un nouveau niveau ! » - Wreck-It Ralph 🎮",
            "« Tu es le roi du monde ! » - Titanic 👑",
            "« Vers l'infini et au-delà ! » - Toy Story 🚀",
            "« Tu es une star ! » - A Star is Born ⭐",
            "« Champion du monde ! » - Rocky 🥊"
          ],
          gif: "https://media.giphy.com/media/3o6fJgEOrF1lky8WFa/giphy.gif"
        };

      default:
        return {
          title: '🌟 Bravo !',
          message: 'Continue comme ça, tu es sur la bonne voie !',
          color: 'blue',
          icon: Star,
          animation: 'animate-pulse',
          quotes: ['« May the force be with you ! » - Star Wars 🌟'],
          gif: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
        };
    }
  };

  const content = getEncouragementContent();
  const Icon = content.icon;
  const randomQuote = content.quotes[Math.floor(Math.random() * content.quotes.length)];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-bounce-in">
        {/* Header avec animation */}
        <div className={`bg-gradient-to-r from-${content.color}-400 via-${content.color}-500 to-${content.color}-600 p-6 text-white rounded-t-xl relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`${content.animation}`}>
                <Icon className="h-10 w-10" />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
              <p className={`text-${content.color}-100 text-lg`}>{content.message}</p>
            </div>
          </div>
        </div>

        {/* Corps de la modale */}
        <div className="p-6">
          {/* GIF humoristique */}
          {content.gif && (
            <div className="text-center mb-6">
              <img 
                src={content.gif} 
                alt="Encouragement GIF" 
                className="mx-auto rounded-lg shadow-md max-w-full h-32 object-cover"
                onError={(e) => {
                  // Fallback si le GIF ne charge pas
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Citation motivante */}
          <div className={`bg-${content.color}-50 border-l-4 border-${content.color}-500 p-4 rounded-r-lg mb-6`}>
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-bounce">🎬</div>
              <p className={`text-${content.color}-800 font-semibold text-lg italic`}>
                {randomQuote}
              </p>
            </div>
          </div>

          {/* Statistiques si disponibles */}
          {(data.streak || data.score || data.improvement || data.exercises) && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Tes performances</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {data.streak && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{data.streak}</div>
                    <div className="text-gray-600">réussites d'affilée</div>
                  </div>
                )}
                {data.score && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{data.score}%</div>
                    <div className="text-gray-600">de précision</div>
                  </div>
                )}
                {data.improvement && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">+{data.improvement}%</div>
                    <div className="text-gray-600">d'amélioration</div>
                  </div>
                )}
                {data.exercises && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{data.exercises}</div>
                    <div className="text-gray-600">exercices réalisés</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages d'encouragement supplémentaires */}
          <div className="text-center space-y-3">
            <div className="flex justify-center space-x-2">
              {['🎬', '🍿', '🎭', '🎪', '🎨'].map((emoji, index) => (
                <span 
                  key={index} 
                  className="text-2xl animate-bounce" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
            
            <p className="text-gray-600 text-sm">
              Comme au cinéma, tu es le héros de ton apprentissage ! 🎬
            </p>
          </div>

          {/* Bouton de fermeture */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className={`bg-gradient-to-r from-${content.color}-500 to-${content.color}-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-${content.color}-600 hover:to-${content.color}-700 transition-all duration-200 transform hover:scale-105 shadow-lg`}
            >
              Action ! 🎬
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};