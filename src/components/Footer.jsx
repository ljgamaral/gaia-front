function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 mt-auto">
      <p className="text-sm text-gray-600">
        Desenvolvido por{" "}
        <span
          className="font-bold cursor-pointer"
          onClick={() => window.open("https://github.com/ffelipels", "_blank")}
        >
          Felipe Lima Silva
        </span>{" "}
        e{" "}
        <span
          className="font-bold cursor-pointer"
          onClick={() => window.open("https://github.com/ljgamaral", "_blank")}
        >
          Leandro Junio Gonçalves Amaral
        </span>
      </p>
      <p className="text-sm text-gray-600">
        Projeto acadêmico para Atividades Práticas Supervisionadas (APS) -
        2026/1.
      </p>
      <p className="text-sm text-gray-600">Universidade Paulista - UNIP</p>
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} GAIA - Verificador de notícias ambientais
      </p>
    </footer>
  );
}

export default Footer;