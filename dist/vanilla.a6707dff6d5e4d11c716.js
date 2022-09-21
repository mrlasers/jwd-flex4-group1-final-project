(()=>{"use strict";var e={389:(e,t,r)=>{r.r(t)},791:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)};t.__esModule=!0,t.attachEventListeners=void 0;var o=r(983);t.attachEventListeners=function(e){var t=e.document,r=e.dispatch,a=e.getState;t.addEventListener("focusin",(function(e){var t=e.target;if(t instanceof HTMLElement&&t instanceof HTMLInputElement&&t.matches(".overflow")){var r=Number(t.getAttribute("data-selectionStart")),n=Number(t.getAttribute("data-selectionEnd"));t.setSelectionRange(r,n),t.removeAttribute("data-selectionStart"),t.removeAttribute("data-selectionEnd")}})),t.addEventListener("focusout",(function(e){var t=e.target;t instanceof HTMLElement&&t instanceof HTMLInputElement&&t.matches(".overflow")&&(t.setAttribute("data-selectionStart",String(t.selectionStart)),t.setAttribute("data-selectionEnd",String(t.selectionEnd)),t.selectionStart=0,t.selectionEnd=0)})),t.addEventListener("input",(function(e){var t,n=e.target;n instanceof HTMLElement&&n instanceof HTMLInputElement&&(n.matches("#username")&&(null==r||r({type:"UPDATE_USERNAME",payload:n.value})),n.matches("#newTodoForm input")&&(null==n?void 0:n.name)&&(n.matches(".tilelist input")&&(e.preventDefault(),null===(t=n.closest(".tilelist"))||void 0===t||t.classList.remove("active")),null==r||r({type:"UPDATE_FORM",payload:{name:n.name,value:n.value}})))})),t.addEventListener("submit",(function(e){var t=e.target;if(t instanceof HTMLElement&&t.matches("#newTodoForm")){e.preventDefault();var i=null==a?void 0:a().form.data;if(!i)throw new Error("This should probably be an impossible state, brud.");t.querySelectorAll("input[type=text]").forEach((function(e){e instanceof HTMLInputElement&&(e.value="")}));var l=t.querySelector("input[type=text]");null==l||l.focus(),null==r||r({type:"ADD_TODO",payload:n({id:(0,o.nanoid)()},i)})}})),t.addEventListener("click",(function(e){var t,r=e.target;r instanceof HTMLElement&&r.matches(".tilelist header")&&(e.preventDefault(),null===(t=r.closest(".tilelist"))||void 0===t||t.classList.toggle("active"))}))}},718:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)},o=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r};t.__esModule=!0,t.saveState=t.loadState=void 0;var a=r(175),i=r(731),l="saved-todo-state",s=[{id:"work",name:"Work"},{id:"fun",name:"Fun"}],c={username:"",todos:[],categories:s,selectedCategory:s[0].id,form:{invalid:[],data:(0,i.getEmptyFormData)(s[0].id)}};t.loadState=function(){var e=localStorage.getItem(l);if(null===e)return c;var t=(0,a.tryCatch)((function(){return JSON.parse(e)})),r=t.result;return t.error,r?n(n({},c),r):c},t.saveState=function(e){var t=e.username,r=e.todos,n=e.categories,a=e.selectedCategory,i=(o(e,["username","todos","categories","selectedCategory"]),{username:t,todos:r,categories:n,selectedCategory:a});localStorage.setItem(l,JSON.stringify(i))}},175:(e,t)=>{t.__esModule=!0,t.tryCatch=void 0,t.tryCatch=function(e){try{return{result:e(),error:null}}catch(e){return{result:null,error:String(e)}}}},809:(e,t)=>{t.__esModule=!0,t.render=void 0;var r=null;t.render=function(e){var t,n,o;e.selectedCategory!==(null==r?void 0:r.selectedCategory)&&(document.querySelector("#categories ul").innerHTML=e.categories.map((o=e.selectedCategory,function(e){return'<li>\n              <label>\n                <input\n                  type="radio"\n                  name="category"\n                  value="'.concat(e.id,'"\n                  ').concat(e.id===o?"checked":"",'\n                  required\n                />\n                <b class="bubble" ></b>\n                ').concat(e.name,"\n              </label>\n            </li>")})).join("\n")),e.username!==(null==r?void 0:r.username)&&(document.title=e.username?"".concat(e.username,"’s Tasks"):"Your Tasks"),e.todos!==(null==r?void 0:r.todos)&&e.todos.length>0&&(document.getElementById("todoList").innerHTML="<ul>"+e.todos.map((function(e){return"<h2>".concat(e.title,"</h2>")})).join("")+"</ul>"),e.selectedCategory!==(null==r?void 0:r.selectedCategory)&&(document.querySelector("#categories header").innerText=null!==(n=null===(t=e.categories.find((function(t){return t.id===e.selectedCategory})))||void 0===t?void 0:t.name)&&void 0!==n?n:""),r=e,console.log("loading removed!"),document.body.classList.remove("loading")}},731:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)};t.__esModule=!0,t.createStore=t.getEmptyFormData=t.configureStore=void 0;var o=r(983),a=r(714);function i(e){var t=e.initialState,r=e.reducer,n=t,a=[];return{dispatch:function(e){var t=r(n,e);t!==n&&(n=t,a.forEach((function(e){return(0,e.fn)(n)})))},subscribe:function(e){var t=(0,o.nanoid)();return a.push({id:t,fn:e}),e(n),function(){a.filter((function(e){return e.id!==t}))}},getState:function(){return n}}}t.configureStore=i;var l={title:"",category:""};t.getEmptyFormData=function(e){return n(n({},l),{category:e})},t.createStore=function(e){return i({initialState:e,reducer:a.reducer})}},714:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)},o=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))};t.__esModule=!0,t.reducer=void 0;var a=r(731);t.reducer=function(e,t){var r,i=t.type,l=t.payload;switch(i){default:return e;case"UPDATE_USERNAME":return n(n({},e),{username:l});case"UPDATE_FORM":return n(n({},e),{selectedCategory:"category"===l.name?l.value:e.selectedCategory,form:n(n({},e.form),{data:n(n({},e.form.data),(r={},r[l.name]=l.value,r))})});case"ADD_TODO":return n(n({},e),{form:{invalid:[],data:(0,a.getEmptyFormData)(e.selectedCategory)},todos:o(o([],e.todos,!0),[l],!1)});case"REMOVE_TODO":return n(n({},e),{todos:e.todos.filter((function(e){return e.id!==l.id}))});case"UPDATE_TODO":return n(n({},e),{todos:e.todos.map((function(e){return e.id===l.id?l:e}))})}}},983:(e,t,r)=>{r.r(t),r.d(t,{customAlphabet:()=>i,customRandom:()=>a,nanoid:()=>l,random:()=>o,urlAlphabet:()=>n});let n="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",o=e=>crypto.getRandomValues(new Uint8Array(e)),a=(e,t,r)=>{let n=(2<<Math.log(e.length-1)/Math.LN2)-1,o=-~(1.6*n*t/e.length);return(a=t)=>{let i="";for(;;){let t=r(o),l=o;for(;l--;)if(i+=e[t[l]&n]||"",i.length===a)return i}}},i=(e,t=21)=>a(e,t,o),l=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+((t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_")),"")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{r(389);var e=r(791),t=r(718),n=r(809),o=(0,r(731).createStore)((0,t.loadState)()),a=o.dispatch,i=o.subscribe,l=o.getState;i(t.saveState),i(n.render),(0,n.render)(l()),(0,e.attachEventListeners)({document,dispatch:a,getState:l})})()})();