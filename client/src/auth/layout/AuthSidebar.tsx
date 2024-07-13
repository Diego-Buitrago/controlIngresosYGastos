import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaUser, FaRegChartBar, FaSearchDollar, FaMoneyBillAlt, FaCogs, FaFileInvoiceDollar, FaHome  } from "react-icons/fa";
import { Link,  useLocation } from 'react-router-dom';

interface Props {
    collapsed: boolean
}

const rootStyles = {
    backgroundColor: '#d1d5db',
    color: 'black',
    '&:hover': {
        backgroundColor: '#9ca3af',
        color: 'black'
    },
}

const active = {
    backgroundColor:" #9ca3af", /* Cambia este color al que prefieras */
    // color:" #fff"
}

export const AuthSidebar = ({ collapsed }: Props) => {

    const { pathname } = useLocation();
    console.log({location})

    return (
        <Sidebar collapsed={collapsed} backgroundColor="#d1d5db">
            <Menu>
                <Menu>
                    <SubMenu icon={<FaHome />} label="HOME" rootStyles={rootStyles}
                    >
                        <MenuItem 
                            component={<Link 
                            to="/auth" />} 
                            rootStyles={pathname === '/auth' ? active : rootStyles} 
                            icon={<FaRegChartBar />}
                        >
                            Dashboard
                    </MenuItem>
                        <MenuItem 
                            component={<Link to="/auth/income" />}
                            rootStyles={pathname === '/auth/income' ? active : rootStyles} 
                            icon={<FaMoneyBillAlt />}
                            >
                                Ingresos
                            </MenuItem>
                        <MenuItem 
                            component={<Link to="/auth/expenses" />}
                            rootStyles={pathname === '/auth/expenses' ? active : rootStyles} 
                            icon={<FaSearchDollar />}
                            >
                                Gasto
                            </MenuItem>
                    </SubMenu>
                    <SubMenu icon={<FaCogs />} label="Administración"  rootStyles={rootStyles}>
                        <MenuItem 
                            component={<Link to="/auth/users" />}
                            rootStyles={pathname === '/auth/users' ? active : rootStyles} 
                            icon={<FaUser />}
                            >
                                Usuarios
                            </MenuItem>
                        <MenuItem 
                            component={<Link to="/auth/expenseType" />}
                            rootStyles={pathname === '/auth/expenseType' ? active : rootStyles} 
                            icon={<FaFileInvoiceDollar />}
                        >
                            Tipo de Gasto
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </Menu>
        </Sidebar>
    )
}