import{r as d,j as e,B as m,b as S}from"./index-DKICf-qK.js";import{B as T}from"./BackToHome-qTPm0zq2.js";const k=(s,l)=>{switch(l.type){case"add":const t=l.value;return t.id=new Date().getTime(),{...s,posts:[...s.posts,t]};case"delete":const o=s.posts.filter(r=>r.id!==l.value);return{...s,posts:o};case"update":const a=s.posts.map(r=>r.id===l.value.id?l.value:r);return{...s,posts:a};default:return s}},C={posts:[]},y={state:C,showForm:!1,editPost:null,updateStore:()=>{},toggleForm:()=>{},editPostForm:()=>{}},g=d.createContext(y),w=({children:s})=>{const[l,t]=d.useReducer(k,C),[o,a]=d.useState(!1),[r,u]=d.useState(null),n=x=>{t(x)},h=x=>{a(x)},v=x=>{u(x)},f=d.useMemo(()=>({state:l,updateStore:n,showForm:o,toggleForm:h,editPost:r,editPostForm:v}),[l,o,r]);return e.jsx(g.Provider,{value:f,children:s})},b=({tagsList:s,hadleClick:l})=>s!=null&&s.length?e.jsx("div",{className:"tags",children:s.map((t,o)=>e.jsx("p",{role:"tag",onClick:()=>l?l(o):!1,children:t},o))}):null,D=()=>{const{updateStore:s,toggleForm:l,editPost:t}=d.useContext(g),[o,a]=d.useState((t==null?void 0:t.tags)??[]),[r,u]=d.useState(null),n=i=>{i.preventDefault();const c=i.target;if(f(c)){u(null);const p=new FormData(c),j=Object.fromEntries(p);s({type:t!=null&&t.id?"update":"add",value:{...t,...j,tags:o}}),c.reset(),a([]),x()}},h=i=>{if(i.keyCode===13){i.stopPropagation();const c=i.target.value.trim();c.length&&a(p=>[...p,c]),i.target.value=""}},v=i=>{o.splice(i,1),a([...o])},f=i=>{var p,j;let c=!0;return(!i.title.value||((p=i.title.value)==null?void 0:p.length)<3)&&(u(F=>({...F,title:"title error"})),c=!1),(!i.description.value||((j=i.description.value)==null?void 0:j.length)<3)&&(u(F=>({...F,description:"description error"})),c=!1),c},x=()=>{l(!1)},P=d.useMemo(()=>e.jsx("h3",{children:t!=null&&t.id?"Edit Post":"Add Post"}),[t]);return e.jsxs("div",{className:"form",onSubmit:n,children:[P,e.jsxs("form",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"title",children:"Title"}),e.jsx("input",{type:"text",name:"title",id:"title",placeholder:"Title",defaultValue:t==null?void 0:t.title,required:!0}),(r==null?void 0:r.title)&&e.jsx("span",{children:r.title})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"description",children:"Description"}),e.jsx("textarea",{name:"description",id:"description",placeholder:"Description",defaultValue:t==null?void 0:t.description,required:!0}),(r==null?void 0:r.description)&&e.jsx("span",{children:r.description})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"tags",children:"Tags"}),e.jsx("textarea",{name:"tags",id:"tags",placeholder:"Type tag and click enter key to add tags",onKeyDown:h}),(o==null?void 0:o.length)>0&&e.jsx(b,{tagsList:o,hadleClick:v})]}),e.jsxs("div",{className:"form-btn-group",children:[e.jsx(m,{text:"Submit",type:"submit"}),e.jsx(m,{text:"Close",hadnleClick:x})]})]})]})},E=({post:s,editPost:l,deletePost:t})=>e.jsxs("div",{className:"post-actions-btn-group",children:[e.jsx(m,{text:"Edit",hadnleClick:()=>l(s)}),e.jsx(m,{text:"Delete",hadnleClick:()=>t(s)})]}),N=()=>{var u;const{state:s,updateStore:l,toggleForm:t,editPostForm:o}=d.useContext(g),a=n=>{t(!0),o(n)},r=n=>{l({type:"delete",value:n.id})};return e.jsxs("div",{className:"list",children:[e.jsx("h3",{children:"Posts"}),e.jsx("section",{children:(u=s==null?void 0:s.posts)!=null&&u.length?s.posts.map(n=>{var h;return e.jsxs("div",{children:[e.jsx("h4",{children:n.title}),e.jsx("p",{children:n.description}),((h=n==null?void 0:n.tags)==null?void 0:h.length)>0&&e.jsx(b,{tagsList:n.tags}),e.jsx(E,{post:n,editPost:a,deletePost:r})]},n.id)}):e.jsx("p",{children:"No posts available"})})]})},B=({closeModal:s,children:l})=>S.createPortal(e.jsxs("div",{className:"modal-wrapper",children:[e.jsx(m,{text:"Close Modal",hadnleClick:s}),l]}),document.getElementById("portal")),M=()=>{const{showForm:s,toggleForm:l,editPostForm:t}=d.useContext(g),o=()=>{l(!0),t(null)},a=()=>{l(!1),t(null)};return e.jsxs("div",{className:"context-layout",children:[e.jsx(m,{text:"Add Post",hadnleClick:o,classTitle:"add-form-btn"}),s&&e.jsx(B,{closeModal:a,children:e.jsx(D,{})}),e.jsx(N,{})]})},V=()=>e.jsxs("div",{className:"context",children:[e.jsx(T,{}),e.jsxs(w,{children:[e.jsx("h2",{children:"Context + Reducer"}),e.jsx(M,{})]})]});export{V as default};