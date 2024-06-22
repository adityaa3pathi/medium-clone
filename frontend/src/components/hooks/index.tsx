import { useState, useEffect } from "react";
import axios from "axios";





    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

 export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "author": {
        "name": string
    }

}

export const useBlog = ({id}: {id: number}) =>
    {
        const [loading, setLoading] = useState(true);
        const [blogs, setBlogs] = useState<Blog[]>([]);
        const [selectedPost, setSelectedPost] = useState< Blog >(  );
    
        useEffect(() => {
          
          const fetchPosts = async () => { 
            
            try {
               const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("authorization")
                }
            })
            if(!response) {
                throw new Error("network response was not ok")
            }
            const data  = await response.data.posts
            setBlogs(data);
        }
            catch (error) {
                console.error('error fetching posts:', error )
            }

        }
            fetchPosts();
        
        },[id])

        const selectedPostById = (id: number) => {
            const post = blogs.find(post => post.id === id) ;
            setSelectedPost(post);
        };

        useEffect(() => {

            if(blogs.length > 0 && id)
                {
                    selectedPostById(id);
                    setLoading(false)
                }
        }, [blogs, id])
    
        return {
            loading,
            selectedPost
        }
    
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        })
        .then(response => {
            setBlogs(response.data.posts);
            setLoading(false)
        })
    },[])

    return {
        loading,
        blogs
    }

}