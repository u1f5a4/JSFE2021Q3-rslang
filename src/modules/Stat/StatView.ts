import Chartist from 'chartist';
import './chartist.scss';

import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';
import renderFooterTemplate from '../../components/Footer/_renderFooterTemplate';
import css from './StatStyles.module.scss';
import View from '../../core/View';
import AppModel, { StatDate, UserStat } from '../AppModel';

class StatView extends View {
  model?: AppModel;

  titlePage = `Статистика`;

  subtitlePage = `Отслеживай свой прогресс и корректируй своё обучение`;

  drawPage() {
    document.title = this.titlemain + this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  drawNumbers(stat: UserStat) {
    // console.log(stat);

    const date = this.model?.getStringDate(); // '18/02/2022'
    const dayStat = stat.optional.data.find(
      (elem) => elem.date === date
    ) as StatDate;

    const wordNew = document.querySelector('#word-new');
    wordNew!.textContent = String(dayStat?.words.words);

    const wordEasy = document.querySelector('#word-easy');
    wordEasy!.textContent = String(dayStat?.words.easyQty);

    const audioNew = document.querySelector('#audio-new');
    audioNew!.textContent = String(dayStat?.audioGame.words.length);

    const audioSeries = document.querySelector('#audio-series');
    audioSeries!.textContent = String(dayStat?.audioGame.series);

    const sprintNew = document.querySelector('#sprint-new');
    sprintNew!.textContent = String(dayStat?.sprintGame.words.length);

    const sprintSeries = document.querySelector('#sprint-series');
    sprintSeries!.textContent = String(dayStat?.sprintGame.series);

    const { wordAvg, audioAvg, sprintAvg } = this.countRightAnswers(dayStat);

    const audioRight = document.querySelector('#audio-right');
    audioRight!.textContent = String(`${audioAvg}%`);

    const sprintRight = document.querySelector('#sprint-right');
    sprintRight!.textContent = String(`${sprintAvg}%`);

    const wordRight = document.querySelector('#word-right');
    wordRight!.textContent = String(`${wordAvg}%`);
  }

  // eslint-disable-next-line consistent-return
  countRightAnswers(dayStat: StatDate) {
    const audioLen = dayStat.audioGame.words.length;
    const sprintLen = dayStat.sprintGame.words.length;

    let audioAvg = 0;
    let sprintAvg = 0;
    let wordAvg = 0;

    if (audioLen) {
      audioAvg = +(
        (dayStat.audioGame.right /
          (dayStat.audioGame.right + dayStat.audioGame.wrong)) *
        100
      ).toFixed(1);
      wordAvg = audioAvg;
    }
    if (sprintLen) {
      sprintAvg = +(
        (dayStat.sprintGame.right /
          (dayStat.sprintGame.right + dayStat.sprintGame.wrong)) *
        100
      ).toFixed(1);
      wordAvg = sprintAvg;
    }
    if (audioLen && sprintLen) {
      wordAvg = +((audioAvg + sprintAvg) / 2).toFixed(1);
    }

    return { wordAvg, audioAvg, sprintAvg };
  }

  graphNewWord(dates: string[], data: number[]) {
    // eslint-disable-next-line no-new
    new Chartist.Line(
      '.ct-new-word',
      {
        labels: dates,
        series: [data],
      },
      {
        fullWidth: true,
        chartPadding: {
          right: 60,
        },
      }
    );
  }

  graphLearnWord(dates: string[], data: number[]) {
    // eslint-disable-next-line no-new
    new Chartist.Line(
      '.ct-new-learn-word',
      {
        labels: dates,
        series: [data],
      },
      {
        fullWidth: true,
        chartPadding: {
          right: 60,
        },
      }
    );
  }

  getHtml() {
    return `
        ${renderHeaderTemplate()} 
        <div class="${css.content}">
          ${renderPageDescTemplate(
            `${this.titlePage} за сегодня`,
            this.subtitlePage
          )}
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

                <div class="${css.block}">
                  ${renderPageDescTemplate(`Новых слов за всё время`, '')}
                  <div class="ct-new-word"></div>
                </div>
              <div class="${css.block}">
                ${renderPageDescTemplate(`Изученных слов за всё время`, '')}
                <div class="ct-new-learn-word"></div>
              </div>
            </div>
        </div>
        ${renderFooterTemplate()}
      `;
  }
}
export default StatView;
