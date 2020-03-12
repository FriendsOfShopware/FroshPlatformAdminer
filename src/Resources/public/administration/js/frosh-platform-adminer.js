(this.webpackJsonp=this.webpackJsonp||[]).push([["frosh-platform-adminer"],{CkOj:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n("lSNA"),i=n.n(r),a=n("lO2t"),s=n("lYO9");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(n,!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e){var t=function(e){var t;if(a.a.isString(e))try{t=JSON.parse(e)}catch(e){return!1}else{if(!a.a.isObject(e)||a.a.isArray(e))return!1;t=e}return t}(e);if(!t)return null;if(!0===t.parsed||!function(e){return void 0!==e.data||void 0!==e.errors||void 0!==e.links||void 0!==e.meta}(t))return t;var n=function(e){var t={links:null,errors:null,data:null,associations:null,aggregations:null};if(e.errors)return t.errors=e.errors,t;var n=function(e){var t=new Map;if(!e||!e.length)return t;return e.forEach((function(e){var n="".concat(e.type,"-").concat(e.id);t.set(n,e)})),t}(e.included);if(a.a.isArray(e.data))t.data=e.data.map((function(e){var r=l(e,n);return Object(s.f)(r,"associationLinks")&&(t.associations=c({},t.associations,{},r.associationLinks),delete r.associationLinks),r}));else if(a.a.isObject(e.data)){var r=l(e.data,n);Object.prototype.hasOwnProperty.call(r,"associationLinks")&&(t.associations=c({},t.associations,{},r.associationLinks),delete r.associationLinks),t.data=r}else t.data=null;e.meta&&Object.keys(e.meta).length&&(t.meta=d(e.meta));e.links&&Object.keys(e.links).length&&(t.links=e.links);e.aggregations&&Object.keys(e.aggregations).length&&(t.aggregations=e.aggregations);return t}(t);return n.parsed=!0,n}function l(e,t){var n={id:e.id,type:e.type,links:e.links||{},meta:e.meta||{}};e.attributes&&Object.keys(e.attributes).length>0&&(n=c({},n,{},d(e.attributes)));if(e.relationships){var r=function(e,t){var n={},r={};return Object.keys(e).forEach((function(i){var s=e[i];if(s.links&&Object.keys(s.links).length&&(r[i]=s.links.related),s.data){var o=s.data;a.a.isArray(o)?n[i]=o.map((function(e){return p(e,t)})):a.a.isObject(o)?n[i]=p(o,t):n[i]=null}})),{mappedRelations:n,associationLinks:r}}(e.relationships,t);n=c({},n,{},r.mappedRelations,{},{associationLinks:r.associationLinks})}return n}function d(e){var t={};return Object.keys(e).forEach((function(n){var r=e[n],i=n.replace(/-([a-z])/g,(function(e,t){return t.toUpperCase()}));t[i]=r})),t}function p(e,t){var n="".concat(e.type,"-").concat(e.id);return t.has(n)?l(t.get(n),t):e}},SwLI:function(e,t,n){"use strict";n.r(t);var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),s=n.n(a),o=n("CkOj"),c=function(){function e(t,n,r){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/vnd.api+json";i()(this,e),this.httpClient=t,this.loginService=n,this.apiEndpoint=r,this.contentType=a}return s()(e,[{key:"getList",value:function(t){var n=t.page,r=void 0===n?1:n,i=t.limit,a=void 0===i?25:i,s=t.sortBy,o=t.sortDirection,c=void 0===o?"asc":o,u=t.sortings,l=t.queries,d=t.term,p=t.criteria,h=t.aggregations,g=t.associations,f=t.headers,v=t.versionId,m=t.ids,y=this.getBasicHeaders(f),O={page:r,limit:a};return u?O.sort=u:s&&s.length&&(O.sort=("asc"===c.toLowerCase()?"":"-")+s),m&&(O.ids=m.join("|")),d&&(O.term=d),p&&(O.filter=[p.getQuery()]),h&&(O.aggregations=h),g&&(O.associations=g),v&&(y=Object.assign(y,e.getVersionHeader(v))),l&&(O.query=l),O.term&&O.term.length||O.filter&&O.filter.length||O.aggregations||O.sort||O.queries||O.associations?this.httpClient.post("".concat(this.getApiBasePath(null,"search")),O,{headers:y}).then((function(t){return e.handleResponse(t)})):this.httpClient.get(this.getApiBasePath(),{params:O,headers:y}).then((function(t){return e.handleResponse(t)}))}},{key:"getById",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)return Promise.reject(new Error("Missing required argument: id"));var i=n,a=this.getBasicHeaders(r);return this.httpClient.get(this.getApiBasePath(t),{params:i,headers:a}).then((function(t){return e.handleResponse(t)}))}},{key:"updateById",value:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!t)return Promise.reject(new Error("Missing required argument: id"));var a=r,s=this.getBasicHeaders(i);return this.httpClient.patch(this.getApiBasePath(t),n,{params:a,headers:s}).then((function(t){return e.handleResponse(t)}))}},{key:"deleteAssociation",value:function(e,t,n,r){if(!e||!n||!n)return Promise.reject(new Error("Missing required arguments."));var i=this.getBasicHeaders(r);return this.httpClient.delete("".concat(this.getApiBasePath(e),"/").concat(t,"/").concat(n),{headers:i}).then((function(e){return e.status>=200&&e.status<300?Promise.resolve(e):Promise.reject(e)}))}},{key:"create",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=n,a=this.getBasicHeaders(r);return this.httpClient.post(this.getApiBasePath(),t,{params:i,headers:a}).then((function(t){return e.handleResponse(t)}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e)return Promise.reject(new Error("Missing required argument: id"));var r=Object.assign({},t),i=this.getBasicHeaders(n);return this.httpClient.delete(this.getApiBasePath(e),{params:r,headers:i})}},{key:"clone",value:function(t){return t?this.httpClient.post("/_action/clone/".concat(this.apiEndpoint,"/").concat(t),null,{headers:this.getBasicHeaders()}).then((function(t){return e.handleResponse(t)})):Promise.reject(new Error("Missing required argument: id"))}},{key:"versionize",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r="/_action/version/".concat(this.apiEndpoint,"/").concat(e),i=Object.assign({},t),a=this.getBasicHeaders(n);return this.httpClient.post(r,{},{params:i,headers:a})}},{key:"mergeVersion",value:function(t,n,r,i){if(!t)return Promise.reject(new Error("Missing required argument: id"));if(!n)return Promise.reject(new Error("Missing required argument: versionId"));var a=Object.assign({},r),s=Object.assign(e.getVersionHeader(n),this.getBasicHeaders(i)),o="_action/version/merge/".concat(this.apiEndpoint,"/").concat(n);return this.httpClient.post(o,{},{params:a,headers:s})}},{key:"getApiBasePath",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n="";return t&&t.length&&(n+="".concat(t,"/")),e&&e.length>0?"".concat(n).concat(this.apiEndpoint,"/").concat(e):"".concat(n).concat(this.apiEndpoint)}},{key:"getBasicHeaders",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={Accept:this.contentType,Authorization:"Bearer ".concat(this.loginService.getToken()),"Content-Type":"application/json"};return Object.assign({},t,e)}},{key:"apiEndpoint",get:function(){return this.endpoint},set:function(e){this.endpoint=e}},{key:"httpClient",get:function(){return this.client},set:function(e){this.client=e}},{key:"contentType",get:function(){return this.type},set:function(e){this.type=e}}],[{key:"handleResponse",value:function(t){if(null===t.data||void 0===t.data)return t;var n=t.data,r=t.headers;return r&&r["content-type"]&&"application/vnd.api+json"===r["content-type"]&&(n=e.parseJsonApiData(n)),n}},{key:"parseJsonApiData",value:function(e){return Object(o.a)(e)}},{key:"getVersionHeader",value:function(e){return{"sw-version-id":e}}}]),e}();t.default=c},dqKW:function(e,t){e.exports='<sw-page class="swag-bundle-list">\n    <template slot="content">\n        <iframe v-if="apiAdminerUrl" :src="apiAdminerUrl" width="100%" height="99%" frameborder="0"></iframe>\n    </template>\n\n    <template slot="smart-bar-actions">\n        <sw-button variant="primary" v-if="apiAdminerUrl" @click="openNewTab">\n            Open in new Tab\n        </sw-button>\n    </template>\n</sw-page>'},i2bM:function(e,t,n){"use strict";n.r(t);var r=n("SwLI");class i extends r.default{constructor(e,t,n="frosh_adminer"){super(e,t,n)}loginToAdminer(){const e=`${this.getApiBasePath()}/login`;return this.httpClient.get(e,{headers:this.getBasicHeaders()}).then(e=>r.default.handleResponse(e))}}var a=i;const{Application:s}=Shopware;s.addServiceProvider("AdminerService",e=>{const t=s.getContainer("init");return new a(t.httpClient,e.loginService)});var o=n("dqKW"),c=n.n(o);const{Component:u}=Shopware;u.register("frosh-adminer-view",{template:c.a,inject:["AdminerService"],created(){this.createdComponent()},data:()=>({apiAdminerUrl:!1}),methods:{createdComponent(){this.AdminerService.loginToAdminer().then(e=>{this.apiAdminerUrl=e.url})},openNewTab(){window.open(this.apiAdminerUrl)}}});const{Module:l}=Shopware;l.register("frosh-adminer",{type:"plugin",name:"Adminer",description:"frosh-adminer.general.description",color:"#9AA8B5",icon:"default-device-server",favicon:"icon-module-settings.png",routes:{list:{component:"frosh-adminer-view",path:"list"}},navigation:[{label:"frosh-adminer.general.navigationLabel",color:"#9AA8B5",icon:"default-device-server",path:"frosh.adminer.list",position:100}]})},lO2t:function(e,t,n){"use strict";n.d(t,"b",(function(){return P}));var r=n("GoyQ"),i=n.n(r),a=n("YO3V"),s=n.n(a),o=n("E+oP"),c=n.n(o),u=n("wAXd"),l=n.n(u),d=n("Z0cm"),p=n.n(d),h=n("lSCD"),g=n.n(h),f=n("YiAA"),v=n.n(f),m=n("4qC0"),y=n.n(m),O=n("Znm+"),b=n.n(O),j=n("Y+p1"),k=n.n(j),w=n("UB5X"),A=n.n(w);function P(e){return void 0===e}t.a={isObject:i.a,isPlainObject:s.a,isEmpty:c.a,isRegExp:l.a,isArray:p.a,isFunction:g.a,isDate:v.a,isString:y.a,isBoolean:b.a,isEqual:k.a,isNumber:A.a,isUndefined:P}},lYO9:function(e,t,n){"use strict";n.d(t,"g",(function(){return v})),n.d(t,"a",(function(){return m})),n.d(t,"c",(function(){return y})),n.d(t,"h",(function(){return O})),n.d(t,"f",(function(){return b})),n.d(t,"b",(function(){return j})),n.d(t,"e",(function(){return k})),n.d(t,"d",(function(){return w}));var r=n("lSNA"),i=n.n(r),a=n("QkVN"),s=n.n(a),o=n("BkRI"),c=n.n(o),u=n("mwIZ"),l=n.n(u),d=n("D1y2"),p=n.n(d),h=n("lO2t");function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(n,!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}s.a,c.a,l.a,p.a;var v=s.a,m=c.a,y=l.a,O=p.a;function b(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function j(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return JSON.parse(JSON.stringify(e))}function k(e,t){return e===t?{}:h.a.isObject(e)&&h.a.isObject(t)?h.a.isDate(e)||h.a.isDate(t)?e.valueOf()===t.valueOf()?{}:t:Object.keys(t).reduce((function(n,r){if(!b(e,r))return f({},n,i()({},r,t[r]));if(h.a.isArray(t[r])){var a=w(e[r],t[r]);return Object.keys(a).length>0?f({},n,i()({},r,t[r])):n}if(h.a.isObject(t[r])){var s=k(e[r],t[r]);return!h.a.isObject(s)||Object.keys(s).length>0?f({},n,i()({},r,s)):n}return e[r]!==t[r]?f({},n,i()({},r,t[r])):n}),{}):t}function w(e,t){if(e===t)return[];if(!h.a.isArray(e)||!h.a.isArray(t))return t;if(e.length<=0&&t.length<=0)return[];if(e.length!==t.length)return t;if(!h.a.isObject(t[0]))return t.filter((function(t){return!e.includes(t)}));var n=[];return t.forEach((function(r,i){var a=k(e[i],t[i]);Object.keys(a).length>0&&n.push(t[i])})),n}}},[["i2bM","runtime","vendors-node"]]]);