import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const paymentSystems = [
  { name: 'СБП', tag: 'Мгновенно', icon: '⚡', rate: 0.7, settle: '15 сек', limit: '1 000 000 ₽', accent: '#4ade80' },
  { name: 'Tinkoff Pay', tag: 'Лидер рынка', icon: '🏦', rate: 1.5, settle: '1 мин', limit: '500 000 ₽', accent: '#facc15' },
  { name: 'ЮKassa', tag: 'Универсальный', icon: '💳', rate: 2.8, settle: '2 мин', limit: '600 000 ₽', accent: '#a78bfa' },
  { name: 'CloudPayments', tag: 'Подписки', icon: '☁️', rate: 2.9, settle: '3 мин', limit: '1 000 000 ₽', accent: '#60a5fa' },
  { name: 'Visa / MasterCard', tag: 'Международный', icon: '💠', rate: 2.2, settle: '5 мин', limit: 'Без лимита', accent: '#fb923c' },
  { name: 'Mir Pay', tag: 'Национальный', icon: '🪙', rate: 1.8, settle: '1 мин', limit: '500 000 ₽', accent: '#34d399' },
  { name: 'QIWI', tag: 'Кошелёк', icon: '🥝', rate: 3.2, settle: '10 мин', limit: '250 000 ₽', accent: '#84cc16' },
  { name: 'WebMoney', tag: 'Кошелёк', icon: '🌐', rate: 2.5, settle: '15 мин', limit: '300 000 ₽', accent: '#06b6d4' },
  { name: 'ЮMoney', tag: 'Кошелёк', icon: '💼', rate: 2.6, settle: '5 мин', limit: '250 000 ₽', accent: '#f472b6' },
  { name: 'Apple Pay', tag: 'NFC', icon: '🍎', rate: 2.3, settle: '30 сек', limit: '500 000 ₽', accent: '#e2e8f0' },
  { name: 'USDT TRC-20', tag: 'Стейблкойн', icon: '₮', rate: 1.0, settle: '3 мин', limit: 'Без лимита', accent: '#10b981' },
  { name: 'Bitcoin', tag: 'Криптовалюта', icon: '₿', rate: 1.2, settle: '15 мин', limit: 'Без лимита', accent: '#f59e0b' },
];

const liveFeed = [
  { method: 'СБП', amount: 4250, site: 'store.brand.ru', city: 'Москва' },
  { method: 'Visa', amount: 18900, site: 'saas.myapp.ru', city: 'СПб' },
  { method: 'Tinkoff', amount: 7400, site: 'info.course.ru', city: 'Казань' },
  { method: 'USDT', amount: 145200, site: 'wholesale.b2b.ru', city: 'Дубай' },
  { method: 'СБП', amount: 990, site: 'cafe.delivery.ru', city: 'Краснодар' },
  { method: 'ЮKassa', amount: 12300, site: 'fashion.shop.ru', city: 'Москва' },
  { method: 'Apple Pay', amount: 3200, site: 'gym.club.ru', city: 'Сочи' },
  { method: 'Mir', amount: 8800, site: 'books.online.ru', city: 'Нижний Новгород' },
];

