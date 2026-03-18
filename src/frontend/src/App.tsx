import { motion } from "motion/react";
import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  nome: string;
  telefone: string;
  localizacao: string;
  servico: string;
  subcategoria: string;
  descricao: string;
  imagem: File | null;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
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

const STEPS = [
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

const SUBCATEGORIAS = [
  "Guarda-fato",
  "Roupeiro",
  "Armário de cozinha",
  "Armário de banheiro",
  "Móvel de TV",
  "Cama",
  "Cabeceira",
  "Mesa",
  "Secretária",
  "Balcão",
  "Prateleira",
  "Estante",
  "Divisória",
  "Outro",
];

const WA_URL = "https://wa.me/258863148895";

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
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 font-bold text-xl bg-transparent border-none p-0 cursor-pointer"
          style={{ color: "var(--navy)" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Casa Fácil - início"
        >
          <span className="text-2xl">🏠</span>
          <span className="font-display tracking-tight">Casa Fácil</span>
        </button>

        {/* CTAs */}
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
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,58,92,0.85) 0%, rgba(10,20,40,0.65) 100%)",
        }}
      />

      {/* Gold line accent */}
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
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-[2.4rem] left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5"
            style={{ background: "var(--gold)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((step, i) => (
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

// ─── Quote Form ───────────────────────────────────────────────────────────────
function QuoteForm() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    telefone: "",
    localizacao: "",
    servico: "",
    subcategoria: "",
    descricao: "",
    imagem: null,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof FormState, value: string | File | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório";
    if (!form.telefone.trim()) e.telefone = "Telefone é obrigatório";
    if (!form.localizacao.trim()) e.localizacao = "Localização é obrigatória";
    if (!form.servico) e.servico = "Selecione um serviço";
    if (!form.descricao.trim()) e.descricao = "Descrição é obrigatória";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    let msg = `Olá, acabei de pedir um orçamento pela Casa Fácil.\n\nNome: ${form.nome}\nTelefone: ${form.telefone}\nLocalização: ${form.localizacao}\nServiço: ${form.servico}`;
    if (form.servico === "Móveis" && form.subcategoria) {
      msg += `\nSubcategoria: ${form.subcategoria}`;
    }
    msg += `\nDescrição: ${form.descricao}\n\nAguardo retorno.`;

    window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputCls = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 ${
      errors[field]
        ? "border-red-400 focus:ring-red-200"
        : "border-border focus:ring-[oklch(var(--ring)/0.3)] focus:border-[oklch(var(--accent))]"
    } bg-white`;

  const triggerFileInput = () => fileRef.current?.click();

  return (
    <section
      id="orcamento"
      className="py-20"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-border">
            <div className="mb-8">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--gold)" }}
              >
                Sem compromisso
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold mt-1"
                style={{ color: "var(--navy)" }}
              >
                Pedir Orçamento
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Preencha o formulário e receba o seu orçamento via WhatsApp.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
              data-ocid="quote.modal"
            >
              {/* Nome */}
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--navy)" }}
                >
                  Nome *
                </label>
                <input
                  id="nome"
                  data-ocid="quote.input"
                  type="text"
                  className={inputCls("nome")}
                  placeholder="O seu nome completo"
                  value={form.nome}
                  onChange={(e) => set("nome", e.target.value)}
                />
                {errors.nome && (
                  <p
                    data-ocid="quote.error_state"
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.nome}
                  </p>
                )}
              </div>

              {/* Telefone + Localização */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--navy)" }}
                  >
                    Telefone *
                  </label>
                  <input
                    id="telefone"
                    data-ocid="quote.telefone_input"
                    type="tel"
                    className={inputCls("telefone")}
                    placeholder="+258 8X XXX XXXX"
                    value={form.telefone}
                    onChange={(e) => set("telefone", e.target.value)}
                  />
                  {errors.telefone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.telefone}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="localizacao"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--navy)" }}
                  >
                    Localização *
                  </label>
                  <input
                    id="localizacao"
                    data-ocid="quote.localizacao_input"
                    type="text"
                    className={inputCls("localizacao")}
                    placeholder="Cidade / Bairro"
                    value={form.localizacao}
                    onChange={(e) => set("localizacao", e.target.value)}
                  />
                  {errors.localizacao && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.localizacao}
                    </p>
                  )}
                </div>
              </div>

              {/* Tipo de Serviço */}
              <div>
                <label
                  htmlFor="servico"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--navy)" }}
                >
                  Tipo de Serviço *
                </label>
                <select
                  id="servico"
                  data-ocid="quote.select"
                  className={inputCls("servico")}
                  value={form.servico}
                  onChange={(e) => {
                    set("servico", e.target.value);
                    set("subcategoria", "");
                  }}
                >
                  <option value="">Selecione um serviço</option>
                  <option>Arquitetura</option>
                  <option>Design de Interiores</option>
                  <option>Pisos</option>
                  <option>Móveis</option>
                  <option>Teto Falso</option>
                  <option>Pintura</option>
                  <option>Eletricidade</option>
                  <option>Canalização</option>
                </select>
                {errors.servico && (
                  <p className="text-red-500 text-xs mt-1">{errors.servico}</p>
                )}
              </div>

              {/* Subcategoria (conditional) */}
              {form.servico === "Móveis" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="subcategoria"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--navy)" }}
                  >
                    Subcategoria
                  </label>
                  <select
                    id="subcategoria"
                    data-ocid="quote.subcategoria_select"
                    className={inputCls("subcategoria")}
                    value={form.subcategoria}
                    onChange={(e) => set("subcategoria", e.target.value)}
                  >
                    <option value="">Selecione a subcategoria</option>
                    {SUBCATEGORIAS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Descrição */}
              <div>
                <label
                  htmlFor="descricao"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--navy)" }}
                >
                  Descrição *
                </label>
                <textarea
                  id="descricao"
                  data-ocid="quote.textarea"
                  rows={4}
                  className={`${inputCls("descricao")} resize-none`}
                  placeholder="Descreva o seu projeto ou o que necessita..."
                  value={form.descricao}
                  onChange={(e) => set("descricao", e.target.value)}
                />
                {errors.descricao && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.descricao}
                  </p>
                )}
              </div>

              {/* Upload */}
              <div>
                <label
                  htmlFor="imagem"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--navy)" }}
                >
                  Imagem (opcional)
                </label>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-border rounded-xl p-5 text-center cursor-pointer hover:border-[oklch(var(--accent))] transition-colors bg-white"
                  onClick={triggerFileInput}
                  data-ocid="quote.dropzone"
                  aria-label="Clique para adicionar uma foto"
                >
                  <input
                    ref={fileRef}
                    id="imagem"
                    data-ocid="quote.upload_button"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => set("imagem", e.target.files?.[0] ?? null)}
                  />
                  {form.imagem ? (
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--navy)" }}
                    >
                      📎 {form.imagem.name}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Clique para adicionar uma foto do espaço
                    </p>
                  )}
                </button>
              </div>

              {/* Submit */}
              <button
                data-ocid="quote.submit_button"
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-[.98] shadow-gold"
                style={{ background: "var(--gold)", minHeight: "56px" }}
              >
                <WhatsAppIcon size={22} />
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>
        </motion.div>
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
          {/* Text */}
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

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-card h-72 sm:h-80"
          >
            <img
              src="/assets/generated/hero-architecture.dim_1920x1080.jpg"
              alt="Projecto de arquitetura Casa Fácil"
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
      {/* Gold top accent */}
      <div className="h-1 w-full" style={{ background: "var(--gold)" }} />
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold font-display mb-2">
              <span>🏠</span> Casa Fácil
            </div>
            <p className="text-white/60 text-sm max-w-xs">
              Arquitetura, design e execução com qualidade profissional.
            </p>
          </div>

          {/* Links */}
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
          <span>© {year} Casa Fácil. Todos os direitos reservados.</span>
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
        <QuoteForm />
        <About />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
