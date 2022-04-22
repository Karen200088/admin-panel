import React from 'react';


const SidebarItem = ({ active , icon , children }) => {
    return (
        <div>
            <p className={"sidebar-item" + (active ? ' active' : '')}>
                <span>
                   {icon} &nbsp;
                </span>
                { children }
            </p>
        </div>
    );
};

export default SidebarItem;
