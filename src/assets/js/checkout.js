/**
 * Minified by jsDelivr using Terser v5.17.1.
 * Original file: /npm/payment-checkout-js@0.0.11/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";var request=require("request"),root="https://api.cs-ghana.com",Promise=require("promise"),resources={checkout:require("./resources/checkout")};function Cross_Switch(r,e,o){return this instanceof Cross_Switch?null==o?"url is required":(root=o,this.app_id=r,this.app_key=e,void this.importResources()):new Cross_Switch(r,e,o)}Cross_Switch.prototype={extend:function(r){var e=this;return function(){for(var o=new Array(arguments.length),t=o.length,i=0;i<t;++i)o[i]=arguments[i];var s,n=t>0&&"function"==typeof o.slice(t-1)[0]?o.splice(t-1)[0]:void 0,a=r.method in{get:"",post:"",put:""}?r.method:function(){throw new Error("Method not Allowed! - Resource declaration error")}(),c=[root,r.endpoint].join("");if(r.params){var p=r.params,u=2===o.length?o[1]:o[0];p.filter(((r,e,o)=>{if(-1!==r.indexOf("*")&&!((r=r.replace("*",""))in u))throw new Error("Required Parameters Ommited - "+r)}))}var h=c.match(/{[^}]+}/g);if(h&&(t=h.length)>0){if(!Array.isArray(r.args))throw new Error("Resource declaration error");var l,d;for(i=0;i<t;i++)if(l=h[i].replace(/\W/g,""),-1!=(d=r.args.indexOf(l))){if(!o[d])throw new Error("Resource declaration error");c=c.replace(new RegExp(h[i]),o[d]),o.splice(d,1)}}o[0]&&("post"==a||"put"==a?(u=o[0],o[1]&&(s=o[1]),u.app_id=e.app_id,u.app_key=e.app_key):"get"==a&&(s=o[0]));var f={url:c,json:!0,method:a.toUpperCase(),headers:{Accept:["Bearer "],Authorization:["Bearer ",e.app_id+"|"+e.app_key].join("")}};return u&&(f.body=u),s&&(f.qs=s),new Promise(((r,e)=>{request(f,((o,t,i)=>{o?e(o):i.status?r(i):(o=i,i=null,e(o))}))})).then((r=>n?n(null,r):r)).catch((r=>n?n(r,null):r))}},importResources:function(){var r;for(var e in resources){for(var o in r=function(){},resources[e])r.prototype[o]=this.extend(resources[e][o]);Cross_Switch.prototype[e]=new r}}},module.exports=Cross_Switch;
//# sourceMappingURL=/sm/3e7f7a6c51bc9914bf58d692ed1c6b1734c83a671ed91824a908ba26a335f19c.map