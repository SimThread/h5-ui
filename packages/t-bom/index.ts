/**
 * 获取指定id元素的可视高度, 不传参数默认返回页面可视高度
 */
function getClientHeight(elementId: string = '') {
  let clientHeight = 0;

  if (!elementId) {
    if (document.compatMode == "CSS1Compat") {
      clientHeight = document.documentElement.clientHeight;
    } else {
      clientHeight = document.body.clientHeight;
    }
  } else {
    const ele = document.getElementById(elementId);
    clientHeight = ele ? ele.clientHeight : 0;
  }

  return clientHeight;
}

/**
 * 获取指定id元素的滚动高度, 不传参数默认返回页面滚动高度
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight
 */
function getScrollHeight(elementId: string = '') {
  let scrollHeight = 0;
  if (!elementId) {
    scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
  } else {
    const ele = document.getElementById(elementId);
    scrollHeight = ele ? ele.scrollHeight : 0;
  }
  return scrollHeight;
}

/**
 * 获取指定id元素的滚动距离, 不传参数默认返回页面滚动距离
 * [scrollTop](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)
 * [body.scrollTop与documentElement.scrollTop](https://segmentfault.com/a/1190000008065472)
 */
function getScrollTop(elementId: string = '') {
  let scrollTop = 0;

  if (!elementId) {
    scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  } else {
    const ele = document.getElementById(elementId);
    scrollTop = ele ? ele.scrollTop : 0;
  }
  return scrollTop;
};

/**
 * 页面是否滚动到底部
 */
function isScrollToBottom() {
  return getScrollTop() + getClientHeight() == getScrollHeight();
}

/**
 * 元素距离页面顶部的距离
 * [HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)
 */
function getOffsetTop (ele: any) {
  if (!ele) {
      return 0;
  }

  let top = ele.offsetTop;
  let parent = ele.offsetParent;
  while (parent) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
  }
  return top;
};

export default {
  getScrollHeight,
  isScrollToBottom,
  getScrollTop,
  getOffsetTop
}
