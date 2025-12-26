import Script from "next/script";

import { MetricChip, Pill, ProgressMetric, StatCard } from "./components/ui";
import { RightAside } from "./components/right-aside";
import { HeaderBar } from "./components/header-bar";
import { MapWidget } from "./components/map-widget";

export default function Home() {
  const yandexMapsApiUrl =
    "https://api-maps.yandex.ru/2.1/?apikey=ec15eabd-ad99-4aee-82d4-373f3120da1c&lang=ru_RU";

  const chips = [
    { title: "Median м²", value: "321 000 ₽", trend: "+2.1%" },
    { title: "Heat", value: "+1.2", trend: "норма" },
    { title: "RCl", value: "37.5%", trend: "рост" },
    { title: "Momentum", value: "1.3%", trend: "вверх" },
    { title: "Acceleration", value: "0.5%", trend: "ускор." },
    { title: "Supply Pressure", value: "1.6%", trend: "усил." },
    { title: "Elasticity", value: "-1.23", trend: "эласт." },
    { title: "Liquidity Velocity", value: "0.0003", trend: "медл." },
    { title: "Stability", value: "0.003", trend: "стаб." },
  ];

  const hotStations = [
    { name: "Арбат", heat: "+7.4", price: "ДЦена +2.5%", demand: "ДОфер +6.1%" },
    { name: "Пресненская", heat: "+7.3", price: "ДЦена +3.1%", demand: "ДОфер +7.0%" },
    { name: "Рассказовка", heat: "+6.9", price: "ДЦена +2.9%", demand: "ДОфер +1.1%" },
    { name: "Калужская", heat: "+6.1", price: "ДЦена +2.1%", demand: "ДОфер +2.2%" },
    { name: "Сокол", heat: "+5.7", price: "ДЦена +2.1%", demand: "ДОфер +1.8%" },
  ];

  const coldDistricts = [
    { name: "Преображенское", heat: "-6.1", price: "ДЦена -9.3%", demand: "ДОфер -7.5%" },
    { name: "Северное Тушино", heat: "-5.2", price: "ДЦена -7.1%", demand: "ДОфер -3.0%" },
    { name: "Южное Бутово", heat: "-4.8", price: "ДЦена -7.6%", demand: "ДОфер -2.6%" },
    { name: "Замоскворечье", heat: "-4.3", price: "ДЦена -5.4%", demand: "ДОфер -5.0%" },
    { name: "Зюзино", heat: "-3.9", price: "ДЦена -4.1%", demand: "ДОфер -1.4%" },
  ];

  const metrics = [
    { label: "Медиана м² (покупки)", value: "321 000 ₽", hint: "По сделкам", accent: "neutral" },
    { label: "Heat (температура)", value: "+1.12", hint: "-1.0…+1.0", accent: "warm" },
    { label: "RCl (уверенность)", value: "37.5%", hint: "Чем выше, тем точнее", accent: "cool" },
  ];

  const sliderStops = [
    { value: "6 000 000 ₽", label: "минимум" },
    { value: "14 000 000 ₽", label: "средний чек" },
    { value: "60 000 000 ₽", label: "премиум" },
  ];

  return (
    <>
      <Script src={yandexMapsApiUrl} strategy="afterInteractive" />
      <div className="page-shell">
        <HeaderBar />
      <div className="mx-auto max-w-6xl px-6 pb-4">
        <div className="flex flex-wrap gap-3">
          {chips.map((chip) => (
            <MetricChip
              key={chip.title}
              title={chip.title}
              value={chip.value}
              trend={chip.trend}
            />
          ))}
          <button className="ml-auto hidden items-center gap-1 text-[12px] font-semibold text-slate-500 underline-offset-4 hover:text-slate-700 sm:flex">
            Скрыть
            <span className="text-slate-400">›</span>
          </button>
        </div>
      </div>

      <main className="section-grid">
        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Решения на рынке недвижимости — с холодной аналитикой и тёплым ИИ
            </h1>
         
            <div>
   <p className="text-lg leading-relaxed text-slate-600">
              Мы используем поведенческие принципы эмпирики: даём причины, сравнения и
              выгоды, чтобы решение было рациональным: цифры → объяснение → действие.
            </p>
                  <div className="card-strong p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                <div className="input-shell flex-1">
                  <span className="text-slate-400">⌕</span>
                  <input
                    className="w-full bg-transparent outline-none placeholder:text-slate-400"
                    placeholder="Адрес, станция метро или район…"
                  />
                </div>
                <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-slate-300 transition hover:bg-slate-800">
                  Показать на карте
                </button>
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="input-shell flex-1 bg-white">
                  <span className="text-slate-400">🔗</span>
                  <input
                    className="w-full bg-transparent outline-none placeholder:text-slate-400"
                    placeholder="или вставьте ссылку на объявление (Циан/Авито) — экспресс-аудит"
                  />
                </div>
                <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
                  Проверить
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-700">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                Цель: Жить
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                Пешком до метро: 10 мин
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                Площадь: 50–75 м²
              </span>
              <span className="ml-auto text-xs text-slate-500">
                Обновление данных каждые 2 недели · ближайшее 26.11.2025
              </span>
            </div>
          </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <MapWidget />
            </div>
          </div>
          <RightAside hotStations={hotStations} coldDistricts={coldDistricts} />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <StatCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              hint={metric.hint}
              accent={metric.accent as "warm" | "cool" | "neutral"}
            />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="card-strong p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-800">
                Сколько вы рискуете переплатить без аналитики?
              </span>
              <span className="text-slate-500">Сколько денег тратится на 10 сделок</span>
            </div>
            <div className="mt-6">
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[55%] rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400" />
              </div>
              <div className="mt-3 flex justify-between text-xs text-slate-500">
                {sliderStops.map((stop) => (
                  <span key={stop.value}>{stop.value}</span>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs uppercase text-slate-400">Риск переплатить</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  420 000 ₽
                </div>
                <div className="text-sm text-slate-500">сделок без аналитики</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs uppercase text-slate-400">
                  Потенциальная экономия
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  252 000 ₽
                </div>
                <div className="text-sm text-slate-500">сделок с Rayon</div>
              </div>
            </div>
          </div>

          <div className="card-strong p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white shadow-md shadow-slate-300/60">
                R
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800">
                  Доверяют аналитике Rayon
                </span>
                <span className="text-xs text-slate-500">
                  Агентам, инвесторам и семье используют наши отчёты
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Присоединяйтесь и получите +1 месяц за приглашённого друга. Мы ведём
              аналитический маппинг каждого района и обновляем данные каждые две недели.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <button className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-300 transition hover:bg-emerald-600">
                Получить реферальную ссылку
              </button>
              <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
                Отзывы
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
