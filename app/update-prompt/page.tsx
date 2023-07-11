'use client'
import React, {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

function EditPrompt() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
       const getPromptDetails = async () => {
              const res = await fetch(`/api/prompt/${promptId}`);
              const data = await res.json();
              setPost({ prompt: data.prompt, tag: data.tag });
         }
            if (promptId) getPromptDetails();
    }, [promptId])


  
    
  return (
    <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={() => {}}
    />
  )
}

export default EditPrompt