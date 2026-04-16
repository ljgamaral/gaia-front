// src/pages/Result.jsx
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Result() {
  const location = useLocation();
  const result = location.state;

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
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <section className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6">Resultado da análise</h1>

        {result.success === false ? (
          <p className="text-red-500">{result.error}</p>
        ) : (
          <>
            <h2>{result.content?.title || "Sem título"}</h2>

            <p className={`${  result.content?.label === "negativo" ? "text-red-500" : "text-green-500"} text-2xl font-semibold`}>
              {result.content?.label || "Sem rótulo"}
            </p>

            <p className="mt-2 italic text-gray-600">
              {result.content?.reason || "Sem motivo"}
            </p>

            <p className="mt-4">
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
