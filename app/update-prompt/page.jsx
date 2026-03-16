"use client";

import { useState, useEffect } from "react"
import { Suspence } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const [submit, setSubmit] = useState(false)
    const [post, setPost] = useState({
     prompt: "",
     tag: ""
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);

            const data = await response.json();

            setPost({
                prompt: data.prompt ,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetails();
      }, [promptId])
    

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if(!promptId) return alert('Prompt not found')

    try {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            })
        })
        // const data = await response.json();
        // console.log(data);

        if(response.ok){
            router.push("/");
        }
    } catch (error) {
        console.error("Error updating prompt", error);
    } finally {
        setSubmit(false);
    }
  }

  return (
    <Suspence fallback={<div>Loading...</div>}>
        <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={updatePrompt}
    />
    </Suspence>
  )
}
    

export default EditPrompt