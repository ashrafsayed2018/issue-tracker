"use client"
import { Button,TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm,Controller} from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation';
type IssueForm = {
  title: string,
  description: string
}
export default function NewIssuePage() {
  const router = useRouter()
  const {register,control,handleSubmit} = useForm<IssueForm>()
  return (
    <form 
    className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async (data)  => {
     await axios.post("/api/issues",data)
     router.push("/issues")
    })}>
        <TextField.Root>
            <TextField.Input placeholder='issue title' {...register("title")} />
        </TextField.Root>
        <Controller
        name="description"
        control={control}
        render={({field}) => <SimpleMDE placeholder='description' {...field} />}
         />
        
        <Button>Submit New Issue</Button>
    </form>
  )
}
