/*
 *Tab method
 *params{
     panels,contents,current-panel
 }
 *Created by Tiankui on 2012-02-28.
 */
 
(function(T,S){
	var D=S.SOM,E=S.Event,$=S.all;
	var Tab = function(option){    
		var setting = option||{
			panel:$('.ob-panel'),
			content:$('.ob-itembox'),
			current:'ob-current'
		},
		/*config::lazyStat; first one should be active!*/
		lazyStat = [true],
		/*get from base.js*/
		lazyLoad = T.lazyLoad,
		indexOf = T.indexOf,
		each = T.each;
		
		setting.panel.on('click',function(ev){
			var _index = indexOf(ev.target,setting.panel);
			for (var i = 0,len = setting.content.length;i<len;i++) {
				if (i===_index) {
					$(setting.content[i]).show();
					if (!lazyStat[i]) {
					    //T.log('run,Lazy!'); //For test 
						each(setting.content[i].getElementsByTagName('img'),function(){
							lazyLoad(this);
						});
						lazyStat[i] = true;
					}
					setting.current && $(setting.panel[i]).addClass(setting.current);
				}else{
					$(setting.content[i]).hide();
					setting.current && $(setting.panel[i]).removeClass(setting.current);
				}
			}
		})
	};
    if(!KISSY.srp.Tab) KISSY.srp.Tab = Tab;
})(KISSY.srp,KISSY);