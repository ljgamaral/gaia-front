import Header from "../components/Header";
import Footer from "../components/Footer";

function Training() {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl font-light text-center text-gray-700">
                    Página de Treinamento
                </h1>
            </div>
            <Footer />
        </>
    );
}

export default Training;