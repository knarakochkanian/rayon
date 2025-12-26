import { HeatListCard, Pill, ProgressMetric } from "./ui";

type HeatItem = {
  name: string;
  heat: string;
  price: string;
  demand: string;
};

type RightAsideProps = {
  hotStations: HeatItem[];
  coldDistricts: HeatItem[];
};

export function RightAside({ hotStations, coldDistricts }: RightAsideProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <HeatListCard title="Горячие станции" subtitle="Top 5" items={hotStations} variant="hot" />
      <HeatListCard title="Отстающие районы" subtitle="Top 5" items={coldDistricts} variant="cold" />
      <div className="card-strong flex flex-col gap-3 p-5 shadow-lg shadow-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-md shadow-slate-300/60">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800">Доверяют аналитике Rayon</span>
            <span className="text-xs text-slate-500">
              Агентам, инвесторам и семье используют наши отчёты
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          Присоединяйтесь и получите +1 месяц за приглашённого друга. Мы ведём аналитический маппинг каждого
          района и обновляем данные каждые две недели.
        </p>
        <div className="flex flex-col gap-2">
          <button className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-300 transition hover:bg-emerald-600">
            Получить реферальную ссылку
          </button>
          <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
            Отзывы
          </button>
        </div>
      </div>
      <div className="card-strong p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between text-sm">
          <Pill variant="emerald">Балансировочный</Pill>
          <span className="text-slate-500">Данные: всех районов Москвы</span>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-xs font-semibold text-emerald-700">✓</span>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span>Режим рынка</span>
            <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              Stable
            </span>
            <span className="text-[11px] text-slate-500">
              системная ошибка на качественные объекты
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600 md:grid-cols-3">
          <ProgressMetric label="Momentum" value="1.3%" fillPercent={67} color="#10b981" />
          <ProgressMetric label="Supply" value="1.6%" fillPercent={50} color="#fb923c" />
          <ProgressMetric label="Price cut" value="-2.1%" fillPercent={33} color="#f87171" />
          <ProgressMetric label="Volatility" value="0.3%" fillPercent={50} color="#f59e0b" />
          <ProgressMetric label="Bond (proxy)" value="2.6%" fillPercent={25} color="#475569" />
        </div>
      </div>
    </div>
  );
}
