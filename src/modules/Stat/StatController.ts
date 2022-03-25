import Controller from '../../core/Controller';
import AppModel, { UserStat } from '../AppModel';
import StatView from './StatView';

class StatController extends Controller {
  constructor(public view: StatView, public model: AppModel) {
    super(view, model);
  }

  async displayPage() {
    this.view.drawPage();
    this.model.logout();
    this.view.model = this.model;

    await this.model.countStat();
    const stat = await this.model.getStat();

    console.log(stat);

    this.view.drawNumbers(stat);
    this.drawGraphs(stat);
  }

  drawGraphs(stat: UserStat) {
    const dates = stat.optional.data.map((day) => day.date);
    const newWords = stat.optional.data.map((data) => data.words.words);
    const easyWords = stat.optional.data.map((data) => data.words.easyQty);

    this.view.graphNewWord(dates, newWords);
    this.view.graphLearnWord(dates, easyWords);
  }
}

export default StatController;
