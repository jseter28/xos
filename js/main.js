function trapFocus(dialogEl){
  const selector='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  const onKeydown=e=>{
    if(e.key!=="Tab") return;
    const focusable=Array.from(dialogEl.querySelectorAll(selector)).filter(el=>el.offsetParent!==null);
    if(!focusable.length) return;
    const first=focusable[0], last=focusable[focusable.length-1];
    if(e.shiftKey){
      if(document.activeElement===first){e.preventDefault();last.focus();}
    } else {
      if(document.activeElement===last){e.preventDefault();first.focus();}
    }
  };
  dialogEl.addEventListener("keydown",onKeydown);
  return ()=>dialogEl.removeEventListener("keydown",onKeydown);
}
function initMenu(){
  const toggle=document.querySelector(".site-header .menu-toggle");
  const menu=document.getElementById("site-menu");
  if(!toggle||!menu) return;
  const close=menu.querySelector(".menu-close");
  let releaseTrap=null;
  const open=()=>{
    menu.classList.add("open");toggle.setAttribute("aria-expanded","true");document.body.style.overflow="hidden";
    if(close) close.focus();
    releaseTrap=trapFocus(menu);
  };
  const shut=()=>{
    if(!menu.classList.contains("open")) return;
    menu.classList.remove("open");toggle.setAttribute("aria-expanded","false");document.body.style.overflow="";
    if(releaseTrap){releaseTrap();releaseTrap=null;}
    toggle.focus();
  };
  toggle.addEventListener("click",open);
  if(close) close.addEventListener("click",shut);
  menu.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",shut));
  document.addEventListener("keydown",e=>{if(e.key==="Escape") shut();});
}
function initLightbox(){
  const gallery=document.querySelector(".gallery");
  const box=document.getElementById("lightbox");
  if(!gallery||!box) return;
  const img=box.querySelector("img");
  const closeBtn=box.querySelector(".lb-close");
  let releaseTrap=null;
  let opener=null;
  const shut=()=>{
    if(!box.classList.contains("open")) return;
    box.classList.remove("open");document.body.style.overflow="";
    if(releaseTrap){releaseTrap();releaseTrap=null;}
    if(opener){opener.focus();opener=null;}
  };
  const openFrom=t=>{
    opener=t;
    img.src=t.dataset.full||t.src; img.alt=t.alt;
    box.classList.add("open"); document.body.style.overflow="hidden";
    if(closeBtn) closeBtn.focus();
    releaseTrap=trapFocus(box);
  };
  gallery.addEventListener("click",e=>{
    const t=e.target.closest("img"); if(!t) return;
    openFrom(t);
  });
  gallery.addEventListener("keydown",e=>{
    if(e.key!=="Enter"&&e.key!==" "&&e.key!=="Spacebar") return;
    const t=e.target.closest("img"); if(!t) return;
    e.preventDefault();
    openFrom(t);
  });
  if(closeBtn) closeBtn.addEventListener("click",shut);
  box.addEventListener("click",e=>{if(e.target===box) shut();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape") shut();});
}
function initContactForm(){
  const form=document.getElementById("booking-form");
  if(!form) return;
  const status=document.getElementById("form-status");
  form.addEventListener("submit",e=>{
    e.preventDefault();
    if(!form.checkValidity()){
      status.className="form-status err";
      status.textContent="Please fill in all required fields.";
      form.reportValidity();
      return;
    }
    // Delivery wired later (Formspree). For now, confirm on-page.
    status.className="form-status ok";
    status.textContent="Thanks — we'll be in touch within 24 hours.";
    form.reset();
  });
}
document.addEventListener("DOMContentLoaded",()=>{ initMenu(); initLightbox(); initContactForm(); });
