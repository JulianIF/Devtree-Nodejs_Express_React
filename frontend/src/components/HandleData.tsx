import type { SocialNetwork, UserHandle } from "../types"

type HandleDataProps =
{
    data: UserHandle
}
export default function HandleData({data}: HandleDataProps)
{
    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

    return(
    <div className=" space-y-6 text-white">
        <p className=" text-5xl text-white text-center font-black">{data.handle}</p>
        {data.image && <img src={data.image} className=" max-w-[250px] mx-auto"/>}

        <p className=" text-lg text-white text-center font-bold">{data.description}</p>


        <div className=" mt-20 flex flex-col gap-6">
            {links.length ? 
                links.map(link => 
                (
                    <a
                        key={link.name}
                        className=" bg-white gap-5 rounded-lg px-5 py-2 flex items-center"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                    <img src={`/social/icon_${link.name}.svg`} alt='Social Network Image' className="w-12"/>
                    <p className=" text-black capitalize font-bold text-lg">Visit my: {link.name}</p>
                    
                    </a>
                ))
            : <p className=" text-center">No Links in this Profile</p>}

        </div>

    </div>
    )
}