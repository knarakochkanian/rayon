import React from "react";

type HeatItem = {
  name: string;
  heat: string;
  price: string;
  demand: string;
};

type HeatListCardProps = {
  title: string;
  subtitle: string;
  items: HeatItem[];
  variant?: "hot" | "cold";
};

type MetricChipProps = {
  title: string;
  value: string;
  trend: string;
};

type StatCardProps = {
  label: string;
  value: string;
  hint: string;
  accent?: "warm" | "cool" | "neutral";
};

type ProgressMetricProps = {
  label: string;
  value: string;
  fillPercent: number;
  color: string;
};

type PillProps = {
  children: React.ReactNode;
  variant?: "muted" | "dark" | "emerald" | "rose";
  className?: string;
};

const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export function Pill({ children, variant = "muted", className }: PillProps) {
  const variants = {
    muted: "pill-muted",
    dark: "pill-dark",
    emerald: "pill-emerald",
    rose: "pill-rose",
  };

  return <span className={cn(variants[variant], className)}>{children}</span>;
}

export function MetricChip({ title, value, trend }: MetricChipProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm shadow-slate-100">
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] uppercase tracking-wide text-slate-500">
          {title}
        </span>
        <span className="text-sm font-semibold text-slate-900">{value}</span>
      </div>
      <Pill variant="muted">{trend}</Pill>
    </div>
  );
}

export function HeatListCard({
  title,
  subtitle,
  items,
  variant = "hot",
}: HeatListCardProps) {
  const gradient =
    variant === "hot"
      ? "from-white to-emerald-50"
      : "from-white to-rose-50";
  const pillVariant = variant === "hot" ? "emerald" : "rose";
  const textVariant =
    variant === "hot" ? "text-emerald-500" : "text-rose-500";

  return (
    <div className="card-strong p-4 shadow-lg shadow-slate-200/60">
      <div className="mb-3 flex items-center justify-between text-sm">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <span className="text-slate-400">{subtitle}</span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.name}
            className={cn(
              "flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2 bg-gradient-to-r",
              gradient,
            )}
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">
                {item.name}
              </span>
              <span className="text-xs text-slate-500">{item.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <Pill variant={pillVariant}>{`Heat ${item.heat}`}</Pill>
              <span className={cn("text-[11px]", textVariant)}>{item.demand}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent = "neutral",
}: StatCardProps) {
  const accentClass =
    accent === "warm"
      ? "w-4/5 bg-amber-400"
      : accent === "cool"
        ? "w-3/5 bg-sky-500"
        : "w-2/3 bg-emerald-500";

  return (
    <div className="card-soft p-4">
      <div className="flex items-center justify-between text-xs uppercase text-slate-400">
        <span>{label}</span>
      </div>
      <div className="mt-3 text-2xl font-semibold text-slate-900">{value}</div>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full", accentClass)} />
      </div>
    </div>
  );
}

export function ProgressMetric({
  label,
  value,
  fillPercent,
  color,
}: ProgressMetricProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-3 py-3">
      <div className="text-[11px] uppercase text-slate-400">{label}</div>
      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${fillPercent}%`,
              backgroundColor: color,
            }}
          />
        </div>
        <span className="text-sm font-semibold" style={{ color }}>
          {value}
        </span>
      </div>
    </div>
  );
}
