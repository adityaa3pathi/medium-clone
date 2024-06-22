import { Link, useNavigate } from 
"react-router-dom";
import React, { ChangeEvent, useState } from "react";
import axios from "axios"
import {SigninInput, SignupInput} from "@the_adi/medium-common"
import { BACKEND_URL } from "../config";
export const Auth = ( {type} : {type: "signup" |"signin" }) => {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "", 
        email: "",
        password: "",
    })

   async function sendRequest() {
try {
   const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ?  "signup" : "signin"}`, postInputs)
   console.log("response :", response.data);
    const jwt = "Bearer " + response.data.jwt;
    localStorage.setItem("authorization", jwt);
    navigate("/Blogs")
}

catch(e) {

}
    }

    return <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
        <div className="text-3xl font-semibold text-left mt-4">
        Create an account
        </div>
        <div className="text-slate-400 text-center">
            { type === "signin" ? "Don't have an account" :"Already have an account?"}
            <Link className=" pl-2 underline" to={ type === "signin" ? "/signup" : "/signin"}>{ type === "signin" ? "Signup" : "Sign-in"}</Link>
        </div>
        </div>
        <div className="pt-4">
        {
            type === "signup"
           ?  <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
           setPostInputs({
            ...postInputs,
            name: e.target.value
           })
            
        }}/> : null}
        <LabelledInput label="Email" placeholder="Enter your Email" onChange={(e) => {
           setPostInputs({
            ...postInputs,
            email: e.target.value
           })
            
        }}/>
        <LabelledInput label="Password" placeholder="Enter your password" type={"password"} onChange={(e) => {
           setPostInputs({
            ...postInputs,
            password: e.target.value
           })
            
        }}/>
        <button  onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
        mt-8 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"> {type === "signup" ? "Signup" : "Signin"}</button>

        </div>
        </div>
        </div>
    </div>


}

interface LabelledInputType {
    label: string,
    placeholder: string,
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        type?: string;
       
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return    <div >
      <label className="block text-black text-sm font-bold  pt-2" >
        {label}
      </label>
      <input onChange={onChange} 
      type={type || "text"}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   placeholder={placeholder} required/>
    </div>

}