import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Users from "./adminContent/users/Users";
import HomePage from "./adminContent/HomePage";


const Content = () => {

    const {token} = useSelector(token => token.token);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {

        if (token === null) {
            navigate("/login", {replace: true});
        }
    }, [token]);


    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    {
                        pathname === "/users" && <Users/>
                    }
                    {
                        pathname === "/" && <HomePage/>
                    }

                </div>
            </div>

        </>
    );
};

export default Content;
