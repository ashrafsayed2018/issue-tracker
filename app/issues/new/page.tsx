"use client"
import { Button,Callout,Text,TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm,Controller} from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
type IssueForm = z.infer<typeof createIssueSchema>
export default function NewIssuePage() {
  const router = useRouter()
  const {register,control,handleSubmit,formState:{errors}} = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  })
  const [error,setError] = useState("")
  const [submitting,setSubmitting] = useState(false)
  return (
    <div className='max-w-xl'>
       {error &&   
       <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form 
          className='space-y-3' 
    onSubmit={handleSubmit(async (data)  => {
     try {
      setSubmitting(true);
      await axios.post("/api/issues",data)
      router.push("/issues")
     } catch (error) {
      setSubmitting(false);

      setError("an unexpected error occurred")
     }
          })}>
          <TextField.Root>
              <TextField.Input placeholder='issue title' {...register("title")} />
          </TextField.Root>
         <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
        control={control}
            render={({field}) => <SimpleMDE placeholder='description' {...field} />}
          />
           <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={submitting}>Submit New Issue 
            {submitting && <Spinner/>}
          </Button>
      </form>
    </div>
  )
}
