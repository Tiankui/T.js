/*
 *fakeSelect

 *Created by Tiankui on 2011-12-19.
 *Copyright (c) 2011 Etao.com. 
 *All rights reserved.
 */


KISSY.add('fakeSelect', function(S) {
    var fakeSelect = function(option) {
        var settings = {
            main: '.J-fs',
            pos: '.J-pos',
            lable: '.J-fs-btn',
            lableAct: '.J-fs-btn-act',
            delay: 200
        };
        S.mix(settings, option);

        if (!S.all(settings.main)) return;

        S.all(settings.main).each(function() {
            var self = this,state,
                _content = self.children('.autotop');
            
            if (_content) {
                _height = -(_content.height()/2);
                _content.css('top',_height);
            }
            
            self.all(settings.lable).on('click',function(){
                return false;
            });
            /*
                TODO 优化
            */
            self.on('mouseenter', function() {
                state = 'enter';
                setTimeout(function() {
                    if (state === 'leave') return;
                    self.addClass(settings.pos);
                    self.children(settings.lable).addClass(settings.lableAct)
                    .next().removeClass('hidden');
                }, settings.delay);
            }).on('mouseleave', function() {
                state = 'leave';
                setTimeout(function() {
                    if (state === 'enter') return;
                    self.removeClass(settings.pos);
                    self.children(settings.lable).removeClass(settings.lableAct)
                    .next().addClass('hidden');
                }, settings.delay);
            });
        });
    };
    if (!S.fakeSelect) S.fakeSelect = fakeSelect;
});

KISSY.fakeSelect();