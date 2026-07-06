function initMenu(){
  const toggle=document.querySelector(".menu-toggle");
  const menu=document.getElementById("site-menu");
  if(!toggle||!menu) return;
  const close=menu.querySelector(".menu-close");
  const open=()=>{menu.classList.add("open");toggle.setAttribute("aria-expanded","true");document.body.style.overflow="hidden";};
  const shut=()=>{menu.classList.remove("open");toggle.setAttribute("aria-expanded","false");document.body.style.overflow="";};
  toggle.addEventListener("click",open);
  if(close) close.addEventListener("click",shut);
  menu.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",shut));
  document.addEventListener("keydown",e=>{if(e.key==="Escape") shut();});
}
function initLightbox(){ /* Task 4 */ }
function initContactForm(){ /* Task 5 */ }
document.addEventListener("DOMContentLoaded",()=>{ initMenu(); initLightbox(); initContactForm(); });
