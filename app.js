(() => {
  const buttons=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('.card')];
  const search=document.querySelector('#search');
  let filter='all';
  function apply(){
    let visible=0;
    for(const card of cards){card.hidden=!(filter==='all'||card.dataset.kind===filter)||!card.dataset.search.includes((search?.value||'').toLowerCase().trim()); if(!card.hidden)visible++;}
    const empty=document.querySelector('#empty'); if(empty)empty.hidden=visible>0;
  }
  for(const button of buttons)button.addEventListener('click',()=>{filter=button.dataset.filter;for(const b of buttons)b.setAttribute('aria-pressed',String(b===button));apply();});
  search?.addEventListener('input',apply);
  document.querySelector('[data-copy]')?.addEventListener('click',async event=>{
    const status=document.querySelector('#copy-status');
    try{await navigator.clipboard.writeText(event.currentTarget.dataset.copy);status.textContent='Link copied.';}catch{status.textContent='Copy the address from your browser.';}
  });
})();
