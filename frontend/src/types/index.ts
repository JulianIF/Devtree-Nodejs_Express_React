export type User =
{
    handle: string
    name: string
    email: string
    password: string
    _id: string
    description:string
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