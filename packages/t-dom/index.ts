const reUnit = /width|height|top|left|right|bottom|margin|padding/i;

/**
 * 获取指定id元素的滚动距离, 不传参数默认返回页面滚动距离
 * [scrollTop](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)
 * [body.scrollTop与documentElement.scrollTop](https://segmentfault.com/a/1190000008065472)
 */
function getScrollTop(id?:any) {
    let scrollTop = 0;

    if (!id) {
        scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    } else {
        const ele = document.getElementById(id);
        scrollTop = ele ? ele.scrollTop : 0;
    }
    return scrollTop;
}
/**
 * 获取指定id元素的可视高度, 不传参数默认返回页面可视高度
 */
function getClientHeight(id?:any) {
    let clientHeight = 0;

    if (!id) {
        if (document.compatMode == 'CSS1Compat') {
            ({ clientHeight } = document.documentElement);
        } else {
            ({ clientHeight } = document.body);
        }
    } else {
        const ele = document.getElementById(id);
        clientHeight = ele ? ele.clientHeight : 0;
    }

    return clientHeight;
}

/**
 * 获取指定id元素的滚动高度, 不传参数默认返回页面滚动高度
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight
 */
function getScrollHeight(id?:any) {
    let scrollHeight = 0;
    if (!id) {
        scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    } else {
        const ele = document.getElementById(id);
        scrollHeight = ele ? ele.scrollHeight : 0;
    }
    return scrollHeight;
}

