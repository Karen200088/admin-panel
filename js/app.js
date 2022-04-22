import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {Route, Routes, BrowserRouter, useLocation} from "react-router-dom";
import Login from "./components/login/Login";
import {Provider, useSelector} from "react-redux";
import {store} from "./redux/store";
import AdminHeader from "./components/admin/adminHeader/AdminHeader";
import AdminSidebar from "./components/admin/adminSidebar/AdminSidebar";
import Content from "./components/admin/Content";

function App() {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const {token} = useSelector(token => token.token);

    const {pathname} = useLocation();

    return (
        <>
            {token && <AdminHeader setSidebarOpen={setSidebarOpen}/>}

            <div className="container-fluid">
                <div className="row">

                    {token && sidebarOpen &&
                    <div className="col-xs-12 col-sm-4 col-md-3 col-xl-2 sidebar-block">
                        <AdminSidebar/>
                    </div>
                    }

                    <div className={`col-sm-8 col-md-9 col-xs-12 col-xl-10 p-0 main-content ${pathname === "/login" && "hide-overflow"}`}>
                        <Routes>
                            <Route path="/" element={<Content />} />
                            <Route path="/users" element={<Content />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
