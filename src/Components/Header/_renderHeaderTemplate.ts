import './headerStyle.scss';

export default function renderHeaderTemplate(): string {
  return `
    <header class="header">
        <div class="header__container _container">
            <a href="/" class="header__logo">🇺🇸 RS Lang</a>
            <nav class="header__menu menu">
                <ul class="menu__list">
                    <li class="menu__item">
                        <a href="" class="menu__link">Главная</a>
                    </li>
                    <li class="menu__item">
                        <a href="/#book" class="menu__link">Учебник</a>
                    </li>
                    <li class="menu__item">
                        <a href="" class="menu__link">Мини-игры</a>
                    </li>
                    <li class="menu__item">
                        <a href="" class="menu__link">Статистика</a>
                    </li> 
                </ul>
            </nav>
            <button class="header__button btn">
                Войти/Регистрация
            </button>
        </div>
    </header>
  `;
}
