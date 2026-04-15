import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { analyzeArticle } from './services/articleService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [type, setType] = useState('link')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: analyzeArticle,
    onSuccess: (response) => {
      setUrl("");
      setText("");
      navigate("/result", {
        state: response.data,
      });
    },
    onError: () => {
      console.error("Erro ao analisar a notícia");
    },
  });

  function handleChange(e) {
    setType(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (type === 'link' && url) {
      toast.promise(mutation.mutateAsync({ type: 'link', content: url }), {
        loading: "Analisando notícia...",
        success: "Notícia analisada com sucesso!",
        error: "Ocorreu um erro ao analisar a notícia. Tente novamente."
      });
    } else if (type === 'text' && text) {
      toast.promise(mutation.mutateAsync({ type: 'text', content: text }), {
        loading: "Analisando notícia...",
        success: "Notícia analisada com sucesso!",
        error: "Ocorreu um erro ao analisar a notícia. Tente novamente."
      });
    } else {
      alert("Por favor, preencha o campo correspondente ao tipo selecionado.");
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-light text-center text-gray-700">
          Verifique notícias ambientais
          <br></br>
          <span className="bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          <span className="font-extrabold">
            em menos de 1 minuto
          </span>
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="w-full md:w-xl lg:w-xl flex flex-col items-center">
        <div className="w-full md:w-xl lg:w-xl px-6 flex flex-col lg:flex-row items-center lg:gap-1 mt-4">
          <select className="border border-gray-300 bg-white rounded-md p-2 h-10 mt-4 w-full lg:flex-1" value={type} onChange={handleChange}>
            <option disabled selected value="">Selecione o tipo de entrada</option>
            <option value="link">Link</option>
            <option value="text">Texto bruto</option>
          </select>

          {type === 'link' && (
            <input
              required
              className="border border-gray-300 rounded-md p-2 mt-4 w-full lg:flex-3"
              type="url"
              placeholder="Ex. https://www.noticia.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          )}
          {type === 'text' && (
            <textarea
              required
              className="border border-gray-300 rounded-md resize-none h-32 p-2 mt-4 w-full lg:flex-3"
              placeholder="Digite o texto da notícia aqui"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </div>
        <div className="px-6 w-full">
        <button className="bg-green-500 w-full lg:w-auto text-lg transition duration-500 hover:bg-green-600 text-white cursor-pointer rounded-xl px-6 py-2 mt-4" disabled={mutation.isPending}>
          {mutation.isPending ? 'Verificando...' : 'Verificar'}
          <ArrowRight className="inline-block ml-2" size={20} />
        </button>
        </div>
      </form>
    </main>
    <Footer />
  </>
  )
}

export default App
