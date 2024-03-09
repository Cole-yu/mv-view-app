/**
 * 防抖动：
 * 防抖技术即是可以把多个顺序地调用合并成一次，也就是在一定时间内，规定事件被触发的次数。
 * @param {Function} func 要执行的函数
 * @param {Number} wait 等待时间
 * @param {Boolean} immediate 是否立即执行一次
 */
 function debounce(func = () => { }, wait = 15, immediate = false) {
    let timeout;
    return () => {
        let context = this;
        let args = arguments;
        let later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

/**
 * 节流函数：
 * 只允许一个函数在 wait 毫秒内执行一次，只有当上一次函数执行后过了你规定的时间间隔，才能进行下一次该函数的调用。
 * 它保证在 mustRun 毫秒内至少执行一次我们希望触发的事件 func。
 * @param {Function} func 要执行的函数
 * @param {Number} wait 等待多少ms后可以再次执行函数
 * @param {Number} mustRun 多少ms内至少执行一次，mustRun > wait
 */
function throttle(func = () => { }, wait = 200, mustRun = 1000) {
    let timeout;
    let startTime = new Date();
    return function () {
        let context = this;
        let args = arguments;
        let curTime = new Date();
        window.clearTimeout(timeout);
        if (curTime - startTime >= mustRun) {
            // 如果达到了规定的触发时间间隔，触发 事件
            func.apply(context, args);
            startTime = curTime;
        } else {
            // 没达到触发间隔，重新设定定时器
            timeout = window.setTimeout(func, wait);
        }
    };
}

export default {
    debounce,
    throttle,
};