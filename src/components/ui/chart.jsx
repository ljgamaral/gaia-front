import * as React from "react";
import { Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

function ChartStyle({ id, config }) {
  const colorEntries = Object.entries(config ?? {}).filter(
    ([, value]) => value?.color,
  );

  if (colorEntries.length === 0) {
    return null;
  }

  const cssVars = colorEntries
    .map(([key, value]) => `--color-${key}: ${value.color};`)
    .join(" ");

  return <style>{`[data-chart="${id}"] { ${cssVars} }`}</style>;
}

export function ChartContainer({ id, className = "", config, children }) {
  const chartId = React.useId().replace(/:/g, "");

  return (
    <div
      data-chart={id ?? chartId}
      className={`h-[320px] w-full ${className}`.trim()}
    >
      <ChartStyle id={id ?? chartId} config={config} />
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export const ChartTooltip = RechartsTooltip;

export function ChartTooltipContent({ active, payload, label, labelFormatter }) {
  if (!active || !payload?.length) {
    return null;
  }

  const formattedLabel = labelFormatter ? labelFormatter(label) : label;

  return (
    <div className="min-w-44 rounded-2xl border border-emerald-100 bg-white/95 px-4 py-3 text-left shadow-lg shadow-emerald-950/10 backdrop-blur">
      {formattedLabel ? (
        <p className="mb-2 text-xs font-semibold text-slate-500">
          {formattedLabel}
        </p>
      ) : null}
      <div className="space-y-2">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <div className="flex items-center gap-2 text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
            <span className="font-semibold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
