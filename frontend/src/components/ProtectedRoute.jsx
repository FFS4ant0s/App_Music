import { Navigate } from "react-router-dom"; 

import { jwtDecode } from "jwt-decode";  

import api from "../api";  

import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";  

import { useState, useEffect } from "react"; 

function ProtectedRoute({children}) {  // Função do componente ProtectedRoute que recebe `children` (os componentes filhos) como props. Esse componente é usado para proteger rotas que requerem autenticação.
    const [isAuthorized, setIsAuthorized] = useState(null);  // Declara o estado `isAuthorized`, que armazena se o usuário está autorizado (true ou false) ou se a verificação está em andamento (null).

    useEffect(() => {  // Hook useEffect que é executado quando o componente é montado ou quando as dependências mudam.
        auth().catch(() => setIsAuthorized(false));  // Chama a função `auth` que verifica a autorização do usuário. Se ocorrer um erro, o estado `isAuthorized` é atualizado para false.
    }, []);  // O array vazio [] garante que o efeito seja executado apenas uma vez, no momento da montagem do componente.

    const refreshToken = async () => {  // Função assíncrona `refreshToken` que tenta obter um novo token de acesso usando o refresh token.
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);  // Obtém o refresh token armazenado no localStorage.
        try {
            const res = await api.post("/api/token/refresh/", {  // Faz uma requisição POST para a rota "/api/token/refresh/" para obter um novo token de acesso, enviando o refresh token.
                refresh: refreshToken,
            });
            if (res.status === 200) {  // Se a resposta for bem-sucedida (código 200), significa que o token foi renovado.
                localStorage.setItem(ACCESS_TOKEN, res.data.access);  // Armazena o novo token de acesso no localStorage.
                setIsAuthorized(true);  // Atualiza o estado `isAuthorized` para true, indicando que o usuário está autorizado.
            } else {
                setIsAuthorized(false);  // Se a resposta não for 200, o usuário não está autorizado.
            }
        } catch (error) {  // Se ocorrer algum erro na requisição.
            console.log(error);  // Exibe o erro no console.
            setIsAuthorized(false);  // Atualiza o estado `isAuthorized` para false.
        }
    }

    const auth = async () => {  // Função assíncrona `auth` que verifica se o usuário tem um token válido e, se necessário, tenta renová-lo.
        const token = localStorage.getItem(ACCESS_TOKEN);  // Obtém o token de acesso armazenado no localStorage.
        if (!token) {  // Se não houver token de acesso...
            setIsAuthorized(false);  // O usuário não está autorizado.
            return;  // Interrompe a execução da função.
        }
        const decoded = jwtDecode(token);  // Decodifica o token de acesso para obter informações, como a data de expiração.
        const tokenExpiration = decoded.exp;  // Obtém a data de expiração do token.
        const now = Date.now() / 1000;  // Obtém o tempo atual em segundos.
        if (tokenExpiration < now) {  // Se o token estiver expirado...
            await refreshToken();  // Tenta renovar o token usando o refresh token.
        } else {
            setIsAuthorized(true);  // Se o token for válido, o usuário está autorizado.
        }
    }

    if (isAuthorized == null)  // Enquanto o estado `isAuthorized` for null (ou seja, a verificação de autorização está em andamento)...
        return <div>Loading...</div>;  // Exibe uma mensagem de "Carregando..." enquanto a verificação não é concluída.

    return isAuthorized ? children : <Navigate to="/login" />;  // Se o usuário estiver autorizado (isAuthorized === true), renderiza os filhos do componente (a rota protegida). Se não estiver autorizado, redireciona o usuário para a página de login.
}

export default ProtectedRoute;  // Exporta o componente ProtectedRoute para que possa ser usado em outras partes do aplicativo.
