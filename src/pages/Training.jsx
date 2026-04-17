import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMutation } from "@tanstack/react-query";
import { getTrainInformations } from "../services/trainService";
import { useEffect } from "react";

function Training() {
    const mutation = useMutation({
        mutationFn: getTrainInformations,
        onSuccess: (response) => {
            console.log(response.data);
        },
        onError: () => {
            console.error("Erro ao obter informações de treinamento");
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    return (
      <>
        <Header />
        <div className="flex flex-col px-6 lg:px-0 lg:max-w-5xl m-auto py-22 gap-12">
          <h1>Treinamento</h1>
          <div className="flex flex-col lg:flex-row gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-left text-gray-700">
                Informações de Treinamento para o modelo de verificação de bom e
                ruim
              </h2>
              <ul className="mt-8 text-lg text-left text-gray-600">
                <li>
                  <span className="font-medium">Acurácia:</span>{" "}
                  {mutation.data?.data?.validation_against_training_labels
                    ?.accuracy || "Carregando..."}
                </li>
                <li>
                  <p className="font-medium">Por labels:</p>
                  <ul className="ml-4">
                    <li>
                      <span className="font-medium">Positivo:</span>{" "}
                      <ul className="ml-4">
                        <li>
                          <span className="font-medium">Precision:</span>{" "}
                          {mutation.data?.data
                            ?.validation_against_training_labels?.labels
                            .positivo.precision || "Carregando..."}
                        </li>
                        <li>
                          <span className="font-medium">Recall:</span>{" "}
                          {mutation.data?.data
                            ?.validation_against_training_labels?.labels
                            .positivo.recall || "Carregando..."}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Negativo:</span>{" "}
                      <ul className="ml-4">
                        <li>
                          <span className="font-medium">Precision:</span>{" "}
                          {mutation.data?.data
                            ?.validation_against_training_labels?.labels
                            .negativo.precision || "Carregando..."}
                        </li>
                        <li>
                          <span className="font-medium">Recall:</span>{" "}
                          {mutation.data?.data
                            ?.validation_against_training_labels?.labels
                            .negativo.recall || "Carregando..."}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-left text-gray-700">
                Informações de Treinamento para o modelo de classificação de
                temas
              </h2>
              <ul className="mt-8 text-lg text-left text-gray-600">
                <li>
                  <span className="font-medium">Acurácia:</span>{" "}
                  {mutation.data?.data?.topic_validation_against_training_labels
                    ?.accuracy || "Carregando..."}
                </li>
                <li>
                  <p className="font-medium">Por tópicos:</p>
                  <ul className="ml-4">
                    <li>
                      <span className="font-medium">Clima:</span>{" "}
                      <ul className="ml-4">
                        <li>
                          <span className="font-medium">Precision:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "clima"
                          ].precision || "Carregando..."}
                        </li>
                        <li>
                          <span className="font-medium">Recall:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "clima"
                          ].recall || "Carregando..."}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Desmatamento:</span>{" "}
                      <ul className="ml-4">
                        <li>
                          <span className="font-medium">Precision:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "desmatamento"
                          ].precision || "Carregando..."}
                        </li>
                        <li>
                          <span className="font-medium">Recall:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "desmatamento"
                          ].recall || "Carregando..."}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Enchente:</span>{" "}
                      <ul className="ml-4">
                        <li>
                          <span className="font-medium">Precision:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "enchente"
                          ].precision || "Carregando..."}
                        </li>
                        <li>
                          <span className="font-medium">Recall:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "enchente"
                          ].recall || "Carregando..."}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Fauna:</span>{" "}
                      <ul className="ml-4">
                        <li>
                          <span className="font-medium">Precision:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "fauna"
                          ].precision || "Carregando..."}
                        </li>
                        <li>
                          <span className="font-medium">Recall:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "fauna"
                          ].recall || "Carregando..."}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Garimpo:</span>{" "}
                      <ul className="ml-4">
                        <li>
                          <span className="font-medium">Precision:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "garimpo"
                          ].precision || "Carregando..."}
                        </li>
                        <li>
                          <span className="font-medium">Recall:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "garimpo"
                          ].recall || "Carregando..."}
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Outros:</span>{" "}
                      <ul className="ml-4">
                        <li>
                          <span className="font-medium">Precision:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "outros"
                          ].precision || "Carregando..."}
                        </li>
                        <li>
                          <span className="font-medium">Recall:</span>{" "}
                          {mutation.data?.data
                            ?.topic_validation_against_training_labels?.labels[
                            "outros"
                          ].recall || "Carregando..."}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Training;