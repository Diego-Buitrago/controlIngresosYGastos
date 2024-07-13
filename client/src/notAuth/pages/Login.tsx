import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/auth";
// UI
import { Button, Input } from "@nextui-org/react";
// OTROS
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { Navigate } from "react-router-dom";

import "../login.css";
import { LoginForm } from "../interfaces/forms";

export const Login = () => {

    const { loginUser } = useContext(AuthContext);
    const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        defaultValues: {
            user: "",
            password: ""
        }
    });

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    
    const onSubmit: SubmitHandler<LoginForm> = async({ user, password }) => {
        const isAuth = await loginUser(user, password);
        if (isAuth) return (<Navigate to="/auth" />)
    }
    
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat login-context">
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                <div className="mb-8 flex flex-col items-center">
                    <img src="/img/logo.jpeg" width="100" alt=""/>
                    <h1 className="mb-2 text-2xl">Control Ingresos y Gastos</h1>
                    {/* <span className="text-gray-300">Enter Login Details</span> */}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 text-lg">
                        <Controller 
                            control={control}
                            name="user"
                            rules={{ required: "El campo usuario es requerido" }}
                            render={({ field }) => (
                                <Input 
                                    value={field.value} 
                                    onChange={field.onChange} 
                                    className="mt-2" 
                                    type="text" 
                                    label="Usuario"
                                    labelPlacement="outside"
                                    isInvalid={!!errors.user}
                                    errorMessage={errors.user?.message}
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4 text-lg">
                        <Controller 
                            control={control}
                            name="password"
                            rules={{ required: "El campo contraseña es requerido" }}
                            render={({ field }) => (
                                <Input 
                                    value={field.value} 
                                    onChange={field.onChange} 
                                    type={isVisible ? "text" : "password"}
                                    className="mt-2" 
                                    label="Contraseña"
                                    labelPlacement="outside"
                                    isInvalid={!!errors.password}
                                    errorMessage={errors.password?.message}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                          {isVisible ? (
                                              <FaEyeSlash color="#9ca3af" />
                                        ) : (
                                              <FaEye color="#9ca3af" />
                                        )}
                                        </button>
                                    }
                                />
                            )}
                        /> 
                    </div>
                    <div className="mt-8 flex justify-center text-lg text-black">
                        <Button color="primary" type="submit"  >
                            Iniciar Sesión
                        </Button>
                    </div>
                </form>
                </div>
            </div>  
        </div>
    )
}
