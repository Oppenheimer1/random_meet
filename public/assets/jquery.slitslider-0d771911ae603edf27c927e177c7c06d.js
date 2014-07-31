/**
 * jquery.slitslider.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
!function(t,e,n){"use strict";/*
	* debouncedresize: special jQuery event that happens once after a window resize
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
	*
	* Copyright 2011 @louis_remi
	* Licensed under the MIT license.
	*/
var i,o,s=t.event;i=s.special.debouncedresize={setup:function(){t(this).on("resize",i.handler)},teardown:function(){t(this).off("resize",i.handler)},handler:function(t,e){var n=this,r=arguments,a=function(){t.type="debouncedresize",s.dispatch.apply(n,r)};o&&clearTimeout(o),e?a():o=setTimeout(a,i.threshold)},threshold:20};var r=t(e),a=t(document),l=e.Modernizr;t.Slitslider=function(e,n){this.$elWrapper=t(n),this._init(e)},t.Slitslider.defaults={speed:800,optOpacity:!1,translateFactor:230,maxAngle:25,maxScale:2,autoplay:!1,keyboard:!0,interval:4e3,onBeforeChange:function(){return!1},onAfterChange:function(){return!1}},t.Slitslider.prototype={_init:function(e){this.options=t.extend(!0,{},t.Slitslider.defaults,e),this.transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},this.transEndEventName=this.transEndEventNames[l.prefixed("transition")],this.support=l.csstransitions&&l.csstransforms3d,this.$el=this.$elWrapper.children(".sl-slider"),this.$slides=this.$el.children(".sl-slide").hide(),this.slidesCount=this.$slides.length,this.current=0,this.isAnimating=!1,this._getSize(),this._layout(),this._loadEvents(),this.options.autoplay&&this._startSlideshow()},_getSize:function(){this.size={width:this.$elWrapper.outerWidth(!0),height:this.$elWrapper.outerHeight(!0)}},_layout:function(){this.$slideWrapper=t('<div class="sl-slides-wrapper" />'),this.$slides.wrapAll(this.$slideWrapper).each(function(){var e=t(this),n=e.data("orientation");e.addClass("sl-slide-"+n).children().wrapAll('<div class="sl-content-wrapper" />').wrapAll('<div class="sl-content" />')}),this._setSize(),this.$slides.eq(this.current).show()},_navigate:function(e,i){if(this.isAnimating||this.slidesCount<2)return!1;this.isAnimating=!0;var o=this,s=this.$slides.eq(this.current);i!==n?this.current=i:"next"===e?this.current=this.current<this.slidesCount-1?++this.current:0:"prev"===e&&(this.current=this.current>0?--this.current:this.slidesCount-1),this.options.onBeforeChange(s,this.current);var r=this.$slides.eq(this.current),a="next"===e?s:r,l=a.data(),c={};c.orientation=l.orientation||"horizontal",c.slice1angle=l.slice1Rotation||0,c.slice1scale=l.slice1Scale||1,c.slice2angle=l.slice2Rotation||0,c.slice2scale=l.slice2Scale||1,this._validateValues(c);var u="horizontal"===c.orientation?{marginTop:-this.size.height/2}:{marginLeft:-this.size.width/2},h={transform:"translate(0%,0%) rotate(0deg) scale(1)",opacity:1},p="horizontal"===c.orientation?{transform:"translateY(-"+this.options.translateFactor+"%) rotate("+c.slice1angle+"deg) scale("+c.slice1scale+")"}:{transform:"translateX(-"+this.options.translateFactor+"%) rotate("+c.slice1angle+"deg) scale("+c.slice1scale+")"},f="horizontal"===c.orientation?{transform:"translateY("+this.options.translateFactor+"%) rotate("+c.slice2angle+"deg) scale("+c.slice2scale+")"}:{transform:"translateX("+this.options.translateFactor+"%) rotate("+c.slice2angle+"deg) scale("+c.slice2scale+")"};this.options.optOpacity&&(p.opacity=0,f.opacity=0),s.removeClass("sl-trans-elems");var d={transition:"all "+this.options.speed+"ms ease-in-out"};a.css("z-index",this.slidesCount).find("div.sl-content-wrapper").wrap(t('<div class="sl-content-slice" />').css(d)).parent().cond("prev"===e,function(){var t=this;this.css(p),setTimeout(function(){t.css(h)},50)},function(){var t=this;setTimeout(function(){t.css(p)},50)}).clone().appendTo(a).cond("prev"===e,function(){var t=this;this.css(f),setTimeout(function(){s.addClass("sl-trans-back-elems"),o.support?t.css(h).on(o.transEndEventName,function(){o._onEndNavigate(t,s,e)}):o._onEndNavigate(t,s,e)},50)},function(){var t=this;setTimeout(function(){r.addClass("sl-trans-elems"),o.support?t.css(f).on(o.transEndEventName,function(){o._onEndNavigate(t,s,e)}):o._onEndNavigate(t,s,e)},50)}).find("div.sl-content-wrapper").css(u),r.show()},_validateValues:function(t){(t.slice1angle>this.options.maxAngle||t.slice1angle<-this.options.maxAngle)&&(t.slice1angle=this.options.maxAngle),(t.slice2angle>this.options.maxAngle||t.slice2angle<-this.options.maxAngle)&&(t.slice2angle=this.options.maxAngle),(t.slice1scale>this.options.maxScale||t.slice1scale<=0)&&(t.slice1scale=this.options.maxScale),(t.slice2scale>this.options.maxScale||t.slice2scale<=0)&&(t.slice2scale=this.options.maxScale),"vertical"!==t.orientation&&"horizontal"!==t.orientation&&(t.orientation="horizontal")},_onEndNavigate:function(t,e){var n=t.parent(),i="sl-trans-elems sl-trans-back-elems";t.remove(),n.css("z-index",1).find("div.sl-content-wrapper").unwrap(),e.hide().removeClass(i),n.removeClass(i),this.isAnimating=!1,this.options.onAfterChange(n,this.current)},_setSize:function(){var t={width:this.size.width,height:this.size.height};this.$el.css(t).find("div.sl-content-wrapper").css(t)},_loadEvents:function(){var t=this;r.on("debouncedresize.slitslider",function(){t._getSize(),t._setSize()}),this.options.keyboard&&a.on("keydown.slitslider",function(e){var n=e.keyCode||e.which,i={left:37,up:38,right:39,down:40};switch(n){case i.left:t._stopSlideshow(),t._navigate("prev");break;case i.right:t._stopSlideshow(),t._navigate("next")}})},_startSlideshow:function(){var t=this;this.slideshow=setTimeout(function(){t._navigate("next"),t.options.autoplay&&t._startSlideshow()},this.options.interval)},_stopSlideshow:function(){this.options.autoplay&&(clearTimeout(this.slideshow),this.isPlaying=!1,this.options.autoplay=!1)},_destroy:function(e){this.$el.off(".slitslider").removeData("slitslider"),r.off(".slitslider"),a.off(".slitslider"),this.$slides.each(function(){var e=t(this),n=e.find("div.sl-content").children();n.appendTo(e),e.children("div.sl-content-wrapper").remove()}),this.$slides.unwrap(this.$slideWrapper).hide(),this.$slides.eq(0).show(),e&&e.call()},add:function(e,n){this.$slides=this.$slides.add(e);var i=this;e.each(function(){var e=t(this),n=e.data("orientation");e.hide().addClass("sl-slide-"+n).children().wrapAll('<div class="sl-content-wrapper" />').wrapAll('<div class="sl-content" />').end().appendTo(i.$el.find("div.sl-slides-wrapper"))}),this._setSize(),this.slidesCount=this.$slides.length,n&&n.call($items)},next:function(){this._stopSlideshow(),this._navigate("next")},previous:function(){this._stopSlideshow(),this._navigate("prev")},jump:function(t){return t-=1,t===this.current||t>=this.slidesCount||0>t?!1:(this._stopSlideshow(),void this._navigate(t>this.current?"next":"prev",t))},play:function(){this.isPlaying||(this.isPlaying=!0,this._navigate("next"),this.options.autoplay=!0,this._startSlideshow())},pause:function(){this.isPlaying&&this._stopSlideshow()},isActive:function(){return this.isAnimating},destroy:function(t){this._destroy(t)}};var c=function(t){e.console&&e.console.error(t)};t.fn.slitslider=function(e){var n=t.data(this,"slitslider");if("string"==typeof e){var i=Array.prototype.slice.call(arguments,1);this.each(function(){return n?t.isFunction(n[e])&&"_"!==e.charAt(0)?void n[e].apply(n,i):void c("no such method '"+e+"' for slitslider self"):void c("cannot call methods on slitslider prior to initialization; attempted to call method '"+e+"'")})}else this.each(function(){n?n._init():n=t.data(this,"slitslider",new t.Slitslider(e,this))});return n}}(jQuery,window);