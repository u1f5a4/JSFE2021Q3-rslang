import styles from './styles.module.scss';

export default function renderHeaderTemplate(): string {
  return `
    <header class="${styles.header}">
        <div class="${styles.header__container} ${styles.container}">
            <a href="/" class="${styles.header__logo}">RS Lang</a>
            <nav content="${styles.menu}">
                <ul class=${styles.menu__list}">
                    <li class="${styles.menu__item}">
                        <a href="" class="${styles.menu__link}">Главная</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="/#book" class="${styles.menu__link}">Учебник</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="" class="${styles.menu__link}">Мини-игры</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="" class="${styles.menu__link}">Статистика</a>
                    </li> 
                </ul>
            </nav>
            <button class="${styles.header__button} ${styles.btn}">
                Войти/Регистрация
            </button>
        </div>
    </header>
  `;
}
