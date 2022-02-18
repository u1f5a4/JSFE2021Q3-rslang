import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';
import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';
import css from './StatStyles.module.scss';
import View from '../../core/View';
import { StatDate, UserStat } from '../AppModel';

class StatView extends View {
  titlePage = `Статистика за день`;

  subtitlePage = `Отслеживай свой прогресс и корректируй своё обучение`;

  descAudioGame = `В игре “Аудиовызов”, к слову на английском языке будет 
    предложен перевод, правильный он или нет, решаешь ты`;

  descSprintGame = `В игре “Спринт”, произносится слово на английском, 
    а ты выбираешь правильный перевод из пяти вариантов`;

  drawPage() {
    document.title = this.titlemain + this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  drawNumbers(stat: UserStat) {
    // console.log(stat);

    const date = new Date().toLocaleDateString(); // '18/02/2022'
    const dayStat = stat.optional.data.find(
      (elem) => elem.date === date
    ) as StatDate;

    const wordNew = document.querySelector('#word-new');
    wordNew!.textContent = String(dayStat?.words.words);

    const wordEasy = document.querySelector('#word-easy');
    wordEasy!.textContent = String(dayStat?.words.easyQty);

    const audioNew = document.querySelector('#audio-new');
    audioNew!.textContent = String(dayStat?.audioGame.words.length);

    const audioRight = document.querySelector('#audio-right');
    const audioOneProcent = dayStat!.audioGame.words.length / 100;
    const audioAvg = dayStat.audioGame.right / audioOneProcent;
    audioRight!.textContent = String(`${audioAvg}%`);

    const audioSeries = document.querySelector('#audio-series');
    audioSeries!.textContent = String(dayStat?.audioGame.series);

    const sprintNew = document.querySelector('#sprint-new');
    sprintNew!.textContent = String(dayStat?.sprintGame.words.length);

    const sprintRight = document.querySelector('#sprint-right');
    const sprintOneProcent = dayStat!.audioGame.words.length / 100;
    const sprintAvg = dayStat.sprintGame.right / sprintOneProcent;
    sprintRight!.textContent = String(`${sprintAvg}%`);

    const sprintSeries = document.querySelector('#sprint-series');
    sprintSeries!.textContent = String(dayStat?.sprintGame.series);

    const wordRight = document.querySelector('#word-right');
    wordRight!.textContent = String(
      `${this.countRightAnswers(dayStat, audioAvg, sprintAvg)}%`
    );
  }

  // eslint-disable-next-line consistent-return
  countRightAnswers(dayStat: StatDate, audioAvg: number, sprintAvg: number) {
    if (dayStat.audioGame.words.length) return audioAvg;
    if (dayStat.sprintGame.words.length) return sprintAvg;
    if (dayStat.sprintGame.words.length && dayStat.audioGame.words.length)
      return (audioAvg + sprintAvg) / 2;
  }

  getHtml() {
    return `
        ${renderHeaderTemplate()} 
        <div class="${css.content}">
          ${renderPageDescTemplate(this.titlePage, this.subtitlePage)}
              <div class="${css.wrapper}">
                <div class="${css.list}">
                  <div class="${css.card}">
                    <div class="${css['card__header-block']}">
                      <p class='${css['title-font']}'>🤓</p>
                      <p class='${css['header-font']} ${css.header}'>
                        По словам</p>
                    </div>
                    <div class="${css['card__body-block']}">
                      <div class="${css['card__text-block']}">
                        <p class="${css['text-font']}
                          ${css.text}">Новых слов:</p>
                        <p class="${css['text-font']} ${css.text}"
                          id="word-new"></p></div>
                      <div class="${css['card__text-block']}">
                        <p class="${css['text-font']} ${css.text}">Изучено:</p>
                        <p class="${css['text-font']} ${css.text}"
                         id="word-easy"></p></div>
                      <div class="${css['card__text-block']}">
                        <p class="${css['text-font']} ${css.text}">
                          Правильных ответов:</p>
                        <p class="${css['text-font']} ${css.text}" 
                            id="word-right"></p></div>
                    </div>
                  </div>

                  <div class="${css.card}">
                    <div class="${css['card__header-block']}">
                      <p class='${css['title-font']}'>📢</p> 
                      <p class='${css['header-font']} ${css.header}'>
                        “Аудиовызов”</p>
                    </div>
                    <div class="${css['card__body-block']}">
                      <div class="${css['card__text-block']}">
                        <p class="${css['text-font']} ${css.text}">
                          Новых слов:</p>
                        <p class="${css['text-font']} ${css.text}" 
                          id="audio-new"></p></div>
                      <div class="${css['card__text-block']}">
                        <p class="${css['text-font']} ${css.text}">
                          Правильных ответов:</p>
                        <p class="${css['text-font']} ${css.text}" 
                        id="audio-right"></p></div>
                      <div class="${css['card__text-block']}">
                      <p class="${css['text-font']} ${css.text}">
                        Правильных ответов подряд:</p>
                      <p class="${css['text-font']} ${css.text}" 
                        id="audio-series"></p></div>
                    </div>
                  </div>

                  <div class="${css.card}">
                    <div class="${css['card__header-block']}">
                      <p class='${css['title-font']}'>😥</p>
                      <p class='${css['header-font']} ${css.header}'>
                        “Спринт”</p>
                    </div>
                    <div class="${css['card__body-block']}">
                      <div class="${css['card__text-block']}">
                        <p class="${css['text-font']} ${css.text}">
                          Новых слов:</p>
                        <p class="${css['text-font']} ${css.text}"
                         id="sprint-new"></p>
                      </div>
                      <div class="${css['card__text-block']}">
                        <p class="${css['text-font']} ${css.text}">
                          Правильных ответов:</p>
                        <p class="${css['text-font']} ${css.text}" 
                          id="sprint-right"></p>
                      </div>
                      <div class="${css['card__text-block']}">
                        <p class="${css['text-font']} ${css.text}">
                          Правильных ответов подряд:</p>
                        <p class="${css['text-font']} ${css.text}" 
                          id="sprint-series"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        ${renderFooterTemplate()}
      `;
  }
}
export default StatView;
