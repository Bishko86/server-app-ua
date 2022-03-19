"use strict";(self.webpackChunkangular_ngrx=self.webpackChunkangular_ngrx||[]).push([[642],{6642:(P,g,s)=>{s.r(g),s.d(g,{GalleryModule:()=>b});var a=s(8583),r=s(489),c=s(3153),p=s(5819),h=s(6782),u=s(5257),f=s(9765),o=s(7716);let y=(()=>{class e{constructor(){this.scrollPage=new o.vpe}onScroll(){this.bottomReached()&&!this.loading&&this.scrollPage.emit()}bottomReached(){const t=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight),n=Math.max(document.body.scrollTop,document.documentElement.scrollTop),i=Math.max(document.body.offsetHeight,document.documentElement.offsetHeight);return Math.ceil(n+i)>=t}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275dir=o.lG2({type:e,selectors:[["","appScrollLoadData",""]],hostBindings:function(t,n){1&t&&o.NdJ("scroll",function(){return n.onScroll()},!1,o.Jf7)},inputs:{loading:"loading"},outputs:{scrollPage:"scrollPage"}}),e})();var x=s(7949);let v=(()=>{class e{constructor(){this.closeModal=new o.vpe}onClose(){this.closeModal.emit()}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-show-image"]],inputs:{url:"url"},outputs:{closeModal:"closeModal"},decls:5,vars:1,consts:[[1,"modal"],[1,"wrap"],["alt","img",1,"image",3,"src"],[1,"close",3,"click"]],template:function(t,n){1&t&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o._UZ(2,"img",2),o.TgZ(3,"div",3),o.NdJ("click",function(){return n.onClose()}),o._uU(4,"\u2716"),o.qZA(),o.qZA(),o.qZA()),2&t&&(o.xp6(2),o.Q6J("src",n.url,o.LSH))},styles:[".modal[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1000;overflow:hidden;background-color:#000000b3}.image[_ngcontent-%COMP%]{width:400px;height:400px;padding:20px;background:#fff}.close[_ngcontent-%COMP%]{position:absolute;cursor:pointer;top:2px;right:4px}.wrap[_ngcontent-%COMP%]{position:relative}"]}),e})();function w(e,l){if(1&e){const t=o.EpF();o.TgZ(0,"div",5),o.TgZ(1,"img",6),o.NdJ("click",function(){const d=o.CHM(t).$implicit;return o.oxw().showPhoto(d)}),o.qZA(),o.qZA()}if(2&e){const t=l.$implicit;o.xp6(1),o.Q6J("src",t.thumbnailUrl,o.LSH)}}function _(e,l){1&e&&(o.ynx(0),o._UZ(1,"div"),o._UZ(2,"app-loader"),o._UZ(3,"div"),o.BQk())}function C(e,l){if(1&e){const t=o.EpF();o.TgZ(0,"button",7),o.NdJ("click",function(){return o.CHM(t),o.oxw().onScrollTop()}),o._uU(1,"\u27a4"),o.qZA()}}function M(e,l){if(1&e){const t=o.EpF();o.TgZ(0,"app-show-image",8),o.NdJ("closeModal",function(){return o.CHM(t),o.oxw().onCloseModal()}),o.qZA()}if(2&e){const t=o.oxw();o.Q6J("url",t.url)}}let T=(()=>{class e{constructor(t){this._store=t,this.showImgModal=!1,this.isFetching=!1,this.url="",this.showUpBtn=!1,this.destroy$=new f.xQ,this.photos$=this._store.pipe((0,r.Ys)(p.tT)),this.page$=this._store.pipe((0,r.Ys)(p.DB)),this.loading$=this._store.pipe((0,r.Ys)(p.zd))}ngOnInit(){this._store.dispatch(new c.ZJ),this.loading$.pipe((0,h.R)(this.destroy$)).subscribe(t=>this.isFetching=t)}getPage(){let t=0;return this.page$.pipe((0,u.q)(1)).subscribe(n=>t=n),t}downloadPhoto(){this.isFetching||(this.showUpBtn=!0,this._store.dispatch(new c.a6(this.getPage()+1)),this._store.dispatch(new c.ZJ))}showPhoto(t){this.showImgModal=!0,this.url=t.url,document.body.style.overflow="hidden"}onCloseModal(){this.showImgModal=!1,this.url="",document.body.style.overflow="auto"}onScrollData(t){this.downloadPhoto()}onScrollTop(){this.showUpBtn=!1,window.scroll({top:0,left:0,behavior:"smooth"})}ngOnDestroy(){this.destroy$.next(!0),this.destroy$.complete()}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(r.yh))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-gallery"]],decls:7,vars:9,consts:[["appScrollLoadData","",1,"grid",3,"loading","scrollPage"],["class","gallery",4,"ngFor","ngForOf"],[4,"ngIf"],["class","up",3,"click",4,"ngIf"],[3,"url","closeModal",4,"ngIf"],[1,"gallery"],["alt","ss",1,"image",3,"src","click"],[1,"up",3,"click"],[3,"url","closeModal"]],template:function(t,n){1&t&&(o.TgZ(0,"div",0),o.NdJ("scrollPage",function(d){return n.onScrollData(d)}),o.YNc(1,w,2,1,"div",1),o.ALo(2,"async"),o.YNc(3,_,4,0,"ng-container",2),o.ALo(4,"async"),o.qZA(),o.YNc(5,C,2,0,"button",3),o.YNc(6,M,1,1,"app-show-image",4)),2&t&&(o.Q6J("loading",n.isFetching),o.xp6(1),o.Q6J("ngForOf",o.lcZ(2,5,n.photos$)),o.xp6(2),o.Q6J("ngIf",o.lcZ(4,7,n.loading$)),o.xp6(2),o.Q6J("ngIf",n.showUpBtn),o.xp6(1),o.Q6J("ngIf",n.showImgModal))},directives:[y,a.sg,a.O5,x.R,v],pipes:[a.Ov],styles:[".image[_ngcontent-%COMP%]{width:150px}.gallery[_ngcontent-%COMP%]{display:inline-block;margin:10px}.grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:300px auto 300px;justify-items:center;grid-column-gap:50px;column-gap:50px;grid-row-gap:50px;row-gap:50px;background-color:#37383a;padding:40px 50px}.up[_ngcontent-%COMP%]{position:fixed;top:80px;right:30px;width:45px;height:45px;border-radius:50%;transform:rotate(-90deg);font-size:20px;color:#363434;border:1px solid black}"]}),e})();var Z=s(2271),m=s(5043);const S=[{path:"",component:T}];let b=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[a.ez,Z.m,m.Bz.forChild(S)],m.Bz]}),e})()}}]);