type PageCardsType = {
  cardTitle: string;
  cardSubtitle: string;
  cardIconClassName: string;
}[];

const pageCardsData: PageCardsType = [
  {
    cardTitle: 'Учебная программа',
    cardSubtitle:
      'Более 3500 слов, 6 уровней сложности. Изучай новые слова, слушай произношение, используй их в контексте.',
    cardIconClassName: 'book-icon',
  },
  {
    cardTitle: 'Двигайся в своём ритме',
    cardSubtitle:
      'Следи за своим прогрессом по мере изучения новых слов, отмечай сложные слова и вернись к их изучению повторно.',
    cardIconClassName: 'stair-icon',
  },
  {
    cardTitle: 'Отслеживай свой успех',
    cardSubtitle:
      'Не забудь заглянуть в статистику: здесь твои новые рекорды каждый день.',
    cardIconClassName: 'segments-icon',
  },
  {
    cardTitle: 'Игры как способ изучения',
    cardSubtitle: 'Проведи увлекательно время, изучая новые слова в игре. ',
    cardIconClassName: 'puzzle-icon',
  },
];

export default pageCardsData;
