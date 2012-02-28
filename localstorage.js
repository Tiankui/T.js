/**
 * @fileoverview Local Storage (original: changtian, modified for buy platform).
 * @author ÎÄºÓ<wenhe@taobao.com>
 * @lastmodified Ë®ÃÅ<shuimen.xdy@taobao.com>
 *
 * @license
 * Copyright (c) 2010 Taobao Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
KISSY.add('localStorage', function(S) {
    var doc = document, useObject = doc.documentElement;
    useObject.style.behavior = 'url(#default#userData)';

    // html5
    var localStorage = {
        setItem: function(key, val, context) {
            return window.localStorage.setItem(key, val, context);
        },
        getItem: function(key, context) {
            return window.localStorage.getItem(key, context);
        },
        removeItem: function(key, context) {
            return window.localStorage.removeItem(key, context);
        },
        clear: function() {
            return window.localStorage.clear();
        }
    };

    // Tubie IE 678 only
    var userBehavor = {
        setItem: function(key, value, context) {
            try {
                useObject.setAttribute(key, value);
                return useObject.save(context || 'default');
            } catch (e) {}
        },
        getItem: function(key, context) {
            try {
                useObject.load(context || 'default');
                return useObject.getAttribute(key) || '';
            } catch (e) {}
        },
        removeItem: function(key, context) {
            try {
                context = context || 'default';
                useObject.load(context);
                useObject.removeAttribute(key);
                return useObject.save(context);
            } catch (e) {}
        },
        clear: function() {
            try {
                useObject.expires = -1;
            } catch (e) {}
        }
    };

//    return S.merge({
//        element: useObject
//    }, (window.localStorage ? localStorage : userBehavor));
    
    S.localStorage = window.localStorage ? localStorage : userBehavor;
});
