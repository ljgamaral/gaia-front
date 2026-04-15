import { useNavigate } from 'react-router-dom'
import Analyzes from '../pages/Analyzes'
import Training from '../pages/Training'
import App from '../App.jsx'

function Header() {
    const navigate = useNavigate();

    function goToAnalyzes() {
      navigate("/analyzes");
    }

    function goToTraining() {
      navigate("/training");
    }

    function goToCTA() {
      navigate("/");
    }

    return (
        <header className="w-full fixed flex align-center justify-start py-3 px-8 border-b border-green-500/3 backdrop-blur-sm bg-gradient-to-r from-green-200/3 to-emerald-200/5 text-green-400">
        <div className="max-w-5xl w-full flex flex-row m-auto justify-between items-center gap-4">
            <p className="font-extrabold text-xl hover:text-green-600 cursor-pointer" onClick={goToCTA}>
                GAIA
            </p>
            <ul className="flex gap-8 items-center mt-1 text-sm">
                <li>
                    <button className="cursor-pointer hover:text-green-600 p-2" onClick={goToAnalyzes}>
                        Análises
                    </button>
                </li>
                <li>
                    <button className="cursor-pointer hover:text-green-600 p-2" onClick={goToTraining}>
                        Treinamento
                    </button>
                </li>
                <li>
                    <button className="text-white text-bold rounded-xl transition duration-500 bg-green-500 px-5 py-2 hover:bg-green-600 cursor-pointer" onClick={goToCTA}>
                        Verifique agora
                    </button>
                </li>
            </ul>
        </div>
        </header>
    );
}

export default Header;