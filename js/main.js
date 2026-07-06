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
function initLightbox(){
  const gallery=document.querySelector(".gallery");
  const box=document.getElementById("lightbox");
  if(!gallery||!box) return;
  const img=box.querySelector("img");
  const closeBtn=box.querySelector(".lb-close");
  const shut=()=>{box.classList.remove("open");document.body.style.overflow="";};
  gallery.addEventListener("click",e=>{
    const t=e.target.closest("img"); if(!t) return;
    img.src=t.dataset.full||t.src; img.alt=t.alt;
    box.classList.add("open"); document.body.style.overflow="hidden";
  });
  closeBtn.addEventListener("click",shut);
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
