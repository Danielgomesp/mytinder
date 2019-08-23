import React, { useState } from 'react';
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

const Login = ({ history }) => {  //use "history" enable the command to redirect page.
    const [username, setUsername] = useState('');  //declaring STATE //desconstruction to username and function setState

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username,
        })
        const { _id } = response.data;

        history.push(`/dev/${_id}`); //redirect to Mainn
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='logo' />
                <input
                    placeholder="Digite o seu usuário do Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>

        </div>
    );
}

export default Login;