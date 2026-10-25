(function(root){
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr').replace(/œ/g,'oe').replace(/æ/g,'ae').replace(/[’‘]/g,"'").trim();
const compare=(a,b)=>String(a||'').trim().localeCompare(String(b||'').trim(),'fr',{sensitivity:'base',numeric:true});
const decade=x=>Number(x.year)>0?Math.floor(Number(x.year)/10)*10:Number(x.decade)>0?Number(x.decade):null;
function group(x,mode){const d=decade(x);return mode==='style'?(x.style||'À renseigner'):mode==='decade'?(x.multiDecade?'Plusieurs décennies':d?(d>=1950&&d<2000?String(d).slice(2):d)+"'s":'À renseigner'):'';}
function select(items,query='',mode='alpha',filter=''){
 const terms=norm(query).split(/\s+/).filter(Boolean);
 return items.filter(x=>terms.every(t=>norm(x.title+' '+x.artist).includes(t))&&(!filter||group(x,mode)===filter)).slice().sort((a,b)=>{
  if(mode!=='alpha'){const ga=group(a,mode),gb=group(b,mode);if(ga!==gb){if(ga==='À renseigner')return 1;if(gb==='À renseigner')return -1;return mode==='decade'?(decade(a)||9990)-(decade(b)||9990):compare(ga,gb);}}
  return compare(a.title,b.title)||compare(a.artist,b.artist)||compare(a.id,b.id);
 });
}
const api={norm,compare,decade,group,select};root.KACatalogue=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