export default {
    /**
   * 插入到目标元素之后
   */
    insertAfter(newEl:HTMLElement, targetEl:HTMLElement) {
        const parent = targetEl.parentNode;

        if (!parent) {
            throw new Error('未找到目标元素的父元素');
        }

        if (parent.lastChild === targetEl) {
            parent.appendChild(newEl);
        } else {
            parent.insertBefore(newEl, targetEl.nextSibling);
        }
    },
    /**
   * 移除元素
   * el支持类型：Element|Selector|NodeList
   */
    remove(el: HTMLElement | NodeList | string) {
        if (typeof el === 'string') {
            [].forEach.call(document.querySelectorAll(el), (node:any) => {
                node.parentNode.removeChild(node);
            });
        } else if (el instanceof NodeList) {
            // it's an array of elements
            [].forEach.call(el, (node:any) => {
                node.parentNode.removeChild(node);
            });
        } else if (el.parentNode) {
            // it's an Element
            el.parentNode.removeChild(el);
        } else {
            throw new Error('you can only pass Element, array of Elements or query string as argument');
        }
    },
    /**
     * 获取元素高度（包含外边框）
     * [HTMLElement.offsetHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)
     */
    outerHeight(el: HTMLElement) {
        return el.offsetHeight;
    },
    /**
     * 获取元素宽度（包含外边框）
     * [HTMLElement.offsetWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)
     */
    outerWidth(el: HTMLElement) {
        return el.offsetWidth;
    },
    /**
   * 获取元素高度（包含margin）
   */
    outerHeightWithMargin(el: HTMLElement) {
        let height = el.offsetHeight;
        const style:any = getComputedStyle(el);

        height += (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
        return height;
    },
    /**
   * 获取元素宽度（包含margin）
   */
    outerWidthWithMargin(el: HTMLElement) {
        let width = el.offsetWidth;
        const style:any = getComputedStyle(el);

        width += (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
        return width;
    },
    /**
   * 获取渲染后的样式
   */
    getComputedStyles(el: HTMLElement): { [key: string]: any } {
        const { ownerDocument } = el;
        return (<Window>(<Document>ownerDocument).defaultView).getComputedStyle(el, null);
    },
    /**
   * 获取元素距离文档边界的距离（如果文档设置了边框，以内边框为参照）
   */
    getOffset(el: HTMLElement) {
        const { ownerDocument } = el;
        const html = (<Document>ownerDocument).documentElement;
        let box = { top: 0, left: 0 };

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if (typeof el.getBoundingClientRect !== 'undefined') {
            box = el.getBoundingClientRect();
        }

        return {
            top: box.top + window.pageYOffset - html.clientTop,
            left: box.left + window.pageXOffset - html.clientLeft
        };
    },
    /**
   * 返回当前元素相对于关系为offsetParent的节点的位置
   * [offsetTop](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)
   */
    getPosition(el: HTMLElement) {
        if (!el) {
            return {
                top: 0,
                left: 0
            };
        }

        return {
            left: el.offsetLeft,
            top: el.offsetTop
        };
    },
    /**
   * 设置单个属性样式
   */
    setStyle(node: HTMLElement, att: string, val: any, style: { [key: string]: any }) {
        style = style || node.style;

        if (style) {
            if (val === null || val === '') { // normalize unsetting
                val = '';
            } else if (!isNaN(Number(val)) && reUnit.test(att)) { // number values may need a unit
                val += 'px';
            }

            if (att === '') {
                att = 'cssText';
                val = '';
            }

            style[att] = val;
        }
    },
    /**
     * 设置样式
     */
    setStyles(el: HTMLElement, hash: { [key: string]: any }) {
        const HAS_CSSTEXT_FEATURE = typeof (el.style.cssText) !== 'undefined';
        function trim(str:any) {
            return str.replace(/^\s+|\s+$/g, '');
        }
        let originStyleText:any;
        const originStyleObj: {
            [key:string]:any
        } = {};
        if (HAS_CSSTEXT_FEATURE) {
            originStyleText = el.style.cssText;
        } else {
            originStyleText = el.getAttribute('style');
        }
        originStyleText.split(';').forEach((item:any) => {
            if (item.indexOf(':') !== -1) {
                const obj = item.split(':');
                originStyleObj[trim(obj[0])] = trim(obj[1]);
            }
        });

        const styleObj = {};
        Object.keys(hash).forEach(item => {
            this.setStyle(el, item, hash[item], styleObj);
        });
        const mergedStyleObj:any = { ...originStyleObj, ...styleObj };
        const styleText = Object.keys(mergedStyleObj)
            .map(item => item + ': ' + mergedStyleObj[item] + ';')
            .join(' ');

        if (HAS_CSSTEXT_FEATURE) {
            el.style.cssText = styleText;
        } else {
            el.setAttribute('style', styleText);
        }
    },
    /**
     * 获取样式
     */
    getStyle(el:any, att:any, style:any) {
        style = style || el.style;

        let val = '';

        if (style) {
            val = style[att];

            if (val === '') {
                val = this.getComputedStyle(el, att);
            }
        }

        return val;
    },
    /**
     * 获取渲染后的样式
     * NOTE: Known bug, will return 'auto' if style value is 'auto'
     */
    getComputedStyle(el: HTMLElement, att: string) {
        const win:any = (<Document>(<HTMLElement>el).ownerDocument).defaultView;
        // null means not return presudo styles
        const computed = win.getComputedStyle(el, null);

        return att ? computed[att] : computed;
    },
    /**
     * 获取页面尺寸对象
     * pageWidth: 页面宽度
     * pageHeight: 页面高度
     * windowWidth: 窗口宽度
     * windowHeight: 窗口高度
     */
    getPageSize() {
        let xScroll;
        let yScroll;

        if (window.innerHeight && (<any>window).scrollMaxY) {
            xScroll = window.innerWidth + (<any>window).scrollMaxX;
            yScroll = window.innerHeight + (<any>window).scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }

        let windowWidth:any; let
            windowHeight:any;

        if (self.innerHeight) { // all except Explorer
            if (document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            } else {
                windowWidth = self.innerWidth;
            }
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        let pageHeight; let
            pageWidth;

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }
        // for small pages with total width less then width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = xScroll;
        } else {
            pageWidth = windowWidth;
        }

        return {
            pageWidth,
            pageHeight,
            windowWidth,
            windowHeight
        };
    },
    /**
     * 向父级遍历元素，直到selector为止，不包含selector
     * selector 可选。字符串值，规定在何处停止对祖先元素进行匹配的选择器表达式。
     * filter   可选。字符串值，包含用于匹配元素的选择器表达式。
     */
    parentsUntil(el: HTMLElement, selector: string, filter: string) {
        const result = [];
        let element = <any>el;
        const matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector;

        element = element.parentElement;
        while (element && !matchesSelector.call(element, selector)) {
            if (!filter) {
                result.push(element);
            } else if (matchesSelector.call(element, filter)) {
                result.push(element);
            }
            element = element.parentElement;
        }
        return result;
    },
    // 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上
    closest(el: HTMLElement, selector:any) {
        let element = <any>el;
        const matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector;

        while (element) {
            if (matchesSelector.call(element, selector)) {
                return element;
            }

            element = element.parentElement;
        }
        return null;
    },
    /**
     * 判断元素是否包含某选择器
     * matches(el, '.my-class'); 这里不能使用伪类选择器
     */
    is(el: HTMLElement, selector: string) {
        const element = <any>el;
        return (element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.webkitMatchesSelector || element.oMatchesSelector).call(element, selector);
    },
    /**
     * 获取元素宽度，不包含边框和边距
     */
    getWidth(el: HTMLElement) {
        const styles = (<any>(this.getComputedStyles(el)));
        const width = parseFloat(styles.width.indexOf('px') !== -1 ? styles.width : 0);

        const boxSizing = styles.boxSizing || 'content-box';
        if (boxSizing === 'border-box') {
            return width;
        }

        const borderLeftWidth = parseFloat(styles.borderLeftWidth);
        const borderRightWidth = parseFloat(styles.borderRightWidth);
        const paddingLeft = parseFloat(styles.paddingLeft);
        const paddingRight = parseFloat(styles.paddingRight);
        return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
    },
    /**
     * 获取元素高度，不包含边框和边距
     */
    getHeight(el: HTMLElement) {
        const styles = (<any>(this.getComputedStyles(el)));
        const height = parseFloat(styles.height.indexOf('px') !== -1 ? styles.height : 0);

        const boxSizing = styles.boxSizing || 'content-box';
        if (boxSizing === 'border-box') {
            return height;
        }

        const borderTopWidth = parseFloat(styles.borderTopWidth);
        const borderBottomWidth = parseFloat(styles.borderBottomWidth);
        const paddingTop = parseFloat(styles.paddingTop);
        const paddingBottom = parseFloat(styles.paddingBottom);
        return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
    },
    /**
     * 获取指定id元素的可视高度, 不传参数默认返回页面可视高度
     */
    getClientHeight,
    /**
     * 获取指定id元素的滚动高度, 不传参数默认返回页面滚动高度
     * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight
     */
    getScrollHeight,
    getScrollTop,
    /**
     * 页面是否滚动到底部
     */
    isScrollToBottom() {
        return getScrollTop() + getClientHeight() == getScrollHeight();
    },
    /**
     * 元素距离页面顶部的距离
     * [HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)
     */
    getOffsetTop(elem: HTMLElement) {
        if (!elem) {
            return 0;
        }

        let top = elem.offsetTop;
        let parent = elem.offsetParent;
        while (parent) {
            top += (<any>parent).offsetTop;
            parent = (<any>parent).offsetParent;
        }
        return top;
    },
};
