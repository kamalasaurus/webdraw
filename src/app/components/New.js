import m from '../../../node_modules/mithril/mithril.js';

export default class New {
  constructor(ctrl) {

    const submit = (e) => {
      console.log(ctrl);
      m.route.set('/draw');
    };

    this.view = (vnode) => {
      return m('form', {
        class: 'new',
        onsubmit: submit
      }, [
        m('label', {class: 'label'}, 'name'),
        m('input', {type: 'text', name: 'name', placeholder: 'image', value: 'image'}),
        m('label', {class: 'label'}, 'image type'),
        m('select', [
          m('option', {value: 'png', selected: 'selected'}, 'png'),
          m('option', {value: 'gif'}, 'gif')
        ]),
        m('label', {class: 'label'}, 'size'),
        m('select', [
          m('option', {value: '0'}, 'A0'),
          m('option', {value: '1'}, 'A1'),
          m('option', {value: '2'}, 'A2'),
          m('option', {value: '3'}, 'A3'),
          m('option', {value: '4', selected: 'selected'}, 'A4'),
          m('option', {value: '5'}, 'A5'),
          m('option', {value: '6'}, 'A6'),
          m('option', {value: '7'}, 'A7'),
          m('option', {value: '8'}, 'A8'),
          m('option', {value: '9'}, 'A9'),
          m('option', {value: '10'}, 'A10')
        ]),
        m('input', {type: 'submit', onclick: submit})
      ]);
    };
  }
}

