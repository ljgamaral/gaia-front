// src/pages/Result.jsx
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Result() {
  const location = useLocation();
  const result = location.state;
  const label = result?.content?.label;
  const topic = result?.content?.topic;
  const labelText = label ? label.charAt(0).toUpperCase() + label.slice(1) : "Sem rótulo";
  const topicText = topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : "Sem tema";
  const labelColor =
    label === "negativo"
      ? "text-red-500"
      : label === "positivo"
        ? "text-green-500"
        : "text-gray-500";

  if (!result) {
    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Nenhum resultado encontrado</h1>
        <Link className="text-purple-500 mt-4" to="/">
          Voltar
        </Link>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center pt-22 justify-center min-h-screen p-8">
        <section className="max-w-4xl w-full">
          <h2 className="text-3xl font-normal">Resultado da análise</h2>

          {result.success === false ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <p className={`${labelColor} p-4 pb-0 text-2xl font-bold`}>
                {labelText} ({result.content?.confidence})
              </p>

              <p className="px-4 pt-2 text-lg font-semibold text-gray-700">
                Tema: {topicText}
                {result.content?.topic_confidence !== undefined &&
                  ` (${result.content.topic_confidence})`}
              </p>

              <h2 className="text-4xl font-bold mt-4">
                {result.content?.title || "Sem título"}
              </h2>

              <p className="mt-4 text-justify">
                {result.content?.text || result.message || "Sem conteúdo"}
              </p>

              {result.content?.url && (
                <a
                  className="text-purple-500 block mt-4"
                  href={result.content.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir notícia original
                </a>
              )}
            </>
          )}

          <Link className="inline-block mt-8 text-purple-500" to="/">
            Analisar outra notícia
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Result;
