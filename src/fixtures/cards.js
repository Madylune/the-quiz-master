export const CARDS = [
  {
    id: 'card_1',
    picture: 'inverse',
    description: 'Je peux inverser l\'ordre de passage',
    title: 'Inverse le sens'
    //effect: updateSession({ players: initPlayersOrder(reverse(session.players)) })
  },
  {
    id: 'card_2',
    picture: 'crown',
    description: 'Si je suis actuellement Quiz Master, je peux le rester en jouant cette carte',
    title: 'Je reste Quiz Master'
  },
  {
    id: 'card_3',
    picture: 'change',
    description: 'Je peux échanger mes cartes contre celles d\'un autre joueur',
    title: 'Echange de main'
    //effect: updateUsers({ cards: get('cards', user)})
  },
  {
    id: 'card_4',
    picture: 'reduce',
    description: 'Je peux réduire le temps de réponse de mes adversaires de 2 secondes',
    title: 'Réduction de temps'
    //effect: delay + 2000
  },
  {
    id: 'card_5',
    picture: 'copy',
    description: 'Je peux copier la réponse d\'un autre joueur 1 fois durant le tour',
    title: 'Copie une réponse'
  },
  {
    id: 'card_6',
    picture: 'pass',
    description: 'Je peux passer 1 fois mon tour de réponse',
    title: 'Passe mon tour'
  },
  {
    id: 'card_7',
    picture: 'steal',
    description: 'Je peux voler une carte d\'un autre joueur',
    title: 'Vol de carte'
  },
  {
    id: 'card_8',
    picture: 'twice',
    description: 'Le joueur désigné devra donner deux réponses au lieu d\'une',
    title: 'Double réponse'
  },
  {
    id: 'card_9',
    picture: 'improve',
    description: 'Augmente mon délai de réponse',
    title: 'Augmente mon temps'
  },
  {
    id: 'card_10',
    picture: 'blank',
    description: 'Cette carte ne possède aucun pouvoir',
    title: 'Pas de chance'
  },
]