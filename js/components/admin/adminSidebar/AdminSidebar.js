import React from 'react';
import SidebarItem from "./SidebarItem";
import {BiHome} from "react-icons/bi";
import {HiUsers} from "react-icons/hi";
import {NavLink, useLocation} from "react-router-dom";

const AdminSidebar = () => {

    const {pathname} = useLocation();

    return (
        <div className="sidebar">

            <NavLink to="/users">
                <SidebarItem active={pathname === "/users" && true} icon={<HiUsers/>}>
                    Users
                </SidebarItem>
            </NavLink>

            <NavLink to="/">
                <SidebarItem active={pathname === "/" && true} icon={<BiHome/>}>
                    Test
                </SidebarItem>
            </NavLink>

        </div>
    );
};

export default AdminSidebar;
