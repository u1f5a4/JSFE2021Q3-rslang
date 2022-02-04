import styles from './footerStyle.module.scss';

export default function renderFooterTemplate(): string {
  return `
    <footer class="${styles.footer}">
        <i class="normalized-icon ${styles.footer__logo}"></i>
    </footer>
  `;
}
