import{u as x,q as f,g as j,r as i,R as l,j as s}from"./index-9IkskKFm.js";import{a as g}from"./userReducer-JPe6zHhI.js";import{w}from"./withPageTitle-DJjxIVNU.js";const E=({handleSubmit:r})=>{const d=x(),a=f(),o=j(e=>e.user),[c,n]=i.useState(!1),m=e=>{e.preventDefault();const p=new FormData(e.target),t=Object.fromEntries(p),{name:u,password:h}=t;if(!u.length||!h.length){n(!0);return}n(!1),d(g(t)),r==null||r(t),a(l.REDUX)};return i.useEffect(()=>{o&&a(l.REDUX)},[o]),s.jsxs(s.Fragment,{children:[s.jsxs("form",{onSubmit:m,"data-testid":"form",children:[s.jsxs("div",{children:[s.jsx("label",{htmlFor:"name",children:"Name"}),s.jsx("input",{id:"name",type:"text",name:"name",placeholder:"name"})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"password",children:"Password"}),s.jsx("input",{id:"password",type:"password",name:"password",placeholder:"password"})]}),s.jsx("div",{children:s.jsx("button",{type:"submit",children:"Submit"})})]}),c&&s.jsx("p",{role:"error",style:{color:"red"},children:"Name and Password values are required"})]})},R=w(E,"Login");export{R as default};