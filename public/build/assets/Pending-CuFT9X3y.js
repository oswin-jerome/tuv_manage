import{r as x,j as e,a as n}from"./app-CJgLv7Di.js";import{B as c}from"./badge-KpeYWvBa.js";import{A as h,c as i,B as l}from"./AuthenticatedLayout-CGp-T8oJ.js";import{C as p,c as j}from"./card-Cs-OHDG7.js";import{T as u,a as f,b as o,c as r,d as v,e as a}from"./table-BHEYbjdk.js";import{h as N}from"./moment-C5S46NFB.js";import{E as b}from"./eye-C1HH7Otu.js";import{S as g}from"./square-pen-DyHS41gt.js";import{T as y}from"./trash-2-CWMUFrzp.js";function k({certificates:t}){return x.useState(""),e.jsx(h,{children:e.jsx(p,{children:e.jsx(j,{children:e.jsxs("div",{className:"container mx-auto py-10",children:[e.jsx("div",{className:"flex justify-between",children:e.jsx("div",{children:e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Pending Approval"})})}),e.jsx("div",{className:"rounded-md border",children:e.jsxs(u,{children:[e.jsx(f,{children:e.jsxs(o,{children:[e.jsx(r,{children:"Certifier / Equipment Name"}),e.jsx(r,{children:"Company"}),e.jsx(r,{children:"Expire"}),e.jsx(r,{children:"Approved"}),e.jsx(r,{children:"Actions"})]})}),e.jsx(v,{children:t.map(s=>{var d;return e.jsxs(o,{children:[e.jsx(a,{className:"font-medium",children:s.certifier_name}),e.jsx(a,{className:"font-medium",children:(d=s.company)==null?void 0:d.name}),e.jsx(a,{className:"font-medium",children:e.jsx("span",{className:i({"text-red-500":s.isExpired}),children:s.expireAt==null?"Not Applicable":N(s.expireAt).format("D MMM Y")})}),e.jsx(a,{className:"font-medium",children:e.jsx(c,{variant:"secondary",className:i({"text-orange-500 bg-orange-100":s.approval_status=="pending","text-red-500 bg-red-100":s.approval_status=="rejected","text-green-500 bg-green-100":s.approval_status=="approved"}),children:s.approval_status})}),e.jsx(a,{children:e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(n,{href:route("certificates.show",s.id),children:e.jsx(l,{variant:"outline",size:"icon",children:e.jsx(b,{className:"h-4 w-4"})})}),e.jsx(n,{href:route("certificates.edit",s.id),children:e.jsx(l,{variant:"outline",size:"icon",children:e.jsx(g,{className:"h-4 w-4"})})}),e.jsx(n,{href:route("certificates.destroy",s.id),method:"delete",onClick:m=>{confirm("Are you sure?")||m.preventDefault()},children:e.jsx(l,{variant:"outline",size:"icon",children:e.jsx(y,{className:"h-4 w-4"})})})]})})]},s.id)})})]})})]})})})})}export{k as default};