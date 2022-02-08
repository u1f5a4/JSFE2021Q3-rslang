import styles from './headerStyle.module.scss';

export default function renderHeaderTemplate(): string {
  return `
    <header class="${styles.header} ${styles.content} ${styles.header__container}">
            <a href="/" class="${styles.header__logo} ${styles['logo-font']}">🇺🇸 RS Lang</a>
            <nav content="${styles.menu}">
                <ul class=${styles.menu__list}">
                    <li class="${styles.menu__item}">
                        <a href="" class="${styles.menu__link}">Главная</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="/#book" class="${styles.menu__link}">Учебник</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="/#games" class="${styles.menu__link}">Мини-игры</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="/#auth" class="${styles.menu__link}">Авторизация</a>
                    </li> 
                </ul>
            </nav>
            <button class="${styles.header__button} ${styles.btn}">
                Войти/Регистрация
            </button>
    </header>
  `;
}
