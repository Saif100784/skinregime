import { useState } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  skinTypes: string[];
  concerns: string[];
  price: number;
  sku: string;
  url: string;
  step: string;
  time: string[];
}

interface Answers {
  skinType: string;
  concerns: string[];
  budget: string;
  complexity: string;
  [key: string]: string | string[];
}

interface Ritual {
  am: Record<string, Product>;
  pm: Record<string, Product>;
}

const PRODUCTS: Product[] = [
  { id: 3, name: "Balancing Cleanser", brand: "Alpha-H", category: "cleanser", skinTypes: ["dry","combination","normal"], concerns: ["ageing","dullness"], price: 39.00, sku: "AH-BAL-CL", url: "https://www.adorebeauty.com.au/alpha-h/alpha-h-balancing-cleanser.html", step: "cleanse", time: ["am","pm"] },
  { id: 4, name: "Niacinamide 10% + Zinc 1%", brand: "The Ordinary", category: "serum", skinTypes: ["oily","combination"], concerns: ["acne","pores"], price: 9.90, sku: "TO-NIA-10", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-niacinamide-10-zinc-1.html", step: "serum", time: ["am","pm"] },
  { id: 5, name: "Vitamin C Suspension 23%", brand: "The Ordinary", category: "serum", skinTypes: ["normal","combination","oily"], concerns: ["pigmentation","dullness","ageing"], price: 12.90, sku: "TO-VITC-23", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-vitamin-c-suspension-23-ha-spheres-2.html", step: "serum", time: ["am"] },
  { id: 6, name: "Liquid Gold", brand: "Alpha-H", category: "treatment", skinTypes: ["all"], concerns: ["ageing","dullness","pigmentation"], price: 79.00, sku: "AH-LIQ-GLD", url: "https://www.adorebeauty.com.au/alpha-h/alpha-h-liquid-gold.html", step: "treatment", time: ["pm"] },
  { id: 7, name: "Hyaluronic Acid 2% + B5", brand: "The Ordinary", category: "serum", skinTypes: ["dry","sensitive","all"], concerns: ["dehydration","sensitivity"], price: 11.90, sku: "TO-HA-2B5", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-hyaluronic-acid-2-b5.html", step: "serum", time: ["am","pm"] },
  { id: 12, name: "Retinol 0.2% in Squalane", brand: "The Ordinary", category: "treatment", skinTypes: ["normal","combination","oily"], concerns: ["ageing","dullness"], price: 15.90, sku: "TO-RET-02", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-retinol-0-2-in-squalane.html", step: "treatment", time: ["pm"] },
  { id: 13, name: "Triple Vitamin C Serum", brand: "Alpha-H", category: "serum", skinTypes: ["all"], concerns: ["pigmentation","ageing","dullness"], price: 69.00, sku: "AH-VITC-3X", url: "https://www.adorebeauty.com.au/alpha-h/alpha-h-vitamin-c-serum.html", step: "serum", time: ["am"] },
  { id: 15, name: "PM Recovery Cream", brand: "Alpha-H", category: "moisturiser", skinTypes: ["dry","normal","combination"], concerns: ["ageing","dehydration"], price: 55.00, sku: "AH-PM-REC", url: "https://www.adorebeauty.com.au/alpha-h/alpha-h-perfect-skin-cream.html", step: "moisturise", time: ["pm"] },
  { id: 16, name: "Squalane Cleanser", brand: "The Ordinary", category: "cleanser", skinTypes: ["dry","sensitive","normal","all"], concerns: ["sensitivity","dehydration"], price: 14.90, sku: "TO-SQ-CL", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-squalane-cleanser.html", step: "cleanse", time: ["am","pm"] },
  { id: 17, name: "AHA 30% + BHA 2% Peeling Solution", brand: "The Ordinary", category: "treatment", skinTypes: ["oily","combination","normal"], concerns: ["acne","dullness","pigmentation"], price: 14.90, sku: "TO-AHA-30", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-aha-30-bha-2-peeling-solution.html", step: "treatment", time: ["pm"] },
  { id: 18, name: "Natural Moisturising Factors + HA", brand: "The Ordinary", category: "moisturiser", skinTypes: ["all","dry","sensitive"], concerns: ["dehydration","sensitivity"], price: 11.90, sku: "TO-NMF-HA", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-natural-moisturising-factors-ha.html", step: "moisturise", time: ["am","pm"] },
  { id: 19, name: "Mineral UV Filters SPF 30", brand: "The Ordinary", category: "spf", skinTypes: ["sensitive","all"], concerns: ["sensitivity","ageing","pigmentation"], price: 16.90, sku: "TO-SPF-30", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-mineral-uv-filters-spf-30-antioxidants.html", step: "spf", time: ["am"] },
  { id: 20, name: "Gentle Cleansing Gel", brand: "Alpha-H", category: "cleanser", skinTypes: ["oily","combination"], concerns: ["acne","pores","sensitivity"], price: 35.00, sku: "AH-GEN-CL", url: "https://www.adorebeauty.com.au/alpha-h/alpha-h-gentle-cleansing-gel.html", step: "cleanse", time: ["am","pm"] },
  { id: 21, name: "Vitamin B Serum", brand: "Alpha-H", category: "serum", skinTypes: ["sensitive","dry","normal"], concerns: ["sensitivity","redness","dehydration"], price: 65.00, sku: "AH-VITB-SR", url: "https://www.adorebeauty.com.au/alpha-h/alpha-h-vitamin-b-serum.html", step: "serum", time: ["am","pm"] },
  { id: 22, name: "Caffeine Solution 5% + EGCG", brand: "The Ordinary", category: "treatment", skinTypes: ["all"], concerns: ["dullness","ageing"], price: 11.90, sku: "TO-CAFF-5", url: "https://www.adorebeauty.com.au/the-ordinary/the-ordinary-caffeine-solution-5-egcg.html", step: "treatment", time: ["am"] },
];

const STEPS_AM = ["cleanse","serum","treatment","moisturise","spf"];
const STEPS_PM = ["cleanse","treatment","serum","moisturise"];
const STEP_LABELS: Record<string,string> = { cleanse:"Cleanse", serum:"Serum", treatment:"Treatment", moisturise:"Moisturise", spf:"SPF / Sunscreen" };

function recommendRitual(answers: Answers): Ritual {
  const { skinType, concerns = [], budget } = answers;
  const budgetMap: Record<string,number> = { low:25, mid:55, high:999 };
  const maxPrice = budgetMap[budget as string] || 999;
  function pick(step: string, time: string): Product | null {
    const pool = PRODUCTS.filter(p =>
      p.step === step && p.time.includes(time) && p.price <= maxPrice &&
      (p.skinTypes.includes(skinType as string) || p.skinTypes.includes("all")) &&
      ((concerns as string[]).length === 0 || p.concerns.some(c => (concerns as string[]).includes(c)))
    );
    if (pool.length === 0) return PRODUCTS.find(p => p.step === step && p.time.includes(time) && (p.skinTypes.includes(skinType as string) || p.skinTypes.includes("all"))) || null;
    return pool.sort((a,b) => b.concerns.filter(c=>(concerns as string[]).includes(c)).length - a.concerns.filter(c=>(concerns as string[]).includes(c)).length)[0];
  }
  const am: Record<string,Product> = {}, pm: Record<string,Product> = {};
  STEPS_AM.forEach(s => { const p = pick(s,"am"); if(p) am[s]=p; });
  STEPS_PM.forEach(s => { const p = pick(s,"pm"); if(p) pm[s]=p; });
  return { am, pm };
}

const QUIZ_STEPS = [
  { key:"skinType", title:"What's your skin type?", multi:false, options:[
    { value:"oily", label:"Oily", desc:"Shiny, enlarged pores, prone to breakouts" },
    { value:"dry", label:"Dry", desc:"Tight, flaky, sometimes rough texture" },
    { value:"combination", label:"Combination", desc:"Oily T-zone, dry cheeks" },
    { value:"sensitive", label:"Sensitive", desc:"Easily irritated, redness or reactions" },
    { value:"normal", label:"Normal", desc:"Balanced, few issues" },
  ]},
  { key:"concerns", title:"What are your main skin concerns?", multi:true, options:[
    { value:"acne", label:"Acne & breakouts", desc:"" },
    { value:"ageing", label:"Fine lines & ageing", desc:"" },
    { value:"pigmentation", label:"Pigmentation & dark spots", desc:"" },
    { value:"dehydration", label:"Dehydration & dryness", desc:"" },
    { value:"sensitivity", label:"Sensitivity & redness", desc:"" },
    { value:"dullness", label:"Dullness & uneven tone", desc:"" },
    { value:"pores", label:"Large pores", desc:"" },
  ]},
  { key:"budget", title:"What's your budget per product?", multi:false, options:[
    { value:"low", label:"Budget-friendly", desc:"Under $25 per product" },
    { value:"mid", label:"Mid-range", desc:"$25–$55 per product" },
    { value:"high", label:"Premium", desc:"No limit" },
  ]},
  { key:"complexity", title:"How do you like your routine?", multi:false, options:[
    { value:"simple", label:"Simple", desc:"3–4 steps, quick and easy" },
    { value:"standard", label:"Standard", desc:"A full routine, I have time" },
    { value:"advanced", label:"Advanced", desc:"More steps, more results" },
  ]},
];

const brandColors: Record<string,string> = { "The Ordinary":"#1a1a1a","Alpha-H":"#c0392b" };

function BrandBadge({ brand }: { brand: string }) {
  return <span style={{ fontSize:11, fontWeight:500, color:"#fff", background:brandColors[brand]||"#555", borderRadius:4, padding:"2px 7px", whiteSpace:"nowrap" }}>{brand}</span>;
}

function ProductCard({ product, onSwap, alternatives }: { product: Product | null, onSwap: (p: Product) => void, alternatives: Product[] }) {
  const [showAlt, setShowAlt] = useState(false);
  if (!product) return <div style={{ padding:12, color:"#999", fontSize:13 }}>No product found for this step.</div>;
  return (
    <div style={{ background:"#1a1a1a", border:"0.5px solid rgba(240,237,230,0.1)", borderRadius:10, padding:"12px 14px", marginBottom:8 }}>
      <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
        <div style={{ width:52, height:52, borderRadius:8, background:"#222", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:11, color:"#999", border:"0.5px solid rgba(240,237,230,0.1)", fontWeight:500 }}>
          {product.brand.split(" ").map((w:string)=>w[0]).join("").slice(0,3)}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ marginBottom:3 }}><BrandBadge brand={product.brand} /></div>
          <p style={{ margin:"2px 0 0", fontWeight:500, fontSize:14, color:"#f0ede6", lineHeight:1.3 }}>{product.name}</p>
          <p style={{ margin:"3px 0 0", fontSize:13, color:"rgba(240,237,230,0.5)" }}>A${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div style={{ marginTop:10 }}>
        <button onClick={() => setShowAlt(!showAlt)} style={{ fontSize:12, padding:"4px 10px", borderRadius:6, border:"0.5px solid rgba(240,237,230,0.2)", background:"transparent", cursor:"pointer", color:"rgba(240,237,230,0.5)" }}>
          {showAlt ? "Hide alternatives" : "Show alternatives"}
        </button>
      </div>
      {showAlt && alternatives.length > 0 && (
        <div style={{ marginTop:10, borderTop:"0.5px solid rgba(240,237,230,0.1)", paddingTop:10 }}>
          {alternatives.slice(0,3).map((alt:Product) => (
            <div key={alt.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:"0.5px solid rgba(240,237,230,0.06)" }}>
              <div style={{ flex:1 }}>
                <BrandBadge brand={alt.brand} />
                <span style={{ fontSize:13, marginLeft:6, color:"#f0ede6" }}>{alt.name}</span>
                <span style={{ fontSize:12, color:"rgba(240,237,230,0.4)", marginLeft:6 }}>A${alt.price.toFixed(2)}</span>
              </div>
              <button onClick={() => onSwap(alt)} style={{ fontSize:12, padding:"3px 8px", borderRadius:6, border:"0.5px solid rgba(240,237,230,0.2)", background:"transparent", cursor:"pointer", color:"#7eb8f7" }}>Use this</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RitualView({ ritual, setRitual, answers, onRedo }: { ritual: Ritual, setRitual: (r: Ritual) => void, answers: Answers, onRedo: () => void }) {
  const getAlts = (product: Product, time: string) => PRODUCTS.filter(p => p.id !== product.id && p.step === product.step && p.time.includes(time) && (p.skinTypes.includes(answers.skinType as string) || p.skinTypes.includes("all")));
  const swap = (time: string, step: string, p: Product) => setRitual({ ...ritual, [time]: { ...ritual[time as keyof Ritual], [step]: p } });
  const allProducts = [...Object.values(ritual.am), ...Object.values(ritual.pm)];
  const unique = allProducts.filter((p,i,a) => a.findIndex((x:Product)=>x.id===p.id)===i);
  const total = unique.reduce((s,p) => s+p.price, 0);
  const openCart = () => {
    const skus = unique.map((p:Product) => `variant[]=${encodeURIComponent(p.sku)}`).join("&");
    window.open(`https://www.adorebeauty.com.au/cart?${skus}`, "_blank");
  };
  return (
    <div>
      <div style={{ background:"#141414", borderRadius:12, padding:"20px 24px", marginBottom:24 }}>
        <p style={{ margin:0, fontSize:13, color:"rgba(240,237,230,0.45)" }}>Your personalised ritual</p>
        <h2 style={{ margin:"4px 0 0", fontSize:22, fontWeight:500, color:"#f0ede6" }}>SkinRegime ritual</h2>
        <p style={{ margin:"6px 0 0", fontSize:13, color:"rgba(240,237,230,0.45)" }}>{answers.skinType as string} skin · {(answers.concerns as string[]).join(", ")} · {answers.budget as string} budget</p>
        <div style={{ marginTop:14, display:"flex", gap:10, flexWrap:"wrap" }}>
          {([["Total ritual value",`A$${total.toFixed(2)}`],["Brands featured",[...new Set(unique.map((p:Product)=>p.brand))].length],["Products",unique.length]] as [string, string|number][]).map(([l,v]) => (
            <div key={l} style={{ background:"#1a1a1a", border:"0.5px solid rgba(240,237,230,0.1)", borderRadius:8, padding:"8px 14px" }}>
              <p style={{ margin:0, fontSize:11, color:"rgba(240,237,230,0.4)" }}>{l}</p>
              <p style={{ margin:"2px 0 0", fontSize:18, fontWeight:500, color:"#f0ede6" }}>{String(v)}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {([["am","Morning routine","#f5a623",STEPS_AM],["pm","Evening routine","#7c3aed",STEPS_PM]] as [string,string,string,string[]][]).map(([t,label,dot,steps]) => (
          <div key={t}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:dot }}></div>
              <h3 style={{ margin:0, fontSize:15, fontWeight:500, color:"#f0ede6" }}>{label}</h3>
            </div>
            {steps.map((step:string, i:number) => ritual[t as keyof Ritual][step] ? (
              <div key={step}>
                <p style={{ fontSize:11, color:"rgba(240,237,230,0.35)", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Step {i+1} · {STEP_LABELS[step]}</p>
                <ProductCard product={ritual[t as keyof Ritual][step]} onSwap={(p:Product) => swap(t,step,p)} alternatives={getAlts(ritual[t as keyof Ritual][step],t)} />
              </div>
            ) : null)}
          </div>
        ))}
      </div>
      <div style={{ marginTop:24, borderTop:"0.5px solid rgba(240,237,230,0.1)", paddingTop:20 }}>
        <button onClick={openCart} style={{ width:"100%", padding:"14px", borderRadius:10, fontSize:15, fontWeight:500, background:"#f0ede6", color:"#0a0a0a", border:"none", cursor:"pointer", marginBottom:10 }}>
          Shop full ritual at Adore Beauty ↗
        </button>
        <p style={{ margin:"0 0 12px", fontSize:12, color:"rgba(240,237,230,0.35)", textAlign:"center" }}>All {unique.length} products · A${total.toFixed(2)} total</p>
        <button onClick={onRedo} style={{ fontSize:13, padding:"8px 16px", borderRadius:8, border:"0.5px solid rgba(240,237,230,0.2)", background:"transparent", cursor:"pointer", color:"rgba(240,237,230,0.5)" }}>Retake quiz</button>
      </div>
    </div>
  );
}

function QuizView({ onComplete }: { onComplete: (a: Answers) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ skinType:"", concerns:[], budget:"", complexity:"" });
  const q = QUIZ_STEPS[step];
  const val = q.multi ? (answers[q.key] as string[] || []) : answers[q.key] as string;
  const toggle = (v: string) => {
    if (q.multi) {
      setAnswers(a => ({ ...a, [q.key]: (a[q.key] as string[]||[]).includes(v) ? (a[q.key] as string[]).filter((x:string)=>x!==v) : [...(a[q.key] as string[]||[]),v] }));
    } else {
      setAnswers(a => ({ ...a, [q.key]: v }));
    }
  };
  const canNext = q.multi ? (val as string[]).length > 0 : val !== "";
  const next = () => { if (step < QUIZ_STEPS.length-1) setStep(s=>s+1); else onComplete(answers); };
  return (
    <div style={{ maxWidth:520, margin:"0 auto" }}>
      <div style={{ display:"flex", gap:4, marginBottom:28 }}>
        {QUIZ_STEPS.map((_,i) => <div key={i} style={{ flex:1, height:3, borderRadius:2, background: i<=step ? "#f0ede6" : "rgba(240,237,230,0.15)" }} />)}
      </div>
      <p style={{ fontSize:12, color:"rgba(240,237,230,0.4)", margin:"0 0 6px" }}>Question {step+1} of {QUIZ_STEPS.length}</p>
      <h2 style={{ margin:"0 0 16px", fontSize:20, fontWeight:500, color:"#f0ede6" }}>{q.title}</h2>
      {q.multi && <p style={{ margin:"-8px 0 16px", fontSize:13, color:"rgba(240,237,230,0.45)" }}>Select all that apply</p>}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {q.options.map(opt => {
          const selected = q.multi ? (val as string[]).includes(opt.value) : val === opt.value;
          return (
            <button key={opt.value} onClick={() => toggle(opt.value)} style={{ textAlign:"left", padding:"12px 16px", borderRadius:10, cursor:"pointer", border: selected ? "2px solid #f0ede6" : "0.5px solid rgba(240,237,230,0.2)", background: selected ? "rgba(240,237,230,0.08)" : "transparent", color:"#f0ede6", display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:18, height:18, borderRadius: q.multi ? 4 : "50%", flexShrink:0, border: selected ? "2px solid #f0ede6" : "1.5px solid rgba(240,237,230,0.3)", background: selected ? "#f0ede6" : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {selected && <span style={{ width:8, height:8, borderRadius: q.multi ? 2 : "50%", background:"#0a0a0a" }}></span>}
              </span>
              <span>
                <span style={{ fontWeight:500, fontSize:14 }}>{opt.label}</span>
                {opt.desc && <span style={{ display:"block", fontSize:12, color:"rgba(240,237,230,0.4)", marginTop:2 }}>{opt.desc}</span>}
              </span>
            </button>
          );
        })}
      </div>
      <button onClick={next} disabled={!canNext} style={{ marginTop:20, width:"100%", padding:12, borderRadius:10, fontSize:14, fontWeight:500, background: canNext ? "#f0ede6" : "rgba(240,237,230,0.15)", color: canNext ? "#0a0a0a" : "rgba(240,237,230,0.3)", border:"none", cursor: canNext ? "pointer" : "default" }}>
        {step < QUIZ_STEPS.length-1 ? "Continue" : "Build my ritual"}
      </button>
    </div>
  );
}

function ExplorerView({ onBack }: { onBack: () => void }) {
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterConcern, setFilterConcern] = useState("all");
  const brands = ["all", ...new Set(PRODUCTS.map(p=>p.brand))];
  const concerns = ["all","acne","ageing","pigmentation","dehydration","sensitivity","dullness","pores"];
  const filtered = PRODUCTS.filter(p => (filterBrand==="all"||p.brand===filterBrand) && (filterConcern==="all"||p.concerns.includes(filterConcern)));
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ fontSize:13, padding:"6px 12px", borderRadius:8, border:"0.5px solid rgba(240,237,230,0.2)", background:"transparent", cursor:"pointer", color:"rgba(240,237,230,0.5)" }}>← Back</button>
        <h2 style={{ margin:0, fontSize:18, fontWeight:500, color:"#f0ede6" }}>Product explorer</h2>
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
        <select value={filterBrand} onChange={e=>setFilterBrand(e.target.value)}>
          {brands.map(b => <option key={b} value={b}>{b==="all"?"All brands":b}</option>)}
        </select>
        <select value={filterConcern} onChange={e=>setFilterConcern(e.target.value)}>
          {concerns.map(c => <option key={c} value={c}>{c==="all"?"All concerns":c}</option>)}
        </select>
        <span style={{ fontSize:13, color:"rgba(240,237,230,0.45)", alignSelf:"center" }}>{filtered.length} products</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))", gap:10 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background:"#1a1a1a", border:"0.5px solid rgba(240,237,230,0.1)", borderRadius:10, padding:14 }}>
            <BrandBadge brand={p.brand} />
            <p style={{ margin:"8px 0 2px", fontWeight:500, fontSize:13, color:"#f0ede6", lineHeight:1.3 }}>{p.name}</p>
            <p style={{ margin:"0 0 6px", fontSize:12, color:"rgba(240,237,230,0.45)" }}>A${p.price.toFixed(2)} · {STEP_LABELS[p.step]}</p>
            <p style={{ margin:"0 0 10px", fontSize:11, color:"rgba(240,237,230,0.35)" }}>{p.concerns.join(", ")}</p>
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:"#7eb8f7" }}>Buy at Adore Beauty ↗</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage({ onStart, onExplore }: { onStart: () => void, onExplore: () => void }) {
  return (
    <div>
      <div style={{ textAlign:"center", padding:"48px 24px 40px" }}>
        <p style={{ margin:"0 0 12px", fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(240,237,230,0.35)" }}>Cross-brand skincare · Australia</p>
        <h1 style={{ margin:"0 0 16px", fontSize:36, fontWeight:400, lineHeight:1.2, color:"#f0ede6", letterSpacing:"-0.02em" }}>Your skin.<br/><em style={{ color:"rgba(240,237,230,0.5)" }}>Every brand.</em><br/>One ritual.</h1>
        <p style={{ margin:"0 auto 28px", fontSize:15, color:"rgba(240,237,230,0.5)", maxWidth:400, lineHeight:1.7 }}>Personalised skincare routines built from the best products across all brands — not just one.</p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={onStart} style={{ padding:"12px 28px", borderRadius:10, fontSize:14, fontWeight:500, background:"#f0ede6", color:"#0a0a0a", border:"none", cursor:"pointer" }}>Build my ritual</button>
          <button onClick={onExplore} style={{ padding:"12px 24px", borderRadius:10, fontSize:14, background:"transparent", color:"rgba(240,237,230,0.5)", border:"0.5px solid rgba(240,237,230,0.2)", cursor:"pointer" }}>Browse products</button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px,1fr))", gap:12, paddingBottom:32 }}>
        {([["✦","Cross-brand","Best product at every step, regardless of brand"],["◎","Personalised","Matched to your skin type, concerns & budget"],["⟶","Shoppable","One cart, one checkout at Adore Beauty"]] as [string,string,string][]).map(([icon,title,desc]) => (
          <div key={title} style={{ background:"#141414", borderRadius:10, padding:16 }}>
            <p style={{ margin:"0 0 8px", fontSize:18, color:"#f0ede6" }}>{icon}</p>
            <p style={{ margin:"0 0 4px", fontWeight:500, fontSize:14, color:"#f0ede6" }}>{title}</p>
            <p style={{ margin:0, fontSize:13, color:"rgba(240,237,230,0.45)", lineHeight:1.5 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [ritual, setRitual] = useState<Ritual | null>(null);
  const handleQuizComplete = (ans: Answers) => {
    setAnswers(ans);
    setRitual(recommendRitual(ans));
    setView("ritual");
  };
  return (
    <div style={{ maxWidth:760, margin:"0 auto", padding:"0 16px 40px", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background:"#0a0a0a", minHeight:"100vh" }}>
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0", borderBottom:"0.5px solid rgba(240,237,230,0.1)", marginBottom:32 }}>
        <button onClick={() => setView("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <span style={{ fontSize:16, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"#f0ede6" }}>SkinRegime</span>
        </button>
        <div style={{ display:"flex", gap:16 }}>
          <button onClick={() => setView("explore")} style={{ fontSize:13, color:"rgba(240,237,230,0.5)", background:"none", border:"none", cursor:"pointer" }}>Products</button>
          <button onClick={() => setView("quiz")} style={{ fontSize:13, padding:"6px 14px", borderRadius:8, background:"#f0ede6", color:"#0a0a0a", border:"none", cursor:"pointer", fontWeight:500 }}>Start quiz</button>
        </div>
      </nav>
      {view === "home" && <HomePage onStart={() => setView("quiz")} onExplore={() => setView("explore")} />}
      {view === "quiz" && <QuizView onComplete={handleQuizComplete} />}
      {view === "ritual" && ritual && answers && <RitualView ritual={ritual} setRitual={setRitual} answers={answers} onRedo={() => setView("quiz")} />}
      {view === "explore" && <ExplorerView onBack={() => setView("home")} />}
    </div>
  );
}
