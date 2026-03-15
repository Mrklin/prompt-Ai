"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {

    // const router = useRouter();
    const [userPrompts, setUserPrompts] = useState([])
    const searchParams = useSearchParams();
    const userName = searchParams.get('id')

    useEffect(()=> {
        const fetchPrompts = async () => {
            const response  = await fetch(`/api/users/${params?.id}/posts`)
            const data = await response.json()

            setUserPrompts(data)
        }
        if(params.id) fetchPrompts()
    },[params.id])


    // const handleDelete = async (prompt) => {

    //     const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    //     if(hasConfirmed){
    //         try {
    //             await fetch(`/api/prompt/${prompt._id.toString()}`, {
    //                 method: "DELETE"
    //             })
    //             const filteredPrompts = prompts.filter((p) => p._id !== prompt._id)
    //             setPrompts(filteredPrompts)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }
    

  return (
    <Profile 
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. 
            Explore ${userName}'s collection of prompts and get inspired!`}
        data ={userPrompts}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
    />
  )
}

export default UserProfile