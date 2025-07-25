export type User =
{
    handle: string
    name: string
    email: string
    password: string
    _id: string
    description:string
    image: string
    links: string
}

export type RegisterForm = Pick <User, 'handle' | 'email' | 'name'> &
{
    password: string,
    password_confirmation: string
}

export type LogInForm = Pick <User, 'email'> &
{
    password: string
}

export type ProfileForm = Pick <User, 'handle' | 'description'>

export type UserHandle = Pick <User, 'handle' | 'description'| 'name'| 'image'| 'links'>

export type SocialNetwork =
{
    id: number
    name: string
    url: string
    enabled: boolean
}
export type DevTreeLink = Pick <SocialNetwork, 'name' | 'url' | 'enabled'>
