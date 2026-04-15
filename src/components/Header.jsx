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

    function showNavbar() {
        const nav = document.getElementById("nav");
        if (nav.classList.contains("hidden")) {
          nav.classList.remove("hidden");
        } else {
          nav.classList.add("hidden");
        }
    }
    
    return (
      <>
        <header className="w-full fixed flex align-center justify-start py-3 px-8 border-b border-green-500/3 backdrop-blur-sm bg-white/90 text-green-400">
          <div className="max-w-5xl w-full flex flex-row m-auto justify-between items-center gap-4">
            {/* Mobile */}
            <div className="flex flex-col items-center justify-between w-full gap-4 lg:hidden">
              <div className="flex flex-row items-center justify-between w-full gap-4 lg:hidden">
                <p
                  className="font-extrabold text-xl hover:text-green-600 cursor-pointer"
                  onClick={goToCTA}
                >
                  GAIA
                </p>
                <button className="text-green-400" onClick={showNavbar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.633h16.5M3.75 12h16.5m-16.5 5.367h16.5"
                    />
                  </svg>
                </button>
              </div>
              <nav
                id="nav"
                className="hidden lg:hidden flex flex-col justify-center items-center gap-4"
              >
                <button
                  className="cursor-pointer block hover:text-green-600 p-2"
                  onClick={goToAnalyzes}
                >
                  Análises
                </button>
                <button
                  className="cursor-pointer block hover:text-green-600 p-2"
                  onClick={goToTraining}
                >
                  Treinamento
                </button>
                <button
                  className="text-white text-bold block rounded-xl transition duration-500 bg-green-500 px-5 py-2 hover:bg-green-600 cursor-pointer"
                  onClick={goToCTA}
                >
                  Verifique agora
                </button>
              </nav>
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex flex-row items-center justify-between w-full gap-4">
              <p
                className="font-extrabold text-xl hover:text-green-600 cursor-pointer"
                onClick={goToCTA}
              >
                GAIA
              </p>
              <ul className="flex gap-8 items-center mt-1 text-sm">
                <li>
                  <button
                    className="cursor-pointer hover:text-green-600 p-2"
                    onClick={goToAnalyzes}
                  >
                    Análises
                  </button>
                </li>
                <li>
                  <button
                    className="cursor-pointer hover:text-green-600 p-2"
                    onClick={goToTraining}
                  >
                    Treinamento
                  </button>
                </li>
                <li>
                  <button
                    className="text-white text-bold rounded-xl transition duration-500 bg-green-500 px-5 py-2 hover:bg-green-600 cursor-pointer"
                    onClick={goToCTA}
                  >
                    Verifique agora
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </>
    );
}

export default Header;