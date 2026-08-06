'use client'

import GlassEffectContainer from "@/app/common/GlassEffectContainer/GlassEffectContainer";
import {useState} from "react";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({email, password})
        });

        const data = await res.json();
        console.log(data);
    }
    return (
        <GlassEffectContainer classes={"min-w-1/3 max-w-2/3 flex-wrap gap-4 items-center p-4"}>
            <div className={"flex w-full flex-wrap border-b border-b-black pb-2 justify-center"}>Login</div>
            <input name={"email"} className={"backdrop-blur-sm w-3/4 border bg-blue-50 border-blue-100 rounded-md"} type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
            <input className={"backdrop-blur-sm w-3/4 border bg-blue-50 border-blue-100 rounded-md"} type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={login}>Login</button>
        </GlassEffectContainer>
    )
}