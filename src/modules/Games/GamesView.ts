import View from '../../core/View';
import renderHeaderTemplate from '../../components/Header/_renderHeaderTemplate';
import renderPageDescTemplate from '../../components/PageDesc/_renderPageDescTemplate';
import css from './GamesStyles.module.scss';

class GamesView extends View {
  titlePage = `Мини-игры`;

  subtitlePage = `Играй в игры и учись! А если перейти в мини-игру из учебника,
   то в игре будут слова с той страницы`;

  descAudioGame = `В игре “Аудиовызов”, к слову на английском языке будет 
  предложен перевод, правильный он или нет, решаешь ты`;

  descSprintGame = `В игре “Спринт”, произносится слово на английском, 
  а ты выбираешь правильный перевод из пяти вариантов`;

  drawPage() {
    document.title = this.titlemain + this.titlePage;
    this.body!.innerHTML = this.getHtml();
  }

  getHtml() {
    // <div class="${styles.hero}"></div>
    return `
      ${renderHeaderTemplate()} 
      <div class="${css.content}">
        ${renderPageDescTemplate(this.titlePage, this.subtitlePage)}
            <div class="${css.wrapper}">
                <div class="${css['game-list']}">
                  <div id="go-audio-game"
                       class="${css['game-list__card']}
                       ${css['shadow-active']}">
                    <p class="${css['game-list__emoji']} ${css['title-font']}
                    ">📢</p>
                    <p class="${css['game-list__title']} ${css['header-font']}"
                    >“Аудиовызов” мини-игра</p>
                  </div>

                  <div id="go-sprint-game"
                       class="${css['game-list__card']}
                       ${css['shadow-active']}">
                    <p class="${css['game-list__emoji']} 
                    ${css['title-font']}">😥</p>
                    <p class="${css['game-list__title']} ${css['header-font']}">
                    “Спринт” мини-игра</p>
                  </div>
                </div>

                </br>

                <div class="${css['game-list']}">
                <div
                     class="${css['desc-list__card']}">
                  <p class="${css['desc-list__desc']} ${css['text-font']}"
                  >${this.descAudioGame}</p>
                </div>

                <div
                     class="${css['desc-list__card']}">
                  <p class="${css['desc-list__desc']} ${css['text-font']}">
                  ${this.descSprintGame}</p>
                </div>
              </div>
            </div>
      </div>
    `;
  }
}

export default GamesView;
