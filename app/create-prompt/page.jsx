"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

const CreatePrompt = () => {

    const router = useRouter();
    const {data:session} = useSession();
    const [submit, setSubmit] = useState(false)
    const [post, setPost] = useState({
     prompt: "",
     tag: ""
    })

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
        const response = await fetch("/api/prompt/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag
            })
        })
        // const data = await response.json();
        // console.log(data);

        if(response.ok){
            router.push("/");
        }
    } catch (error) {
        console.error("Error creating prompt:", error);
    } finally {
        setSubmit(false);
    }
  }

  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt