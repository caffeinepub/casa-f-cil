import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const WA_URL = "https://wa.me/258863148895";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
  id: string;
  type: string;
  icon: string;
  qty: number;
  unitPrice: number;
}

const COMPARTMENTS = [
  { type: "Cozinha", icon: "🍳", price: 5000 },
  { type: "Quarto / Guarda-fatos", icon: "🛏️", price: 4000 },
  { type: "Sala", icon: "🛋️", price: 4000 },
  { type: "Escritório", icon: "💼", price: 5000 },
  { type: "WC", icon: "🚿", price: 3000 },
];

const SERVICES = [
  {
    icon: "🏛️",
    title: "Projetos de Arquitetura",
    desc: "Elaboramos projetos completos adaptados à sua visão e necessidades.",
  },
  {
    icon: "🛋️",
    title: "Design de Interiores",
    desc: "Criamos ambientes funcionais, estéticos e únicos para o seu espaço.",
  },
  {
    icon: "🔲",
    title: "Montagem de Pisos",
    desc: "Instalação de pisos cerâmicos, vinílicos, parquet e outros materiais.",
  },
  {
    icon: "🪑",
    title: "Móveis por Medida",
    desc: "Fabricamos móveis personalizados para maximizar o seu espaço.",
  },
  {
    icon: "🔳",
    title: "Teto Falso",
    desc: "Instalação de tectos falsos em gesso, PVC e alumínio com acabamento impecável.",
  },
  {
    icon: "🎨",
    title: "Pintura",
    desc: "Serviço de pintura interior e exterior com acabamentos de alta qualidade.",
  },
  {
    icon: "⚡",
    title: "Eletricidade",
    desc: "Instalações elétricas residenciais e comerciais com segurança e rigor.",
  },
  {
    icon: "🚿",
    title: "Canalização",
    desc: "Instalação e reparação de sistemas de água e saneamento.",
  },
];

const STEPS_INFO = [
  {
    num: "1",
    title: "Descreva o que precisa",
    desc: "Diga-nos o tipo de serviço e partilhe detalhes do seu projeto.",
  },
  {
    num: "2",
    title: "Envie fotos e detalhes",
    desc: "Adicione imagens ou informações extras para um orçamento mais preciso.",
  },
  {
    num: "3",
    title: "Receba orçamento estimativo",
    desc: "Entraremos em contacto rapidamente com uma estimativa personalizada.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtPrice(v: number) {
  return `${v.toLocaleString("pt-PT")} MZN`;
}

// ─── WhatsApp SVG ─────────────────────────────────────────────────────────────
function WhatsAppIcon({
  size = 24,
  className = "",
}: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      role="img"
      aria-label="WhatsApp"
    >
      <title>WhatsApp</title>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ onScrollToForm }: { onScrollToForm: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 font-bold text-xl bg-transparent border-none p-0 cursor-pointer"
          style={{ color: "var(--navy)" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="abvisarq - início"
        >
          <img
            src="/assets/uploads/gemini-2.5-flash-image_Atualiza_esse_logo_deixe-o_com_2000x2000_pixels_e_inclua_as_informa-es_de_con-0-1.jpg"
            alt="abvisarq"
            className="h-12 w-12 object-cover rounded-full"
          />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="header.primary_button"
            onClick={onScrollToForm}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--navy)", minHeight: "44px" }}
          >
            Pedir Orçamento
          </button>
          <a
            data-ocid="header.secondary_button"
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--gold)", minHeight: "44px" }}
          >
            <WhatsAppIcon size={18} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            type="button"
            data-ocid="header.mobile_quote_button"
            onClick={onScrollToForm}
            className="sm:hidden inline-flex items-center px-3 py-2.5 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ background: "var(--navy)", minHeight: "44px" }}
            aria-label="Pedir Orçamento"
          >
            📋
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onScrollToForm }: { onScrollToForm: () => void }) {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/hero-architecture.dim_1920x1080.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,58,92,0.85) 0%, rgba(10,20,40,0.65) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: "var(--gold)" }}
      />
      <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: "rgba(201,168,76,0.2)",
              color: "var(--gold)",
              border: "1px solid rgba(201,168,76,0.4)",
            }}
          >
            Arquitetura · Design · Execução
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Transformamos ideias em espaços modernos e bem executados
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Projetos, design e execução com qualidade profissional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={onScrollToForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:opacity-90 active:scale-95 shadow-gold"
              style={{ background: "var(--gold)", minHeight: "52px" }}
            >
              📋 Pedir Orçamento
            </button>
            <a
              data-ocid="hero.secondary_button"
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:bg-white/20 active:scale-95 border-2 border-white/60"
              style={{ minHeight: "52px" }}
            >
              <WhatsAppIcon size={20} /> Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section className="py-20 bg-white" id="servicos">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--gold)" }}
          >
            O Que Fazemos
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold mt-2"
            style={{ color: "var(--navy)" }}
          >
            Os Nossos Serviços
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Oferecemos soluções completas para o seu projeto, do início ao fim.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-gold transition-all hover:-translate-y-1 cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--navy)", fontSize: "1.3rem" }}
              >
                {s.icon}
              </div>
              <h3
                className="font-bold text-sm sm:text-base mb-2"
                style={{ color: "var(--navy)" }}
              >
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section
      className="py-20"
      style={{ background: "var(--surface)" }}
      id="como-funciona"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--gold)" }}
          >
            Simples e Rápido
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold mt-2"
            style={{ color: "var(--navy)" }}
          >
            Como Funciona
          </h2>
        </motion.div>
        <div className="relative">
          <div
            className="hidden md:block absolute top-[2.4rem] left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5"
            style={{ background: "var(--gold)" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS_INFO.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white mb-5 relative z-10 shadow-gold"
                  style={{ background: "var(--gold)" }}
                >
                  {step.num}
                </div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "var(--gold)" }}
                >
                  Passo {step.num}
                </span>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--navy)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Smart Quote Form ─────────────────────────────────────────────────────────
