const menuToggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('open',open)});

const dropdownToggle=document.querySelector('.dropdown-toggle');
const dropdown=document.querySelector('#treatment-menu');
function closeDropdown(){dropdown.hidden=true;dropdownToggle.setAttribute('aria-expanded','false')}
function closeMenu(){navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');closeDropdown()}
dropdownToggle.addEventListener('click',()=>{const open=dropdown.hidden;dropdown.hidden=!open;dropdownToggle.setAttribute('aria-expanded',String(open))});
document.addEventListener('click',event=>{if(!event.target.closest('.treatment-nav'))closeDropdown()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!dropdown.hidden){closeDropdown();dropdownToggle.focus()}else if(navigation.classList.contains('open')){closeMenu();menuToggle.focus()}}});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.querySelector('.view-all-treatments').addEventListener('click',()=>{closeMenu();location.href=document.querySelector('.treatment-nav>a').href});

const dialog=document.querySelector('#treatment-dialog');
const content=document.querySelector('#dialog-content');
let dialogTrigger;
document.querySelectorAll('[data-treatment]').forEach(button=>button.addEventListener('click',()=>{
  dialogTrigger=button.closest('.dropdown')?dropdownToggle:button;
  const template=document.getElementById('treatment-'+button.dataset.treatment);
  content.replaceChildren(template.content.cloneNode(true));
  closeMenu();dialog.showModal();document.body.style.overflow='hidden';
  document.querySelector('.dialog-close').focus();
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const bounds=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))dialog.close()});
dialog.addEventListener('close',()=>{document.body.style.overflow='';if(dialogTrigger&&getComputedStyle(dialogTrigger).display!=='none'){if(dialogTrigger===dropdownToggle&&getComputedStyle(navigation).display==='none')menuToggle.focus();else dialogTrigger.focus()}});

const form=document.querySelector('#contact-form');
if(form){
const phone=form.elements.phone;
phone.addEventListener('input',()=>{phone.setCustomValidity('');document.querySelector('#form-result').hidden=true});
form.addEventListener('input',()=>{document.querySelector('#form-result').hidden=true});
form.addEventListener('submit',event=>{
 event.preventDefault();
 const digits=phone.value.replace(/\D/g,'');
 if(!/^(?:55)?\d{10,11}$/.test(digits)){phone.setCustomValidity('Informe um telefone com DDD, incluindo 10 ou 11 dígitos.');phone.reportValidity();return}
 phone.setCustomValidity('');
 const name=form.elements.name.value.trim();
 if(name.length<2){form.elements.name.setCustomValidity('Informe seu nome.');form.elements.name.reportValidity();return}
 const message=`Olá, Life Odontologia! Meu nome é ${name}.\nTelefone: ${phone.value.trim()}\nTenho interesse em: ${form.elements.treatment.value}.`+(form.elements.message.value.trim()?`\n\n${form.elements.message.value.trim()}`:'');
 document.querySelector('#message-preview').textContent=message;
 document.querySelector('#send-message').href='https://wa.me/5538999649868?text='+encodeURIComponent(message);
 document.querySelector('#form-result').hidden=false;
 document.querySelector('#send-message').focus();
});
form.elements.name.addEventListener('input',()=>form.elements.name.setCustomValidity(''));
}

// Subtle section reveal without hiding content in previews or local files.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion){
 if('IntersectionObserver' in window){const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('did-reveal');revealObserver.unobserve(entry.target)}})},{threshold:.08});document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element))}
}
const currentPath=location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';
navigation.querySelectorAll('a').forEach(link=>{const linkPath=link.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';const active=linkPath===currentPath;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});
