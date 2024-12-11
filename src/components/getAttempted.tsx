import { Context, Devvit, useAsync } from "@devvit/public-api";

Devvit.configure({
    redis:true
})

export const getAttemptedQuestions = (context:Context,key:any)=> {
    const {data}= useAsync (async() => {
        return await context.redis.hGet(key,'attempts') as string
    })

    return data
}