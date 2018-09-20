import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class LineWeight extends Button {
  constructor(context) {
    this.onclick = (e) => {
      // display a slider to select line width
      context.lineWidth = 5;
      return this;
    };

    super(context, this.onclick, this.prototype.name);
  }
}
