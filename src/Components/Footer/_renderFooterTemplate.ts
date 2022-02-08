import styles from './footerStyle.module.scss';

export default function renderFooterTemplate(): string {
  return `
    <footer class="${styles.footer}">
        <i class="${styles.rs__logo}"></i>
    </footer>
  `;
}
