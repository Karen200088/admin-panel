import React, {useState} from 'react';
import CustomModal from "../../UiElements/CustomModal";
import {useSelector} from "react-redux";
import apiUrls from "../../../../constants/apiUrlConstsants";


const UserUpdateModal = ({id, users, userUpdateModal, setUserUpdateModal, getUsers}) => {

    const selectedUser = users.filter(users => {
        if (users.id === id) return users
    });
    const [updateName, setUpdateName] = useState(selectedUser[0].name);
    const [updateEmail, setUpdateEmail] = useState(selectedUser[0].email);
    const [updatePassword, setUpdatePassword] = useState('');

    const [changeErrors, setChangeErrors] = useState([]);

    const {token} = useSelector(token => token.token);


    const handleClose = () => setUserUpdateModal(false);

    const updateUser = (event) => {
        event.preventDefault();

        const data = {
            ...(selectedUser[0].name !== updateName && {name: updateName}),
            ...(selectedUser[0].email !== updateEmail && {email: updateEmail}),
            ...(updatePassword && {password: updatePassword}),
        }

        fetch(apiUrls.changeUser + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then(res => {
                if (!res?.errors) {
                    setUpdateName('');
                    setUpdateEmail('');
                    setUpdatePassword('');
                    setUserUpdateModal(false);
                    getUsers();
                } else {
                    setChangeErrors(res.errors);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <CustomModal
            headerTitle="Update user"
            modalShow={userUpdateModal}
            handleClose={handleClose}
        >
            <form onSubmit={updateUser}>
            <div className="form-group">
                <label htmlFor="exampleInputName1">Name</label>
                <input type="text"
                       className="form-control"
                       id="exampleInputName1"
                       placeholder="Enter name"
                       onChange={event => setUpdateName(event.target.value)}
                       value={updateName}
                />
            </div>
            {
                changeErrors?.name && <div className="text-danger">{changeErrors.name}</div>
            }

            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Enter email"
                       onChange={event => setUpdateEmail(event.target.value)}
                       value={updateEmail}
                />
            </div>
            {
                changeErrors?.email && <div className="text-danger">{changeErrors.email}</div>
            }
            <div className="form-group mt-2">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={event => setUpdatePassword(event.target.value)}
                    value={updatePassword}
                />
            </div>

            {
                changeErrors?.password && <div className="text-danger">{changeErrors.password}</div>
            }

            <div className="d-flex justify-content-end mt-3">
                <input value="Change User" type="submit" className="btn btn-warning" />
            </div>
            </form>

        </CustomModal>
    );
};

export default UserUpdateModal;
