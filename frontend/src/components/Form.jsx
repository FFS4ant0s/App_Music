import { useState } from "react";  

import api from "../api";  

import { useNavigate } from "react-router-dom";  

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";  

function Form({route, method}) {  // Declara o componente `Form` que recebe `route` e `method` como props. `route` é a URL da API e `method` define se a ação é de "login" ou "register".
    const [username, setUsername] = useState("");  // Declara o estado `username` e a função `setUsername` para controlar o valor do campo de nome de usuário no formulário.

    const [password, setPassword] = useState("");  // Declara o estado `password` e a função `setPassword` para controlar o valor do campo de senha no formulário.

    const [loading, setLoading] = useState(false);  // Declara o estado `loading` e a função `setLoading` para controlar o estado de carregamento do formulário (se a requisição está sendo feita).

    const navigate = useNavigate();  // Inicializa o hook `useNavigate`, que permite redirecionar o usuário para outra página programaticamente após o envio do formulário.

    const name = method === "login" ? "Login" : "Register";  // Define o valor da variável `name` dependendo do valor da prop `method`. Se for "login", `name` será "Login", caso contrário será "Register".

    const handleSubmit = async (e) => {  // Define a função `handleSubmit`, que é chamada quando o formulário é enviado (evento `onSubmit`).
        setLoading(true);  // Define o estado `loading` como `true`, indicando que a requisição está em andamento.

        e.preventDefault();  // Previne o comportamento padrão do evento de envio do formulário (que recarregaria a página).

        try {  // Inicia um bloco `try` para tentar realizar a requisição e capturar erros.
            const res = await api.post(route, { username, password });  // Faz uma requisição POST para a URL especificada em `route`, enviando os valores de `username` e `password` no corpo da requisição.
            
            if (method === "login") {  // Verifica se o método é "login".
                localStorage.setItem(ACCESS_TOKEN, res.data.access);  // Se for "login", armazena o token de acesso retornado pela API no `localStorage`.
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);  // Armazena o refresh token retornado pela API no `localStorage`.
                navigate("/");  // Redireciona o usuário para a página inicial ("/") após o login bem-sucedido.
            } else {  // Se o método não for "login" (então é "register").
                navigate("/login");  // Redireciona o usuário para a página de login após o registro bem-sucedido.
            }
        } catch (error) {  // Caso ocorra algum erro na requisição.
            alert(error);  // Exibe o erro em uma caixa de alerta.
        } finally {  // O bloco `finally` é executado independentemente de o `try` ou `catch` ser executado.
            setLoading(false);  // Define o estado `loading` como `false`, indicando que a requisição foi finalizada (com sucesso ou erro).
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">  // Retorna o formulário. O `onSubmit` chama a função `handleSubmit` quando o formulário é enviado.
            <h1>{name}</h1>  // Exibe o título "Login" ou "Register" dependendo do valor de `name`.

            <input  // Campo de entrada para o nome de usuário.
                className="form-input"  // A classe CSS que estiliza o campo.
                type="text"  // Tipo de campo: texto.
                value={username}  // O valor do campo é o estado `username`.
                onChange={(e) => setUsername(e.target.value)}  // Atualiza o estado `username` sempre que o valor do campo mudar.
                placeholder="Username"  // Texto de ajuda no campo quando está vazio.
            />

            <input  // Campo de entrada para a senha.
                className="form-input"  // A classe CSS que estiliza o campo.
                type="password"  // Tipo de campo: senha (os caracteres digitados serão ocultados).
                value={password}  // O valor do campo é o estado `password`.
                onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado `password` sempre que o valor do campo mudar.
                placeholder="Password"  // Texto de ajuda no campo quando está vazio.
            />

            <button className="form-button" type="submit" disabled={loading}> 
                {name}  
            </button>
        </form>
    );
}

export default Form;  // Exporta o componente `Form` para ser utilizado em outras partes da aplicação.
