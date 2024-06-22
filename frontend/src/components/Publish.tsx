import { Appbar } from "./Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState,  } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();



    return <div>
        <Appbar/>
        <div className="flex justify-center pt-8 w-full">
        <div className="max-w-screen-lg w-full">

            <input onChange={(e) => {
                setTitle(e.target.value) 
            }}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 black  p-2.5" placeholder="Title"/>
            <TextEditor onChange={(e) => {
                setDescription(e.target.value)
                
            }} /> 
            <button 
            onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog/post`, {
                    title,
                    content: description
                },{
            headers: {
                authorization: localStorage.getItem("authorization")
            }
        })
                navigate(`/blog/${response.data.id}`)
            }}
            type="submit" className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
       Publish post
   </button>
        </div>
        </div>
        

    </div>

} 

function TextEditor( {onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void} ) {



return <form>
   <div className="mt-2 ">
       <div className="w-full mb-4">
           <div className=" flex items-center justify-between border ">
               <div className="my-2 bg-white rounded-b-lg w-full">
                  
       <div className="px-4 py-2 bg-white rounded-b-lg ">
           <label id="editor" className="sr-only">Publish post</label>
           <textarea onChange={onChange} id="editor" rows={8} className="block w-full px-0 text-sm  bg-white border-none border-0  focus:ring-0 " placeholder="Write an article..." required ></textarea>
       </div>
   </div>
   
   </div>
   </div>
   </div>
</form>

}
