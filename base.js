/*
 *srp-base

 *Created by Tiankui on 2012-02-28.
 *Copyright (c) 2012 Etao.com. 
 *All rights reserved.
 */
var TK = {};
(function(T) {
    var srp = {
        lazyLoad: function(item) {
            //only use '_src' for simple
            if (!item.getAttribute('_src')) {
                return
            };
            item.setAttribute('src', item.getAttribute('_src'));
            item.removeAttribute('_src');
        },
        indexOf: function(ev, array) {
            //return index
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === ev) {
                    return i
                }
            }
        },
        each: function(arr, callback) {
            //fix this kissy1.2 about 'this'
            for (var i = 0, len = arr.length; i < len; i++) {
                callback.call(arr[i], arr[i], i)
            }
        },
        tpl: function(str, o) {
            //usage: var _tpl = '<span>{tpl}<span>';tpl(_tpl,{"tpl":_midTpl});
            return str.replace(/{([^{}]*)}/g, function(a, b) {
                var r = o[b];
                return typeof r === 'string' ? r : b;
            });
        },
        log:function(str){
            window.console&&console.log(str);
        }
    };
    
    if (!T.srp) T.srp = srp;
})(TK);