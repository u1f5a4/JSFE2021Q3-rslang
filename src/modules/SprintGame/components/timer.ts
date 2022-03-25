import Control from '../../../core/BaseElement';

export default class Timer extends Control {
  public timer!: number;

  public onTimeOut!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'timer header-font');
  }

  public start(time: number): void {
    if (this.timer) {
      this.stop();
    }
    const render = (currentTime: number) => {
      this.node.textContent = `${currentTime}`;
    };
    render(time);
    let currentTime = time;
    this.timer = window.setInterval(() => {
      currentTime -= 1;
      render(currentTime);
      if (currentTime === 0) {
        this.onTimeOut();
      }
    }, 1000);
  }

  public stop(): void {
    window.clearInterval(this.timer);
  }
}
