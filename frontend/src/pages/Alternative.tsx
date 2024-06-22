import axios from "axios"



export const Alternative = () => {


   try{
     axios.get("https://backend.aditya-bietj.workers.dev/api/v1/bulk",
   { headers: {
        Authorization: localStorage.getItem("authorization")
        
    }}
    )
    .then( response =>  {
        const res = response.data.post;
        console.log( res )
    })
}
catch(e) {
     console.error();
    
}

return <div>
    test route
    </div>

}