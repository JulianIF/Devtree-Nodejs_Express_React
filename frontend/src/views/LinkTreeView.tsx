import { useEffect, useState } from "react";
import { social } from "../api/data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeApi";
import type { SocialNetwork, User } from "../types";

export default function LinkTreeView()
{
    const [devTreeLinks, setDevTreeLinks] = useState(social)
    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!

    const { mutate } = useMutation
    ({
        mutationFn: updateProfile,
        onError: (error) =>
        {
            toast.error(error.message)
        },
        onSuccess: () =>
        {
            toast.success('Link Updated')
        }
    })

    useEffect(() => 
    {
        const updatedData = devTreeLinks.map (item =>
        {
            const userLink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
            if(userLink)
            {
                return {...item, url: userLink.url, enabled: userLink.enabled}
            }
            return item
        })
        setDevTreeLinks(updatedData)
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? {...link, url: e.target.value}: link)
        setDevTreeLinks(updatedLinks)
    }

    const links: SocialNetwork[] = JSON.parse(user.links)

    const handleEnableLink = (socialNetwork: string) =>
    {
        const updatedLinks = devTreeLinks.map(link => 
        {
            if (link.name === socialNetwork)
            {
                if(isValidUrl(link.url))
                {
                    return {...link, enabled: !link.enabled}
                }
                else
                {
                    toast.error("Invalid URL")
                }
            }
            return link
        })
        setDevTreeLinks(updatedLinks)

        let updatedItems: SocialNetwork[] = []

        const selectedSocialNetwork = updatedLinks.find((link) => link.name === socialNetwork)

        if(selectedSocialNetwork?.enabled)
        {
            const id = links.filter(link => link.id).length + 1
            if(links.some(link => link.name === socialNetwork))
            {
                updatedItems = links.map(link => 
                {
                    if (link.name === socialNetwork) 
                    {
                        return{
                            ...link,
                            enabled: true,
                            id
                        }
                    } 
                    else 
                    {
                        return link
                    }
                })
            }
            else
            {
                const newItem =
                {
                    ...selectedSocialNetwork,
                    id
                }
                updatedItems = [...links, newItem]
            }
        }
        else
        {
            const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
            updatedItems = links.map(link => 
            {
                if(link.name === socialNetwork) 
                {
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                }
                else if(link.id > links[indexToUpdate].id)
                {
                    return {
                        ...link,
                        id: link.id -1
                    }
                }
                else
                {
                    return link
                }
            })
        }
        queryClient.setQueryData(['user'], (prevData:User) =>
        {
            return{
                ...prevData,
                links: JSON.stringify(updatedItems)
            }
        })
    }
    return(
        <div className="space-y-5">
            {devTreeLinks.map(item =>(
                <DevTreeInput
                    key={item.name}
                    item={item}
                    handleUrlChange={handleUrlChange}
                    handleEnableLink={handleEnableLink}
                />
            ))}
            <button
            className=" bg-cyan-400 p-2 lext-lg w-full uppercase text-slate-600 rounded font-bold"
            onClick={() => mutate(queryClient.getQueryData(['user'])!)}
            > Save Changes
            </button>
        </div>
    )
}