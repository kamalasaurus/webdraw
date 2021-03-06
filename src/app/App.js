// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../node_modules/mithril/mithril.js';

import Controller from './Controller.js';
import Container from './components/Container.js';
import New from './components/New.js';
import Canvas from './components/Canvas.js';

import Brush from './components/controls/Brush.js';
import Plus from './components/controls/Plus.js';
import Undo from './components/controls/Undo.js';
import Redo from './components/controls/Redo.js';

import Save from './components/controls/Save.js';
import Clear from './components/controls/Clear.js';

import BrushPanel from './components/panels/BrushPanel.js';
import PlusPanel from './components/panels/PlusPanel.js';
import SavePanel from './components/panels/SavePanel.js';

export default function App(root) {

  const ctrl = new Controller({});

  window.addEventListener('keydown', function(e) {
    if (!e.metaKey) return;
    switch(e.key) {
      case 'z':
        e.preventDefault();
        if (e.shiftKey) ctrl.redo();
        else ctrl.undo();
        break;
      case 's':
        e.preventDefault();
        ctrl.saveSVG();
        break;
      default:
        break;
    }
  });

  m.route(root, '/', {
    '/': (new Container('layout', [
      m(new New(ctrl))
    ])),
    '/draw': (new Container('layout', [
      m(new Canvas(ctrl)),
      m(new Container('controls', [
        m(new Brush(ctrl, [
          m(new BrushPanel(ctrl))
        ])),
        m(new Plus(ctrl, [
          m(new PlusPanel(ctrl))
        ])),
        m(new Undo(ctrl)),
        m(new Redo(ctrl)),
        m(new Save(ctrl, [
          m(new SavePanel(ctrl))
        ])),
        m(new Clear(ctrl))
      ]))
    ]))
  });
};

