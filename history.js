/*
 *localStorage-history

 *Created by Tiankui on 2012-01-04.
 *Copyright (c) 2012 Etao.com. 
 *All rights reserved.
 */
 
(function(S){
    var D = S.DOM,E = S.Event,$ = S.all,
        db = S.localStorage,win = window,JSON = S.JSON,KEY='LS_SPRIT',maxLength = 60,viewStep=6;
//    win.localHistory = true;
    var History = {
        tpl:function(str,o){
            return str.replace(/{([^{}]*)}/g,
                function (a,b){
                    var r = o[b];
                    return typeof r==='string'?r:b;
                }
            );
        },
        makeArr:function(){
            if (!this.getGoods()) return;
            var _info = this.getGoods(),_arr=[];
            if (/LS_SPRIT/.test(_info)) {
                _arr=_info.split(KEY);
            }else{
                _arr[0] = _info;
            }
            return _arr;
        },
        cacheArr:function(arr){
            if (arr.length>1) {
                for (var i = 0,len = arr.length;i<len-1;i++) {
                    if (!/LS_SPRIT/.test(arr[i])) arr[i] = arr[i]+KEY;
                }
            }
            return arr.join('');
        },
        isExist:function(str){
            if (!this.getGoods()) {
                return false;
            }else{
                var _arr = this.makeArr();
                for (var i = 0,len = _arr.length;i<len;i++) {
                    if (_arr[i] === str){
                        return i;
                    }
                }
            }
            return false;
        },
        getGoods:function(){
            return db.getItem('GOODS');
        },
        saveGoods:function(str){
            var _goodsList = this.makeArr(),_newGoodsList;
            if (_goodsList) {
                var _Index=this.isExist(str);
                if (typeof(_Index)=='number'){
                    _cache = _goodsList.splice(_Index,1);
                    _goodsList.unshift(_cache);
                    _newGoodsList = this.cacheArr(_goodsList);
                }else{
                    _goodsList.unshift(str);
                    _newGoodsList = this.cacheArr(_goodsList);
                }
                if (_goodsList.length > maxLength) {
                    _goodsList.splice(maxLength-1,_goodsList.length-maxLength);
                    _goodsList[_goodsList.length-1] = _goodsList[_goodsList.length-1].replace(KEY,'');
                    _newGoodsList = this.cacheArr(_goodsList);
                }
            }else{
                _newGoodsList = str;
            }
            db.setItem('GOODS',_newGoodsList);
        },
        getInfo:function(){
            var self = this,_dataHistory;
            E.on(D.query('.LS_history'),'click',function(){
                _dataHistory = D.attr(this,'data-history');
                if (_dataHistory) {
                    self.saveGoods(_dataHistory);
                }
            });
        },
        createHtml:function(){
            if (!this.getGoods()) return ;
            var _tpl = '<div class="history" id="J_history">\
                            <div class="ht-title">最近浏览过的商品</div>\
                                <div class="ht-main">\
                                    <div class="ht-prev">\
                                        <a class="icon prev" href="#"></a>\
                                    </div>\
                                <div class="ht-content">\
                                    <div class="ht-scroller">{tpl}</div>\
                                </div>\
                                <div class="ht-next">\
                                    <a class="icon next" href="#"></a>\
                                </div>\
                            </div>\
                        </div>',
                _midTpl='',
                _arr,
                _str='';

            _arr = this.makeArr();
            for (var i = 0,len = _arr.length;i<len;i++) {
                if (i<viewStep) {
                    _str = '<div class="ht-item">\
                                    <a class="ht-img-warpper" href="{itemHref}"><img src="{itemImg}" /></a>\
                                    <div class="ht-item-title"><a href="#">{itemTitle}</a></div>\
                                    <div class="ht-item-seller"><a href="{itemStoreHref}">{itemStoreName}</a></div>\
                                    <div class="ht-item-price">{itemPrice}</div>\
                                </div>';
                    _midTpl += this.tpl(_str,JSON.parse('{'+_arr[i].replace(/\'/g,'\"')+'}'));
                }else{
                    _str = '<div class="ht-item">\
                                    <a class="ht-img-warpper" href="{itemHref}"><img data-ks-lazyload-custom="{itemImg}" /></a>\
                                    <div class="ht-item-title"><a href="#">{itemTitle}</a></div>\
                                    <div class="ht-item-seller"><a href="{itemStoreHref}">{itemStoreName}</a></div>\
                                    <div class="ht-item-price">{itemPrice}</div>\
                                </div>';
                    _midTpl += this.tpl(_str,JSON.parse('{'+_arr[i].replace(/\'/g,'\"')+'}'));
                }
            }
            //Todo:lazylaod
            _html = this.tpl(_tpl,{"tpl":_midTpl});
            return _html;
        },
        loadSwitchable:function(){
            var HISTORY = S.get('#J_history');
            if (!HISTORY) return;
            var _next = $('#J_history .next'),_prev = $('#J_history .prev');

            S.use('switchable,datalazyload', function(S) {
                var Carousel = S.Carousel(HISTORY, {
                    effect: 'scrollx',
                    easing: 'easeOutStrong',
                    steps: 6,
                    viewSize: [900],
                    circular: false,
                    prevBtnCls: 'prev',
                    nextBtnCls: 'next',
                    lazyDataType: 'img-src',
                    panels:D.query('.ht-item'),
                    disableBtnCls:'disable',
                    markupType: 2,
                    hasTriggers:false
                });
                if (Carousel.activeIndex===0) {_prev.addClass('disable').on('click',function(){return false;});}
                _next.on('click',function(){return false;});
            });
        },
        init:function(){
            if (win.localHistory) {
                if (!db.getItem('isOK')) {
                    db.clear();
                    db.setItem('isOK', 'right');
                    db.removeItem('isClear');
                }
                this.getInfo();
                var _html = this.createHtml();
                if (D.get('.section')) {
                    $('.section').append(_html);
                }
                this.loadSwitchable();
            }else{
                this.loadSwitchable();
                return;
            }
        }
    };
    if (!S.SRPHistory) S.SRPHistory = History;
    S.ready(function(){
        History.init();
    });
})(KISSY);
