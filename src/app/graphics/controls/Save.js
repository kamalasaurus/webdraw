import m from '../../../../node_modules/mithril/mithril.js';
import Button from './Button.js';

export default class Save extends Button {
  constructor(context) {
    this.onclick = (e) => {
      let saved_image = context.canvas.toDataURL('image/gif');
      // append image to an image tag or save it directly
      return this;
    };

    super(context, this.onclick, this.prototype.name);
  }
}
