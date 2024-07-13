import { useState } from "react";
import { Outlet } from "react-router-dom";
// COMPONENTES
import { NavBar } from "./NavBar";
import { AuthSidebar } from "./AuthSidebar";

export const AuthLayout = () => {

    const [collapsed, setCollapsed] = useState(false);  

    const onCollapsed = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div className="flex flex-col h-screen">
            <NavBar onCollapsed={onCollapsed} />
            <div className="flex flex-row flex-1">
                <AuthSidebar collapsed={collapsed} />
                <div className="flex-1 p-2">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
