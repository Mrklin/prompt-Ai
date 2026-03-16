"use client";

import { useState, useEffect, Suspense , use} from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const ProfileContent = ({params}) => {

    // const router = useRouter();
    const unWrappedParams = use(params)
    const [userPrompts, setUserPrompts] = useState([])
    const searchParams = useSearchParams();
    const userName = searchParams.get('name')

    useEffect(()=> {
        const fetchPrompts = async () => {
            const response  = await fetch(`/api/users/${unWrappedParams?.id}/posts`)
            const data = await response.json()

            console.log("Fetched Data:", data);

            setUserPrompts(data)
        }
        if(unWrappedParams?.id) fetchPrompts()
    },[unWrappedParams.id])


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
        name={userName || "User"}
        desc={`Welcome to ${userName}'s personalized profile page. 
            Explore ${userName}'s collection of prompts and get inspired!`}
        data = {userPrompts}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
    />

    
  )
}

const UserProfile = ({params}) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent params={params} />
        </Suspense>
    )
}

export default UserProfile