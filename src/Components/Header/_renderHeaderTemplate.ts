import { STATE } from '../../core/constants/server-constants';
import styles from './headerStyle.module.scss';

export function renderAuthUser(): string {
  if (STATE.auth) {
    return `
        <span class="${styles.header__greetings}">Hi, ${STATE.userName.name}</span>
        <button id="logout-btn" class="${styles.header__button} ${styles.btn}">Выйти</button>`;
  }
  return ` <a href="#auth" class="${styles.menu__link}"><button id="login" class="${styles.header__button} ${styles.btn}">
        Войти/Регистрация
    </button></a>`;
}

export default function renderHeaderTemplate(): string {
  return `
    <header class="${styles.header} ${styles.content} ${
    styles.header__container
  }">
            <a href="/" class="${styles.header__logo} ${
    styles['logo-font']
  }">😎 RS Lang</a>
            <nav content="${styles.menu}">
                <ul class=${styles.menu__list}">
                    <li class="${styles.menu__item}">
                        <a href="" class="${styles.menu__link}">Главная</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="/#book" class="${
                          styles.menu__link
                        }">Учебник</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="/#games" class="${
                          styles.menu__link
                        }">Мини-игры</a>
                    </li>
                    <li class="${styles.menu__item}">
                        <a href="/#stat" class="${
                          styles.menu__link
                        }">Статистика</a>
                    </li> 
                </ul>
            </nav>
           ${renderAuthUser()}
        </div>
    </header>
  `;
}
