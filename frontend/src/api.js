import axios from "axios"  // Importa a biblioteca axios, que é usada para fazer requisições HTTP.

import { ACCESS_TOKEN } from "./constants"  // Importa uma constante chamada ACCESS_TOKEN do arquivo "constants". Esta constante provavelmente contém a chave do token de autenticação armazenada no localStorage.

const api = axios.create({  // Cria uma instância personalizada do axios com uma configuração inicial.
    baseURL: import.meta.env.VITE_API_URL  // Define a URL base para todas as requisições feitas com essa instância do axios. O valor é obtido a partir de uma variável de ambiente (VITE_API_URL), que é configurada durante o processo de build.
})

api.interceptors.request.use(  // Adiciona um interceptor para as requisições HTTP feitas por meio da instância `api`.
    (config) => {  // A função de callback a ser executada antes da requisição ser enviada.
        const token = localStorage.getItem(ACCESS_TOKEN);  // Tenta obter o token de autenticação armazenado no localStorage, usando a chave ACCESS_TOKEN.
        if (token) {  // Se o token existir no localStorage...
            config.headers.Authorization = `Bearer ${token}`;  // Adiciona o token ao cabeçalho da requisição como um "Bearer token" para autenticação.
        }
        return config;  // Retorna a configuração da requisição com ou sem o cabeçalho de autenticação.
    },
    (error) => {  // Caso haja algum erro na configuração da requisição.
        return Promise.reject(error);  // Retorna uma promessa rejeitada com o erro ocorrido.
    }
)

export default api  // Exporta a instância do axios personalizada para ser usada em outros arquivos do projeto.
