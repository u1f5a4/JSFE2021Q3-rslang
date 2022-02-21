import { STATE } from '../../core/constants/server-constants';
import styles from './headerStyle.module.scss';

function isUser() {
  try {
    const set = localStorage.getItem('rslang-localStorage');
    const setting = JSON.parse(String(set));

    return 'name' in setting.auth;
  } catch (error) {
    return false;
  }
}

export function renderAuthUser(): string {
  if (isUser()) {
    return `
        <button id="logout-btn" class="${styles.header__button} ${styles.btn}">Выйти из <b>&nbsp;${STATE.userName.auth.name}</b></button>`;
  }
  return ` <a href="#auth" class="${styles.menu__link}"><button id="login" class="${styles.header__button} ${styles.btn}">
        Войти | Регистрация
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
                    <a class="${styles.menu__link}" href="/#team">О команде</a>
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



                    ${
                      // eslint-disable-next-line consistent-return
                      (() => {
                        if (isUser())
                          return `<li class="${styles.menu__item}">
                                     <a href="/#stat" class="${styles.menu__link}">Статистика</a>
                                  </li> `;
                        return '';
                      })()
                    }
                    
                </ul>
            </nav>
           ${renderAuthUser()}
        </div>
    </header>
  `;
}
