const inBrowser = typeof window !== 'undefined';

export const hasIntersectionObserver =
  inBrowser &&
  'IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype;

export const modeType = {
  event: 'event',
  observer: 'observer',
};

// CustomEvent polyfill
const CustomEvent = (function () {
  if (!inBrowser) return;
  if (typeof window.CustomEvent === 'function') return window.CustomEvent;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  return CustomEvent;
})();

function remove(arr, item) {
  if (!arr.length) return;
  const index = arr.indexOf(item);
  if (index > -1) return arr.splice(index, 1);
}

function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== 'IMG' || !el.getAttribute('data-srcset')) return;

  let options = el.getAttribute('data-srcset');
  const container = el.parentNode;
  const containerWidth = container.offsetWidth * scale;

  let spaceIndex;
  let tmpSrc;
  let tmpWidth;

  options = options.trim().split(',');

  const result = options.map((item) => {
    item = item.trim();
    spaceIndex = item.lastIndexOf(' ');
    if (spaceIndex === -1) {
      tmpSrc = item;
      tmpWidth = 999998;
    } else {
      tmpSrc = item.substr(0, spaceIndex);
      tmpWidth = parseInt(
        item.substr(spaceIndex + 1, item.length - spaceIndex - 2),
        10
      );
    }
    return [tmpWidth, tmpSrc];
  });

  result.sort((a, b) => {
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    if (a[0] === b[0]) {
      if (b[1].indexOf('.webp', b[1].length - 5) !== -1) {
        return 1;
      }
      if (a[1].indexOf('.webp', a[1].length - 5) !== -1) {
        return -1;
      }
    }
    return 0;
  });
  let bestSelectedSrc = '';
  let tmpOption;

  for (let i = 0; i < result.length; i++) {
    tmpOption = result[i];
    bestSelectedSrc = tmpOption[1];
    const next = result[i + 1];
    if (next && next[0] < containerWidth) {
      bestSelectedSrc = tmpOption[1];
      break;
    } else if (!next) {
      bestSelectedSrc = tmpOption[1];
      break;
    }
  }

  return bestSelectedSrc;
}

function find(arr, fn) {
  let item;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (fn(arr[i])) {
      item = arr[i];
      break;
    }
  }
  return item;
}

const getDPR = (scale = 1) =>
  inBrowser ? window.devicePixelRatio || scale : scale;

function supportWebp() {
  if (!inBrowser) return false;

  let support = true;

  try {
    const elem = document.createElement('canvas');

    if (elem.getContext && elem.getContext('2d')) {
      support = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
  } catch (err) {
    support = false;
  }

  return support;
}

function throttle(action, delay) {
  let timeout = null;
  let lastRun = 0;
  return function (...args) {
    if (timeout) {
      return;
    }
    const elapsed = Date.now() - lastRun;
    const runCallback = () => {
      lastRun = Date.now();
      timeout = false;
      action.apply(this, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}

function testSupportsPassive() {
  if (!inBrowser) return;
  let support = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        support = true;
      },
    });
    window.addEventListener('test', null, opts);
  } catch (e) {
    //
  }
  return support;
}

const supportsPassive = testSupportsPassive();

const _ = {
  on(el, type, func, capture = false) {
    if (supportsPassive) {
      el.addEventListener(type, func, {
        capture,
        passive: true,
      });
    } else {
      el.addEventListener(type, func, capture);
    }
  },
  off(el, type, func, capture = false) {
    el.removeEventListener(type, func, capture);
  },
};

const loadImageAsync = (item, resolve, reject) => {
  const image = new Image();

  if (!item || !item.src) {
    const err = new Error('image src is required');
    return reject(err);
  }

  image.src = item.src;
  if (item.cors) {
    image.crossOrigin = item.cors;
  }

  image.onload = function () {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: image.src,
    });
  };

  image.onerror = function (e) {
    reject(e);
  };
};

const style = (el, prop) =>
  typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(el, null).getPropertyValue(prop)
    : el.style[prop];

const overflow = (el) =>
  style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x');

const scrollParent = (el) => {
  if (!inBrowser) return;
  if (!(el instanceof HTMLElement)) {
    return window;
  }

  let parent = el;

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }

    if (!parent.parentNode) {
      break;
    }

    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return window;
};

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function noop() {}

class ImageCache {
  constructor({ max }) {
    this.options = {
      max: max || 100,
    };
    this._caches = [];
  }

  has(key) {
    return this._caches.indexOf(key) > -1;
  }

  add(key) {
    if (this.has(key)) return;
    this._caches.push(key);
    if (this._caches.length > this.options.max) {
      this.free();
    }
  }

  free() {
    this._caches.shift();
  }
}

export {
  ImageCache,
  inBrowser,
  CustomEvent,
  remove,
  find,
  noop,
  _,
  isObject,
  throttle,
  supportWebp,
  getDPR,
  scrollParent,
  loadImageAsync,
  getBestSelectionFromSrcset,
};
