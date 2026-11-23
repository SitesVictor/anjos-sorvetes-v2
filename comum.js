// ================== CONFIGURAÇÃO ==================
const WHATSAPP = "5528999682200";
// Horários do Empório: dia da semana (0 = domingo) -> [abre, fecha]
// Feriados (o Empório segue o horário de domingo nesses dias). Formato AAAA-MM-DD.
const FERIADOS = ["2026-01-01","2026-04-03","2026-04-21","2026-05-01","2026-09-07","2026-10-12","2026-11-02","2026-11-15","2026-11-20","2026-12-25",
  "2027-01-01","2027-03-26","2027-04-21","2027-05-01","2027-09-07","2027-10-12","2027-11-02","2027-11-15","2027-11-20","2027-12-25"];
const HORARIO = { 0:["13:00","18:00"], 1:["09:00","18:00"], 2:["09:00","18:00"], 3:["09:00","18:00"], 4:["09:00","18:00"], 5:["09:00","18:00"], 6:["09:00","18:00"] };

// ================== CATÁLOGO ==================
// Sabores com * aparecem com o selo "Novo"
const CATS = [
  { id:"potes", foto:"img/potes.webp", nome:"Potes", forma:"pote", cor:"#f28aa8", desc:"Potes de 1/2 litro e 1 litro, para levar para casa.", tam:"1/2 L e 1 L",
    s:["Abacaxi","Banana","Bombom","Brigadeiro","Chocolate","Chokito","Coco","Creme","Flocos","Frutas do Bosque","Iogurte Grego","Kinder Ovo","Malt Ovo","Morango","Napolitano","Ninho Trufado","Ouro Branco","Pavê","Prestígio","Sonho de Valsa","Tentação","Torta de Limão"] },
  { id:"cobertura", foto:"img/cobertura.webp", nome:"Picolé de cobertura", forma:"cob", cor:"#f8c21d", desc:"Picolés com casquinha crocante de chocolate.",
    s:["Bombom","Brigadeiro*","Crocante","Maltovo","Tentação","Skimo","Skimo Coco","Skimo Branco","Pé de Moleque","Torta de Limão","Chokiss","Suflê de Morango","Delírio*"] },
  { id:"recheados", foto:"img/recheados.webp", nome:"Picolé recheado", forma:"rech", cor:"#9bd47a", desc:"Cremosos por fora, recheados por dentro.",
    s:["Abacaxi Suíço","Limão Suíço","Mousse de Maracujá","Romeu e Julieta","Chocomenta","Tapioca com Doce de Leite","Ninho Trufado"] },
  { id:"leite", foto:"img/leite.webp", nome:"Picolé ao leite", forma:"pic", cor:"#f7d54a", desc:"Os clássicos cremosos de todo dia.",
    s:["Milho Verde","Biscoito","Abacate","Amendoim","Banana","Chiclete","Chocolate","Coco","Jaca","Abacaxi com Coco","Morango","Flocos","Graviola","Leite Condensado","Mini Saia","Pistache*"] },
  { id:"frutados", foto:"img/frutados.webp", nome:"Picolé frutado", forma:"fruta", cor:"#8d5bb5", desc:"Feitos com fruta, leves e refrescantes.",
    s:["Abacaxi","Uva","Goiaba","Açaí","Limão","Jabuticaba","Manga","Tangerina"] },
  { id:"zero", foto:"", nome:"Zero açúcar", forma:"pic", cor:"#fbf3e2", desc:"Todo o sabor, sem adição de açúcar.", s:["Coco","Chocolate"] },
  { id:"paletas", foto:"img/paleta-avela.webp", nome:"Paletas", forma:"paleta", cor:"#f28aa8", desc:"Paletas mexicanas recheadas e generosas.",
    s:["Ninho Trufado","Ovomaltine","Kinder Bueno","Coco com Nutella","Iogurte Grego com Frutas Vermelhas","Bombom com Nutella","Morango com Leite Condensado","Avelã*"] },
  { id:"cones", foto:"img/cones.webp", nome:"Cones", forma:"cone", cor:"#8a5a3f", desc:"Casquinha crocante com cobertura.", s:["Chocolate","Morango","Ovomaltine"] },
  { id:"sundae", foto:"img/sundae.webp", nome:"Sundae", forma:"sundae", cor:"#ef6b7c", desc:"Copo com sorvete e calda, cremosidade 5 estrelas.", s:["Morango","Chocolate","Maracujá","Limão","Uva","Ninho Trufado"] },
  { id:"copinho", foto:"img/copinho.webp", nome:"Copinho", forma:"copo", cor:"#5bb6cc", desc:"Copinhos individuais, ótimos para festas e lanches.", s:["Sabor a combinar"] },
];

