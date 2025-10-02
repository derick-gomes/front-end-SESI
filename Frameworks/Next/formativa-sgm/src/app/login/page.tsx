"use-client";
import { signIn } from "next-auth/react";
import router, { useRouter } from "next/router";
import { useState } from "react";

 //interface do usuário

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const route = useRouter();

    const handleSubmit =  async (e: React.FormEvent) =>{
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            senha
        });

        if(result?.ok){
            //sucesso, redireciono para o dashboard
            router.push("/dashboard");
        }else{
            setError("Email ou senha inválidos");
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                <div>
                    <label htmlFor="email"></label>
                </div>
            </form>
        </div>
    )
    
}


