import styles from './footerStyle.module.scss';

export default function renderFooterTemplate(): string {
  return `
    <footer class="${styles.footer}">
        <div class="${styles.footer__list}">
          <a class="${styles.rs__logo}" href="https://rs.school/js/"></a>
        </div>

        <div class="${styles.footer__list}">
          <a class="${styles.github}" href="https://github.com/OlgaSavitsk"></a>
          <a class="${styles.github}" href="https://github.com/muhammed03"></a>
          <a class="${styles.github}" href="https://github.com/u1f5a4"></a>
          <p class="" style="color: white">(c) 2022</p>
        </div>
    </footer>
  `;
}