const ITENS = [];
CATS.forEach(c => c.s.forEach(n => { const novo = n.endsWith("*"); const sabor = n.replace("*",""); ITENS.push({ id: c.id + "|" + sabor, cat: c, sabor, novo }); }));
const TOTAL_SABORES = ITENS.filter(i => i.cat.id !== "copinho").length;
const SABORES_UNICOS = new Set(ITENS.filter(i => i.cat.id !== "copinho").map(i => i.sabor.toLowerCase())).size;

// cor principal por sabor
const CORES = [
  [/morango|frutas vermelhas|frutas do bosque|suflê/i,"#f28aa8"],
  [/skimo branco/i,"#fbf3e2"],
  [/chocolate|brigadeiro|bombom|chokito|chokiss|tentação|maltovo|malt|ovomaltine|delírio|crocante|kinder|skimo|sonho|ouro|prestígio|pavê|chocomenta|biscoito/i,"#8a5a3f"],
  [/limão|abacate|pistache|menta/i,"#9bd47a"],[/uva|açaí|jabuticaba|romeu/i,"#8d5bb5"],
  [/coco|creme|ninho|iogurte|leite|tapioca|graviola|napolitano|flocos/i,"#fbf3e2"],
  [/abacaxi|maracujá|milho|banana|jaca/i,"#f7d54a"],[/manga|tangerina|pé de moleque|amendoim|avelã/i,"#f2a141"],[/goiaba|mini saia|chiclete/i,"#ef6b7c"],
];
const corDe = n => (CORES.find(([r]) => r.test(n)) || [0,"#f6e2c2"])[1];
const escurecer = (hex, f=.78) => "#" + hex.slice(1).match(/../g).map(h => Math.round(parseInt(h,16)*f).toString(16).padStart(2,"0")).join("");

