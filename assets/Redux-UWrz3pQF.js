import{c as h,d,e as u,f as j,p as t,u as m,g as p,s as g,h as R,j as s,L as a,R as c,B as f,i as L,P,O as v}from"./index-BQp9rYG8.js";import{B}from"./BackToHome-FFI-LIuU.js";import{r as n,l as U}from"./userReducer-DZ6toMv3.js";h({products:d,cart:u,user:n});const C=j({reducer:{products:d,cart:u,user:n,[t.reducerPath]:t.reducer},middleware:e=>[...e(),t.middleware]}),I=()=>{var o;const e=m(),i=p(g),{isUserLoggedIn:r,loggedInUser:l}=R(),x=()=>{e(U()),e(L())};return s.jsxs("nav",{className:"products-navbar",children:[r()&&s.jsxs("h4",{children:["Hi, ",(o=l())==null?void 0:o.name]}),s.jsx(a,{to:c.REDUX,children:"Products"}),s.jsxs(a,{to:c.CART,children:["Cart ",s.jsx("sup",{children:i})]}),!r()&&s.jsx(a,{to:c.LOGIN,children:"Login"}),r()&&s.jsx(f,{text:"Logout",hadnleClick:x})]})},k=()=>s.jsxs("div",{className:"context",children:[s.jsx(B,{}),s.jsx("h2",{children:"Redux"}),s.jsxs(P,{store:C,children:[s.jsx(I,{}),s.jsx(v,{})]})]});export{k as default};