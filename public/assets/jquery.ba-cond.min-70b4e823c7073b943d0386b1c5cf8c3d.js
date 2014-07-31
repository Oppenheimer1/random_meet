/*
 * cond - v0.1 - 6/10/2009
 * http://benalman.com/projects/jquery-cond-plugin/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Licensed under the MIT license
 * http://benalman.com/about/license/
 * 
 * Based on suggestions and sample code by Stephen Band and DBJDBJ in the
 * jquery-dev Google group: http://bit.ly/jqba1
 */
!function(t){t.fn.cond=function(){for(var e,n,i,o,r=arguments,s=0;!n&&s<r.length;)n=r[s++],i=r[s++],n=t.isFunction(n)?n.call(this):n,o=i?n?i.call(this,n):e:n;return o!==e?o:this}}(jQuery);