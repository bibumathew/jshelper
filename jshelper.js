/**
 * Created by bimathew on 4/22/14.
 */

(function (window, undefined) {

    var jsHelper, toString, arrPush, arrPop, arrSlice, arrRev, stringSplit, arrJoin;
    toString = Object.prototype.toString;
    arrPush = [].push;
    arrRev = [].reverse;
    arrSlice = [].slice;
    arrPop = [].pop;
    stringSplit = String.prototype.split;
    arrJoin = [].join;
    jsHelper = {
        now: function () {
            return ( new Date() ).getTime();
        },
        toDay: function (format) {
            format = format || 'mm/dd/yy';

            switch (this.stringToLower(format)) {
                case 'dd/mm/yy':
                    break;
                case 'mm/dd/yyyy':
                    break;
                case 'dd/mm/yyyy':
                    break;
                default :
                    break;
            }
        },
        error: function (msg) {
            throw new Error(msg);
        },
        isFunction: function (value) {
            return typeof value === 'function';
        },
        isArray: function (arr) {
            return toString.call(arr) === '[object Array]';
        },
        uniqueArray: function (arr) {
            if (this.isArray(arr)) {
                var len = arr.length,
                    a = [];
                if (!arr.length)
                    return arr;
                for (var i = 0; i < len; i++) {
                    for (var j = i + 1; j < len; j++) {
                        // If this[i] is found later in the array
                        if (arr[i] === arr[j])
                            j = ++i;
                    }
                    arrPush.call(a, arr[i]);
                }
                return a;
            } else {
                this.error('Invalid Array');
            }
        },
        isString: function (val) {
            return typeof val === 'string';
        },
        stringToLower: function (str) {
            return this.isString(str) ? str.toLowerCase() : str;
        },
        stringToUpper: function (str) {
            return this.isString(str) ? str.toUpperCase() : str;
        },
        reverseWords: function (msg, glue) {
            var glue = glue || ' ';
            return  arrJoin.call(arrRev.call(stringSplit.call(msg, glue)), glue);
        },
        arrayPop: function (arr) {
            if (this.isArray(arr)) {
                arrPop.call(arr)
            } else {
                this.error('Invalid Array');
            }
        },
        bindContext: function (context, fn) {
            if (!this.isFunction(fn)) {
                this.error('Expected Function');
            }
            var args = arrSlice.call(arguments, 2);
            if (Function.prototype.bind) {
                return function () {
                    return  fn.bind(context).apply(null, args.concat(arrSlice.call(arguments)));
                }
            } else {
                return function () {
                    return fn.apply(context, args.concat(arrSlice.call(arguments)));
                }
            }
        },
        shallowCopy: function (source, destination) {
            for (var key in destination) {
                source[key] = destination[key];
            }
            return source;
        },
        trim: function (str) {
            if (String.prototype.trim) {
                return str == null ? '' : str.trim();
            } else {
                return str == null ? '' : str.replace(/^\s+/, '').replace(/\s+$/, '');
            }
        },
        redirect: function (url, type, forced, timeout) {
            forced = !!forced;
            timeout = timeout ? timeout : 0;
            type = type ? type : "assign";
            var _redirect = function () {
                window.location[type](type === 'reload' ? forced : url);
            };
            if (timeout) {
                setTimeout(_redirect, timeout);
            } else {
                _redirect();
            }
        }
    };
    window.jsHelper = window.$jH = jsHelper;
})(window);


