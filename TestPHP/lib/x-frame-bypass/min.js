/*! (c) Andrea Giammarchi - ISC */
!function(E,k,D){"use strict";if(1==E.importNode.length&&!k.get("ungap-li")){var H="extends";try{var e={extends:"li"},t=HTMLLIElement,n=function(){return Reflect.construct(t,[],n)};if(n.prototype=D.create(t.prototype),k.define("ungap-li",n,e),!/is="ungap-li"/.test((new n).outerHTML))throw e}catch(e){!function(){var s="attributeChangedCallback",n="connectedCallback",r="disconnectedCallback",e=Element.prototype,l=D.assign,t=D.create,a=D.defineProperties,o=D.getOwnPropertyDescriptor,u=D.setPrototypeOf,c=k.define,i=k.get,f=k.upgrade,v=k.whenDefined,d=t(null),p=new WeakMap,g={childList:!0,subtree:!0};new MutationObserver(m).observe(E,g),P(Document.prototype,"importNode"),P(Node.prototype,"cloneNode"),a(k,{define:{value:function(e,t,n){if(e=e.toLowerCase(),n&&H in n){d[e]=l({},n,{Class:t});for(var r=n[H]+'[is="'+e+'"]',a=E.querySelectorAll(r),o=0,i=a.length;o<i;o++)O(a[o])}else c.apply(k,arguments)}},get:{value:function(e){return e in d?d[e].Class:i.call(k,e)}},upgrade:{value:function(e){var t=L(e);!t||e instanceof t.Class?f.call(k,e):A(e,t)}},whenDefined:{value:function(e){return e in d?Promise.resolve():v.call(k,e)}}});var h=E.createElement;a(E,{createElement:{value:function(e,t){var n=h.call(E,e);return t&&"is"in t&&(n.setAttribute("is",t.is),k.upgrade(n)),n}}});var b=o(e,"attachShadow").value,y=o(e,"innerHTML");function m(e){for(var t=0,n=e.length;t<n;t++){for(var r=e[t],a=r.addedNodes,o=r.removedNodes,i=0,l=a.length;i<l;i++)O(a[i]);for(i=0,l=o.length;i<l;i++)C(o[i])}}function w(e){for(var t=0,n=e.length;t<n;t++){var r=e[t],a=r.attributeName,o=r.oldValue,i=r.target,l=i.getAttribute(a);s in i&&(o!=l||null!=l)&&i[s](a,o,i.getAttribute(a),null)}}function C(e){if(1===e.nodeType){var t=L(e);t&&e instanceof t.Class&&r in e&&p.get(e)!==r&&(p.set(e,r),Promise.resolve(e).then(N)),T(e,C)}}function L(e){var t=e.getAttribute("is");return t&&(t=t.toLowerCase())in d?d[t]:null}function M(e){e[n]()}function N(e){e[r]()}function A(e,t){var n=t.Class,r=n.observedAttributes||[];if(u(e,n.prototype),r.length){new MutationObserver(w).observe(e,{attributes:!0,attributeFilter:r,attributeOldValue:!0});for(var a=[],o=0,i=r.length;o<i;o++)a.push({attributeName:r[o],oldValue:null,target:e});w(a)}}function O(e){if(1===e.nodeType){var t=L(e);t&&(e instanceof t.Class||A(e,t),n in e&&e.isConnected&&p.get(e)!==n&&(p.set(e,n),Promise.resolve(e).then(M))),T(e,O)}}function T(e,t){for(var n=e.querySelectorAll("[is]"),r=0,a=n.length;r<a;r++)t(n[r])}function P(e,t){var n=e[t],r={};r[t]={value:function(){var e=n.apply(this,arguments);switch(e.nodeType){case 1:case 11:T(e.content||e,O)}return e}},a(e,r)}a(e,{attachShadow:{value:function(){var e=b.apply(this,arguments);return new MutationObserver(m).observe(e,g),e}},innerHTML:{get:y.get,set:function(e){y.set.call(this,e),/\bis=("|')?[a-z0-9_-]+\1/i.test(e)&&T(this.content||this,O)}}})}()}}}(document,customElements,Object);