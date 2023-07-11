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


    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!post.prompt || !post.tag) {
            alert('Prompt id not found');
        }

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (res.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }

    }
    
  return (
    <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt