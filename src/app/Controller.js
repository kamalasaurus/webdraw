import download from '../../node_modules/downloadjs/download.js';

export default class Controller {
  constructor({A = 4, dpi = 300}) {

    // currently only supports A-series papers, change base length for B-series
    // https://www.prepressure.com/library/paper-size/din-a3
    // https://en.wikipedia.org/wiki/Paper_size#Overview:_ISO_paper_sizes
    // aSize: [0, 10] dpi: 72, 300

    const DEFAULTS = {
      brush: 'round',
      color: '#000000',
      opacity: 1,
      lineWidth: 5
    };

    // runs a couple pixels large from what the internet round numbers are
    const dimensions = (aSize, dpi) => {
      const αA = dpi * 39.3701 * (2 ** (1/4)); // 39.3701in == 1000mm
      const width = Math.floor(αA * (2 ** (-(aSize + 1) / 2)));
      const height = Math.floor(αA * (2 ** (-aSize / 2)));
      return {width, height}
    };

    const downloadImage = (dataUrl) => {

      //const iframe = `<iframe width="100%"; height="100%"; src="${dataUrl}" style="border: none;"></iframe>`;
      //const tab = window.open();
      //tab.document.open();
      //tab.document.write(iframe);
      //tab.document.close();

      const save_link = document.createElement('a');
      //link.target = '_blank';
      //save_link.rel = 'noopener noreferrer';
      //link.style = 'display: none;'
      link.href = dataUrl;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      delete link;
      return true;
    };

    let state = {
      flattenedImage: '',
      history: []
    };

    let canvas = null;


    ///////// events!

    const events = {};

    const norm = (name = '') => {
      const n = name.toLowerCase();
      const arr = (events[n] || []).slice();
      return {n, arr};
    };

    this.addEventListener = (name, callback) => {
      const {n, arr} = norm(name);
      if ('function' === typeof callback && n.length)
        events[n] = arr.concat(callback);
    };

    this.removeEventListener = (name, callback) => {
      const {n, arr} = norm(name);
      events[n] = arr.reduce((arr, cb) => {
        return cb != callback ? arr.concat(cb) : arr;
      }, []);
    };

    this.dispatchEvent = (name, ...args) => {
      const {n, arr} = norm(name);
      arr.forEach(cb => cb({n, args}));
    };

    ///////// end events!

    // public

    this.state = state;

    this.restoreDefaults = () => {
      state = Object.assign(state, DEFAULTS, dimensions(A, dpi));
      return this;
    };

    this.flattenHistory = () => {
      // ability to flatten to flattenedImage, blows away releveant history, but preserves image
      // history object: {brush: type, color: col, opacity: o, lineWidth: lw, path: [sx,sy,dx,dy]}
      state.flattenImage = 'canvascontext.toImageURL';
      state.history = [];
      return this;
    };

    this.assignCanvas = (c) => {
      canvas = c;
      return this;
    };

    this.pushState = (s) => {
      state.history.push(s);
      return this;
    };

    this.clearCanvas = () => {
      canvas.clear();
      return this;
    };

    this.saveCanvas = () => {
      const saved_image = canvas.save();
      downloadImage(saved_image);
      return this;
    }

    this.restoreDefaults();
  }
}

