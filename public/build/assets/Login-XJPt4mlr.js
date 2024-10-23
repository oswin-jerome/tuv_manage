import{j as e,W as p,Y as j}from"./app-BjkJPj65.js";import{I as l}from"./InputError-DIl38pEF.js";import{I as i}from"./InputLabel-BTUXMS6X.js";import{P as h}from"./PrimaryButton-DfMKCAEl.js";import{T as n}from"./TextInput-CmPPHa5X.js";import{G as f}from"./GuestLayout-Ctld_IOf.js";function g({className:a="",...t}){return e.jsx("input",{...t,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+a})}function C({status:a,canResetPassword:t}){const{data:r,setData:m,post:d,processing:c,errors:o,reset:u}=p({email:"",password:"",remember:!1}),x=s=>{s.preventDefault(),d(route("login"),{onFinish:()=>u("password")})};return e.jsxs(f,{children:[e.jsx(j,{title:"Log in"}),a&&e.jsx("div",{className:"mb-4 text-sm font-medium text-green-600",children:a}),e.jsxs("form",{onSubmit:x,children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"email",value:"Email"}),e.jsx(n,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:s=>m("email",s.target.value)}),e.jsx(l,{message:o.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"password",value:"Password"}),e.jsx(n,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>m("password",s.target.value)}),e.jsx(l,{message:o.password,className:"mt-2"})]}),e.jsx("div",{className:"mt-4 block",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(g,{name:"remember",checked:r.remember,onChange:s=>m("remember",s.target.checked)}),e.jsx("span",{className:"ms-2 text-sm text-gray-600",children:"Remember me"})]})}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsx(h,{className:"ms-4",disabled:c,children:"Log in"})})]})]})}export{C as default};