import { useState } from 'react';
import Icon from '@/components/ui/icon';
import AdminPanel from '@/components/AdminPanel';

type Section = 'home' | 'connect' | 'terms' | 'contacts' | 'admin' | 'api';

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminStep, setAdminStep] = useState(1);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTwofa, setAdminTwofa] = useState('');
  const [adminError, setAdminError] = useState('');

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'connect', label: 'Подключение' },
    { id: 'terms', label: 'Условия' },
    { id: 'api', label: 'API' },
    { id: 'contacts', label: 'Контакты' },
    { id: 'admin', label: 'Админ-панель' },
  ];

  const handleAdminLogin = () => {
    if (adminStep === 1) {
      if (adminPassword === 'admin123') {
        setAdminStep(2);
        setAdminError('');
      } else {
        setAdminError('Неверный пароль');
      }
    } else if (adminStep === 2) {
      if (adminPin === '1234') {
        setAdminStep(3);
        setAdminError('');
      } else {
        setAdminError('Неверный PIN-код');
      }
    } else if (adminStep === 3) {
      if (adminTwofa === '000000') {
        setAdminAuthenticated(true);
        setAdminError('');
      } else {
        setAdminError('Неверный код 2FA');
      }
    }
  };

  return (
    <div className="min-h-screen noise-bg" style={{ background: 'var(--obsidian)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{
        background: 'rgba(10,10,15,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gold-gradient rounded-sm flex items-center justify-center">
              <span className="font-bold text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a0a0f' }}>A</span>
            </div>
            <span className="shimmer-text font-serif text-xl font-semibold tracking-wider">AuraPay</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-sm"
                style={activeSection === item.id
                  ? { borderBottom: '2px solid var(--gold)', color: 'var(--gold-light)' }
                  : { color: '#9ca3af' }
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div className="status-dot-green" />
              <span className="text-xs text-gray-500">Система работает</span>
            </div>
            <button className="md:hidden text-gray-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t px-6 py-3 space-y-1" style={{ borderColor: 'rgba(201,168,76,0.1)', background: 'rgba(10,10,15,0.98)' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id as Section); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm rounded-sm transition-all"
                style={activeSection === item.id ? { color: 'var(--gold)', background: 'rgba(201,168,76,0.08)' } : { color: '#9ca3af' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="pt-16">
        {/* HOME */}
        {activeSection === 'home' && (
          <div>
            {/* Hero */}
            <section className="relative min-h-screen flex items-center hero-grid overflow-hidden">
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,168,76,0.06) 0%, transparent 70%)'
              }} />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{
                background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
                filter: 'blur(60px)'
              }} />

              <div className="relative max-w-7xl mx-auto px-6 py-24">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-medium tracking-widest uppercase" style={{
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--gold)'
                  }}>
                    <div className="status-dot-gold" />
                    Премиум платёжная платформа
                  </div>

                  <h1 className="font-serif mb-6 leading-none" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#f0e8d0' }}>
                    Безопасные платежи<br />
                    <span className="shimmer-text">нового уровня</span>
                  </h1>

                  <p className="text-gray-400 mb-10 max-w-2xl leading-relaxed" style={{ fontSize: '1.125rem' }}>
                    AuraPay — платформа для приёма онлайн-платежей с трёхуровневой защитой,
                    прозрачной аналитикой и поддержкой 15+ платёжных систем. Подключите ваш сайт за 24 часа.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveSection('connect')}
                      className="group px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                        color: '#0a0a0f',
                        borderRadius: '4px',
                      }}
                    >
                      Подключить сайт
                      <Icon name="ArrowRight" size={16} className="inline ml-2" />
                    </button>
                    <button
                      onClick={() => setActiveSection('api')}
                      className="px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300"
                      style={{
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: 'var(--gold)',
                        borderRadius: '4px',
                        background: 'transparent',
                      }}
                    >
                      Документация API
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
                  {[
                    { value: '₽2.4B+', label: 'Оборот платформы' },
                    { value: '1,200+', label: 'Подключённых сайтов' },
                    { value: '99.98%', label: 'Uptime системы' },
                    { value: '< 1.5s', label: 'Среднее время оплаты' },
                  ].map((stat, i) => (
                    <div key={i} className="glass-card rounded-lg p-5">
                      <div className="font-serif text-2xl font-semibold mb-1" style={{ color: 'var(--gold-light)' }}>{stat.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="py-24 max-w-7xl mx-auto px-6">
              <div className="section-divider mb-16" />
              <div className="text-center mb-16">
                <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>Возможности</div>
                <h2 className="font-serif text-4xl md:text-5xl" style={{ color: '#f0e8d0' }}>Всё для вашего бизнеса</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: 'Shield', title: '3 уровня защиты', desc: 'SSL-шифрование, двухфакторная аутентификация и биометрическая верификация каждой транзакции' },
                  { icon: 'Zap', title: 'Мгновенные выплаты', desc: 'Вывод средств на расчётный счёт в течение 2-4 часов в любой рабочий день' },
                  { icon: 'BarChart3', title: 'Полная аналитика', desc: 'Дашборд с метриками в реальном времени: конверсия, объём, комиссии по каждой платёжной системе' },
                  { icon: 'Globe', title: '15+ платёжных систем', desc: 'ЮKassa, CloudPayments, Tinkoff, СБП, QIWI, WebMoney, крипта и международные карты' },
                  { icon: 'Code2', title: 'Простое API', desc: 'REST API с подробной документацией, SDK для PHP, Python, Node.js и готовые плагины для CMS' },
                  { icon: 'Headphones', title: 'Поддержка 24/7', desc: 'Личный менеджер для партнёров с оборотом от 1 млн ₽/мес. Ответ в чате — 2 минуты' },
                ].map((f, i) => (
                  <div key={i} className="glass-card glass-card-hover rounded-lg p-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(201,168,76,0.1)' }}>
                      <Icon name={f.icon as any} size={20} style={{ color: 'var(--gold)' }} />
                    </div>
                    <h3 className="font-serif text-lg mb-2" style={{ color: '#f0e8d0' }}>{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Payment Systems */}
            <section className="py-16 max-w-7xl mx-auto px-6">
              <div className="section-divider mb-16" />
              <div className="text-center mb-12">
                <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>Интеграции</div>
                <h2 className="font-serif text-3xl md:text-4xl" style={{ color: '#f0e8d0' }}>Поддерживаемые платёжные системы</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'ЮKassa', commission: '2.8%', icon: '💳' },
                  { name: 'CloudPayments', commission: '2.9%', icon: '☁️' },
                  { name: 'Tinkoff Pay', commission: '1.5%', icon: '🏦' },
                  { name: 'СБП', commission: '0.7%', icon: '⚡' },
                  { name: 'QIWI', commission: '3.2%', icon: '🥝' },
                  { name: 'WebMoney', commission: '2.5%', icon: '🌐' },
                  { name: 'Крипта', commission: '1.0%', icon: '₿' },
                  { name: 'Visa/MC', commission: '2.2%', icon: '💠' },
                ].map((ps, i) => (
                  <div key={i} className="glass-card glass-card-hover rounded-lg p-4 flex items-center gap-3">
                    <span className="text-2xl">{ps.icon}</span>
                    <div>
                      <div className="font-medium text-sm" style={{ color: '#f0e8d0' }}>{ps.name}</div>
                      <div className="text-xs" style={{ color: 'var(--gold)' }}>{ps.commission} комиссия</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Security */}
            <section className="py-24 max-w-7xl mx-auto px-6">
              <div className="section-divider mb-16" />
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>Защита</div>
                  <h2 className="font-serif text-4xl mb-6" style={{ color: '#f0e8d0' }}>Три уровня<br />безопасности</h2>
                  <p className="text-gray-400 mb-8 leading-relaxed">Каждая транзакция проходит через три независимых уровня верификации, соответствуя стандарту PCI DSS Level 1.</p>

                  <div className="space-y-4">
                    {[
                      { level: '01', title: 'SSL/TLS + Шифрование AES-256', desc: 'Все данные передаются по зашифрованному каналу. Ключи ротируются каждые 24 часа.' },
                      { level: '02', title: 'Двухфакторная аутентификация', desc: 'Каждый вывод средств подтверждается SMS + TOTP-кодом на привязанное устройство.' },
                      { level: '03', title: 'Мониторинг аномалий 24/7', desc: 'ИИ-система анализирует 200+ параметров каждой транзакции и блокирует подозрительные операции.' },
                    ].map((s, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-lg" style={{ border: '1px solid rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.03)' }}>
                        <div className="font-serif text-2xl font-light shrink-0" style={{ color: 'rgba(201,168,76,0.4)' }}>{s.level}</div>
                        <div>
                          <div className="font-medium text-sm mb-1" style={{ color: '#f0e8d0' }}>{s.title}</div>
                          <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="rounded-xl p-8 gold-glow animate-glow-pulse" style={{
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(10,10,15,0.8) 100%)',
                    border: '1px solid rgba(201,168,76,0.2)'
                  }}>
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)', border: '2px solid rgba(201,168,76,0.3)' }}>
                        <Icon name="ShieldCheck" size={36} style={{ color: 'var(--gold)' }} />
                      </div>
                      <div className="font-serif text-2xl mb-1" style={{ color: '#f0e8d0' }}>PCI DSS Level 1</div>
                      <div className="text-xs text-gray-500">Сертифицирован 2024</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'ISO 27001', icon: 'Award' },
                        { label: '152-ФЗ', icon: 'FileCheck' },
                        { label: 'GDPR', icon: 'Lock' },
                        { label: 'SOC 2 Type II', icon: 'CheckCircle' },
                      ].map((cert, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(201,168,76,0.1)' }}>
                          <Icon name={cert.icon as any} size={14} style={{ color: 'var(--gold)' }} />
                          <span className="text-xs font-medium" style={{ color: '#f0e8d0' }}>{cert.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CONNECT */}
        {activeSection === 'connect' && (
          <div className="min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>Подключение</div>
                <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: '#f0e8d0' }}>Подключите ваш сайт</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">Заполните заявку — наш менеджер свяжется в течение 2 часов</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {[
                  { step: '01', title: 'Оставьте заявку', desc: 'Заполните форму с информацией о вашем проекте' },
                  { step: '02', title: 'Проверка и договор', desc: 'Мы проверяем сайт (24ч) и готовим договор оферты' },
                  { step: '03', title: 'Интеграция', desc: 'Получаете API-ключи и подключаетесь за 1-2 дня' },
                ].map((s, i) => (
                  <div key={i} className="glass-card rounded-lg p-6 text-center">
                    <div className="font-serif text-5xl font-light mb-4" style={{ color: 'rgba(201,168,76,0.3)' }}>{s.step}</div>
                    <h3 className="font-serif text-lg mb-2" style={{ color: '#f0e8d0' }}>{s.title}</h3>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="glass-card rounded-xl p-8">
                  <h2 className="font-serif text-2xl mb-6" style={{ color: '#f0e8d0' }}>Заявка на подключение</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Ваше имя</label>
                        <input className="w-full px-4 py-3 rounded-lg text-sm bg-transparent" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="Иван Петров" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Телефон</label>
                        <input className="w-full px-4 py-3 rounded-lg text-sm bg-transparent" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="+7 (999) 000-00-00" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Email</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg text-sm bg-transparent" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="mail@company.ru" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>URL сайта</label>
                      <input className="w-full px-4 py-3 rounded-lg text-sm bg-transparent" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="https://yoursite.ru" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Тип бизнеса</label>
                      <select className="w-full px-4 py-3 rounded-lg text-sm" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', background: '#14141e', outline: 'none' }}>
                        <option value="">Выберите тип</option>
                        <option>Интернет-магазин</option>
                        <option>SaaS / Подписки</option>
                        <option>Инфобизнес</option>
                        <option>Услуги</option>
                        <option>Маркетплейс</option>
                        <option>Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Ожидаемый оборот в месяц</label>
                      <select className="w-full px-4 py-3 rounded-lg text-sm" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', background: '#14141e', outline: 'none' }}>
                        <option>До 100 000 ₽</option>
                        <option>100 000 — 500 000 ₽</option>
                        <option>500 000 — 2 000 000 ₽</option>
                        <option>2 000 000 — 10 000 000 ₽</option>
                        <option>Свыше 10 000 000 ₽</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Дополнительно</label>
                      <textarea className="w-full px-4 py-3 rounded-lg text-sm bg-transparent resize-none" rows={3} style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="Расскажите о вашем проекте..." />
                    </div>
                    <button className="w-full py-4 font-medium text-sm tracking-wide rounded-lg" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0f' }}>
                      Отправить заявку
                    </button>
                    <p className="text-xs text-gray-600 text-center">
                      Нажимая кнопку, вы соглашаетесь с{' '}
                      <button onClick={() => setActiveSection('terms')} className="underline" style={{ color: 'var(--gold)' }}>условиями использования</button>
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <h2 className="font-serif text-2xl mb-6 text-center" style={{ color: '#f0e8d0' }}>Тарифы</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { name: 'Старт', price: '0 ₽', commission: '3.5%', features: ['До 100 тыс ₽/мес', 'СБП + карты', 'Email поддержка', 'Базовая статистика'], highlight: false },
                      { name: 'Бизнес', price: '4 990 ₽/мес', commission: '2.2%', features: ['До 5 млн ₽/мес', 'Все платёжные системы', 'Личный менеджер', 'Расширенная аналитика', 'Webhook уведомления'], highlight: true },
                      { name: 'Премиум', price: 'Индивид.', commission: 'от 1.5%', features: ['Без лимитов', 'Приоритет 24/7', 'SLA 99.99%', 'Белый лейбл', 'Dedicated сервер'], highlight: false },
                    ].map((t, i) => (
                      <div key={i} className="rounded-xl p-6" style={{
                        background: t.highlight ? 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))' : 'rgba(20,20,30,0.8)',
                        border: t.highlight ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(201,168,76,0.1)',
                      }}>
                        {t.highlight && <div className="text-xs uppercase tracking-wider mb-3 text-center" style={{ color: 'var(--gold)' }}>Популярный</div>}
                        <div className="font-serif text-xl mb-1" style={{ color: '#f0e8d0' }}>{t.name}</div>
                        <div className="font-serif mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.5rem' }}>{t.price}</div>
                        <div className="text-xs text-gray-500 mb-4">Комиссия: {t.commission}</div>
                        <ul className="space-y-2">
                          {t.features.map((f, fi) => (
                            <li key={fi} className="flex items-center gap-2 text-sm text-gray-400">
                              <Icon name="Check" size={12} style={{ color: 'var(--gold)' }} />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <button className="w-full mt-5 py-2.5 text-sm font-medium rounded-lg transition-all" style={{
                          background: t.highlight ? 'linear-gradient(135deg, #c9a84c, #e8c96a)' : 'transparent',
                          color: t.highlight ? '#0a0a0f' : 'var(--gold)',
                          border: t.highlight ? 'none' : '1px solid rgba(201,168,76,0.3)',
                        }}>
                          Выбрать тариф
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TERMS */}
        {activeSection === 'terms' && (
          <div className="min-h-screen py-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>Правовая информация</div>
              <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: '#f0e8d0' }}>Условия использования</h1>
              <p className="text-gray-500 mb-12">Последнее обновление: 1 мая 2025 года</p>
              <div className="space-y-6">
                {[
                  { title: '1. Общие положения', content: 'Настоящие Условия регулируют отношения между ООО «АураПей» и пользователями платформы AuraPay. Используя сервис, вы подтверждаете согласие с настоящими Условиями в полном объёме.' },
                  { title: '2. Требования к подключению сайтов', content: 'К подключению допускаются только сайты, деятельность которых соответствует законодательству РФ. Запрещено подключение ресурсов, связанных с азартными играми без лицензии, продажей запрещённых веществ, нелицензионным контентом и иной противоправной деятельностью.' },
                  { title: '3. Комиссии и тарификация', content: 'Комиссия платформы указана в личном кабинете и зависит от тарифного плана. Все комиссии взимаются в момент проведения транзакции. Об изменении тарифов Платформа уведомляет за 30 дней.' },
                  { title: '4. Порядок выплат', content: 'Выплаты производятся на реквизиты из личного кабинета после прохождения верификации. Стандартный срок — 1-3 рабочих дня. Минимальная сумма вывода — 1 000 ₽. Для вывода свыше 500 000 ₽ может потребоваться дополнительная верификация.' },
                  { title: '5. Безопасность и ответственность', content: 'Пользователь обязан хранить API-ключи в тайне. Платформа не несёт ответственности за убытки от несанкционированного использования API-ключей по вине пользователя. Все данные банковских карт хранятся согласно стандарту PCI DSS.' },
                  { title: '6. Возвраты и чарджбэки', content: 'Политика возвратов устанавливается сайтом-партнёром самостоятельно. Комиссия за чарджбэк — 1 500 ₽ за каждый обоснованный случай. При превышении порога 1% за квартал Платформа вправе приостановить выплаты.' },
                  { title: '7. Персональные данные', content: 'Обработка персональных данных осуществляется в соответствии с ФЗ № 152-ФЗ. Данные плательщиков не передаются третьим лицам, за исключением случаев, предусмотренных законодательством РФ.' },
                  { title: '8. Ограничение ответственности', content: 'Совокупная ответственность Платформы не может превышать суммы комиссий за последние 3 месяца. Платформа не несёт ответственности за косвенные убытки и упущенную выгоду.' },
                ].map((section, i) => (
                  <div key={i} className="glass-card rounded-lg p-6">
                    <h3 className="font-serif text-xl mb-3" style={{ color: 'var(--gold-light)' }}>{section.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* API */}
        {activeSection === 'api' && (
          <div className="min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>Разработчикам</div>
              <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: '#f0e8d0' }}>API Документация</h1>
              <p className="text-gray-400 mb-12 max-w-2xl">REST API с авторизацией по токену. Все запросы возвращают JSON. Версия API: v2</p>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <div className="glass-card rounded-lg p-4 sticky top-20">
                    <div className="text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--gold)' }}>Разделы</div>
                    {['Авторизация', 'Платежи', 'Выплаты', 'Webhook', 'Статусы', 'Ошибки'].map((item, i) => (
                      <div key={i} className="admin-sidebar-item px-3 py-2 rounded-sm text-sm cursor-pointer mb-1" style={{ color: '#9ca3af' }}>{item}</div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                  <div className="glass-card rounded-lg p-6">
                    <h2 className="font-serif text-2xl mb-2" style={{ color: '#f0e8d0' }}>Авторизация</h2>
                    <p className="text-gray-500 text-sm mb-4">Все запросы требуют заголовок Authorization с Bearer-токеном из личного кабинета.</p>
                    <div className="code-block rounded-lg p-4">
                      <div><span className="code-comment">// Пример заголовка</span></div>
                      <div><span className="code-keyword">Authorization</span>: <span className="code-string">Bearer ap_live_xxxxxxxxxxxx</span></div>
                      <div className="mt-2"><span className="code-keyword">Content-Type</span>: <span className="code-string">application/json</span></div>
                      <div className="mt-2"><span className="code-keyword">X-Shop-Id</span>: <span className="code-string">your_shop_id</span></div>
                    </div>
                  </div>

                  <div className="glass-card rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 text-xs font-bold rounded" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>POST</span>
                      <code className="text-sm" style={{ color: 'var(--gold-light)' }}>/v2/payments/create</code>
                    </div>
                    <h2 className="font-serif text-xl mb-2" style={{ color: '#f0e8d0' }}>Создание платежа</h2>
                    <p className="text-gray-500 text-sm mb-4">Инициирует новый платёж и возвращает URL для перенаправления покупателя.</p>
                    <div className="code-block rounded-lg p-4 overflow-x-auto">
                      <div><span className="code-comment">// Тело запроса</span></div>
                      <div>{'{'}</div>
                      <div className="pl-4"><span className="code-keyword">"amount"</span>: <span className="code-number">1500.00</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"currency"</span>: <span className="code-string">"RUB"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"order_id"</span>: <span className="code-string">"order_12345"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"description"</span>: <span className="code-string">"Оплата заказа #12345"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"return_url"</span>: <span className="code-string">"https://yoursite.ru/success"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"method"</span>: <span className="code-string">"card"</span></div>
                      <div>{'}'}</div>
                      <div className="mt-3"><span className="code-comment">// Ответ</span></div>
                      <div>{'{'}</div>
                      <div className="pl-4"><span className="code-keyword">"payment_id"</span>: <span className="code-string">"pay_abc123xyz"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"status"</span>: <span className="code-string">"pending"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"redirect_url"</span>: <span className="code-string">"https://pay.aurapay.ru/p/abc123"</span></div>
                      <div>{'}'}</div>
                    </div>
                  </div>

                  <div className="glass-card rounded-lg p-6">
                    <h2 className="font-serif text-2xl mb-2" style={{ color: '#f0e8d0' }}>Webhook уведомления</h2>
                    <p className="text-gray-500 text-sm mb-4">После завершения платежа AuraPay отправляет POST-запрос на ваш URL.</p>
                    <div className="code-block rounded-lg p-4">
                      <div>{'{'}</div>
                      <div className="pl-4"><span className="code-keyword">"event"</span>: <span className="code-string">"payment.completed"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"payment_id"</span>: <span className="code-string">"pay_abc123xyz"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"order_id"</span>: <span className="code-string">"order_12345"</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"amount"</span>: <span className="code-number">1500.00</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"fee"</span>: <span className="code-number">33.00</span>,</div>
                      <div className="pl-4"><span className="code-keyword">"signature"</span>: <span className="code-string">"sha256_hmac_hash"</span></div>
                      <div>{'}'}</div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
                      <p className="text-xs text-gray-400">
                        <Icon name="AlertTriangle" size={12} className="inline mr-1" style={{ color: 'var(--gold)' }} />
                        Всегда проверяйте подпись <code style={{ color: 'var(--gold-light)' }}>signature</code> перед обработкой webhook
                      </p>
                    </div>
                  </div>

                  <div className="glass-card rounded-lg p-6">
                    <h2 className="font-serif text-2xl mb-4" style={{ color: '#f0e8d0' }}>Коды статусов</h2>
                    <div className="space-y-2">
                      {[
                        { code: 'pending', color: '#facc15', desc: 'Платёж создан, ожидает оплаты' },
                        { code: 'processing', color: '#60a5fa', desc: 'Проводится обработка' },
                        { code: 'completed', color: '#4ade80', desc: 'Платёж успешно завершён' },
                        { code: 'failed', color: '#f87171', desc: 'Платёж отклонён' },
                        { code: 'refunded', color: '#c084fc', desc: 'Выполнен возврат' },
                        { code: 'chargeback', color: '#f97316', desc: 'Оспаривание платежа' },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-4 py-2 px-3 rounded-lg table-row-hover">
                          <code className="text-sm w-28 shrink-0" style={{ color: s.color }}>{s.code}</code>
                          <span className="text-sm text-gray-400">{s.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {activeSection === 'contacts' && (
          <div className="min-h-screen py-24">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>Свяжитесь с нами</div>
              <h1 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: '#f0e8d0' }}>Контакты и поддержка</h1>
              <p className="text-gray-400 mb-16 max-w-2xl">Мы всегда на связи. Выберите удобный способ контакта — ответим в течение 15 минут в рабочее время.</p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: 'MessageCircle', title: 'Онлайн-чат', info: 'В правом нижнем углу', time: 'Пн-Пт 09:00–21:00' },
                  { icon: 'Mail', title: 'Email', info: 'support@aurapay.ru', time: 'Ответ до 4 часов' },
                  { icon: 'Phone', title: 'Телефон', info: '+7 (800) 555-35-35', time: 'Пн-Пт 09:00–18:00' },
                ].map((c, i) => (
                  <div key={i} className="glass-card glass-card-hover rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(201,168,76,0.1)' }}>
                      <Icon name={c.icon as any} size={24} style={{ color: 'var(--gold)' }} />
                    </div>
                    <h3 className="font-serif text-xl mb-1" style={{ color: '#f0e8d0' }}>{c.title}</h3>
                    <p className="text-sm mb-1" style={{ color: 'var(--gold-light)' }}>{c.info}</p>
                    <p className="text-xs text-gray-600">{c.time}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card rounded-xl p-8">
                  <h2 className="font-serif text-2xl mb-6" style={{ color: '#f0e8d0' }}>Написать в поддержку</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Ваше имя</label>
                      <input className="w-full px-4 py-3 rounded-lg text-sm bg-transparent" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="Имя Фамилия" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Email</label>
                      <input className="w-full px-4 py-3 rounded-lg text-sm bg-transparent" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="mail@example.ru" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Тема</label>
                      <select className="w-full px-4 py-3 rounded-lg text-sm" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', background: '#14141e', outline: 'none' }}>
                        <option>Технический вопрос</option>
                        <option>Вопрос по выплатам</option>
                        <option>Подключение сайта</option>
                        <option>Проблема с платежом</option>
                        <option>Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Сообщение</label>
                      <textarea className="w-full px-4 py-3 rounded-lg text-sm bg-transparent resize-none" rows={4} style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="Опишите ваш вопрос..." />
                    </div>
                    <button className="w-full py-3 font-medium text-sm rounded-lg" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0f' }}>
                      Отправить обращение
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="font-serif text-xl mb-4" style={{ color: '#f0e8d0' }}>FAQ</h3>
                    <div className="space-y-3">
                      {[
                        { q: 'Как долго рассматривается заявка?', a: 'От 1 до 3 рабочих дней после предоставления всех документов.' },
                        { q: 'Какие документы нужны для ИП?', a: 'Паспорт, ОГРНИП, ИНН, расчётный счёт.' },
                        { q: 'Можно ли сменить тариф?', a: 'Да, в любой момент через личный кабинет без штрафов.' },
                        { q: 'Есть ли тестовый режим?', a: 'Да, sandbox-среда доступна сразу после регистрации.' },
                      ].map((faq, i) => (
                        <div key={i} className="py-3" style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                          <div className="text-sm font-medium mb-1" style={{ color: '#f0e8d0' }}>{faq.q}</div>
                          <div className="text-xs text-gray-500">{faq.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="status-dot-green" />
                      <span className="text-sm" style={{ color: '#f0e8d0' }}>Все системы работают</span>
                    </div>
                    <div className="space-y-2 mt-4">
                      {['API Gateway', 'Платёжный процессор', 'Webhook доставка', 'Панель управления'].map((s, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{s}</span>
                          <span className="text-xs" style={{ color: '#4ade80' }}>✓ Online</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN AUTH */}
        {activeSection === 'admin' && !adminAuthenticated && (
          <div className="min-h-screen flex items-center justify-center py-24">
            <div className="w-full max-w-md px-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center animate-glow-pulse" style={{ background: 'rgba(201,168,76,0.1)', border: '2px solid rgba(201,168,76,0.3)' }}>
                  <Icon name="Lock" size={28} style={{ color: 'var(--gold)' }} />
                </div>
                <h1 className="font-serif text-3xl mb-2" style={{ color: '#f0e8d0' }}>Административный вход</h1>
                <p className="text-sm text-gray-500">
                  {adminStep === 1 && 'Шаг 1 из 3: Введите пароль'}
                  {adminStep === 2 && 'Шаг 2 из 3: PIN-код'}
                  {adminStep === 3 && 'Шаг 3 из 3: Двухфакторная аутентификация'}
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {[1, 2, 3].map(step => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium" style={{
                        background: adminStep >= step ? 'linear-gradient(135deg, #c9a84c, #e8c96a)' : 'rgba(201,168,76,0.1)',
                        color: adminStep >= step ? '#0a0a0f' : '#6b7280',
                        border: adminStep >= step ? 'none' : '1px solid rgba(201,168,76,0.2)',
                      }}>
                        {adminStep > step ? '✓' : step}
                      </div>
                      {step < 3 && <div className="w-10 h-px" style={{ background: adminStep > step ? 'var(--gold)' : 'rgba(201,168,76,0.2)' }} />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-8">
                {adminStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Пароль</label>
                      <input type="password" className="w-full px-4 py-3 rounded-lg text-sm bg-transparent" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="••••••••" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminLogin()} />
                    </div>
                    <p className="text-xs text-gray-600">Демо-пароль: admin123</p>
                  </div>
                )}
                {adminStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>PIN-код (4 цифры)</label>
                      <input type="password" maxLength={4} className="w-full px-4 py-3 rounded-lg text-sm bg-transparent text-center text-xl tracking-widest" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="••••" value={adminPin} onChange={e => setAdminPin(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminLogin()} />
                    </div>
                    <p className="text-xs text-gray-600">Демо PIN: 1234</p>
                  </div>
                )}
                {adminStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Код из приложения (2FA)</label>
                      <input type="text" maxLength={6} className="w-full px-4 py-3 rounded-lg text-sm bg-transparent text-center text-xl tracking-widest" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#f0e8d0', outline: 'none' }} placeholder="000000" value={adminTwofa} onChange={e => setAdminTwofa(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminLogin()} />
                    </div>
                    <p className="text-xs text-gray-600">Демо 2FA код: 000000</p>
                  </div>
                )}

                {adminError && (
                  <div className="mt-3 px-3 py-2 rounded-lg text-sm flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                    <Icon name="AlertCircle" size={14} />
                    {adminError}
                  </div>
                )}

                <button onClick={handleAdminLogin} className="w-full mt-5 py-3 font-medium text-sm rounded-lg" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0f' }}>
                  {adminStep === 3 ? 'Войти в панель' : 'Продолжить'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'admin' && adminAuthenticated && (
          <AdminPanel onLogout={() => { setAdminAuthenticated(false); setAdminStep(1); setAdminPassword(''); setAdminPin(''); setAdminTwofa(''); }} />
        )}

        {/* Footer */}
        {activeSection !== 'admin' && (
          <footer className="py-12 mt-16" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 gold-gradient rounded-sm flex items-center justify-center">
                  <span className="font-bold text-xs" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a0a0f' }}>A</span>
                </div>
                <span className="font-serif text-sm" style={{ color: 'var(--gold)' }}>AuraPay</span>
              </div>
              <div className="flex items-center gap-6 text-xs text-gray-600">
                {(['terms', 'contacts', 'api'] as Section[]).map((s) => (
                  <button key={s} onClick={() => setActiveSection(s)} className="hover:text-gray-400 transition-colors">
                    {s === 'terms' ? 'Условия' : s === 'contacts' ? 'Контакты' : 'API'}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-700">© 2025 AuraPay. ООО «АураПей»</div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
