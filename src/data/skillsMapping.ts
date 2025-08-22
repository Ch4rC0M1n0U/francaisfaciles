/**
 * FrançaisPro - Mapping des compétences françaises
 * Grille des compétences et notions pour l'analyse des points faibles
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

interface Skill {
  id: string;
  name: string;
  category: 'orthographe' | 'grammaire' | 'vocabulaire' | 'comprehension';
  difficulty: 'facile' | 'moyen' | 'difficile';
  prerequisites?: string[];
  keywords: string[];
  description: string;
}

export const skillsMapping: Skill[] = [
  {
    id: 'participe-passe-avoir',
    name: 'Participe passé avec avoir',
    category: 'orthographe',
    difficulty: 'moyen',
    keywords: ['participe passé', 'avoir', 'accord', 'COD'],
    description: 'Accord du participe passé avec l\'auxiliaire avoir'
  },
  {
    id: 'participe-passe-etre',
    name: 'Participe passé avec être',
    category: 'orthographe',
    difficulty: 'facile',
    keywords: ['participe passé', 'être', 'accord', 'sujet'],
    description: 'Accord du participe passé avec l\'auxiliaire être'
  },
  {
    id: 'verbes-er',
    name: 'Verbes du 1er groupe (-er)',
    category: 'orthographe',
    difficulty: 'facile',
    keywords: ['verbes', 'premier groupe', '-er', 'conjugaison'],
    description: 'Conjugaison des verbes en -er'
  },
  {
    id: 'verbes-ir',
    name: 'Verbes du 2ème groupe (-ir)',
    category: 'orthographe',
    difficulty: 'moyen',
    keywords: ['verbes', 'deuxième groupe', '-ir', 'conjugaison', '-issons'],
    description: 'Conjugaison des verbes en -ir (finir, choisir...)'
  },
  {
    id: 'verbes-irreguliers',
    name: 'Verbes irréguliers',
    category: 'orthographe',
    difficulty: 'difficile',
    prerequisites: ['verbes-er', 'verbes-ir'],
    keywords: ['verbes', 'irréguliers', 'troisième groupe'],
    description: 'Conjugaison des verbes irréguliers'
  },
  {
    id: 'homophones-a-as',
    name: 'Homophones à/a',
    category: 'orthographe',
    difficulty: 'facile',
    keywords: ['homophones', 'à', 'a', 'préposition', 'verbe avoir'],
    description: 'Distinction entre la préposition "à" et le verbe "a"'
  },
  {
    id: 'homophones-ou-ou',
    name: 'Homophones ou/où',
    category: 'orthographe',
    difficulty: 'facile',
    keywords: ['homophones', 'ou', 'où', 'conjonction', 'adverbe'],
    description: 'Distinction entre "ou" et "où"'
  },
  {
    id: 'homophones-son-sont',
    name: 'Homophones son/sont',
    category: 'orthographe',
    difficulty: 'moyen',
    keywords: ['homophones', 'son', 'sont', 'déterminant', 'verbe être'],
    description: 'Distinction entre "son" et "sont"'
  },
  {
    id: 'pluriel-noms',
    name: 'Pluriel des noms',
    category: 'orthographe',
    difficulty: 'moyen',
    keywords: ['pluriel', 'noms', '-s', '-x', 'exceptions'],
    description: 'Formation du pluriel des noms'
  },
  {
    id: 'accord-adjectifs',
    name: 'Accord des adjectifs',
    category: 'orthographe',
    difficulty: 'moyen',
    keywords: ['accord', 'adjectifs', 'genre', 'nombre'],
    description: 'Accord des adjectifs en genre et en nombre'
  },

  {
    id: 'nature-mots',
    name: 'Nature des mots',
    category: 'grammaire',
    difficulty: 'facile',
    keywords: ['nature', 'classe grammaticale', 'nom', 'verbe', 'adjectif'],
    description: 'Identification de la nature des mots'
  },
  {
    id: 'fonction-sujet',
    name: 'Fonction sujet',
    category: 'grammaire',
    difficulty: 'facile',
    keywords: ['fonction', 'sujet', 'qui est-ce qui', 'qu\'est-ce qui'],
    description: 'Identification du sujet dans une phrase'
  },
  {
    id: 'fonction-cod',
    name: 'Complément d\'objet direct',
    category: 'grammaire',
    difficulty: 'moyen',
    prerequisites: ['fonction-sujet'],
    keywords: ['COD', 'complément', 'objet direct', 'qui', 'quoi'],
    description: 'Identification du COD'
  },
  {
    id: 'fonction-coi',
    name: 'Complément d\'objet indirect',
    category: 'grammaire',
    difficulty: 'moyen',
    prerequisites: ['fonction-cod'],
    keywords: ['COI', 'complément', 'objet indirect', 'à qui', 'de quoi'],
    description: 'Identification du COI'
  },
  {
    id: 'propositions',
    name: 'Propositions subordonnées',
    category: 'grammaire',
    difficulty: 'difficile',
    prerequisites: ['fonction-sujet', 'fonction-cod'],
    keywords: ['proposition', 'subordonnée', 'relative', 'conjonctive'],
    description: 'Analyse des propositions subordonnées'
  },
  {
    id: 'temps-verbaux',
    name: 'Temps et modes verbaux',
    category: 'grammaire',
    difficulty: 'moyen',
    keywords: ['temps', 'modes', 'indicatif', 'subjonctif', 'conditionnel'],
    description: 'Reconnaissance des temps et modes'
  },

  {
    id: 'synonymes',
    name: 'Synonymes',
    category: 'vocabulaire',
    difficulty: 'facile',
    keywords: ['synonymes', 'sens proche', 'vocabulaire'],
    description: 'Identification et utilisation des synonymes'
  },
  {
    id: 'antonymes',
    name: 'Antonymes',
    category: 'vocabulaire',
    difficulty: 'facile',
    keywords: ['antonymes', 'contraires', 'sens opposé'],
    description: 'Identification et utilisation des antonymes'
  },
  {
    id: 'expressions-idiomatiques',
    name: 'Expressions idiomatiques',
    category: 'vocabulaire',
    difficulty: 'moyen',
    keywords: ['expressions', 'idiomatiques', 'sens figuré'],
    description: 'Compréhension des expressions françaises'
  },
  {
    id: 'registres-langue',
    name: 'Registres de langue',
    category: 'vocabulaire',
    difficulty: 'moyen',
    keywords: ['registre', 'familier', 'courant', 'soutenu'],
    description: 'Distinction des registres de langue'
  },
  {
    id: 'champ-lexical',
    name: 'Champ lexical',
    category: 'vocabulaire',
    difficulty: 'moyen',
    keywords: ['champ lexical', 'thème', 'vocabulaire spécialisé'],
    description: 'Identification des champs lexicaux'
  },

  {
    id: 'idee-principale',
    name: 'Idée principale',
    category: 'comprehension',
    difficulty: 'facile',
    keywords: ['idée principale', 'thème', 'sujet'],
    description: 'Identification de l\'idée principale d\'un texte'
  },
  {
    id: 'intentions-auteur',
    name: 'Intentions de l\'auteur',
    category: 'comprehension',
    difficulty: 'moyen',
    keywords: ['intention', 'but', 'persuader', 'informer', 'divertir'],
    description: 'Analyse des intentions de l\'auteur'
  },
  {
    id: 'sens-implicite',
    name: 'Sens implicite',
    category: 'comprehension',
    difficulty: 'difficile',
    prerequisites: ['idee-principale'],
    keywords: ['implicite', 'sous-entendu', 'inférence'],
    description: 'Compréhension du sens implicite'
  },
  {
    id: 'figures-style',
    name: 'Figures de style',
    category: 'comprehension',
    difficulty: 'difficile',
    keywords: ['métaphore', 'comparaison', 'personnification', 'figures'],
    description: 'Identification des figures de style'
  }
];

const getSkillsByCategory = (category: string): Skill[] => {
  return skillsMapping.filter(skill => skill.category === category);
};

export const getSkillById = (id: string): Skill | undefined => {
  return skillsMapping.find(skill => skill.id === id);
};

export const analyzeWeakSkills = (userErrors: string[]): string[] => {
  const skillFrequency: Record<string, number> = {};
  
  userErrors.forEach(error => {
    skillsMapping.forEach(skill => {
      const hasKeyword = skill.keywords.some(keyword => 
        error.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (hasKeyword) {
        skillFrequency[skill.id] = (skillFrequency[skill.id] || 0) + 1;
      }
    });
  });
  
  return Object.entries(skillFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([skillId]) => skillId);
};