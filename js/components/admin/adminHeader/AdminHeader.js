import React from 'react';
import {BsTruck} from "react-icons/Bs";
import {HiOutlineMenu} from "react-icons/hi";
import {ImExit} from "react-icons/im";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../../../redux/reducers/tokenReducer";
import apiUrls from "../../../constants/apiUrlConstsants";

const AdminHeader =  ({setSidebarOpen}) => {

        const dispatch = useDispatch();
        const {token} = useSelector(token => token.token)

        const logout = () => {

            fetch(apiUrls.loginOut, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .catch(error => {
                    console.log(error);
                });

            localStorage.removeItem('token');
            dispatch(setToken(null));
        }

        return (
            <header>
                <nav className="navbar">
                    <Link to="/" className="navbar-brand">
                        <BsTruck/> &nbsp;
                        <span>Truck Admin</span>
                    </Link>

                    <span className="sidebar-open-button d-sm-none" onClick={() => setSidebarOpen(prev => !prev)}>
                    <HiOutlineMenu/>
                    </span>

                <span className="logout">
                    <button type="button" className="btn btn-danger" onClick={logout}> <ImExit/> Log Out</button>
                </span>
                </nav>

            </header>

        );
    }

export default AdminHeader;
