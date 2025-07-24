import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import type { ProfileForm, User } from "../types"
import { updateProfile, uploadImage } from "../api/DevTreeApi"
import { toast } from "sonner"

export default function ProfileView() {

    const queryClient = useQueryClient()
    const data : User = queryClient.getQueryData(['user'])!

    console.log(data)

    const{ register, handleSubmit, formState: { errors }} = useForm<ProfileForm>({defaultValues : {
        handle: data.handle,
        description: data.description
    }})

    const updateProfileMutation = useMutation(
    {
        mutationFn: updateProfile,
        onError: (error) =>
        {
            toast.error(error.message)
        },
        onSuccess:(data) =>
        {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const uploadImageMutation = useMutation(
    {
        mutationFn: uploadImage,
        onError: (error) =>
        {
            toast.error(error.message)
        },
        onSuccess:(data) =>
        {
            queryClient.setQueryData(['user'], (prevData: User) =>
            {
                return {
                    ...prevData,
                    image: data.image
                }
            })
        }
    })

    const handleUserProfileForm = (formData:ProfileForm) =>
    {
        const user : User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        if(e.target.files)
        {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }
    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Edit Information</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle or Username"
                    {...register("handle", 
                        {
                            required: 'Handle Required'
                        }
                    )}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Description:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Your Description"
                    {...register("description")}
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Image:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ handleChange }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-black rounded-lg font-bold cursor-pointer"
                value='Save Changes'
            />
        </form>
    )
}