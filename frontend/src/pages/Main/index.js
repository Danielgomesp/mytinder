import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';


const Main = ({ match }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs/', {
                headers: { user: match.params.id, }
            })
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, { headers: { user: match.params.id }, })
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, { headers: { user: match.params.id }, }) //1st param: route, 2nd param: body, so null., 3rd param: header.
        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            <ul>
                {users.length > 0 ? (//verify if there are more than 0 people to show
                    users.map(user => (
                        <li key={user._id}>
                            <img alt="Profile" src={user.avatar} />               <footer>
                                <strong>
                                    {user.name}
                                </strong>
                                <p>
                                    {user.bio}
                                </p>
                            </footer>
                            <div className="buttons">
                                <button type="button">
                                    <img onClick={() => handleDislike(user._id)} src={dislike} alt="dislike button" />
                                </button>
                                <button type="button">
                                    <img onClick={() => handleLike(user._id)} src={like} alt="like button" />
                                </button>
                            </div>
                        </li>
                    ))

                ) : (
                        <div className="empty">
                            Não tem mais ninguém :(
                    </div>
                    )}
            </ul>
        </div>
    );
}

export default Main;