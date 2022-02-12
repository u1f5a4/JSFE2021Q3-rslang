// eslint-disable-next-line import/no-cycle
import AppView from '../../../core/View';
import styles from './style.module.scss';
import renderHeaderTemplate from '../../../components/Header/_renderHeaderTemplate';
import renderFooterTemplate from "../../../components/Footer/_renderFooterTemplate";

class AudioCallGameView extends AppView {
    titlePage = 'Учебник английского с карточками и мини-играми';

    subtitlePage = `Простой и понятный интерфейс нашего приложения позволит сконцентрироваться на изучении и достигнуть результата наблюдая за своим прогрессом`;

    drawPage() {
        document.title = this.titlePage;
        this.body!.innerHTML = this.getHtml();
    }

    getHtml() {
        return `
      ${renderHeaderTemplate()}
      ${renderFooterTemplate()}
    `;
    }
}

export default AudioCallGameView;
