/* eslint-disable */
/**
 * 基本拖拽
 * new Dragdrop({
 * 		target 	 拖拽元素 HTMLElemnt 必选
 * 		bridge	 指定鼠标按下哪个元素时开始拖拽，实现模态对话框时用到
 * 		dragable 是否可拖拽	(true)默认
 * 		dragX 	 true/false false水平方向不可拖拽 (true)默认
 * 		dragY	 true/false false垂直方向不可拖拽 (true)默认
 * 		area 	 [minX,maxX,minY,maxY] 指定拖拽范围 默认任意拖动
 * 		callback 移动过程中的回调函数
 * });
 */

const doc = window.document;
const E = {
  on(el, type, fn) {
    el.addEventListener
      ? el.addEventListener(type, fn, false)
      : el.attachEvent
      ? el.attachEvent(`on${type}`, fn)
      : (el[`on${type}`] = fn);
  },
  un(el, type, fn) {
    el.removeEventListener
      ? el.removeEventListener(type, fn, false)
      : el.detachEvent
      ? el.detachEvent(`on${type}`, fn)
      : (el[`on${type}`] = null);
  },
  evt(e) {
    return e || window.event;
  },
};

let conf = null;
let defaultConf;
let diffX;
let diffY;
function Config(opt) {
  this.target = opt.target;
  this.bridge = opt.bridge;
  this.dragable = opt.dragable != false;
  this.dragX = opt.dragX != false;
  this.dragY = opt.dragY != false;
  this.area = opt.area;
  this.callback = opt.callback;
}
function Dragdrop(opt) {
  if (!opt) {
    return;
  }
  const bodyWidth = opt.target.parentNode.offsetWidth;
  const bodyHeight = opt.target.parentNode.offsetHeight;
  const maxX = bodyWidth - opt.target.offsetWidth;
  const maxY = bodyHeight - opt.target.offsetHeight;
  console.log([0, maxX, 0, maxY], '[0, maxX, 0, maxY]');
  opt.area = [0, maxX, 0, maxY];
  conf = new Config(opt);
  defaultConf = new Config(opt);
  conf.bridge
    ? E.on(conf.bridge, 'mousedown', mousedown)
    : E.on(conf.target, 'mousedown', mousedown);
}
Dragdrop.prototype = {
  dragX() {
    conf.dragX = true;
    conf.dragY = false;
  },
  dragY(b) {
    conf.dragY = true;
    conf.dragX = false;
  },
  dragAll() {
    conf.dragX = true;
    conf.dragY = true;
  },
  setArea(target) {
    const bodyWidth = target.parentNode.offsetWidth;
    const bodyHeight = target.parentNode.offsetHeight;
    const maxX = bodyWidth - target.offsetWidth;
    const maxY = bodyHeight - target.offsetHeight;
    conf.area = [0, maxX, 0, maxY];
    console.log(conf.area, 'conf.area');
  },
  setBridge(b) {
    conf.bridge = b;
  },
  setDragable(b) {
    conf.dragable = b;
  },
  reStore() {
    conf = new Config(defaultConf);
    conf.target.style.top = '0px';
    conf.target.style.left = '0px';
  },
  getDragX() {
    return conf.dragX;
  },
  getDragY() {
    return conf.dragY;
  },
  destroy() {
    const el = conf.target;
    E.un(doc, 'mousemove', mousemove);
    E.un(doc, 'mouseup', mouseup);
    if (el.releaseCapture) {
      // IE
      E.un(el, 'losecapture', mouseup);
      el.releaseCapture();
    }
    if (window.releaseEvents) {
      // 标准DOM
      E.un(window, 'blur', mouseup);
    }
  },
};
function mousedown(e) {
  e = E.evt(e);
  const el = conf.target;
  el.style.position = 'absolute';
  el.style.cursor = 'move';
  if (el.setCapture) {
    // IE
    E.on(el, 'losecapture', mouseup);
    el.setCapture();
    e.cancelBubble = true;
  } else if (window.captureEvents) {
    // 标准DOM
    e.stopPropagation();
    E.on(window, 'blur', mouseup);
    e.preventDefault();
  }
  diffX = e.clientX - el.offsetLeft;
  diffY = e.clientY - el.offsetTop;
  E.on(doc, 'mousemove', mousemove);
  E.on(doc, 'mouseup', mouseup);
}

function mousemove(e) {
  const el = conf.target;
  var e = E.evt(e);
  let moveX = e.clientX - diffX;
  let moveY = e.clientY - diffY;
  let minX;
  let maxX;
  let minY;
  let maxY;
  if (conf.area) {
    minX = conf.area[0];
    maxX = conf.area[1];
    minY = conf.area[2];
    maxY = conf.area[3];
    moveX < minX && (moveX = minX); // left 最小值
    moveX > maxX && (moveX = maxX); // left 最大值
    moveY < minY && (moveY = minY); // top 最小值
    moveY > maxY && (moveY = maxY); // top 最大值
  }
  if (conf.dragable) {
    conf.dragX && (el.style.left = `${moveX}px`);
    conf.dragY && (el.style.top = `${moveY}px`);
    if (conf.callback) {
      const obj = { moveX, moveY };
      conf.callback.call(conf, obj);
    }
  }
}
function mouseup(e) {
  const el = conf.target;
  el.style.cursor = 'default';
  E.un(doc, 'mousemove', mousemove);
  E.un(doc, 'mouseup', mouseup);
  if (el.releaseCapture) {
    // IE
    E.un(el, 'losecapture', mouseup);
    el.releaseCapture();
  }
  if (window.releaseEvents) {
    // 标准DOM
    E.un(window, 'blur', mouseup);
  }
}

export default Dragdrop;
