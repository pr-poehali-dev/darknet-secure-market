import { useState } from 'react';
import Icon from '@/components/ui/icon';

type AdminTab = 'dashboard' | 'applications' | 'requisites' | 'withdrawals' | 'profit' | 'commissions' | 'monitoring';

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const sidebarItems: { id: AdminTab; icon: string; label: string }[] = [
    { id: 'dashboard', icon: 'LayoutDashboard', label: 'Дашборд' },
    { id: 'monitoring', icon: 'Activity', label: 'Мониторинг' },
    { id: 'applications', icon: 'FileText', label: 'Заявки на подключение' },
    { id: 'requisites', icon: 'CreditCard', label: 'Реквизиты пополнения' },
    { id: 'withdrawals', icon: 'ArrowUpCircle', label: 'Выводы с сайтов' },
    { id: 'profit', icon: 'TrendingUp', label: 'Профит сайтов' },
    { id: 'commissions', icon: 'Percent', label: 'Комиссии систем' },
  ];

  const applications = [
    { id: 'AP-001', site: 'shop.example.ru', name: 'Иван Петров', type: 'Интернет-магазин', date: '12.05.2025', turnover: '500К ₽', status: 'pending' },
    { id: 'AP-002', site: 'saas.myapp.ru', name: 'Мария Сидорова', type: 'SaaS', date: '11.05.2025', turnover: '2М ₽', status: 'active' },
    { id: 'AP-003', site: 'store.brand.ru', name: 'Алексей Козлов', type: 'Маркетплейс', date: '10.05.2025', turnover: '10М ₽', status: 'active' },
    { id: 'AP-004', site: 'info.course.ru', name: 'Елена Новикова', type: 'Инфобизнес', date: '09.05.2025', turnover: '300К ₽', status: 'rejected' },
    { id: 'AP-005', site: 'service.pro.ru', name: 'Дмитрий Волков', type: 'Услуги', date: '08.05.2025', turnover: '800К ₽', status: 'pending' },
  ];

  const withdrawals = [
    { id: 'W-8821', site: 'shop.example.ru', amount: '45,000 ₽', method: 'Банковский счёт', date: '13.05.2025 09:14', status: 'completed' },
    { id: 'W-8820', site: 'saas.myapp.ru', amount: '120,500 ₽', method: 'Банковский счёт', date: '13.05.2025 08:55', status: 'pending' },
    { id: 'W-8819', site: 'store.brand.ru', amount: '890,000 ₽', method: 'Банковский счёт', date: '12.05.2025 18:30', status: 'completed' },
    { id: 'W-8818', site: 'service.pro.ru', amount: '23,750 ₽', method: 'Банковский счёт', date: '12.05.2025 15:10', status: 'pending' },
    { id: 'W-8817', site: 'info.course.ru', amount: '67,200 ₽', method: 'Банковский счёт', date: '11.05.2025 12:00', status: 'completed' },
  ];

  const profitData = [
    { site: 'store.brand.ru', volume: '8,450,000 ₽', commission: '185,900 ₽', transactions: 1247, avg: '6,776 ₽', trend: '+12%' },
    { site: 'saas.myapp.ru', volume: '1,890,000 ₽', commission: '41,580 ₽', transactions: 328, avg: '5,762 ₽', trend: '+8%' },
    { site: 'shop.example.ru', volume: '487,500 ₽', commission: '10,725 ₽', transactions: 195, avg: '2,500 ₽', trend: '+3%' },
    { site: 'service.pro.ru', volume: '234,000 ₽', commission: '5,148 ₽', transactions: 89, avg: '2,629 ₽', trend: '-2%' },
    { site: 'info.course.ru', volume: '156,000 ₽', commission: '3,432 ₽', transactions: 52, avg: '3,000 ₽', trend: '+18%' },
  ];

  const commissions = [
    { system: 'СБП', icon: '⚡', ourRate: '0.7%', bankRate: '0.4%', margin: '0.3%', volume: '₽12.4М', status: 'active' },
    { system: 'Tinkoff Pay', icon: '🏦', ourRate: '1.5%', bankRate: '1.0%', margin: '0.5%', volume: '₽8.1М', status: 'active' },
    { system: 'Крипта', icon: '₿', ourRate: '1.0%', bankRate: '0.5%', margin: '0.5%', volume: '₽3.2М', status: 'active' },
    { system: 'Visa/Mastercard', icon: '💠', ourRate: '2.2%', bankRate: '1.6%', margin: '0.6%', volume: '₽21.7М', status: 'active' },
    { system: 'ЮKassa', icon: '💳', ourRate: '2.8%', bankRate: '2.2%', margin: '0.6%', volume: '₽18.3М', status: 'active' },
    { system: 'CloudPayments', icon: '☁️', ourRate: '2.9%', bankRate: '2.3%', margin: '0.6%', volume: '₽9.5М', status: 'active' },
    { system: 'WebMoney', icon: '🌐', ourRate: '2.5%', bankRate: '1.8%', margin: '0.7%', volume: '₽4.8М', status: 'active' },
    { system: 'QIWI', icon: '🥝', ourRate: '3.2%', bankRate: '2.4%', margin: '0.8%', volume: '₽2.1М', status: 'maintenance' },
  ];

  const requisites = [
    { id: 'REQ-01', name: 'ООО АураПей (основной)', bank: 'Тинькофф Бизнес', account: '4081780000000000001', bik: '044525974', status: 'active', volume: '₽45.2М' },
    { id: 'REQ-02', name: 'ООО АураПей (резервный)', bank: 'Сбербанк', account: '4081780000000000002', bik: '044525225', status: 'active', volume: '₽12.8М' },
    { id: 'REQ-03', name: 'Крипто кошелёк (USDT)', bank: 'TRC-20', account: 'TXxxxxxxxxxxxxxxxxx', bik: '—', status: 'active', volume: '₽8.1М' },
  ];

  const monitoringEvents = [
    { time: '09:41:22', type: 'success', message: 'Платёж pay_xk2m9 подтверждён — 15 500 ₽', site: 'store.brand.ru' },
    { time: '09:40:58', type: 'warning', message: 'Замедление webhook-доставки — задержка 1.2с', site: 'saas.myapp.ru' },
    { time: '09:40:11', type: 'success', message: 'Вывод W-8821 выполнен — 45 000 ₽', site: 'shop.example.ru' },
    { time: '09:39:44', type: 'error', message: 'Платёж pay_ab821 отклонён — карта заблокирована', site: 'service.pro.ru' },
    { time: '09:38:30', type: 'success', message: 'Новая заявка AP-006 — mystore.ru', site: 'Система' },
    { time: '09:37:15', type: 'warning', message: 'Повышенная активность с IP 91.243.x.x', site: 'Безопасность' },
    { time: '09:36:02', type: 'success', message: 'Платёж pay_cc441 подтверждён — 8 990 ₽', site: 'info.course.ru' },
    { time: '09:35:11', type: 'error', message: 'Ошибка QIWI API — технические работы', site: 'Интеграции' },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, { cls: string; label: string }> = {
      active: { cls: 'badge-active', label: 'Активен' },
      pending: { cls: 'badge-pending', label: 'Ожидание' },
      rejected: { cls: 'badge-rejected', label: 'Отклонён' },
      completed: { cls: 'badge-active', label: 'Выполнен' },
      maintenance: { cls: 'badge-pending', label: 'Обслуж.' },
    };
    const s = map[status] || map['pending'];
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.cls}`}>{s.label}</span>;
  };

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--obsidian)' }}>
      {/* Sidebar */}
      <aside className="w-64 shrink-0 hidden md:flex flex-col" style={{ background: 'rgba(10,10,20,0.95)', borderRight: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 gold-gradient rounded-sm flex items-center justify-center">
              <span className="font-bold text-xs" style={{ color: '#0a0a0f', fontFamily: 'Cormorant Garamond, serif' }}>A</span>
            </div>
            <span className="font-serif text-sm" style={{ color: 'var(--gold)' }}>AuraPay Admin</span>
          </div>
          <div className="text-xs text-gray-600">Панель управления</div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`admin-sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-left ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon as any} size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
          <button onClick={onLogout} className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-400 transition-colors w-full">
            <Icon name="LogOut" size={14} />
            Выйти из панели
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 px-6 h-14 flex items-center justify-between" style={{ background: 'rgba(10,10,20,0.95)', borderBottom: '1px solid rgba(201,168,76,0.1)', backdropFilter: 'blur(10px)' }}>
          <h1 className="font-serif text-lg" style={{ color: '#f0e8d0' }}>
            {sidebarItems.find(i => i.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="status-dot-green" />
              Все системы в норме
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>А</div>
          </div>
        </div>

        <div className="p-6">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Оборот за месяц', value: '₽11,217,500', delta: '+14.2%', icon: 'DollarSign', up: true },
                  { label: 'Транзакций за месяц', value: '1,911', delta: '+8.7%', icon: 'CreditCard', up: true },
                  { label: 'Доход платформы', value: '₽246,785', delta: '+11.3%', icon: 'TrendingUp', up: true },
                  { label: 'Ожидают вывода', value: '₽168,250', delta: '4 заявки', icon: 'Clock', up: false },
                ].map((m, i) => (
                  <div key={i} className="metric-card rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)' }}>
                        <Icon name={m.icon as any} size={18} style={{ color: 'var(--gold)' }} />
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{
                        color: m.up ? '#4ade80' : 'var(--gold-light)',
                        background: m.up ? 'rgba(34,197,94,0.1)' : 'rgba(201,168,76,0.1)'
                      }}>{m.delta}</span>
                    </div>
                    <div className="font-serif text-xl font-semibold mb-1" style={{ color: '#f0e8d0' }}>{m.value}</div>
                    <div className="text-xs text-gray-500">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-serif text-lg mb-4" style={{ color: '#f0e8d0' }}>Последние транзакции</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'pay_xk2m9', site: 'store.brand.ru', amount: '15 500 ₽', method: 'Visa', time: '09:41', status: 'completed' },
                      { id: 'pay_ab821', site: 'service.pro.ru', amount: '3 200 ₽', method: 'СБП', time: '09:39', status: 'rejected' },
                      { id: 'pay_cc441', site: 'info.course.ru', amount: '8 990 ₽', method: 'Tinkoff', time: '09:36', status: 'completed' },
                      { id: 'pay_dd720', site: 'saas.myapp.ru', amount: '29 000 ₽', method: 'Visa', time: '09:22', status: 'completed' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between py-2 table-row-hover px-2 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(201,168,76,0.08)', color: 'var(--gold)' }}>
                            <Icon name="CreditCard" size={14} />
                          </div>
                          <div>
                            <div className="text-sm font-medium" style={{ color: '#f0e8d0' }}>{tx.site}</div>
                            <div className="text-xs text-gray-600">{tx.id} · {tx.method} · {tx.time}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium" style={{ color: '#f0e8d0' }}>{tx.amount}</div>
                          <StatusBadge status={tx.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-serif text-lg mb-4" style={{ color: '#f0e8d0' }}>Топ сайтов по обороту</h3>
                  <div className="space-y-3">
                    {profitData.slice(0, 5).map((p, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: '#f0e8d0' }}>{p.site}</span>
                          <span style={{ color: 'var(--gold)' }}>{p.commission}</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(201,168,76,0.1)' }}>
                          <div className="h-full rounded-full gold-gradient" style={{ width: `${90 - i * 18}%` }} />
                        </div>
                        <div className="text-xs text-gray-600">{p.volume} оборот · {p.transactions} транзакций</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: 'FileText', label: 'Новые заявки', count: '2', tab: 'applications' as AdminTab },
                  { icon: 'ArrowUpCircle', label: 'Ожидают вывода', count: '4', tab: 'withdrawals' as AdminTab },
                  { icon: 'AlertTriangle', label: 'Алерты', count: '3', tab: 'monitoring' as AdminTab },
                  { icon: 'Percent', label: 'Обновить комиссии', count: '', tab: 'commissions' as AdminTab },
                ].map((qa, i) => (
                  <button key={i} onClick={() => setActiveTab(qa.tab)} className="glass-card glass-card-hover rounded-xl p-4 flex items-center gap-3 text-left w-full">
                    <Icon name={qa.icon as any} size={18} style={{ color: 'var(--gold)' }} />
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#f0e8d0' }}>{qa.label}</div>
                      {qa.count && <div className="text-xs" style={{ color: 'var(--gold)' }}>{qa.count} шт.</div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MONITORING */}
          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'API Gateway', value: '99.98%', status: 'online', latency: '12ms' },
                  { label: 'Платёжный процессор', value: '100%', status: 'online', latency: '45ms' },
                  { label: 'Webhook доставка', value: '99.7%', status: 'warning', latency: '1200ms' },
                  { label: 'База данных', value: '100%', status: 'online', latency: '3ms' },
                ].map((srv, i) => (
                  <div key={i} className="metric-card rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={srv.status === 'online' ? 'status-dot-green' : 'status-dot-gold'} />
                      <span className="text-xs text-gray-500">{srv.latency}</span>
                    </div>
                    <div className="font-serif text-2xl mb-1" style={{ color: srv.status === 'online' ? '#4ade80' : 'var(--gold-light)' }}>{srv.value}</div>
                    <div className="text-xs text-gray-500">{srv.label}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg" style={{ color: '#f0e8d0' }}>Лог событий в реальном времени</h3>
                  <div className="flex items-center gap-2">
                    <div className="status-dot-green" />
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                </div>
                <div className="space-y-2 font-mono text-xs" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {monitoringEvents.map((evt, i) => (
                    <div key={i} className="flex gap-4 py-2 px-3 rounded-lg table-row-hover">
                      <span className="text-gray-600 shrink-0">{evt.time}</span>
                      <span className="shrink-0" style={{
                        color: evt.type === 'success' ? '#4ade80' : evt.type === 'warning' ? 'var(--gold-light)' : '#f87171'
                      }}>
                        {evt.type === 'success' ? '✓' : evt.type === 'warning' ? '⚠' : '✗'}
                      </span>
                      <span style={{ color: '#f0e8d0' }}>{evt.message}</span>
                      <span className="text-gray-600 shrink-0 ml-auto">{evt.site}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-serif text-lg mb-4" style={{ color: '#f0e8d0' }}>Активность по часам (сегодня)</h3>
                <div className="flex items-end gap-1 h-24">
                  {[12, 18, 35, 28, 45, 62, 88, 95, 120, 98, 110, 85].map((v, i) => (
                    <div key={i} className="flex-1 rounded-t-sm gold-gradient transition-all" style={{ height: `${(v / 120) * 100}%`, opacity: 0.6 + (i / 12) * 0.4 }} />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  {['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'].map(h => (
                    <span key={h}>{h}:00</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                  {['Все', 'Ожидание', 'Активные', 'Отклонённые'].map((f, i) => (
                    <button key={i} className="px-3 py-1.5 text-xs rounded-lg transition-all" style={{
                      background: i === 0 ? 'rgba(201,168,76,0.15)' : 'transparent',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: i === 0 ? 'var(--gold)' : '#9ca3af'
                    }}>{f}</button>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                      {['ID', 'Сайт', 'Контакт', 'Тип', 'Оборот', 'Дата', 'Статус', ''].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left text-xs uppercase tracking-wider" style={{ color: 'var(--gold)', opacity: 0.7 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, i) => (
                      <tr key={i} className="table-row-hover" style={{ borderBottom: '1px solid rgba(201,168,76,0.05)' }}>
                        <td className="px-4 py-3 text-xs text-gray-500">{app.id}</td>
                        <td className="px-4 py-3 text-sm font-medium" style={{ color: '#f0e8d0' }}>{app.site}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{app.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{app.type}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: 'var(--gold)' }}>{app.turnover}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{app.date}</td>
                        <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {app.status === 'pending' && (
                              <>
                                <button className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>Одобрить</button>
                                <button className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>Отклонить</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REQUISITES */}
          {activeTab === 'requisites' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="px-4 py-2 text-sm font-medium rounded-lg" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0f' }}>
                  <Icon name="Plus" size={14} className="inline mr-1" />
                  Добавить реквизиты
                </button>
              </div>

              <div className="space-y-4">
                {requisites.map((req, i) => (
                  <div key={i} className="glass-card rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-serif text-lg mb-1" style={{ color: '#f0e8d0' }}>{req.name}</div>
                        <div className="text-xs text-gray-500">{req.id}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium" style={{ color: 'var(--gold)' }}>{req.volume}</div>
                          <div className="text-xs text-gray-600">за месяц</div>
                        </div>
                        <StatusBadge status={req.status} />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--gold)', opacity: 0.7 }}>Банк</div>
                        <div className="text-sm" style={{ color: '#f0e8d0' }}>{req.bank}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--gold)', opacity: 0.7 }}>Счёт / Адрес</div>
                        <div className="text-sm font-mono" style={{ color: '#f0e8d0' }}>{req.account}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--gold)', opacity: 0.7 }}>БИК</div>
                        <div className="text-sm font-mono" style={{ color: '#f0e8d0' }}>{req.bik}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="px-3 py-1.5 text-xs rounded-lg" style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)', background: 'transparent' }}>Редактировать</button>
                      <button className="px-3 py-1.5 text-xs rounded-lg" style={{ border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', background: 'transparent' }}>Отключить</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WITHDRAWALS */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Ожидают обработки', value: '₽144,250', count: '4 заявки', color: 'var(--gold)' },
                  { label: 'Выполнено сегодня', value: '₽935,000', count: '3 операции', color: '#4ade80' },
                  { label: 'За месяц выведено', value: '₽8,421,000', count: '312 операций', color: '#60a5fa' },
                ].map((s, i) => (
                  <div key={i} className="metric-card rounded-xl p-5">
                    <div className="font-serif text-xl mb-1" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className="text-xs" style={{ color: s.color }}>{s.count}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                      {['ID', 'Сайт', 'Сумма', 'Метод', 'Дата', 'Статус', 'Действие'].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left text-xs uppercase tracking-wider" style={{ color: 'var(--gold)', opacity: 0.7 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((w, i) => (
                      <tr key={i} className="table-row-hover" style={{ borderBottom: '1px solid rgba(201,168,76,0.05)' }}>
                        <td className="px-4 py-3 text-xs text-gray-500">{w.id}</td>
                        <td className="px-4 py-3 text-sm font-medium" style={{ color: '#f0e8d0' }}>{w.site}</td>
                        <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--gold-light)' }}>{w.amount}</td>
                        <td className="px-4 py-3 text-xs text-gray-400">{w.method}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{w.date}</td>
                        <td className="px-4 py-3"><StatusBadge status={w.status} /></td>
                        <td className="px-4 py-3">
                          {w.status === 'pending' && (
                            <button className="text-xs px-3 py-1 rounded" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.25)' }}>
                              Одобрить
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROFIT */}
          {activeTab === 'profit' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Доход платформы (май)', value: '₽246,785', delta: '+11.3%' },
                  { label: 'Суммарный оборот', value: '₽11,217,500', delta: '+14.2%' },
                  { label: 'Средняя маржа', value: '2.2%', delta: 'по всем сайтам' },
                ].map((s, i) => (
                  <div key={i} className="metric-card rounded-xl p-5">
                    <div className="font-serif text-2xl mb-1" style={{ color: 'var(--gold-light)' }}>{s.value}</div>
                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className="text-xs" style={{ color: '#4ade80' }}>{s.delta}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                  <h3 className="font-serif text-lg" style={{ color: '#f0e8d0' }}>Профит по сайтам</h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                      {['Сайт', 'Оборот', 'Доход платформы', 'Транзакций', 'Средний чек', 'Тренд'].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left text-xs uppercase tracking-wider" style={{ color: 'var(--gold)', opacity: 0.7 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {profitData.map((p, i) => (
                      <tr key={i} className="table-row-hover" style={{ borderBottom: '1px solid rgba(201,168,76,0.05)' }}>
                        <td className="px-4 py-3 text-sm font-medium" style={{ color: '#f0e8d0' }}>{p.site}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: 'var(--gold)' }}>{p.volume}</td>
                        <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--gold-light)' }}>{p.commission}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{p.transactions}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{p.avg}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: p.trend.startsWith('+') ? '#4ade80' : '#f87171' }}>{p.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* COMMISSIONS */}
          {activeTab === 'commissions' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <p className="text-sm text-gray-400">
                  <Icon name="Info" size={14} className="inline mr-2" style={{ color: 'var(--gold)' }} />
                  Наша комиссия = Комиссия банка + Маржа платформы. Изменения вступают в силу немедленно для новых транзакций.
                </p>
              </div>

              <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                      {['Платёжная система', 'Наша комиссия', 'Комиссия банка', 'Маржа', 'Оборот (месяц)', 'Статус', ''].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left text-xs uppercase tracking-wider" style={{ color: 'var(--gold)', opacity: 0.7 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((c, i) => (
                      <tr key={i} className="table-row-hover" style={{ borderBottom: '1px solid rgba(201,168,76,0.05)' }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{c.icon}</span>
                            <span className="text-sm font-medium" style={{ color: '#f0e8d0' }}>{c.system}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--gold-light)' }}>{c.ourRate}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{c.bankRate}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: '#4ade80' }}>{c.margin}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: 'var(--gold)' }}>{c.volume}</td>
                        <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                        <td className="px-4 py-3">
                          <button className="text-xs px-2 py-1 rounded transition-all" style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)', background: 'transparent' }}>
                            Изменить
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
