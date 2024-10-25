import{r as k,b as $t,j as L,R as E}from"./app-CJgLv7Di.js";import{u as dt,f as Ze,a as Kt,P as ft,c as le,S as zt}from"./AuthenticatedLayout-CGp-T8oJ.js";import{d as Xt,c as et,b as Gt,u as Yt,h as Jt}from"./index-VXD0VXvr.js";import{L as Qt}from"./label-D-CNqoFC.js";function Zt(e,r){return k.useReducer((t,i)=>r[t][i]??t,e)}var yt=e=>{const{present:r,children:t}=e,i=er(r),n=typeof t=="function"?t({present:i.isPresent}):k.Children.only(t),a=dt(i.ref,tr(n));return typeof t=="function"||i.isPresent?k.cloneElement(n,{ref:a}):null};yt.displayName="Presence";function er(e){const[r,t]=k.useState(),i=k.useRef({}),n=k.useRef(e),a=k.useRef("none"),l=e?"mounted":"unmounted",[y,b]=Zt(l,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return k.useEffect(()=>{const _=_e(i.current);a.current=y==="mounted"?_:"none"},[y]),Ze(()=>{const _=i.current,g=n.current;if(g!==e){const I=a.current,M=_e(_);e?b("MOUNT"):M==="none"||(_==null?void 0:_.display)==="none"?b("UNMOUNT"):b(g&&I!==M?"ANIMATION_OUT":"UNMOUNT"),n.current=e}},[e,b]),Ze(()=>{if(r){const _=m=>{const M=_e(i.current).includes(m.animationName);m.target===r&&M&&$t.flushSync(()=>b("ANIMATION_END"))},g=m=>{m.target===r&&(a.current=_e(i.current))};return r.addEventListener("animationstart",g),r.addEventListener("animationcancel",_),r.addEventListener("animationend",_),()=>{r.removeEventListener("animationstart",g),r.removeEventListener("animationcancel",_),r.removeEventListener("animationend",_)}}else b("ANIMATION_END")},[r,b]),{isPresent:["mounted","unmountSuspended"].includes(y),ref:k.useCallback(_=>{_&&(i.current=getComputedStyle(_)),t(_)},[])}}function _e(e){return(e==null?void 0:e.animationName)||"none"}function tr(e){var i,n;let r=(i=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:i.get,t=r&&"isReactWarning"in r&&r.isReactWarning;return t?e.ref:(r=(n=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:n.get,t=r&&"isReactWarning"in r&&r.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}var Me="Checkbox",[rr,Br]=Kt(Me),[sr,ir]=rr(Me),ht=k.forwardRef((e,r)=>{const{__scopeCheckbox:t,name:i,checked:n,defaultChecked:a,required:l,disabled:y,value:b="on",onCheckedChange:_,...g}=e,[m,I]=k.useState(null),M=dt(r,S=>I(S)),w=k.useRef(!1),ie=m?!!m.closest("form"):!0,[U=!1,$]=Xt({prop:n,defaultProp:a,onChange:_}),F=k.useRef(U);return k.useEffect(()=>{const S=m==null?void 0:m.form;if(S){const B=()=>$(F.current);return S.addEventListener("reset",B),()=>S.removeEventListener("reset",B)}},[m,$]),L.jsxs(sr,{scope:t,state:U,disabled:y,children:[L.jsx(ft.button,{type:"button",role:"checkbox","aria-checked":se(U)?"mixed":U,"aria-required":l,"data-state":gt(U),"data-disabled":y?"":void 0,disabled:y,value:b,...g,ref:M,onKeyDown:et(e.onKeyDown,S=>{S.key==="Enter"&&S.preventDefault()}),onClick:et(e.onClick,S=>{$(B=>se(B)?!0:!B),ie&&(w.current=S.isPropagationStopped(),w.current||S.stopPropagation())})}),ie&&L.jsx(nr,{control:m,bubbles:!w.current,name:i,value:b,checked:U,required:l,disabled:y,style:{transform:"translateX(-100%)"}})]})});ht.displayName=Me;var mt="CheckboxIndicator",vt=k.forwardRef((e,r)=>{const{__scopeCheckbox:t,forceMount:i,...n}=e,a=ir(mt,t);return L.jsx(yt,{present:i||se(a.state)||a.state===!0,children:L.jsx(ft.span,{"data-state":gt(a.state),"data-disabled":a.disabled?"":void 0,...n,ref:r,style:{pointerEvents:"none",...e.style}})})});vt.displayName=mt;var nr=e=>{const{control:r,checked:t,bubbles:i=!0,...n}=e,a=k.useRef(null),l=Gt(t),y=Yt(r);return k.useEffect(()=>{const b=a.current,_=window.HTMLInputElement.prototype,m=Object.getOwnPropertyDescriptor(_,"checked").set;if(l!==t&&m){const I=new Event("click",{bubbles:i});b.indeterminate=se(t),m.call(b,se(t)?!1:t),b.dispatchEvent(I)}},[l,t,i]),L.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:se(t)?!1:t,...n,tabIndex:-1,ref:a,style:{...e.style,...y,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function se(e){return e==="indeterminate"}function gt(e){return se(e)?"indeterminate":e?"checked":"unchecked"}var bt=ht,ar=vt;const or=k.forwardRef(({className:e,...r},t)=>L.jsx(bt,{ref:t,className:le("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...r,children:L.jsx(ar,{className:le("flex items-center justify-center text-current"),children:L.jsx(Jt,{className:"h-4 w-4"})})}));or.displayName=bt.displayName;var ve=e=>e.type==="checkbox",ue=e=>e instanceof Date,W=e=>e==null;const _t=e=>typeof e=="object";var D=e=>!W(e)&&!Array.isArray(e)&&_t(e)&&!ue(e),xt=e=>D(e)&&e.target?ve(e.target)?e.target.checked:e.target.value:e,ur=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,Ft=(e,r)=>e.has(ur(r)),lr=e=>{const r=e.constructor&&e.constructor.prototype;return D(r)&&r.hasOwnProperty("isPrototypeOf")},Le=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function q(e){let r;const t=Array.isArray(e);if(e instanceof Date)r=new Date(e);else if(e instanceof Set)r=new Set(e);else if(!(Le&&(e instanceof Blob||e instanceof FileList))&&(t||D(e)))if(r=t?[]:{},!t&&!lr(e))r=e;else for(const i in e)e.hasOwnProperty(i)&&(r[i]=q(e[i]));else return e;return r}var we=e=>Array.isArray(e)?e.filter(Boolean):[],C=e=>e===void 0,d=(e,r,t)=>{if(!r||!D(e))return t;const i=we(r.split(/[,[\].]+?/)).reduce((n,a)=>W(n)?n:n[a],e);return C(i)||i===e?C(e[r])?t:e[r]:i},X=e=>typeof e=="boolean",Ue=e=>/^\w*$/.test(e),Vt=e=>we(e.replace(/["|']|\]/g,"").split(/\.|\[/)),p=(e,r,t)=>{let i=-1;const n=Ue(r)?[r]:Vt(r),a=n.length,l=a-1;for(;++i<a;){const y=n[i];let b=t;if(i!==l){const _=e[y];b=D(_)||Array.isArray(_)?_:isNaN(+n[i+1])?{}:[]}if(y==="__proto__")return;e[y]=b,e=e[y]}return e};const Ve={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},Y={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},Q={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},At=E.createContext(null),Ce=()=>E.useContext(At),cr=e=>{const{children:r,...t}=e;return E.createElement(At.Provider,{value:t},r)};var pt=(e,r,t,i=!0)=>{const n={defaultValues:r._defaultValues};for(const a in e)Object.defineProperty(n,a,{get:()=>{const l=a;return r._proxyFormState[l]!==Y.all&&(r._proxyFormState[l]=!i||Y.all),t&&(t[l]=!0),e[l]}});return n},H=e=>D(e)&&!Object.keys(e).length,Et=(e,r,t,i)=>{t(e);const{name:n,...a}=e;return H(a)||Object.keys(a).length>=Object.keys(r).length||Object.keys(a).find(l=>r[l]===(!i||Y.all))},he=e=>Array.isArray(e)?e:[e],kt=(e,r,t)=>!e||!r||e===r||he(e).some(i=>i&&(t?i===r:i.startsWith(r)||r.startsWith(i)));function je(e){const r=E.useRef(e);r.current=e,E.useEffect(()=>{const t=!e.disabled&&r.current.subject&&r.current.subject.subscribe({next:r.current.next});return()=>{t&&t.unsubscribe()}},[e.disabled])}function dr(e){const r=Ce(),{control:t=r.control,disabled:i,name:n,exact:a}=e||{},[l,y]=E.useState(t._formState),b=E.useRef(!0),_=E.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),g=E.useRef(n);return g.current=n,je({disabled:i,next:m=>b.current&&kt(g.current,m.name,a)&&Et(m,_.current,t._updateFormState)&&y({...t._formState,...m}),subject:t._subjects.state}),E.useEffect(()=>(b.current=!0,_.current.isValid&&t._updateValid(!0),()=>{b.current=!1}),[t]),pt(l,t,_.current,!1)}var J=e=>typeof e=="string",wt=(e,r,t,i,n)=>J(e)?(i&&r.watch.add(e),d(t,e,n)):Array.isArray(e)?e.map(a=>(i&&r.watch.add(a),d(t,a))):(i&&(r.watchAll=!0),t);function fr(e){const r=Ce(),{control:t=r.control,name:i,defaultValue:n,disabled:a,exact:l}=e||{},y=E.useRef(i);y.current=i,je({disabled:a,subject:t._subjects.values,next:g=>{kt(y.current,g.name,l)&&_(q(wt(y.current,t._names,g.values||t._formValues,!1,n)))}});const[b,_]=E.useState(t._getWatch(i,n));return E.useEffect(()=>t._removeUnmounted()),b}function yr(e){const r=Ce(),{name:t,disabled:i,control:n=r.control,shouldUnregister:a}=e,l=Ft(n._names.array,t),y=fr({control:n,name:t,defaultValue:d(n._formValues,t,d(n._defaultValues,t,e.defaultValue)),exact:!0}),b=dr({control:n,name:t,exact:!0}),_=E.useRef(n.register(t,{...e.rules,value:y,...X(e.disabled)?{disabled:e.disabled}:{}}));return E.useEffect(()=>{const g=n._options.shouldUnregister||a,m=(I,M)=>{const w=d(n._fields,I);w&&w._f&&(w._f.mount=M)};if(m(t,!0),g){const I=q(d(n._options.defaultValues,t));p(n._defaultValues,t,I),C(d(n._formValues,t))&&p(n._formValues,t,I)}return()=>{(l?g&&!n._state.action:g)?n.unregister(t):m(t,!1)}},[t,n,l,a]),E.useEffect(()=>{d(n._fields,t)&&n._updateDisabledField({disabled:i,fields:n._fields,name:t,value:d(n._fields,t)._f.value})},[i,t,n]),{field:{name:t,value:y,...X(i)||b.disabled?{disabled:b.disabled||i}:{},onChange:E.useCallback(g=>_.current.onChange({target:{value:xt(g),name:t},type:Ve.CHANGE}),[t]),onBlur:E.useCallback(()=>_.current.onBlur({target:{value:d(n._formValues,t),name:t},type:Ve.BLUR}),[t,n]),ref:E.useCallback(g=>{const m=d(n._fields,t);m&&g&&(m._f.ref={focus:()=>g.focus(),select:()=>g.select(),setCustomValidity:I=>g.setCustomValidity(I),reportValidity:()=>g.reportValidity()})},[n._fields,t])},formState:b,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!d(b.errors,t)},isDirty:{enumerable:!0,get:()=>!!d(b.dirtyFields,t)},isTouched:{enumerable:!0,get:()=>!!d(b.touchedFields,t)},isValidating:{enumerable:!0,get:()=>!!d(b.validatingFields,t)},error:{enumerable:!0,get:()=>d(b.errors,t)}})}}const hr=e=>e.render(yr(e));var Ct=(e,r,t,i,n)=>r?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[i]:n||!0}}:{},tt=e=>({isOnSubmit:!e||e===Y.onSubmit,isOnBlur:e===Y.onBlur,isOnChange:e===Y.onChange,isOnAll:e===Y.all,isOnTouch:e===Y.onTouched}),rt=(e,r,t)=>!t&&(r.watchAll||r.watch.has(e)||[...r.watch].some(i=>e.startsWith(i)&&/^\.\w+/.test(e.slice(i.length))));const me=(e,r,t,i)=>{for(const n of t||Object.keys(e)){const a=d(e,n);if(a){const{_f:l,...y}=a;if(l){if(l.refs&&l.refs[0]&&r(l.refs[0],n)&&!i)return!0;if(l.ref&&r(l.ref,l.name)&&!i)return!0;if(me(y,r))break}else if(D(y)&&me(y,r))break}}};var mr=(e,r,t)=>{const i=he(d(e,t));return p(i,"root",r[t]),p(e,t,i),e},Be=e=>e.type==="file",Z=e=>typeof e=="function",Ae=e=>{if(!Le)return!1;const r=e?e.ownerDocument:0;return e instanceof(r&&r.defaultView?r.defaultView.HTMLElement:HTMLElement)},Fe=e=>J(e),We=e=>e.type==="radio",pe=e=>e instanceof RegExp;const st={value:!1,isValid:!1},it={value:!0,isValid:!0};var St=e=>{if(Array.isArray(e)){if(e.length>1){const r=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:r,isValid:!!r.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!C(e[0].attributes.value)?C(e[0].value)||e[0].value===""?it:{value:e[0].value,isValid:!0}:it:st}return st};const nt={isValid:!1,value:null};var Dt=e=>Array.isArray(e)?e.reduce((r,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:r,nt):nt;function at(e,r,t="validate"){if(Fe(e)||Array.isArray(e)&&e.every(Fe)||X(e)&&!e)return{type:t,message:Fe(e)?e:"",ref:r}}var oe=e=>D(e)&&!pe(e)?e:{value:e,message:""},ot=async(e,r,t,i,n)=>{const{ref:a,refs:l,required:y,maxLength:b,minLength:_,min:g,max:m,pattern:I,validate:M,name:w,valueAsNumber:ie,mount:U,disabled:$}=e._f,F=d(r,w);if(!U||$)return{};const S=l?l[0]:a,B=x=>{i&&S.reportValidity&&(S.setCustomValidity(X(x)?"":x||""),S.reportValidity())},N={},ne=We(a),ge=ve(a),te=ne||ge,ae=(ie||Be(a))&&C(a.value)&&C(F)||Ae(a)&&a.value===""||F===""||Array.isArray(F)&&!F.length,K=Ct.bind(null,w,t,N),be=(x,V,R,j=Q.maxLength,G=Q.minLength)=>{const z=x?V:R;N[w]={type:x?j:G,message:z,ref:a,...K(x?j:G,z)}};if(n?!Array.isArray(F)||!F.length:y&&(!te&&(ae||W(F))||X(F)&&!F||ge&&!St(l).isValid||ne&&!Dt(l).isValid)){const{value:x,message:V}=Fe(y)?{value:!!y,message:y}:oe(y);if(x&&(N[w]={type:Q.required,message:V,ref:S,...K(Q.required,V)},!t))return B(V),N}if(!ae&&(!W(g)||!W(m))){let x,V;const R=oe(m),j=oe(g);if(!W(F)&&!isNaN(F)){const G=a.valueAsNumber||F&&+F;W(R.value)||(x=G>R.value),W(j.value)||(V=G<j.value)}else{const G=a.valueAsDate||new Date(F),z=fe=>new Date(new Date().toDateString()+" "+fe),ce=a.type=="time",de=a.type=="week";J(R.value)&&F&&(x=ce?z(F)>z(R.value):de?F>R.value:G>new Date(R.value)),J(j.value)&&F&&(V=ce?z(F)<z(j.value):de?F<j.value:G<new Date(j.value))}if((x||V)&&(be(!!x,R.message,j.message,Q.max,Q.min),!t))return B(N[w].message),N}if((b||_)&&!ae&&(J(F)||n&&Array.isArray(F))){const x=oe(b),V=oe(_),R=!W(x.value)&&F.length>+x.value,j=!W(V.value)&&F.length<+V.value;if((R||j)&&(be(R,x.message,V.message),!t))return B(N[w].message),N}if(I&&!ae&&J(F)){const{value:x,message:V}=oe(I);if(pe(x)&&!F.match(x)&&(N[w]={type:Q.pattern,message:V,ref:a,...K(Q.pattern,V)},!t))return B(V),N}if(M){if(Z(M)){const x=await M(F,r),V=at(x,S);if(V&&(N[w]={...V,...K(Q.validate,V.message)},!t))return B(V.message),N}else if(D(M)){let x={};for(const V in M){if(!H(x)&&!t)break;const R=at(await M[V](F,r),S,V);R&&(x={...R,...K(V,R.message)},B(R.message),t&&(N[w]=x))}if(!H(x)&&(N[w]={ref:S,...x},!t))return N}}return B(!0),N};function vr(e,r){const t=r.slice(0,-1).length;let i=0;for(;i<t;)e=C(e)?i++:e[r[i++]];return e}function gr(e){for(const r in e)if(e.hasOwnProperty(r)&&!C(e[r]))return!1;return!0}function O(e,r){const t=Array.isArray(r)?r:Ue(r)?[r]:Vt(r),i=t.length===1?e:vr(e,t),n=t.length-1,a=t[n];return i&&delete i[a],n!==0&&(D(i)&&H(i)||Array.isArray(i)&&gr(i))&&O(e,t.slice(0,-1)),e}var Ie=()=>{let e=[];return{get observers(){return e},next:n=>{for(const a of e)a.next&&a.next(n)},subscribe:n=>(e.push(n),{unsubscribe:()=>{e=e.filter(a=>a!==n)}}),unsubscribe:()=>{e=[]}}},Ee=e=>W(e)||!_t(e);function ee(e,r){if(Ee(e)||Ee(r))return e===r;if(ue(e)&&ue(r))return e.getTime()===r.getTime();const t=Object.keys(e),i=Object.keys(r);if(t.length!==i.length)return!1;for(const n of t){const a=e[n];if(!i.includes(n))return!1;if(n!=="ref"){const l=r[n];if(ue(a)&&ue(l)||D(a)&&D(l)||Array.isArray(a)&&Array.isArray(l)?!ee(a,l):a!==l)return!1}}return!0}var Nt=e=>e.type==="select-multiple",br=e=>We(e)||ve(e),Pe=e=>Ae(e)&&e.isConnected,Rt=e=>{for(const r in e)if(Z(e[r]))return!0;return!1};function ke(e,r={}){const t=Array.isArray(e);if(D(e)||t)for(const i in e)Array.isArray(e[i])||D(e[i])&&!Rt(e[i])?(r[i]=Array.isArray(e[i])?[]:{},ke(e[i],r[i])):W(e[i])||(r[i]=!0);return r}function Ot(e,r,t){const i=Array.isArray(e);if(D(e)||i)for(const n in e)Array.isArray(e[n])||D(e[n])&&!Rt(e[n])?C(r)||Ee(t[n])?t[n]=Array.isArray(e[n])?ke(e[n],[]):{...ke(e[n])}:Ot(e[n],W(r)?{}:r[n],t[n]):t[n]=!ee(e[n],r[n]);return t}var xe=(e,r)=>Ot(e,r,ke(r)),It=(e,{valueAsNumber:r,valueAsDate:t,setValueAs:i})=>C(e)?e:r?e===""?NaN:e&&+e:t&&J(e)?new Date(e):i?i(e):e;function Te(e){const r=e.ref;if(!(e.refs?e.refs.every(t=>t.disabled):r.disabled))return Be(r)?r.files:We(r)?Dt(e.refs).value:Nt(r)?[...r.selectedOptions].map(({value:t})=>t):ve(r)?St(e.refs).value:It(C(r.value)?e.ref.value:r.value,e)}var _r=(e,r,t,i)=>{const n={};for(const a of e){const l=d(r,a);l&&p(n,a,l._f)}return{criteriaMode:t,names:[...e],fields:n,shouldUseNativeValidation:i}},ye=e=>C(e)?e:pe(e)?e.source:D(e)?pe(e.value)?e.value.source:e.value:e;const ut="AsyncFunction";var xr=e=>(!e||!e.validate)&&!!(Z(e.validate)&&e.validate.constructor.name===ut||D(e.validate)&&Object.values(e.validate).find(r=>r.constructor.name===ut)),Fr=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function lt(e,r,t){const i=d(e,t);if(i||Ue(t))return{error:i,name:t};const n=t.split(".");for(;n.length;){const a=n.join("."),l=d(r,a),y=d(e,a);if(l&&!Array.isArray(l)&&t!==a)return{name:t};if(y&&y.type)return{name:a,error:y};n.pop()}return{name:t}}var Vr=(e,r,t,i,n)=>n.isOnAll?!1:!t&&n.isOnTouch?!(r||e):(t?i.isOnBlur:n.isOnBlur)?!e:(t?i.isOnChange:n.isOnChange)?e:!0,Ar=(e,r)=>!we(d(e,r)).length&&O(e,r);const pr={mode:Y.onSubmit,reValidateMode:Y.onChange,shouldFocusError:!0};function Er(e={}){let r={...pr,...e},t={submitCount:0,isDirty:!1,isLoading:Z(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:r.errors||{},disabled:r.disabled||!1},i={},n=D(r.defaultValues)||D(r.values)?q(r.defaultValues||r.values)||{}:{},a=r.shouldUnregister?{}:q(n),l={action:!1,mount:!1,watch:!1},y={mount:new Set,unMount:new Set,array:new Set,watch:new Set},b,_=0;const g={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},m={values:Ie(),array:Ie(),state:Ie()},I=tt(r.mode),M=tt(r.reValidateMode),w=r.criteriaMode===Y.all,ie=s=>o=>{clearTimeout(_),_=setTimeout(s,o)},U=async s=>{if(g.isValid||s){const o=r.resolver?H((await te()).errors):await K(i,!0);o!==t.isValid&&m.state.next({isValid:o})}},$=(s,o)=>{(g.isValidating||g.validatingFields)&&((s||Array.from(y.mount)).forEach(u=>{u&&(o?p(t.validatingFields,u,o):O(t.validatingFields,u))}),m.state.next({validatingFields:t.validatingFields,isValidating:!H(t.validatingFields)}))},F=(s,o=[],u,h,f=!0,c=!0)=>{if(h&&u){if(l.action=!0,c&&Array.isArray(d(i,s))){const v=u(d(i,s),h.argA,h.argB);f&&p(i,s,v)}if(c&&Array.isArray(d(t.errors,s))){const v=u(d(t.errors,s),h.argA,h.argB);f&&p(t.errors,s,v),Ar(t.errors,s)}if(g.touchedFields&&c&&Array.isArray(d(t.touchedFields,s))){const v=u(d(t.touchedFields,s),h.argA,h.argB);f&&p(t.touchedFields,s,v)}g.dirtyFields&&(t.dirtyFields=xe(n,a)),m.state.next({name:s,isDirty:x(s,o),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else p(a,s,o)},S=(s,o)=>{p(t.errors,s,o),m.state.next({errors:t.errors})},B=s=>{t.errors=s,m.state.next({errors:t.errors,isValid:!1})},N=(s,o,u,h)=>{const f=d(i,s);if(f){const c=d(a,s,C(u)?d(n,s):u);C(c)||h&&h.defaultChecked||o?p(a,s,o?c:Te(f._f)):j(s,c),l.mount&&U()}},ne=(s,o,u,h,f)=>{let c=!1,v=!1;const A={name:s},P=!!(d(i,s)&&d(i,s)._f&&d(i,s)._f.disabled);if(!u||h){g.isDirty&&(v=t.isDirty,t.isDirty=A.isDirty=x(),c=v!==A.isDirty);const T=P||ee(d(n,s),o);v=!!(!P&&d(t.dirtyFields,s)),T||P?O(t.dirtyFields,s):p(t.dirtyFields,s,!0),A.dirtyFields=t.dirtyFields,c=c||g.dirtyFields&&v!==!T}if(u){const T=d(t.touchedFields,s);T||(p(t.touchedFields,s,u),A.touchedFields=t.touchedFields,c=c||g.touchedFields&&T!==u)}return c&&f&&m.state.next(A),c?A:{}},ge=(s,o,u,h)=>{const f=d(t.errors,s),c=g.isValid&&X(o)&&t.isValid!==o;if(e.delayError&&u?(b=ie(()=>S(s,u)),b(e.delayError)):(clearTimeout(_),b=null,u?p(t.errors,s,u):O(t.errors,s)),(u?!ee(f,u):f)||!H(h)||c){const v={...h,...c&&X(o)?{isValid:o}:{},errors:t.errors,name:s};t={...t,...v},m.state.next(v)}},te=async s=>{$(s,!0);const o=await r.resolver(a,r.context,_r(s||y.mount,i,r.criteriaMode,r.shouldUseNativeValidation));return $(s),o},ae=async s=>{const{errors:o}=await te(s);if(s)for(const u of s){const h=d(o,u);h?p(t.errors,u,h):O(t.errors,u)}else t.errors=o;return o},K=async(s,o,u={valid:!0})=>{for(const h in s){const f=s[h];if(f){const{_f:c,...v}=f;if(c){const A=y.array.has(c.name),P=f._f&&xr(f._f);P&&g.validatingFields&&$([h],!0);const T=await ot(f,a,w,r.shouldUseNativeValidation&&!o,A);if(P&&g.validatingFields&&$([h]),T[c.name]&&(u.valid=!1,o))break;!o&&(d(T,c.name)?A?mr(t.errors,T,c.name):p(t.errors,c.name,T[c.name]):O(t.errors,c.name))}!H(v)&&await K(v,o,u)}}return u.valid},be=()=>{for(const s of y.unMount){const o=d(i,s);o&&(o._f.refs?o._f.refs.every(u=>!Pe(u)):!Pe(o._f.ref))&&De(s)}y.unMount=new Set},x=(s,o)=>(s&&o&&p(a,s,o),!ee(qe(),n)),V=(s,o,u)=>wt(s,y,{...l.mount?a:C(o)?n:J(s)?{[s]:o}:o},u,o),R=s=>we(d(l.mount?a:n,s,e.shouldUnregister?d(n,s,[]):[])),j=(s,o,u={})=>{const h=d(i,s);let f=o;if(h){const c=h._f;c&&(!c.disabled&&p(a,s,It(o,c)),f=Ae(c.ref)&&W(o)?"":o,Nt(c.ref)?[...c.ref.options].forEach(v=>v.selected=f.includes(v.value)):c.refs?ve(c.ref)?c.refs.length>1?c.refs.forEach(v=>(!v.defaultChecked||!v.disabled)&&(v.checked=Array.isArray(f)?!!f.find(A=>A===v.value):f===v.value)):c.refs[0]&&(c.refs[0].checked=!!f):c.refs.forEach(v=>v.checked=v.value===f):Be(c.ref)?c.ref.value="":(c.ref.value=f,c.ref.type||m.values.next({name:s,values:{...a}})))}(u.shouldDirty||u.shouldTouch)&&ne(s,f,u.shouldTouch,u.shouldDirty,!0),u.shouldValidate&&fe(s)},G=(s,o,u)=>{for(const h in o){const f=o[h],c=`${s}.${h}`,v=d(i,c);(y.array.has(s)||!Ee(f)||v&&!v._f)&&!ue(f)?G(c,f,u):j(c,f,u)}},z=(s,o,u={})=>{const h=d(i,s),f=y.array.has(s),c=q(o);p(a,s,c),f?(m.array.next({name:s,values:{...a}}),(g.isDirty||g.dirtyFields)&&u.shouldDirty&&m.state.next({name:s,dirtyFields:xe(n,a),isDirty:x(s,c)})):h&&!h._f&&!W(c)?G(s,c,u):j(s,c,u),rt(s,y)&&m.state.next({...t}),m.values.next({name:l.mount?s:void 0,values:{...a}})},ce=async s=>{l.mount=!0;const o=s.target;let u=o.name,h=!0;const f=d(i,u),c=()=>o.type?Te(f._f):xt(s),v=A=>{h=Number.isNaN(A)||ee(A,d(a,u,A))};if(f){let A,P;const T=c(),re=s.type===Ve.BLUR||s.type===Ve.FOCUS_OUT,Wt=!Fr(f._f)&&!r.resolver&&!d(t.errors,u)&&!f._f.deps||Vr(re,d(t.touchedFields,u),t.isSubmitted,M,I),Re=rt(u,y,re);p(a,u,T),re?(f._f.onBlur&&f._f.onBlur(s),b&&b(0)):f._f.onChange&&f._f.onChange(s);const Oe=ne(u,T,re,!1),qt=!H(Oe)||Re;if(!re&&m.values.next({name:u,type:s.type,values:{...a}}),Wt)return g.isValid&&(e.mode==="onBlur"?re&&U():U()),qt&&m.state.next({name:u,...Re?{}:Oe});if(!re&&Re&&m.state.next({...t}),r.resolver){const{errors:Je}=await te([u]);if(v(T),h){const Ht=lt(t.errors,i,u),Qe=lt(Je,i,Ht.name||u);A=Qe.error,u=Qe.name,P=H(Je)}}else $([u],!0),A=(await ot(f,a,w,r.shouldUseNativeValidation))[u],$([u]),v(T),h&&(A?P=!1:g.isValid&&(P=await K(i,!0)));h&&(f._f.deps&&fe(f._f.deps),ge(u,P,A,Oe))}},de=(s,o)=>{if(d(t.errors,o)&&s.focus)return s.focus(),1},fe=async(s,o={})=>{let u,h;const f=he(s);if(r.resolver){const c=await ae(C(s)?s:f);u=H(c),h=s?!f.some(v=>d(c,v)):u}else s?(h=(await Promise.all(f.map(async c=>{const v=d(i,c);return await K(v&&v._f?{[c]:v}:v)}))).every(Boolean),!(!h&&!t.isValid)&&U()):h=u=await K(i);return m.state.next({...!J(s)||g.isValid&&u!==t.isValid?{}:{name:s},...r.resolver||!s?{isValid:u}:{},errors:t.errors}),o.shouldFocus&&!h&&me(i,de,s?f:y.mount),h},qe=s=>{const o={...l.mount?a:n};return C(s)?o:J(s)?d(o,s):s.map(u=>d(o,u))},He=(s,o)=>({invalid:!!d((o||t).errors,s),isDirty:!!d((o||t).dirtyFields,s),error:d((o||t).errors,s),isValidating:!!d(t.validatingFields,s),isTouched:!!d((o||t).touchedFields,s)}),Lt=s=>{s&&he(s).forEach(o=>O(t.errors,o)),m.state.next({errors:s?t.errors:{}})},$e=(s,o,u)=>{const h=(d(i,s,{_f:{}})._f||{}).ref,f=d(t.errors,s)||{},{ref:c,message:v,type:A,...P}=f;p(t.errors,s,{...P,...o,ref:h}),m.state.next({name:s,errors:t.errors,isValid:!1}),u&&u.shouldFocus&&h&&h.focus&&h.focus()},Ut=(s,o)=>Z(s)?m.values.subscribe({next:u=>s(V(void 0,o),u)}):V(s,o,!0),De=(s,o={})=>{for(const u of s?he(s):y.mount)y.mount.delete(u),y.array.delete(u),o.keepValue||(O(i,u),O(a,u)),!o.keepError&&O(t.errors,u),!o.keepDirty&&O(t.dirtyFields,u),!o.keepTouched&&O(t.touchedFields,u),!o.keepIsValidating&&O(t.validatingFields,u),!r.shouldUnregister&&!o.keepDefaultValue&&O(n,u);m.values.next({values:{...a}}),m.state.next({...t,...o.keepDirty?{isDirty:x()}:{}}),!o.keepIsValid&&U()},Ke=({disabled:s,name:o,field:u,fields:h,value:f})=>{if(X(s)&&l.mount||s){const c=s?void 0:C(f)?Te(u?u._f:d(h,o)._f):f;p(a,o,c),ne(o,c,!1,!1,!0)}},Ne=(s,o={})=>{let u=d(i,s);const h=X(o.disabled)||X(e.disabled);return p(i,s,{...u||{},_f:{...u&&u._f?u._f:{ref:{name:s}},name:s,mount:!0,...o}}),y.mount.add(s),u?Ke({field:u,disabled:X(o.disabled)?o.disabled:e.disabled,name:s,value:o.value}):N(s,!0,o.value),{...h?{disabled:o.disabled||e.disabled}:{},...r.progressive?{required:!!o.required,min:ye(o.min),max:ye(o.max),minLength:ye(o.minLength),maxLength:ye(o.maxLength),pattern:ye(o.pattern)}:{},name:s,onChange:ce,onBlur:ce,ref:f=>{if(f){Ne(s,o),u=d(i,s);const c=C(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,v=br(c),A=u._f.refs||[];if(v?A.find(P=>P===c):c===u._f.ref)return;p(i,s,{_f:{...u._f,...v?{refs:[...A.filter(Pe),c,...Array.isArray(d(n,s))?[{}]:[]],ref:{type:c.type,name:s}}:{ref:c}}}),N(s,!1,void 0,c)}else u=d(i,s,{}),u._f&&(u._f.mount=!1),(r.shouldUnregister||o.shouldUnregister)&&!(Ft(y.array,s)&&l.action)&&y.unMount.add(s)}}},ze=()=>r.shouldFocusError&&me(i,de,y.mount),jt=s=>{X(s)&&(m.state.next({disabled:s}),me(i,(o,u)=>{const h=d(i,u);h&&(o.disabled=h._f.disabled||s,Array.isArray(h._f.refs)&&h._f.refs.forEach(f=>{f.disabled=h._f.disabled||s}))},0,!1))},Xe=(s,o)=>async u=>{let h;u&&(u.preventDefault&&u.preventDefault(),u.persist&&u.persist());let f=q(a);if(m.state.next({isSubmitting:!0}),r.resolver){const{errors:c,values:v}=await te();t.errors=c,f=v}else await K(i);if(O(t.errors,"root"),H(t.errors)){m.state.next({errors:{}});try{await s(f,u)}catch(c){h=c}}else o&&await o({...t.errors},u),ze(),setTimeout(ze);if(m.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:H(t.errors)&&!h,submitCount:t.submitCount+1,errors:t.errors}),h)throw h},Bt=(s,o={})=>{d(i,s)&&(C(o.defaultValue)?z(s,q(d(n,s))):(z(s,o.defaultValue),p(n,s,q(o.defaultValue))),o.keepTouched||O(t.touchedFields,s),o.keepDirty||(O(t.dirtyFields,s),t.isDirty=o.defaultValue?x(s,q(d(n,s))):x()),o.keepError||(O(t.errors,s),g.isValid&&U()),m.state.next({...t}))},Ge=(s,o={})=>{const u=s?q(s):n,h=q(u),f=H(s),c=f?n:h;if(o.keepDefaultValues||(n=u),!o.keepValues){if(o.keepDirtyValues)for(const v of y.mount)d(t.dirtyFields,v)?p(c,v,d(a,v)):z(v,d(c,v));else{if(Le&&C(s))for(const v of y.mount){const A=d(i,v);if(A&&A._f){const P=Array.isArray(A._f.refs)?A._f.refs[0]:A._f.ref;if(Ae(P)){const T=P.closest("form");if(T){T.reset();break}}}}i={}}a=e.shouldUnregister?o.keepDefaultValues?q(n):{}:q(c),m.array.next({values:{...c}}),m.values.next({values:{...c}})}y={mount:o.keepDirtyValues?y.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},l.mount=!g.isValid||!!o.keepIsValid||!!o.keepDirtyValues,l.watch=!!e.shouldUnregister,m.state.next({submitCount:o.keepSubmitCount?t.submitCount:0,isDirty:f?!1:o.keepDirty?t.isDirty:!!(o.keepDefaultValues&&!ee(s,n)),isSubmitted:o.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:f?{}:o.keepDirtyValues?o.keepDefaultValues&&a?xe(n,a):t.dirtyFields:o.keepDefaultValues&&s?xe(n,s):o.keepDirty?t.dirtyFields:{},touchedFields:o.keepTouched?t.touchedFields:{},errors:o.keepErrors?t.errors:{},isSubmitSuccessful:o.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},Ye=(s,o)=>Ge(Z(s)?s(a):s,o);return{control:{register:Ne,unregister:De,getFieldState:He,handleSubmit:Xe,setError:$e,_executeSchema:te,_getWatch:V,_getDirty:x,_updateValid:U,_removeUnmounted:be,_updateFieldArray:F,_updateDisabledField:Ke,_getFieldArray:R,_reset:Ge,_resetDefaultValues:()=>Z(r.defaultValues)&&r.defaultValues().then(s=>{Ye(s,r.resetOptions),m.state.next({isLoading:!1})}),_updateFormState:s=>{t={...t,...s}},_disableForm:jt,_subjects:m,_proxyFormState:g,_setErrors:B,get _fields(){return i},get _formValues(){return a},get _state(){return l},set _state(s){l=s},get _defaultValues(){return n},get _names(){return y},set _names(s){y=s},get _formState(){return t},set _formState(s){t=s},get _options(){return r},set _options(s){r={...r,...s}}},trigger:fe,register:Ne,handleSubmit:Xe,watch:Ut,setValue:z,getValues:qe,reset:Ye,resetField:Bt,clearErrors:Lt,unregister:De,setError:$e,setFocus:(s,o={})=>{const u=d(i,s),h=u&&u._f;if(h){const f=h.refs?h.refs[0]:h.ref;f.focus&&(f.focus(),o.shouldSelect&&f.select())}},getFieldState:He}}function Wr(e={}){const r=E.useRef(),t=E.useRef(),[i,n]=E.useState({isDirty:!1,isValidating:!1,isLoading:Z(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:Z(e.defaultValues)?void 0:e.defaultValues});r.current||(r.current={...Er(e),formState:i});const a=r.current.control;return a._options=e,je({subject:a._subjects.state,next:l=>{Et(l,a._proxyFormState,a._updateFormState,!0)&&n({...a._formState})}}),E.useEffect(()=>a._disableForm(e.disabled),[a,e.disabled]),E.useEffect(()=>{if(a._proxyFormState.isDirty){const l=a._getDirty();l!==i.isDirty&&a._subjects.state.next({isDirty:l})}},[a,i.isDirty]),E.useEffect(()=>{e.values&&!ee(e.values,t.current)?(a._reset(e.values,a._options.resetOptions),t.current=e.values,n(l=>({...l}))):a._resetDefaultValues()},[e.values,a]),E.useEffect(()=>{e.errors&&a._setErrors(e.errors)},[e.errors,a]),E.useEffect(()=>{a._state.mount||(a._updateValid(),a._state.mount=!0),a._state.watch&&(a._state.watch=!1,a._subjects.state.next({...a._formState})),a._removeUnmounted()}),E.useEffect(()=>{e.shouldUnregister&&a._subjects.values.next({values:a._getWatch()})},[e.shouldUnregister,a]),r.current.formState=pt(i,a),r.current}const qr=cr,Pt=k.createContext({}),Hr=({...e})=>L.jsx(Pt.Provider,{value:{name:e.name},children:L.jsx(hr,{...e})}),Se=()=>{const e=k.useContext(Pt),r=k.useContext(Tt),{getFieldState:t,formState:i}=Ce(),n=t(e.name,i);if(!e)throw new Error("useFormField should be used within <FormField>");const{id:a}=r;return{id:a,name:e.name,formItemId:`${a}-form-item`,formDescriptionId:`${a}-form-item-description`,formMessageId:`${a}-form-item-message`,...n}},Tt=k.createContext({}),kr=k.forwardRef(({className:e,...r},t)=>{const i=k.useId();return L.jsx(Tt.Provider,{value:{id:i},children:L.jsx("div",{ref:t,className:le("space-y-2",e),...r})})});kr.displayName="FormItem";const wr=k.forwardRef(({className:e,...r},t)=>{const{error:i,formItemId:n}=Se();return L.jsx(Qt,{ref:t,className:le(i&&"text-destructive",e),htmlFor:n,...r})});wr.displayName="FormLabel";const Cr=k.forwardRef(({...e},r)=>{const{error:t,formItemId:i,formDescriptionId:n,formMessageId:a}=Se();return L.jsx(zt,{ref:r,id:i,"aria-describedby":t?`${n} ${a}`:`${n}`,"aria-invalid":!!t,...e})});Cr.displayName="FormControl";const Sr=k.forwardRef(({className:e,...r},t)=>{const{formDescriptionId:i}=Se();return L.jsx("p",{ref:t,id:i,className:le("text-[0.8rem] text-muted-foreground",e),...r})});Sr.displayName="FormDescription";const Dr=k.forwardRef(({className:e,children:r,...t},i)=>{const{error:n,formMessageId:a}=Se(),l=n?String(n==null?void 0:n.message):r;return l?L.jsx("p",{ref:i,id:a,className:le("text-[0.8rem] font-medium text-destructive",e),...t,children:l}):null});Dr.displayName="FormMessage";const ct=(e,r,t)=>{if(e&&"reportValidity"in e){const i=d(t,r);e.setCustomValidity(i&&i.message||""),e.reportValidity()}},Mt=(e,r)=>{for(const t in r.fields){const i=r.fields[t];i&&i.ref&&"reportValidity"in i.ref?ct(i.ref,t,e):i.refs&&i.refs.forEach(n=>ct(n,t,e))}},Nr=(e,r)=>{r.shouldUseNativeValidation&&Mt(e,r);const t={};for(const i in e){const n=d(r.fields,i),a=Object.assign(e[i]||{},{ref:n&&n.ref});if(Rr(r.names||Object.keys(e),i)){const l=Object.assign({},d(t,i));p(l,"root",a),p(t,i,l)}else p(t,i,a)}return t},Rr=(e,r)=>e.some(t=>t.startsWith(r+"."));var Or=function(e,r){for(var t={};e.length;){var i=e[0],n=i.code,a=i.message,l=i.path.join(".");if(!t[l])if("unionErrors"in i){var y=i.unionErrors[0].errors[0];t[l]={message:y.message,type:y.code}}else t[l]={message:a,type:n};if("unionErrors"in i&&i.unionErrors.forEach(function(g){return g.errors.forEach(function(m){return e.push(m)})}),r){var b=t[l].types,_=b&&b[i.code];t[l]=Ct(l,r,t,n,_?[].concat(_,i.message):i.message)}e.shift()}return t},$r=function(e,r,t){return t===void 0&&(t={}),function(i,n,a){try{return Promise.resolve(function(l,y){try{var b=Promise.resolve(e[t.mode==="sync"?"parse":"parseAsync"](i,r)).then(function(_){return a.shouldUseNativeValidation&&Mt({},a),{errors:{},values:t.raw?i:_}})}catch(_){return y(_)}return b&&b.then?b.then(void 0,y):b}(0,function(l){if(function(y){return Array.isArray(y==null?void 0:y.errors)}(l))return{values:{},errors:Nr(Or(l.errors,!a.shouldUseNativeValidation&&a.criteriaMode==="all"),a)};throw l}))}catch(l){return Promise.reject(l)}}};export{or as C,qr as F,Hr as a,kr as b,wr as c,Cr as d,Dr as e,Sr as f,$r as t,Wr as u};