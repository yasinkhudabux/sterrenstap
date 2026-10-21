/* Parent sign-in and cross-device state sync. RLS protects account_state. */
(function(){
'use strict';
const cfg=window.STERRENSTAP_SUPABASE;
const sessionKey='sterrenstap_parent_session';
let session=null,adapter=null,busy=false,timer;
try{session=JSON.parse(localStorage.getItem(sessionKey)||'null')}catch(_){}
function setSession(value){session=value;if(value)localStorage.setItem(sessionKey,JSON.stringify(value));else localStorage.removeItem(sessionKey);render();}
function status(value){const el=document.getElementById('cloudStatus');if(el)el.textContent=value;}
async function request(path,method='GET',body,authorized=false){
 const headers={'apikey':cfg.publishableKey,'Content-Type':'application/json'};
 if(authorized){const access=await accessToken();if(!access)throw Error('Log opnieuw in');headers.Authorization='Bearer '+access;}
 if(method==='POST'&&path.includes('account_state'))headers.Prefer='resolution=merge-duplicates';
 const response=await fetch(cfg.url+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body),cache:'no-store'});
 const data=await response.json().catch(()=>null);
 if(!response.ok)throw Error(data?.msg||data?.error_description||data?.message||'Verzoek mislukt');
 return data;
}
async function accessToken(){
 if(!session)return null;
 if(session.expires_at&&session.expires_at<Date.now()/1000+90){
  try{
   const s=await request('/auth/v1/token?grant_type=refresh_token','POST',{refresh_token:session.refresh_token});
   setSession(s);
  }catch(_){setSession(null);return null;}
 }
 return session?.access_token;
}
async function signIn(email,password,register=false){
 const s=await request(register?'/auth/v1/signup':'/auth/v1/token?grant_type=password','POST',{email,password});
 if(!s.access_token){status('Bevestig je e-mailadres en log daarna in.');return;}
 setSession(s);await load();status('☁️ Account verbonden');
}
async function load(){
 if(!adapter||!session||busy)return;
 busy=true;
 try{
  const data=await request('/rest/v1/account_state?select=state&user_id=eq.'+encodeURIComponent(session.user.id),'GET',undefined,true);
  if(data.length&&Array.isArray(data[0].state?.children)&&data[0].state.children.length){
   adapter.apply(data[0].state);status('☁️ Voortgang geladen');
  }else{busy=false;await save();}
 }catch(e){status('Synchronisatie mislukt: '+e.message);}finally{busy=false;}
}
async function save(){
 if(!adapter||!session||busy)return;
 try{
  await request('/rest/v1/account_state?on_conflict=user_id','POST',{
   user_id:session.user.id,state:adapter.read(),updated_at:new Date().toISOString()
  },true);
  status('☁️ Opgeslagen');
 }catch(e){status('⚠️ Offline: lokaal bewaard');}
}
function render(){
 const el=document.getElementById('cloudAuth');if(!el)return;
 el.innerHTML=session?'<span>☁️ Ingelogd</span> <button type="button" id="cloudLogout">Uitloggen</button>':'<button type="button" id="cloudLogin">☁️ Ouderaccount</button>';
 document.getElementById('cloudLogin')?.addEventListener('click',()=>document.getElementById('accountDialog')?.showModal());
 document.getElementById('cloudLogout')?.addEventListener('click',async()=>{try{await request('/auth/v1/logout','POST',{},true);}catch(_){}setSession(null);location.reload();});
}
window.STERRENSTAP_CLOUD={
 connect(a){adapter=a;render();if(session)load();},
 changed(){if(!session)return;clearTimeout(timer);timer=setTimeout(save,700);},
 reload:load,
 signedIn(){return !!session;}
};
document.addEventListener('DOMContentLoaded',()=>{
 render();
 const dialog=document.getElementById('accountDialog'),form=document.getElementById('accountForm');
 document.getElementById('accountClose')?.addEventListener('click',()=>dialog.close());
 form?.addEventListener('submit',async e=>{
  e.preventDefault();
  const button=form.querySelector('button[type=submit]');button.disabled=true;
  try{
   await signIn(form.elements.email.value,form.elements.password.value,form.elements.register.checked);
   if(session)dialog.close();
  }catch(err){status(err.message);}finally{button.disabled=false;}
 });
});
window.addEventListener('focus',()=>{if(session)load();});
window.addEventListener('online',()=>{if(session)load();});
})();
