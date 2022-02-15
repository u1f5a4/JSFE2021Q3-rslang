import styles from './pageDesc.module.scss';

function renderPageDescTemplate(title: string, text: string): string {
  return `
    <div class="${styles['title-page']}">  
    <h2 class="
        ${styles['title-page__title']} 
        ${styles['title-font']}
    ">${title}</h2>
    <p class="
        ${styles['title-page__text']}
        ${styles['text-font']}
    ">${text}</p>
    </div>
  `;
}

export default renderPageDescTemplate;
