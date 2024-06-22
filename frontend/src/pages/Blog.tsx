import { useParams } from "react-router-dom";
import { useBlog } from "../components/hooks";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
    const {id} = useParams<{id: string | undefined}>();
    if ( id !== undefined ){
    const intId = parseInt(id, 10);

    const {loading, selectedPost } = useBlog( 
        {
            id: intId 
        }
    );
    if(loading) {
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
               <Spinner/>
            </div>
           
        </div>
    }

    return <div> 
          
          <FullBlog blog={selectedPost}/>
          
          </div>
     
}
       
    
}