/*! jQuery v2.2.3 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(b,c,e){var f=!0,g="width"===c?b.offsetWidth:b.offsetHeight,h=Ca(b),i="border-box"===n.css(b,"boxSizing",!1,h);if(d.msFullscreenElement&&a.top!==a&&b.getClientRects().length&&(g=Math.round(100*b.getBoundingClientRect()[c])),0>=g||null==g){if(g=Fa(b,c,h),(0>g||null==g)&&(g=b.style[c]),Ba.test(g))return g;f=i&&(l.boxSizingReliable()||g===b.style[c]),g=parseFloat(g)||0}return g+Oa(b,c,e||(i?"border":"content"),f,h)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,
e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});

/**
 * @license
 * lodash lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 */
;(function(){function t(t,n){return t.set(n[0],n[1]),t}function n(t,n){return t.add(n),t}function r(t,n,r){switch(r.length){case 0:return t.call(n);case 1:return t.call(n,r[0]);case 2:return t.call(n,r[0],r[1]);case 3:return t.call(n,r[0],r[1],r[2])}return t.apply(n,r)}function e(t,n,r,e){for(var u=-1,o=t.length;++u<o;){var i=t[u];n(e,i,r(i),t)}return e}function u(t,n){for(var r=-1,e=t.length;++r<e&&false!==n(t[r],r,t););return t}function o(t,n){for(var r=t.length;r--&&false!==n(t[r],r,t););return t}function i(t,n){
for(var r=-1,e=t.length;++r<e;)if(!n(t[r],r,t))return false;return true}function f(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r];n(i,r,t)&&(o[u++]=i)}return o}function c(t,n){return!!t.length&&-1<d(t,n,0)}function a(t,n,r){for(var e=-1,u=t.length;++e<u;)if(r(n,t[e]))return true;return false}function l(t,n){for(var r=-1,e=t.length,u=Array(e);++r<e;)u[r]=n(t[r],r,t);return u}function s(t,n){for(var r=-1,e=n.length,u=t.length;++r<e;)t[u+r]=n[r];return t}function h(t,n,r,e){var u=-1,o=t.length;for(e&&o&&(r=t[++u]);++u<o;)r=n(r,t[u],u,t);
return r}function p(t,n,r,e){var u=t.length;for(e&&u&&(r=t[--u]);u--;)r=n(r,t[u],u,t);return r}function _(t,n){for(var r=-1,e=t.length;++r<e;)if(n(t[r],r,t))return true;return false}function v(t,n,r,e){var u;return r(t,function(t,r,o){return n(t,r,o)?(u=e?r:t,false):void 0}),u}function g(t,n,r){for(var e=t.length,u=r?e:-1;r?u--:++u<e;)if(n(t[u],u,t))return u;return-1}function d(t,n,r){if(n!==n)return M(t,r);--r;for(var e=t.length;++r<e;)if(t[r]===n)return r;return-1}function y(t,n,r,e){--r;for(var u=t.length;++r<u;)if(e(t[r],n))return r;
return-1}function b(t,n){var r=t?t.length:0;return r?w(t,n)/r:V}function x(t,n,r,e,u){return u(t,function(t,u,o){r=e?(e=false,t):n(r,t,u,o)}),r}function j(t,n){var r=t.length;for(t.sort(n);r--;)t[r]=t[r].c;return t}function w(t,n){for(var r,e=-1,u=t.length;++e<u;){var o=n(t[e]);o!==T&&(r=r===T?o:r+o)}return r}function m(t,n){for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);return e}function A(t,n){return l(n,function(n){return[n,t[n]]})}function O(t){return function(n){return t(n)}}function k(t,n){return l(n,function(n){
return t[n]})}function E(t,n){return t.has(n)}function I(t,n){for(var r=-1,e=t.length;++r<e&&-1<d(n,t[r],0););return r}function S(t,n){for(var r=t.length;r--&&-1<d(n,t[r],0););return r}function R(t){return t&&t.Object===Object?t:null}function W(t){return zt[t]}function B(t){return Ut[t]}function L(t){return"\\"+$t[t]}function M(t,n,r){var e=t.length;for(n+=r?0:-1;r?n--:++n<e;){var u=t[n];if(u!==u)return n}return-1}function C(t){var n=false;if(null!=t&&typeof t.toString!="function")try{n=!!(t+"")}catch(r){}
return n}function z(t){for(var n,r=[];!(n=t.next()).done;)r.push(n.value);return r}function U(t){var n=-1,r=Array(t.size);return t.forEach(function(t,e){r[++n]=[e,t]}),r}function D(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r];i!==n&&"__lodash_placeholder__"!==i||(t[r]="__lodash_placeholder__",o[u++]=r)}return o}function F(t){var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=t}),r}function $(t){var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=[t,t]}),r}function N(t){
if(!t||!Wt.test(t))return t.length;for(var n=St.lastIndex=0;St.test(t);)n++;return n}function P(t){return Dt[t]}function Z(R){function At(t){if(De(t)&&!ai(t)&&!(t instanceof zt)){if(t instanceof kt)return t;if(wu.call(t,"__wrapped__"))return ie(t)}return new kt(t)}function Ot(){}function kt(t,n){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!n,this.__index__=0,this.__values__=T}function zt(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=false,this.__iteratees__=[],
this.__takeCount__=4294967295,this.__views__=[]}function Ut(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Dt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Ft(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function $t(t){var n=-1,r=t?t.length:0;for(this.__data__=new Ft;++n<r;)this.add(t[n])}function Zt(t){this.__data__=new Dt(t)}function Tt(t,n,r,e){return t===T||Se(t,bu[r])&&!wu.call(e,r)?n:t;
}function Vt(t,n,r){(r===T||Se(t[n],r))&&(typeof n!="number"||r!==T||n in t)||(t[n]=r)}function Kt(t,n,r){var e=t[n];wu.call(t,n)&&Se(e,r)&&(r!==T||n in t)||(t[n]=r)}function Gt(t,n){for(var r=t.length;r--;)if(Se(t[r][0],n))return r;return-1}function Ht(t,n,r,e){return go(t,function(t,u,o){n(e,t,r(t),o)}),e}function Qt(t,n){return t&&ar(n,nu(n),t)}function Xt(t,n){for(var r=-1,e=null==t,u=n.length,o=Array(u);++r<u;)o[r]=e?T:Xe(t,n[r]);return o}function tn(t,n,r){return t===t&&(r!==T&&(t=r>=t?t:r),
n!==T&&(t=t>=n?t:n)),t}function nn(t,n,r,e,o,i,f){var c;if(e&&(c=i?e(t,o,i,f):e(t)),c!==T)return c;if(!Ue(t))return t;if(o=ai(t)){if(c=Tr(t),!n)return cr(t,c)}else{var a=Pr(t),l="[object Function]"==a||"[object GeneratorFunction]"==a;if(li(t))return er(t,n);if("[object Object]"==a||"[object Arguments]"==a||l&&!i){if(C(t))return i?t:{};if(c=qr(l?{}:t),!n)return lr(t,Qt(c,t))}else{if(!Ct[a])return i?t:{};c=Vr(t,a,nn,n)}}if(f||(f=new Zt),i=f.get(t))return i;if(f.set(t,c),!o)var s=r?vn(t,nu,Nr):nu(t);
return u(s||t,function(u,o){s&&(o=u,u=t[o]),Kt(c,o,nn(u,n,r,e,o,t,f))}),c}function rn(t){var n=nu(t),r=n.length;return function(e){if(null==e)return!r;for(var u=r;u--;){var o=n[u],i=t[o],f=e[o];if(f===T&&!(o in Object(e))||!i(f))return false}return true}}function en(t){return Ue(t)?zu(t):{}}function un(t,n,r){if(typeof t!="function")throw new du("Expected a function");return Du(function(){t.apply(T,r)},n)}function on(t,n,r,e){var u=-1,o=c,i=true,f=t.length,s=[],h=n.length;if(!f)return s;r&&(n=l(n,O(r))),e?(o=a,
i=false):n.length>=200&&(o=E,i=false,n=new $t(n));t:for(;++u<f;){var p=t[u],_=r?r(p):p,p=e||0!==p?p:0;if(i&&_===_){for(var v=h;v--;)if(n[v]===_)continue t;s.push(p)}else o(n,_,e)||s.push(p)}return s}function fn(t,n){var r=true;return go(t,function(t,e,u){return r=!!n(t,e,u)}),r}function cn(t,n,r){for(var e=-1,u=t.length;++e<u;){var o=t[e],i=n(o);if(null!=i&&(f===T?i===i&&!Te(i):r(i,f)))var f=i,c=o}return c}function an(t,n){var r=[];return go(t,function(t,e,u){n(t,e,u)&&r.push(t)}),r}function ln(t,n,r,e,u){
var o=-1,i=t.length;for(r||(r=Gr),u||(u=[]);++o<i;){var f=t[o];n>0&&r(f)?n>1?ln(f,n-1,r,e,u):s(u,f):e||(u[u.length]=f)}return u}function sn(t,n){return t&&bo(t,n,nu)}function hn(t,n){return t&&xo(t,n,nu)}function pn(t,n){return f(n,function(n){return Me(t[n])})}function _n(t,n){n=Qr(n,t)?[n]:nr(n);for(var r=0,e=n.length;null!=t&&e>r;)t=t[ue(n[r++])];return r&&r==e?t:T}function vn(t,n,r){return n=n(t),ai(t)?n:s(n,r(t))}function gn(t,n){return t>n}function dn(t,n){return wu.call(t,n)||typeof t=="object"&&n in t&&null===Pu(Object(t));
}function yn(t,n){return n in Object(t)}function bn(t,n,r){for(var e=r?a:c,u=t[0].length,o=t.length,i=o,f=Array(o),s=1/0,h=[];i--;){var p=t[i];i&&n&&(p=l(p,O(n))),s=Ku(p.length,s),f[i]=!r&&(n||u>=120&&p.length>=120)?new $t(i&&p):T}var p=t[0],_=-1,v=f[0];t:for(;++_<u&&s>h.length;){var g=p[_],d=n?n(g):g,g=r||0!==g?g:0;if(v?!E(v,d):!e(h,d,r)){for(i=o;--i;){var y=f[i];if(y?!E(y,d):!e(t[i],d,r))continue t}v&&v.push(d),h.push(g)}}return h}function xn(t,n,r){var e={};return sn(t,function(t,u,o){n(e,r(t),u,o);
}),e}function jn(t,n,e){return Qr(n,t)||(n=nr(n),t=ee(t,n),n=le(n)),n=null==t?t:t[ue(n)],null==n?T:r(n,t,e)}function wn(t,n,r,e,u){if(t===n)n=true;else if(null==t||null==n||!Ue(t)&&!De(n))n=t!==t&&n!==n;else t:{var o=ai(t),i=ai(n),f="[object Array]",c="[object Array]";o||(f=Pr(t),f="[object Arguments]"==f?"[object Object]":f),i||(c=Pr(n),c="[object Arguments]"==c?"[object Object]":c);var a="[object Object]"==f&&!C(t),i="[object Object]"==c&&!C(n);if((c=f==c)&&!a)u||(u=new Zt),n=o||qe(t)?Lr(t,n,wn,r,e,u):Mr(t,n,f,wn,r,e,u);else{
if(!(2&e)&&(o=a&&wu.call(t,"__wrapped__"),f=i&&wu.call(n,"__wrapped__"),o||f)){t=o?t.value():t,n=f?n.value():n,u||(u=new Zt),n=wn(t,n,r,e,u);break t}if(c)n:if(u||(u=new Zt),o=2&e,f=nu(t),i=f.length,c=nu(n).length,i==c||o){for(a=i;a--;){var l=f[a];if(!(o?l in n:dn(n,l))){n=false;break n}}if(c=u.get(t))n=c==n;else{c=true,u.set(t,n);for(var s=o;++a<i;){var l=f[a],h=t[l],p=n[l];if(r)var _=o?r(p,h,l,n,t,u):r(h,p,l,t,n,u);if(_===T?h!==p&&!wn(h,p,r,e,u):!_){c=false;break}s||(s="constructor"==l)}c&&!s&&(r=t.constructor,
e=n.constructor,r!=e&&"constructor"in t&&"constructor"in n&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(c=false)),u["delete"](t),n=c}}else n=false;else n=false}}return n}function mn(t,n,r,e){var u=r.length,o=u,i=!e;if(null==t)return!o;for(t=Object(t);u--;){var f=r[u];if(i&&f[2]?f[1]!==t[f[0]]:!(f[0]in t))return false}for(;++u<o;){var f=r[u],c=f[0],a=t[c],l=f[1];if(i&&f[2]){if(a===T&&!(c in t))return false}else{if(f=new Zt,e)var s=e(a,l,c,t,n,f);if(s===T?!wn(l,a,e,3,f):!s)return false;
}}return true}function An(t){return typeof t=="function"?t:null==t?cu:typeof t=="object"?ai(t)?Sn(t[0],t[1]):In(t):hu(t)}function On(t){t=null==t?t:Object(t);var n,r=[];for(n in t)r.push(n);return r}function kn(t,n){return n>t}function En(t,n){var r=-1,e=We(t)?Array(t.length):[];return go(t,function(t,u,o){e[++r]=n(t,u,o)}),e}function In(t){var n=Fr(t);return 1==n.length&&n[0][2]?ne(n[0][0],n[0][1]):function(r){return r===t||mn(r,t,n)}}function Sn(t,n){return Qr(t)&&n===n&&!Ue(n)?ne(ue(t),n):function(r){
var e=Xe(r,t);return e===T&&e===n?tu(r,t):wn(n,e,T,3)}}function Rn(t,n,r,e,o){if(t!==n){if(!ai(n)&&!qe(n))var i=ru(n);u(i||n,function(u,f){if(i&&(f=u,u=n[f]),Ue(u)){o||(o=new Zt);var c=f,a=o,l=t[c],s=n[c],h=a.get(s);if(h)Vt(t,c,h);else{var h=e?e(l,s,c+"",t,n,a):T,p=h===T;p&&(h=s,ai(s)||qe(s)?ai(l)?h=l:Be(l)?h=cr(l):(p=false,h=nn(s,true)):Ne(s)||Re(s)?Re(l)?h=He(l):!Ue(l)||r&&Me(l)?(p=false,h=nn(s,true)):h=l:p=false),a.set(s,h),p&&Rn(h,s,r,e,a),a["delete"](s),Vt(t,c,h)}}else c=e?e(t[f],u,f+"",t,n,o):T,c===T&&(c=u),
Vt(t,f,c)})}}function Wn(t,n){var r=t.length;return r?(n+=0>n?r:0,Yr(n,r)?t[n]:T):void 0}function Bn(t,n,r){var e=-1;return n=l(n.length?n:[cu],O(Ur())),t=En(t,function(t){return{a:l(n,function(n){return n(t)}),b:++e,c:t}}),j(t,function(t,n){var e;t:{e=-1;for(var u=t.a,o=n.a,i=u.length,f=r.length;++e<i;){var c=or(u[e],o[e]);if(c){e=e>=f?c:c*("desc"==r[e]?-1:1);break t}}e=t.b-n.b}return e})}function Ln(t,n){return t=Object(t),h(n,function(n,r){return r in t&&(n[r]=t[r]),n},{})}function Mn(t,n){for(var r=-1,e=vn(t,ru,Oo),u=e.length,o={};++r<u;){
var i=e[r],f=t[i];n(f,i)&&(o[i]=f)}return o}function Cn(t){return function(n){return null==n?T:n[t]}}function zn(t){return function(n){return _n(n,t)}}function Un(t,n,r,e){var u=e?y:d,o=-1,i=n.length,f=t;for(r&&(f=l(t,O(r)));++o<i;)for(var c=0,a=n[o],a=r?r(a):a;-1<(c=u(f,a,c,e));)f!==t&&Fu.call(f,c,1),Fu.call(t,c,1);return t}function Dn(t,n){for(var r=t?n.length:0,e=r-1;r--;){var u=n[r];if(r==e||u!==o){var o=u;if(Yr(u))Fu.call(t,u,1);else if(Qr(u,t))delete t[ue(u)];else{var u=nr(u),i=ee(t,u);null!=i&&delete i[ue(le(u))];
}}}}function Fn(t,n){return t+Nu(Ju()*(n-t+1))}function $n(t,n){var r="";if(!t||1>n||n>9007199254740991)return r;do n%2&&(r+=t),(n=Nu(n/2))&&(t+=t);while(n);return r}function Nn(t,n,r,e){n=Qr(n,t)?[n]:nr(n);for(var u=-1,o=n.length,i=o-1,f=t;null!=f&&++u<o;){var c=ue(n[u]);if(Ue(f)){var a=r;if(u!=i){var l=f[c],a=e?e(l,c,f):T;a===T&&(a=null==l?Yr(n[u+1])?[]:{}:l)}Kt(f,c,a)}f=f[c]}return t}function Pn(t,n,r){var e=-1,u=t.length;for(0>n&&(n=-n>u?0:u+n),r=r>u?u:r,0>r&&(r+=u),u=n>r?0:r-n>>>0,n>>>=0,r=Array(u);++e<u;)r[e]=t[e+n];
return r}function Zn(t,n){var r;return go(t,function(t,e,u){return r=n(t,e,u),!r}),!!r}function Tn(t,n,r){var e=0,u=t?t.length:e;if(typeof n=="number"&&n===n&&2147483647>=u){for(;u>e;){var o=e+u>>>1,i=t[o];null!==i&&!Te(i)&&(r?n>=i:n>i)?e=o+1:u=o}return u}return qn(t,n,cu,r)}function qn(t,n,r,e){n=r(n);for(var u=0,o=t?t.length:0,i=n!==n,f=null===n,c=Te(n),a=n===T;o>u;){var l=Nu((u+o)/2),s=r(t[l]),h=s!==T,p=null===s,_=s===s,v=Te(s);(i?e||_:a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):p||v?0:e?n>=s:n>s)?u=l+1:o=l;
}return Ku(o,4294967294)}function Vn(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r],f=n?n(i):i;if(!r||!Se(f,c)){var c=f;o[u++]=0===i?0:i}}return o}function Kn(t){return typeof t=="number"?t:Te(t)?V:+t}function Gn(t){if(typeof t=="string")return t;if(Te(t))return vo?vo.call(t):"";var n=t+"";return"0"==n&&1/t==-q?"-0":n}function Jn(t,n,r){var e=-1,u=c,o=t.length,i=true,f=[],l=f;if(r)i=false,u=a;else if(o>=200){if(u=n?null:wo(t))return F(u);i=false,u=E,l=new $t}else l=n?[]:f;t:for(;++e<o;){var s=t[e],h=n?n(s):s,s=r||0!==s?s:0;
if(i&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue t;n&&l.push(h),f.push(s)}else u(l,h,r)||(l!==f&&l.push(h),f.push(s))}return f}function Yn(t,n,r,e){for(var u=t.length,o=e?u:-1;(e?o--:++o<u)&&n(t[o],o,t););return r?Pn(t,e?0:o,e?o+1:u):Pn(t,e?o+1:0,e?u:o)}function Hn(t,n){var r=t;return r instanceof zt&&(r=r.value()),h(n,function(t,n){return n.func.apply(n.thisArg,s([t],n.args))},r)}function Qn(t,n,r){for(var e=-1,u=t.length;++e<u;)var o=o?s(on(o,t[e],n,r),on(t[e],o,n,r)):t[e];return o&&o.length?Jn(o,n,r):[];
}function Xn(t,n,r){for(var e=-1,u=t.length,o=n.length,i={};++e<u;)r(i,t[e],o>e?n[e]:T);return i}function tr(t){return Be(t)?t:[]}function nr(t){return ai(t)?t:Eo(t)}function rr(t,n,r){var e=t.length;return r=r===T?e:r,!n&&r>=e?t:Pn(t,n,r)}function er(t,n){if(n)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}function ur(t){var n=new t.constructor(t.byteLength);return new Wu(n).set(new Wu(t)),n}function or(t,n){if(t!==n){var r=t!==T,e=null===t,u=t===t,o=Te(t),i=n!==T,f=null===n,c=n===n,a=Te(n);
if(!f&&!a&&!o&&t>n||o&&i&&c&&!f&&!a||e&&i&&c||!r&&c||!u)return 1;if(!e&&!o&&!a&&n>t||a&&r&&u&&!e&&!o||f&&r&&u||!i&&u||!c)return-1}return 0}function ir(t,n,r,e){var u=-1,o=t.length,i=r.length,f=-1,c=n.length,a=Vu(o-i,0),l=Array(c+a);for(e=!e;++f<c;)l[f]=n[f];for(;++u<i;)(e||o>u)&&(l[r[u]]=t[u]);for(;a--;)l[f++]=t[u++];return l}function fr(t,n,r,e){var u=-1,o=t.length,i=-1,f=r.length,c=-1,a=n.length,l=Vu(o-f,0),s=Array(l+a);for(e=!e;++u<l;)s[u]=t[u];for(l=u;++c<a;)s[l+c]=n[c];for(;++i<f;)(e||o>u)&&(s[l+r[i]]=t[u++]);
return s}function cr(t,n){var r=-1,e=t.length;for(n||(n=Array(e));++r<e;)n[r]=t[r];return n}function ar(t,n,r,e){r||(r={});for(var u=-1,o=n.length;++u<o;){var i=n[u],f=e?e(r[i],t[i],i,r,t):t[i];Kt(r,i,f)}return r}function lr(t,n){return ar(t,Nr(t),n)}function sr(t,n){return function(r,u){var o=ai(r)?e:Ht,i=n?n():{};return o(r,t,Ur(u),i)}}function hr(t){return Ie(function(n,r){var e=-1,u=r.length,o=u>1?r[u-1]:T,i=u>2?r[2]:T,o=t.length>3&&typeof o=="function"?(u--,o):T;for(i&&Hr(r[0],r[1],i)&&(o=3>u?T:o,
u=1),n=Object(n);++e<u;)(i=r[e])&&t(n,i,e,o);return n})}function pr(t,n){return function(r,e){if(null==r)return r;if(!We(r))return t(r,e);for(var u=r.length,o=n?u:-1,i=Object(r);(n?o--:++o<u)&&false!==e(i[o],o,i););return r}}function _r(t){return function(n,r,e){var u=-1,o=Object(n);e=e(n);for(var i=e.length;i--;){var f=e[t?i:++u];if(false===r(o[f],f,o))break}return n}}function vr(t,n,r){function e(){return(this&&this!==Jt&&this instanceof e?o:t).apply(u?r:this,arguments)}var u=1&n,o=yr(t);return e}function gr(t){
return function(n){n=Qe(n);var r=Wt.test(n)?n.match(St):T,e=r?r[0]:n.charAt(0);return n=r?rr(r,1).join(""):n.slice(1),e[t]()+n}}function dr(t){return function(n){return h(iu(ou(n).replace(Et,"")),t,"")}}function yr(t){return function(){var n=arguments;switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3]);case 5:return new t(n[0],n[1],n[2],n[3],n[4]);case 6:return new t(n[0],n[1],n[2],n[3],n[4],n[5]);
case 7:return new t(n[0],n[1],n[2],n[3],n[4],n[5],n[6])}var r=en(t.prototype),n=t.apply(r,n);return Ue(n)?n:r}}function br(t,n,e){function u(){for(var i=arguments.length,f=Array(i),c=i,a=zr(u);c--;)f[c]=arguments[c];return c=3>i&&f[0]!==a&&f[i-1]!==a?[]:D(f,a),i-=c.length,e>i?Sr(t,n,jr,u.placeholder,T,f,c,T,T,e-i):r(this&&this!==Jt&&this instanceof u?o:t,this,f)}var o=yr(t);return u}function xr(t){return Ie(function(n){n=ln(n,1);var r=n.length,e=r,u=kt.prototype.thru;for(t&&n.reverse();e--;){var o=n[e];
if(typeof o!="function")throw new du("Expected a function");if(u&&!i&&"wrapper"==Cr(o))var i=new kt([],true)}for(e=i?e:r;++e<r;)var o=n[e],u=Cr(o),f="wrapper"==u?mo(o):T,i=f&&Xr(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?i[Cr(f[0])].apply(i,f[3]):1==o.length&&Xr(o)?i[u]():i.thru(o);return function(){var t=arguments,e=t[0];if(i&&1==t.length&&ai(e)&&e.length>=200)return i.plant(e).value();for(var u=0,t=r?n[u].apply(this,t):e;++u<r;)t=n[u].call(this,t);return t}})}function jr(t,n,r,e,u,o,i,f,c,a){function l(){
for(var d=arguments.length,y=Array(d),b=d;b--;)y[b]=arguments[b];if(_){var x,j=zr(l),b=y.length;for(x=0;b--;)y[b]===j&&x++}if(e&&(y=ir(y,e,u,_)),o&&(y=fr(y,o,i,_)),d-=x,_&&a>d)return j=D(y,j),Sr(t,n,jr,l.placeholder,r,y,j,f,c,a-d);if(j=h?r:this,b=p?j[t]:t,d=y.length,f){x=y.length;for(var w=Ku(f.length,x),m=cr(y);w--;){var A=f[w];y[w]=Yr(A,x)?m[A]:T}}else v&&d>1&&y.reverse();return s&&d>c&&(y.length=c),this&&this!==Jt&&this instanceof l&&(b=g||yr(b)),b.apply(j,y)}var s=128&n,h=1&n,p=2&n,_=24&n,v=512&n,g=p?T:yr(t);
return l}function wr(t,n){return function(r,e){return xn(r,t,n(e))}}function mr(t){return function(n,r){var e;if(n===T&&r===T)return 0;if(n!==T&&(e=n),r!==T){if(e===T)return r;typeof n=="string"||typeof r=="string"?(n=Gn(n),r=Gn(r)):(n=Kn(n),r=Kn(r)),e=t(n,r)}return e}}function Ar(t){return Ie(function(n){return n=1==n.length&&ai(n[0])?l(n[0],O(Ur())):l(ln(n,1,Jr),O(Ur())),Ie(function(e){var u=this;return t(n,function(t){return r(t,u,e)})})})}function Or(t,n){n=n===T?" ":Gn(n);var r=n.length;return 2>r?r?$n(n,t):n:(r=$n(n,$u(t/N(n))),
Wt.test(n)?rr(r.match(St),0,t).join(""):r.slice(0,t))}function kr(t,n,e,u){function o(){for(var n=-1,c=arguments.length,a=-1,l=u.length,s=Array(l+c),h=this&&this!==Jt&&this instanceof o?f:t;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++n];return r(h,i?e:this,s)}var i=1&n,f=yr(t);return o}function Er(t){return function(n,r,e){e&&typeof e!="number"&&Hr(n,r,e)&&(r=e=T),n=Ye(n),n=n===n?n:0,r===T?(r=n,n=0):r=Ye(r)||0,e=e===T?r>n?1:-1:Ye(e)||0;var u=-1;r=Vu($u((r-n)/(e||1)),0);for(var o=Array(r);r--;)o[t?r:++u]=n,
n+=e;return o}}function Ir(t){return function(n,r){return typeof n=="string"&&typeof r=="string"||(n=Ye(n),r=Ye(r)),t(n,r)}}function Sr(t,n,r,e,u,o,i,f,c,a){var l=8&n,s=l?i:T;i=l?T:i;var h=l?o:T;return o=l?T:o,n=(n|(l?32:64))&~(l?64:32),4&n||(n&=-4),n=[t,n,u,h,s,o,i,f,c,a],r=r.apply(T,n),Xr(t)&&ko(r,n),r.placeholder=e,r}function Rr(t){var n=vu[t];return function(t,r){if(t=Ye(t),r=Ge(r)){var e=(Qe(t)+"e").split("e"),e=n(e[0]+"e"+(+e[1]+r)),e=(Qe(e)+"e").split("e");return+(e[0]+"e"+(+e[1]-r))}return n(t);
}}function Wr(t){return function(n){var r=Pr(n);return"[object Map]"==r?U(n):"[object Set]"==r?$(n):A(n,t(n))}}function Br(t,n,r,e,u,o,i,f){var c=2&n;if(!c&&typeof t!="function")throw new du("Expected a function");var a=e?e.length:0;if(a||(n&=-97,e=u=T),i=i===T?i:Vu(Ge(i),0),f=f===T?f:Ge(f),a-=u?u.length:0,64&n){var l=e,s=u;e=u=T}var h=c?T:mo(t);return o=[t,n,r,e,u,l,s,o,i,f],h&&(r=o[1],t=h[1],n=r|t,e=128==t&&8==r||128==t&&256==r&&h[8]>=o[7].length||384==t&&h[8]>=h[7].length&&8==r,131>n||e)&&(1&t&&(o[2]=h[2],
n|=1&r?0:4),(r=h[3])&&(e=o[3],o[3]=e?ir(e,r,h[4]):r,o[4]=e?D(o[3],"__lodash_placeholder__"):h[4]),(r=h[5])&&(e=o[5],o[5]=e?fr(e,r,h[6]):r,o[6]=e?D(o[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(o[7]=r),128&t&&(o[8]=null==o[8]?h[8]:Ku(o[8],h[8])),null==o[9]&&(o[9]=h[9]),o[0]=h[0],o[1]=n),t=o[0],n=o[1],r=o[2],e=o[3],u=o[4],f=o[9]=null==o[9]?c?0:t.length:Vu(o[9]-a,0),!f&&24&n&&(n&=-25),(h?jo:ko)(n&&1!=n?8==n||16==n?br(t,n,f):32!=n&&33!=n||u.length?jr.apply(T,o):kr(t,n,r,e):vr(t,n,r),o)}function Lr(t,n,r,e,u,o){
var i=2&u,f=t.length,c=n.length;if(f!=c&&!(i&&c>f))return false;if(c=o.get(t))return c==n;var c=-1,a=true,l=1&u?new $t:T;for(o.set(t,n);++c<f;){var s=t[c],h=n[c];if(e)var p=i?e(h,s,c,n,t,o):e(s,h,c,t,n,o);if(p!==T){if(p)continue;a=false;break}if(l){if(!_(n,function(t,n){return l.has(n)||s!==t&&!r(s,t,e,u,o)?void 0:l.add(n)})){a=false;break}}else if(s!==h&&!r(s,h,e,u,o)){a=false;break}}return o["delete"](t),a}function Mr(t,n,r,e,u,o,i){switch(r){case"[object DataView]":if(t.byteLength!=n.byteLength||t.byteOffset!=n.byteOffset)break;
t=t.buffer,n=n.buffer;case"[object ArrayBuffer]":if(t.byteLength!=n.byteLength||!e(new Wu(t),new Wu(n)))break;return true;case"[object Boolean]":case"[object Date]":return+t==+n;case"[object Error]":return t.name==n.name&&t.message==n.message;case"[object Number]":return t!=+t?n!=+n:t==+n;case"[object RegExp]":case"[object String]":return t==n+"";case"[object Map]":var f=U;case"[object Set]":if(f||(f=F),t.size!=n.size&&!(2&o))break;return(r=i.get(t))?r==n:(o|=1,i.set(t,n),Lr(f(t),f(n),e,u,o,i));case"[object Symbol]":
if(_o)return _o.call(t)==_o.call(n)}return false}function Cr(t){for(var n=t.name+"",r=fo[n],e=wu.call(fo,n)?r.length:0;e--;){var u=r[e],o=u.func;if(null==o||o==t)return u.name}return n}function zr(t){return(wu.call(At,"placeholder")?At:t).placeholder}function Ur(){var t=At.iteratee||au,t=t===au?An:t;return arguments.length?t(arguments[0],arguments[1]):t}function Dr(t,n){var r=t.__data__,e=typeof n;return("string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==n:null===n)?r[typeof n=="string"?"string":"hash"]:r.map;
}function Fr(t){t=Ei(t);for(var n=t.length;n--;){var r=t[n][1];t[n][2]=r===r&&!Ue(r)}return t}function $r(t,n){var r=t[n];return Fe(r)?r:T}function Nr(t){return Mu(Object(t))}function Pr(t){return Ou.call(t)}function Zr(t,n,r){n=Qr(n,t)?[n]:nr(n);for(var e,u=-1,o=n.length;++u<o;){var i=ue(n[u]);if(!(e=null!=t&&r(t,i)))break;t=t[i]}return e?e:(o=t?t.length:0,!!o&&ze(o)&&Yr(i,o)&&(ai(t)||Ze(t)||Re(t)))}function Tr(t){var n=t.length,r=t.constructor(n);return n&&"string"==typeof t[0]&&wu.call(t,"index")&&(r.index=t.index,
r.input=t.input),r}function qr(t){return typeof t.constructor!="function"||te(t)?{}:en(Pu(Object(t)))}function Vr(r,e,u,o){var i=r.constructor;switch(e){case"[object ArrayBuffer]":return ur(r);case"[object Boolean]":case"[object Date]":return new i(+r);case"[object DataView]":return e=o?ur(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":
case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return e=o?ur(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.length);case"[object Map]":return e=o?u(U(r),true):U(r),h(e,t,new r.constructor);case"[object Number]":case"[object String]":return new i(r);case"[object RegExp]":return e=new r.constructor(r.source,_t.exec(r)),e.lastIndex=r.lastIndex,e;case"[object Set]":return e=o?u(F(r),true):F(r),h(e,n,new r.constructor);case"[object Symbol]":return _o?Object(_o.call(r)):{};
}}function Kr(t){var n=t?t.length:T;return ze(n)&&(ai(t)||Ze(t)||Re(t))?m(n,String):null}function Gr(t){return ai(t)||Re(t)}function Jr(t){return ai(t)&&!(2==t.length&&!Me(t[0]))}function Yr(t,n){return n=null==n?9007199254740991:n,!!n&&(typeof t=="number"||xt.test(t))&&t>-1&&0==t%1&&n>t}function Hr(t,n,r){if(!Ue(r))return false;var e=typeof n;return("number"==e?We(r)&&Yr(n,r.length):"string"==e&&n in r)?Se(r[n],t):false}function Qr(t,n){if(ai(t))return false;var r=typeof t;return"number"==r||"symbol"==r||"boolean"==r||null==t||Te(t)?true:ut.test(t)||!et.test(t)||null!=n&&t in Object(n);
}function Xr(t){var n=Cr(t),r=At[n];return typeof r=="function"&&n in zt.prototype?t===r?true:(n=mo(r),!!n&&t===n[0]):false}function te(t){var n=t&&t.constructor;return t===(typeof n=="function"&&n.prototype||bu)}function ne(t,n){return function(r){return null==r?false:r[t]===n&&(n!==T||t in Object(r))}}function re(t,n,r,e,u,o){return Ue(t)&&Ue(n)&&Rn(t,n,T,re,o.set(n,t)),t}function ee(t,n){return 1==n.length?t:_n(t,Pn(n,0,-1))}function ue(t){if(typeof t=="string"||Te(t))return t;var n=t+"";return"0"==n&&1/t==-q?"-0":n;
}function oe(t){if(null!=t){try{return ju.call(t)}catch(n){}return t+""}return""}function ie(t){if(t instanceof zt)return t.clone();var n=new kt(t.__wrapped__,t.__chain__);return n.__actions__=cr(t.__actions__),n.__index__=t.__index__,n.__values__=t.__values__,n}function fe(t,n,r){var e=t?t.length:0;return e?(n=r||n===T?1:Ge(n),Pn(t,0>n?0:n,e)):[]}function ce(t,n,r){var e=t?t.length:0;return e?(n=r||n===T?1:Ge(n),n=e-n,Pn(t,0,0>n?0:n)):[]}function ae(t){return t&&t.length?t[0]:T}function le(t){var n=t?t.length:0;
return n?t[n-1]:T}function se(t,n){return t&&t.length&&n&&n.length?Un(t,n):t}function he(t){return t?Hu.call(t):t}function pe(t){if(!t||!t.length)return[];var n=0;return t=f(t,function(t){return Be(t)?(n=Vu(t.length,n),true):void 0}),m(n,function(n){return l(t,Cn(n))})}function _e(t,n){if(!t||!t.length)return[];var e=pe(t);return null==n?e:l(e,function(t){return r(n,T,t)})}function ve(t){return t=At(t),t.__chain__=true,t}function ge(t,n){return n(t)}function de(){return this}function ye(t,n){return(ai(t)?u:go)(t,Ur(n,3));
}function be(t,n){return(ai(t)?o:yo)(t,Ur(n,3))}function xe(t,n){return(ai(t)?l:En)(t,Ur(n,3))}function je(t,n,r){var e=-1,u=Ve(t),o=u.length,i=o-1;for(n=(r?Hr(t,n,r):n===T)?1:tn(Ge(n),0,o);++e<n;)t=Fn(e,i),r=u[t],u[t]=u[e],u[e]=r;return u.length=n,u}function we(t,n,r){return n=r?T:n,n=t&&null==n?t.length:n,Br(t,128,T,T,T,T,n)}function me(t,n){var r;if(typeof n!="function")throw new du("Expected a function");return t=Ge(t),function(){return 0<--t&&(r=n.apply(this,arguments)),1>=t&&(n=T),r}}function Ae(t,n,r){
return n=r?T:n,t=Br(t,8,T,T,T,T,T,n),t.placeholder=Ae.placeholder,t}function Oe(t,n,r){return n=r?T:n,t=Br(t,16,T,T,T,T,T,n),t.placeholder=Oe.placeholder,t}function ke(t,n,r){function e(n){var r=c,e=a;return c=a=T,_=n,s=t.apply(e,r)}function u(t){var r=t-p;return t-=_,!p||r>=n||0>r||g&&t>=l}function o(){var t=Qo();if(u(t))return i(t);var r;r=t-_,t=n-(t-p),r=g?Ku(t,l-r):t,h=Du(o,r)}function i(t){return Bu(h),h=T,d&&c?e(t):(c=a=T,s)}function f(){var t=Qo(),r=u(t);if(c=arguments,a=this,p=t,r){if(h===T)return _=t=p,
h=Du(o,n),v?e(t):s;if(g)return Bu(h),h=Du(o,n),e(p)}return h===T&&(h=Du(o,n)),s}var c,a,l,s,h,p=0,_=0,v=false,g=false,d=true;if(typeof t!="function")throw new du("Expected a function");return n=Ye(n)||0,Ue(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Vu(Ye(r.maxWait)||0,n):l,d="trailing"in r?!!r.trailing:d),f.cancel=function(){h!==T&&Bu(h),p=_=0,c=a=h=T},f.flush=function(){return h===T?s:i(Qo())},f}function Ee(t,n){function r(){var e=arguments,u=n?n.apply(this,e):e[0],o=r.cache;return o.has(u)?o.get(u):(e=t.apply(this,e),
r.cache=o.set(u,e),e)}if(typeof t!="function"||n&&typeof n!="function")throw new du("Expected a function");return r.cache=new(Ee.Cache||Ft),r}function Ie(t,n){if(typeof t!="function")throw new du("Expected a function");return n=Vu(n===T?t.length-1:Ge(n),0),function(){for(var e=arguments,u=-1,o=Vu(e.length-n,0),i=Array(o);++u<o;)i[u]=e[n+u];switch(n){case 0:return t.call(this,i);case 1:return t.call(this,e[0],i);case 2:return t.call(this,e[0],e[1],i)}for(o=Array(n+1),u=-1;++u<n;)o[u]=e[u];return o[n]=i,
r(t,this,o)}}function Se(t,n){return t===n||t!==t&&n!==n}function Re(t){return Be(t)&&wu.call(t,"callee")&&(!Uu.call(t,"callee")||"[object Arguments]"==Ou.call(t))}function We(t){return null!=t&&ze(Ao(t))&&!Me(t)}function Be(t){return De(t)&&We(t)}function Le(t){return De(t)?"[object Error]"==Ou.call(t)||typeof t.message=="string"&&typeof t.name=="string":false}function Me(t){return t=Ue(t)?Ou.call(t):"","[object Function]"==t||"[object GeneratorFunction]"==t}function Ce(t){return typeof t=="number"&&t==Ge(t);
}function ze(t){return typeof t=="number"&&t>-1&&0==t%1&&9007199254740991>=t}function Ue(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function De(t){return!!t&&typeof t=="object"}function Fe(t){return Ue(t)?(Me(t)||C(t)?Eu:yt).test(oe(t)):false}function $e(t){return typeof t=="number"||De(t)&&"[object Number]"==Ou.call(t)}function Ne(t){return!De(t)||"[object Object]"!=Ou.call(t)||C(t)?false:(t=Pu(Object(t)),null===t?true:(t=wu.call(t,"constructor")&&t.constructor,typeof t=="function"&&t instanceof t&&ju.call(t)==Au));
}function Pe(t){return Ue(t)&&"[object RegExp]"==Ou.call(t)}function Ze(t){return typeof t=="string"||!ai(t)&&De(t)&&"[object String]"==Ou.call(t)}function Te(t){return typeof t=="symbol"||De(t)&&"[object Symbol]"==Ou.call(t)}function qe(t){return De(t)&&ze(t.length)&&!!Mt[Ou.call(t)]}function Ve(t){if(!t)return[];if(We(t))return Ze(t)?t.match(St):cr(t);if(Cu&&t[Cu])return z(t[Cu]());var n=Pr(t);return("[object Map]"==n?U:"[object Set]"==n?F:eu)(t)}function Ke(t){return t?(t=Ye(t),t===q||t===-q?1.7976931348623157e308*(0>t?-1:1):t===t?t:0):0===t?t:0;
}function Ge(t){t=Ke(t);var n=t%1;return t===t?n?t-n:t:0}function Je(t){return t?tn(Ge(t),0,4294967295):0}function Ye(t){if(typeof t=="number")return t;if(Te(t))return V;if(Ue(t)&&(t=Me(t.valueOf)?t.valueOf():t,t=Ue(t)?t+"":t),typeof t!="string")return 0===t?t:+t;t=t.replace(ct,"");var n=dt.test(t);return n||bt.test(t)?Pt(t.slice(2),n?2:8):gt.test(t)?V:+t}function He(t){return ar(t,ru(t))}function Qe(t){return null==t?"":Gn(t)}function Xe(t,n,r){return t=null==t?T:_n(t,n),t===T?r:t}function tu(t,n){
return null!=t&&Zr(t,n,yn)}function nu(t){var n=te(t);if(!n&&!We(t))return qu(Object(t));var r,e=Kr(t),u=!!e,e=e||[],o=e.length;for(r in t)!dn(t,r)||u&&("length"==r||Yr(r,o))||n&&"constructor"==r||e.push(r);return e}function ru(t){for(var n=-1,r=te(t),e=On(t),u=e.length,o=Kr(t),i=!!o,o=o||[],f=o.length;++n<u;){var c=e[n];i&&("length"==c||Yr(c,f))||"constructor"==c&&(r||!wu.call(t,c))||o.push(c)}return o}function eu(t){return t?k(t,nu(t)):[]}function uu(t){return zi(Qe(t).toLowerCase())}function ou(t){
return(t=Qe(t))&&t.replace(jt,W).replace(It,"")}function iu(t,n,r){return t=Qe(t),n=r?T:n,n===T&&(n=Bt.test(t)?Rt:st),t.match(n)||[]}function fu(t){return function(){return t}}function cu(t){return t}function au(t){return An(typeof t=="function"?t:nn(t,true))}function lu(t,n,r){var e=nu(n),o=pn(n,e);null!=r||Ue(n)&&(o.length||!e.length)||(r=n,n=t,t=this,o=pn(n,nu(n)));var i=!(Ue(r)&&"chain"in r&&!r.chain),f=Me(t);return u(o,function(r){var e=n[r];t[r]=e,f&&(t.prototype[r]=function(){var n=this.__chain__;
if(i||n){var r=t(this.__wrapped__);return(r.__actions__=cr(this.__actions__)).push({func:e,args:arguments,thisArg:t}),r.__chain__=n,r}return e.apply(t,s([this.value()],arguments))})}),t}function su(){}function hu(t){return Qr(t)?Cn(ue(t)):zn(t)}R=R?Yt.defaults({},R,Yt.pick(Jt,Lt)):Jt;var pu=R.Date,_u=R.Error,vu=R.Math,gu=R.RegExp,du=R.TypeError,yu=R.Array.prototype,bu=R.Object.prototype,xu=R.String.prototype,ju=R.Function.prototype.toString,wu=bu.hasOwnProperty,mu=0,Au=ju.call(Object),Ou=bu.toString,ku=Jt._,Eu=gu("^"+ju.call(wu).replace(it,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Iu=qt?R.Buffer:T,Su=R.Reflect,Ru=R.Symbol,Wu=R.Uint8Array,Bu=R.clearTimeout,Lu=Su?Su.f:T,Mu=Object.getOwnPropertySymbols,Cu=typeof(Cu=Ru&&Ru.iterator)=="symbol"?Cu:T,zu=Object.create,Uu=bu.propertyIsEnumerable,Du=R.setTimeout,Fu=yu.splice,$u=vu.ceil,Nu=vu.floor,Pu=Object.getPrototypeOf,Zu=R.isFinite,Tu=yu.join,qu=Object.keys,Vu=vu.max,Ku=vu.min,Gu=R.parseInt,Ju=vu.random,Yu=xu.replace,Hu=yu.reverse,Qu=xu.split,Xu=$r(R,"DataView"),to=$r(R,"Map"),no=$r(R,"Promise"),ro=$r(R,"Set"),eo=$r(R,"WeakMap"),uo=$r(Object,"create"),oo=eo&&new eo,io=!Uu.call({
valueOf:1},"valueOf"),fo={},co=oe(Xu),ao=oe(to),lo=oe(no),so=oe(ro),ho=oe(eo),po=Ru?Ru.prototype:T,_o=po?po.valueOf:T,vo=po?po.toString:T;At.templateSettings={escape:tt,evaluate:nt,interpolate:rt,variable:"",imports:{_:At}},At.prototype=Ot.prototype,At.prototype.constructor=At,kt.prototype=en(Ot.prototype),kt.prototype.constructor=kt,zt.prototype=en(Ot.prototype),zt.prototype.constructor=zt,Ut.prototype.clear=function(){this.__data__=uo?uo(null):{}},Ut.prototype["delete"]=function(t){return this.has(t)&&delete this.__data__[t];
},Ut.prototype.get=function(t){var n=this.__data__;return uo?(t=n[t],"__lodash_hash_undefined__"===t?T:t):wu.call(n,t)?n[t]:T},Ut.prototype.has=function(t){var n=this.__data__;return uo?n[t]!==T:wu.call(n,t)},Ut.prototype.set=function(t,n){return this.__data__[t]=uo&&n===T?"__lodash_hash_undefined__":n,this},Dt.prototype.clear=function(){this.__data__=[]},Dt.prototype["delete"]=function(t){var n=this.__data__;return t=Gt(n,t),0>t?false:(t==n.length-1?n.pop():Fu.call(n,t,1),true)},Dt.prototype.get=function(t){
var n=this.__data__;return t=Gt(n,t),0>t?T:n[t][1]},Dt.prototype.has=function(t){return-1<Gt(this.__data__,t)},Dt.prototype.set=function(t,n){var r=this.__data__,e=Gt(r,t);return 0>e?r.push([t,n]):r[e][1]=n,this},Ft.prototype.clear=function(){this.__data__={hash:new Ut,map:new(to||Dt),string:new Ut}},Ft.prototype["delete"]=function(t){return Dr(this,t)["delete"](t)},Ft.prototype.get=function(t){return Dr(this,t).get(t)},Ft.prototype.has=function(t){return Dr(this,t).has(t)},Ft.prototype.set=function(t,n){
return Dr(this,t).set(t,n),this},$t.prototype.add=$t.prototype.push=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this},$t.prototype.has=function(t){return this.__data__.has(t)},Zt.prototype.clear=function(){this.__data__=new Dt},Zt.prototype["delete"]=function(t){return this.__data__["delete"](t)},Zt.prototype.get=function(t){return this.__data__.get(t)},Zt.prototype.has=function(t){return this.__data__.has(t)},Zt.prototype.set=function(t,n){var r=this.__data__;return r instanceof Dt&&200==r.__data__.length&&(r=this.__data__=new Ft(r.__data__)),
r.set(t,n),this};var go=pr(sn),yo=pr(hn,true),bo=_r(),xo=_r(true);Lu&&!Uu.call({valueOf:1},"valueOf")&&(On=function(t){return z(Lu(t))});var jo=oo?function(t,n){return oo.set(t,n),t}:cu,wo=ro&&1/F(new ro([,-0]))[1]==q?function(t){return new ro(t)}:su,mo=oo?function(t){return oo.get(t)}:su,Ao=Cn("length");Mu||(Nr=function(){return[]});var Oo=Mu?function(t){for(var n=[];t;)s(n,Nr(t)),t=Pu(Object(t));return n}:Nr;(Xu&&"[object DataView]"!=Pr(new Xu(new ArrayBuffer(1)))||to&&"[object Map]"!=Pr(new to)||no&&"[object Promise]"!=Pr(no.resolve())||ro&&"[object Set]"!=Pr(new ro)||eo&&"[object WeakMap]"!=Pr(new eo))&&(Pr=function(t){
var n=Ou.call(t);if(t=(t="[object Object]"==n?t.constructor:T)?oe(t):T)switch(t){case co:return"[object DataView]";case ao:return"[object Map]";case lo:return"[object Promise]";case so:return"[object Set]";case ho:return"[object WeakMap]"}return n});var ko=function(){var t=0,n=0;return function(r,e){var u=Qo(),o=16-(u-n);if(n=u,o>0){if(150<=++t)return r}else t=0;return jo(r,e)}}(),Eo=Ee(function(t){var n=[];return Qe(t).replace(ot,function(t,r,e,u){n.push(e?u.replace(ht,"$1"):r||t)}),n}),Io=Ie(function(t,n){
return Be(t)?on(t,ln(n,1,Be,true)):[]}),So=Ie(function(t,n){var r=le(n);return Be(r)&&(r=T),Be(t)?on(t,ln(n,1,Be,true),Ur(r)):[]}),Ro=Ie(function(t,n){var r=le(n);return Be(r)&&(r=T),Be(t)?on(t,ln(n,1,Be,true),T,r):[]}),Wo=Ie(function(t){var n=l(t,tr);return n.length&&n[0]===t[0]?bn(n):[]}),Bo=Ie(function(t){var n=le(t),r=l(t,tr);return n===le(r)?n=T:r.pop(),r.length&&r[0]===t[0]?bn(r,Ur(n)):[]}),Lo=Ie(function(t){var n=le(t),r=l(t,tr);return n===le(r)?n=T:r.pop(),r.length&&r[0]===t[0]?bn(r,T,n):[]}),Mo=Ie(se),Co=Ie(function(t,n){
n=ln(n,1);var r=t?t.length:0,e=Xt(t,n);return Dn(t,l(n,function(t){return Yr(t,r)?+t:t}).sort(or)),e}),zo=Ie(function(t){return Jn(ln(t,1,Be,true))}),Uo=Ie(function(t){var n=le(t);return Be(n)&&(n=T),Jn(ln(t,1,Be,true),Ur(n))}),Do=Ie(function(t){var n=le(t);return Be(n)&&(n=T),Jn(ln(t,1,Be,true),T,n)}),Fo=Ie(function(t,n){return Be(t)?on(t,n):[]}),$o=Ie(function(t){return Qn(f(t,Be))}),No=Ie(function(t){var n=le(t);return Be(n)&&(n=T),Qn(f(t,Be),Ur(n))}),Po=Ie(function(t){var n=le(t);return Be(n)&&(n=T),
Qn(f(t,Be),T,n)}),Zo=Ie(pe),To=Ie(function(t){var n=t.length,n=n>1?t[n-1]:T,n=typeof n=="function"?(t.pop(),n):T;return _e(t,n)}),qo=Ie(function(t){function n(n){return Xt(n,t)}t=ln(t,1);var r=t.length,e=r?t[0]:0,u=this.__wrapped__;return!(r>1||this.__actions__.length)&&u instanceof zt&&Yr(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:ge,args:[n],thisArg:T}),new kt(u,this.__chain__).thru(function(t){return r&&!t.length&&t.push(T),t})):this.thru(n)}),Vo=sr(function(t,n,r){wu.call(t,r)?++t[r]:t[r]=1;
}),Ko=sr(function(t,n,r){wu.call(t,r)?t[r].push(n):t[r]=[n]}),Go=Ie(function(t,n,e){var u=-1,o=typeof n=="function",i=Qr(n),f=We(t)?Array(t.length):[];return go(t,function(t){var c=o?n:i&&null!=t?t[n]:T;f[++u]=c?r(c,t,e):jn(t,n,e)}),f}),Jo=sr(function(t,n,r){t[r]=n}),Yo=sr(function(t,n,r){t[r?0:1].push(n)},function(){return[[],[]]}),Ho=Ie(function(t,n){if(null==t)return[];var r=n.length;return r>1&&Hr(t,n[0],n[1])?n=[]:r>2&&Hr(n[0],n[1],n[2])&&(n=[n[0]]),n=1==n.length&&ai(n[0])?n[0]:ln(n,1,Jr),Bn(t,n,[]);
}),Qo=pu.now,Xo=Ie(function(t,n,r){var e=1;if(r.length)var u=D(r,zr(Xo)),e=32|e;return Br(t,e,n,r,u)}),ti=Ie(function(t,n,r){var e=3;if(r.length)var u=D(r,zr(ti)),e=32|e;return Br(n,e,t,r,u)}),ni=Ie(function(t,n){return un(t,1,n)}),ri=Ie(function(t,n,r){return un(t,Ye(n)||0,r)});Ee.Cache=Ft;var ei=Ie(function(t,n){n=1==n.length&&ai(n[0])?l(n[0],O(Ur())):l(ln(n,1,Jr),O(Ur()));var e=n.length;return Ie(function(u){for(var o=-1,i=Ku(u.length,e);++o<i;)u[o]=n[o].call(this,u[o]);return r(t,this,u)})}),ui=Ie(function(t,n){
var r=D(n,zr(ui));return Br(t,32,T,n,r)}),oi=Ie(function(t,n){var r=D(n,zr(oi));return Br(t,64,T,n,r)}),ii=Ie(function(t,n){return Br(t,256,T,T,T,ln(n,1))}),fi=Ir(gn),ci=Ir(function(t,n){return t>=n}),ai=Array.isArray,li=Iu?function(t){return t instanceof Iu}:fu(false),si=Ir(kn),hi=Ir(function(t,n){return n>=t}),pi=hr(function(t,n){if(io||te(n)||We(n))ar(n,nu(n),t);else for(var r in n)wu.call(n,r)&&Kt(t,r,n[r])}),_i=hr(function(t,n){if(io||te(n)||We(n))ar(n,ru(n),t);else for(var r in n)Kt(t,r,n[r])}),vi=hr(function(t,n,r,e){
ar(n,ru(n),t,e)}),gi=hr(function(t,n,r,e){ar(n,nu(n),t,e)}),di=Ie(function(t,n){return Xt(t,ln(n,1))}),yi=Ie(function(t){return t.push(T,Tt),r(vi,T,t)}),bi=Ie(function(t){return t.push(T,re),r(Ai,T,t)}),xi=wr(function(t,n,r){t[n]=r},fu(cu)),ji=wr(function(t,n,r){wu.call(t,n)?t[n].push(r):t[n]=[r]},Ur),wi=Ie(jn),mi=hr(function(t,n,r){Rn(t,n,r)}),Ai=hr(function(t,n,r,e){Rn(t,n,r,e)}),Oi=Ie(function(t,n){return null==t?{}:(n=l(ln(n,1),ue),Ln(t,on(vn(t,ru,Oo),n)))}),ki=Ie(function(t,n){return null==t?{}:Ln(t,l(ln(n,1),ue));
}),Ei=Wr(nu),Ii=Wr(ru),Si=dr(function(t,n,r){return n=n.toLowerCase(),t+(r?uu(n):n)}),Ri=dr(function(t,n,r){return t+(r?"-":"")+n.toLowerCase()}),Wi=dr(function(t,n,r){return t+(r?" ":"")+n.toLowerCase()}),Bi=gr("toLowerCase"),Li=dr(function(t,n,r){return t+(r?"_":"")+n.toLowerCase()}),Mi=dr(function(t,n,r){return t+(r?" ":"")+zi(n)}),Ci=dr(function(t,n,r){return t+(r?" ":"")+n.toUpperCase()}),zi=gr("toUpperCase"),Ui=Ie(function(t,n){try{return r(t,T,n)}catch(e){return Le(e)?e:new _u(e)}}),Di=Ie(function(t,n){
return u(ln(n,1),function(n){n=ue(n),t[n]=Xo(t[n],t)}),t}),Fi=xr(),$i=xr(true),Ni=Ie(function(t,n){return function(r){return jn(r,t,n)}}),Pi=Ie(function(t,n){return function(r){return jn(t,r,n)}}),Zi=Ar(l),Ti=Ar(i),qi=Ar(_),Vi=Er(),Ki=Er(true),Gi=mr(function(t,n){return t+n}),Ji=Rr("ceil"),Yi=mr(function(t,n){return t/n}),Hi=Rr("floor"),Qi=mr(function(t,n){return t*n}),Xi=Rr("round"),tf=mr(function(t,n){return t-n});return At.after=function(t,n){if(typeof n!="function")throw new du("Expected a function");
return t=Ge(t),function(){return 1>--t?n.apply(this,arguments):void 0}},At.ary=we,At.assign=pi,At.assignIn=_i,At.assignInWith=vi,At.assignWith=gi,At.at=di,At.before=me,At.bind=Xo,At.bindAll=Di,At.bindKey=ti,At.castArray=function(){if(!arguments.length)return[];var t=arguments[0];return ai(t)?t:[t]},At.chain=ve,At.chunk=function(t,n,r){if(n=(r?Hr(t,n,r):n===T)?1:Vu(Ge(n),0),r=t?t.length:0,!r||1>n)return[];for(var e=0,u=0,o=Array($u(r/n));r>e;)o[u++]=Pn(t,e,e+=n);return o},At.compact=function(t){for(var n=-1,r=t?t.length:0,e=0,u=[];++n<r;){
var o=t[n];o&&(u[e++]=o)}return u},At.concat=function(){for(var t=arguments.length,n=Array(t?t-1:0),r=arguments[0],e=t;e--;)n[e-1]=arguments[e];return t?s(ai(r)?cr(r):[r],ln(n,1)):[]},At.cond=function(t){var n=t?t.length:0,e=Ur();return t=n?l(t,function(t){if("function"!=typeof t[1])throw new du("Expected a function");return[e(t[0]),t[1]]}):[],Ie(function(e){for(var u=-1;++u<n;){var o=t[u];if(r(o[0],this,e))return r(o[1],this,e)}})},At.conforms=function(t){return rn(nn(t,true))},At.constant=fu,At.countBy=Vo,
At.create=function(t,n){var r=en(t);return n?Qt(r,n):r},At.curry=Ae,At.curryRight=Oe,At.debounce=ke,At.defaults=yi,At.defaultsDeep=bi,At.defer=ni,At.delay=ri,At.difference=Io,At.differenceBy=So,At.differenceWith=Ro,At.drop=fe,At.dropRight=ce,At.dropRightWhile=function(t,n){return t&&t.length?Yn(t,Ur(n,3),true,true):[]},At.dropWhile=function(t,n){return t&&t.length?Yn(t,Ur(n,3),true):[]},At.fill=function(t,n,r,e){var u=t?t.length:0;if(!u)return[];for(r&&typeof r!="number"&&Hr(t,n,r)&&(r=0,e=u),u=t.length,
r=Ge(r),0>r&&(r=-r>u?0:u+r),e=e===T||e>u?u:Ge(e),0>e&&(e+=u),e=r>e?0:Je(e);e>r;)t[r++]=n;return t},At.filter=function(t,n){return(ai(t)?f:an)(t,Ur(n,3))},At.flatMap=function(t,n){return ln(xe(t,n),1)},At.flatMapDeep=function(t,n){return ln(xe(t,n),q)},At.flatMapDepth=function(t,n,r){return r=r===T?1:Ge(r),ln(xe(t,n),r)},At.flatten=function(t){return t&&t.length?ln(t,1):[]},At.flattenDeep=function(t){return t&&t.length?ln(t,q):[]},At.flattenDepth=function(t,n){return t&&t.length?(n=n===T?1:Ge(n),ln(t,n)):[];
},At.flip=function(t){return Br(t,512)},At.flow=Fi,At.flowRight=$i,At.fromPairs=function(t){for(var n=-1,r=t?t.length:0,e={};++n<r;){var u=t[n];e[u[0]]=u[1]}return e},At.functions=function(t){return null==t?[]:pn(t,nu(t))},At.functionsIn=function(t){return null==t?[]:pn(t,ru(t))},At.groupBy=Ko,At.initial=function(t){return ce(t,1)},At.intersection=Wo,At.intersectionBy=Bo,At.intersectionWith=Lo,At.invert=xi,At.invertBy=ji,At.invokeMap=Go,At.iteratee=au,At.keyBy=Jo,At.keys=nu,At.keysIn=ru,At.map=xe,
At.mapKeys=function(t,n){var r={};return n=Ur(n,3),sn(t,function(t,e,u){r[n(t,e,u)]=t}),r},At.mapValues=function(t,n){var r={};return n=Ur(n,3),sn(t,function(t,e,u){r[e]=n(t,e,u)}),r},At.matches=function(t){return In(nn(t,true))},At.matchesProperty=function(t,n){return Sn(t,nn(n,true))},At.memoize=Ee,At.merge=mi,At.mergeWith=Ai,At.method=Ni,At.methodOf=Pi,At.mixin=lu,At.negate=function(t){if(typeof t!="function")throw new du("Expected a function");return function(){return!t.apply(this,arguments)}},At.nthArg=function(t){
return t=Ge(t),Ie(function(n){return Wn(n,t)})},At.omit=Oi,At.omitBy=function(t,n){return n=Ur(n),Mn(t,function(t,r){return!n(t,r)})},At.once=function(t){return me(2,t)},At.orderBy=function(t,n,r,e){return null==t?[]:(ai(n)||(n=null==n?[]:[n]),r=e?T:r,ai(r)||(r=null==r?[]:[r]),Bn(t,n,r))},At.over=Zi,At.overArgs=ei,At.overEvery=Ti,At.overSome=qi,At.partial=ui,At.partialRight=oi,At.partition=Yo,At.pick=ki,At.pickBy=function(t,n){return null==t?{}:Mn(t,Ur(n))},At.property=hu,At.propertyOf=function(t){
return function(n){return null==t?T:_n(t,n)}},At.pull=Mo,At.pullAll=se,At.pullAllBy=function(t,n,r){return t&&t.length&&n&&n.length?Un(t,n,Ur(r)):t},At.pullAllWith=function(t,n,r){return t&&t.length&&n&&n.length?Un(t,n,T,r):t},At.pullAt=Co,At.range=Vi,At.rangeRight=Ki,At.rearg=ii,At.reject=function(t,n){var r=ai(t)?f:an;return n=Ur(n,3),r(t,function(t,r,e){return!n(t,r,e)})},At.remove=function(t,n){var r=[];if(!t||!t.length)return r;var e=-1,u=[],o=t.length;for(n=Ur(n,3);++e<o;){var i=t[e];n(i,e,t)&&(r.push(i),
u.push(e))}return Dn(t,u),r},At.rest=Ie,At.reverse=he,At.sampleSize=je,At.set=function(t,n,r){return null==t?t:Nn(t,n,r)},At.setWith=function(t,n,r,e){return e=typeof e=="function"?e:T,null==t?t:Nn(t,n,r,e)},At.shuffle=function(t){return je(t,4294967295)},At.slice=function(t,n,r){var e=t?t.length:0;return e?(r&&typeof r!="number"&&Hr(t,n,r)?(n=0,r=e):(n=null==n?0:Ge(n),r=r===T?e:Ge(r)),Pn(t,n,r)):[]},At.sortBy=Ho,At.sortedUniq=function(t){return t&&t.length?Vn(t):[]},At.sortedUniqBy=function(t,n){
return t&&t.length?Vn(t,Ur(n)):[]},At.split=function(t,n,r){return r&&typeof r!="number"&&Hr(t,n,r)&&(n=r=T),r=r===T?4294967295:r>>>0,r?(t=Qe(t))&&(typeof n=="string"||null!=n&&!Pe(n))&&(n=Gn(n),""==n&&Wt.test(t))?rr(t.match(St),0,r):Qu.call(t,n,r):[]},At.spread=function(t,n){if(typeof t!="function")throw new du("Expected a function");return n=n===T?0:Vu(Ge(n),0),Ie(function(e){var u=e[n];return e=rr(e,0,n),u&&s(e,u),r(t,this,e)})},At.tail=function(t){return fe(t,1)},At.take=function(t,n,r){return t&&t.length?(n=r||n===T?1:Ge(n),
Pn(t,0,0>n?0:n)):[]},At.takeRight=function(t,n,r){var e=t?t.length:0;return e?(n=r||n===T?1:Ge(n),n=e-n,Pn(t,0>n?0:n,e)):[]},At.takeRightWhile=function(t,n){return t&&t.length?Yn(t,Ur(n,3),false,true):[]},At.takeWhile=function(t,n){return t&&t.length?Yn(t,Ur(n,3)):[]},At.tap=function(t,n){return n(t),t},At.throttle=function(t,n,r){var e=true,u=true;if(typeof t!="function")throw new du("Expected a function");return Ue(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),ke(t,n,{leading:e,maxWait:n,
trailing:u})},At.thru=ge,At.toArray=Ve,At.toPairs=Ei,At.toPairsIn=Ii,At.toPath=function(t){return ai(t)?l(t,ue):Te(t)?[t]:cr(Eo(t))},At.toPlainObject=He,At.transform=function(t,n,r){var e=ai(t)||qe(t);if(n=Ur(n,4),null==r)if(e||Ue(t)){var o=t.constructor;r=e?ai(t)?new o:[]:Me(o)?en(Pu(Object(t))):{}}else r={};return(e?u:sn)(t,function(t,e,u){return n(r,t,e,u)}),r},At.unary=function(t){return we(t,1)},At.union=zo,At.unionBy=Uo,At.unionWith=Do,At.uniq=function(t){return t&&t.length?Jn(t):[]},At.uniqBy=function(t,n){
return t&&t.length?Jn(t,Ur(n)):[]},At.uniqWith=function(t,n){return t&&t.length?Jn(t,T,n):[]},At.unset=function(t,n){var r;if(null==t)r=true;else{r=t;var e=n,e=Qr(e,r)?[e]:nr(e);r=ee(r,e),e=ue(le(e)),r=!(null!=r&&dn(r,e))||delete r[e]}return r},At.unzip=pe,At.unzipWith=_e,At.update=function(t,n,r){return null==t?t:Nn(t,n,(typeof r=="function"?r:cu)(_n(t,n)),void 0)},At.updateWith=function(t,n,r,e){return e=typeof e=="function"?e:T,null!=t&&(t=Nn(t,n,(typeof r=="function"?r:cu)(_n(t,n)),e)),t},At.values=eu,
At.valuesIn=function(t){return null==t?[]:k(t,ru(t))},At.without=Fo,At.words=iu,At.wrap=function(t,n){return n=null==n?cu:n,ui(n,t)},At.xor=$o,At.xorBy=No,At.xorWith=Po,At.zip=Zo,At.zipObject=function(t,n){return Xn(t||[],n||[],Kt)},At.zipObjectDeep=function(t,n){return Xn(t||[],n||[],Nn)},At.zipWith=To,At.entries=Ei,At.entriesIn=Ii,At.extend=_i,At.extendWith=vi,lu(At,At),At.add=Gi,At.attempt=Ui,At.camelCase=Si,At.capitalize=uu,At.ceil=Ji,At.clamp=function(t,n,r){return r===T&&(r=n,n=T),r!==T&&(r=Ye(r),
r=r===r?r:0),n!==T&&(n=Ye(n),n=n===n?n:0),tn(Ye(t),n,r)},At.clone=function(t){return nn(t,false,true)},At.cloneDeep=function(t){return nn(t,true,true)},At.cloneDeepWith=function(t,n){return nn(t,true,true,n)},At.cloneWith=function(t,n){return nn(t,false,true,n)},At.deburr=ou,At.divide=Yi,At.endsWith=function(t,n,r){t=Qe(t),n=Gn(n);var e=t.length;return r=r===T?e:tn(Ge(r),0,e),r-=n.length,r>=0&&t.indexOf(n,r)==r},At.eq=Se,At.escape=function(t){return(t=Qe(t))&&X.test(t)?t.replace(H,B):t},At.escapeRegExp=function(t){
return(t=Qe(t))&&ft.test(t)?t.replace(it,"\\$&"):t},At.every=function(t,n,r){var e=ai(t)?i:fn;return r&&Hr(t,n,r)&&(n=T),e(t,Ur(n,3))},At.find=function(t,n){if(n=Ur(n,3),ai(t)){var r=g(t,n);return r>-1?t[r]:T}return v(t,n,go)},At.findIndex=function(t,n){return t&&t.length?g(t,Ur(n,3)):-1},At.findKey=function(t,n){return v(t,Ur(n,3),sn,true)},At.findLast=function(t,n){if(n=Ur(n,3),ai(t)){var r=g(t,n,true);return r>-1?t[r]:T}return v(t,n,yo)},At.findLastIndex=function(t,n){return t&&t.length?g(t,Ur(n,3),true):-1;
},At.findLastKey=function(t,n){return v(t,Ur(n,3),hn,true)},At.floor=Hi,At.forEach=ye,At.forEachRight=be,At.forIn=function(t,n){return null==t?t:bo(t,Ur(n,3),ru)},At.forInRight=function(t,n){return null==t?t:xo(t,Ur(n,3),ru)},At.forOwn=function(t,n){return t&&sn(t,Ur(n,3))},At.forOwnRight=function(t,n){return t&&hn(t,Ur(n,3))},At.get=Xe,At.gt=fi,At.gte=ci,At.has=function(t,n){return null!=t&&Zr(t,n,dn)},At.hasIn=tu,At.head=ae,At.identity=cu,At.includes=function(t,n,r,e){return t=We(t)?t:eu(t),r=r&&!e?Ge(r):0,
e=t.length,0>r&&(r=Vu(e+r,0)),Ze(t)?e>=r&&-1<t.indexOf(n,r):!!e&&-1<d(t,n,r)},At.indexOf=function(t,n,r){var e=t?t.length:0;return e?(r=Ge(r),0>r&&(r=Vu(e+r,0)),d(t,n,r)):-1},At.inRange=function(t,n,r){return n=Ye(n)||0,r===T?(r=n,n=0):r=Ye(r)||0,t=Ye(t),t>=Ku(n,r)&&t<Vu(n,r)},At.invoke=wi,At.isArguments=Re,At.isArray=ai,At.isArrayBuffer=function(t){return De(t)&&"[object ArrayBuffer]"==Ou.call(t)},At.isArrayLike=We,At.isArrayLikeObject=Be,At.isBoolean=function(t){return true===t||false===t||De(t)&&"[object Boolean]"==Ou.call(t);
},At.isBuffer=li,At.isDate=function(t){return De(t)&&"[object Date]"==Ou.call(t)},At.isElement=function(t){return!!t&&1===t.nodeType&&De(t)&&!Ne(t)},At.isEmpty=function(t){if(We(t)&&(ai(t)||Ze(t)||Me(t.splice)||Re(t)||li(t)))return!t.length;if(De(t)){var n=Pr(t);if("[object Map]"==n||"[object Set]"==n)return!t.size}for(var r in t)if(wu.call(t,r))return false;return!(io&&nu(t).length)},At.isEqual=function(t,n){return wn(t,n)},At.isEqualWith=function(t,n,r){var e=(r=typeof r=="function"?r:T)?r(t,n):T;return e===T?wn(t,n,r):!!e;
},At.isError=Le,At.isFinite=function(t){return typeof t=="number"&&Zu(t)},At.isFunction=Me,At.isInteger=Ce,At.isLength=ze,At.isMap=function(t){return De(t)&&"[object Map]"==Pr(t)},At.isMatch=function(t,n){return t===n||mn(t,n,Fr(n))},At.isMatchWith=function(t,n,r){return r=typeof r=="function"?r:T,mn(t,n,Fr(n),r)},At.isNaN=function(t){return $e(t)&&t!=+t},At.isNative=Fe,At.isNil=function(t){return null==t},At.isNull=function(t){return null===t},At.isNumber=$e,At.isObject=Ue,At.isObjectLike=De,At.isPlainObject=Ne,
At.isRegExp=Pe,At.isSafeInteger=function(t){return Ce(t)&&t>=-9007199254740991&&9007199254740991>=t},At.isSet=function(t){return De(t)&&"[object Set]"==Pr(t)},At.isString=Ze,At.isSymbol=Te,At.isTypedArray=qe,At.isUndefined=function(t){return t===T},At.isWeakMap=function(t){return De(t)&&"[object WeakMap]"==Pr(t)},At.isWeakSet=function(t){return De(t)&&"[object WeakSet]"==Ou.call(t)},At.join=function(t,n){return t?Tu.call(t,n):""},At.kebabCase=Ri,At.last=le,At.lastIndexOf=function(t,n,r){var e=t?t.length:0;
if(!e)return-1;var u=e;if(r!==T&&(u=Ge(r),u=(0>u?Vu(e+u,0):Ku(u,e-1))+1),n!==n)return M(t,u,true);for(;u--;)if(t[u]===n)return u;return-1},At.lowerCase=Wi,At.lowerFirst=Bi,At.lt=si,At.lte=hi,At.max=function(t){return t&&t.length?cn(t,cu,gn):T},At.maxBy=function(t,n){return t&&t.length?cn(t,Ur(n),gn):T},At.mean=function(t){return b(t,cu)},At.meanBy=function(t,n){return b(t,Ur(n))},At.min=function(t){return t&&t.length?cn(t,cu,kn):T},At.minBy=function(t,n){return t&&t.length?cn(t,Ur(n),kn):T},At.multiply=Qi,
At.nth=function(t,n){return t&&t.length?Wn(t,Ge(n)):T},At.noConflict=function(){return Jt._===this&&(Jt._=ku),this},At.noop=su,At.now=Qo,At.pad=function(t,n,r){t=Qe(t);var e=(n=Ge(n))?N(t):0;return!n||e>=n?t:(n=(n-e)/2,Or(Nu(n),r)+t+Or($u(n),r))},At.padEnd=function(t,n,r){t=Qe(t);var e=(n=Ge(n))?N(t):0;return n&&n>e?t+Or(n-e,r):t},At.padStart=function(t,n,r){t=Qe(t);var e=(n=Ge(n))?N(t):0;return n&&n>e?Or(n-e,r)+t:t},At.parseInt=function(t,n,r){return r||null==n?n=0:n&&(n=+n),t=Qe(t).replace(ct,""),
Gu(t,n||(vt.test(t)?16:10))},At.random=function(t,n,r){if(r&&typeof r!="boolean"&&Hr(t,n,r)&&(n=r=T),r===T&&(typeof n=="boolean"?(r=n,n=T):typeof t=="boolean"&&(r=t,t=T)),t===T&&n===T?(t=0,n=1):(t=Ye(t)||0,n===T?(n=t,t=0):n=Ye(n)||0),t>n){var e=t;t=n,n=e}return r||t%1||n%1?(r=Ju(),Ku(t+r*(n-t+Nt("1e-"+((r+"").length-1))),n)):Fn(t,n)},At.reduce=function(t,n,r){var e=ai(t)?h:x,u=3>arguments.length;return e(t,Ur(n,4),r,u,go)},At.reduceRight=function(t,n,r){var e=ai(t)?p:x,u=3>arguments.length;return e(t,Ur(n,4),r,u,yo);
},At.repeat=function(t,n,r){return n=(r?Hr(t,n,r):n===T)?1:Ge(n),$n(Qe(t),n)},At.replace=function(){var t=arguments,n=Qe(t[0]);return 3>t.length?n:Yu.call(n,t[1],t[2])},At.result=function(t,n,r){n=Qr(n,t)?[n]:nr(n);var e=-1,u=n.length;for(u||(t=T,u=1);++e<u;){var o=null==t?T:t[ue(n[e])];o===T&&(e=u,o=r),t=Me(o)?o.call(t):o}return t},At.round=Xi,At.runInContext=Z,At.sample=function(t){t=We(t)?t:eu(t);var n=t.length;return n>0?t[Fn(0,n-1)]:T},At.size=function(t){if(null==t)return 0;if(We(t)){var n=t.length;
return n&&Ze(t)?N(t):n}return De(t)&&(n=Pr(t),"[object Map]"==n||"[object Set]"==n)?t.size:nu(t).length},At.snakeCase=Li,At.some=function(t,n,r){var e=ai(t)?_:Zn;return r&&Hr(t,n,r)&&(n=T),e(t,Ur(n,3))},At.sortedIndex=function(t,n){return Tn(t,n)},At.sortedIndexBy=function(t,n,r){return qn(t,n,Ur(r))},At.sortedIndexOf=function(t,n){var r=t?t.length:0;if(r){var e=Tn(t,n);if(r>e&&Se(t[e],n))return e}return-1},At.sortedLastIndex=function(t,n){return Tn(t,n,true)},At.sortedLastIndexBy=function(t,n,r){return qn(t,n,Ur(r),true);
},At.sortedLastIndexOf=function(t,n){if(t&&t.length){var r=Tn(t,n,true)-1;if(Se(t[r],n))return r}return-1},At.startCase=Mi,At.startsWith=function(t,n,r){return t=Qe(t),r=tn(Ge(r),0,t.length),t.lastIndexOf(Gn(n),r)==r},At.subtract=tf,At.sum=function(t){return t&&t.length?w(t,cu):0},At.sumBy=function(t,n){return t&&t.length?w(t,Ur(n)):0},At.template=function(t,n,r){var e=At.templateSettings;r&&Hr(t,n,r)&&(n=T),t=Qe(t),n=vi({},n,e,Tt),r=vi({},n.imports,e.imports,Tt);var u,o,i=nu(r),f=k(r,i),c=0;r=n.interpolate||wt;
var a="__p+='";r=gu((n.escape||wt).source+"|"+r.source+"|"+(r===rt?pt:wt).source+"|"+(n.evaluate||wt).source+"|$","g");var l="sourceURL"in n?"//# sourceURL="+n.sourceURL+"\n":"";if(t.replace(r,function(n,r,e,i,f,l){return e||(e=i),a+=t.slice(c,l).replace(mt,L),r&&(u=true,a+="'+__e("+r+")+'"),f&&(o=true,a+="';"+f+";\n__p+='"),e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+n.length,n}),a+="';",(n=n.variable)||(a="with(obj){"+a+"}"),a=(o?a.replace(K,""):a).replace(G,"$1").replace(J,"$1;"),a="function("+(n||"obj")+"){"+(n?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(o?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",
n=Ui(function(){return Function(i,l+"return "+a).apply(T,f)}),n.source=a,Le(n))throw n;return n},At.times=function(t,n){if(t=Ge(t),1>t||t>9007199254740991)return[];var r=4294967295,e=Ku(t,4294967295);for(n=Ur(n),t-=4294967295,e=m(e,n);++r<t;)n(r);return e},At.toFinite=Ke,At.toInteger=Ge,At.toLength=Je,At.toLower=function(t){return Qe(t).toLowerCase()},At.toNumber=Ye,At.toSafeInteger=function(t){return tn(Ge(t),-9007199254740991,9007199254740991)},At.toString=Qe,At.toUpper=function(t){return Qe(t).toUpperCase();
},At.trim=function(t,n,r){return(t=Qe(t))&&(r||n===T)?t.replace(ct,""):t&&(n=Gn(n))?(t=t.match(St),n=n.match(St),rr(t,I(t,n),S(t,n)+1).join("")):t},At.trimEnd=function(t,n,r){return(t=Qe(t))&&(r||n===T)?t.replace(lt,""):t&&(n=Gn(n))?(t=t.match(St),n=S(t,n.match(St))+1,rr(t,0,n).join("")):t},At.trimStart=function(t,n,r){return(t=Qe(t))&&(r||n===T)?t.replace(at,""):t&&(n=Gn(n))?(t=t.match(St),n=I(t,n.match(St)),rr(t,n).join("")):t},At.truncate=function(t,n){var r=30,e="...";if(Ue(n))var u="separator"in n?n.separator:u,r="length"in n?Ge(n.length):r,e="omission"in n?Gn(n.omission):e;
t=Qe(t);var o=t.length;if(Wt.test(t))var i=t.match(St),o=i.length;if(r>=o)return t;if(o=r-N(e),1>o)return e;if(r=i?rr(i,0,o).join(""):t.slice(0,o),u===T)return r+e;if(i&&(o+=r.length-o),Pe(u)){if(t.slice(o).search(u)){var f=r;for(u.global||(u=gu(u.source,Qe(_t.exec(u))+"g")),u.lastIndex=0;i=u.exec(f);)var c=i.index;r=r.slice(0,c===T?o:c)}}else t.indexOf(Gn(u),o)!=o&&(u=r.lastIndexOf(u),u>-1&&(r=r.slice(0,u)));return r+e},At.unescape=function(t){return(t=Qe(t))&&Q.test(t)?t.replace(Y,P):t},At.uniqueId=function(t){
var n=++mu;return Qe(t)+n},At.upperCase=Ci,At.upperFirst=zi,At.each=ye,At.eachRight=be,At.first=ae,lu(At,function(){var t={};return sn(At,function(n,r){wu.call(At.prototype,r)||(t[r]=n)}),t}(),{chain:false}),At.VERSION="4.12.0",u("bind bindKey curry curryRight partial partialRight".split(" "),function(t){At[t].placeholder=At}),u(["drop","take"],function(t,n){zt.prototype[t]=function(r){var e=this.__filtered__;if(e&&!n)return new zt(this);r=r===T?1:Vu(Ge(r),0);var u=this.clone();return e?u.__takeCount__=Ku(r,u.__takeCount__):u.__views__.push({
size:Ku(r,4294967295),type:t+(0>u.__dir__?"Right":"")}),u},zt.prototype[t+"Right"]=function(n){return this.reverse()[t](n).reverse()}}),u(["filter","map","takeWhile"],function(t,n){var r=n+1,e=1==r||3==r;zt.prototype[t]=function(t){var n=this.clone();return n.__iteratees__.push({iteratee:Ur(t,3),type:r}),n.__filtered__=n.__filtered__||e,n}}),u(["head","last"],function(t,n){var r="take"+(n?"Right":"");zt.prototype[t]=function(){return this[r](1).value()[0]}}),u(["initial","tail"],function(t,n){var r="drop"+(n?"":"Right");
zt.prototype[t]=function(){return this.__filtered__?new zt(this):this[r](1)}}),zt.prototype.compact=function(){return this.filter(cu)},zt.prototype.find=function(t){return this.filter(t).head()},zt.prototype.findLast=function(t){return this.reverse().find(t)},zt.prototype.invokeMap=Ie(function(t,n){return typeof t=="function"?new zt(this):this.map(function(r){return jn(r,t,n)})}),zt.prototype.reject=function(t){return t=Ur(t,3),this.filter(function(n){return!t(n)})},zt.prototype.slice=function(t,n){
t=Ge(t);var r=this;return r.__filtered__&&(t>0||0>n)?new zt(r):(0>t?r=r.takeRight(-t):t&&(r=r.drop(t)),n!==T&&(n=Ge(n),r=0>n?r.dropRight(-n):r.take(n-t)),r)},zt.prototype.takeRightWhile=function(t){return this.reverse().takeWhile(t).reverse()},zt.prototype.toArray=function(){return this.take(4294967295)},sn(zt.prototype,function(t,n){var r=/^(?:filter|find|map|reject)|While$/.test(n),e=/^(?:head|last)$/.test(n),u=At[e?"take"+("last"==n?"Right":""):n],o=e||/^find/.test(n);u&&(At.prototype[n]=function(){
function n(t){return t=u.apply(At,s([t],f)),e&&h?t[0]:t}var i=this.__wrapped__,f=e?[1]:arguments,c=i instanceof zt,a=f[0],l=c||ai(i);l&&r&&typeof a=="function"&&1!=a.length&&(c=l=false);var h=this.__chain__,p=!!this.__actions__.length,a=o&&!h,c=c&&!p;return!o&&l?(i=c?i:new zt(this),i=t.apply(i,f),i.__actions__.push({func:ge,args:[n],thisArg:T}),new kt(i,h)):a&&c?t.apply(this,f):(i=this.thru(n),a?e?i.value()[0]:i.value():i)})}),u("pop push shift sort splice unshift".split(" "),function(t){var n=yu[t],r=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",e=/^(?:pop|shift)$/.test(t);
At.prototype[t]=function(){var t=arguments;if(e&&!this.__chain__){var u=this.value();return n.apply(ai(u)?u:[],t)}return this[r](function(r){return n.apply(ai(r)?r:[],t)})}}),sn(zt.prototype,function(t,n){var r=At[n];if(r){var e=r.name+"";(fo[e]||(fo[e]=[])).push({name:n,func:r})}}),fo[jr(T,2).name]=[{name:"wrapper",func:T}],zt.prototype.clone=function(){var t=new zt(this.__wrapped__);return t.__actions__=cr(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=cr(this.__iteratees__),
t.__takeCount__=this.__takeCount__,t.__views__=cr(this.__views__),t},zt.prototype.reverse=function(){if(this.__filtered__){var t=new zt(this);t.__dir__=-1,t.__filtered__=true}else t=this.clone(),t.__dir__*=-1;return t},zt.prototype.value=function(){var t,n=this.__wrapped__.value(),r=this.__dir__,e=ai(n),u=0>r,o=e?n.length:0;t=o;for(var i=this.__views__,f=0,c=-1,a=i.length;++c<a;){var l=i[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":t-=s;break;case"take":t=Ku(t,f+s);break;case"takeRight":
f=Vu(f,t-s)}}if(t={start:f,end:t},i=t.start,f=t.end,t=f-i,u=u?f:i-1,i=this.__iteratees__,f=i.length,c=0,a=Ku(t,this.__takeCount__),!e||200>o||o==t&&a==t)return Hn(n,this.__actions__);e=[];t:for(;t--&&a>c;){for(u+=r,o=-1,l=n[u];++o<f;){var h=i[o],s=h.type,h=(0,h.iteratee)(l);if(2==s)l=h;else if(!h){if(1==s)continue t;break t}}e[c++]=l}return e},At.prototype.at=qo,At.prototype.chain=function(){return ve(this)},At.prototype.commit=function(){return new kt(this.value(),this.__chain__)},At.prototype.next=function(){
this.__values__===T&&(this.__values__=Ve(this.value()));var t=this.__index__>=this.__values__.length,n=t?T:this.__values__[this.__index__++];return{done:t,value:n}},At.prototype.plant=function(t){for(var n,r=this;r instanceof Ot;){var e=ie(r);e.__index__=0,e.__values__=T,n?u.__wrapped__=e:n=e;var u=e,r=r.__wrapped__}return u.__wrapped__=t,n},At.prototype.reverse=function(){var t=this.__wrapped__;return t instanceof zt?(this.__actions__.length&&(t=new zt(this)),t=t.reverse(),t.__actions__.push({func:ge,
args:[he],thisArg:T}),new kt(t,this.__chain__)):this.thru(he)},At.prototype.toJSON=At.prototype.valueOf=At.prototype.value=function(){return Hn(this.__wrapped__,this.__actions__)},Cu&&(At.prototype[Cu]=de),At}var T,q=1/0,V=NaN,K=/\b__p\+='';/g,G=/\b(__p\+=)''\+/g,J=/(__e\(.*?\)|\b__t\))\+'';/g,Y=/&(?:amp|lt|gt|quot|#39|#96);/g,H=/[&<>"'`]/g,Q=RegExp(Y.source),X=RegExp(H.source),tt=/<%-([\s\S]+?)%>/g,nt=/<%([\s\S]+?)%>/g,rt=/<%=([\s\S]+?)%>/g,et=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ut=/^\w*$/,ot=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,it=/[\\^$.*+?()[\]{}|]/g,ft=RegExp(it.source),ct=/^\s+|\s+$/g,at=/^\s+/,lt=/\s+$/,st=/[a-zA-Z0-9]+/g,ht=/\\(\\)?/g,pt=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,_t=/\w*$/,vt=/^0x/i,gt=/^[-+]0x[0-9a-f]+$/i,dt=/^0b[01]+$/i,yt=/^\[object .+?Constructor\]$/,bt=/^0o[0-7]+$/i,xt=/^(?:0|[1-9]\d*)$/,jt=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,wt=/($^)/,mt=/['\n\r\u2028\u2029\\]/g,At="[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?)*",Ot="(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])"+At,kt="(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]?|[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",Et=RegExp("['\u2019]","g"),It=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),St=RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|"+kt+At,"g"),Rt=RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d+",Ot].join("|"),"g"),Wt=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0\\ufe0e\\ufe0f]"),Bt=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Lt="Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise Reflect RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),Mt={};
Mt["[object Float32Array]"]=Mt["[object Float64Array]"]=Mt["[object Int8Array]"]=Mt["[object Int16Array]"]=Mt["[object Int32Array]"]=Mt["[object Uint8Array]"]=Mt["[object Uint8ClampedArray]"]=Mt["[object Uint16Array]"]=Mt["[object Uint32Array]"]=true,Mt["[object Arguments]"]=Mt["[object Array]"]=Mt["[object ArrayBuffer]"]=Mt["[object Boolean]"]=Mt["[object DataView]"]=Mt["[object Date]"]=Mt["[object Error]"]=Mt["[object Function]"]=Mt["[object Map]"]=Mt["[object Number]"]=Mt["[object Object]"]=Mt["[object RegExp]"]=Mt["[object Set]"]=Mt["[object String]"]=Mt["[object WeakMap]"]=false;
var Ct={};Ct["[object Arguments]"]=Ct["[object Array]"]=Ct["[object ArrayBuffer]"]=Ct["[object DataView]"]=Ct["[object Boolean]"]=Ct["[object Date]"]=Ct["[object Float32Array]"]=Ct["[object Float64Array]"]=Ct["[object Int8Array]"]=Ct["[object Int16Array]"]=Ct["[object Int32Array]"]=Ct["[object Map]"]=Ct["[object Number]"]=Ct["[object Object]"]=Ct["[object RegExp]"]=Ct["[object Set]"]=Ct["[object String]"]=Ct["[object Symbol]"]=Ct["[object Uint8Array]"]=Ct["[object Uint8ClampedArray]"]=Ct["[object Uint16Array]"]=Ct["[object Uint32Array]"]=true,
Ct["[object Error]"]=Ct["[object Function]"]=Ct["[object WeakMap]"]=false;var zt={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O",
"\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss"},Ut={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},Dt={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Ft={"function":true,object:true},$t={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"
},Nt=parseFloat,Pt=parseInt,Zt=Ft[typeof exports]&&exports&&!exports.nodeType?exports:T,Tt=Ft[typeof module]&&module&&!module.nodeType?module:T,qt=Tt&&Tt.exports===Zt?Zt:T,Vt=R(Ft[typeof self]&&self),Kt=R(Ft[typeof window]&&window),Gt=R(Ft[typeof this]&&this),Jt=R(Zt&&Tt&&typeof global=="object"&&global)||Kt!==(Gt&&Gt.window)&&Kt||Vt||Gt||Function("return this")(),Yt=Z();(Kt||Vt||{})._=Yt,typeof define=="function"&&typeof define.amd=="object"&&define.amd? define(function(){return Yt}):Zt&&Tt?(qt&&((Tt.exports=Yt)._=Yt),
Zt._=Yt):Jt._=Yt}).call(this);
/* Riot v2.4.1, @license MIT */
!function(e,t){"use strict";function n(e,t,n){var r={};return r[e.key]=t,e.pos&&(r[e.pos]=n),r}function r(e,t){for(var n,r=t.length,o=e.length;r>o;)n=t[--r],t.splice(r,1),n.unmount()}function o(e,t){Object.keys(e.tags).forEach(function(n){var r=e.tags[n];R(r)?g(r,function(e){T(e,n,t)}):T(r,n,t)})}function i(e,t,n){var r,o=e._root;for(e._virts=[];o;)r=o.nextSibling,n?t.insertBefore(o,n._root):t.appendChild(o),e._virts.push(o),o=r}function a(e,t,n,r){for(var o,i=e._root,a=0;r>a;a++)o=i.nextSibling,t.insertBefore(i,n._root),i=o}function u(e,t,u){x(e,"each");var f,s=typeof _(e,"no-reorder")!==te||x(e,"no-reorder"),l=O(e),p=W[l]||{tmpl:m(e)},d=ie.test(l),g=e.parentNode,h=document.createTextNode(""),v=C(e),y="option"===l.toLowerCase(),b=[],w=[],N="VIRTUAL"==e.tagName;u=le.loopKeys(u),g.insertBefore(h,e),t.one("before-mount",function(){e.parentNode.removeChild(e),g.stub&&(g=t.root)}).on("update",function(){var m=le(u.val,t),x=document.createDocumentFragment();R(m)||(f=m||!1,m=f?Object.keys(m).map(function(e){return n(u,e,m[e])}):[]);for(var _=0,C=m.length;C>_;_++){var L=m[_],T=s&&typeof L==ne&&!f,E=w.indexOf(L),M=~E&&T?E:_,O=b[M];L=!f&&u.key?n(u,L,_):L,!T&&!O||T&&!~E||!O?(O=new c(p,{parent:t,isLoop:!0,hasImpl:!!W[l],root:d?g:e.cloneNode(),item:L},e.innerHTML),O.mount(),N&&(O._root=O.root.firstChild),_!=b.length&&b[_]?(N?i(O,g,b[_]):g.insertBefore(O.root,b[_].root),w.splice(_,0,L)):N?i(O,x):x.appendChild(O.root),b.splice(_,0,O),M=_):O.update(L,!0),M!==_&&T&&b[_]&&(N?a(O,g,b[_],e.childNodes.length):g.insertBefore(O.root,b[_].root),u.pos&&(O[u.pos]=_),b.splice(_,0,b.splice(M,1)[0]),w.splice(_,0,w.splice(M,1)[0]),!v&&O.tags&&o(O,_)),O._item=L,S(O,"_parent",t)}if(r(m,b),y){if(g.appendChild(x),se&&!g.multiple)for(var A=0;A<g.length;A++)if(g[A].__riot1374){g.selectedIndex=A,delete g[A].__riot1374;break}}else g.insertBefore(x,h);v&&(t.tags[l]=b),w=m.slice()})}function f(e,t,n,r){k(e,function(e){if(1==e.nodeType){if(e.isLoop=e.isLoop||e.parentNode&&e.parentNode.isLoop||_(e,"each")?1:0,n){var o=C(e);o&&!e.isLoop&&n.push(E(o,{root:e,parent:t},e.innerHTML,t))}e.isLoop&&!r||G(e,t,[])}})}function s(e,t,n){function r(e,t,r){le.hasExpr(t)&&n.push(A({dom:e,expr:t},r))}k(e,function(e){var n,o=e.nodeType;return 3==o&&"STYLE"!=e.parentNode.tagName&&r(e,e.nodeValue),1==o?(n=_(e,"each"))?(u(e,t,n),!1):(g(e.attributes,function(t){var n=t.name,o=n.split("__")[1];return r(e,t.value,{attr:o||n,bool:o}),o?(x(e,n),!1):void 0}),C(e)?!1:void 0):void 0})}function c(e,n,r){function o(){var e=_&&y?p:v||p;g(E.attributes,function(t){var n=t.value;m[w(t.name)]=le.hasExpr(n)?le(n,e):n}),g(Object.keys(k),function(t){m[w(t)]=le(k[t],e)})}function i(e){for(var t in C)typeof p[t]!==re&&$(p,t)&&(p[t]=e[t])}function a(){p.parent&&y&&g(Object.keys(p.parent),function(e){var t=!ae.test(e)&&j(F,e);(typeof p[e]===re||t)&&(t||F.push(e),p[e]=p.parent[e])})}function u(e){p.update(e,!0)}function c(e){if(g(T,function(t){t[e?"mount":"unmount"]()}),v){var t=e?"on":"off";y?v[t]("unmount",p.unmount):v[t]("update",u)[t]("unmount",p.unmount)}}var l,p=z.observable(this),m=K(n.opts)||{},v=n.parent,y=n.isLoop,_=n.hasImpl,C=I(n.item),L=[],T=[],E=n.root,O=E.tagName.toLowerCase(),k={},F=[];e.name&&E._tag&&E._tag.unmount(!0),this.isMounted=!1,E.isLoop=y,E._tag=this,S(this,"_riot_id",++Z),A(this,{parent:v,root:E,opts:m},C),S(this,"tags",{}),g(E.attributes,function(e){var t=e.value;le.hasExpr(t)&&(k[e.name]=t)}),l=pe(e.tmpl,r),S(this,"update",function(e,t){return e=I(e),a(),e&&b(C)&&(i(e),C=e),A(p,e),o(),p.trigger("update",e),d(L,p),t&&p.parent?p.parent.one("updated",function(){p.trigger("updated")}):ge(function(){p.trigger("updated")}),this}),S(this,"mixin",function(){return g(arguments,function(e){var t;e=typeof e===te?z.mixin(e):e,h(e)?(t=new e,e=e.prototype):t=e,g(Object.getOwnPropertyNames(e),function(e){"init"!=e&&(p[e]=h(t[e])?t[e].bind(p):t[e])}),t.init&&t.init.bind(p)()}),this}),S(this,"mount",function(){o();var t=z.mixin(X);if(t)for(var n in t)t.hasOwnProperty(n)&&p.mixin(t[n]);if(e.fn&&e.fn.call(p,m),s(l,p,L),c(!0),e.attrs&&H(e.attrs,function(e,t){N(E,e,t)}),(e.attrs||_)&&s(p.root,p,L),p.parent&&!y||p.update(C),p.trigger("before-mount"),y&&!_)E=l.firstChild;else{for(;l.firstChild;)E.appendChild(l.firstChild);E.stub&&(E=v.root)}S(p,"root",E),y&&f(p.root,p.parent,null,!0),!p.parent||p.parent.isMounted?(p.isMounted=!0,p.trigger("mount")):p.parent.one("mount",function(){P(p.root)||(p.parent.isMounted=p.isMounted=!0,p.trigger("mount"))})}),S(this,"unmount",function(e){var n,r=E,o=r.parentNode,i=Q.indexOf(p);if(p.trigger("before-unmount"),~i&&Q.splice(i,1),o){if(v)n=M(v),R(n.tags[O])?g(n.tags[O],function(e,t){e._riot_id==p._riot_id&&n.tags[O].splice(t,1)}):n.tags[O]=t;else for(;r.firstChild;)r.removeChild(r.firstChild);e?(x(o,ee),x(o,J)):o.removeChild(r)}this._virts&&g(this._virts,function(e){e.parentNode&&e.parentNode.removeChild(e)}),p.trigger("unmount"),c(),p.off("*"),p.isMounted=!1,delete E._tag}),f(l,this,T)}function l(t,n,r,o){r[t]=function(t){var i,a=o._parent,u=o._item;if(!u)for(;a&&!u;)u=a._item,a=a._parent;t=t||e.event,$(t,"currentTarget")&&(t.currentTarget=r),$(t,"target")&&(t.target=t.srcElement),$(t,"which")&&(t.which=t.charCode||t.keyCode),t.item=u,n.call(o,t)===!0||/radio|check/.test(r.type)||(t.preventDefault&&t.preventDefault(),t.returnValue=!1),t.preventUpdate||(i=u?M(a):o,i.update())}}function p(e,t,n){e&&(e.insertBefore(n,t),e.removeChild(t))}function d(e,t){g(e,function(e,n){var r=e.dom,o=e.attr,i=le(e.expr,t),a=e.dom.parentNode;if(e.bool?i=!!i:null==i&&(i=""),e.value!==i){if(e.value=i,!o)return i+="",void(a&&("TEXTAREA"===a.tagName?(a.value=i,fe||(r.nodeValue=i)):r.nodeValue=i));if("value"===o)return void(r.value=i);if(x(r,o),h(i))l(o,i,r,t);else if("if"==o){var u=e.stub,f=function(){p(u.parentNode,u,r)},s=function(){p(r.parentNode,r,u)};i?u&&(f(),r.inStub=!1,P(r)||k(r,function(e){e._tag&&!e._tag.isMounted&&(e._tag.isMounted=!!e._tag.trigger("mount"))})):(u=e.stub=u||document.createTextNode(""),r.parentNode?s():(t.parent||t).one("updated",s),r.inStub=!0)}else"show"===o?r.style.display=i?"":"none":"hide"===o?r.style.display=i?"none":"":e.bool?(r[o]=i,i&&N(r,o,o),se&&"selected"===o&&"OPTION"===r.tagName&&(r.__riot1374=i)):(0===i||i&&typeof i!==ne)&&(U(o,Y)&&o!=J&&(o=o.slice(Y.length)),N(r,o,i))}})}function g(e,t){for(var n,r=e?e.length:0,o=0;r>o;o++)n=e[o],null!=n&&t(n,o)===!1&&o--;return e}function h(e){return typeof e===oe||!1}function m(e){if(e.outerHTML)return e.outerHTML;var t=F("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}function v(e,t){if(typeof e.innerHTML!=re)e.innerHTML=t;else{var n=(new DOMParser).parseFromString(t,"application/xml");e.appendChild(e.ownerDocument.importNode(n.documentElement,!0))}}function y(e){return~ue.indexOf(e)}function b(e){return e&&typeof e===ne}function x(e,t){e.removeAttribute(t)}function w(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})}function _(e,t){return e.getAttribute(t)}function N(e,t,n){e.setAttribute(t,n)}function C(e){return e.tagName&&W[_(e,ee)||_(e,J)||e.tagName.toLowerCase()]}function L(e,t,n){var r=n.tags[t];r?(R(r)||r!==e&&(n.tags[t]=[r]),j(n.tags[t],e)||n.tags[t].push(e)):n.tags[t]=e}function T(e,t,n){var r,o=e.parent;o&&(r=o.tags[t],R(r)?r.splice(n,0,r.splice(r.indexOf(e),1)[0]):L(e,t,o))}function E(e,t,n,r){var o=new c(e,t,n),i=O(t.root),a=M(r);return o.parent=a,o._parent=r,L(o,i,a),a!==r&&L(o,i,r),t.root.innerHTML="",o}function M(e){for(var t=e;!C(t.root)&&t.parent;)t=t.parent;return t}function S(e,t,n,r){return Object.defineProperty(e,t,A({value:n,enumerable:!1,writable:!1,configurable:!0},r)),e}function O(e){var t=C(e),n=_(e,"name"),r=n&&!le.hasExpr(n)?n:t?t.name:e.tagName.toLowerCase();return r}function A(e){for(var t,n=arguments,r=1;r<n.length;++r)if(t=n[r])for(var o in t)$(e,o)&&(e[o]=t[o]);return e}function j(e,t){return~e.indexOf(t)}function R(e){return Array.isArray(e)||e instanceof Array}function $(e,t){var n=Object.getOwnPropertyDescriptor(e,t);return typeof e[t]===re||n&&n.writable}function I(e){if(!(e instanceof c||e&&typeof e.trigger==oe))return e;var t={};for(var n in e)ae.test(n)||(t[n]=e[n]);return t}function k(e,t){if(e){if(t(e)===!1)return;for(e=e.firstChild;e;)k(e,t),e=e.nextSibling}}function H(e,t){for(var n,r=/([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;n=r.exec(e);)t(n[1].toLowerCase(),n[2]||n[3]||n[4])}function P(e){for(;e;){if(e.inStub)return!0;e=e.parentNode}return!1}function F(e,t){return t?document.createElementNS("http://www.w3.org/2000/svg","svg"):document.createElement(e)}function B(e,t){return(t||document).querySelectorAll(e)}function D(e,t){return(t||document).querySelector(e)}function K(e){function t(){}return t.prototype=e,new t}function q(e){return _(e,"id")||_(e,"name")}function G(e,t,n){var r,o=q(e),i=function(i){j(n,o)||(r=R(i),i?(!r||r&&!j(i,e))&&(r?i.push(e):t[o]=[i,e]):t[o]=e)};o&&(le.hasExpr(o)?t.one("mount",function(){o=q(e),i(t[o])}):i(t[o]))}function U(e,t){return e.slice(0,t.length)===t}function V(e,t,n){var r=W[t],o=e._innerHTML=e._innerHTML||e.innerHTML;return e.innerHTML="",r&&e&&(r=new c(r,{root:e,opts:n},o)),r&&r.mount&&(r.mount(),j(Q,r)||Q.push(r)),r}var z={version:"v2.4.1",settings:{}},Z=0,Q=[],W={},X="__global_mixin",Y="riot-",J=Y+"tag",ee="data-is",te="string",ne="object",re="undefined",oe="function",ie=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,ae=/^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,ue=["altGlyph","animate","animateColor","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","filter","font","foreignObject","g","glyph","glyphRef","image","line","linearGradient","marker","mask","missing-glyph","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tref","tspan","use"],fe=0|(e&&e.document||{}).documentMode,se=e&&!!e.InstallTrigger;z.observable=function(e){function t(e,t){for(var n,r,o=e.split(" "),i=o.length,a=0;i>a;a++)n=o[a],r=n.indexOf("."),n&&t(~r?n.substring(0,r):n,a,~r?n.slice(r+1):null)}e=e||{};var n={},r=Array.prototype.slice;return Object.defineProperties(e,{on:{value:function(r,o){return"function"!=typeof o?e:(t(r,function(e,t,r){(n[e]=n[e]||[]).push(o),o.typed=t>0,o.ns=r}),e)},enumerable:!1,writable:!1,configurable:!1},off:{value:function(r,o){return"*"!=r||o?t(r,function(e,t,r){if(o||r)for(var i,a=n[e],u=0;i=a&&a[u];++u)(i==o||r&&i.ns==r)&&a.splice(u--,1);else delete n[e]}):n={},e},enumerable:!1,writable:!1,configurable:!1},one:{value:function(t,n){function r(){e.off(t,r),n.apply(e,arguments)}return e.on(t,r)},enumerable:!1,writable:!1,configurable:!1},trigger:{value:function(o){for(var i,a=arguments.length-1,u=new Array(a),f=0;a>f;f++)u[f]=arguments[f+1];return t(o,function(t,o,a){i=r.call(n[t]||[],0);for(var f,s=0;f=i[s];++s)f.busy||(f.busy=1,a&&f.ns!=a||f.apply(e,f.typed?[t].concat(u):u),i[s]!==f&&s--,f.busy=0);n["*"]&&"*"!=t&&e.trigger.apply(e,["*",t].concat(u))}),e},enumerable:!1,writable:!1,configurable:!1}}),e},function(t){function n(e){return e.split(/[\/?#]/)}function r(e,t){var n=new RegExp("^"+t[C](/\*/g,"([^/?#]+?)")[C](/\.\./,".*")+"$"),r=e.match(n);return r?r.slice(1):void 0}function o(e,t){var n;return function(){clearTimeout(n),n=setTimeout(e,t)}}function i(e){g=o(l,1),S[_](L,g),S[_](T,g),O[_]($,p),e&&l(!0)}function a(){this.$=[],t.observable(this),k.on("stop",this.s.bind(this)),k.on("emit",this.e.bind(this))}function u(e){return e[C](/^\/|\/$/,"")}function f(e){return"string"==typeof e}function s(e){return(e||j.href)[C](b,"")}function c(e){return"#"==h[0]?(e||j.href||"").split(h)[1]||"":(j?s(e):e||"")[C](h,"")}function l(e){var t=0==F;if(!(F>=M)&&(F++,P.push(function(){var t=c();(e||t!=m)&&(k[E]("emit",t),m=t)}),t)){for(;P.length;)P[0](),P.shift();F=0}}function p(e){if(!(1!=e.which||e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){for(var t=e.target;t&&"A"!=t.nodeName;)t=t.parentNode;!t||"A"!=t.nodeName||t[N]("download")||!t[N]("href")||t.target&&"_self"!=t.target||-1==t.href.indexOf(j.href.match(b)[0])||(t.href==j.href||t.href.split("#")[0]!=j.href.split("#")[0]&&("#"==h||0===s(t.href).indexOf(h))&&d(c(t.href),t.title||O.title))&&e.preventDefault()}}function d(e,t,n){return A?(e=h+u(e),t=t||O.title,n?A.replaceState(null,t,e):A.pushState(null,t,e),O.title=t,H=!1,l(),H):k[E]("emit",c(e))}var g,h,m,v,y,b=/^.+?\/\/+[^\/]+/,x="EventListener",w="remove"+x,_="add"+x,N="hasAttribute",C="replace",L="popstate",T="hashchange",E="trigger",M=3,S="undefined"!=typeof e&&e,O="undefined"!=typeof document&&document,A=S&&history,j=S&&(A.location||S.location),R=a.prototype,$=O&&O.ontouchstart?"touchstart":"click",I=!1,k=t.observable(),H=!1,P=[],F=0;R.m=function(e,t,n){!f(e)||t&&!f(t)?t?this.r(e,t):this.r("@",e):d(e,t,n||!1)},R.s=function(){this.off("*"),this.$=[]},R.e=function(e){this.$.concat("@").some(function(t){var n=("@"==t?v:y)(u(e),u(t));return"undefined"!=typeof n?(this[E].apply(null,[t].concat(n)),H=!0):void 0},this)},R.r=function(e,t){"@"!=e&&(e="/"+u(e),this.$.push(e)),this.on(e,t)};var B=new a,D=B.m.bind(B);D.create=function(){var e=new a,t=e.m.bind(e);return t.stop=e.s.bind(e),t},D.base=function(e){h=e||"#",m=c()},D.exec=function(){l(!0)},D.parser=function(e,t){e||t||(v=n,y=r),e&&(v=e),t&&(y=t)},D.query=function(){var e={},t=j.href||m;return t[C](/[?&](.+?)=([^&]*)/g,function(t,n,r){e[n]=r}),e},D.stop=function(){I&&(S&&(S[w](L,g),S[w](T,g),O[w]($,p)),k[E]("stop"),I=!1)},D.start=function(e){I||(S&&("complete"==document.readyState?i(e):S[_]("load",function(){setTimeout(function(){i(e)},1)})),I=!0)},D.base(),D.parser(),t.route=D}(z);var ce=function(e){function t(e){return e}function n(e,t){return t||(t=v),new RegExp(e.source.replace(/{/g,t[2]).replace(/}/g,t[3]),e.global?s:"")}function r(e){if(e===g)return h;var t=e.split(" ");if(2!==t.length||/[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(e))throw new Error('Unsupported brackets "'+e+'"');return t=t.concat(e.replace(/(?=[[\]()*+?.^$|])/g,"\\").split(" ")),t[4]=n(t[1].length>1?/{[\S\s]*?}/:h[4],t),t[5]=n(e.length>3?/\\({|})/g:h[5],t),t[6]=n(h[6],t),t[7]=RegExp("\\\\("+t[3]+")|([[({])|("+t[3]+")|"+p,s),t[8]=e,t}function o(e){return e instanceof RegExp?u(e):v[e]}function i(e){(e||(e=g))!==v[8]&&(v=r(e),u=e===g?t:n,v[9]=u(h[9])),m=e}function a(e){var t;e=e||{},t=e.brackets,Object.defineProperty(e,"brackets",{set:i,get:function(){return m},enumerable:!0}),f=e,i(t)}var u,f,s="g",c=/\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,l=/"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,p=l.source+"|"+/(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source+"|"+/\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,d={"(":RegExp("([()])|"+p,s),"[":RegExp("([[\\]])|"+p,s),"{":RegExp("([{}])|"+p,s)},g="{ }",h=["{","}","{","}",/{[^}]*}/,/\\([{}])/g,/\\({)|{/g,RegExp("\\\\(})|([[({])|(})|"+p,s),g,/^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,/(^|[^\\]){=[\S\s]*?}/],m=e,v=[];return o.split=function(e,t,n){function r(e){t||a?s.push(e&&e.replace(n[5],"$1")):s.push(e)}function o(e,t,n){var r,o=d[t];for(o.lastIndex=n,n=1;(r=o.exec(e))&&(!r[1]||(r[1]===t?++n:--n)););return n?e.length:o.lastIndex}n||(n=v);var i,a,u,f,s=[],c=n[6];for(a=u=c.lastIndex=0;i=c.exec(e);){if(f=i.index,a){if(i[2]){c.lastIndex=o(e,i[2],c.lastIndex);continue}if(!i[3])continue}i[1]||(r(e.slice(u,f)),u=c.lastIndex,c=n[6+(a^=1)],c.lastIndex=u)}return e&&u<e.length&&r(e.slice(u)),s},o.hasExpr=function(e){return v[4].test(e)},o.loopKeys=function(e){var t=e.match(v[9]);return t?{key:t[1],pos:t[2],val:v[0]+t[3].trim()+v[1]}:{val:e.trim()}},o.array=function(e){return e?r(e):v},Object.defineProperty(o,"settings",{set:a,get:function(){return f}}),o.settings="undefined"!=typeof z&&z.settings||{},o.set=i,o.R_STRINGS=l,o.R_MLCOMMS=c,o.S_QBLOCKS=p,o}(),le=function(){function t(e,t){return e?(u[e]||(u[e]=r(e))).call(t,n):e}function n(e,n){t.errorHandler&&(e.riotData={tagName:n&&n.root&&n.root.tagName,_riot_id:n&&n._riot_id},t.errorHandler(e))}function r(e){var t=o(e);return"try{return "!==t.slice(0,11)&&(t="return "+t),new Function("E",t+";")}function o(e){var t,n=[],r=ce.split(e.replace(l,'"'),1);if(r.length>2||r[0]){var o,a,u=[];for(o=a=0;o<r.length;++o)t=r[o],t&&(t=1&o?i(t,1,n):'"'+t.replace(/\\/g,"\\\\").replace(/\r\n?|\n/g,"\\n").replace(/"/g,'\\"')+'"')&&(u[a++]=t);t=2>a?u[0]:"["+u.join(",")+'].join("")'}else t=i(r[1],0,n);return n[0]&&(t=t.replace(p,function(e,t){return n[t].replace(/\r/g,"\\r").replace(/\n/g,"\\n")})),t}function i(e,t,n){function r(t,n){var r,o=1,i=d[t];for(i.lastIndex=n.lastIndex;r=i.exec(e);)if(r[0]===t)++o;else if(!--o)break;n.lastIndex=o?e.length:i.lastIndex}if(e=e.replace(c,function(e,t){return e.length>2&&!t?f+(n.push(e)-1)+"~":e}).replace(/\s+/g," ").trim().replace(/\ ?([[\({},?\.:])\ ?/g,"$1")){for(var o,i=[],u=0;e&&(o=e.match(s))&&!o.index;){var l,p,g=/,|([[{(])|$/g;for(e=RegExp.rightContext,l=o[2]?n[o[2]].slice(1,-1).trim().replace(/\s+/g," "):o[1];p=(o=g.exec(e))[1];)r(p,g);p=e.slice(0,o.index),e=RegExp.rightContext,i[u++]=a(p,1,l)}e=u?u>1?"["+i.join(",")+'].join(" ").trim()':i[0]:a(e,t)}return e}function a(e,t,n){var r;return e=e.replace(h,function(e,t,n,o,i){return n&&(o=r?0:o+e.length,"this"!==n&&"global"!==n&&"window"!==n?(e=t+'("'+n+g+n,o&&(r="."===(i=i[o])||"("===i||"["===i)):o&&(r=!m.test(i.slice(o)))),e}),r&&(e="try{return "+e+"}catch(e){E(e,this)}"),n?e=(r?"function(){"+e+"}.call(this)":"("+e+")")+'?"'+n+'":""':t&&(e="function(v){"+(r?e.replace("return ","v="):"v=("+e+")")+';return v||v===0?v:""}.call(this)'),e}var u={};t.haveRaw=ce.hasRaw,t.hasExpr=ce.hasExpr,t.loopKeys=ce.loopKeys,t.errorHandler=null;var f="⁗",s=/^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,c=RegExp(ce.S_QBLOCKS,"g"),l=/\u2057/g,p=/\u2057(\d+)~/g,d={"(":/[()]/g,"[":/[[\]]/g,"{":/[{}]/g},g='"in this?this:'+("object"!=typeof e?"global":"window")+").",h=/[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,m=/^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;return t.parse=function(e){return e},t.version=ce.version="v2.4.0",t}(),pe=function e(){function e(e,r){var o=e&&e.match(/^\s*<([-\w]+)/),i=o&&o[1].toLowerCase(),a=F("div",y(i));return e=n(e,r),f.test(i)?a=t(a,e,i):v(a,e),a.stub=!0,a}function t(e,t,n){var r="o"===n[0],o=r?"select>":"table>";if(e.innerHTML="<"+o+t.trim()+"</"+o,o=e.firstChild,r)o.selectedIndex=-1;else{var i=u[n];i&&1===o.childElementCount&&(o=D(i,o))}return o}function n(e,t){if(!r.test(e))return e;var n={};return t=t&&t.replace(i,function(e,t,r){return n[t]=n[t]||r,""}).trim(),e.replace(a,function(e,t,r){return n[t]||r||""}).replace(o,function(e,n){return t||n||""})}var r=/<yield\b/i,o=/<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/gi,i=/<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/gi,a=/<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/gi,u={tr:"tbody",th:"tr",td:"tr",col:"colgroup"},f=fe&&10>fe?ie:/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;return e}(),de=function(t){if(!e)return{add:function(){},inject:function(){}};var n=function(){var e=F("style");N(e,"type","text/css");var t=D("style[type=riot]");return t?(t.id&&(e.id=t.id),t.parentNode.replaceChild(e,t)):document.getElementsByTagName("head")[0].appendChild(e),e}(),r=n.styleSheet,o="";return Object.defineProperty(t,"styleNode",{value:n,writable:!0}),{add:function(e){o+=e},inject:function(){o&&(r?r.cssText+=o:n.innerHTML+=o,o="")}}}(z),ge=function(e){var t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame;if(!t||/iP(ad|hone|od).*OS 6/.test(e.navigator.userAgent)){var n=0;t=function(e){var t=Date.now(),r=Math.max(16-(t-n),0);setTimeout(function(){e(n=t+r)},r)}}return t}(e||{});z.util={brackets:ce,tmpl:le},z.mixin=function(){var e={},t=e[X]={},n=0;return function(r,o,i){if(b(r))return void z.mixin("__unnamed_"+n++,r,!0);var a=i?t:e;if(!o){if(typeof a[r]===re)throw new Error("Unregistered mixin: "+r);return a[r]}h(o)?(A(o.prototype,a[r]||{}),a[r]=o):a[r]=A(a[r]||{},o)}}(),z.tag=function(e,t,n,r,o){return h(r)&&(o=r,/^[\w\-]+\s?=/.test(n)?(r=n,n=""):r=""),n&&(h(n)?o=n:de.add(n)),e=e.toLowerCase(),W[e]={name:e,tmpl:t,attrs:r,fn:o},e},z.tag2=function(e,t,n,r,o){return n&&de.add(n),W[e]={name:e,tmpl:t,attrs:r,fn:o},e},z.mount=function(e,t,n){function r(e){var t="";return g(e,function(e){/[^-\w]/.test(e)||(e=e.trim().toLowerCase(),t+=",["+ee+'="'+e+'"],['+J+'="'+e+'"]')}),t}function o(){var e=Object.keys(W);return e+r(e)}function i(e){if(e.tagName){var r=_(e,ee)||_(e,J);t&&r!==t&&(r=t,N(e,ee,t),N(e,J,t));var o=V(e,r||e.tagName.toLowerCase(),n);o&&f.push(o)}else e.length&&g(e,i)}var a,u,f=[];if(de.inject(),b(t)&&(n=t,t=0),typeof e===te?("*"===e?e=u=o():e+=r(e.split(/, */)),a=e?B(e):[]):a=e,"*"===t){if(t=u||o(),a.tagName)a=B(t,a);else{var s=[];g(a,function(e){s.push(B(t,e))}),a=s}t=0}return i(a),f},z.update=function(){return g(Q,function(e){e.update()})},z.vdom=Q,z.Tag=c,typeof exports===ne?module.exports=z:typeof define===oe&&typeof define.amd!==re?define(function(){return z}):e.riot=z}("undefined"!=typeof window?window:void 0);

!function(e,r,i){function n(e){var r=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,i=/([^\s,]+)/g,n=e.toString().replace(r,""),t=n.slice(n.indexOf("(")+1,n.indexOf(")")).match(i);return null===t&&(t=[]),t}function t(e){var r={};if(r.localServices={},e.length>0){if(r.source=e[0],r.target=e[0],s.isPlainObject(e[0])){var i=e[0];r.target=i.target,r.source=i.source,r.instance=i.instance}if(e.length>1){var n=s.isString(e[0])||s.isArray(e[0]);n?(s.isArray(e[0])?r.source=e[0]:r.source=s.isString(e[0])?[e[0]]:e[0],s.isFunction(e[1])&&(r.target=e[1]),s.isFunction(e[2])&&(r.target=e[2])):(s.isFunction(e[1])&&(r.callReady=e[1]),s.isPlainObject(e[1])&&(r.localServices=e[1]))}3===e.length&&(s.isPlainObject(e[1])&&(r.localServices=e[1]),s.isFunction(e[2])&&(r.callReady=e[2]))}return r.target=r.target||function(){},r.source=r.source?r.source:r.target,r.callReady=r.callReady||function(){},r}var c,s=e?require("lodash"):i._,a=e?require("promise"):i.Promise,c=e?r:{},u=e?require("log4js").getLogger("realm"):void 0,o={fatal:function(e){return u?u.fatal(e):console.error(e)}};c.__wires_services_cached__=c.__wires_services_cached__||{};var _=function(e){return e&&s.isFunction(e.then)&&s.isFunction(e["catch"])},l=function(e,r){return new a(function(i,n){var t=[],c=s.isPlainObject(e),a=-1,u=function(){if(a++,!(a<s.size(e)))return i(t);var o,l;if(c?(o=s.keys(e)[a],l=e[o]):(o=a,l=e[a]),_(l))l.then(function(e){t.push(e),u()})["catch"](n);else{var f=r.call(r,l,o);_(f)?f.then(function(e){t.push(e),u()})["catch"](n):(t.push(f),u())}};u()})},f={each:l,service:function(){this.register.apply(this,arguments)},start:function(e){return f.require(e,function(e){e&&s.isFunction(e.main)&&e.main()})},module:function(e,r,i){i=i||{},i.cache=!0,this.register.apply(this,[e,r,i,!0])},register:function(e,r,i,n){var t=null,a=r;s.isArray(r)&&(t=r,a=i),c.__wires_services__=c.__wires_services__||{},c.__wires_services__[e]={name:e,target:a,args:t,cache:n}},isRegistered:function(e){return c.__wires_services__&&void 0!==c.__wires_services__[e]},requirePackage:function(e){var r={},i=this;return l(c.__wires_services__,function(n,t){var c=0===t.indexOf(e)?e:!1;return c[1]?i.require([t],function(e){r[t]=e}):void 0}).then(function(){return r})},storeModule:function(e,r){c.__wires_services_cached__[e]=r},require:function(){var e=t(arguments),r=this,i=e.localServices,u=s.isArray(e.source)?e.source:n(e.source),_=e.target,f=(e.callReady,e.instance),v=c.__wires_services__,h=new a(function(n,t){var a=[],h=s.merge(i,v);for(var g in u){var d=(u[g],u[g]);if(!h[d])return o.fatal("Error while injecting variable '"+d+"' into function \n"+e.source.toString()),t({status:500,message:"Service with name '"+d+"' was not found "});a.push(h[d])}return l(a,function(e){if(e.cache&&void 0!==c.__wires_services_cached__[e.name])return c.__wires_services_cached__[e.name];var n=e.target,t=e.args;if(s.isFunction(n)){var a=[];return a=t?[t,i,n]:[n,i],r.require.apply(r,a).then(function(i){return e.cache&&r.storeModule(e.name,i),i})}return n||e}).then(function(e){return _.apply(f||e,e)}).then(n)["catch"](t)});return h}};i.realm=f}("undefined"!=typeof module&&module.exports,"undefined"!=typeof module&&module.exports?global:this,this);
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();!function(e){var t=(e.isNode,e.realm);t.module("realm.router.BridgeRequest",[],function(){var e,t=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"connect",value:function(e,t,r){for(var n=[],i=0;i<r.length;i++)n[i]=r[i];return new Promise(function(r,i){var o=new window.XMLHttpRequest;o.open("POST","/_realm_/bridge/",!0),o.setRequestHeader("Content-Type","application/json");var a={bridge:e,method:t,args:n};o.onreadystatechange=function(){if(4==o.readyState){var e=this.response;if(200===this.status)return r(JSON.parse(e));if(e.indexOf("html")>-1){var t=document.createElement("div");t.style="overflow-y:scroll;position:fixed; top:0; left:0;width:100%;height:100%",t.innerHTML=e,document.body.appendChild(t)}return i({status:this.status,response:e})}},o.send(a?JSON.stringify(a):"{}")})}}]),e}();return e=t}),t.module("realm.router.test.MyFirstBridge",["realm.router.BridgeRequest"],function(e){var t;return t={getSomething:function(){return e.connect("realm.router.test.MyFirstBridge","getSomething",arguments)}}})}(function(e){var t="undefined"!=typeof exports;return{isNode:t,realm:t?require("realm-js"):window.realm}}());
(function(global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
      typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (factory((global.frzr = global.frzr || {})));
}(this, function(exports) {
   'use strict';

   function text(str) {
      return document.createTextNode(str);
   }

   var customElements;
   var customAttributes;

   function el(tagName) {
      if (customElements) {
         var customElement = customElements[tagName];

         if (customElement) {
            return customElement.apply(this, arguments);
         }
      }

      var element = document.createElement(tagName);

      for (var i = 1; i < arguments.length; i++) {
         var arg = arguments[i];

         if (arg == null) {
            continue;
         } else if (mount(element, arg)) {
            continue;
         } else if (typeof arg === 'object') {
            for (var attr in arg) {
               if (customAttributes) {
                  var customAttribute = customAttributes[attr];
                  if (customAttribute) {
                     customAttribute(element, arg[attr]);
                     continue;
                  }
               }
               var value = arg[attr];
               if (attr === 'style' || (element[attr] == null && typeof value != 'function')) {
                  element.setAttribute(attr, value);
               } else {
                  element[attr] = value;
               }
            }
         }
      }

      return element;
   }

   function registerElement(tagName, handler) {
      customElements || (customElements = {});
      customElements[tagName] = handler;
   }

   function registerAttribute(attr, handler) {
      customAttributes || (customAttributes = {});
      customAttributes[attr] = handler;
   }

   function unregisterElement(tagName) {
      if (customElements && customElements[tagName]) {
         delete customElements[tagName];
      }
   }

   function unregisterAttribute(attr) {
      if (customAttributes && customAttributes[attr]) {
         delete customAttributes[attr];
      }
   }

   function svg(tagName) {
      var element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

      for (var i = 1; i < arguments.length; i++) {
         var arg = arguments[i];

         if (arg == null) {
            continue;
         } else if (mount(element, arg)) {
            continue;
         } else if (typeof arg === 'object') {
            for (var attr in arg) {
               element.setAttribute(attr, arg[attr]);
            }
         }
      }

      return element;
   }

   function list(View, key, initData, skipRender) {
      return new List(View, key, initData, skipRender);
   }

   function List(View, key, initData, skipRender) {
      this.View = View;
      this.views = [];
      this.initData = initData;
      this.skipRender = skipRender;

      if (key) {
         this.key = key;
         this.lookup = {};
      }
   }

   List.prototype.update = function(data, cb) {
      var View = this.View;
      var views = this.views;
      var parent = this.parent;
      var key = this.key;
      var initData = this.initData;
      var skipRender = this.skipRender;

      if (cb) {
         var added = [];
         var updated = [];
         var removed = [];
      }

      if (key) {
         var lookup = this.lookup;
         var newLookup = {};

         views.length = data.length;

         for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var id = item[key];
            var view = lookup[id];

            if (!view) {
               view = new View(initData, item, i);
               cb && added.push(view);
            } else {
               cb && updated.push(view);
            }

            views[i] = newLookup[id] = view;

            view.update && view.update(item, i);
         }

         if (cb) {
            for (var id in lookup) {
               if (!newLookup[id]) {
                  removed.push(lookup[id]);
                  !skipRender && parent && unmount(parent, lookup[id]);
               }
            }
         }

         this.lookup = newLookup;
      } else {
         if (cb) {
            for (var i = data.length; i < views.length; i++) {
               var view = views[i];

               !skipRender && parent && unmount(parent, view);
               removed.push(view);
            }
         }

         views.length = data.length;

         for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var view = views[i];

            if (!view) {
               view = new View(initData, item, i);
               cb && added.push(view);
            } else {
               cb && updated.push(view);
            }

            view.update && view.update(item, i);
            views[i] = view;
         }
      }

      !skipRender && parent && setChildren(parent, views);
      cb && cb(added, updated, removed);
   }

   function mount(parent, child, before) {
      var parentEl = parent.el || parent;
      var childEl = child.el || child;
      var childWasMounted = childEl.parentNode != null;

      if (childWasMounted) {
         child.remounting && child.remounting();
      } else {
         child.mounting && child.mounting();
      }

      if (childEl instanceof Node) {
         if (before) {
            var beforeEl = before;
            parentEl.insertBefore(childEl, beforeEl);
         } else {
            parentEl.appendChild(childEl);
         }

         if (childWasMounted) {
            child.remounted && child.remounted();
         } else {
            child.mounted && child.mounted();
         }
         if (childEl !== child) {
            childEl.view = child;
            child.parent = parent;
         }

      } else if (typeof childEl === 'string' || typeof childEl === 'number') {
         mount(parentEl, document.createTextNode(childEl), before);

      } else if (childEl instanceof Array) {
         for (var i = 0; i < childEl.length; i++) {
            mount(parentEl, childEl[i], before);
         }

      } else if (child instanceof List) {
         child.parent = parent;
         setChildren(parentEl, child.views);

      } else {
         return false;
      }
      return true;
   }

   var mountBefore = mount;

   function replace(parent, child, replace) {
      var parentEl = parent.el || parent;
      var childEl = child.el || child;
      var replaceEl = replace.el || replace;
      var childWasMounted = childEl.parentNode != null;

      replace.unmounting && replace.unmounting();

      if (childWasMounted) {
         child.remounting && child.remounting();
      } else {
         child.mounting && child.mounting();
      }

      parentEl.replaceChild(childEl, replaceEl);

      replace.unmounted && replace.unmounted();

      if (replaceEl !== replace) {
         replace.parent = null;
      }

      if (childWasMounted) {
         child.remounted && child.remounted();
      } else {
         child.mounted && child.mounted();
      }
      if (childEl !== child) {
         childEl.view = child;
         child.parent = parent;
      }
   }

   function unmount(parent, child) {
      var parentEl = parent.el || parent;
      var childEl = child.el || child;

      child.unmounting && child.unmounting();

      parentEl.removeChild(childEl);

      child.unmounted && child.unmounted();

      if (childEl !== child) {
         child.parent = null;
      }
   }

   function setChildren(parent, children) {
      var parentEl = parent.el || parent;
      var traverse = parentEl.firstChild;

      for (var i = 0; i < children.length; i++) {
         var child = children[i];
         var childEl = child.el || child;

         if (traverse === childEl) {
            traverse = traverse.nextSibling;
            continue;
         }

         mount(parent, child, traverse);
      }

      while (traverse) {
         var next = traverse.nextSibling;

         unmount(parent, traverse.view || traverse);

         traverse = next;
      }
   }

   exports.text = text;
   exports.el = el;
   exports.registerElement = registerElement;
   exports.registerAttribute = registerAttribute;
   exports.unregisterElement = unregisterElement;
   exports.unregisterAttribute = unregisterAttribute;
   exports.svg = svg;
   exports.list = list;
   exports.List = List;
   exports.mount = mount;
   exports.mountBefore = mountBefore;
   exports.replace = replace;
   exports.unmount = unmount;
   exports.setChildren = setChildren;

}));

/*!
 * jQuery Upload File Plugin
 * version: 3.1.10
 * @requires jQuery v1.5 or later & form plugin
 * Copyright (c) 2013 Ravishanker Kusuma
 * http://hayageek.com/
 */
(function(b) {
   if (b.fn.ajaxForm == undefined) {
      b.getScript(("https:" == document.location.protocol ? "https://" : "http://") +
         "malsup.github.io/jquery.form.js")
   }
   var a = {};
   a.fileapi = b("<input type='file'/>").get(0).files !== undefined;
   a.formdata = window.FormData !== undefined;
   b.fn.uploadFile = function(f) {
      var p = b.extend({
         url: "",
         method: "POST",
         enctype: "multipart/form-data",
         returnType: null,
         allowDuplicates: true,
         duplicateStrict: false,
         allowedTypes: "*",
         acceptFiles: "*",
         fileName: "file",
         formData: {},
         dynamicFormData: function() {
            return {}
         },
         maxFileSize: -1,
         maxFileCount: -1,
         multiple: true,
         dragDrop: true,
         autoSubmit: true,
         showCancel: true,
         showAbort: true,
         showDone: true,
         showDelete: false,
         showError: true,
         showStatusAfterSuccess: true,
         showStatusAfterError: true,
         showFileCounter: true,
         fileCounterStyle: "). ",
         showProgress: false,
         nestedForms: true,
         showDownload: false,
         onLoad: function(s) {},
         onSelect: function(s) {
            return true
         },
         onSubmit: function(s, x) {},
         onSuccess: function(y, x, z, s) {},
         onError: function(z, s, y, x) {},
         onCancel: function(x, s) {},
         downloadCallback: false,
         deleteCallback: false,
         afterUploadAll: false,
         abortButtonClass: "ajax-file-upload-abort",
         cancelButtonClass: "ajax-file-upload-cancel",
         dragDropContainerClass: "ajax-upload-dragdrop",
         dragDropHoverClass: "state-hover",
         errorClass: "ajax-file-upload-error",
         uploadButtonClass: "ajax-file-upload",
         dragDropStr: "<span><b>Drag &amp; Drop Files</b></span>",
         abortStr: "Abort",
         cancelStr: "Cancel",
         deletelStr: "Delete",
         doneStr: "Done",
         multiDragErrorStr: "Multiple File Drag &amp; Drop is not allowed.",
         extErrorStr: "is not allowed. Allowed extensions: ",
         duplicateErrorStr: "is not allowed. File already exists.",
         sizeErrorStr: "is not allowed. Allowed Max size: ",
         uploadErrorStr: "Upload is not allowed",
         maxFileCountErrorStr: " is not allowed. Maximum allowed files are:",
         downloadStr: "Download",
         customErrorKeyStr: "jquery-upload-file-error",
         showQueueDiv: false,
         statusBarWidth: 500,
         dragdropWidth: 500,
         showPreview: false,
         previewHeight: "auto",
         previewWidth: "100%",
         uploadFolder: "uploads/"
      }, f);
      this.fileCounter = 1;
      this.selectedFiles = 0;
      this.fCounter = 0;
      this.sCounter = 0;
      this.tCounter = 0;
      var e = "ajax-file-upload-" + (new Date().getTime());
      this.formGroup = e;
      this.hide();
      this.errorLog = b("<div></div>");
      this.after(this.errorLog);
      this.responses = [];
      this.existingFileNames = [];
      if (!a.formdata) {
         p.dragDrop = false
      }
      if (!a.formdata) {
         p.multiple = false
      }
      var n = this;
      var q = b("<div>" + b(this).html() + "</div>");
      b(q).addClass(p.uploadButtonClass);
      (function l() {
         if (b.fn.ajaxForm) {
            if (p.dragDrop) {
               var s = b('<div class="' + p.dragDropContainerClass + '" style="vertical-align:top;"></div>').width(
                  p.dragdropWidth);
               b(n).before(s);
               b(s).append(q);
               b(s).append(b(p.dragDropStr));
               c(n, p, s)
            } else {
               b(n).before(q)
            }
            p.onLoad.call(this, n);
            k(n, e, p, q)
         } else {
            window.setTimeout(l, 10)
         }
      })();
      this.startUpload = function() {
         b("." + this.formGroup).each(function(x, s) {
            if (b(this).is("form")) {
               b(this).submit()
            }
         })
      };
      this.getFileCount = function() {
         return n.selectedFiles
      };
      this.stopUpload = function() {
         b("." + p.abortButtonClass).each(function(x, s) {
            if (b(this).hasClass(n.formGroup)) {
               b(this).click()
            }
         })
      };
      this.cancelAll = function() {
         b("." + p.cancelButtonClass).each(function(x, s) {
            if (b(this).hasClass(n.formGroup)) {
               b(this).click()
            }
         })
      };
      this.update = function(s) {
         p = b.extend(p, s)
      };
      this.createProgress = function(y) {
         var x = new j(this, p);
         x.progressDiv.show();
         x.progressbar.width("100%");
         var s = "";
         if (p.showFileCounter) {
            s = n.fileCounter + p.fileCounterStyle + y
         } else {
            s = y
         }
         x.filename.html(s);
         n.fileCounter++;
         n.selectedFiles++;
         if (p.showPreview) {
            x.preview.attr("src", p.uploadFolder + y);
            x.preview.show()
         }
         if (p.showDownload) {
            x.download.show();
            x.download.click(function() {
               if (p.downloadCallback) {
                  p.downloadCallback.call(n, [y])
               }
            })
         }
         x.del.show();
         x.del.click(function() {
            x.statusbar.hide().remove();
            var z = [y];
            if (p.deleteCallback) {
               p.deleteCallback.call(this, z, x)
            }
            n.selectedFiles -= 1;
            d(p, n)
         })
      };
      this.getResponses = function() {
         return this.responses
      };
      var m = false;

      function u() {
         if (p.afterUploadAll && !m) {
            m = true;
            (function s() {
               if (n.sCounter != 0 && (n.sCounter + n.fCounter == n.tCounter)) {
                  p.afterUploadAll(n);
                  m = false
               } else {
                  window.setTimeout(s, 100)
               }
            })()
         }
      }

      function c(z, x, y) {
         y.on("dragenter", function(s) {
            s.stopPropagation();
            s.preventDefault();
            b(this).addClass(x.dragDropHoverClass)
         });
         y.on("dragover", function(A) {
            A.stopPropagation();
            A.preventDefault();
            var s = b(this);
            if (s.hasClass(x.dragDropContainerClass) && !s.hasClass(x.dragDropHoverClass)) {
               s.addClass(x.dragDropHoverClass)
            }
         });
         y.on("drop", function(A) {
            A.preventDefault();
            b(this).removeClass(x.dragDropHoverClass);
            z.errorLog.html("");
            var s = A.originalEvent.dataTransfer.files;
            if (!x.multiple && s.length > 1) {
               if (x.showError) {
                  b("<div class='" + x.errorClass + "'>" + x.multiDragErrorStr + "</div>").appendTo(z.errorLog)
               }
               return
            }
            if (x.onSelect(s) == false) {
               return
            }
            r(x, z, s)
         });
         y.on("dragleave", function(s) {
            b(this).removeClass(x.dragDropHoverClass)
         });
         b(document).on("dragenter", function(s) {
            s.stopPropagation();
            s.preventDefault()
         });
         b(document).on("dragover", function(A) {
            A.stopPropagation();
            A.preventDefault();
            var s = b(this);
            if (!s.hasClass(x.dragDropContainerClass)) {
               s.removeClass(x.dragDropHoverClass)
            }
         });
         b(document).on("drop", function(s) {
            s.stopPropagation();
            s.preventDefault();
            b(this).removeClass(x.dragDropHoverClass)
         })
      }

      function t(s) {
         var y = "";
         var x = s / 1024;
         if (parseInt(x) > 1024) {
            var z = x / 1024;
            y = z.toFixed(2) + " MB"
         } else {
            y = x.toFixed(2) + " KB"
         }
         return y
      }

      function i(A) {
         var B = [];
         if (jQuery.type(A) == "string") {
            B = A.split("&")
         } else {
            B = b.param(A).split("&")
         }
         var x = B.length;
         var s = [];
         var z, y;
         for (z = 0; z < x; z++) {
            B[z] = B[z].replace(/\+/g, " ");
            y = B[z].split("=");
            s.push([decodeURIComponent(y[0]), decodeURIComponent(y[1])])
         }
         return s
      }

      function r(K, E, x) {
         for (var F = 0; F < x.length; F++) {
            if (!g(E, K, x[F].name)) {
               if (K.showError) {
                  b("<div class='" + K.errorClass + "'><b>" + x[F].name + "</b> " + K.extErrorStr + K.allowedTypes +
                     "</div>").appendTo(E.errorLog)
               }
               continue
            }
            if (!K.allowDuplicates && o(E, x[F].name)) {
               if (K.showError) {
                  b("<div class='" + K.errorClass + "'><b>" + x[F].name + "</b> " + K.duplicateErrorStr +
                     "</div>").appendTo(E.errorLog)
               }
               continue
            }
            if (K.maxFileSize != -1 && x[F].size > K.maxFileSize) {
               if (K.showError) {
                  b("<div class='" + K.errorClass + "'><b>" + x[F].name + "</b> " + K.sizeErrorStr + t(K.maxFileSize) +
                     "</div>").appendTo(E.errorLog)
               }
               continue
            }
            if (K.maxFileCount != -1 && E.selectedFiles >= K.maxFileCount) {
               if (K.showError) {
                  b("<div class='" + K.errorClass + "'><b>" + x[F].name + "</b> " + K.maxFileCountErrorStr + K.maxFileCount +
                     "</div>").appendTo(E.errorLog)
               }
               continue
            }
            E.selectedFiles++;
            E.existingFileNames.push(x[F].name);
            var G = K;
            var z = new FormData();
            var D = K.fileName.replace("[]", "");
            z.append(D, x[F]);
            var B = K.formData;
            if (B) {
               var I = i(B);
               for (var C = 0; C < I.length; C++) {
                  if (I[C]) {
                     z.append(I[C][0], I[C][1])
                  }
               }
            }
            G.fileData = z;
            var H = new j(E, K);
            var J = "";
            if (K.showFileCounter) {
               J = E.fileCounter + K.fileCounterStyle + x[F].name
            } else {
               J = x[F].name
            }
            H.filename.html(J);
            var y = b("<form style='display:block; position:absolute;left: 150px;' class='" + E.formGroup +
               "' method='" + K.method + "' action='" + K.url + "' enctype='" + K.enctype + "'></form>");
            y.appendTo("body");
            var A = [];
            A.push(x[F].name);
            w(y, G, H, A, E, x[F]);
            E.fileCounter++
         }
      }

      function g(z, y, B) {
         var A = y.allowedTypes.toLowerCase().split(",");
         var x = B.split(".").pop().toLowerCase();
         if (y.allowedTypes != "*" && jQuery.inArray(x, A) < 0) {
            return false
         }
         return true
      }

      function o(A, y) {
         var z = false;
         if (A.existingFileNames.length) {
            for (var s = 0; s < A.existingFileNames.length; s++) {
               if (A.existingFileNames[s] == y || p.duplicateStrict && A.existingFileNames[s].toLowerCase() == y.toLowerCase()) {
                  z = true
               }
            }
         }
         return z
      }

      function h(y, z) {
         if (y.existingFileNames.length) {
            for (var s = 0; s < z.length; s++) {
               var A = y.existingFileNames.indexOf(z[s]);
               if (A != -1) {
                  y.existingFileNames.splice(A, 1)
               }
            }
         }
      }

      function v(x, y) {
         if (x) {
            y.show();
            var s = new FileReader();
            s.onload = function(z) {
               y.attr("src", z.target.result)
            };
            s.readAsDataURL(x)
         }
      }

      function d(x, z) {
         if (x.showFileCounter) {
            var y = b(".ajax-file-upload-filename").length;
            z.fileCounter = y + 1;
            b(".ajax-file-upload-filename").each(function(D, B) {
               var s = b(this).html().split(x.fileCounterStyle);
               var A = parseInt(s[0]) - 1;
               var C = y + x.fileCounterStyle + s[1];
               b(this).html(C);
               y--
            })
         }
      }

      function k(D, C, z, x) {
         var E = "ajax-upload-id-" + (new Date().getTime());
         var B = b("<form method='" + z.method + "' action='" + z.url + "' enctype='" + z.enctype + "'></form>");
         var y = "<input type='file' id='" + E + "' name='" + z.fileName + "' accept='" + z.acceptFiles + "'/>";
         if (z.multiple) {
            if (z.fileName.indexOf("[]") != z.fileName.length - 2) {
               z.fileName += "[]"
            }
            y = "<input type='file' id='" + E + "' name='" + z.fileName + "' accept='" + z.acceptFiles +
               "' multiple/>"
         }
         var A = b(y).appendTo(B);
         A.change(function() {
            D.errorLog.html("");
            var L = z.allowedTypes.toLowerCase().split(",");
            var H = [];
            if (this.files) {
               for (I = 0; I < this.files.length; I++) {
                  H.push(this.files[I].name)
               }
               if (z.onSelect(this.files) == false) {
                  return
               }
            } else {
               var J = b(this).val();
               var G = [];
               H.push(J);
               if (!g(D, z, J)) {
                  if (z.showError) {
                     b("<div class='" + z.errorClass + "'><b>" + J + "</b> " + z.extErrorStr + z.allowedTypes +
                        "</div>").appendTo(D.errorLog)
                  }
                  return
               }
               G.push({
                  name: J,
                  size: "NA"
               });
               if (z.onSelect(G) == false) {
                  return
               }
            }
            d(z, D);
            x.unbind("click");
            B.hide();
            k(D, C, z, x);
            B.addClass(C);
            if (a.fileapi && a.formdata) {
               B.removeClass(C);
               var K = this.files;
               r(z, D, K)
            } else {
               var F = "";
               for (var I = 0; I < H.length; I++) {
                  if (z.showFileCounter) {
                     F += D.fileCounter + z.fileCounterStyle + H[I] + "<br>"
                  } else {
                     F += H[I] + "<br>"
                  }
                  D.fileCounter++
               }
               if (z.maxFileCount != -1 && (D.selectedFiles + H.length) > z.maxFileCount) {
                  if (z.showError) {
                     b("<div class='" + z.errorClass + "'><b>" + F + "</b> " + z.maxFileCountErrorStr + z.maxFileCount +
                        "</div>").appendTo(D.errorLog)
                  }
                  return
               }
               D.selectedFiles += H.length;
               var s = new j(D, z);
               s.filename.html(F);
               w(B, z, s, H, D, null)
            }
         });
         if (z.nestedForms) {
            B.css({
               margin: 0,
               padding: 0
            });
            x.css({
               position: "relative",
               overflow: "hidden",
               cursor: "default"
            });
            A.css({
               position: "absolute",
               cursor: "pointer",
               top: "0px",
               width: "100%",
               height: "100%",
               left: "0px",
               "z-index": "100",
               opacity: "0.0",
               filter: "alpha(opacity=0)",
               "-ms-filter": "alpha(opacity=0)",
               "-khtml-opacity": "0.0",
               "-moz-opacity": "0.0"
            });
            B.appendTo(x)
         } else {
            B.appendTo(b("body"));
            B.css({
               margin: 0,
               padding: 0,
               display: "block",
               position: "absolute",
               left: "-250px"
            });
            if (navigator.appVersion.indexOf("MSIE ") != -1) {
               x.attr("for", E)
            } else {
               x.click(function() {
                  A.click()
               })
            }
         }
      }

      function j(y, x) {
         this.statusbar = b("<div class='ajax-file-upload-statusbar'></div>").width(x.statusBarWidth);
         this.preview = b("<img class='ajax-file-upload-preview' />").width(x.previewWidth).height(x.previewHeight)
            .appendTo(this.statusbar).hide();
         this.filename = b("<div class='ajax-file-upload-filename'></div>").appendTo(this.statusbar);
         this.progressDiv = b("<div class='ajax-file-upload-progress'>").appendTo(this.statusbar).hide();
         this.progressbar = b("<div class='ajax-file-upload-bar " + y.formGroup + "'></div>").appendTo(this.progressDiv);
         this.abort = b("<div class='ajax-file-upload-red " + x.abortButtonClass + " " + y.formGroup + "'>" + x.abortStr +
            "</div>").appendTo(this.statusbar).hide();
         this.cancel = b("<div class='ajax-file-upload-red " + x.cancelButtonClass + " " + y.formGroup + "'>" + x
            .cancelStr + "</div>").appendTo(this.statusbar).hide();
         this.done = b("<div class='ajax-file-upload-green'>" + x.doneStr + "</div>").appendTo(this.statusbar).hide();
         this.download = b("<div class='ajax-file-upload-green'>" + x.downloadStr + "</div>").appendTo(this.statusbar)
            .hide();
         this.del = b("<div class='ajax-file-upload-red'>" + x.deletelStr + "</div>").appendTo(this.statusbar).hide();
         if (x.showQueueDiv) {
            b("#" + x.showQueueDiv).append(this.statusbar)
         } else {
            y.errorLog.after(this.statusbar)
         }
         return this
      }

      function w(D, C, x, z, E, B) {
         var A = null;
         var y = {
            cache: false,
            contentType: false,
            processData: false,
            forceSync: false,
            type: C.method,
            data: C.formData,
            formData: C.fileData,
            dataType: C.returnType,
            beforeSubmit: function(J, G, I) {
               if (C.onSubmit.call(this, z) != false) {
                  var F = C.dynamicFormData();
                  if (F) {
                     var s = i(F);
                     if (s) {
                        for (var H = 0; H < s.length; H++) {
                           if (s[H]) {
                              if (C.fileData != undefined) {
                                 I.formData.append(s[H][0], s[H][1])
                              } else {
                                 I.data[s[H][0]] = s[H][1]
                              }
                           }
                        }
                     }
                  }
                  E.tCounter += z.length;
                  u();
                  return true
               }
               x.statusbar.append("<div class='" + C.errorClass + "'>" + C.uploadErrorStr + "</div>");
               x.cancel.show();
               D.remove();
               x.cancel.click(function() {
                  h(E, z);
                  x.statusbar.remove();
                  C.onCancel.call(E, z, x);
                  E.selectedFiles -= z.length;
                  d(C, E)
               });
               return false
            },
            beforeSend: function(F, s) {
               x.progressDiv.show();
               x.cancel.hide();
               x.done.hide();
               if (C.showAbort) {
                  x.abort.show();
                  x.abort.click(function() {
                     h(E, z);
                     F.abort();
                     E.selectedFiles -= z.length
                  })
               }
               if (!a.formdata) {
                  x.progressbar.width("5%")
               } else {
                  x.progressbar.width("1%")
               }
            },
            uploadProgress: function(I, s, H, G) {
               if (G > 98) {
                  G = 98
               }
               var F = G + "%";
               if (G > 1) {
                  x.progressbar.width(F)
               }
               if (C.showProgress) {
                  x.progressbar.html(F);
                  x.progressbar.css("text-align", "center")
               }
            },
            success: function(F, s, H) {
               if (C.returnType == "json" && b.type(F) == "object" && F.hasOwnProperty(C.customErrorKeyStr)) {
                  x.abort.hide();
                  var G = F[C.customErrorKeyStr];
                  C.onError.call(this, z, 200, G, x);
                  if (C.showStatusAfterError) {
                     x.progressDiv.hide();
                     x.statusbar.append("<span class='" + C.errorClass + "'>ERROR: " + G + "</span>")
                  } else {
                     x.statusbar.hide();
                     x.statusbar.remove()
                  }
                  E.selectedFiles -= z.length;
                  D.remove();
                  E.fCounter += z.length;
                  return
               }
               E.responses.push(F);
               x.progressbar.width("100%");
               if (C.showProgress) {
                  x.progressbar.html("100%");
                  x.progressbar.css("text-align", "center")
               }
               x.abort.hide();
               C.onSuccess.call(this, z, F, H, x);
               if (C.showStatusAfterSuccess) {
                  if (C.showDone) {
                     x.done.show();
                     x.done.click(function() {
                        x.statusbar.hide("slow");
                        x.statusbar.remove()
                     })
                  } else {
                     x.done.hide()
                  }
                  if (C.showDelete) {
                     x.del.show();
                     x.del.click(function() {
                        x.statusbar.hide().remove();
                        if (C.deleteCallback) {
                           C.deleteCallback.call(this, F, x)
                        }
                        E.selectedFiles -= z.length;
                        d(C, E)
                     })
                  } else {
                     x.del.hide()
                  }
               } else {
                  x.statusbar.hide("slow");
                  x.statusbar.remove()
               }
               if (C.showDownload) {
                  x.download.show();
                  x.download.click(function() {
                     if (C.downloadCallback) {
                        C.downloadCallback(F)
                     }
                  })
               }
               D.remove();
               E.sCounter += z.length
            },
            error: function(G, s, F) {
               x.abort.hide();
               if (G.statusText == "abort") {
                  x.statusbar.hide("slow").remove();
                  d(C, E)
               } else {
                  C.onError.call(this, z, s, F, x);
                  if (C.showStatusAfterError) {
                     x.progressDiv.hide();
                     x.statusbar.append("<span class='" + C.errorClass + "'>ERROR: " + F + "</span>")
                  } else {
                     x.statusbar.hide();
                     x.statusbar.remove()
                  }
                  E.selectedFiles -= z.length
               }
               D.remove();
               E.fCounter += z.length
            }
         };
         if (C.showPreview && B != null) {
            if (B.type.toLowerCase().split("/").shift() == "image") {
               v(B, x.preview)
            }
         }
         if (C.autoSubmit) {
            D.ajaxSubmit(y)
         } else {
            if (C.showCancel) {
               x.cancel.show();
               x.cancel.click(function() {
                  h(E, z);
                  D.remove();
                  x.statusbar.remove();
                  C.onCancel.call(E, z, x);
                  E.selectedFiles -= z.length;
                  d(C, E)
               })
            }
            D.ajaxForm(y)
         }
      }
      return this
   }
}(jQuery));
