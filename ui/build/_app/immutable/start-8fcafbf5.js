import{S as Qe,i as et,s as tt,a as nt,e as q,c as at,b as G,g as fe,t as C,d as ue,f as V,h as F,j as rt,o as Le,k as ot,l as st,m as it,n as we,p as T,q as lt,r as ct,u as ft,v as K,w as z,x as Pe,y as H,z as W,A as ie}from"./chunks/index-0196de85.js";import{S as Ze,I as D,g as Ge,f as Je,a as ve,b as le,s as M,i as Ke,c as ce,P as ze,d as ut,e as dt,h as pt}from"./chunks/singletons-6a7112c0.js";import{_ as be}from"./chunks/preload-helper-41c905a7.js";function ht(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function mt(r){return r.split("%25").map(decodeURI).join("%25")}function _t(r){for(const e in r)r[e]=decodeURIComponent(r[e]);return r}const gt=["href","pathname","search","searchParams","toString","toJSON"];function yt(r,e){const n=new URL(r);for(const s of gt){let o=n[s];Object.defineProperty(n,s,{get(){return e(),o},enumerable:!0,configurable:!0})}return wt(n),n}function wt(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const vt="/__data.json";function bt(r){return r.replace(/\/$/,"")+vt}function Et(r){let e=5381;if(typeof r=="string"){let n=r.length;for(;n;)e=e*33^r.charCodeAt(--n)}else if(ArrayBuffer.isView(r)){const n=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let s=n.length;for(;s;)e=e*33^n[--s]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const de=window.fetch;window.fetch=(r,e)=>((r instanceof Request?r.method:e?.method||"GET")!=="GET"&&Q.delete(je(r)),de(r,e));const Q=new Map;function kt(r,e){const n=je(r,e),s=document.querySelector(n);if(s?.textContent){const{body:o,...u}=JSON.parse(s.textContent),a=s.getAttribute("data-ttl");return a&&Q.set(n,{body:o,init:u,ttl:1e3*Number(a)}),Promise.resolve(new Response(o,u))}return de(r,e)}function St(r,e,n){if(Q.size>0){const s=je(r,n),o=Q.get(s);if(o){if(performance.now()<o.ttl&&["default","force-cache","only-if-cached",void 0].includes(n?.cache))return new Response(o.body,o.init);Q.delete(s)}}return de(e,n)}function je(r,e){let s=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;return e?.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(s+=`[data-hash="${Et(e.body)}"]`),s}const Rt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Lt(r){const e=[];return{pattern:r==="/"?/^\/$/:new RegExp(`^${It(r).map(s=>{const o=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(s);if(o)return e.push({name:o[1],matcher:o[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const u=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(s);if(u)return e.push({name:u[1],matcher:u[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!s)return;const a=s.split(/\[(.+?)\](?!\])/);return"/"+a.map((p,m)=>{if(m%2){if(p.startsWith("x+"))return Ee(String.fromCharCode(parseInt(p.slice(2),16)));if(p.startsWith("u+"))return Ee(String.fromCharCode(...p.slice(2).split("-").map(O=>parseInt(O,16))));const y=Rt.exec(p);if(!y)throw new Error(`Invalid param: ${p}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,b,k,N,$]=y;return e.push({name:N,matcher:$,optional:!!b,rest:!!k,chained:k?m===1&&a[0]==="":!1}),k?"(.*?)":b?"([^/]*)?":"([^/]+?)"}return Ee(p)}).join("")}).join("")}/?$`),params:e}}function Ot(r){return!/^\([^)]+\)$/.test(r)}function It(r){return r.slice(1).split("/").filter(Ot)}function At(r,e,n){const s={},o=r.slice(1);let u="";for(let a=0;a<e.length;a+=1){const f=e[a];let p=o[a];if(f.chained&&f.rest&&u&&(p=p?u+"/"+p:u),u="",p===void 0)f.rest&&(s[f.name]="");else{if(f.matcher&&!n[f.matcher](p)){if(f.optional&&f.chained){let m=o.indexOf(void 0,a);if(m===-1){const y=e[a+1];if(y?.rest&&y.chained)u=p;else return}for(;m>=a;)o[m]=o[m-1],m-=1;continue}return}s[f.name]=p}}if(!u)return s}function Ee(r){return r.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Pt(r,e,n,s){const o=new Set(e);return Object.entries(n).map(([f,[p,m,y]])=>{const{pattern:b,params:k}=Lt(f),N={id:f,exec:$=>{const O=b.exec($);if(O)return At(O,k,s)},errors:[1,...y||[]].map($=>r[$]),layouts:[0,...m||[]].map(a),leaf:u(p)};return N.errors.length=N.layouts.length=Math.max(N.errors.length,N.layouts.length),N});function u(f){const p=f<0;return p&&(f=~f),[p,r[f]]}function a(f){return f===void 0?f:[o.has(f),r[f]]}}function jt(r){let e,n,s;var o=r[0][0];function u(a){return{props:{data:a[2],form:a[1]}}}return o&&(e=K(o,u(r))),{c(){e&&z(e.$$.fragment),n=q()},l(a){e&&Pe(e.$$.fragment,a),n=q()},m(a,f){e&&H(e,a,f),G(a,n,f),s=!0},p(a,f){const p={};if(f&4&&(p.data=a[2]),f&2&&(p.form=a[1]),o!==(o=a[0][0])){if(e){fe();const m=e;C(m.$$.fragment,1,0,()=>{W(m,1)}),ue()}o?(e=K(o,u(a)),z(e.$$.fragment),V(e.$$.fragment,1),H(e,n.parentNode,n)):e=null}else o&&e.$set(p)},i(a){s||(e&&V(e.$$.fragment,a),s=!0)},o(a){e&&C(e.$$.fragment,a),s=!1},d(a){a&&F(n),e&&W(e,a)}}}function Nt(r){let e,n,s;var o=r[0][0];function u(a){return{props:{data:a[2],$$slots:{default:[Ut]},$$scope:{ctx:a}}}}return o&&(e=K(o,u(r))),{c(){e&&z(e.$$.fragment),n=q()},l(a){e&&Pe(e.$$.fragment,a),n=q()},m(a,f){e&&H(e,a,f),G(a,n,f),s=!0},p(a,f){const p={};if(f&4&&(p.data=a[2]),f&523&&(p.$$scope={dirty:f,ctx:a}),o!==(o=a[0][0])){if(e){fe();const m=e;C(m.$$.fragment,1,0,()=>{W(m,1)}),ue()}o?(e=K(o,u(a)),z(e.$$.fragment),V(e.$$.fragment,1),H(e,n.parentNode,n)):e=null}else o&&e.$set(p)},i(a){s||(e&&V(e.$$.fragment,a),s=!0)},o(a){e&&C(e.$$.fragment,a),s=!1},d(a){a&&F(n),e&&W(e,a)}}}function Ut(r){let e,n,s;var o=r[0][1];function u(a){return{props:{data:a[3],form:a[1]}}}return o&&(e=K(o,u(r))),{c(){e&&z(e.$$.fragment),n=q()},l(a){e&&Pe(e.$$.fragment,a),n=q()},m(a,f){e&&H(e,a,f),G(a,n,f),s=!0},p(a,f){const p={};if(f&8&&(p.data=a[3]),f&2&&(p.form=a[1]),o!==(o=a[0][1])){if(e){fe();const m=e;C(m.$$.fragment,1,0,()=>{W(m,1)}),ue()}o?(e=K(o,u(a)),z(e.$$.fragment),V(e.$$.fragment,1),H(e,n.parentNode,n)):e=null}else o&&e.$set(p)},i(a){s||(e&&V(e.$$.fragment,a),s=!0)},o(a){e&&C(e.$$.fragment,a),s=!1},d(a){a&&F(n),e&&W(e,a)}}}function He(r){let e,n=r[5]&&We(r);return{c(){e=ot("div"),n&&n.c(),this.h()},l(s){e=st(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var o=it(e);n&&n.l(o),o.forEach(F),this.h()},h(){we(e,"id","svelte-announcer"),we(e,"aria-live","assertive"),we(e,"aria-atomic","true"),T(e,"position","absolute"),T(e,"left","0"),T(e,"top","0"),T(e,"clip","rect(0 0 0 0)"),T(e,"clip-path","inset(50%)"),T(e,"overflow","hidden"),T(e,"white-space","nowrap"),T(e,"width","1px"),T(e,"height","1px")},m(s,o){G(s,e,o),n&&n.m(e,null)},p(s,o){s[5]?n?n.p(s,o):(n=We(s),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(s){s&&F(e),n&&n.d()}}}function We(r){let e;return{c(){e=lt(r[6])},l(n){e=ct(n,r[6])},m(n,s){G(n,e,s)},p(n,s){s&64&&ft(e,n[6])},d(n){n&&F(e)}}}function $t(r){let e,n,s,o,u;const a=[Nt,jt],f=[];function p(y,b){return y[0][1]?0:1}e=p(r),n=f[e]=a[e](r);let m=r[4]&&He(r);return{c(){n.c(),s=nt(),m&&m.c(),o=q()},l(y){n.l(y),s=at(y),m&&m.l(y),o=q()},m(y,b){f[e].m(y,b),G(y,s,b),m&&m.m(y,b),G(y,o,b),u=!0},p(y,[b]){let k=e;e=p(y),e===k?f[e].p(y,b):(fe(),C(f[k],1,1,()=>{f[k]=null}),ue(),n=f[e],n?n.p(y,b):(n=f[e]=a[e](y),n.c()),V(n,1),n.m(s.parentNode,s)),y[4]?m?m.p(y,b):(m=He(y),m.c(),m.m(o.parentNode,o)):m&&(m.d(1),m=null)},i(y){u||(V(n),u=!0)},o(y){C(n),u=!1},d(y){f[e].d(y),y&&F(s),m&&m.d(y),y&&F(o)}}}function Tt(r,e,n){let{stores:s}=e,{page:o}=e,{components:u}=e,{form:a}=e,{data_0:f=null}=e,{data_1:p=null}=e;rt(s.page.notify);let m=!1,y=!1,b=null;return Le(()=>{const k=s.page.subscribe(()=>{m&&(n(5,y=!0),n(6,b=document.title||"untitled page"))});return n(4,m=!0),k}),r.$$set=k=>{"stores"in k&&n(7,s=k.stores),"page"in k&&n(8,o=k.page),"components"in k&&n(0,u=k.components),"form"in k&&n(1,a=k.form),"data_0"in k&&n(2,f=k.data_0),"data_1"in k&&n(3,p=k.data_1)},r.$$.update=()=>{r.$$.dirty&384&&s.page.set(o)},[u,a,f,p,m,y,b,s,o]}class Dt extends Qe{constructor(e){super(),et(this,e,Tt,$t,tt,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const qt={},pe=[()=>be(()=>import("./chunks/0-905f2086.js"),["./chunks/0-905f2086.js","./components/pages/_layout.svelte-da352bf6.js","./chunks/index-0196de85.js","./chunks/user_store-c6dac21f.js","./assets/user_store-0ff9fd81.css","./chunks/preload-helper-41c905a7.js","./assets/_layout-999cc661.css"],import.meta.url),()=>be(()=>import("./chunks/1-0683818e.js"),["./chunks/1-0683818e.js","./components/error.svelte-067a22e6.js","./chunks/index-0196de85.js","./chunks/singletons-6a7112c0.js"],import.meta.url),()=>be(()=>import("./chunks/2-50e825c9.js"),["./chunks/2-50e825c9.js","./components/pages/_page.svelte-fb9f49f8.js","./chunks/index-0196de85.js","./chunks/user_store-c6dac21f.js","./assets/user_store-0ff9fd81.css","./assets/_page-4a4f5751.css"],import.meta.url)],Ct=[0],Vt={"/":[2]},Ft={handleError:({error:r})=>{console.error(r)}};class Oe{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Ye{constructor(e,n){this.status=e,this.location=n}}async function Bt(r){for(const e in r)if(typeof r[e]?.then=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([n,s])=>[n,await s])));return r}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Mt=-1,Gt=-2,Jt=-3,Kt=-4,zt=-5,Ht=-6;function Wt(r){if(typeof r=="number")return s(r,!0);if(!Array.isArray(r)||r.length===0)throw new Error("Invalid input");const e=r,n=Array(e.length);function s(o,u=!1){if(o===Mt)return;if(o===Jt)return NaN;if(o===Kt)return 1/0;if(o===zt)return-1/0;if(o===Ht)return-0;if(u)throw new Error("Invalid input");if(o in n)return n[o];const a=e[o];if(!a||typeof a!="object")n[o]=a;else if(Array.isArray(a))if(typeof a[0]=="string")switch(a[0]){case"Date":n[o]=new Date(a[1]);break;case"Set":const p=new Set;n[o]=p;for(let b=1;b<a.length;b+=1)p.add(s(a[b]));break;case"Map":const m=new Map;n[o]=m;for(let b=1;b<a.length;b+=2)m.set(s(a[b]),s(a[b+1]));break;case"RegExp":n[o]=new RegExp(a[1],a[2]);break;case"Object":n[o]=Object(a[1]);break;case"BigInt":n[o]=BigInt(a[1]);break;case"null":const y=Object.create(null);n[o]=y;for(let b=1;b<a.length;b+=2)y[a[b]]=s(a[b+1]);break}else{const f=new Array(a.length);n[o]=f;for(let p=0;p<a.length;p+=1){const m=a[p];m!==Gt&&(f[p]=s(m))}}else{const f={};n[o]=f;for(const p in a){const m=a[p];f[p]=s(m)}}return n[o]}return s(0)}const ke=Pt(pe,Ct,Vt,qt),Ie=pe[0],Ae=pe[1];Ie();Ae();let ee={};try{ee=JSON.parse(sessionStorage[Ze])}catch{}function Se(r){ee[r]=ce()}function Yt({target:r,base:e}){const n=document.documentElement,s=[];let o=null;const u={before_navigate:[],after_navigate:[]};let a={branch:[],error:null,url:null},f=!1,p=!1,m=!0,y=!1,b=!1,k=!1,N=!1,$,O=history.state?.[D];O||(O=Date.now(),history.replaceState({...history.state,[D]:O},"",location.href));const he=ee[O];he&&(history.scrollRestoration="manual",scrollTo(he.x,he.y));let B,Ne,te;async function Ue(){te=te||Promise.resolve(),await te,te=null;const t=new URL(location.href),i=re(t,!0);o=null,await Te(i,t,[])}async function me(t,{noScroll:i=!1,replaceState:l=!1,keepFocus:c=!1,state:d={},invalidateAll:_=!1},h,g){return typeof t=="string"&&(t=new URL(t,Ge(document))),oe({url:t,scroll:i?ce():null,keepfocus:c,redirect_chain:h,details:{state:d,replaceState:l},nav_token:g,accepted:()=>{_&&(N=!0)},blocked:()=>{},type:"goto"})}async function $e(t){const i=re(t,!1);if(!i)throw new Error(`Attempted to preload a URL that does not belong to this app: ${t}`);return o={id:i.id,promise:Ce(i).then(l=>(l.type==="loaded"&&l.state.error&&(o=null),l))},o.promise}async function ne(...t){const l=ke.filter(c=>t.some(d=>c.exec(d))).map(c=>Promise.all([...c.layouts,c.leaf].map(d=>d?.[1]())));await Promise.all(l)}async function Te(t,i,l,c,d={},_){Ne=d;let h=t&&await Ce(t);if(h||(h=await Be(i,{id:null},await x(new Error(`Not found: ${i.pathname}`),{url:i,params:{},route:{id:null}}),404)),i=t?.url||i,Ne!==d)return!1;if(h.type==="redirect")if(l.length>10||l.includes(i.pathname))h=await ae({status:500,error:await x(new Error("Redirect loop"),{url:i,params:{},route:{id:null}}),url:i,route:{id:null}});else return me(new URL(h.location,i).href,{},[...l,i.pathname],d),!1;else h.props?.page?.status>=400&&await M.updated.check()&&await se(i);if(s.length=0,N=!1,y=!0,c&&c.details){const{details:g}=c,v=g.replaceState?0:1;g.state[D]=O+=v,history[g.replaceState?"replaceState":"pushState"](g.state,"",i)}if(o=null,p?(a=h.state,h.props.page&&(h.props.page.url=i),$.$set(h.props)):De(h),c){const{scroll:g,keepfocus:v}=c;if(v||Re(),await ie(),m){const E=i.hash&&document.getElementById(i.hash.slice(1));g?scrollTo(g.x,g.y):E?E.scrollIntoView():scrollTo(0,0)}}else await ie();m=!0,h.props.page&&(B=h.props.page),_&&_(),y=!1}function De(t){a=t.state;const i=document.querySelector("style[data-sveltekit]");i&&i.remove(),B=t.props.page,$=new Dt({target:r,props:{...t.props,stores:M},hydrate:!0});const l={from:null,to:{params:a.params,route:{id:a.route?.id??null},url:new URL(location.href)},willUnload:!1,type:"enter"};u.after_navigate.forEach(c=>c(l)),p=!0}async function Y({url:t,params:i,branch:l,status:c,error:d,route:_,form:h}){const g=l.filter(Boolean);let v="never";for(const S of l)S?.slash!==void 0&&(v=S.slash);t.pathname=ht(t.pathname,v),t.search=t.search;const E={type:"loaded",state:{url:t,params:i,branch:l,error:d,route:_},props:{components:g.map(S=>S.node.component)}};h!==void 0&&(E.props.form=h);let L={},w=!B;for(let S=0;S<g.length;S+=1){const j=g[S];L={...L,...j.data},(w||!a.branch.some(X=>X===j))&&(E.props[`data_${S}`]=L,w=w||Object.keys(j.data??{}).length>0)}return w||(w=Object.keys(B.data).length!==Object.keys(L).length),(!a.url||t.href!==a.url.href||a.error!==d||h!==void 0||w)&&(E.props.page={error:d,params:i,route:{id:_?.id??null},status:c,url:new URL(t),form:h??null,data:w?L:B.data}),E}async function _e({loader:t,parent:i,url:l,params:c,route:d,server_data_node:_}){let h=null;const g={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},v=await t();if(v.universal?.load){let E=function(...w){for(const I of w){const{href:S}=new URL(I,l);g.dependencies.add(S)}};const L={route:{get id(){return g.route=!0,d.id}},params:new Proxy(c,{get:(w,I)=>(g.params.add(I),w[I])}),data:_?.data??null,url:yt(l,()=>{g.url=!0}),async fetch(w,I){let S;w instanceof Request?(S=w.url,I={body:w.method==="GET"||w.method==="HEAD"?void 0:await w.blob(),cache:w.cache,credentials:w.credentials,headers:w.headers,integrity:w.integrity,keepalive:w.keepalive,method:w.method,mode:w.mode,redirect:w.redirect,referrer:w.referrer,referrerPolicy:w.referrerPolicy,signal:w.signal,...I}):S=w;const j=new URL(S,l).href;return E(j),p?St(S,j,I):kt(S,I)},setHeaders:()=>{},depends:E,parent(){return g.parent=!0,i()}};h=await v.universal.load.call(null,L)??null,h=h?await Bt(h):null}return{node:v,loader:t,server:_,universal:v.universal?.load?{type:"data",data:h,uses:g}:null,data:h??_?.data??null,slash:v.universal?.trailingSlash??_?.slash}}function qe(t,i,l,c,d){if(N)return!0;if(!c)return!1;if(c.parent&&t||c.route&&i||c.url&&l)return!0;for(const _ of c.params)if(d[_]!==a.params[_])return!0;for(const _ of c.dependencies)if(s.some(h=>h(new URL(_))))return!0;return!1}function ge(t,i){return t?.type==="data"?{type:"data",data:t.data,uses:{dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url},slash:t.slash}:t?.type==="skip"?i??null:null}async function Ce({id:t,invalidating:i,url:l,params:c,route:d}){if(o?.id===t)return o.promise;const{errors:_,layouts:h,leaf:g}=d,v=[...h,g];_.forEach(R=>R?.().catch(()=>{})),v.forEach(R=>R?.[1]().catch(()=>{}));let E=null;const L=a.url?t!==a.url.pathname+a.url.search:!1,w=a.route?t!==a.route.id:!1,I=v.reduce((R,A,U)=>{const P=a.branch[U],J=!!A?.[0]&&(P?.loader!==A[1]||qe(R.some(Boolean),w,L,P.server?.uses,c));return R.push(J),R},[]);if(I.some(Boolean)){try{E=await Xe(l,I)}catch(R){return ae({status:500,error:await x(R,{url:l,params:c,route:{id:d.id}}),url:l,route:d})}if(E.type==="redirect")return E}const S=E?.nodes;let j=!1;const X=v.map(async(R,A)=>{if(!R)return;const U=a.branch[A],P=S?.[A];if((!P||P.type==="skip")&&R[1]===U?.loader&&!qe(j,w,L,U.universal?.uses,c))return U;if(j=!0,P?.type==="error")throw P;return _e({loader:R[1],url:l,params:c,route:d,parent:async()=>{const Me={};for(let ye=0;ye<A;ye+=1)Object.assign(Me,(await X[ye])?.data);return Me},server_data_node:ge(P===void 0&&R[0]?{type:"skip"}:P??null,U?.server)})});for(const R of X)R.catch(()=>{});const Z=[];for(let R=0;R<v.length;R+=1)if(v[R])try{Z.push(await X[R])}catch(A){if(A instanceof Ye)return{type:"redirect",location:A.location};let U=500,P;S?.includes(A)?(U=A.status??U,P=A.error):A instanceof Oe?(U=A.status,P=A.body):P=await x(A,{params:c,url:l,route:{id:d.id}});const J=await Ve(R,Z,_);return J?await Y({url:l,params:c,branch:Z.slice(0,J.idx).concat(J.node),status:U,error:P,route:d}):await Be(l,{id:d.id},P,U)}else Z.push(void 0);return await Y({url:l,params:c,branch:Z,status:200,error:null,route:d,form:i?void 0:null})}async function Ve(t,i,l){for(;t--;)if(l[t]){let c=t;for(;!i[c];)c-=1;try{return{idx:c+1,node:{node:await l[t](),loader:l[t],data:{},server:null,universal:null}}}catch{continue}}}async function ae({status:t,error:i,url:l,route:c}){const d={},_=await Ie();let h=null;if(_.server)try{const E=await Xe(l,[!0]);if(E.type!=="data"||E.nodes[0]&&E.nodes[0].type!=="data")throw 0;h=E.nodes[0]??null}catch{(l.origin!==location.origin||l.pathname!==location.pathname||f)&&await se(l)}const g=await _e({loader:Ie,url:l,params:d,route:c,parent:()=>Promise.resolve({}),server_data_node:ge(h)}),v={node:await Ae(),loader:Ae,universal:null,server:null,data:null};return await Y({url:l,params:d,branch:[g,v],status:t,error:i,route:null})}function re(t,i){if(Ke(t,e))return;const l=mt(t.pathname.slice(e.length)||"/");for(const c of ke){const d=c.exec(l);if(d)return{id:t.pathname+t.search,invalidating:i,route:c,params:_t(d),url:t}}}function Fe({url:t,type:i,intent:l,delta:c}){let d=!1;const _={from:{params:a.params,route:{id:a.route?.id??null},url:a.url},to:{params:l?.params??null,route:{id:l?.route?.id??null},url:t},willUnload:!l,type:i};c!==void 0&&(_.delta=c);const h={..._,cancel:()=>{d=!0}};return b||u.before_navigate.forEach(g=>g(h)),d?null:_}async function oe({url:t,scroll:i,keepfocus:l,redirect_chain:c,details:d,type:_,delta:h,nav_token:g,accepted:v,blocked:E}){const L=re(t,!1),w=Fe({url:t,type:_,delta:h,intent:L});if(!w){E();return}Se(O),v(),b=!0,p&&M.navigating.set(w),await Te(L,t,c,{scroll:i,keepfocus:l,details:d},g,()=>{b=!1,u.after_navigate.forEach(I=>I(w)),M.navigating.set(null)})}async function Be(t,i,l,c){return t.origin===location.origin&&t.pathname===location.pathname&&!f?await ae({status:c,error:l,url:t,route:i}):await se(t)}function se(t){return location.href=t.href,new Promise(()=>{})}function xe(){let t;n.addEventListener("mousemove",_=>{const h=_.target;clearTimeout(t),t=setTimeout(()=>{c(h,2)},20)});function i(_){c(_.composedPath()[0],1)}n.addEventListener("mousedown",i),n.addEventListener("touchstart",i,{passive:!0});const l=new IntersectionObserver(_=>{for(const h of _)h.isIntersecting&&(ne(new URL(h.target.href).pathname),l.unobserve(h.target))},{threshold:0});function c(_,h){const g=Je(_,n);if(!g)return;const{url:v,external:E}=ve(g,e);if(E)return;const L=le(g);L.reload||(h<=L.preload_data?$e(v):h<=L.preload_code&&ne(v.pathname))}function d(){l.disconnect();for(const _ of n.querySelectorAll("a")){const{url:h,external:g}=ve(_,e);if(g)continue;const v=le(_);v.reload||(v.preload_code===ze.viewport&&l.observe(_),v.preload_code===ze.eager&&ne(h.pathname))}}u.after_navigate.push(d),d()}return{after_navigate:t=>{Le(()=>(u.after_navigate.push(t),()=>{const i=u.after_navigate.indexOf(t);u.after_navigate.splice(i,1)}))},before_navigate:t=>{Le(()=>(u.before_navigate.push(t),()=>{const i=u.before_navigate.indexOf(t);u.before_navigate.splice(i,1)}))},disable_scroll_handling:()=>{(y||!p)&&(m=!1)},goto:(t,i={})=>me(t,i,[]),invalidate:t=>{if(typeof t=="function")s.push(t);else{const{href:i}=new URL(t,location.href);s.push(l=>l.href===i)}return Ue()},invalidateAll:()=>(N=!0,Ue()),preload_data:async t=>{const i=new URL(t,Ge(document));await $e(i)},preload_code:ne,apply_action:async t=>{if(t.type==="error"){const i=new URL(location.href),{branch:l,route:c}=a;if(!c)return;const d=await Ve(a.branch.length,l,c.errors);if(d){const _=await Y({url:i,params:a.params,branch:l.slice(0,d.idx).concat(d.node),status:t.status??500,error:t.error,route:c});a=_.state,$.$set(_.props),ie().then(Re)}}else if(t.type==="redirect")me(t.location,{invalidateAll:!0},[]);else{const i={form:t.data,page:{...B,form:t.data,status:t.status}};$.$set(i),t.type==="success"&&ie().then(Re)}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",t=>{let i=!1;if(!b){const l={from:{params:a.params,route:{id:a.route?.id??null},url:a.url},to:null,willUnload:!0,type:"leave",cancel:()=>i=!0};u.before_navigate.forEach(c=>c(l))}i?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Se(O);try{sessionStorage[Ze]=JSON.stringify(ee)}catch{}}}),navigator.connection?.saveData||xe(),n.addEventListener("click",t=>{if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const i=Je(t.composedPath()[0],n);if(!i)return;const{url:l,external:c,has:d}=ve(i,e),_=le(i);if(!l||!(i instanceof SVGAElement)&&l.protocol!==location.protocol&&!(l.protocol==="https:"||l.protocol==="http:")||d.download)return;if(c||_.reload){Fe({url:l,type:"link"})||t.preventDefault(),b=!0;return}const[g,v]=l.href.split("#");if(v!==void 0&&g===location.href.split("#")[0]){k=!0,Se(O),a.url=l,M.page.set({...B,url:l}),M.page.notify();return}oe({url:l,scroll:_.noscroll?ce():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:l.href===location.href},accepted:()=>t.preventDefault(),blocked:()=>t.preventDefault(),type:"link"})}),n.addEventListener("submit",t=>{if(t.defaultPrevented)return;const i=HTMLFormElement.prototype.cloneNode.call(t.target),l=t.submitter;if((l?.formMethod||i.method)!=="get")return;const d=new URL(l?.hasAttribute("formaction")&&l?.formAction||i.action);if(Ke(d,e))return;const _=t.target,{noscroll:h,reload:g}=le(_);if(g)return;t.preventDefault(),t.stopPropagation();const v=new FormData(_),E=l?.getAttribute("name");E&&v.append(E,l?.getAttribute("value")??""),d.search=new URLSearchParams(v).toString(),oe({url:d,scroll:h?ce():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",t=>{if(t.state?.[D]){if(t.state[D]===O)return;const i=t.state[D]-O;oe({url:new URL(location.href),scroll:ee[t.state[D]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{O=t.state[D]},blocked:()=>{history.go(-i)},type:"popstate",delta:i})}}),addEventListener("hashchange",()=>{k&&(k=!1,history.replaceState({...history.state,[D]:++O},"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&M.navigating.set(null)})},_hydrate:async({status:t=200,error:i,node_ids:l,params:c,route:d,data:_,form:h})=>{f=!0;const g=new URL(location.href);({params:c={},route:d={id:null}}=re(g,!1)||{});let v;try{const E=l.map(async(L,w)=>{const I=_[w];return _e({loader:pe[L],url:g,params:c,route:d,parent:async()=>{const S={};for(let j=0;j<w;j+=1)Object.assign(S,(await E[j]).data);return S},server_data_node:ge(I)})});v=await Y({url:g,params:c,branch:await Promise.all(E),status:t,error:i,form:h,route:ke.find(({id:L})=>L===d.id)??null})}catch(E){if(E instanceof Ye){await se(new URL(E.location,location.href));return}v=await ae({status:E instanceof Oe?E.status:500,error:await x(E,{url:g,params:c,route:d}),url:g,route:d})}De(v)}}}async function Xe(r,e){const n=new URL(r);n.pathname=bt(r.pathname),n.searchParams.append("x-sveltekit-invalidated",e.map(u=>u?"1":"").join("_"));const s=await de(n.href),o=await s.json();if(!s.ok)throw new Error(o);return o.nodes?.forEach(u=>{u?.type==="data"&&(u.data=Wt(u.data),u.uses={dependencies:new Set(u.uses.dependencies??[]),params:new Set(u.uses.params??[]),parent:!!u.uses.parent,route:!!u.uses.route,url:!!u.uses.url})}),o}function x(r,e){return r instanceof Oe?r.body:Ft.handleError({error:r,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Re(){const r=document.querySelector("[autofocus]");if(r)r.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{getSelection()?.removeAllRanges()}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex")}}async function Qt({env:r,hydrate:e,paths:n,target:s,version:o}){ut(n),pt(o);const u=Yt({target:s,base:n.base});dt({client:u}),e?await u._hydrate(e):u.goto(location.href,{replaceState:!0}),u._start_router()}export{Qt as start};
