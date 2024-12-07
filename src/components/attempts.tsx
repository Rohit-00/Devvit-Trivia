import { Context, Devvit, useAsync } from "@devvit/public-api"
Devvit.configure({
    redditAPI:true,
    redis:true
})

const icons = [
   1,2,3,4,5
]
export const Attempts = ({context}:{context:Context}) => {

    const { data:attempts } = useAsync(async() => {
        const userData = await context.reddit.getCurrentUser()
        const userName = userData?.username
        return userName && await context.redis.zScore('attempts',userName+context.postId?.toString()) as any
      })
    const remainingAttempts = 5-attempts

    return (
        <hstack>
        {icons.map((item,key)=>
        <icon name={key < remainingAttempts || attempts === undefined ?'activity-fill' : 'activity'} color={'#D93A00'} size={'large'}/>
        )}
        </hstack>
    )
}