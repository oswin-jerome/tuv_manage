import{W as m,r as x,j as e}from"./app-CJgLv7Di.js";import{I as i}from"./InputError-COKXyC0H.js";import{A as j,I as h,B as p,J as C}from"./AuthenticatedLayout-CGp-T8oJ.js";import{C as f,a as y,b as v,c as S}from"./card-Cs-OHDG7.js";import{L as n}from"./label-D-CNqoFC.js";import{S as g,a as b,b as L,c as I,d as t}from"./select-BrwZrcie.js";import"./index-VXD0VXvr.js";import"./tslib.es6-M_FJ09fS.js";const k=()=>{const{post:o,data:s,setData:r,processing:l,errors:c,reset:d}=m({name:"",layout:""});x.useState("");const u=a=>{a.preventDefault(),o(route("certificate-types.store"),{onSuccess:()=>{C.success("Certificate Type Created"),d()}})};return e.jsx(j,{children:e.jsxs(f,{className:"max-w-xl",children:[e.jsx(y,{children:e.jsx(v,{children:"Create Certificate Type"})}),e.jsx(S,{children:e.jsxs("form",{onSubmit:u,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(n,{children:"Name"}),e.jsx(h,{value:s.name,onChange:a=>r("name",a.target.value)}),e.jsx(i,{message:c.name})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Layout"}),e.jsxs(g,{value:s.layout,defaultValue:s.layout,onValueChange:a=>r("layout",a),children:[e.jsx(b,{children:e.jsx(L,{placeholder:"Select a layout"})}),e.jsxs(I,{children:[e.jsx(t,{value:"letter",children:"Letter"}),e.jsx(t,{value:"letter_WAH",children:"WAH Letter"}),e.jsx(t,{value:"card",children:"Card"}),e.jsx(t,{value:"card_noback",children:"Card No Back"})]})]}),e.jsx(i,{message:c.layout})]}),e.jsx("div",{children:e.jsx(p,{isLoading:l,disabled:l,children:"Create"})})]})})]})})};export{k as default};
