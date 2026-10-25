(function(root){
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr').replace(/œ/g,'oe').replace(/æ/g,'ae').replace(/[’‘]/g,"'").trim();
const compare=(a,b)=>String(a||'').localeCompare(String(b||''),'fr',{sensitivity:'base',numeric:true});
const decade=x=>Number(x.year)>0?Math.floor(Number(x.year)/10)*10:null;
function group(x,mode){return mode==='style'?(x.style||'À renseigner'):mode==='decade'?(decade(x)?'Années '+decade(x):'À renseigner'):'';}
function select(items,query='',mode='alpha',filter=''){
 const terms=norm(query).split(/\s+/).filter(Boolean);
 return items.filter(x=>terms.every(t=>norm(x.title+' '+x.artist).includes(t))&&(!filter||group(x,mode)===filter)).slice().sort((a,b)=>{
  if(mode!=='alpha'){const ga=group(a,mode),gb=group(b,mode);if(ga!==gb){if(ga==='À renseigner')return 1;if(gb==='À renseigner')return -1;return compare(ga,gb);}}
  return compare(a.title,b.title)||compare(a.artist,b.artist)||compare(a.id,b.id);
 });
}
const api={norm,compare,decade,group,select};root.KACatalogue=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
