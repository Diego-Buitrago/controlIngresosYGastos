// UI
import { Button} from "@nextui-org/react";
import { useContext } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { AuthContext } from "../context/auth";

interface Props {
    onCollapsed: () => void
}

export const NavBar = ({ onCollapsed }: Props) => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="flex justify-between h-13 px-6 py-2 bg-teal-500" >
            <div>
                <Button isIconOnly color="primary" variant="flat" onClick={onCollapsed} >
                    <FaAlignJustify color="white" size={18} />
                </Button>    
            </div>       
            <div>                
                <Button variant="bordered" onClick={logout} > 
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    )
}
