// Base de données d'exercices de secours - 100 exercices par module
// Utilisée en cas de panne d'IA ou de dépassement de quota

export interface FallbackExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  skillId: string;
  level: number;
}

// ORTHOGRAPHE - 100 exercices complets
export const orthographeExercises: FallbackExercise[] = [
  // Niveau facile (1-2) - 50 exercices
  {
    id: 'ortho_001',
    question: 'Complétez : "Les enfants ont bien travail___ aujourd\'hui."',
    options: ['é', 'er', 'ée', 'és'],
    correctAnswer: 0,
    explanation: 'Le participe passé "travaillé" avec l\'auxiliaire avoir ne s\'accorde pas quand il n\'y a pas de COD placé avant.',
    difficulty: 'facile',
    skillId: 'participe-passe-avoir',
    level: 1
  },
  {
    id: 'ortho_002',
    question: 'Choisissez la bonne orthographe : "Elle est ___"',
    options: ['parti', 'partie', 'parties', 'partis'],
    correctAnswer: 1,
    explanation: 'Avec l\'auxiliaire être, le participe passé s\'accorde avec le sujet. "Elle" est féminin singulier.',
    difficulty: 'facile',
    skillId: 'participe-passe-etre',
    level: 1
  },
  {
    id: 'ortho_003',
    question: 'Complétez : "Je vais ___ l\'école."',
    options: ['a', 'à', 'as', 'ah'],
    correctAnswer: 1,
    explanation: '"À" est une préposition qui indique la direction. "A" est le verbe avoir conjugué.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },
  {
    id: 'ortho_004',
    question: 'Choisissez : "Tu veux du thé ___ du café ?"',
    options: ['ou', 'où', 'ous', 'oux'],
    correctAnswer: 0,
    explanation: '"Ou" exprime un choix entre deux possibilités. "Où" indique un lieu.',
    difficulty: 'facile',
    skillId: 'homophones-ou-ou',
    level: 1
  },
  {
    id: 'ortho_005',
    question: 'Complétez : "___ chien aboie."',
    options: ['Son', 'Sont', 'Sons', 'Sond'],
    correctAnswer: 0,
    explanation: '"Son" est un déterminant possessif. "Sont" est le verbe être conjugué.',
    difficulty: 'facile',
    skillId: 'homophones-son-sont',
    level: 1
  },
  {
    id: 'ortho_006',
    question: 'Pluriel de "cheval" :',
    options: ['chevals', 'chevaux', 'chevaus', 'chevales'],
    correctAnswer: 1,
    explanation: 'Les mots en -al font généralement leur pluriel en -aux.',
    difficulty: 'facile',
    skillId: 'pluriel-noms',
    level: 1
  },
  {
    id: 'ortho_007',
    question: 'Accordez : "Une robe ___"',
    options: ['bleu', 'bleue', 'bleus', 'bleues'],
    correctAnswer: 1,
    explanation: 'L\'adjectif s\'accorde avec le nom qu\'il qualifie. "Robe" est féminin singulier.',
    difficulty: 'facile',
    skillId: 'accord-adjectifs',
    level: 1
  },
  {
    id: 'ortho_008',
    question: 'Conjuguez "chanter" à la 1ère personne du singulier au présent :',
    options: ['je chante', 'je chantes', 'je chanter', 'je chanté'],
    correctAnswer: 0,
    explanation: 'Les verbes du 1er groupe se terminent par -e à la 1ère personne du singulier.',
    difficulty: 'facile',
    skillId: 'verbes-er',
    level: 1
  },
  {
    id: 'ortho_009',
    question: 'Complétez : "Ils ___ contents."',
    options: ['son', 'sont', 'sons', 'sond'],
    correctAnswer: 1,
    explanation: '"Sont" est le verbe être conjugué à la 3ème personne du pluriel.',
    difficulty: 'facile',
    skillId: 'homophones-son-sont',
    level: 1
  },
  {
    id: 'ortho_010',
    question: 'Choisissez : "Il ___ une pomme."',
    options: ['a', 'à', 'as', 'ah'],
    correctAnswer: 0,
    explanation: '"A" est le verbe avoir conjugué à la 3ème personne du singulier.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },
  {
    id: 'ortho_011',
    question: 'Pluriel de "bijou" :',
    options: ['bijous', 'bijoux', 'bijoues', 'bijous'],
    correctAnswer: 1,
    explanation: 'Les mots en -ou font généralement leur pluriel en -ous, sauf quelques exceptions dont "bijou" qui fait "bijoux".',
    difficulty: 'facile',
    skillId: 'pluriel-noms',
    level: 1
  },
  {
    id: 'ortho_012',
    question: 'Accordez : "Des fleurs ___"',
    options: ['rouge', 'rouges', 'rouge', 'rougent'],
    correctAnswer: 1,
    explanation: 'L\'adjectif s\'accorde en nombre avec le nom. "Fleurs" est pluriel.',
    difficulty: 'facile',
    skillId: 'accord-adjectifs',
    level: 1
  },
  {
    id: 'ortho_013',
    question: 'Conjuguez "finir" à la 2ème personne du singulier au présent :',
    options: ['tu finis', 'tu finit', 'tu fines', 'tu finir'],
    correctAnswer: 0,
    explanation: 'Les verbes du 2ème groupe se terminent par -is à la 2ème personne du singulier.',
    difficulty: 'facile',
    skillId: 'verbes-ir',
    level: 1
  },
  {
    id: 'ortho_014',
    question: 'Complétez : "___ vas-tu ?"',
    options: ['Ou', 'Où', 'Ous', 'Oux'],
    correctAnswer: 1,
    explanation: '"Où" indique un lieu et s\'utilise dans les questions de lieu.',
    difficulty: 'facile',
    skillId: 'homophones-ou-ou',
    level: 1
  },
  {
    id: 'ortho_015',
    question: 'Choisissez : "Les filles ___ parties."',
    options: ['son', 'sont', 'sons', 'sond'],
    correctAnswer: 1,
    explanation: '"Sont" est le verbe être conjugué à la 3ème personne du pluriel.',
    difficulty: 'facile',
    skillId: 'homophones-son-sont',
    level: 1
  },
  {
    id: 'ortho_016',
    question: 'Complétez : "Tu ___ raison."',
    options: ['a', 'à', 'as', 'ah'],
    correctAnswer: 2,
    explanation: '"As" est le verbe avoir conjugué à la 2ème personne du singulier.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },
  {
    id: 'ortho_017',
    question: 'Pluriel de "eau" :',
    options: ['eaus', 'eaux', 'eaues', 'eauxs'],
    correctAnswer: 1,
    explanation: 'Les mots en -eau font leur pluriel en -eaux.',
    difficulty: 'facile',
    skillId: 'pluriel-noms',
    level: 1
  },
  {
    id: 'ortho_018',
    question: 'Accordez : "Un chat ___"',
    options: ['noir', 'noire', 'noirs', 'noires'],
    correctAnswer: 0,
    explanation: 'L\'adjectif s\'accorde avec le nom. "Chat" est masculin singulier.',
    difficulty: 'facile',
    skillId: 'accord-adjectifs',
    level: 1
  },
  {
    id: 'ortho_019',
    question: 'Conjuguez "parler" à la 3ème personne du pluriel au présent :',
    options: ['ils parlent', 'ils parles', 'ils parlons', 'ils parlez'],
    correctAnswer: 0,
    explanation: 'Les verbes du 1er groupe se terminent par -ent à la 3ème personne du pluriel.',
    difficulty: 'facile',
    skillId: 'verbes-er',
    level: 1
  },
  {
    id: 'ortho_020',
    question: 'Complétez : "Elle est allée ___ Paris."',
    options: ['a', 'à', 'as', 'ah'],
    correctAnswer: 1,
    explanation: '"À" est une préposition qui indique la destination.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },
  {
    id: 'ortho_021',
    question: 'Pluriel de "nez" :',
    options: ['nezs', 'nez', 'nezes', 'nezx'],
    correctAnswer: 1,
    explanation: 'Les mots terminés par -z ne changent pas au pluriel.',
    difficulty: 'facile',
    skillId: 'pluriel-noms',
    level: 1
  },
  {
    id: 'ortho_022',
    question: 'Accordez : "Des voitures ___"',
    options: ['rapide', 'rapides', 'rapidement', 'rapidité'],
    correctAnswer: 1,
    explanation: 'L\'adjectif s\'accorde en nombre avec le nom qu\'il qualifie.',
    difficulty: 'facile',
    skillId: 'accord-adjectifs',
    level: 1
  },
  {
    id: 'ortho_023',
    question: 'Conjuguez "manger" à la 1ère personne du pluriel au présent :',
    options: ['nous mangons', 'nous mangeons', 'nous mangons', 'nous mangions'],
    correctAnswer: 1,
    explanation: 'Les verbes en -ger prennent un "e" devant "o" pour conserver le son [ʒ].',
    difficulty: 'facile',
    skillId: 'verbes-er',
    level: 1
  },
  {
    id: 'ortho_024',
    question: 'Complétez : "C\'est ___ ami."',
    options: ['son', 'sont', 'sons', 'sond'],
    correctAnswer: 0,
    explanation: '"Son" est un déterminant possessif qui accompagne le nom "ami".',
    difficulty: 'facile',
    skillId: 'homophones-son-sont',
    level: 1
  },
  {
    id: 'ortho_025',
    question: 'Choisissez : "Veux-tu venir ___ rester ?"',
    options: ['ou', 'où', 'ous', 'oux'],
    correctAnswer: 0,
    explanation: '"Ou" exprime une alternative, un choix entre deux possibilités.',
    difficulty: 'facile',
    skillId: 'homophones-ou-ou',
    level: 1
  },
  {
    id: 'ortho_026',
    question: 'Complétez : "Elle ___ une belle voix."',
    options: ['a', 'à', 'as', 'ah'],
    correctAnswer: 0,
    explanation: '"A" est le verbe avoir conjugué à la 3ème personne du singulier.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },
  {
    id: 'ortho_027',
    question: 'Pluriel de "jeu" :',
    options: ['jeus', 'jeux', 'jeues', 'jeu'],
    correctAnswer: 1,
    explanation: 'Les mots en -eu font généralement leur pluriel en -eux.',
    difficulty: 'facile',
    skillId: 'pluriel-noms',
    level: 1
  },
  {
    id: 'ortho_028',
    question: 'Accordez : "Une maison ___"',
    options: ['blanc', 'blanche', 'blancs', 'blanches'],
    correctAnswer: 1,
    explanation: 'L\'adjectif s\'accorde en genre avec le nom. "Maison" est féminin.',
    difficulty: 'facile',
    skillId: 'accord-adjectifs',
    level: 1
  },
  {
    id: 'ortho_029',
    question: 'Conjuguez "regarder" à la 2ème personne du pluriel au présent :',
    options: ['vous regardez', 'vous regarder', 'vous regardes', 'vous regardons'],
    correctAnswer: 0,
    explanation: 'Les verbes du 1er groupe se terminent par -ez à la 2ème personne du pluriel.',
    difficulty: 'facile',
    skillId: 'verbes-er',
    level: 1
  },
  {
    id: 'ortho_030',
    question: 'Complétez : "Elles ___ arrivées."',
    options: ['son', 'sont', 'sons', 'sond'],
    correctAnswer: 1,
    explanation: '"Sont" est le verbe être conjugué à la 3ème personne du pluriel.',
    difficulty: 'facile',
    skillId: 'homophones-son-sont',
    level: 1
  },
  {
    id: 'ortho_031',
    question: 'Choisissez : "La maison ___ j\'habite"',
    options: ['ou', 'où', 'ous', 'oux'],
    correctAnswer: 1,
    explanation: '"Où" est un pronom relatif qui indique le lieu.',
    difficulty: 'facile',
    skillId: 'homophones-ou-ou',
    level: 1
  },
  {
    id: 'ortho_032',
    question: 'Complétez : "Nous ___ de la chance."',
    options: ['a', 'à', 'avons', 'avez'],
    correctAnswer: 2,
    explanation: '"Avons" est le verbe avoir conjugué à la 1ère personne du pluriel.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },
  {
    id: 'ortho_033',
    question: 'Pluriel de "chou" :',
    options: ['chous', 'choux', 'choues', 'chou'],
    correctAnswer: 1,
    explanation: 'Le mot "chou" fait partie des exceptions en -ou qui prennent un x au pluriel.',
    difficulty: 'facile',
    skillId: 'pluriel-noms',
    level: 1
  },
  {
    id: 'ortho_034',
    question: 'Accordez : "Des livres ___"',
    options: ['intéressant', 'intéressants', 'intéressante', 'intéressantes'],
    correctAnswer: 1,
    explanation: 'L\'adjectif s\'accorde avec le nom. "Livres" est masculin pluriel.',
    difficulty: 'facile',
    skillId: 'accord-adjectifs',
    level: 1
  },
  {
    id: 'ortho_035',
    question: 'Conjuguez "commencer" à la 3ème personne du singulier au présent :',
    options: ['il commence', 'il commance', 'il commençe', 'il commences'],
    correctAnswer: 0,
    explanation: 'Les verbes en -cer gardent le "c" devant "e" et "i".',
    difficulty: 'facile',
    skillId: 'verbes-er',
    level: 1
  },
  {
    id: 'ortho_036',
    question: 'Complétez : "___ livre est à moi."',
    options: ['Son', 'Sont', 'Sons', 'Sond'],
    correctAnswer: 0,
    explanation: '"Son" est un déterminant possessif qui accompagne le nom "livre".',
    difficulty: 'facile',
    skillId: 'homophones-son-sont',
    level: 1
  },
  {
    id: 'ortho_037',
    question: 'Choisissez : "Préfères-tu le thé ___ le café ?"',
    options: ['ou', 'où', 'ous', 'oux'],
    correctAnswer: 0,
    explanation: '"Ou" exprime un choix, une alternative entre deux éléments.',
    difficulty: 'facile',
    skillId: 'homophones-ou-ou',
    level: 1
  },
  {
    id: 'ortho_038',
    question: 'Complétez : "Il ___ faim."',
    options: ['a', 'à', 'as', 'ah'],
    correctAnswer: 0,
    explanation: '"A" est le verbe avoir conjugué à la 3ème personne du singulier.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },
  {
    id: 'ortho_039',
    question: 'Pluriel de "prix" :',
    options: ['prixs', 'prix', 'prixes', 'prixx'],
    correctAnswer: 1,
    explanation: 'Les mots terminés par -x ne changent pas au pluriel.',
    difficulty: 'facile',
    skillId: 'pluriel-noms',
    level: 1
  },
  {
    id: 'ortho_040',
    question: 'Accordez : "Une histoire ___"',
    options: ['drôle', 'drôles', 'drôlement', 'drôlerie'],
    correctAnswer: 0,
    explanation: 'L\'adjectif s\'accorde avec le nom. "Histoire" est féminin singulier.',
    difficulty: 'facile',
    skillId: 'accord-adjectifs',
    level: 1
  },
  {
    id: 'ortho_041',
    question: 'Conjuguez "jouer" à la 1ère personne du singulier au présent :',
    options: ['je joue', 'je joues', 'je jouer', 'je joué'],
    correctAnswer: 0,
    explanation: 'Les verbes du 1er groupe se terminent par -e à la 1ère personne du singulier.',
    difficulty: 'facile',
    skillId: 'verbes-er',
    level: 1
  },
  {
    id: 'ortho_042',
    question: 'Complétez : "Mes amis ___ gentils."',
    options: ['son', 'sont', 'sons', 'sond'],
    correctAnswer: 1,
    explanation: '"Sont" est le verbe être conjugué à la 3ème personne du pluriel.',
    difficulty: 'facile',
    skillId: 'homophones-son-sont',
    level: 1
  },
  {
    id: 'ortho_043',
    question: 'Choisissez : "Je ne sais pas ___ il est."',
    options: ['ou', 'où', 'ous', 'oux'],
    correctAnswer: 1,
    explanation: '"Où" indique le lieu dans une question indirecte.',
    difficulty: 'facile',
    skillId: 'homophones-ou-ou',
    level: 1
  },
  {
    id: 'ortho_044',
    question: 'Complétez : "Tu ___ de beaux yeux."',
    options: ['a', 'à', 'as', 'ah'],
    correctAnswer: 2,
    explanation: '"As" est le verbe avoir conjugué à la 2ème personne du singulier.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },
  {
    id: 'ortho_045',
    question: 'Pluriel de "animal" :',
    options: ['animals', 'animaux', 'animales', 'animal'],
    correctAnswer: 1,
    explanation: 'Les mots en -al font généralement leur pluriel en -aux.',
    difficulty: 'facile',
    skillId: 'pluriel-noms',
    level: 1
  },
  {
    id: 'ortho_046',
    question: 'Accordez : "Des chaussures ___"',
    options: ['noir', 'noire', 'noirs', 'noires'],
    correctAnswer: 3,
    explanation: 'L\'adjectif s\'accorde avec le nom. "Chaussures" est féminin pluriel.',
    difficulty: 'facile',
    skillId: 'accord-adjectifs',
    level: 1
  },
  {
    id: 'ortho_047',
    question: 'Conjuguez "danser" à la 3ème personne du pluriel au présent :',
    options: ['ils dansent', 'ils danses', 'ils dansons', 'ils dansez'],
    correctAnswer: 0,
    explanation: 'Les verbes du 1er groupe se terminent par -ent à la 3ème personne du pluriel.',
    difficulty: 'facile',
    skillId: 'verbes-er',
    level: 1
  },
  {
    id: 'ortho_048',
    question: 'Complétez : "___ père travaille."',
    options: ['Son', 'Sont', 'Sons', 'Sond'],
    correctAnswer: 0,
    explanation: '"Son" est un déterminant possessif qui accompagne le nom "père".',
    difficulty: 'facile',
    skillId: 'homophones-son-sont',
    level: 1
  },
  {
    id: 'ortho_049',
    question: 'Choisissez : "Viens-tu aujourd\'hui ___ demain ?"',
    options: ['ou', 'où', 'ous', 'oux'],
    correctAnswer: 0,
    explanation: '"Ou" exprime une alternative temporelle entre deux moments.',
    difficulty: 'facile',
    skillId: 'homophones-ou-ou',
    level: 1
  },
  {
    id: 'ortho_050',
    question: 'Complétez : "Je vais ___ la piscine."',
    options: ['a', 'à', 'as', 'ah'],
    correctAnswer: 1,
    explanation: '"À" est une préposition qui indique la destination.',
    difficulty: 'facile',
    skillId: 'homophones-a-as',
    level: 1
  },

  // Niveau moyen (3) - 30 exercices
  {
    id: 'ortho_051',
    question: 'Accordez le participe passé : "Les lettres qu\'il a ___"',
    options: ['écrit', 'écrite', 'écrits', 'écrites'],
    correctAnswer: 3,
    explanation: 'Le participe passé avec avoir s\'accorde avec le COD placé avant. "Lettres" est féminin pluriel.',
    difficulty: 'moyen',
    skillId: 'participe-passe-avoir',
    level: 3
  },
  {
    id: 'ortho_052',
    question: 'Choisissez : "Elles se sont ___"',
    options: ['lavé', 'lavée', 'lavés', 'lavées'],
    correctAnswer: 3,
    explanation: 'Avec un verbe pronominal, le participe passé s\'accorde avec le sujet quand le pronom est COD.',
    difficulty: 'moyen',
    skillId: 'participe-passe-etre',
    level: 3
  },
  {
    id: 'ortho_053',
    question: 'Conjuguez "voir" au passé composé, 1ère personne :',
    options: ['j\'ai vue', 'j\'ai vu', 'j\'ai vus', 'j\'ai vues'],
    correctAnswer: 1,
    explanation: 'Le participe passé "vu" ne s\'accorde pas car il n\'y a pas de COD placé avant.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_054',
    question: 'Pluriel de "travail" :',
    options: ['travails', 'travaux', 'travaus', 'travales'],
    correctAnswer: 1,
    explanation: 'Certains mots en -ail font leur pluriel en -aux, comme "travail/travaux".',
    difficulty: 'moyen',
    skillId: 'pluriel-noms',
    level: 3
  },
  {
    id: 'ortho_055',
    question: 'Accordez : "Une demi-___"',
    options: ['heure', 'heures', 'heur', 'heurt'],
    correctAnswer: 0,
    explanation: 'Dans les mots composés avec "demi", le nom reste au singulier.',
    difficulty: 'moyen',
    skillId: 'accord-adjectifs',
    level: 3
  },
  {
    id: 'ortho_056',
    question: 'Conjuguez "prendre" au présent, 3ème personne pluriel :',
    options: ['ils prendent', 'ils prennent', 'ils prenent', 'ils prendrent'],
    correctAnswer: 1,
    explanation: 'Le verbe "prendre" fait "ils prennent" au présent (double n).',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_057',
    question: 'Choisissez : "Quoi que tu ___"',
    options: ['face', 'faces', 'fasse', 'fasses'],
    correctAnswer: 2,
    explanation: '"Quoi que" est suivi du subjonctif. "Faire" donne "fasse" au subjonctif.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_058',
    question: 'Accordez : "Ci-___ les documents"',
    options: ['joint', 'jointe', 'joints', 'jointes'],
    correctAnswer: 2,
    explanation: '"Ci-joint" s\'accorde quand il est placé après le nom. "Documents" est masculin pluriel.',
    difficulty: 'moyen',
    skillId: 'accord-adjectifs',
    level: 3
  },
  {
    id: 'ortho_059',
    question: 'Pluriel de "pneu" :',
    options: ['pneus', 'pneux', 'pneues', 'pneu'],
    correctAnswer: 0,
    explanation: 'Les mots en -eu font généralement leur pluriel en -eux, sauf "pneu" qui fait "pneus".',
    difficulty: 'moyen',
    skillId: 'pluriel-noms',
    level: 3
  },
  {
    id: 'ortho_060',
    question: 'Conjuguez "courir" au futur, 1ère personne :',
    options: ['je courrai', 'je courrais', 'je courrerai', 'je courerai'],
    correctAnswer: 0,
    explanation: 'Le verbe "courir" fait "je courrai" au futur (double r).',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_061',
    question: 'Accordez le participe passé : "La robe qu\'elle a ___"',
    options: ['porté', 'portée', 'portés', 'portées'],
    correctAnswer: 1,
    explanation: 'Le participe passé s\'accorde avec le COD "robe" (féminin singulier) placé avant.',
    difficulty: 'moyen',
    skillId: 'participe-passe-avoir',
    level: 3
  },
  {
    id: 'ortho_062',
    question: 'Choisissez : "Elles se sont ___ les mains"',
    options: ['lavé', 'lavée', 'lavés', 'lavées'],
    correctAnswer: 0,
    explanation: 'Le participe passé ne s\'accorde pas car "les mains" est COD placé après.',
    difficulty: 'moyen',
    skillId: 'participe-passe-etre',
    level: 3
  },
  {
    id: 'ortho_063',
    question: 'Conjuguez "aller" au conditionnel, 2ème personne :',
    options: ['tu iras', 'tu irais', 'tu ailles', 'tu allais'],
    correctAnswer: 1,
    explanation: 'Le verbe "aller" fait "tu irais" au conditionnel présent.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_064',
    question: 'Pluriel de "festival" :',
    options: ['festivals', 'festivaux', 'festivales', 'festival'],
    correctAnswer: 0,
    explanation: 'Le mot "festival" fait son pluriel en -s : "festivals".',
    difficulty: 'moyen',
    skillId: 'pluriel-noms',
    level: 3
  },
  {
    id: 'ortho_065',
    question: 'Accordez : "Des enfants ___"',
    options: ['tout petit', 'tous petits', 'toute petite', 'toutes petites'],
    correctAnswer: 1,
    explanation: '"Tout" s\'accorde avec le nom qu\'il détermine. "Enfants" est masculin pluriel.',
    difficulty: 'moyen',
    skillId: 'accord-adjectifs',
    level: 3
  },
  {
    id: 'ortho_066',
    question: 'Conjuguez "savoir" au subjonctif présent, 3ème personne :',
    options: ['qu\'il sait', 'qu\'il sache', 'qu\'il saura', 'qu\'il savait'],
    correctAnswer: 1,
    explanation: 'Le verbe "savoir" fait "qu\'il sache" au subjonctif présent.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_067',
    question: 'Choisissez : "Bien que tu ___"',
    options: ['es', 'sois', 'sera', 'étais'],
    correctAnswer: 1,
    explanation: '"Bien que" est suivi du subjonctif. "Être" donne "sois" au subjonctif.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_068',
    question: 'Accordez : "Une ___ d\'heure"',
    options: ['demi', 'demie', 'demis', 'demies'],
    correctAnswer: 0,
    explanation: 'Placé avant le nom, "demi" reste invariable.',
    difficulty: 'moyen',
    skillId: 'accord-adjectifs',
    level: 3
  },
  {
    id: 'ortho_069',
    question: 'Pluriel de "landau" :',
    options: ['landaus', 'landaux', 'landaues', 'landau'],
    correctAnswer: 0,
    explanation: 'Le mot "landau" fait son pluriel en -s : "landaus".',
    difficulty: 'moyen',
    skillId: 'pluriel-noms',
    level: 3
  },
  {
    id: 'ortho_070',
    question: 'Conjuguez "mourir" au passé composé, 3ème personne :',
    options: ['il a mort', 'il est mort', 'il a mourir', 'il est mourir'],
    correctAnswer: 1,
    explanation: 'Le verbe "mourir" se conjugue avec l\'auxiliaire être au passé composé.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_071',
    question: 'Accordez le participe passé : "Les fleurs qu\'il a ___"',
    options: ['cueilli', 'cueillie', 'cueillis', 'cueillies'],
    correctAnswer: 3,
    explanation: 'Le participe passé s\'accorde avec le COD "fleurs" (féminin pluriel) placé avant.',
    difficulty: 'moyen',
    skillId: 'participe-passe-avoir',
    level: 3
  },
  {
    id: 'ortho_072',
    question: 'Choisissez : "Elles se sont ___ au téléphone"',
    options: ['parlé', 'parlée', 'parlés', 'parlées'],
    correctAnswer: 0,
    explanation: 'Le participe passé ne s\'accorde pas car "se parler" signifie "parler l\'une à l\'autre" (COI).',
    difficulty: 'moyen',
    skillId: 'participe-passe-etre',
    level: 3
  },
  {
    id: 'ortho_073',
    question: 'Conjuguez "venir" au passé simple, 3ème personne :',
    options: ['il vint', 'il venit', 'il venait', 'il viendra'],
    correctAnswer: 0,
    explanation: 'Le verbe "venir" fait "il vint" au passé simple.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_074',
    question: 'Pluriel de "détail" :',
    options: ['détails', 'détaux', 'détales', 'détail'],
    correctAnswer: 0,
    explanation: 'Le mot "détail" fait son pluriel en -s : "détails".',
    difficulty: 'moyen',
    skillId: 'pluriel-noms',
    level: 3
  },
  {
    id: 'ortho_075',
    question: 'Accordez : "Trois ___ heures"',
    options: ['demi', 'demie', 'demis', 'demies'],
    correctAnswer: 1,
    explanation: 'Placé après le nom, "demi" s\'accorde en genre seulement.',
    difficulty: 'moyen',
    skillId: 'accord-adjectifs',
    level: 3
  },
  {
    id: 'ortho_076',
    question: 'Conjuguez "pouvoir" au subjonctif présent, 1ère personne :',
    options: ['que je peux', 'que je puisse', 'que je pourrai', 'que je pouvais'],
    correctAnswer: 1,
    explanation: 'Le verbe "pouvoir" fait "que je puisse" au subjonctif présent.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_077',
    question: 'Choisissez : "Pour que tu ___"',
    options: ['comprends', 'comprennes', 'comprendras', 'comprenais'],
    correctAnswer: 1,
    explanation: '"Pour que" est suivi du subjonctif. "Comprendre" donne "comprennes".',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },
  {
    id: 'ortho_078',
    question: 'Accordez : "___ joint la facture"',
    options: ['Ci', 'Cie', 'Cis', 'Cies'],
    correctAnswer: 0,
    explanation: 'En début de phrase, "ci-joint" reste invariable.',
    difficulty: 'moyen',
    skillId: 'accord-adjectifs',
    level: 3
  },
  {
    id: 'ortho_079',
    question: 'Pluriel de "bleu" (couleur) :',
    options: ['bleus', 'bleux', 'bleues', 'bleu'],
    correctAnswer: 0,
    explanation: 'Les adjectifs de couleur simples s\'accordent normalement.',
    difficulty: 'moyen',
    skillId: 'pluriel-noms',
    level: 3
  },
  {
    id: 'ortho_080',
    question: 'Conjuguez "tenir" au futur, 2ème personne :',
    options: ['tu tiendras', 'tu teniras', 'tu tiendrais', 'tu tenais'],
    correctAnswer: 0,
    explanation: 'Le verbe "tenir" fait "tu tiendras" au futur.',
    difficulty: 'moyen',
    skillId: 'verbes-irreguliers',
    level: 3
  },

  // Niveau difficile (4-5) - 20 exercices
  {
    id: 'ortho_081',
    question: 'Accordez : "Les vingt premières pages que j\'ai ___"',
    options: ['lu', 'lue', 'lus', 'lues'],
    correctAnswer: 3,
    explanation: 'Le participe passé s\'accorde avec le COD "pages" (féminin pluriel) placé avant.',
    difficulty: 'difficile',
    skillId: 'participe-passe-avoir',
    level: 4
  },
  {
    id: 'ortho_082',
    question: 'Choisissez : "Elle s\'est ___ de ses erreurs"',
    options: ['aperçu', 'aperçue', 'aperçus', 'aperçues'],
    correctAnswer: 0,
    explanation: 'Avec "s\'apercevoir de", le participe passé ne s\'accorde pas car "de ses erreurs" est COI.',
    difficulty: 'difficile',
    skillId: 'participe-passe-etre',
    level: 4
  },
  {
    id: 'ortho_083',
    question: 'Conjuguez "résoudre" au passé simple, 3ème personne :',
    options: ['il résolut', 'il résolva', 'il résolvit', 'il résouda'],
    correctAnswer: 0,
    explanation: 'Le verbe "résoudre" fait "il résolut" au passé simple.',
    difficulty: 'difficile',
    skillId: 'verbes-irreguliers',
    level: 4
  },
  {
    id: 'ortho_084',
    question: 'Pluriel de "aïeul" (grand-père) :',
    options: ['aïeuls', 'aïeux', 'aïeules', 'aïeul'],
    correctAnswer: 1,
    explanation: 'Au sens de "grands-parents", "aïeul" fait "aïeux" au pluriel.',
    difficulty: 'difficile',
    skillId: 'pluriel-noms',
    level: 4
  },
  {
    id: 'ortho_085',
    question: 'Accordez : "Des robes ___ clair"',
    options: ['vert', 'verte', 'verts', 'vertes'],
    correctAnswer: 0,
    explanation: 'Les adjectifs de couleur composés (vert clair) restent invariables.',
    difficulty: 'difficile',
    skillId: 'accord-adjectifs',
    level: 4
  },
  {
    id: 'ortho_086',
    question: 'Conjuguez "vaincre" au présent, 3ème personne singulier :',
    options: ['il vainc', 'il vainque', 'il vainct', 'il vaincs'],
    correctAnswer: 0,
    explanation: 'Le verbe "vaincre" fait "il vainc" au présent (sans t).',
    difficulty: 'difficile',
    skillId: 'verbes-irreguliers',
    level: 4
  },
  {
    id: 'ortho_087',
    question: 'Choisissez : "Il faut que tu ___"',
    options: ['veuilles', 'veuille', 'veux', 'voudras'],
    correctAnswer: 1,
    explanation: '"Il faut que" est suivi du subjonctif. "Vouloir" donne "veuille".',
    difficulty: 'difficile',
    skillId: 'verbes-irreguliers',
    level: 4
  },
  {
    id: 'ortho_088',
    question: 'Accordez : "Feu ___ reine"',
    options: ['la', 'le', 'les', 'l\''],
    correctAnswer: 0,
    explanation: 'Placé avant l\'article, "feu" reste invariable.',
    difficulty: 'difficile',
    skillId: 'accord-adjectifs',
    level: 4
  },
  {
    id: 'ortho_089',
    question: 'Pluriel de "œil" :',
    options: ['œils', 'yeux', 'œiles', 'œil'],
    correctAnswer: 1,
    explanation: 'Le mot "œil" fait "yeux" au pluriel (forme supplétive).',
    difficulty: 'difficile',
    skillId: 'pluriel-noms',
    level: 4
  },
  {
    id: 'ortho_090',
    question: 'Conjuguez "coudre" au présent, 1ère personne pluriel :',
    options: ['nous cousons', 'nous coudons', 'nous cousons', 'nous coudrons'],
    correctAnswer: 0,
    explanation: 'Le verbe "coudre" fait "nous cousons" au présent.',
    difficulty: 'difficile',
    skillId: 'verbes-irreguliers',
    level: 4
  },
  {
    id: 'ortho_091',
    question: 'Accordez le participe passé : "Combien de livres as-tu ___ ?"',
    options: ['lu', 'lue', 'lus', 'lues'],
    correctAnswer: 2,
    explanation: 'Avec "combien de", le participe passé s\'accorde avec le complément sous-entendu (masculin pluriel).',
    difficulty: 'difficile',
    skillId: 'participe-passe-avoir',
    level: 4
  },
  {
    id: 'ortho_092',
    question: 'Choisissez : "Elles se sont ___ qu\'elles avaient tort"',
    options: ['rendu compte', 'rendue compte', 'rendus compte', 'rendues compte'],
    correctAnswer: 0,
    explanation: 'Dans "se rendre compte", le participe passé reste invariable (expression figée).',
    difficulty: 'difficile',
    skillId: 'participe-passe-etre',
    level: 4
  },
  {
    id: 'ortho_093',
    question: 'Conjuguez "croître" au passé simple, 1ère personne :',
    options: ['je crûs', 'je crus', 'je croîs', 'je crois'],
    correctAnswer: 0,
    explanation: 'Le verbe "croître" fait "je crûs" au passé simple (avec accent circonflexe).',
    difficulty: 'difficile',
    skillId: 'verbes-irreguliers',
    level: 4
  },
  {
    id: 'ortho_094',
    question: 'Pluriel de "monsieur" :',
    options: ['monsieurs', 'messieurs', 'monsieus', 'monsieur'],
    correctAnswer: 1,
    explanation: 'Le mot "monsieur" fait "messieurs" au pluriel (forme supplétive).',
    difficulty: 'difficile',
    skillId: 'pluriel-noms',
    level: 4
  },
  {
    id: 'ortho_095',
    question: 'Accordez : "Des tissus ___ orange"',
    options: ['orange', 'oranges', 'orangé', 'orangés'],
    correctAnswer: 0,
    explanation: 'Les adjectifs de couleur dérivés de noms (orange, marron...) restent invariables.',
    difficulty: 'difficile',
    skillId: 'accord-adjectifs',
    level: 4
  },
  {
    id: 'ortho_096',
    question: 'Conjuguez "absoudre" au présent, 2ème personne pluriel :',
    options: ['vous absolvez', 'vous absoudez', 'vous absolvons', 'vous absoudons'],
    correctAnswer: 0,
    explanation: 'Le verbe "absoudre" fait "vous absolvez" au présent.',
    difficulty: 'difficile',
    skillId: 'verbes-irreguliers',
    level: 4
  },
  {
    id: 'ortho_097',
    question: 'Choisissez : "Avant qu\'il ne ___"',
    options: ['part', 'parte', 'partira', 'partait'],
    correctAnswer: 1,
    explanation: '"Avant que" est suivi du subjonctif. "Partir" donne "parte".',
    difficulty: 'difficile',
    skillId: 'verbes-irreguliers',
    level: 4
  },
  {
    id: 'ortho_098',
    question: 'Accordez : "La ___ reine"',
    options: ['feu', 'feue', 'feus', 'feues'],
    correctAnswer: 1,
    explanation: 'Placé après l\'article, "feu" s\'accorde avec le nom.',
    difficulty: 'difficile',
    skillId: 'accord-adjectifs',
    level: 4
  },
  {
    id: 'ortho_099',
    question: 'Pluriel de "bonhomme" :',
    options: ['bonhommes', 'bonshommes', 'bonhomme', 'bonzhommes'],
    correctAnswer: 1,
    explanation: 'Le mot "bonhomme" fait "bonshommes" au pluriel.',
    difficulty: 'difficile',
    skillId: 'pluriel-noms',
    level: 4
  },
  {
    id: 'ortho_100',
    question: 'Conjuguez "choir" au futur, 3ème personne :',
    options: ['il choira', 'il cherra', 'il choiera', 'il choit'],
    correctAnswer: 1,
    explanation: 'Le verbe "choir" fait "il cherra" au futur (verbe défectif).',
    difficulty: 'difficile',
    skillId: 'verbes-irreguliers',
    level: 5
  }
];

// GRAMMAIRE - 100 exercices complets
export const grammaireExercises: FallbackExercise[] = [
  // Niveau facile (1-2) - 50 exercices
  {
    id: 'gram_001',
    question: 'Dans "Le chat mange", quelle est la nature du mot "chat" ?',
    options: ['Verbe', 'Nom', 'Adjectif', 'Adverbe'],
    correctAnswer: 1,
    explanation: '"Chat" est un nom commun qui désigne un animal.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_002',
    question: 'Dans "Marie court vite", qui fait l\'action ?',
    options: ['court', 'vite', 'Marie', 'personne'],
    correctAnswer: 2,
    explanation: '"Marie" est le sujet qui fait l\'action de courir.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_003',
    question: 'Dans "Il mange une pomme", que mange-t-il ?',
    options: ['Il', 'mange', 'une pomme', 'rien'],
    correctAnswer: 2,
    explanation: '"Une pomme" répond à la question "quoi ?" après le verbe. C\'est le COD.',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_004',
    question: 'Quelle est la nature du mot "rapidement" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 3,
    explanation: '"Rapidement" est un adverbe qui modifie le sens d\'un verbe, d\'un adjectif ou d\'un autre adverbe.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_005',
    question: 'Dans "Les oiseaux chantent", qui chante ?',
    options: ['Les', 'oiseaux', 'chantent', 'personne'],
    correctAnswer: 1,
    explanation: '"Les oiseaux" est le sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_006',
    question: 'Dans "Elle lit un livre", que lit-elle ?',
    options: ['Elle', 'lit', 'un livre', 'rien'],
    correctAnswer: 2,
    explanation: '"Un livre" est le complément d\'objet direct du verbe "lit".',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_007',
    question: 'Quelle est la nature du mot "beau" dans "un beau chien" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 2,
    explanation: '"Beau" est un adjectif qualificatif qui qualifie le nom "chien".',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_008',
    question: 'Dans "Paul et Marie jouent", qui joue ?',
    options: ['Paul', 'Marie', 'Paul et Marie', 'jouent'],
    correctAnswer: 2,
    explanation: '"Paul et Marie" forment ensemble le sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_009',
    question: 'Dans "Nous regardons la télé", que regardons-nous ?',
    options: ['Nous', 'regardons', 'la télé', 'rien'],
    correctAnswer: 2,
    explanation: '"La télé" répond à la question "quoi ?" C\'est le COD.',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_010',
    question: 'Quelle est la nature du mot "dormir" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 1,
    explanation: '"Dormir" est un verbe à l\'infinitif qui exprime une action.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_011',
    question: 'Dans "Mon frère travaille", qui travaille ?',
    options: ['Mon', 'frère', 'Mon frère', 'travaille'],
    correctAnswer: 2,
    explanation: '"Mon frère" est le groupe sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_012',
    question: 'Dans "Tu écris une lettre", qu\'écris-tu ?',
    options: ['Tu', 'écris', 'une lettre', 'rien'],
    correctAnswer: 2,
    explanation: '"Une lettre" est le complément d\'objet direct du verbe "écris".',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_013',
    question: 'Quelle est la nature du mot "très" dans "très grand" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 3,
    explanation: '"Très" est un adverbe d\'intensité qui modifie l\'adjectif "grand".',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_014',
    question: 'Dans "Le soleil brille", qu\'est-ce qui brille ?',
    options: ['Le', 'soleil', 'Le soleil', 'brille'],
    correctAnswer: 2,
    explanation: '"Le soleil" est le sujet qui fait l\'action de briller.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_015',
    question: 'Dans "Ils achètent du pain", qu\'achètent-ils ?',
    options: ['Ils', 'achètent', 'du pain', 'rien'],
    correctAnswer: 2,
    explanation: '"Du pain" répond à la question "quoi ?" C\'est le COD.',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_016',
    question: 'Quelle est la nature du mot "gentil" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 2,
    explanation: '"Gentil" est un adjectif qualificatif qui exprime une qualité.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_017',
    question: 'Dans "Mes parents arrivent", qui arrive ?',
    options: ['Mes', 'parents', 'Mes parents', 'arrivent'],
    correctAnswer: 2,
    explanation: '"Mes parents" est le groupe sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_018',
    question: 'Dans "Elle prend son sac", que prend-elle ?',
    options: ['Elle', 'prend', 'son sac', 'rien'],
    correctAnswer: 2,
    explanation: '"Son sac" est le complément d\'objet direct du verbe "prend".',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_019',
    question: 'Quelle est la nature du mot "souvent" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 3,
    explanation: '"Souvent" est un adverbe de fréquence qui indique la répétition.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_020',
    question: 'Dans "La pluie tombe", qu\'est-ce qui tombe ?',
    options: ['La', 'pluie', 'La pluie', 'tombe'],
    correctAnswer: 2,
    explanation: '"La pluie" est le sujet qui fait l\'action de tomber.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_021',
    question: 'Dans "Vous buvez de l\'eau", que buvez-vous ?',
    options: ['Vous', 'buvez', 'de l\'eau', 'rien'],
    correctAnswer: 2,
    explanation: '"De l\'eau" répond à la question "quoi ?" C\'est le COD.',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_022',
    question: 'Quelle est la nature du mot "courir" dans "J\'aime courir" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 1,
    explanation: '"Courir" est un verbe à l\'infinitif complément du verbe "aimer".',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_023',
    question: 'Dans "Ton chien aboie", qu\'est-ce qui aboie ?',
    options: ['Ton', 'chien', 'Ton chien', 'aboie'],
    correctAnswer: 2,
    explanation: '"Ton chien" est le groupe sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_024',
    question: 'Dans "Il dessine un arbre", que dessine-t-il ?',
    options: ['Il', 'dessine', 'un arbre', 'rien'],
    correctAnswer: 2,
    explanation: '"Un arbre" est le complément d\'objet direct du verbe "dessine".',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_025',
    question: 'Quelle est la nature du mot "hier" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 3,
    explanation: '"Hier" est un adverbe de temps qui indique le moment.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_026',
    question: 'Dans "Les enfants jouent", qui joue ?',
    options: ['Les', 'enfants', 'Les enfants', 'jouent'],
    correctAnswer: 2,
    explanation: '"Les enfants" est le sujet qui fait l\'action de jouer.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_027',
    question: 'Dans "Tu fais tes devoirs", que fais-tu ?',
    options: ['Tu', 'fais', 'tes devoirs', 'rien'],
    correctAnswer: 2,
    explanation: '"Tes devoirs" répond à la question "quoi ?" C\'est le COD.',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_028',
    question: 'Quelle est la nature du mot "rouge" dans "une voiture rouge" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 2,
    explanation: '"Rouge" est un adjectif qualificatif qui qualifie le nom "voiture".',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_029',
    question: 'Dans "Sa sœur chante", qui chante ?',
    options: ['Sa', 'sœur', 'Sa sœur', 'chante'],
    correctAnswer: 2,
    explanation: '"Sa sœur" est le groupe sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_030',
    question: 'Dans "Nous entendons de la musique", qu\'entendons-nous ?',
    options: ['Nous', 'entendons', 'de la musique', 'rien'],
    correctAnswer: 2,
    explanation: '"De la musique" est le complément d\'objet direct du verbe "entendons".',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_031',
    question: 'Quelle est la nature du mot "bien" dans "bien jouer" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 3,
    explanation: '"Bien" est un adverbe de manière qui modifie le verbe "jouer".',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_032',
    question: 'Dans "Le train part", qu\'est-ce qui part ?',
    options: ['Le', 'train', 'Le train', 'part'],
    correctAnswer: 2,
    explanation: '"Le train" est le sujet qui fait l\'action de partir.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_033',
    question: 'Dans "Elle porte une robe", que porte-t-elle ?',
    options: ['Elle', 'porte', 'une robe', 'rien'],
    correctAnswer: 2,
    explanation: '"Une robe" répond à la question "quoi ?" C\'est le COD.',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_034',
    question: 'Quelle est la nature du mot "petit" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 2,
    explanation: '"Petit" est un adjectif qualificatif qui exprime une qualité de taille.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_035',
    question: 'Dans "Nos amis viennent", qui vient ?',
    options: ['Nos', 'amis', 'Nos amis', 'viennent'],
    correctAnswer: 2,
    explanation: '"Nos amis" est le groupe sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_036',
    question: 'Dans "Il ouvre la porte", qu\'ouvre-t-il ?',
    options: ['Il', 'ouvre', 'la porte', 'rien'],
    correctAnswer: 2,
    explanation: '"La porte" est le complément d\'objet direct du verbe "ouvre".',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_037',
    question: 'Quelle est la nature du mot "maintenant" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 3,
    explanation: '"Maintenant" est un adverbe de temps qui indique le moment présent.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_038',
    question: 'Dans "Cette fleur sent bon", qu\'est-ce qui sent bon ?',
    options: ['Cette', 'fleur', 'Cette fleur', 'sent'],
    correctAnswer: 2,
    explanation: '"Cette fleur" est le sujet qui fait l\'action de sentir.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_039',
    question: 'Dans "Vous cherchez vos clés", que cherchez-vous ?',
    options: ['Vous', 'cherchez', 'vos clés', 'rien'],
    correctAnswer: 2,
    explanation: '"Vos clés" répond à la question "quoi ?" C\'est le COD.',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_040',
    question: 'Quelle est la nature du mot "joli" dans "un joli jardin" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 2,
    explanation: '"Joli" est un adjectif qualificatif qui qualifie le nom "jardin".',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_041',
    question: 'Dans "Leur voiture roule", qu\'est-ce qui roule ?',
    options: ['Leur', 'voiture', 'Leur voiture', 'roule'],
    correctAnswer: 2,
    explanation: '"Leur voiture" est le groupe sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_042',
    question: 'Dans "Tu manges une pomme", que manges-tu ?',
    options: ['Tu', 'manges', 'une pomme', 'rien'],
    correctAnswer: 2,
    explanation: '"Une pomme" est le complément d\'objet direct du verbe "manges".',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_043',
    question: 'Quelle est la nature du mot "beaucoup" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 3,
    explanation: '"Beaucoup" est un adverbe de quantité qui exprime l\'intensité.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_044',
    question: 'Dans "Mon père lit", qui lit ?',
    options: ['Mon', 'père', 'Mon père', 'lit'],
    correctAnswer: 2,
    explanation: '"Mon père" est le sujet qui fait l\'action de lire.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_045',
    question: 'Dans "Ils construisent une maison", que construisent-ils ?',
    options: ['Ils', 'construisent', 'une maison', 'rien'],
    correctAnswer: 2,
    explanation: '"Une maison" répond à la question "quoi ?" C\'est le COD.',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_046',
    question: 'Quelle est la nature du mot "intelligent" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 2,
    explanation: '"Intelligent" est un adjectif qualificatif qui exprime une qualité intellectuelle.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_047',
    question: 'Dans "Ces oiseaux volent", qu\'est-ce qui vole ?',
    options: ['Ces', 'oiseaux', 'Ces oiseaux', 'volent'],
    correctAnswer: 2,
    explanation: '"Ces oiseaux" est le groupe sujet de la phrase.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },
  {
    id: 'gram_048',
    question: 'Dans "Elle apprend sa leçon", qu\'apprend-elle ?',
    options: ['Elle', 'apprend', 'sa leçon', 'rien'],
    correctAnswer: 2,
    explanation: '"Sa leçon" est le complément d\'objet direct du verbe "apprend".',
    difficulty: 'facile',
    skillId: 'fonction-cod',
    level: 1
  },
  {
    id: 'gram_049',
    question: 'Quelle est la nature du mot "doucement" ?',
    options: ['Nom', 'Verbe', 'Adjectif', 'Adverbe'],
    correctAnswer: 3,
    explanation: '"Doucement" est un adverbe de manière qui modifie un verbe.',
    difficulty: 'facile',
    skillId: 'nature-mots',
    level: 1
  },
  {
    id: 'gram_050',
    question: 'Dans "Le vent souffle", qu\'est-ce qui souffle ?',
    options: ['Le', 'vent', 'Le vent', 'souffle'],
    correctAnswer: 2,
    explanation: '"Le vent" est le sujet qui fait l\'action de souffler.',
    difficulty: 'facile',
    skillId: 'fonction-sujet',
    level: 1
  },

  // Niveau moyen (3) - 30 exercices
  {
    id: 'gram_051',
    question: 'Dans "Il parle à son ami", quelle est la fonction de "à son ami" ?',
    options: ['Sujet', 'COD', 'COI', 'Complément circonstanciel'],
    correctAnswer: 2,
    explanation: '"À son ami" répond à la question "à qui ?" après le verbe. C\'est un COI.',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_052',
    question: 'Quel est le temps du verbe dans "Il avait mangé" ?',
    options: ['Passé composé', 'Plus-que-parfait', 'Imparfait', 'Passé simple'],
    correctAnswer: 1,
    explanation: '"Il avait mangé" est au plus-que-parfait (auxiliaire à l\'imparfait + participe passé).',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_053',
    question: 'Dans "La maison que j\'ai achetée", "que j\'ai achetée" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 1,
    explanation: '"Que j\'ai achetée" est une proposition subordonnée relative introduite par "que".',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_054',
    question: 'Dans "Elle pense à ses vacances", quelle est la fonction de "à ses vacances" ?',
    options: ['Sujet', 'COD', 'COI', 'Attribut'],
    correctAnswer: 2,
    explanation: '"À ses vacances" répond à la question "à quoi ?" C\'est un complément d\'objet indirect.',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_055',
    question: 'Quel est le mode du verbe dans "Il faut que tu viennes" ?',
    options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
    correctAnswer: 1,
    explanation: '"Que tu viennes" est au subjonctif présent après "il faut que".',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_056',
    question: 'Dans "Je sais qu\'il viendra", "qu\'il viendra" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 2,
    explanation: '"Qu\'il viendra" est une proposition subordonnée conjonctive COD du verbe "sais".',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_057',
    question: 'Dans "Il donne un cadeau à Marie", quelle est la fonction de "à Marie" ?',
    options: ['Sujet', 'COD', 'COI', 'Complément circonstanciel'],
    correctAnswer: 2,
    explanation: '"À Marie" répond à la question "à qui ?" C\'est le complément d\'objet indirect.',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_058',
    question: 'Quel est le temps du verbe dans "Nous aurons fini" ?',
    options: ['Futur simple', 'Futur antérieur', 'Conditionnel passé', 'Passé composé'],
    correctAnswer: 1,
    explanation: '"Nous aurons fini" est au futur antérieur (auxiliaire au futur + participe passé).',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_059',
    question: 'Dans "L\'homme dont je parle", "dont je parle" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 1,
    explanation: '"Dont je parle" est une proposition subordonnée relative introduite par "dont".',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_060',
    question: 'Dans "Elle ressemble à sa mère", quelle est la fonction de "à sa mère" ?',
    options: ['Sujet', 'COD', 'COI', 'Attribut'],
    correctAnswer: 2,
    explanation: '"À sa mère" complète le verbe "ressemble" et répond à "à qui ?".',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_061',
    question: 'Quel est le mode du verbe dans "Si j\'étais riche, je voyagerais" ?',
    options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
    correctAnswer: 2,
    explanation: '"Je voyagerais" est au conditionnel présent dans une hypothèse.',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_062',
    question: 'Dans "Bien qu\'il soit tard", "qu\'il soit tard" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 2,
    explanation: '"Qu\'il soit tard" est une proposition subordonnée conjonctive de concession.',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_063',
    question: 'Dans "Il se souvient de son enfance", quelle est la fonction de "de son enfance" ?',
    options: ['Sujet', 'COD', 'COI', 'Complément circonstanciel'],
    correctAnswer: 2,
    explanation: '"De son enfance" répond à la question "de quoi ?" C\'est un COI.',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_064',
    question: 'Quel est le temps du verbe dans "Il eut terminé" ?',
    options: ['Passé simple', 'Passé antérieur', 'Plus-que-parfait', 'Passé composé'],
    correctAnswer: 1,
    explanation: '"Il eut terminé" est au passé antérieur (auxiliaire au passé simple + participe passé).',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_065',
    question: 'Dans "Le livre où j\'ai trouvé cette information", "où j\'ai trouvé cette information" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 1,
    explanation: '"Où j\'ai trouvé cette information" est une proposition subordonnée relative.',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_066',
    question: 'Dans "Elle téléphone à ses parents", quelle est la fonction de "à ses parents" ?',
    options: ['Sujet', 'COD', 'COI', 'Attribut'],
    correctAnswer: 2,
    explanation: '"À ses parents" complète le verbe "téléphone" et répond à "à qui ?".',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_067',
    question: 'Quel est le mode du verbe dans "Pourvu qu\'il réussisse" ?',
    options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
    correctAnswer: 1,
    explanation: '"Qu\'il réussisse" est au subjonctif présent après "pourvu que".',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_068',
    question: 'Dans "Comme il pleut, je reste", "comme il pleut" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 2,
    explanation: '"Comme il pleut" est une proposition subordonnée conjonctive de cause.',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_069',
    question: 'Dans "Il rêve de ses vacances", quelle est la fonction de "de ses vacances" ?',
    options: ['Sujet', 'COD', 'COI', 'Complément circonstanciel'],
    correctAnswer: 2,
    explanation: '"De ses vacances" répond à la question "de quoi ?" C\'est un COI.',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_070',
    question: 'Quel est le temps du verbe dans "J\'aurais voulu" ?',
    options: ['Conditionnel présent', 'Conditionnel passé', 'Plus-que-parfait', 'Futur antérieur'],
    correctAnswer: 1,
    explanation: '"J\'aurais voulu" est au conditionnel passé (auxiliaire au conditionnel + participe passé).',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_071',
    question: 'Dans "La personne à qui je pense", "à qui je pense" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 1,
    explanation: '"À qui je pense" est une proposition subordonnée relative introduite par "à qui".',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_072',
    question: 'Dans "Il s\'intéresse à la musique", quelle est la fonction de "à la musique" ?',
    options: ['Sujet', 'COD', 'COI', 'Attribut'],
    correctAnswer: 2,
    explanation: '"À la musique" complète le verbe pronominal "s\'intéresse".',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_073',
    question: 'Quel est le mode du verbe dans "Viens ici !" ?',
    options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
    correctAnswer: 3,
    explanation: '"Viens" est à l\'impératif présent, mode de l\'ordre et du conseil.',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_074',
    question: 'Dans "Afin que tu comprennes", "que tu comprennes" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 2,
    explanation: '"Que tu comprennes" est une proposition subordonnée conjonctive de but.',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_075',
    question: 'Dans "Elle doute de sa réussite", quelle est la fonction de "de sa réussite" ?',
    options: ['Sujet', 'COD', 'COI', 'Complément circonstanciel'],
    correctAnswer: 2,
    explanation: '"De sa réussite" répond à la question "de quoi ?" C\'est un COI.',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_076',
    question: 'Quel est le temps du verbe dans "Quand il sera parti" ?',
    options: ['Futur simple', 'Futur antérieur', 'Conditionnel passé', 'Subjonctif passé'],
    correctAnswer: 1,
    explanation: '"Il sera parti" est au futur antérieur (auxiliaire au futur + participe passé).',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_077',
    question: 'Dans "Le moment où il est arrivé", "où il est arrivé" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 1,
    explanation: '"Où il est arrivé" est une proposition subordonnée relative de temps.',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },
  {
    id: 'gram_078',
    question: 'Dans "Il obéit à ses parents", quelle est la fonction de "à ses parents" ?',
    options: ['Sujet', 'COD', 'COI', 'Attribut'],
    correctAnswer: 2,
    explanation: '"À ses parents" complète le verbe "obéit" et répond à "à qui ?".',
    difficulty: 'moyen',
    skillId: 'fonction-coi',
    level: 3
  },
  {
    id: 'gram_079',
    question: 'Quel est le mode du verbe dans "J\'aimerais qu\'il vienne" ?',
    options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
    correctAnswer: 1,
    explanation: '"Qu\'il vienne" est au subjonctif présent après le verbe de souhait "aimerais".',
    difficulty: 'moyen',
    skillId: 'temps-verbaux',
    level: 3
  },
  {
    id: 'gram_080',
    question: 'Dans "Puisque tu insistes", "puisque tu insistes" est :',
    options: ['Proposition principale', 'Proposition subordonnée relative', 'Proposition subordonnée conjonctive', 'Proposition indépendante'],
    correctAnswer: 2,
    explanation: '"Puisque tu insistes" est une proposition subordonnée conjonctive de cause.',
    difficulty: 'moyen',
    skillId: 'propositions',
    level: 3
  },

  // Niveau difficile (4-5) - 20 exercices
  {
    id: 'gram_081',
    question: 'Dans "Il est plus grand que je ne le pensais", quelle est la fonction de "ne" ?',
    options: ['Négation', 'Explétif', 'Restriction', 'Interrogation'],
    correctAnswer: 1,
    explanation: 'Le "ne" explétif n\'a pas de valeur négative, il s\'emploie dans certaines subordonnées.',
    difficulty: 'difficile',
    skillId: 'propositions',
    level: 4
  },
  {
    id: 'gram_082',
    question: 'Dans "Quelque intelligent qu\'il soit", quelle est la nature de "quelque" ?',
    options: ['Déterminant', 'Adverbe', 'Pronom', 'Conjonction'],
    correctAnswer: 1,
    explanation: '"Quelque" devant un adjectif est un adverbe invariable signifiant "si".',
    difficulty: 'difficile',
    skillId: 'nature-mots',
    level: 4
  },
  {
    id: 'gram_083',
    question: 'Quel est le mode du verbe dans "Qu\'il veuille ou non" ?',
    options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
    correctAnswer: 1,
    explanation: '"Qu\'il veuille" est au subjonctif dans une expression de concession.',
    difficulty: 'difficile',
    skillId: 'temps-verbaux',
    level: 4
  },
  {
    id: 'gram_084',
    question: 'Dans "Il n\'empêche que tu as raison", "que tu as raison" est :',
    options: ['Sujet réel', 'COD', 'COI', 'Attribut'],
    correctAnswer: 0,
    explanation: '"Que tu as raison" est le sujet réel du verbe impersonnel "il n\'empêche".',
    difficulty: 'difficile',
    skillId: 'fonction-sujet',
    level: 4
  },
  {
    id: 'gram_085',
    question: 'Dans "Ayant fini son travail, il partit", "ayant fini" est :',
    options: ['Gérondif', 'Participe présent', 'Participe passé composé', 'Infinitif passé'],
    correctAnswer: 2,
    explanation: '"Ayant fini" est un participe passé composé (auxiliaire au participe présent + participe passé).',
    difficulty: 'difficile',
    skillId: 'temps-verbaux',
    level: 4
  },
  {
    id: 'gram_086',
    question: 'Dans "Ce dont il s\'agit", quelle est la fonction de "dont" ?',
    options: ['Sujet', 'COD', 'COI', 'Complément du nom'],
    correctAnswer: 2,
    explanation: '"Dont" remplace "de cela" et est COI du verbe pronominal "s\'agir".',
    difficulty: 'difficile',
    skillId: 'fonction-coi',
    level: 4
  },
  {
    id: 'gram_087',
    question: 'Quel est le temps du verbe dans "Eût-il su, il serait venu" ?',
    options: ['Plus-que-parfait du subjonctif', 'Conditionnel passé', 'Passé antérieur', 'Futur antérieur'],
    correctAnswer: 0,
    explanation: '"Eût-il su" est au plus-que-parfait du subjonctif à valeur conditionnelle.',
    difficulty: 'difficile',
    skillId: 'temps-verbaux',
    level: 5
  },
  {
    id: 'gram_088',
    question: 'Dans "Il y a des gens qui croient tout savoir", "qui croient tout savoir" est :',
    options: ['Relative déterminative', 'Relative explicative', 'Conjonctive', 'Indépendante'],
    correctAnswer: 0,
    explanation: 'Cette relative détermine et restreint le sens de "gens".',
    difficulty: 'difficile',
    skillId: 'propositions',
    level: 4
  },
  {
    id: 'gram_089',
    question: 'Dans "Force lui fut de céder", quelle est la fonction de "force" ?',
    options: ['Sujet', 'COD', 'Attribut', 'Complément circonstanciel'],
    correctAnswer: 2,
    explanation: '"Force" est attribut du sujet dans cette construction archaïque.',
    difficulty: 'difficile',
    skillId: 'fonction-sujet',
    level: 5
  },
  {
    id: 'gram_090',
    question: 'Dans "En travaillant, on réussit", "en travaillant" est :',
    options: ['Gérondif', 'Participe présent', 'Participe passé', 'Infinitif'],
    correctAnswer: 0,
    explanation: '"En travaillant" est un gérondif (en + participe présent).',
    difficulty: 'difficile',
    skillId: 'temps-verbaux',
    level: 4
  },
  {
    id: 'gram_091',
    question: 'Dans "Voici l\'homme à la fille duquel je pense", "duquel" remplace :',
    options: ['de qui', 'de laquelle', 'dont', 'de celui'],
    correctAnswer: 1,
    explanation: '"Duquel" s\'accorde avec "homme" mais remplace "de la fille de cet homme".',
    difficulty: 'difficile',
    skillId: 'propositions',
    level: 4
  },
  {
    id: 'gram_092',
    question: 'Quel est le mode du verbe dans "Plût au ciel qu\'il revienne" ?',
    options: ['Indicatif', 'Subjonctif', 'Conditionnel', 'Impératif'],
    correctAnswer: 1,
    explanation: '"Plût" est à l\'imparfait du subjonctif dans une expression de souhait.',
    difficulty: 'difficile',
    skillId: 'temps-verbaux',
    level: 5
  },
  {
    id: 'gram_093',
    question: 'Dans "Il se peut qu\'il pleuve", "qu\'il pleuve" est :',
    options: ['Sujet apparent', 'Sujet réel', 'COD', 'Attribut'],
    correctAnswer: 1,
    explanation: '"Qu\'il pleuve" est le sujet réel du verbe impersonnel "il se peut".',
    difficulty: 'difficile',
    skillId: 'fonction-sujet',
    level: 4
  },
  {
    id: 'gram_094',
    question: 'Dans "Tout en marchant, il réfléchit", "tout en marchant" exprime :',
    options: ['La cause', 'Le temps', 'La simultanéité', 'La condition'],
    correctAnswer: 2,
    explanation: '"Tout en + gérondif" exprime la simultanéité de deux actions.',
    difficulty: 'difficile',
    skillId: 'temps-verbaux',
    level: 4
  },
  {
    id: 'gram_095',
    question: 'Dans "Lequel de ces livres préfères-tu ?", "lequel" est :',
    options: ['Pronom relatif', 'Pronom interrogatif', 'Déterminant', 'Adverbe'],
    correctAnswer: 1,
    explanation: '"Lequel" est un pronom interrogatif qui porte sur le choix.',
    difficulty: 'difficile',
    skillId: 'nature-mots',
    level: 4
  },
  {
    id: 'gram_096',
    question: 'Quel est le temps du verbe dans "Quand bien même il viendrait" ?',
    options: ['Conditionnel présent', 'Conditionnel passé', 'Subjonctif présent', 'Futur'],
    correctAnswer: 0,
    explanation: '"Il viendrait" est au conditionnel présent après "quand bien même".',
    difficulty: 'difficile',
    skillId: 'temps-verbaux',
    level: 4
  },
  {
    id: 'gram_097',
    question: 'Dans "Autant d\'hommes, autant d\'avis", "autant" est :',
    options: ['Déterminant', 'Adverbe', 'Pronom', 'Conjonction'],
    correctAnswer: 1,
    explanation: '"Autant" est un adverbe de quantité dans cette expression.',
    difficulty: 'difficile',
    skillId: 'nature-mots',
    level: 4
  },
  {
    id: 'gram_098',
    question: 'Dans "Il importe que tu viennes", "que tu viennes" est :',
    options: ['Sujet apparent', 'Sujet réel', 'COD', 'COI'],
    correctAnswer: 1,
    explanation: '"Que tu viennes" est le sujet réel du verbe impersonnel "il importe".',
    difficulty: 'difficile',
    skillId: 'fonction-sujet',
    level: 4
  },
  {
    id: 'gram_099',
    question: 'Dans "N\'était sa maladie, il serait venu", "n\'était" exprime :',
    options: ['La négation', 'La condition', 'La cause', 'Le temps'],
    correctAnswer: 1,
    explanation: '"N\'était" (= s\'il n\'y avait pas) exprime une condition négative.',
    difficulty: 'difficile',
    skillId: 'temps-verbaux',
    level: 5
  },
  {
    id: 'gram_100',
    question: 'Dans "Que de fois je l\'ai dit !", "que" est :',
    options: ['Pronom relatif', 'Conjonction', 'Adverbe exclamatif', 'Déterminant'],
    correctAnswer: 2,
    explanation: '"Que" est un adverbe exclamatif équivalent à "combien" dans cette phrase.',
    difficulty: 'difficile',
    skillId: 'nature-mots',
    level: 4
  }
];

// VOCABULAIRE - 100 exercices complets
export const vocabulaireExercises: FallbackExercise[] = [
  // Niveau facile (1-2) - 50 exercices
  {
    id: 'vocab_001',
    question: 'Quel est le synonyme de "content" ?',
    options: ['Triste', 'Heureux', 'Fatigué', 'Énervé'],
    correctAnswer: 1,
    explanation: '"Heureux" est un synonyme de "content", ils expriment tous deux la joie.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_002',
    question: 'Quel est l\'antonyme de "grand" ?',
    options: ['Énorme', 'Petit', 'Large', 'Haut'],
    correctAnswer: 1,
    explanation: '"Petit" est l\'antonyme de "grand", ils expriment des tailles opposées.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_003',
    question: 'Que signifie l\'expression "avoir un chat dans la gorge" ?',
    options: ['Avoir un animal', 'Être enroué', 'Avoir faim', 'Être malade'],
    correctAnswer: 1,
    explanation: '"Avoir un chat dans la gorge" signifie être enroué, avoir la voix rauque.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_004',
    question: 'Quel mot appartient au champ lexical de l\'école ?',
    options: ['Voiture', 'Cahier', 'Cuisine', 'Jardin'],
    correctAnswer: 1,
    explanation: '"Cahier" appartient au champ lexical de l\'école, comme "livre", "crayon", "tableau".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_005',
    question: 'Quel est le synonyme de "joli" ?',
    options: ['Laid', 'Beau', 'Grand', 'Petit'],
    correctAnswer: 1,
    explanation: '"Beau" est un synonyme de "joli", ils expriment tous deux l\'esthétique positive.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_006',
    question: 'Quel est l\'antonyme de "chaud" ?',
    options: ['Tiède', 'Froid', 'Brûlant', 'Doux'],
    correctAnswer: 1,
    explanation: '"Froid" est l\'antonyme de "chaud", ils expriment des températures opposées.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_007',
    question: 'Que signifie "il pleut des cordes" ?',
    options: ['Il pleut vraiment des cordes', 'Il pleut très fort', 'Il ne pleut pas', 'Il pleut doucement'],
    correctAnswer: 1,
    explanation: '"Il pleut des cordes" est une expression qui signifie qu\'il pleut très fort.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_008',
    question: 'Quel mot appartient au champ lexical de la cuisine ?',
    options: ['Livre', 'Casserole', 'Voiture', 'Fleur'],
    correctAnswer: 1,
    explanation: '"Casserole" appartient au champ lexical de la cuisine avec "four", "couteau", "recette".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_009',
    question: 'Quel est le synonyme de "rapide" ?',
    options: ['Lent', 'Vite', 'Lourd', 'Léger'],
    correctAnswer: 1,
    explanation: '"Vite" est un synonyme de "rapide", ils expriment tous deux la vitesse.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_010',
    question: 'Quel est l\'antonyme de "monter" ?',
    options: ['Grimper', 'Descendre', 'Avancer', 'Reculer'],
    correctAnswer: 1,
    explanation: '"Descendre" est l\'antonyme de "monter", ils expriment des mouvements opposés.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_011',
    question: 'Que signifie "casser les pieds" ?',
    options: ['Se blesser', 'Ennuyer', 'Marcher', 'Danser'],
    correctAnswer: 1,
    explanation: '"Casser les pieds" signifie ennuyer, importuner quelqu\'un.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_012',
    question: 'Quel mot appartient au champ lexical du sport ?',
    options: ['Ballon', 'Livre', 'Assiette', 'Lit'],
    correctAnswer: 0,
    explanation: '"Ballon" appartient au champ lexical du sport avec "match", "équipe", "stade".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_013',
    question: 'Quel est le synonyme de "intelligent" ?',
    options: ['Bête', 'Malin', 'Grand', 'Fort'],
    correctAnswer: 1,
    explanation: '"Malin" est un synonyme de "intelligent", ils expriment la vivacité d\'esprit.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_014',
    question: 'Quel est l\'antonyme de "riche" ?',
    options: ['Fortuné', 'Pauvre', 'Généreux', 'Avare'],
    correctAnswer: 1,
    explanation: '"Pauvre" est l\'antonyme de "riche", ils expriment des situations financières opposées.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_015',
    question: 'Que signifie "avoir le cafard" ?',
    options: ['Avoir un insecte', 'Être triste', 'Avoir faim', 'Être content'],
    correctAnswer: 1,
    explanation: '"Avoir le cafard" signifie être triste, déprimé.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_016',
    question: 'Quel mot appartient au champ lexical de la nature ?',
    options: ['Ordinateur', 'Arbre', 'Voiture', 'Téléphone'],
    correctAnswer: 1,
    explanation: '"Arbre" appartient au champ lexical de la nature avec "fleur", "rivière", "montagne".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_017',
    question: 'Quel est le synonyme de "commencer" ?',
    options: ['Finir', 'Débuter', 'Arrêter', 'Continuer'],
    correctAnswer: 1,
    explanation: '"Débuter" est un synonyme de "commencer", ils marquent tous deux le début.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_018',
    question: 'Quel est l\'antonyme de "jour" ?',
    options: ['Matin', 'Nuit', 'Soir', 'Midi'],
    correctAnswer: 1,
    explanation: '"Nuit" est l\'antonyme de "jour", ils représentent des moments opposés.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_019',
    question: 'Que signifie "tomber dans les pommes" ?',
    options: ['Tomber dans un arbre', 'S\'évanouir', 'Manger des fruits', 'Être malade'],
    correctAnswer: 1,
    explanation: '"Tomber dans les pommes" signifie s\'évanouir, perdre connaissance.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_020',
    question: 'Quel mot appartient au champ lexical de la musique ?',
    options: ['Piano', 'Marteau', 'Assiette', 'Chaussure'],
    correctAnswer: 0,
    explanation: '"Piano" appartient au champ lexical de la musique avec "guitare", "chant", "mélodie".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_021',
    question: 'Quel est le synonyme de "drôle" ?',
    options: ['Triste', 'Amusant', 'Ennuyeux', 'Sérieux'],
    correctAnswer: 1,
    explanation: '"Amusant" est un synonyme de "drôle", ils provoquent tous deux le rire.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_022',
    question: 'Quel est l\'antonyme de "facile" ?',
    options: ['Simple', 'Difficile', 'Rapide', 'Lent'],
    correctAnswer: 1,
    explanation: '"Difficile" est l\'antonyme de "facile", ils expriment des niveaux de complexité opposés.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_023',
    question: 'Que signifie "avoir un poil dans la main" ?',
    options: ['Être poilu', 'Être paresseux', 'Être malade', 'Être fort'],
    correctAnswer: 1,
    explanation: '"Avoir un poil dans la main" signifie être paresseux, ne pas aimer travailler.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_024',
    question: 'Quel mot appartient au champ lexical de la famille ?',
    options: ['Père', 'Voiture', 'Livre', 'Chaise'],
    correctAnswer: 0,
    explanation: '"Père" appartient au champ lexical de la famille avec "mère", "frère", "sœur".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_025',
    question: 'Quel est le synonyme de "gentil" ?',
    options: ['Méchant', 'Aimable', 'Dur', 'Froid'],
    correctAnswer: 1,
    explanation: '"Aimable" est un synonyme de "gentil", ils expriment la bienveillance.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_026',
    question: 'Quel est l\'antonyme de "propre" ?',
    options: ['Net', 'Sale', 'Blanc', 'Brillant'],
    correctAnswer: 1,
    explanation: '"Sale" est l\'antonyme de "propre", ils expriment des états de propreté opposés.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_027',
    question: 'Que signifie "mettre les pieds dans le plat" ?',
    options: ['Marcher dans la nourriture', 'Dire une maladresse', 'Cuisiner', 'Nettoyer'],
    correctAnswer: 1,
    explanation: '"Mettre les pieds dans le plat" signifie dire quelque chose de maladroit.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_028',
    question: 'Quel mot appartient au champ lexical des animaux ?',
    options: ['Chien', 'Table', 'Stylo', 'Fenêtre'],
    correctAnswer: 0,
    explanation: '"Chien" appartient au champ lexical des animaux avec "chat", "oiseau", "poisson".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_029',
    question: 'Quel est le synonyme de "courageux" ?',
    options: ['Peureux', 'Brave', 'Faible', 'Timide'],
    correctAnswer: 1,
    explanation: '"Brave" est un synonyme de "courageux", ils expriment tous deux la bravoure.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_030',
    question: 'Quel est l\'antonyme de "lourd" ?',
    options: ['Pesant', 'Léger', 'Gros', 'Épais'],
    correctAnswer: 1,
    explanation: '"Léger" est l\'antonyme de "lourd", ils expriment des poids opposés.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_031',
    question: 'Que signifie "avoir les yeux plus gros que le ventre" ?',
    options: ['Avoir de gros yeux', 'Vouloir trop manger', 'Être malade', 'Avoir faim'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie vouloir prendre plus de nourriture qu\'on ne peut en manger.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_032',
    question: 'Quel mot appartient au champ lexical des couleurs ?',
    options: ['Rouge', 'Chaise', 'Livre', 'Voiture'],
    correctAnswer: 0,
    explanation: '"Rouge" appartient au champ lexical des couleurs avec "bleu", "vert", "jaune".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_033',
    question: 'Quel est le synonyme de "terminer" ?',
    options: ['Commencer', 'Finir', 'Débuter', 'Entamer'],
    correctAnswer: 1,
    explanation: '"Finir" est un synonyme de "terminer", ils marquent tous deux la fin.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_034',
    question: 'Quel est l\'antonyme de "vieux" ?',
    options: ['Âgé', 'Jeune', 'Ancien', 'Usé'],
    correctAnswer: 1,
    explanation: '"Jeune" est l\'antonyme de "vieux", ils expriment des âges opposés.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_035',
    question: 'Que signifie "donner sa langue au chat" ?',
    options: ['Nourrir un animal', 'Abandonner', 'Parler beaucoup', 'Être muet'],
    correctAnswer: 1,
    explanation: '"Donner sa langue au chat" signifie abandonner, renoncer à deviner.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_036',
    question: 'Quel mot appartient au champ lexical du temps ?',
    options: ['Heure', 'Chaussure', 'Assiette', 'Crayon'],
    correctAnswer: 0,
    explanation: '"Heure" appartient au champ lexical du temps avec "minute", "jour", "année".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_037',
    question: 'Quel est le synonyme de "calme" ?',
    options: ['Agité', 'Tranquille', 'Nerveux', 'Bruyant'],
    correctAnswer: 1,
    explanation: '"Tranquille" est un synonyme de "calme", ils expriment la sérénité.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_038',
    question: 'Quel est l\'antonyme de "près" ?',
    options: ['Proche', 'Loin', 'Ici', 'Là'],
    correctAnswer: 1,
    explanation: '"Loin" est l\'antonyme de "près", ils expriment des distances opposées.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_039',
    question: 'Que signifie "avoir du pain sur la planche" ?',
    options: ['Faire du pain', 'Avoir du travail', 'Avoir faim', 'Cuisiner'],
    correctAnswer: 1,
    explanation: '"Avoir du pain sur la planche" signifie avoir beaucoup de travail à faire.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_040',
    question: 'Quel mot appartient au champ lexical de la maison ?',
    options: ['Porte', 'Arbre', 'Voiture', 'Livre'],
    correctAnswer: 0,
    explanation: '"Porte" appartient au champ lexical de la maison avec "fenêtre", "toit", "chambre".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_041',
    question: 'Quel est le synonyme de "fort" ?',
    options: ['Faible', 'Puissant', 'Petit', 'Doux'],
    correctAnswer: 1,
    explanation: '"Puissant" est un synonyme de "fort", ils expriment la force.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_042',
    question: 'Quel est l\'antonyme de "haut" ?',
    options: ['Grand', 'Bas', 'Long', 'Large'],
    correctAnswer: 1,
    explanation: '"Bas" est l\'antonyme de "haut", ils expriment des positions opposées.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_043',
    question: 'Que signifie "tourner autour du pot" ?',
    options: ['Cuisiner', 'Éviter le sujet', 'Jardiner', 'Danser'],
    correctAnswer: 1,
    explanation: '"Tourner autour du pot" signifie éviter d\'aborder directement le sujet.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_044',
    question: 'Quel mot appartient au champ lexical des vêtements ?',
    options: ['Pantalon', 'Livre', 'Voiture', 'Arbre'],
    correctAnswer: 0,
    explanation: '"Pantalon" appartient au champ lexical des vêtements avec "chemise", "robe", "chaussures".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_045',
    question: 'Quel est le synonyme de "content" ?',
    options: ['Mécontent', 'Satisfait', 'Triste', 'Fâché'],
    correctAnswer: 1,
    explanation: '"Satisfait" est un synonyme de "content", ils expriment la satisfaction.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_046',
    question: 'Quel est l\'antonyme de "devant" ?',
    options: ['Avant', 'Derrière', 'Dessus', 'Dessous'],
    correctAnswer: 1,
    explanation: '"Derrière" est l\'antonyme de "devant", ils indiquent des positions opposées.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },
  {
    id: 'vocab_047',
    question: 'Que signifie "avoir la main verte" ?',
    options: ['Être malade', 'Bien jardiner', 'Être jaloux', 'Peindre'],
    correctAnswer: 1,
    explanation: '"Avoir la main verte" signifie avoir du talent pour le jardinage.',
    difficulty: 'facile',
    skillId: 'expressions-idiomatiques',
    level: 1
  },
  {
    id: 'vocab_048',
    question: 'Quel mot appartient au champ lexical de l\'eau ?',
    options: ['Rivière', 'Voiture', 'Livre', 'Chaise'],
    correctAnswer: 0,
    explanation: '"Rivière" appartient au champ lexical de l\'eau avec "mer", "pluie", "lac".',
    difficulty: 'facile',
    skillId: 'champ-lexical',
    level: 1
  },
  {
    id: 'vocab_049',
    question: 'Quel est le synonyme de "parler" ?',
    options: ['Se taire', 'Dire', 'Écouter', 'Regarder'],
    correctAnswer: 1,
    explanation: '"Dire" est un synonyme de "parler", ils expriment l\'expression orale.',
    difficulty: 'facile',
    skillId: 'synonymes',
    level: 1
  },
  {
    id: 'vocab_050',
    question: 'Quel est l\'antonyme de "entrer" ?',
    options: ['Pénétrer', 'Sortir', 'Arriver', 'Venir'],
    correctAnswer: 1,
    explanation: '"Sortir" est l\'antonyme d\'"entrer", ils expriment des mouvements opposés.',
    difficulty: 'facile',
    skillId: 'antonymes',
    level: 1
  },

  // Niveau moyen (3) - 30 exercices
  {
    id: 'vocab_051',
    question: 'Quel registre de langue utilise "se restaurer" au lieu de "manger" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Argotique'],
    correctAnswer: 2,
    explanation: '"Se restaurer" appartient au registre soutenu, plus élégant que "manger".',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_052',
    question: 'Que signifie "jeter l\'éponge" ?',
    options: ['Nettoyer', 'Abandonner', 'Se laver', 'Commencer'],
    correctAnswer: 1,
    explanation: '"Jeter l\'éponge" signifie abandonner, renoncer (référence à la boxe).',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },
  {
    id: 'vocab_053',
    question: 'Quel est le synonyme de "perspicace" ?',
    options: ['Naïf', 'Clairvoyant', 'Aveugle', 'Confus'],
    correctAnswer: 1,
    explanation: '"Clairvoyant" est synonyme de "perspicace", ils désignent la finesse d\'esprit.',
    difficulty: 'moyen',
    skillId: 'synonymes',
    level: 3
  },
  {
    id: 'vocab_054',
    question: 'Dans quel registre classe-t-on "bouquin" pour "livre" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 0,
    explanation: '"Bouquin" est du registre familier, plus décontracté que "livre".',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_055',
    question: 'Que signifie "battre le fer tant qu\'il est chaud" ?',
    options: ['Forger', 'Profiter du moment', 'Attendre', 'Se reposer'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie profiter d\'une situation favorable.',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },
  {
    id: 'vocab_056',
    question: 'Quel est l\'antonyme de "prolixe" ?',
    options: ['Bavard', 'Concis', 'Verbeux', 'Éloquent'],
    correctAnswer: 1,
    explanation: '"Concis" est l\'antonyme de "prolixe" (qui parle beaucoup).',
    difficulty: 'moyen',
    skillId: 'antonymes',
    level: 3
  },
  {
    id: 'vocab_057',
    question: 'Quel mot appartient au champ lexical de la justice ?',
    options: ['Verdict', 'Recette', 'Mélodie', 'Pinceau'],
    correctAnswer: 0,
    explanation: '"Verdict" appartient au champ lexical de la justice avec "tribunal", "juge", "loi".',
    difficulty: 'moyen',
    skillId: 'champ-lexical',
    level: 3
  },
  {
    id: 'vocab_058',
    question: 'Dans quel registre utilise-t-on "se sustenter" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Argotique'],
    correctAnswer: 2,
    explanation: '"Se sustenter" (se nourrir) appartient au registre soutenu.',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_059',
    question: 'Que signifie "prendre le taureau par les cornes" ?',
    options: ['Faire de l\'élevage', 'Affronter un problème', 'Fuir', 'Attendre'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie affronter courageusement un problème.',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },
  {
    id: 'vocab_060',
    question: 'Quel est le synonyme d\'"éphémère" ?',
    options: ['Éternel', 'Passager', 'Permanent', 'Durable'],
    correctAnswer: 1,
    explanation: '"Passager" est synonyme d\'"éphémère", qui dure peu de temps.',
    difficulty: 'moyen',
    skillId: 'synonymes',
    level: 3
  },
  {
    id: 'vocab_061',
    question: 'Quel registre utilise "se gourer" pour "se tromper" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 0,
    explanation: '"Se gourer" appartient au registre familier, très décontracté.',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_062',
    question: 'Que signifie "avoir plusieurs cordes à son arc" ?',
    options: ['Faire du tir à l\'arc', 'Avoir plusieurs talents', 'Être musicien', 'Être sportif'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie avoir plusieurs compétences ou moyens d\'action.',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },
  {
    id: 'vocab_063',
    question: 'Quel est l\'antonyme de "magnanime" ?',
    options: ['Généreux', 'Mesquin', 'Noble', 'Clément'],
    correctAnswer: 1,
    explanation: '"Mesquin" est l\'antonyme de "magnanime" (généreux, noble).',
    difficulty: 'moyen',
    skillId: 'antonymes',
    level: 3
  },
  {
    id: 'vocab_064',
    question: 'Quel mot appartient au champ lexical de l\'architecture ?',
    options: ['Voûte', 'Recette', 'Partition', 'Ordonnance'],
    correctAnswer: 0,
    explanation: '"Voûte" appartient au champ lexical de l\'architecture avec "colonne", "arc", "façade".',
    difficulty: 'moyen',
    skillId: 'champ-lexical',
    level: 3
  },
  {
    id: 'vocab_065',
    question: 'Dans quel registre classe-t-on "demeurer" pour "habiter" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 2,
    explanation: '"Demeurer" appartient au registre soutenu, plus élégant qu\'"habiter".',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_066',
    question: 'Que signifie "mettre la charrue avant les bœufs" ?',
    options: ['Faire de l\'agriculture', 'Faire les choses dans le désordre', 'Être en retard', 'Travailler dur'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie faire les choses dans le mauvais ordre.',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },
  {
    id: 'vocab_067',
    question: 'Quel est le synonyme d\'"opulent" ?',
    options: ['Pauvre', 'Riche', 'Simple', 'Modeste'],
    correctAnswer: 1,
    explanation: '"Riche" est synonyme d\'"opulent", qui désigne l\'abondance.',
    difficulty: 'moyen',
    skillId: 'synonymes',
    level: 3
  },
  {
    id: 'vocab_068',
    question: 'Quel registre utilise "piaule" pour "chambre" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 0,
    explanation: '"Piaule" appartient au registre familier, très décontracté.',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_069',
    question: 'Que signifie "couper les cheveux en quatre" ?',
    options: ['Être coiffeur', 'Être trop minutieux', 'Être rapide', 'Être négligent'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie être excessivement minutieux dans les détails.',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },
  {
    id: 'vocab_070',
    question: 'Quel est l\'antonyme d\'"affable" ?',
    options: ['Aimable', 'Bourru', 'Courtois', 'Poli'],
    correctAnswer: 1,
    explanation: '"Bourru" est l\'antonyme d\'"affable" (aimable, accueillant).',
    difficulty: 'moyen',
    skillId: 'antonymes',
    level: 3
  },
  {
    id: 'vocab_071',
    question: 'Quel mot appartient au champ lexical de la médecine ?',
    options: ['Diagnostic', 'Recette', 'Mélodie', 'Pinceau'],
    correctAnswer: 0,
    explanation: '"Diagnostic" appartient au champ lexical de la médecine avec "symptôme", "traitement", "patient".',
    difficulty: 'moyen',
    skillId: 'champ-lexical',
    level: 3
  },
  {
    id: 'vocab_072',
    question: 'Dans quel registre utilise-t-on "s\'abreuver" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 2,
    explanation: '"S\'abreuver" (boire) appartient au registre soutenu.',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_073',
    question: 'Que signifie "tirer les vers du nez" ?',
    options: ['Pêcher', 'Faire parler', 'Se moucher', 'Jardiner'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie faire parler quelqu\'un qui ne veut rien dire.',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },
  {
    id: 'vocab_074',
    question: 'Quel est le synonyme de "véhément" ?',
    options: ['Calme', 'Ardent', 'Froid', 'Indifférent'],
    correctAnswer: 1,
    explanation: '"Ardent" est synonyme de "véhément", qui exprime la passion.',
    difficulty: 'moyen',
    skillId: 'synonymes',
    level: 3
  },
  {
    id: 'vocab_075',
    question: 'Quel registre utilise "se barrer" pour "partir" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 0,
    explanation: '"Se barrer" appartient au registre familier, très décontracté.',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_076',
    question: 'Que signifie "avoir un chat dans la gorge" ?',
    options: ['Avoir un animal', 'Être enroué', 'Avoir faim', 'Être malade'],
    correctAnswer: 1,
    explanation: '"Avoir un chat dans la gorge" signifie être enroué.',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },
  {
    id: 'vocab_077',
    question: 'Quel est l\'antonyme de "diligent" ?',
    options: ['Actif', 'Paresseux', 'Rapide', 'Efficace'],
    correctAnswer: 1,
    explanation: '"Paresseux" est l\'antonyme de "diligent" (actif, empressé).',
    difficulty: 'moyen',
    skillId: 'antonymes',
    level: 3
  },
  {
    id: 'vocab_078',
    question: 'Quel mot appartient au champ lexical de la finance ?',
    options: ['Dividende', 'Recette', 'Mélodie', 'Pinceau'],
    correctAnswer: 0,
    explanation: '"Dividende" appartient au champ lexical de la finance avec "action", "bourse", "crédit".',
    difficulty: 'moyen',
    skillId: 'champ-lexical',
    level: 3
  },
  {
    id: 'vocab_079',
    question: 'Dans quel registre classe-t-on "se sustenter" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 2,
    explanation: '"Se sustenter" (se nourrir) appartient au registre soutenu.',
    difficulty: 'moyen',
    skillId: 'registres-langue',
    level: 3
  },
  {
    id: 'vocab_080',
    question: 'Que signifie "remettre les pendules à l\'heure" ?',
    options: ['Réparer une horloge', 'Clarifier une situation', 'Être ponctuel', 'Dormir'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie clarifier une situation, rétablir la vérité.',
    difficulty: 'moyen',
    skillId: 'expressions-idiomatiques',
    level: 3
  },

  // Niveau difficile (4-5) - 20 exercices
  {
    id: 'vocab_081',
    question: 'Quel est le synonyme d\'"ubiquité" ?',
    options: ['Absence', 'Omniprésence', 'Rareté', 'Solitude'],
    correctAnswer: 1,
    explanation: '"Omniprésence" est synonyme d\'"ubiquité", capacité d\'être partout à la fois.',
    difficulty: 'difficile',
    skillId: 'synonymes',
    level: 4
  },
  {
    id: 'vocab_082',
    question: 'Que signifie "faire des gorges chaudes" ?',
    options: ['Cuisiner', 'Se moquer', 'Avoir chaud', 'Chanter'],
    correctAnswer: 1,
    explanation: '"Faire des gorges chaudes" signifie se moquer, railler quelqu\'un.',
    difficulty: 'difficile',
    skillId: 'expressions-idiomatiques',
    level: 4
  },
  {
    id: 'vocab_083',
    question: 'Quel est l\'antonyme de "pléthorique" ?',
    options: ['Abondant', 'Insuffisant', 'Nombreux', 'Copieux'],
    correctAnswer: 1,
    explanation: '"Insuffisant" est l\'antonyme de "pléthorique" (surabondant).',
    difficulty: 'difficile',
    skillId: 'antonymes',
    level: 4
  },
  {
    id: 'vocab_084',
    question: 'Dans quel registre utilise-t-on "occire" pour "tuer" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Archaïque'],
    correctAnswer: 3,
    explanation: '"Occire" appartient au registre archaïque, très ancien.',
    difficulty: 'difficile',
    skillId: 'registres-langue',
    level: 4
  },
  {
    id: 'vocab_085',
    question: 'Que signifie "tirer son épingle du jeu" ?',
    options: ['Jouer', 'S\'en sortir habilement', 'Coudre', 'Perdre'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie s\'en sortir habilement d\'une situation difficile.',
    difficulty: 'difficile',
    skillId: 'expressions-idiomatiques',
    level: 4
  },
  {
    id: 'vocab_086',
    question: 'Quel est le synonyme de "pusillamine" ?',
    options: ['Courageux', 'Timoré', 'Audacieux', 'Téméraire'],
    correctAnswer: 1,
    explanation: '"Timoré" est synonyme de "pusillamine", qui manque de courage.',
    difficulty: 'difficile',
    skillId: 'synonymes',
    level: 4
  },
  {
    id: 'vocab_087',
    question: 'Quel mot appartient au champ lexical de l\'héraldique ?',
    options: ['Blason', 'Recette', 'Mélodie', 'Ordonnance'],
    correctAnswer: 0,
    explanation: '"Blason" appartient au champ lexical de l\'héraldique avec "armoiries", "écu", "devise".',
    difficulty: 'difficile',
    skillId: 'champ-lexical',
    level: 4
  },
  {
    id: 'vocab_088',
    question: 'Dans quel registre classe-t-on "trépasser" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 2,
    explanation: '"Trépasser" (mourir) appartient au registre soutenu.',
    difficulty: 'difficile',
    skillId: 'registres-langue',
    level: 4
  },
  {
    id: 'vocab_089',
    question: 'Que signifie "jeter de la poudre aux yeux" ?',
    options: ['Aveugler', 'Éblouir par l\'apparence', 'Nettoyer', 'Maquiller'],
    correctAnswer: 1,
    explanation: 'Cette expression signifie impressionner par de fausses apparences.',
    difficulty: 'difficile',
    skillId: 'expressions-idiomatiques',
    level: 4
  },
  {
    id: 'vocab_090',
    question: 'Quel est l\'antonyme d\'"ombrageux" ?',
    options: ['Méfiant', 'Confiant', 'Soupçonneux', 'Susceptible'],
    correctAnswer: 1,
    explanation: '"Confiant" est l\'antonyme d\'"ombrageux" (méfiant, susceptible).',
    difficulty: 'difficile',
    skillId: 'antonymes',
    level: 4
  },
  {
    id: 'vocab_091',
    question: 'Quel est le synonyme de "circonspect" ?',
    options: ['Imprudent', 'Prudent', 'Négligent', 'Téméraire'],
    correctAnswer: 1,
    explanation: '"Prudent" est synonyme de "circonspect", qui agit avec précaution.',
    difficulty: 'difficile',
    skillId: 'synonymes',
    level: 4
  },
  {
    id: 'vocab_092',
    question: 'Dans quel registre utilise-t-on "choir" pour "tomber" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Archaïque'],
    correctAnswer: 3,
    explanation: '"Choir" appartient au registre archaïque, très ancien.',
    difficulty: 'difficile',
    skillId: 'registres-langue',
    level: 4
  },
  {
    id: 'vocab_093',
    question: 'Que signifie "battre la campagne" ?',
    options: ['Faire la guerre', 'Divaguer', 'Voyager', 'Chasser'],
    correctAnswer: 1,
    explanation: '"Battre la campagne" signifie divaguer, tenir des propos incohérents.',
    difficulty: 'difficile',
    skillId: 'expressions-idiomatiques',
    level: 4
  },
  {
    id: 'vocab_094',
    question: 'Quel mot appartient au champ lexical de la numismatique ?',
    options: ['Médaille', 'Recette', 'Partition', 'Ordonnance'],
    correctAnswer: 0,
    explanation: '"Médaille" appartient au champ lexical de la numismatique avec "monnaie", "pièce", "effigie".',
    difficulty: 'difficile',
    skillId: 'champ-lexical',
    level: 4
  },
  {
    id: 'vocab_095',
    question: 'Quel est l\'antonyme de "vénal" ?',
    options: ['Corruptible', 'Intègre', 'Malhonnête', 'Cupide'],
    correctAnswer: 1,
    explanation: '"Intègre" est l\'antonyme de "vénal" (qui se laisse corrompre).',
    difficulty: 'difficile',
    skillId: 'antonymes',
    level: 4
  },
  {
    id: 'vocab_096',
    question: 'Quel est le synonyme d\'"acrimonieux" ?',
    options: ['Doux', 'Aigre', 'Aimable', 'Bienveillant'],
    correctAnswer: 1,
    explanation: '"Aigre" est synonyme d\'"acrimonieux", qui exprime l\'amertume.',
    difficulty: 'difficile',
    skillId: 'synonymes',
    level: 4
  },
  {
    id: 'vocab_097',
    question: 'Dans quel registre classe-t-on "se repaître" ?',
    options: ['Familier', 'Courant', 'Soutenu', 'Technique'],
    correctAnswer: 2,
    explanation: '"Se repaître" (se nourrir) appartient au registre soutenu.',
    difficulty: 'difficile',
    skillId: 'registres-langue',
    level: 4
  },
  {
    id: 'vocab_098',
    question: 'Que signifie "faire chou blanc" ?',
    options: ['Cuisiner', 'Échouer', 'Réussir', 'Jardiner'],
    correctAnswer: 1,
    explanation: '"Faire chou blanc" signifie échouer complètement.',
    difficulty: 'difficile',
    skillId: 'expressions-idiomatiques',
    level: 4
  },
  {
    id: 'vocab_099',
    question: 'Quel est l\'antonyme de "prodigue" ?',
    options: ['Généreux', 'Avare', 'Dépensier', 'Libéral'],
    correctAnswer: 1,
    explanation: '"Avare" est l\'antonyme de "prodigue" (qui dépense sans compter).',
    difficulty: 'difficile',
    skillId: 'antonymes',
    level: 4
  },
  {
    id: 'vocab_100',
    question: 'Quel est le synonyme d\'"oblitérer" ?',
    options: ['Révéler', 'Effacer', 'Montrer', 'Éclairer'],
    correctAnswer: 1,
    explanation: '"Effacer" est synonyme d\'"oblitérer", faire disparaître.',
    difficulty: 'difficile',
    skillId: 'synonymes',
    level: 5
  }
];

// COMPRÉHENSION - 100 exercices complets
export const comprehensionExercises: FallbackExercise[] = [
  // Niveau facile (1-2) - 50 exercices
  {
    id: 'comp_001',
    question: 'Dans le texte "Marie aime les fleurs. Elle en plante dans son jardin.", de quoi parle principalement le texte ?',
    options: ['Des animaux', 'Du jardinage', 'De la cuisine', 'Du sport'],
    correctAnswer: 1,
    explanation: 'Le texte parle principalement du jardinage, car Marie plante des fleurs dans son jardin.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_002',
    question: 'Dans "Il fait beau aujourd\'hui. Les enfants jouent dehors.", quelle est l\'idée principale ?',
    options: ['Le mauvais temps', 'Les jeux d\'intérieur', 'Le beau temps et les jeux dehors', 'L\'école'],
    correctAnswer: 2,
    explanation: 'L\'idée principale est le lien entre le beau temps et le fait que les enfants jouent dehors.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_003',
    question: 'Dans "Pierre lit un livre passionnant. Il ne peut pas s\'arrêter.", que ressent Pierre ?',
    options: ['De l\'ennui', 'De l\'intérêt', 'De la fatigue', 'De la colère'],
    correctAnswer: 1,
    explanation: 'Pierre ressent de l\'intérêt car le livre est "passionnant" et il ne peut pas s\'arrêter.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_004',
    question: 'Dans "Mange tes légumes, ils sont bons pour la santé", quel est le but de cette phrase ?',
    options: ['Informer', 'Divertir', 'Convaincre', 'Raconter'],
    correctAnswer: 2,
    explanation: 'Le but est de convaincre de manger des légumes en donnant une raison (bons pour la santé).',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_005',
    question: 'Dans "Le chat dort sur le canapé. Il ronronne doucement.", de quoi parle le texte ?',
    options: ['D\'un chien', 'D\'un chat qui dort', 'D\'un oiseau', 'D\'une voiture'],
    correctAnswer: 1,
    explanation: 'Le texte parle d\'un chat qui dort paisiblement sur le canapé.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_006',
    question: 'Dans "Sophie range sa chambre avant l\'arrivée de ses amis", pourquoi Sophie range-t-elle ?',
    options: ['Par ennui', 'Pour faire plaisir à ses amis', 'Par habitude', 'Pour se distraire'],
    correctAnswer: 1,
    explanation: 'Sophie range pour faire bonne impression à ses amis qui vont arriver.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_007',
    question: 'Dans "Attention ! Route glissante par temps de pluie", quel est le but de ce message ?',
    options: ['Divertir', 'Prévenir', 'Raconter', 'Décrire'],
    correctAnswer: 1,
    explanation: 'Le but est de prévenir les conducteurs du danger de la route glissante.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_008',
    question: 'Dans "Tom prépare un gâteau pour l\'anniversaire de sa sœur", quelle est l\'idée principale ?',
    options: ['La cuisine en général', 'Un anniversaire', 'La préparation d\'un gâteau pour un anniversaire', 'Les desserts'],
    correctAnswer: 2,
    explanation: 'L\'idée principale combine la préparation du gâteau et l\'occasion (anniversaire).',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_009',
    question: 'Dans "Julie met son manteau car il fait froid", que peut-on comprendre ?',
    options: ['Julie a chaud', 'Julie veut sortir', 'Julie a froid', 'Julie aime son manteau'],
    correctAnswer: 2,
    explanation: 'On comprend que Julie a froid, c\'est pourquoi elle met son manteau.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_010',
    question: 'Dans "Brossez-vous les dents après chaque repas", quel est l\'objectif ?',
    options: ['Raconter', 'Conseiller', 'Décrire', 'Amuser'],
    correctAnswer: 1,
    explanation: 'L\'objectif est de conseiller une bonne hygiène dentaire.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_011',
    question: 'Dans "Les oiseaux migrent vers le sud en hiver", de quoi parle le texte ?',
    options: ['Du froid', 'De la migration des oiseaux', 'Du sud', 'De l\'hiver'],
    correctAnswer: 1,
    explanation: 'Le texte parle principalement du phénomène de migration des oiseaux.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_012',
    question: 'Dans "Paul ferme les volets car le soleil l\'éblouit", pourquoi Paul agit-il ainsi ?',
    options: ['Il veut dormir', 'Il a trop de lumière', 'Il a froid', 'Il s\'ennuie'],
    correctAnswer: 1,
    explanation: 'Paul ferme les volets parce qu\'il y a trop de lumière qui l\'éblouit.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_013',
    question: 'Dans "N\'oubliez pas votre parapluie, il va pleuvoir", quel est le but ?',
    options: ['Informer sur la météo', 'Vendre des parapluies', 'Donner un conseil', 'Raconter une histoire'],
    correctAnswer: 2,
    explanation: 'Le but est de donner un conseil pratique basé sur la météo.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_014',
    question: 'Dans "Emma arrose ses plantes tous les matins", quelle est l\'idée principale ?',
    options: ['Le matin', 'L\'eau', 'Les soins aux plantes', 'Le jardinage'],
    correctAnswer: 2,
    explanation: 'L\'idée principale est qu\'Emma prend soin de ses plantes régulièrement.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_015',
    question: 'Dans "Léo prend son cartable car il va à l\'école", que peut-on déduire ?',
    options: ['Léo est en vacances', 'C\'est un jour d\'école', 'Léo est malade', 'C\'est le weekend'],
    correctAnswer: 1,
    explanation: 'On peut déduire que c\'est un jour d\'école puisque Léo prend son cartable.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_016',
    question: 'Dans "Éteignez vos téléphones pendant le spectacle", quel est l\'objectif ?',
    options: ['Vendre des téléphones', 'Assurer le bon déroulement du spectacle', 'Parler de technologie', 'Divertir'],
    correctAnswer: 1,
    explanation: 'L\'objectif est d\'assurer que le spectacle se déroule sans perturbation.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_017',
    question: 'Dans "Les abeilles butinent de fleur en fleur", de quoi parle principalement le texte ?',
    options: ['Des fleurs', 'Du comportement des abeilles', 'Du miel', 'Du jardin'],
    correctAnswer: 1,
    explanation: 'Le texte parle principalement de l\'activité des abeilles (butiner).',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_018',
    question: 'Dans "Anna allume la lumière car il fait sombre", pourquoi Anna agit-elle ?',
    options: ['Elle a peur', 'Elle veut lire', 'Il manque de clarté', 'Elle aime la lumière'],
    correctAnswer: 2,
    explanation: 'Anna allume la lumière parce qu\'il manque de clarté (il fait sombre).',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_019',
    question: 'Dans "Attachez vos ceintures, nous décollons", quel est le but ?',
    options: ['Informer', 'Rassurer', 'Donner une instruction de sécurité', 'Divertir'],
    correctAnswer: 2,
    explanation: 'Le but est de donner une instruction de sécurité avant le décollage.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_020',
    question: 'Dans "Max nourrit les poissons de son aquarium", quelle est l\'idée principale ?',
    options: ['L\'eau', 'Les soins aux animaux domestiques', 'La nourriture', 'L\'aquarium'],
    correctAnswer: 1,
    explanation: 'L\'idée principale est que Max prend soin de ses animaux domestiques.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_021',
    question: 'Dans "Clara met des gants car elle va jardiner", que peut-on comprendre ?',
    options: ['Clara a froid', 'Clara veut protéger ses mains', 'Clara aime les gants', 'Clara est malade'],
    correctAnswer: 1,
    explanation: 'Clara met des gants pour protéger ses mains pendant le jardinage.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_022',
    question: 'Dans "Mangez cinq fruits et légumes par jour", quel est l\'objectif ?',
    options: ['Vendre des fruits', 'Promouvoir une alimentation saine', 'Parler d\'agriculture', 'Divertir'],
    correctAnswer: 1,
    explanation: 'L\'objectif est de promouvoir une alimentation équilibrée et saine.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_023',
    question: 'Dans "Le chien remue la queue quand son maître rentre", de quoi parle le texte ?',
    options: ['De la maison', 'De la joie du chien', 'Du travail', 'De la queue'],
    correctAnswer: 1,
    explanation: 'Le texte parle de la joie que manifeste le chien au retour de son maître.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_024',
    question: 'Dans "Théo prend un parapluie car le ciel est nuageux", que peut-on déduire ?',
    options: ['Il fait beau', 'Il pourrait pleuvoir', 'Il fait chaud', 'Il neige'],
    correctAnswer: 1,
    explanation: 'On peut déduire qu\'il pourrait pleuvoir vu le ciel nuageux.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_025',
    question: 'Dans "Respectez les limitations de vitesse", quel est le but ?',
    options: ['Informer sur les voitures', 'Assurer la sécurité routière', 'Parler de vitesse', 'Divertir'],
    correctAnswer: 1,
    explanation: 'Le but est d\'assurer la sécurité de tous sur la route.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_026',
    question: 'Dans "Les feuilles tombent en automne", quelle est l\'idée principale ?',
    options: ['Les arbres', 'Un phénomène naturel saisonnier', 'L\'automne', 'Les feuilles'],
    correctAnswer: 1,
    explanation: 'L\'idée principale est le phénomène naturel de la chute des feuilles en automne.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_027',
    question: 'Dans "Lisa met un pull car elle a froid", pourquoi Lisa agit-elle ?',
    options: ['Elle aime ce pull', 'Elle veut être élégante', 'Elle veut se réchauffer', 'Elle sort'],
    correctAnswer: 2,
    explanation: 'Lisa met un pull pour se réchauffer car elle a froid.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_028',
    question: 'Dans "Lavez-vous les mains avant de manger", quel est l\'objectif ?',
    options: ['Parler de nourriture', 'Promouvoir l\'hygiène', 'Vendre du savon', 'Raconter'],
    correctAnswer: 1,
    explanation: 'L\'objectif est de promouvoir une bonne hygiène pour éviter les maladies.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_029',
    question: 'Dans "Le bébé pleure car il a faim", de quoi parle le texte ?',
    options: ['Du sommeil', 'Des besoins du bébé', 'De la nourriture', 'Des pleurs'],
    correctAnswer: 1,
    explanation: 'Le texte parle des besoins du bébé et de la façon dont il les exprime.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_030',
    question: 'Dans "Hugo prend ses lunettes pour lire", que peut-on comprendre ?',
    options: ['Hugo aime lire', 'Hugo a des problèmes de vue', 'Hugo collectionne les lunettes', 'Hugo est fatigué'],
    correctAnswer: 1,
    explanation: 'On comprend qu\'Hugo a besoin de lunettes pour bien voir quand il lit.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_031',
    question: 'Dans "Recyclez vos déchets pour protéger l\'environnement", quel est le but ?',
    options: ['Parler de déchets', 'Sensibiliser à l\'écologie', 'Vendre des poubelles', 'Informer'],
    correctAnswer: 1,
    explanation: 'Le but est de sensibiliser les gens à la protection de l\'environnement.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_032',
    question: 'Dans "Les fleurs s\'ouvrent au soleil", quelle est l\'idée principale ?',
    options: ['Le soleil', 'La réaction des plantes à la lumière', 'Les fleurs', 'Le jardin'],
    correctAnswer: 1,
    explanation: 'L\'idée principale est la réaction naturelle des fleurs à la lumière du soleil.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_033',
    question: 'Dans "Zoé ferme la fenêtre car il y a du bruit dehors", pourquoi Zoé agit-elle ?',
    options: ['Elle a froid', 'Elle veut du calme', 'Elle va dormir', 'Elle n\'aime pas l\'air'],
    correctAnswer: 1,
    explanation: 'Zoé ferme la fenêtre pour avoir du calme et éviter le bruit.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_034',
    question: 'Dans "Portez un casque à vélo", quel est l\'objectif ?',
    options: ['Vendre des casques', 'Assurer la sécurité', 'Parler de vélo', 'Divertir'],
    correctAnswer: 1,
    explanation: 'L\'objectif est d\'assurer la sécurité des cyclistes.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_035',
    question: 'Dans "L\'oiseau construit son nid au printemps", de quoi parle le texte ?',
    options: ['Du printemps', 'De l\'instinct animal', 'Des arbres', 'Des nids'],
    correctAnswer: 1,
    explanation: 'Le texte parle de l\'instinct naturel des oiseaux à construire leur nid.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_036',
    question: 'Dans "Marc allume le chauffage car il fait froid", que peut-on déduire ?',
    options: ['Marc aime la chaleur', 'La température est basse', 'Marc va sortir', 'Il fait beau'],
    correctAnswer: 1,
    explanation: 'On peut déduire que la température est basse puisqu\'il fait froid.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_037',
    question: 'Dans "Économisez l\'eau, c\'est précieux", quel est le but ?',
    options: ['Parler d\'économie', 'Sensibiliser à la préservation de l\'eau', 'Vendre de l\'eau', 'Informer'],
    correctAnswer: 1,
    explanation: 'Le but est de sensibiliser à l\'importance de préserver cette ressource.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_038',
    question: 'Dans "Le chat se cache sous le lit pendant l\'orage", de quoi parle le texte ?',
    options: ['Du lit', 'De la peur des animaux', 'De l\'orage', 'Du chat'],
    correctAnswer: 1,
    explanation: 'Le texte parle de la réaction de peur du chat face à l\'orage.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_039',
    question: 'Dans "Lucie prend une veste car le vent est fort", pourquoi Lucie agit-elle ?',
    options: ['Elle aime cette veste', 'Elle veut se protéger du vent', 'Elle va travailler', 'Elle a froid'],
    correctAnswer: 1,
    explanation: 'Lucie prend une veste pour se protéger du vent fort.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_040',
    question: 'Dans "Éteignez les lumières en sortant", quel est l\'objectif ?',
    options: ['Parler d\'électricité', 'Économiser l\'énergie', 'Vendre des ampoules', 'Informer'],
    correctAnswer: 1,
    explanation: 'L\'objectif est d\'économiser l\'énergie et de réduire la consommation.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_041',
    question: 'Dans "Les enfants rient en regardant le spectacle", quelle est l\'idée principale ?',
    options: ['Le spectacle', 'La joie des enfants', 'Le rire', 'Les enfants'],
    correctAnswer: 1,
    explanation: 'L\'idée principale est la joie que procure le spectacle aux enfants.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_042',
    question: 'Dans "Alex met de la crème car il va au soleil", que peut-on comprendre ?',
    options: ['Alex aime la crème', 'Alex veut bronzer', 'Alex veut protéger sa peau', 'Alex va à la plage'],
    correctAnswer: 2,
    explanation: 'Alex met de la crème pour protéger sa peau des rayons du soleil.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_043',
    question: 'Dans "Respectez la nature lors de vos promenades", quel est le but ?',
    options: ['Promouvoir la randonnée', 'Sensibiliser au respect de l\'environnement', 'Parler de nature', 'Divertir'],
    correctAnswer: 1,
    explanation: 'Le but est de sensibiliser au respect et à la protection de la nature.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_044',
    question: 'Dans "Le poisson nage dans l\'aquarium", de quoi parle le texte ?',
    options: ['De l\'eau', 'De la vie en captivité', 'De l\'aquarium', 'Du poisson'],
    correctAnswer: 1,
    explanation: 'Le texte parle de la vie du poisson dans son environnement artificiel.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_045',
    question: 'Dans "Nina prend un livre car elle s\'ennuie", pourquoi Nina agit-elle ?',
    options: ['Elle aime lire', 'Elle veut se distraire', 'Elle étudie', 'Elle collectionne les livres'],
    correctAnswer: 1,
    explanation: 'Nina prend un livre pour se distraire et combattre l\'ennui.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_046',
    question: 'Dans "Soyez polis avec tout le monde", quel est l\'objectif ?',
    options: ['Parler de politesse', 'Promouvoir le respect mutuel', 'Donner des règles', 'Éduquer'],
    correctAnswer: 1,
    explanation: 'L\'objectif est de promouvoir le respect et la courtoisie envers autrui.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_047',
    question: 'Dans "L\'arbre perd ses feuilles en automne", quelle est l\'idée principale ?',
    options: ['L\'automne', 'Un cycle naturel', 'Les feuilles', 'L\'arbre'],
    correctAnswer: 1,
    explanation: 'L\'idée principale est le cycle naturel de la végétation selon les saisons.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },
  {
    id: 'comp_048',
    question: 'Dans "Romain met ses chaussures car il va sortir", que peut-on déduire ?',
    options: ['Romain aime ses chaussures', 'Romain va dehors', 'Romain travaille', 'Romain fait du sport'],
    correctAnswer: 1,
    explanation: 'On peut déduire que Romain va sortir dehors, d\'où la nécessité des chaussures.',
    difficulty: 'facile',
    skillId: 'sens-implicite',
    level: 1
  },
  {
    id: 'comp_049',
    question: 'Dans "Partagez vos jouets avec vos amis", quel est le but ?',
    options: ['Parler de jouets', 'Enseigner le partage', 'Vendre des jouets', 'Divertir'],
    correctAnswer: 1,
    explanation: 'Le but est d\'enseigner la valeur du partage et de la générosité.',
    difficulty: 'facile',
    skillId: 'intentions-auteur',
    level: 1
  },
  {
    id: 'comp_050',
    question: 'Dans "Le soleil se couche à l\'horizon", de quoi parle le texte ?',
    options: ['Du soleil', 'D\'un moment de la journée', 'De l\'horizon', 'Du coucher'],
    correctAnswer: 1,
    explanation: 'Le texte parle du moment du coucher du soleil, un moment particulier de la journée.',
    difficulty: 'facile',
    skillId: 'idee-principale',
    level: 1
  },

  // Niveau moyen (3) - 30 exercices
  {
    id: 'comp_051',
    question: 'Dans ce texte : "Bien que Pierre soit fatigué, il continue à travailler. Sa détermination est admirable.", que peut-on dire de Pierre ?',
    options: ['Il est paresseux', 'Il est persévérant', 'Il est malade', 'Il est découragé'],
    correctAnswer: 1,
    explanation: 'Pierre fait preuve de persévérance en continuant malgré la fatigue, ce que souligne "sa détermination est admirable".',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_052',
    question: 'Dans "Les nuages s\'amoncellent, le vent se lève. Les promeneurs pressent le pas.", quelle atmosphère se dégage ?',
    options: ['Paisible', 'Menaçante', 'Joyeuse', 'Nostalgique'],
    correctAnswer: 1,
    explanation: 'L\'accumulation des nuages, le vent et la hâte des promeneurs créent une atmosphère menaçante d\'orage imminent.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_053',
    question: 'Dans "Cette publicité vante les mérites d\'un produit miracle", quelle est l\'intention probable ?',
    options: ['Informer objectivement', 'Persuader d\'acheter', 'Divertir', 'Éduquer'],
    correctAnswer: 1,
    explanation: 'Une publicité qui "vante les mérites" a pour intention de persuader et convaincre d\'acheter.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_054',
    question: 'Dans "Ses yeux brillaient comme des étoiles", quelle figure de style est utilisée ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
    correctAnswer: 1,
    explanation: 'La présence de "comme" indique une comparaison entre les yeux et les étoiles.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_055',
    question: 'Dans "Marie sourit, mais ses yeux restent tristes", que peut-on comprendre ?',
    options: ['Marie est heureuse', 'Marie cache sa tristesse', 'Marie est fatiguée', 'Marie est en colère'],
    correctAnswer: 1,
    explanation: 'Le contraste entre le sourire et les yeux tristes révèle que Marie dissimule sa vraie émotion.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_056',
    question: 'Dans "Ce roman dénonce les inégalités sociales", quel est le but de l\'auteur ?',
    options: ['Divertir', 'Critiquer et sensibiliser', 'Informer', 'Raconter'],
    correctAnswer: 1,
    explanation: 'Le verbe "dénonce" indique une intention critique et de sensibilisation aux problèmes sociaux.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_057',
    question: 'Dans "Le silence était si profond qu\'on entendait voler une mouche", quelle figure de style ?',
    options: ['Métaphore', 'Comparaison', 'Hyperbole', 'Personnification'],
    correctAnswer: 2,
    explanation: 'L\'exagération du silence (entendre voler une mouche) constitue une hyperbole.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_058',
    question: 'Dans "Paul regarde sa montre pour la dixième fois", que peut-on déduire ?',
    options: ['Paul aime sa montre', 'Paul est impatient', 'Paul est en retard', 'Paul s\'ennuie'],
    correctAnswer: 1,
    explanation: 'Regarder sa montre répétitivement traduit l\'impatience et l\'attente.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_059',
    question: 'Dans "Cet article présente les avantages et inconvénients du télétravail", quelle est l\'intention ?',
    options: ['Convaincre', 'Informer objectivement', 'Critiquer', 'Divertir'],
    correctAnswer: 1,
    explanation: 'Présenter les deux aspects (avantages et inconvénients) indique une volonté d\'information objective.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_060',
    question: 'Dans "La ville dort paisiblement", quelle figure de style est employée ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
    correctAnswer: 2,
    explanation: 'Attribuer l\'action "dormir" à la ville constitue une personnification.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_061',
    question: 'Dans "Sophie tapote nerveusement son stylo pendant l\'examen", que révèle ce geste ?',
    options: ['Sa concentration', 'Son stress', 'Son ennui', 'Sa fatigue'],
    correctAnswer: 1,
    explanation: 'Le geste nerveux répétitif pendant un examen révèle le stress et l\'anxiété.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_062',
    question: 'Dans "Ce guide pratique vous aide à économiser l\'énergie", quel est l\'objectif ?',
    options: ['Vendre de l\'énergie', 'Aider concrètement', 'Critiquer', 'Divertir'],
    correctAnswer: 1,
    explanation: 'Un "guide pratique" a pour objectif d\'aider concrètement les lecteurs.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_063',
    question: 'Dans "Ses paroles étaient du miel", quelle figure de style ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
    correctAnswer: 0,
    explanation: 'L\'identification directe des paroles au miel (sans "comme") constitue une métaphore.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_064',
    question: 'Dans "Tom évite le regard de ses parents après sa bêtise", que peut-on comprendre ?',
    options: ['Tom est fier', 'Tom a honte', 'Tom est en colère', 'Tom est fatigué'],
    correctAnswer: 1,
    explanation: 'Éviter le regard après une bêtise traduit la honte et la culpabilité.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_065',
    question: 'Dans "Cette enquête révèle la vérité sur l\'affaire", quelle est l\'intention ?',
    options: ['Divertir', 'Révéler et informer', 'Critiquer', 'Persuader'],
    correctAnswer: 1,
    explanation: 'Une enquête qui "révèle la vérité" a pour intention d\'informer et d\'éclairer.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_066',
    question: 'Dans "Le temps file comme l\'éclair", quelle figure de style ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
    correctAnswer: 1,
    explanation: 'La présence de "comme" indique une comparaison entre le temps et l\'éclair.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_067',
    question: 'Dans "Lisa serre fort son doudou en entendant le tonnerre", que révèle ce comportement ?',
    options: ['Sa joie', 'Sa peur', 'Sa colère', 'Son ennui'],
    correctAnswer: 1,
    explanation: 'Se cramponner à un objet réconfortant lors d\'un bruit effrayant révèle la peur.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_068',
    question: 'Dans "Ce témoignage bouleversant nous fait réfléchir", quel est l\'effet recherché ?',
    options: ['Divertir', 'Émouvoir et faire réfléchir', 'Informer', 'Critiquer'],
    correctAnswer: 1,
    explanation: 'Un témoignage "bouleversant" vise à émouvoir et provoquer la réflexion.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_069',
    question: 'Dans "La nuit étend son manteau noir", quelle figure de style ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
    correctAnswer: 2,
    explanation: 'Attribuer l\'action "étendre" à la nuit constitue une personnification.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_070',
    question: 'Dans "Max baisse la tête quand on lui fait des reproches", que traduit cette attitude ?',
    options: ['Sa fierté', 'Sa soumission', 'Sa colère', 'Son indifférence'],
    correctAnswer: 1,
    explanation: 'Baisser la tête face aux reproches traduit la soumission et l\'acceptation de la critique.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_071',
    question: 'Dans "Ce manuel explique clairement les règles", quel est l\'objectif ?',
    options: ['Convaincre', 'Enseigner', 'Critiquer', 'Divertir'],
    correctAnswer: 1,
    explanation: 'Un manuel qui "explique clairement" a pour objectif d\'enseigner et de transmettre des connaissances.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_072',
    question: 'Dans "Il pleut des cordes", quelle figure de style ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
    correctAnswer: 3,
    explanation: 'L\'exagération de l\'intensité de la pluie constitue une hyperbole.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_073',
    question: 'Dans "Emma rougit quand on la complimente", que révèle cette réaction ?',
    options: ['Sa colère', 'Sa timidité', 'Sa tristesse', 'Son indifférence'],
    correctAnswer: 1,
    explanation: 'Rougir face aux compliments révèle la timidité et la gêne.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_074',
    question: 'Dans "Cette campagne sensibilise aux dangers du tabac", quelle est l\'intention ?',
    options: ['Vendre des cigarettes', 'Prévenir et alerter', 'Divertir', 'Informer factuellement'],
    correctAnswer: 1,
    explanation: 'Une campagne de sensibilisation vise à prévenir et alerter sur les risques.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_075',
    question: 'Dans "Le vent murmure dans les arbres", quelle figure de style ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
    correctAnswer: 2,
    explanation: 'Attribuer l\'action "murmurer" au vent constitue une personnification.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_076',
    question: 'Dans "Léo se ronge les ongles avant son exposé", que traduit ce geste ?',
    options: ['Sa joie', 'Son anxiété', 'Sa fatigue', 'Sa concentration'],
    correctAnswer: 1,
    explanation: 'Se ronger les ongles avant une épreuve traduit l\'anxiété et le stress.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_077',
    question: 'Dans "Ce reportage dénonce les conditions de travail", quel est le but ?',
    options: ['Divertir', 'Critiquer et alerter', 'Vendre', 'Raconter'],
    correctAnswer: 1,
    explanation: 'Un reportage qui "dénonce" a pour but de critiquer et d\'alerter l\'opinion.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },
  {
    id: 'comp_078',
    question: 'Dans "Ses yeux lançaient des éclairs", quelle figure de style ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
    correctAnswer: 0,
    explanation: 'L\'identification directe des yeux aux éclairs constitue une métaphore exprimant la colère.',
    difficulty: 'moyen',
    skillId: 'figures-style',
    level: 3
  },
  {
    id: 'comp_079',
    question: 'Dans "Anna soupire en regardant la pile de devoirs", que ressent-elle ?',
    options: ['De la joie', 'Du découragement', 'De la colère', 'De l\'indifférence'],
    correctAnswer: 1,
    explanation: 'Soupirer devant une tâche importante traduit le découragement et la lassitude.',
    difficulty: 'moyen',
    skillId: 'sens-implicite',
    level: 3
  },
  {
    id: 'comp_080',
    question: 'Dans "Ce guide vous accompagne pas à pas", quel est l\'objectif ?',
    options: ['Critiquer', 'Aider progressivement', 'Divertir', 'Vendre'],
    correctAnswer: 1,
    explanation: 'Un guide qui accompagne "pas à pas" vise à aider de manière progressive et méthodique.',
    difficulty: 'moyen',
    skillId: 'intentions-auteur',
    level: 3
  },

  // Niveau difficile (4-5) - 20 exercices
  {
    id: 'comp_081',
    question: 'Dans "Son silence était plus éloquent que tous les discours", que signifie cette phrase ?',
    options: ['Il ne savait pas parler', 'Son silence exprimait plus que des mots', 'Il était timide', 'Il boudait'],
    correctAnswer: 1,
    explanation: 'Cette phrase paradoxale signifie que le silence était plus expressif et révélateur que n\'importe quel discours.',
    difficulty: 'difficile',
    skillId: 'sens-implicite',
    level: 4
  },
  {
    id: 'comp_082',
    question: 'Dans "L\'ironie mordante de l\'auteur transperce le vernis social", quelle est l\'intention ?',
    options: ['Divertir', 'Critiquer la société avec subtilité', 'Informer', 'Enseigner'],
    correctAnswer: 1,
    explanation: 'L\'ironie "mordante" qui "transperce le vernis" révèle une critique sociale subtile et acerbe.',
    difficulty: 'difficile',
    skillId: 'intentions-auteur',
    level: 4
  },
  {
    id: 'comp_083',
    question: 'Dans "La métaphore filée du labyrinthe structure tout le récit", quel est l\'effet littéraire ?',
    options: ['Décorer le texte', 'Créer une cohérence symbolique', 'Compliquer la lecture', 'Impressionner'],
    correctAnswer: 1,
    explanation: 'Une métaphore filée crée une cohérence symbolique en développant une image tout au long du récit.',
    difficulty: 'difficile',
    skillId: 'figures-style',
    level: 4
  },
  {
    id: 'comp_084',
    question: 'Dans "Ses non-dits en disaient long sur ses véritables intentions", que comprend-on ?',
    options: ['Il parlait peu', 'Ce qu\'il taisait était révélateur', 'Il mentait', 'Il était discret'],
    correctAnswer: 1,
    explanation: 'Les "non-dits" qui "en disent long" suggèrent que ce qui n\'est pas exprimé révèle les vraies intentions.',
    difficulty: 'difficile',
    skillId: 'sens-implicite',
    level: 4
  },
  {
    id: 'comp_085',
    question: 'Dans "Cette dystopie nous met en garde contre les dérives totalitaires", quel est le but ?',
    options: ['Divertir', 'Avertir par la fiction', 'Enseigner l\'histoire', 'Critiquer le présent'],
    correctAnswer: 1,
    explanation: 'Une dystopie qui "met en garde" utilise la fiction pour avertir des dangers potentiels.',
    difficulty: 'difficile',
    skillId: 'intentions-auteur',
    level: 4
  },
  {
    id: 'comp_086',
    question: 'Dans "L\'oxymore \'obscure clarté\' révèle la complexité du personnage", quel est l\'effet ?',
    options: ['Créer de la beauté', 'Exprimer une contradiction', 'Impressionner', 'Décorer'],
    correctAnswer: 1,
    explanation: 'L\'oxymore exprime une contradiction apparente qui révèle la complexité psychologique.',
    difficulty: 'difficile',
    skillId: 'figures-style',
    level: 4
  },
  {
    id: 'comp_087',
    question: 'Dans "Son acquiescement masquait une résistance farouche", que révèle cette phrase ?',
    options: ['Il était d\'accord', 'Il dissimulait son opposition', 'Il était indécis', 'Il était soumis'],
    correctAnswer: 1,
    explanation: 'L\'acquiescement apparent cache en réalité une forte opposition intérieure.',
    difficulty: 'difficile',
    skillId: 'sens-implicite',
    level: 4
  },
  {
    id: 'comp_088',
    question: 'Dans "L\'allégorie de la caverne interroge notre rapport à la réalité", quel est l\'objectif ?',
    options: ['Raconter une histoire', 'Faire réfléchir philosophiquement', 'Divertir', 'Enseigner la géologie'],
    correctAnswer: 1,
    explanation: 'Une allégorie qui "interroge" vise à provoquer une réflexion philosophique profonde.',
    difficulty: 'difficile',
    skillId: 'intentions-auteur',
    level: 4
  },
  {
    id: 'comp_089',
    question: 'Dans "La synecdoque \'toutes les voiles\' évoque la flotte entière", quel est l\'effet ?',
    options: ['Simplifier', 'Représenter le tout par la partie', 'Embellir', 'Préciser'],
    correctAnswer: 1,
    explanation: 'La synecdoque utilise une partie (les voiles) pour représenter le tout (les navires).',
    difficulty: 'difficile',
    skillId: 'figures-style',
    level: 4
  },
  {
    id: 'comp_090',
    question: 'Dans "Ses silences étaient plus bavards que ses paroles", que signifie cette antithèse ?',
    options: ['Il parlait peu', 'Ses silences étaient expressifs', 'Il était timide', 'Il réfléchissait'],
    correctAnswer: 1,
    explanation: 'Cette antithèse paradoxale suggère que les silences révélaient plus que les paroles prononcées.',
    difficulty: 'difficile',
    skillId: 'sens-implicite',
    level: 4
  },
  {
    id: 'comp_091',
    question: 'Dans "Cette satire féroce épingle les travers de l\'époque", quelle est l\'intention ?',
    options: ['Divertir', 'Critiquer avec humour', 'Informer', 'Enseigner'],
    correctAnswer: 1,
    explanation: 'Une satire "féroce" qui "épingle" vise à critiquer avec un humour mordant.',
    difficulty: 'difficile',
    skillId: 'intentions-auteur',
    level: 4
  },
  {
    id: 'comp_092',
    question: 'Dans "La litote \'ce n\'est pas mal\' exprime en fait l\'admiration", quel est l\'effet ?',
    options: ['Minimiser', 'Exprimer plus en disant moins', 'Critiquer', 'Hésiter'],
    correctAnswer: 1,
    explanation: 'La litote exprime une idée forte par une formulation volontairement atténuée.',
    difficulty: 'difficile',
    skillId: 'figures-style',
    level: 4
  },
  {
    id: 'comp_093',
    question: 'Dans "Son apparent détachement trahissait une émotion profonde", que comprend-on ?',
    options: ['Il était indifférent', 'Il cachait ses sentiments', 'Il était calme', 'Il s\'ennuyait'],
    correctAnswer: 1,
    explanation: 'Le détachement "apparent" qui "trahit" révèle que l\'indifférence masque une forte émotion.',
    difficulty: 'difficile',
    skillId: 'sens-implicite',
    level: 4
  },
  {
    id: 'comp_094',
    question: 'Dans "Cette parabole moderne questionne nos valeurs contemporaines", quel est le but ?',
    options: ['Raconter', 'Faire réfléchir moralement', 'Divertir', 'Informer'],
    correctAnswer: 1,
    explanation: 'Une parabole qui "questionne nos valeurs" vise à provoquer une réflexion morale et éthique.',
    difficulty: 'difficile',
    skillId: 'intentions-auteur',
    level: 4
  },
  {
    id: 'comp_095',
    question: 'Dans "L\'euphémisme \'il nous a quittés\' adoucit la réalité", quel est l\'effet ?',
    options: ['Préciser', 'Atténuer une vérité pénible', 'Embellir', 'Mystifier'],
    correctAnswer: 1,
    explanation: 'L\'euphémisme atténue une réalité douloureuse (la mort) par une expression plus douce.',
    difficulty: 'difficile',
    skillId: 'figures-style',
    level: 4
  },
  {
    id: 'comp_096',
    question: 'Dans "Ses protestations véhémentes masquaient sa culpabilité", que révèle l\'analyse ?',
    options: ['Il était innocent', 'Il surcompensait sa culpabilité', 'Il était en colère', 'Il était sincère'],
    correctAnswer: 1,
    explanation: 'Des protestations excessives peuvent révéler une tentative de masquer la culpabilité par surcompensation.',
    difficulty: 'difficile',
    skillId: 'sens-implicite',
    level: 5
  },
  {
    id: 'comp_097',
    question: 'Dans "Cette fable contemporaine dénonce subtilement l\'hypocrisie sociale", quelle stratégie ?',
    options: ['Attaquer directement', 'Critiquer par l\'allégorie', 'Informer', 'Divertir'],
    correctAnswer: 1,
    explanation: 'Une fable utilise l\'allégorie pour critiquer de manière indirecte mais efficace.',
    difficulty: 'difficile',
    skillId: 'intentions-auteur',
    level: 5
  },
  {
    id: 'comp_098',
    question: 'Dans "L\'antiphrase \'Quel génie !\' souligne l\'incompétence", quel est l\'effet ?',
    options: ['Complimenter', 'Critiquer par l\'ironie', 'Encourager', 'Constater'],
    correctAnswer: 1,
    explanation: 'L\'antiphrase exprime le contraire de ce qui est dit pour critiquer avec ironie.',
    difficulty: 'difficile',
    skillId: 'figures-style',
    level: 5
  },
  {
    id: 'comp_099',
    question: 'Dans "Son mutisme obstiné parlait plus fort que tous les aveux", que signifie cette paradoxe ?',
    options: ['Il ne savait que dire', 'Son silence était révélateur', 'Il était têtu', 'Il réfléchissait'],
    correctAnswer: 1,
    explanation: 'Ce paradoxe suggère que le refus de parler révèle plus que n\'importe quelle confession.',
    difficulty: 'difficile',
    skillId: 'sens-implicite',
    level: 5
  },
  {
    id: 'comp_100',
    question: 'Dans "Cette œuvre polysémique offre plusieurs niveaux de lecture", quel est l\'intérêt ?',
    options: ['Compliquer', 'Enrichir l\'interprétation', 'Impressionner', 'Cacher le sens'],
    correctAnswer: 1,
    explanation: 'La polysémie enrichit l\'œuvre en permettant plusieurs interprétations complémentaires.',
    difficulty: 'difficile',
    skillId: 'intentions-auteur',
    level: 5
  }
];

// Fonction pour obtenir des exercices aléatoirement
export function getRandomFallbackExercises(module: string, count: number = 5): FallbackExercise[] {
  let exercises: FallbackExercise[] = [];
  
  switch (module) {
    case 'orthographe':
      exercises = [...orthographeExercises];
      break;
    case 'grammaire':
      exercises = [...grammaireExercises];
      break;
    case 'vocabulaire':
      exercises = [...vocabulaireExercises];
      break;
    case 'comprehension':
      exercises = [...comprehensionExercises];
      break;
    default:
      exercises = [...orthographeExercises];
  }
  
  // Mélanger les exercices
  for (let i = exercises.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
  }
  
  return exercises.slice(0, count);
}

// Fonction pour obtenir des exercices par niveau
export function getFallbackExercisesByLevel(module: string, level: number, count: number = 5): FallbackExercise[] {
  let exercises: FallbackExercise[] = [];
  
  switch (module) {
    case 'orthographe':
      exercises = orthographeExercises.filter(ex => ex.level === level);
      break;
    case 'grammaire':
      exercises = grammaireExercises.filter(ex => ex.level === level);
      break;
    case 'vocabulaire':
      exercises = vocabulaireExercises.filter(ex => ex.level === level);
      break;
    case 'comprehension':
      exercises = comprehensionExercises.filter(ex => ex.level === level);
      break;
    default:
      exercises = orthographeExercises.filter(ex => ex.level === level);
  }
  
  // Mélanger et retourner
  for (let i = exercises.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
  }
  
  return exercises.slice(0, count);
}

// Fonction pour obtenir des exercices par difficulté
export function getFallbackExercisesByDifficulty(module: string, difficulty: 'facile' | 'moyen' | 'difficile', count: number = 5): FallbackExercise[] {
  let exercises: FallbackExercise[] = [];
  
  switch (module) {
    case 'orthographe':
      exercises = orthographeExercises.filter(ex => ex.difficulty === difficulty);
      break;
    case 'grammaire':
      exercises = grammaireExercises.filter(ex => ex.difficulty === difficulty);
      break;
    case 'vocabulaire':
      exercises = vocabulaireExercises.filter(ex => ex.difficulty === difficulty);
      break;
    case 'comprehension':
      exercises = comprehensionExercises.filter(ex => ex.difficulty === difficulty);
      break;
    default:
      exercises = orthographeExercises.filter(ex => ex.difficulty === difficulty);
  }
  
  // Mélanger et retourner
  for (let i = exercises.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
  }
  
  return exercises.slice(0, count);
}