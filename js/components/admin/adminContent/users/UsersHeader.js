import React, {useState} from 'react';
import {IoAddSharp} from "react-icons/io5";
import CustomModal from "../../UiElements/CustomModal";
import apiUrls from "../../../../constants/apiUrlConstsants";
import {useSelector} from "react-redux";


const UsersHeader = ({getUsers}) => {

    const [modalShow, setModalShow] = useState(false);
    const [addUserMessage, setAddUserMessage] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {token} = useSelector(token => token.token);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);


    const addUser = (event) => {
        event.preventDefault();
        const data = {
            name,
            email,
            password
        }

        fetch(apiUrls.addUser, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then(res => {
                if (!res?.errors) {
                    setName('');
                    setEmail('');
                    setPassword('');
                    setModalShow(false);
                    getUsers();
                } else {
                    setAddUserMessage(res.errors);
                }
            })
            .catch(error => {
                console.log(error);
            });

    }


    return (

        <>
            <div className="admin-content-header">
                <h2>Users</h2>

                <div>
                    <button className="btn btn-success" onClick={handleShow}><IoAddSharp/>
                        Add User
                    </button>

                    <CustomModal
                        headerTitle="Add new user"
                        modalShow={modalShow}
                        handleClose={handleClose}
                    >
                        <form onSubmit={addUser}>
                            <div className="form-group">
                                <label htmlFor="exampleInputName1">Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="exampleInputName1"
                                       placeholder="Enter name"
                                       onChange={event => setName(event.target.value)}
                                       value={name}
                                />
                            </div>
                            {
                                addUserMessage?.name && <div className="text-danger">{addUserMessage.name}</div>
                            }
                            <div className="form-group mt-2">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email"
                                       className="form-control"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       placeholder="Enter email"
                                       onChange={event => setEmail(event.target.value)}
                                       value={email}
                                />
                            </div>
                            {
                                addUserMessage?.email && <div className="text-danger">{addUserMessage.email}</div>
                            }
                            <div className="form-group mt-2">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={event => setPassword(event.target.value)}
                                    value={password}
                                />
                            </div>
                            {
                                addUserMessage?.password && <div className="text-danger">{addUserMessage.password}</div>
                            }

                            <div className="d-flex justify-content-end mt-2">
                                <input value="Add User" type="submit" className="btn btn-success" />
                            </div>
                        </form>
                    </CustomModal>

                </div>
            </div>

        </>
    );
};

export default UsersHeader;
