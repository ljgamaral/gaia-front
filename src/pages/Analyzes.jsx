import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import { getEnvironmentSummary } from "../services/analyticsService";

const sentimentChartConfig = {
  positivo: {
    label: "Boas",
    color: "var(--chart-2)",
  },
  negativo: {
    label: "Ruins",
    color: "#ef4444",
  },
  neutro: {
    label: "Neutras",
    color: "var(--chart-3)",
  },
};

const categoryPalette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "#14b8a6",
  "#f97316",
  "#22c55e",
];

function formatDate(dateString) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00`));
}

function formatShortDate(dateString) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${dateString}T12:00:00`));
}

function formatLabel(value) {
  if (!value) {
    return "Outros";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function SummaryCard({ title, value, tone }) {
  const tones = {
    positive: "bg-emerald-50 text-emerald-800",
    negative: "bg-rose-50 text-rose-800",
    neutral: "bg-amber-50 text-amber-800",
  };

  return (
    <div className={`rounded-3xl p-6 text-left ${tones[tone]}`}>
      <p className="text-sm uppercase tracking-[0.22em]">{title}</p>
      <p className="mt-3 text-4xl font-semibold">{value}</p>
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm shadow-emerald-950/5">
      <div className="mb-6 text-left">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function Analyzes() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["environment-summary"],
    queryFn: async () => {
      const response = await getEnvironmentSummary();
      return response.data;
    },
  });

  const dailySentiment = (data?.daily_sentiment ?? []).map((item) => ({
    ...item,
    label: formatShortDate(item.date),
  }));
  const categoryDistribution = (data?.category_distribution ?? []).map(
    (item, index) => ({
      ...item,
      label: formatLabel(item.category),
      fill: categoryPalette[index % categoryPalette.length],
    }),
  );
  const articles = data?.articles ?? [];
  const totalPositive = dailySentiment.reduce(
    (total, item) => total + item.positivo,
    0,
  );
  const totalNegative = dailySentiment.reduce(
    (total, item) => total + item.negativo,
    0,
  );
  const totalNeutral = dailySentiment.reduce(
    (total, item) => total + item.neutro,
    0,
  );

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 pb-16 pt-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <section className="text-center flex flex-col items-center">
            <h1>Análises</h1>
            <p className="mt-4 max-w-3xl text-base text-center text-slate-600">
              Análise das notícias sobre meio ambiente do dia 04/05/2026 à
              08/05/2026
            </p>
            {data?.period ? (
              <span className="rounded-full bg-white/90 px-4 py-2">
                Notícias catalogadas: {data.total_articles ?? 0}
              </span>
            ) : null}
          </section>

          {isLoading ? (
            <section className="rounded-3xl border border-emerald-100 bg-white p-8 text-left text-slate-600 shadow-sm shadow-emerald-950/5">
              Carregando...
            </section>
          ) : null}

          {isError ? (
            <section className="rounded-3xl border border-rose-100 bg-rose-50 p-8 text-left text-rose-700 shadow-sm">
              Não foi possível buscar e catalogar as notícias desse período.
            </section>
          ) : null}

          {!isLoading && !isError ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-lg font-bold">Positivas</p>
                  <p>{totalPositive}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">Negativas</p>
                  <p>{totalNegative}</p>
                </div>
              </div>

              <ChartCard
                title="Sentimento por dia"
                subtitle="Gráfico em colunas com a quantidade de notícias boas, ruins e neutras por dia."
              >
                <ChartContainer config={sentimentChartConfig}>
                  <BarChart data={dailySentiment} accessibilityLayer>
                    <CartesianGrid vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip
                      cursor={{ fill: "rgba(148, 163, 184, 0.12)" }}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(label) => `Dia ${label}`}
                        />
                      }
                    />
                    <Bar
                      dataKey="positivo"
                      name="Boas"
                      fill="var(--color-positivo)"
                      radius={[10, 10, 0, 0]}
                    />
                    <Bar
                      dataKey="negativo"
                      name="Ruins"
                      fill="var(--color-negativo)"
                      radius={[10, 10, 0, 0]}
                    />
                    <Bar
                      dataKey="neutro"
                      name="Neutras"
                      fill="var(--color-neutro)"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Categorias encontradas"
                subtitle="Distribuição das notícias classificadas por tema, usando charts no padrão do shadcn com Recharts."
              >
                {categoryDistribution.length > 0 ? (
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
                    <ChartContainer className="mx-auto max-w-[380px]">
                      <PieChart>
                        <Pie
                          data={categoryDistribution}
                          dataKey="total"
                          nameKey="label"
                          innerRadius={72}
                          outerRadius={116}
                          paddingAngle={3}
                        >
                          {categoryDistribution.map((item) => (
                            <Cell key={item.category} fill={item.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              labelFormatter={(value) => value}
                            />
                          }
                        />
                      </PieChart>
                    </ChartContainer>

                    <div className="flex flex-col gap-3">
                      {categoryDistribution.map((item) => (
                        <div
                          key={item.category}
                          className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: item.fill }}
                            />
                            <span className="font-medium text-slate-700">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-slate-500">
                            {item.total}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-left text-sm text-slate-500">
                    Nenhuma categoria foi gerada para esse intervalo.
                  </p>
                )}
              </ChartCard>

              <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm shadow-emerald-950/5">
                <div className="mb-6 text-left">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Notícias coletadas
                  </h2>
                </div>

                <div className="grid gap-4">
                  {articles.map((article) => (
                    <article
                      key={article.url}
                      className="rounded-3xl border border-slate-100 p-5 text-left"
                    >
                      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>{formatDate(article.published_at)}</span>
                        <span>•</span>
                        <span>{formatLabel(article.sentiment)}</span>
                        <span>•</span>
                        <span>{formatLabel(article.topic)}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-slate-900">
                        {article.title}
                      </h3>
                      <p className="mt-3 line-clamp-4 text-sm text-slate-600">
                        {article.content}
                      </p>
                      <a
                        className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Abrir notícia original
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Analyzes;