// ilustrações desenhadas em SVG
function arte(forma, cor) {
  const c2 = escurecer(cor), choc = "#6a4029", pau = "#e9c48f";
  const S = (w,h,b) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${b}</svg>`;
  switch (forma) {
    case "pote": return S(100,90,`<ellipse cx="50" cy="20" rx="42" ry="10" fill="${c2}"/><path d="M10 22h80l-7 56a6 6 0 0 1-6 5H23a6 6 0 0 1-6-5z" fill="#fff" stroke="#d6e9ee" stroke-width="2"/><path d="M14 34h72l-2 16H16z" fill="${cor}"/><path d="M10 18h80v6H10z" fill="#f8c21d"/><rect x="38" y="56" width="24" height="12" rx="6" fill="#5bb6cc"/>`);
    case "cob": return S(60,110,`<rect x="25" y="70" width="10" height="38" rx="4" fill="${pau}"/><rect x="8" y="4" width="44" height="74" rx="20" fill="${cor}"/><path d="M8 24a20 20 0 0 1 44 0v34a20 20 0 0 1-44 0z" fill="${choc}"/><path d="M14 20c6-6 18-8 28-2" stroke="#8d5d42" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="20" cy="42" r="2" fill="${cor}"/><circle cx="36" cy="52" r="2" fill="${cor}"/><circle cx="30" cy="34" r="2" fill="${cor}"/>`);
    case "rech": return S(60,110,`<rect x="25" y="70" width="10" height="38" rx="4" fill="${pau}"/><rect x="8" y="4" width="44" height="74" rx="20" fill="${cor}"/><rect x="20" y="16" width="20" height="50" rx="10" fill="${c2}"/><path d="M14 18c5-5 12-6 18-4" stroke="#fff" stroke-opacity=".6" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    case "fruta": return S(60,110,`<rect x="25" y="70" width="10" height="38" rx="4" fill="${pau}"/><path d="M8 24a22 22 0 0 1 44 0v50H8z" fill="${cor}" opacity=".92"/><path d="M8 50h44v24H8z" fill="${c2}" opacity=".5"/><path d="M15 18c5-6 12-7 18-5" stroke="#fff" stroke-opacity=".7" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    case "paleta": return S(70,110,`<rect x="30" y="72" width="10" height="36" rx="4" fill="${pau}"/><rect x="6" y="4" width="58" height="76" rx="12" fill="${cor}"/><path d="M6 46h58v22a12 12 0 0 1-12 12H18A12 12 0 0 1 6 68z" fill="${c2}"/><path d="M6 44c10 6 20-4 29 2s19-4 29 2" stroke="${choc}" stroke-width="5" fill="none"/>`);
    case "cone": return S(70,110,`<path d="M12 44h46L37 106a2 2 0 0 1-4 0z" fill="#e2a15c"/><path d="M18 52l30 30M30 46l22 22M16 66l20 20M44 46l-24 24M54 52l-30 30" stroke="#c07b3a" stroke-width="2"/><path d="M8 46c0-22 54-22 54 0 0 6-54 6-54 0z" fill="${cor}"/><path d="M12 38c6-16 40-18 46 0" fill="${c2}"/><circle cx="35" cy="12" r="7" fill="#d23c4b"/>`);
    case "sundae": return S(80,110,`<path d="M10 40h60l-8 50H18z" fill="#fff" opacity=".85" stroke="#d6e9ee" stroke-width="2"/><path d="M14 52h52l-2 14H16z" fill="${cor}"/><path d="M8 40c4-24 60-24 64 0z" fill="#fbf3e2"/><path d="M14 36c8 6 16-6 26 0s18-6 26 0" stroke="${c2}" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="24" y="90" width="32" height="8" rx="3" fill="#d6e9ee"/><path d="M52 6l-6 30" stroke="#8a5a3f" stroke-width="4" stroke-linecap="round"/>`);
    case "copo": return S(80,90,`<path d="M12 24h56l-6 56H18z" fill="#fff" stroke="#d6e9ee" stroke-width="2"/><ellipse cx="40" cy="22" rx="30" ry="8" fill="#f8c21d"/><rect x="24" y="44" width="32" height="18" rx="6" fill="#5bb6cc"/>`);
    default: return S(60,110,`<rect x="25" y="70" width="10" height="38" rx="4" fill="${pau}"/><rect x="8" y="4" width="44" height="74" rx="20" fill="${cor}"/><path d="M15 18c5-6 12-7 18-5" stroke="#fff" stroke-opacity=".7" stroke-width="4" fill="none" stroke-linecap="round"/>`);
  }
}

// ================== UTILIDADES ==================
const $ = s => document.querySelector(s);
const norm = t => t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const zap = txt => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
function toast(t){ const e=$("#toast"); if (!e) return; e.textContent=t; e.classList.add("on"); clearTimeout(toast.t); toast.t=setTimeout(()=>e.classList.remove("on"),1800); }

// cabeçalho e rodapé compartilhados
const LOGO = (asa="#5bb6cc", cone="#8a5a3f", meio="#fff") => `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 26c6-9 14-8 18-3-6 1-11 5-12 11-4-1-6-4-6-8z" fill="${asa}"/><path d="M56 26c-6-9-14-8-18-3 6 1 11 5 12 11 4-1 6-4 6-8z" fill="${asa}"/><path d="M20 30h24L33 60a1.2 1.2 0 0 1-2 0z" fill="${cone}"/><circle cx="32" cy="18" r="13" fill="#f8c21d"/><circle cx="32" cy="18" r="6.5" fill="${meio}"/></svg>`;
const ZAP_SVG = `<svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>`;

function montarLayout(pagina) {
  const topo = document.createElement("header"); topo.className = "topo";
  topo.innerHTML = `<div class="wrap">
    <a class="logo" href="index.html" aria-label="Anjos, início"><img src="img/logo-h.webp" alt="Anjos" width="139" height="48"></a>
    <nav class="menu">
      <a href="index.html" class="so-pc ${pagina==="inicio"?"on":""}">Início</a>
      <a href="pedidos.html" class="${pagina==="pedidos"?"on":""}">Pedidos</a>
      <a href="revenda.html" class="rev ${pagina==="revenda"?"on":""}">Seja revendedor</a>
    </nav></div>`;
  document.body.prepend(topo);

  const rod = document.createElement("footer");
  rod.innerHTML = `<div class="wrap"><div class="cols">
    <div><a class="logo-rod" href="index.html"><img src="img/logo-h.webp" alt="Anjos" width="174" height="60"></a>
      <p style="margin-top:.8rem">Sorvetes, picolés e paletas produzidos em Anchieta (ES).</p></div>
    <div><h4>Navegue</h4><ul><li><a href="index.html">Início</a></li><li><a href="pedidos.html">Fazer pedido</a></li><li><a href="revenda.html">Seja revendedor</a></li><li><a href="index.html#visite">Horários e endereço</a></li></ul></div>
    <div><h4>Contato</h4><ul><li><a href="${zap("Olá, Anjos! 🍦 Vim pelo site.")}" target="_blank" rel="noopener">WhatsApp (28) 99968-2200</a></li><li><a href="https://www.instagram.com/anjossorvetes/" target="_blank" rel="noopener">Instagram @anjossorvetes</a></li><li>Rua Projetada, s/n — Baixo Pongal, Anchieta (ES)</li></ul></div>
  </div><p class="demo">Versão de demonstração do site.</p></div>`;
  document.body.append(rod);

  const z = document.createElement("a"); z.className = "zapfix"; z.target = "_blank"; z.rel = "noopener";
  z.href = zap("Olá, Anjos! 🍦 Vim pelo site."); z.setAttribute("aria-label","Falar no WhatsApp"); z.innerHTML = ZAP_SVG;
  document.body.append(z);
  const t = document.createElement("div"); t.className = "toast"; t.id = "toast"; document.body.append(t);

  // animação ao rolar
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
}

// horário do empório
const DIAS = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
const fmtH = h => h.replace(/^0/,"").replace(":00","h").replace(":","h");
const ymdLocal = d => d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
const ehFeriado = d => FERIADOS.includes(ymdLocal(d));
const horarioDo = d => ehFeriado(d) ? HORARIO[0] : HORARIO[d.getDay()];
function statusEmporio() {
  const d = new Date(), h = horarioDo(d), min = d.getHours()*60 + d.getMinutes();
  const m = s => { const [a,b] = s.split(":").map(Number); return a*60+b; };
  if (h && min >= m(h[0]) && min < m(h[1])) return { aberto:true, txt:`Empório aberto agora · até ${fmtH(h[1])}` };
  if (h && min < m(h[0])) return { aberto:false, txt:`Empório fechado · abre hoje às ${fmtH(h[0])}` };
  for (let k = 1; k <= 7; k++) { const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate()+k), hh = horarioDo(dd);
    if (hh) return { aberto:false, txt:`Empório fechado · abre ${k===1?"amanhã":DIAS[dd.getDay()]} às ${fmtH(hh[0])}` }; }
  return { aberto:false, txt:"Empório fechado" };
}
function desenharStatus(sel) {
  const el = $(sel); if (!el) return;
  const s = statusEmporio(); el.classList.toggle("fech", !s.aberto); el.querySelector("span").textContent = s.txt;
}
function desenharHorarios(sel) {
  const el = $(sel); if (!el) return; const hoje = new Date(), dia = hoje.getDay(), fer = ehFeriado(hoje);
  el.innerHTML = [["Segunda a sábado","9h às 18h",dia>=1 && !fer],["Domingos e feriados","13h às 18h",dia===0 || fer]]
    .map(([a,b,hj]) => `<li class="${hj?"hoje":""}"><span>${a}${hj?" (hoje)":""}</span><span>${b}</span></li>`).join("");
}
function fotoCat(c, cls="") {
  if (c.foto) return `<img class="${cls}" src="${c.foto.replace("img/","img/sm/")}" alt="${c.nome}" loading="lazy">`;
  return `<div class="${cls} sem-foto zero" role="img" aria-label="${c.nome}"><b>0%</b><span>açúcar</span></div>`;
}
function arteHero(sel, itens) {
  const el = $(sel); if (!el) return;
  el.innerHTML = itens.map(([f,c,st]) => arte(f,c).replace("<svg", `<svg style="${st}"`)).join("");
}
