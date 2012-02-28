/*
 *html5

 *Created by Tiankui on 2011-12-28.
 *Copyright (c) 2011 Etao.com. 
 *All rights reserved.
 */

(function(S) {
    var D = S.DOM,
        E = S.Event;

    var HTML5 = {};
    HTML5.placeholder = {
        support: "placeholder" in document.createElement("input"),
        activate: (function() {
            function _showPlaceholder(el, className, value) {
                if (!D.hasClass(el, className) && !el.value) {
                    el.value = value;
                    D.addClass(el, className);
                }
            }

            function _hidePlaceholder(el, className, value) {
                if (D.hasClass(el, className)) {
                    el.value = value;
                    D.removeClass(el, className);
                }
            }

            function _activatePlaceholder(selector) {
                var ATTR = "placeholder",
                    CLASS = "placeholder";

                S.each(S.query(selector), function(el) {
                    var TIP = el.getAttribute(ATTR);
                    if (!TIP) return;

                    E.on(el.form, 'submit', function(ev) {
                        _hidePlaceholder(el, CLASS, "");
                    });
                    E.on(window, 'unload', function(ev) {
                        _hidePlaceholder(el, CLASS, "");
                    });
                    E.on(el, 'focusin', function(ev) {
                        _hidePlaceholder(el, CLASS, "");
                    });
                    E.on(el, 'focusout', function(ev) {
                        _showPlaceholder(el, CLASS, TIP);
                    });
                    _showPlaceholder(el, CLASS, TIP);
                });
            }
            return _activatePlaceholder;
        })()
    };

    if (!HTML5.placeholder.support) {
        HTML5.placeholder.activate('INPUT');
    }
    KISSY.srp.HTML5 = HTML5;
})(KISSY);
