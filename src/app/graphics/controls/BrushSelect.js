import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class BrushSelect extends Button {
  constructor(context) {
    this.onclick = (e) => {
      // display brush selection buttons
      // interact with context appropriately
      return this;
    };

    super(context, this.onclick, this.prototype.name);
  }
}
