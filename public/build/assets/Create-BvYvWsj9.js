import{W as m,r as x,j as e}from"./app-D6fkvZbA.js";import{I as c}from"./InputError-98kNegpX.js";import{A as j,I as h,B as p,J as C}from"./AuthenticatedLayout-CcBeljlA.js";import{C as f,a as y,b as S,c as v}from"./card-8DjiWBJf.js";import{L as n}from"./label-DRukCHiJ.js";import{S as g,a as b,b as L,c as I,d as s}from"./select-DYZRsoEN.js";import"./index-CP3OEn7_.js";import"./tslib.es6-M_FJ09fS.js";const D=()=>{const{post:o,data:t,setData:r,processing:l,errors:i,reset:d}=m({name:"",layout:""});x.useState("");const u=a=>{a.preventDefault(),o(route("certificate-types.store"),{onSuccess:()=>{C.success("Certificate Type Created"),d()}})};return e.jsx(j,{children:e.jsxs(f,{className:"max-w-xl",children:[e.jsx(y,{children:e.jsx(S,{children:"Create Certificate Type"})}),e.jsx(v,{children:e.jsxs("form",{onSubmit:u,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(n,{children:"Name"}),e.jsx(h,{value:t.name,onChange:a=>r("name",a.target.value)}),e.jsx(c,{message:i.name})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Layout"}),e.jsxs(g,{value:t.layout,defaultValue:t.layout,onValueChange:a=>r("layout",a),children:[e.jsx(b,{children:e.jsx(L,{placeholder:"Select a layout"})}),e.jsxs(I,{children:[e.jsx(s,{value:"letter",children:"Letter"}),e.jsx(s,{value:"letter_WAH",children:"WAH Letter"}),e.jsx(s,{value:"card",children:"Card"})]})]}),e.jsx(c,{message:i.layout})]}),e.jsx("div",{children:e.jsx(p,{isLoading:l,disabled:l,children:"Create"})})]})})]})})};export{D as default};