const STEP_LABELS = ["Dados", "Serviço", "Compartimentos", "Resumo"];

function SmartQuoteForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Step 1
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});

  // Step 2
  const [tipoServico, setTipoServico] = useState<"design3d" | "completo" | "">(
    "",
  );
  const [step2Error, setStep2Error] = useState("");

  // Step 3
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [selectedComp, setSelectedComp] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [step3Error, setStep3Error] = useState("");

  const multiplier = tipoServico === "completo" ? 1.5 : 1;

  const subtotalBase = cart.reduce(
    (acc, item) => acc + item.unitPrice * item.qty,
    0,
  );
  const acrescimo = tipoServico === "completo" ? subtotalBase * 0.5 : 0;
  const total = subtotalBase + acrescimo;

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!nome.trim()) e.nome = "Nome é obrigatório";
    if (!telefone.trim()) e.telefone = "Número de WhatsApp é obrigatório";
    if (!localizacao.trim()) e.localizacao = "Localização é obrigatória";
    setStep1Errors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0) {
      if (validateStep1()) goTo(1);
    } else if (step === 1) {
      if (!tipoServico) {
        setStep2Error("Selecione o tipo de serviço");
        return;
      }
      setStep2Error("");
      goTo(2);
    } else if (step === 2) {
      if (cart.length === 0) {
        setStep3Error("Adicione pelo menos um compartimento");
        return;
      }
      setStep3Error("");
      goTo(3);
    }
  };

  const handleBack = () => goTo(step - 1);

  const addToCart = () => {
    if (!selectedComp) return;
    const comp = COMPARTMENTS.find((c) => c.type === selectedComp);
    if (!comp) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.type === comp.type);
      if (existing) {
        return prev.map((i) =>
          i.type === comp.type ? { ...i, qty: i.qty + selectedQty } : i,
        );
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: comp.type,
          icon: comp.icon,
          qty: selectedQty,
          unitPrice: comp.price,
        },
      ];
    });
    setShowAddPanel(false);
    setSelectedComp("");
    setSelectedQty(1);
    setStep3Error("");
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  };

  const removeItem = (id: string) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const sendWhatsApp = () => {
    const tipoLabel =
      tipoServico === "completo" ? "Projeto Completo" : "Apenas Design 3D";
    const lines = cart.map((i) => `- ${i.qty}x ${i.type}`).join("\n");
    const msg = `Olá, gostaria de solicitar um orçamento.\n\nTipo de serviço: ${tipoLabel}\n\nCompartimentos:\n${lines}\n\nLocalização: ${localizacao}\n\nTotal estimado: ${total.toLocaleString("pt-PT")} MZN`;
    window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      id="orcamento"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050e1a 0%, #0a1628 50%, #1a2d4a 100%)",
      }}
    >
      {/* Decorative glow blobs */}
      <div
        className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.72 0.13 80 / 0.07)" }}
      />
      <div
        className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.29 0.07 240 / 0.3)" }}
      />

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{
              background: "oklch(0.72 0.13 80 / 0.15)",
              color: "var(--gold)",
              border: "1px solid oklch(0.72 0.13 80 / 0.35)",
            }}
          >
            Formulário Inteligente
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Pedir Orçamento
          </h2>
          <p className="text-white/50 text-sm">
            Personalize o seu pedido e receba o orçamento direto no WhatsApp.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-1">
            {STEP_LABELS.map((label, i) => (
              <div
                key={label}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-full h-1 rounded-full transition-all duration-500"
                  style={{
                    background:
                      i <= step ? "var(--gold)" : "rgba(255,255,255,0.1)",
                  }}
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider hidden sm:block transition-colors duration-300"
                  style={{
                    color: i <= step ? "var(--gold)" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Step indicator */}
          <div
            className="px-6 sm:px-10 pt-8 pb-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3 pb-6">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: "var(--gold)", color: "#0a1628" }}
              >
                {step + 1}
              </div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--gold)" }}
                >
                  Passo {step + 1} de {STEP_LABELS.length}
                </p>
                <p className="text-white font-semibold text-base">
                  {
                    [
                      "Dados do Cliente",
                      "Tipo de Serviço",
                      "Compartimentos",
                      "Resumo e Envio",
                    ][step]
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Animated Step Content */}
          <div className="px-6 sm:px-10 py-8 min-h-[340px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* ── STEP 0: Client Data ── */}
                {step === 0 && (
                  <div className="space-y-5" data-ocid="quote.modal">
                    <div>
                      <label
                        htmlFor="sf-nome"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "var(--gold)" }}
                      >
                        Nome Completo *
                      </label>
                      <input
                        id="sf-nome"
                        data-ocid="quote.input"
                        type="text"
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: step1Errors.nome
                            ? "1px solid oklch(0.65 0.22 27)"
                            : "1px solid rgba(255,255,255,0.12)",
                          color: "white",
                          caretColor: "var(--gold)",
                        }}
                        placeholder="O seu nome completo"
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value);
                          setStep1Errors((p) => ({ ...p, nome: "" }));
                        }}
                      />
                      {step1Errors.nome && (
                        <p
                          data-ocid="quote.error_state"
                          className="text-xs mt-1.5"
                          style={{ color: "oklch(0.65 0.22 27)" }}
                        >
                          {step1Errors.nome}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="sf-telefone"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "var(--gold)" }}
                      >
                        Número de WhatsApp *
                      </label>
                      <input
                        id="sf-telefone"
                        data-ocid="quote.telefone_input"
                        type="tel"
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: step1Errors.telefone
                            ? "1px solid oklch(0.65 0.22 27)"
                            : "1px solid rgba(255,255,255,0.12)",
                          color: "white",
                          caretColor: "var(--gold)",
                        }}
                        placeholder="+258 8X XXX XXXX"
                        value={telefone}
                        onChange={(e) => {
                          setTelefone(e.target.value);
                          setStep1Errors((p) => ({ ...p, telefone: "" }));
                        }}
                      />
                      {step1Errors.telefone && (
                        <p
                          className="text-xs mt-1.5"
                          style={{ color: "oklch(0.65 0.22 27)" }}
                        >
                          {step1Errors.telefone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="sf-localizacao"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "var(--gold)" }}
                      >
                        Localização / Bairro / Cidade *
                      </label>
                      <input
                        id="sf-localizacao"
                        data-ocid="quote.localizacao_input"
                        type="text"
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: step1Errors.localizacao
                            ? "1px solid oklch(0.65 0.22 27)"
                            : "1px solid rgba(255,255,255,0.12)",
                          color: "white",
                          caretColor: "var(--gold)",
                        }}
                        placeholder="Ex: Maputo, Sommerschield"
                        value={localizacao}
                        onChange={(e) => {
                          setLocalizacao(e.target.value);
                          setStep1Errors((p) => ({ ...p, localizacao: "" }));
                        }}
                      />
                      {step1Errors.localizacao && (
                        <p
                          className="text-xs mt-1.5"
                          style={{ color: "oklch(0.65 0.22 27)" }}
                        >
                          {step1Errors.localizacao}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ── STEP 1: Service Type ── */}
                {step === 1 && (
                  <div className="space-y-4">
                    {step2Error && (
                      <p
                        className="text-xs mb-2"
                        style={{ color: "oklch(0.65 0.22 27)" }}
                      >
                        {step2Error}
                      </p>
                    )}
                    {[
                      {
                        key: "design3d" as const,
                        icon: "🎨",
                        title: "Apenas Design 3D",
                        desc: "Receba um projeto visual 3D detalhado do seu espaço, com renders realistas para aprovação.",
                        badge: "Preço Base",
                      },
                      {
                        key: "completo" as const,
                        icon: "🏗️",
                        title: "Projeto Completo",
                        desc: "Design 3D + execução total da obra. Entregamos tudo feito e acabado.",
                        badge: "+50% sobre base",
                      },
                    ].map((opt) => {
                      const isSelected = tipoServico === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          data-ocid={`quote.${opt.key}_button`}
                          onClick={() => {
                            setTipoServico(opt.key);
                            setStep2Error("");
                          }}
                          className="w-full text-left p-5 rounded-2xl transition-all duration-300 relative"
                          style={{
                            background: isSelected
                              ? "rgba(201,168,76,0.1)"
                              : "rgba(255,255,255,0.04)",
                            border: isSelected
                              ? "1.5px solid var(--gold)"
                              : "1.5px solid rgba(255,255,255,0.1)",
                            boxShadow: isSelected
                              ? "0 0 24px oklch(0.72 0.13 80 / 0.3)"
                              : "none",
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                              style={{
                                background: isSelected
                                  ? "rgba(201,168,76,0.2)"
                                  : "rgba(255,255,255,0.06)",
                              }}
                            >
                              {opt.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-bold text-white text-base">
                                  {opt.title}
                                </span>
                                <span
                                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                  style={{
                                    background: isSelected
                                      ? "rgba(201,168,76,0.25)"
                                      : "rgba(255,255,255,0.08)",
                                    color: isSelected
                                      ? "var(--gold)"
                                      : "rgba(255,255,255,0.5)",
                                  }}
                                >
                                  {opt.badge}
                                </span>
                              </div>
                              <p className="text-white/50 text-xs leading-relaxed">
                                {opt.desc}
                              </p>
                            </div>
                            <div
                              className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                              style={{
                                borderColor: isSelected
                                  ? "var(--gold)"
                                  : "rgba(255,255,255,0.2)",
                                background: isSelected
                                  ? "var(--gold)"
                                  : "transparent",
                              }}
                            >
                              {isSelected && (
                                <span className="text-[#0a1628] text-xs font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ── STEP 2: Compartments ── */}
                {step === 2 && (
                  <div className="space-y-4">
                    {step3Error && (
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.65 0.22 27)" }}
                      >
                        {step3Error}
                      </p>
                    )}

                    {/* Cart items */}
                    <AnimatePresence>
                      {cart.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          data-ocid={`cart.item.${idx + 1}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-center gap-3 p-4 rounded-xl"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold truncate">
                              {item.type}
                            </p>
                            <p className="text-white/40 text-xs">
                              {fmtPrice(item.unitPrice * multiplier)} / un
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              data-ocid={`cart.edit_button.${idx + 1}`}
                              onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors font-bold text-sm"
                              style={{ background: "rgba(255,255,255,0.08)" }}
                              aria-label="Diminuir quantidade"
                            >
                              −
                            </button>
                            <span className="text-white text-sm font-bold w-5 text-center">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              data-ocid={`cart.edit_button.${idx + 1}`}
                              onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors font-bold text-sm"
                              style={{ background: "rgba(255,255,255,0.08)" }}
                              aria-label="Aumentar quantidade"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right ml-1">
                            <p
                              className="font-bold text-sm"
                              style={{ color: "var(--gold)" }}
                            >
                              {fmtPrice(item.unitPrice * multiplier * item.qty)}
                            </p>
                          </div>
                          <button
                            type="button"
                            data-ocid={`cart.delete_button.${idx + 1}`}
                            onClick={() => removeItem(item.id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                            aria-label="Remover item"
                          >
                            ✕
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {cart.length === 0 && !showAddPanel && (
                      <div
                        data-ocid="cart.empty_state"
                        className="text-center py-8 rounded-xl"
                        style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
                      >
                        <p className="text-white/30 text-sm">
                          Nenhum compartimento adicionado
                        </p>
                        <p className="text-white/20 text-xs mt-1">
                          Clique abaixo para adicionar
                        </p>
                      </div>
                    )}

                    {/* Add Compartment Panel */}
                    <AnimatePresence>
                      {showAddPanel && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="p-4 rounded-2xl space-y-4"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(201,168,76,0.2)",
                            }}
                          >
                            <p
                              className="text-xs font-bold uppercase tracking-widest"
                              style={{ color: "var(--gold)" }}
                            >
                              Escolha o compartimento
                            </p>
                            <div className="grid grid-cols-5 gap-2">
                              {COMPARTMENTS.map((c) => {
                                const isSel = selectedComp === c.type;
                                return (
                                  <button
                                    key={c.type}
                                    type="button"
                                    data-ocid="quote.select"
                                    onClick={() => setSelectedComp(c.type)}
                                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all duration-200"
                                    style={{
                                      background: isSel
                                        ? "rgba(201,168,76,0.15)"
                                        : "rgba(255,255,255,0.05)",
                                      border: isSel
                                        ? "1.5px solid var(--gold)"
                                        : "1.5px solid rgba(255,255,255,0.08)",
                                      boxShadow: isSel
                                        ? "0 0 12px oklch(0.72 0.13 80 / 0.25)"
                                        : "none",
                                    }}
                                    title={c.type}
                                    aria-label={c.type}
                                  >
                                    <span className="text-xl">{c.icon}</span>
                                    <span
                                      className="text-[9px] text-center leading-tight"
                                      style={{
                                        color: isSel
                                          ? "var(--gold)"
                                          : "rgba(255,255,255,0.5)",
                                      }}
                                    >
                                      {c.type.split(" ")[0]}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {selectedComp && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-3"
                              >
                                <div>
                                  <p
                                    className="text-xs font-bold uppercase tracking-widest mb-2"
                                    style={{ color: "var(--gold)" }}
                                  >
                                    Quantidade
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setSelectedQty((q) =>
                                          Math.max(1, q - 1),
                                        )
                                      }
                                      className="w-10 h-10 rounded-full text-white font-bold text-lg flex items-center justify-center transition-colors"
                                      style={{
                                        background: "rgba(255,255,255,0.08)",
                                      }}
                                      aria-label="Diminuir"
                                    >
                                      −
                                    </button>
                                    <span className="text-white font-bold text-xl w-8 text-center">
                                      {selectedQty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setSelectedQty((q) => q + 1)
                                      }
                                      className="w-10 h-10 rounded-full text-white font-bold text-lg flex items-center justify-center transition-colors"
                                      style={{
                                        background: "rgba(255,255,255,0.08)",
                                      }}
                                      aria-label="Aumentar"
                                    >
                                      +
                                    </button>
                                    <div className="ml-auto text-right">
                                      <p className="text-white/40 text-xs">
                                        Preço unitário
                                      </p>
                                      <p
                                        className="font-bold text-sm"
                                        style={{ color: "var(--gold)" }}
                                      >
                                        {fmtPrice(
                                          (COMPARTMENTS.find(
                                            (c) => c.type === selectedComp,
                                          )?.price ?? 0) * multiplier,
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    data-ocid="quote.submit_button"
                                    onClick={addToCart}
                                    className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
                                    style={{
                                      background: "var(--gold)",
                                      color: "#0a1628",
                                    }}
                                  >
                                    Adicionar ao Pedido
                                  </button>
                                  <button
                                    type="button"
                                    data-ocid="quote.cancel_button"
                                    onClick={() => {
                                      setShowAddPanel(false);
                                      setSelectedComp("");
                                      setSelectedQty(1);
                                    }}
                                    className="px-4 py-3 rounded-xl font-semibold text-sm transition-all"
                                    style={{
                                      background: "rgba(255,255,255,0.06)",
                                      color: "rgba(255,255,255,0.6)",
                                    }}
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Add button */}
                    {!showAddPanel && (
                      <button
                        type="button"
                        data-ocid="cart.open_modal_button"
                        onClick={() => setShowAddPanel(true)}
                        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-80 active:scale-[.98]"
                        style={{
                          background: "rgba(201,168,76,0.1)",
                          border: "1.5px dashed oklch(0.72 0.13 80 / 0.5)",
                          color: "var(--gold)",
                        }}
                      >
                        <span className="text-lg">+</span> Adicionar
                        Compartimento
                      </button>
                    )}

                    {/* Mini total */}
                    {cart.length > 0 && (
                      <div
                        className="flex items-center justify-between px-4 py-3 rounded-xl"
                        style={{
                          background: "rgba(201,168,76,0.08)",
                          border: "1px solid rgba(201,168,76,0.2)",
                        }}
                      >
                        <span className="text-white/60 text-sm">
                          Total estimado
                        </span>
                        <span
                          className="font-bold text-base"
                          style={{ color: "var(--gold)" }}
                        >
                          {fmtPrice(total)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 3: Summary ── */}
                {step === 3 && (
                  <div className="space-y-5">
                    {/* Client summary */}
                    <div
                      className="p-4 rounded-xl space-y-2"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-3"
                        style={{ color: "var(--gold)" }}
                      >
                        Dados do Cliente
                      </p>
                      <div className="grid grid-cols-1 gap-1.5">
                        {[
                          { label: "Nome", val: nome },
                          { label: "WhatsApp", val: telefone },
                          { label: "Localização", val: localizacao },
                          {
                            label: "Serviço",
                            val:
                              tipoServico === "completo"
                                ? "Projeto Completo"
                                : "Apenas Design 3D",
                          },
                        ].map((r) => (
                          <div key={r.label} className="flex gap-2 text-sm">
                            <span className="text-white/40 w-24 flex-shrink-0">
                              {r.label}:
                            </span>
                            <span className="text-white font-medium">
                              {r.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cart summary */}
                    <div className="space-y-2">
                      <p
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: "var(--gold)" }}
                      >
                        Compartimentos
                      </p>
                      {cart.map((item, idx) => (
                        <div
                          key={item.id}
                          data-ocid={`summary.item.${idx + 1}`}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                          <span>{item.icon}</span>
                          <span className="flex-1 text-white text-sm">
                            {item.qty}x {item.type}
                          </span>
                          <span
                            className="font-semibold text-sm"
                            style={{ color: "var(--gold)" }}
                          >
                            {fmtPrice(item.unitPrice * multiplier * item.qty)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price breakdown */}
                    <div
                      className="rounded-xl p-4 space-y-2.5"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Subtotal base</span>
                        <span className="text-white">
                          {fmtPrice(subtotalBase)}
                        </span>
                      </div>
                      {tipoServico === "completo" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">
                            Acréscimo Projeto Completo (+50%)
                          </span>
                          <span className="text-white">
                            {fmtPrice(acrescimo)}
                          </span>
                        </div>
                      )}
                      <div
                        className="flex justify-between pt-2.5"
                        style={{
                          borderTop: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <span className="font-bold text-white">
                          Total Estimado
                        </span>
                        <span
                          className="font-bold text-lg"
                          style={{ color: "var(--gold)" }}
                        >
                          {fmtPrice(total)}
                        </span>
                      </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <button
                      type="button"
                      data-ocid="quote.submit_button"
                      onClick={sendWhatsApp}
                      className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-[.98]"
                      style={{
                        background:
                          "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                        color: "white",
                        boxShadow: "0 8px 32px rgba(37,211,102,0.3)",
                        minHeight: "60px",
                      }}
                    >
                      <WhatsAppIcon size={24} />📲 Receber Orçamento no WhatsApp
                    </button>
                    <p className="text-center text-xs text-white/30">
                      Será redirecionado para o WhatsApp com todos os detalhes
                      preenchidos.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Footer */}
          {step < 3 && (
            <div
              className="px-6 sm:px-10 py-5 flex items-center justify-between gap-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {step > 0 ? (
                <button
                  type="button"
                  data-ocid="quote.secondary_button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-80"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  ← Voltar
                </button>
              ) : (
                <div />
              )}
              <button
                type="button"
                data-ocid="quote.primary_button"
                onClick={handleNext}
                className="px-8 py-3 rounded-full font-bold text-sm transition-all hover:opacity-90 active:scale-95 flex items-center gap-2"
                style={{
                  background: "var(--gold)",
                  color: "#0a1628",
                  boxShadow: "0 4px 20px oklch(0.72 0.13 80 / 0.35)",
                  minHeight: "48px",
                }}
              >
                {step === 2 ? "Ver Resumo" : "Continuar"} →
              </button>
            </div>
          )}
          {step === 3 && (
            <div
              className="px-6 sm:px-10 py-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                type="button"
                data-ocid="quote.secondary_button"
                onClick={handleBack}
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-80"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                ← Editar Pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: "50+", label: "Projetos Realizados" },
    { value: "5", label: "Anos de Experiência" },
    { value: "100%", label: "Clientes Satisfeitos" },
  ];

  return (
    <section className="py-20 bg-white" id="sobre">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--gold)" }}
            >
              Quem Somos
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-5"
              style={{ color: "var(--navy)" }}
            >
              Sobre Nós
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base mb-8">
              Somos especialistas em arquitetura, design e execução de obras.
              Trabalhamos com profissionalismo, qualidade e foco no detalhe,
              desde o projeto até a entrega final.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 rounded-2xl border border-border"
                  style={{ background: "var(--surface)" }}
                >
                  <div
                    className="font-display text-3xl font-bold"
                    style={{ color: "var(--gold)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-card h-72 sm:h-80"
          >
            <img
              src="/assets/generated/hero-architecture.dim_1920x1080.jpg"
              alt="Projecto de arquitetura abvisarq"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      style={{ background: "var(--navy-dark)" }}
      className="text-white py-12"
    >
      <div className="h-1 w-full" style={{ background: "var(--gold)" }} />
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/assets/uploads/gemini-2.5-flash-image_Atualiza_esse_logo_deixe-o_com_2000x2000_pixels_e_inclua_as_informa-es_de_con-0-1.jpg"
                alt="abvisarq"
                className="h-10 w-10 object-cover rounded-full brightness-0 invert"
              />
            </div>
            <p className="text-white/60 text-sm max-w-xs">
              Arquitetura, design e execução com qualidade profissional.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/70">
            <div className="space-y-2">
              <div className="font-semibold text-white mb-1">Serviços</div>
              <div>Projetos de Arquitetura</div>
              <div>Design de Interiores</div>
              <div>Móveis por Medida</div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white mb-1">Contacto</div>
              <a
                data-ocid="footer.link"
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <WhatsAppIcon size={14} /> WhatsApp
              </a>
              <div className="text-white/50 text-xs">+258 863 148 895</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {year} abvisarq. Todos os direitos reservados.</span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ─────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a
      data-ocid="whatsapp.button"
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-gold transition-all hover:scale-110 active:scale-95"
      style={{ background: "var(--gold)" }}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const scrollToForm = () => {
    document
      .getElementById("orcamento")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans">
      <Header onScrollToForm={scrollToForm} />
      <main>
        <Hero onScrollToForm={scrollToForm} />
        <Services />
        <HowItWorks />
        <SmartQuoteForm />
        <About />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
