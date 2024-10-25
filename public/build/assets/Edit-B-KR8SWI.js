import{r as j,W as I,j as e,y as _}from"./app-CJgLv7Di.js";import{I as d}from"./InputError-COKXyC0H.js";import{A as P,I as o,c as U,B as h,J as u}from"./AuthenticatedLayout-CGp-T8oJ.js";import{C as V,a as k,b as J,c as M}from"./card-Cs-OHDG7.js";import{L as l}from"./label-D-CNqoFC.js";import{S as v,a as C,b as y,c as S,d as A}from"./select-BrwZrcie.js";import{T as B}from"./textarea-DJ96-xm7.js";import{J as L}from"./jodit-react-DHqiTza1.js";import{h as b}from"./moment-C5S46NFB.js";/* empty css                   */import"./index-VXD0VXvr.js";import"./tslib.es6-M_FJ09fS.js";const ee=({certificateTypes:c,certificate:i,companies:x})=>{var g;const[m,N]=j.useState(c.find(s=>s.id===i.certificate_type_id)),w=j.useRef(null);j.useEffect(()=>{(m==null?void 0:m.id)===i.certificate_type_id?a("customFields",i.custom_fields):a("customFields",m.custom_fields)},[m]);const{post:E,data:t,setData:a,processing:p,errors:n,reset:R,hasErrors:q,transform:D}=I({certifier_name:i.certifier_name,certificate_name:i.certificate_name,iqama:i.iqama,company_id:i.company_id.toString(),project:i.project,ref_no:i.ref_no,witness:i.witness,issuedAt:i.issuedAt.toString(),expireAt:((g=i.expireAt)==null?void 0:g.toString())??"",certificate_type_id:i.certificate_type_id.toString(),customFields:[],image:null,_method:"PUT"}),F=s=>{s.preventDefault(),console.log(t),D(r=>({...r,_method:"PUT"})),E(route("certificates.update",i.id),{onSuccess:r=>{u.warning("Updated!!!"),_.reload()},onError:r=>{r["*"]&&u.error(r["*"])}})};return e.jsx(P,{children:e.jsxs(V,{className:"",children:[e.jsx(k,{children:e.jsx(J,{children:"Edit Certificate Type"})}),e.jsxs(M,{children:[q&&e.jsx("p",{children:"Oops"}),e.jsxs("form",{onSubmit:F,className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(l,{children:"Certificate Type"}),e.jsxs(v,{required:!0,value:t.certificate_type_id,onValueChange:s=>{a("certificate_type_id",s),N(c.find(r=>r.id==parseInt(s)))},children:[e.jsx(C,{className:"",children:e.jsx(y,{placeholder:"Select a type"})}),e.jsx(S,{children:c==null?void 0:c.map(s=>e.jsx(A,{value:s.id.toString(),children:s.name}))})]}),e.jsx(d,{message:n.certificate_type_id})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Certifier / Equipment Name"}),e.jsx(o,{value:t.certifier_name,onChange:s=>a("certifier_name",s.target.value)}),e.jsx(d,{message:n.certifier_name})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Photo"}),e.jsx(o,{type:"file",onChange:s=>{var r;return a("image",(r=s.target.files)==null?void 0:r.item(0))}}),e.jsx(d,{message:n.image})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Certificate Name"}),e.jsx(o,{value:t.certificate_name,onChange:s=>a("certificate_name",s.target.value)}),e.jsx(d,{message:n.certificate_name})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Iqama"}),e.jsx(o,{value:t.iqama,onChange:s=>a("iqama",s.target.value)}),e.jsx(d,{message:n.iqama})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Company"}),e.jsxs(v,{required:!0,defaultValue:t.company_id,onValueChange:s=>{a("company_id",s)},children:[e.jsx(C,{className:"",children:e.jsx(y,{placeholder:"Select a type"})}),e.jsx(S,{children:x==null?void 0:x.map(s=>e.jsx(A,{value:s.id.toString(),children:s.name}))})]}),e.jsx(d,{message:n.company_id})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Project"}),e.jsx(o,{value:t.project,onChange:s=>a("project",s.target.value)}),e.jsx(d,{message:n.project})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Ref #"}),e.jsx(o,{disabled:!0,value:t.ref_no,onChange:s=>a("ref_no",s.target.value)}),e.jsx(d,{message:n.ref_no})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Witness"}),e.jsx(o,{value:t.witness,onChange:s=>a("witness",s.target.value)}),e.jsx(d,{message:n.witness})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Issued At"}),e.jsx(o,{type:"date",value:b(t.issuedAt).format("Y-MM-DD"),onChange:s=>a("issuedAt",s.target.value)}),e.jsx(d,{message:n.issuedAt})]}),e.jsxs("div",{children:[e.jsx(l,{children:"Expires At"}),e.jsx(o,{type:"date",value:b(t.expireAt).format("Y-MM-DD"),onChange:s=>a("expireAt",s.target.value)}),e.jsx(d,{message:n.expireAt})]}),e.jsx("div",{className:"font-semibold md:col-span-2 mt-10",children:"Custom fields"}),(t==null?void 0:t.customFields)&&(t==null?void 0:t.customFields.map(s=>e.jsxs("div",{className:U({"md:col-span-2":s.type=="custom"}),children:[e.jsxs("div",{className:"flex justify-between items-center mb-1",children:[e.jsx(l,{children:s.label}),e.jsx(h,{onClick:r=>{r.preventDefault(),console.log(t.certificate_type_id,s.custom_field_id),_.put(route("customFields.update",[t.certificate_type_id,s.custom_field_id]),{default_value:s.value},{onSuccess:()=>{u.info("Updated")},onError:f=>{console.log(f),u.error(f.error)}})},size:"sm",variant:"link",children:"Set as default"})]}),e.jsxs("div",{className:"prose max-w-full list-disc",children:[s.type=="text"&&e.jsx(B,{defaultValue:s.value??s.default_value,onChange:r=>{s.value=r.target.value}},s+"input"),s.type=="custom"&&e.jsx(L,{className:"prose max-w-full list-disc",ref:w,config:{inline:!0},value:s.value??s.default_value,onBlur:r=>{s.value=r},onChange:r=>{}}),e.jsx(d,{message:n.customFields})]})]},s.id))),e.jsxs("div",{className:"md:col-span-2 pt-8",children:[e.jsx(h,{isLoading:p,disabled:p,children:"Update"}),e.jsx("br",{})]})]}),e.jsx("a",{target:"__blank",href:route("certificates.pdf",i.id),children:e.jsx(h,{children:"Preview PDF"})})]})]})})};export{ee as default};