export default function PaymentEcosystem() {
  const [calcAmount, setCalcAmount] = useState(50000);
  const [selectedSystem, setSelectedSystem] = useState(0);
  const [feedItems, setFeedItems] = useState(liveFeed.slice(0, 5));
  const [hoveredSystem, setHoveredSystem] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setFeedItems(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * liveFeed.length);
        next.unshift({ ...liveFeed[idx], amount: liveFeed[idx].amount + Math.floor(Math.random() * 500) });
        return next.slice(0, 5);
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const sys = paymentSystems[selectedSystem];
  const commission = (calcAmount * sys.rate) / 100;
  const received = calcAmount - commission;

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(232,201,106,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="section-divider mb-20" />

        {/* Editorial header */}
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3" style={{ color: 'var(--gold)' }}>
              <span className="w-8 h-px" style={{ background: 'var(--gold)' }} />
              Глава 02
            </div>
            <div className="font-serif italic text-sm" style={{ color: 'rgba(232,201,106,0.6)' }}>Экосистема платежей</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#f0e8d0' }}>
              Деньги, что движутся<br />
              <span className="font-serif italic" style={{ color: 'rgba(232,201,106,0.85)' }}>со скоростью мысли.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-2xl" style={{ fontSize: '1.05rem' }}>
              Двенадцать платёжных артерий, объединённых в одну вену. От мгновенного СБП
              до международных карт и стейблкойнов — выберите любой путь, и ваш покупатель
              пройдёт его за секунды, не задумываясь о том, как устроена магия под капотом.
            </p>
          </div>
        </div>

        {/* Main grid: calculator + live feed */}
        <div className="grid lg:grid-cols-5 gap-6 mb-20">
          {/* Calculator */}
          <div className="lg:col-span-3 glass-card rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30" style={{
              background: `radial-gradient(circle, ${sys.accent}22 0%, transparent 70%)`,
              filter: 'blur(40px)',
              transition: 'all 0.5s ease'
            }} />

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>Калькулятор</div>
                  <div className="font-serif text-2xl" style={{ color: '#f0e8d0' }}>Сколько вы получите?</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider mb-1 text-gray-600">Выбранный метод</div>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-2xl">{sys.icon}</span>
                    <span className="font-serif text-base" style={{ color: '#f0e8d0' }}>{sys.name}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Сумма платежа</label>
                <div className="relative">
                  <input
                    type="range"
                    min={500}
                    max={500000}
                    step={500}
                    value={calcAmount}
                    onChange={e => setCalcAmount(Number(e.target.value))}
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #c9a84c 0%, #e8c96a ${(calcAmount / 500000) * 100}%, rgba(201,168,76,0.15) ${(calcAmount / 500000) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>500 ₽</span>
                    <span className="font-serif text-3xl absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap" style={{ color: '#e8c96a' }}>
                      {calcAmount.toLocaleString('ru-RU')} ₽
                    </span>
                    <span>500 000 ₽</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-10">
                <div className="p-4 rounded-xl" style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(201,168,76,0.1)' }}>
                  <div className="text-xs uppercase tracking-wider mb-1 text-gray-600">Платёж</div>
                  <div className="font-serif text-lg" style={{ color: '#f0e8d0' }}>{calcAmount.toLocaleString('ru-RU')}₽</div>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#f87171' }}>Комиссия {sys.rate}%</div>
                  <div className="font-serif text-lg" style={{ color: '#fca5a5' }}>−{commission.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}₽</div>
                </div>
                <div className="p-4 rounded-xl gold-glow" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(232,201,106,0.06))', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--gold)' }}>К зачислению</div>
                  <div className="font-serif text-lg shimmer-text">{received.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}₽</div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-6 pt-6" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon name="Clock" size={12} style={{ color: 'var(--gold)' }} />
                  Зачисление: <span style={{ color: '#f0e8d0' }}>{sys.settle}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon name="TrendingUp" size={12} style={{ color: 'var(--gold)' }} />
                  Лимит: <span style={{ color: '#f0e8d0' }}>{sys.limit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live feed */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--gold)' }}>Live</div>
                <div className="font-serif text-lg" style={{ color: '#f0e8d0' }}>Платежи прямо сейчас</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-dot-green" />
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>

            <div className="space-y-2">
              {feedItems.map((item, i) => (
                <div
                  key={`${item.site}-${item.amount}-${i}`}
                  className="flex items-center gap-3 p-3 rounded-lg animate-slide-in-right"
                  style={{
                    background: i === 0 ? 'rgba(201,168,76,0.06)' : 'rgba(10,10,15,0.4)',
                    border: '1px solid rgba(201,168,76,0.08)',
                    opacity: 1 - i * 0.12,
                  }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                    <Icon name="ArrowDownLeft" size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate" style={{ color: '#f0e8d0' }}>{item.site}</span>
                      <span className="font-serif text-sm shrink-0" style={{ color: 'var(--gold-light)' }}>+{item.amount.toLocaleString('ru-RU')}₽</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-0.5">
                      <span>{item.method}</span>
                      <span>·</span>
                      <span>{item.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 grid grid-cols-2 gap-3" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
              <div>
                <div className="font-serif text-xl" style={{ color: 'var(--gold-light)' }}>4 217</div>
                <div className="text-xs text-gray-600">платежей за час</div>
              </div>
              <div>
                <div className="font-serif text-xl" style={{ color: 'var(--gold-light)' }}>₽3.4М</div>
                <div className="text-xs text-gray-600">оборот за час</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment systems grid */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--gold)' }}>12 методов</div>
              <h3 className="font-serif text-3xl md:text-4xl" style={{ color: '#f0e8d0' }}>
                Каждый способ — <span className="font-serif italic" style={{ color: 'rgba(232,201,106,0.8)' }}>отдельная история</span>
              </h3>
            </div>
            <div className="text-xs text-gray-600 hidden md:block">Нажмите, чтобы рассчитать комиссию →</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {paymentSystems.map((ps, i) => (
              <button
                key={i}
                onClick={() => setSelectedSystem(i)}
                onMouseEnter={() => setHoveredSystem(i)}
                onMouseLeave={() => setHoveredSystem(null)}
                className="relative text-left rounded-xl p-5 transition-all duration-300 group overflow-hidden"
                style={{
                  background: selectedSystem === i
                    ? 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))'
                    : 'rgba(20,20,30,0.6)',
                  border: selectedSystem === i
                    ? '1px solid rgba(201,168,76,0.4)'
                    : '1px solid rgba(201,168,76,0.08)',
                  transform: hoveredSystem === i ? 'translateY(-3px)' : 'translateY(0)',
                }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-30 transition-opacity group-hover:opacity-60" style={{
                  background: `radial-gradient(circle, ${ps.accent}33 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                }} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{ps.icon}</span>
                    {selectedSystem === i && (
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
                    )}
                  </div>
                  <div className="font-serif text-base mb-0.5" style={{ color: '#f0e8d0' }}>{ps.name}</div>
                  <div className="text-xs mb-3" style={{ color: ps.accent, opacity: 0.7 }}>{ps.tag}</div>
                  <div className="flex items-end justify-between pt-3" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                    <span className="text-xs text-gray-600">от</span>
                    <span className="font-serif text-lg" style={{ color: 'var(--gold-light)' }}>{ps.rate}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment lifecycle */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--gold)' }}>Путь монеты</div>
            <h3 className="font-serif text-3xl md:text-4xl mb-3" style={{ color: '#f0e8d0' }}>
              <span className="font-serif italic" style={{ color: 'rgba(232,201,106,0.8)' }}>Четыре секунды,</span> чтобы изменить владельца
            </h3>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">От клика покупателя до зачисления на ваш счёт. Каждый шаг — выверен до миллисекунды.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px" style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), rgba(201,168,76,0.4), transparent)'
            }} />

            {[
              { time: '0.0s', icon: 'MousePointerClick', title: 'Покупатель кликает', desc: 'Открывается защищённое платёжное окно с вашим брендом' },
              { time: '0.4s', icon: 'ShieldCheck', title: 'Антифрод-проверка', desc: '200+ параметров анализируются ИИ за доли секунды' },
              { time: '1.8s', icon: 'CheckCircle2', title: 'Банк подтверждает', desc: 'Платёж проходит через эквайер и резервируется на счету' },
              { time: '4.0s', icon: 'Wallet', title: 'Зачисление', desc: 'Средства появляются в вашем кабинете, готовы к выводу' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="glass-card glass-card-hover rounded-xl p-6 h-full">
                  <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center mx-auto" style={{
                    background: 'rgba(10,10,15,0.9)',
                    border: '2px solid rgba(201,168,76,0.3)',
                  }}>
                    <Icon name={step.icon} fallback="Circle" size={20} style={{ color: 'var(--gold)' }} />
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-2xl mb-1" style={{ color: 'var(--gold-light)' }}>{step.time}</div>
                    <div className="text-sm font-medium mb-2" style={{ color: '#f0e8d0' }}>{step.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: 'Banknote', title: 'Защита средств', desc: 'Деньги клиентов хранятся на сегрегированных счетах в банках уровня А+. Защищены страховкой АСВ.', meta: 'Ст. 35 ГК РФ' },
            { icon: 'RefreshCw', title: 'Гарантия возвратов', desc: 'Полный или частичный рефанд в один клик. Деньги возвращаются клиенту в течение 24 часов.', meta: 'Без скрытых сборов' },
            { icon: 'Scale', title: 'Прозрачные комиссии', desc: 'Никаких скрытых платежей. Все ставки фиксированы и зафиксированы в договоре оферты.', meta: 'Аудит KPMG 2024' },
          ].map((g, i) => (
            <div key={i} className="glass-card glass-card-hover rounded-2xl p-7">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <Icon name={g.icon} fallback="Shield" size={20} style={{ color: 'var(--gold)' }} />
                </div>
                <div className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: 'var(--gold)'
                }}>{g.meta}</div>
              </div>
              <h4 className="font-serif text-xl mb-2" style={{ color: '#f0e8d0' }}>{g.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
