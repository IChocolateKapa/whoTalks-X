/**
 * Created by Echo on 2016/5/12.
 */

var EventUtil = {
    addHandler: function (obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);//false表示在事件冒泡阶段触发事件, 也是该函数默认值
        } else if (obj.attachEvent) {
            obj.attachEvent('on'+type, handler);
        } else {
            obj['on'+type] = handler;
        }

    },
    removeHandler: function (obj, type, handler) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, handler, false);
        } else if (obj.detachEvent) {
            obj.detachEvent('on'+type, handler);
        } else {
            obj['on'+type] = null;
        }
    },
    getEvent: function (event) {
        return event? event : window.event;
    },
    getTarget: function (event) {
        var event = this.getEvent(event);
        return event.srcElement || event.target;
    },

    preventDefault: function (event) {
        var event = this.getEvent(event);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        var event = this.getEvent(event);
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
/*输出外部可以访问该模块内属性和方法的接口*/
module.exports = EventUtil;