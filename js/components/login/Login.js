import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import apiUrls from "../../constants/apiUrlConstsants"
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../../redux/reducers/tokenReducer";
import api from "../../api/api";

const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector(token => token);

    useEffect(() => {
        if (token.token) {
            navigate("/", {replace: true});
        }

    }, [token])


    const logInCheck = (event) => {
        event.preventDefault()

        const data = {
            email: login,
            password: password
        }


        fetch(apiUrls.login, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                localStorage.setItem('token', res.token)
                dispatch(setToken(res.token))
                setLoginStatus(res.message);
            })
            .catch(error => {
                console.log(error);
            });

    }


    return (
        <div className="container-fluid login-form-block vh-100 vw-100">
            <div className="row">
                <form onSubmit={logInCheck}>
                    <div className="card col-md-5 m-auto p-4 login-card">
                        <div className="input-group">
                            <h2 className="text-center col-12 text-success">Log In</h2>


                            <div className="form-item col-md-7 m-auto mt-3">
                                <input
                                    type="text"
                                    placeholder="Login"
                                    className="form-control"
                                    onChange={event => setLogin(event.target.value)}
                                />
                            </div>

                            <div className="form-item col-md-7 m-auto mt-3">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>


                            <input
                                type="submit"
                                className="btn btn-success col-6 m-auto my-4"
                                value="Log In"
                            />

                            {
                                loginStatus && (
                                    <div
                                        className="text-centered w-100 text-center text-danger">{loginStatus}</div>
                                )
                            }
                        </div>

                    </div>
                </form>

            </div>
        </div>

    );
};

export default Login;
