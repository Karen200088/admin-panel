import React, {useEffect, useState} from 'react';
import UsersHeader from "./UsersHeader";
import Table from "../../UiElements/Table";
import apiUrls from "../../../../constants/apiUrlConstsants";
import {useSelector} from "react-redux";
import {BsFillPencilFill} from "react-icons/bs";
import {MdDelete} from "react-icons/md";
import Loading from "../../UiElements/Loading";
import UserUpdateModal from "./UserUpdateModal";
import CustomPagination from "../../UiElements/CustomPagination";


const Users = () => {

    const [users, setUsers] = useState([]);
    const [paginationParameters, setPaginationParameters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(1);

    const [userUpdateModal, setUserUpdateModal] = useState(false);
    const [selectedUpdateUserId, setSelectedUpdateUserId] = useState('');

    const {token} = useSelector(token => token.token)


    const getUsers = () => {

        fetch(apiUrls.getUsers + `?page=${activeTab}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then(res => {
                setPaginationParameters({
                    all: res.total,
                    inPage: res.per_page
                });
                setUsers(res.users);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    const deleteUser = (userId) => {

        fetch(apiUrls.changeUser + userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then(res => {
                getUsers();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const userUpdate = (id) => {
        setUserUpdateModal(true);
        setSelectedUpdateUserId(id);
    }

    useEffect(() => {

        getUsers();

    }, [activeTab])


    return (
        <>
            <div className="users-block">
                <UsersHeader getUsers={getUsers}/>

                <Table className="users-table mt-3 ">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        users ? users.map(({id, name, email}) => {
                                return (
                                    <tr key={id}>
                                        <td>
                                            {name}
                                        </td>
                                        <td>
                                            {email}
                                        </td>
                                        <td className="user-actions">
                                            <BsFillPencilFill onClick={() => userUpdate(id)}/>
                                            <MdDelete onClick={() => deleteUser(id)}/>
                                        </td>
                                    </tr>
                                )
                            })

                            :
                            <tr>
                                <td colSpan={3}>No Users</td>
                            </tr>
                    }

                    </tbody>
                </Table>

                {userUpdateModal &&
                <UserUpdateModal
                    id={selectedUpdateUserId}
                    users={users}
                    userUpdateModal={userUpdateModal}
                    setUserUpdateModal={setUserUpdateModal}
                    getUsers={getUsers}
                />
                }

                {
                    users &&
                    <div className="d-flex justify-content-center">
                        <CustomPagination paginationParameters={paginationParameters} activeTab={activeTab} setActiveTab={setActiveTab}/>
                    </div>
                }


                {loading &&
                <div className="text-center">
                    <Loading/>
                </div>
                }


            </div>
        </>

    );
};

export default Users;
