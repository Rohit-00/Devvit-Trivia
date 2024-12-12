import { Context, Devvit, useAsync } from "@devvit/public-api";
import service from "../service/service.js";

Devvit.configure({
    redis:true
})
type attempt = {
    username:string,
    attempts:number,
    score:number
  }
type AssignFlairsProps = {
  context:Context,
  attempts : attempt,
 
}
export const AssignFlairs = ({context,attempts}:AssignFlairsProps) => {
  
   const {data:flair} = useAsync(async() => {
      return await context.redis.get(`${attempts.username}:flare`) as any
    }) 


    
        if (attempts.score >= 1 && attempts.score <= 29) {
            if (!flair) {
                service.assignBronzeFlair({context:context,username:attempts.username})
                context.redis.set(`${attempts?.username}:flare`,'Bronze')
              } else {
                console.log("Already have a flair",flair);
              }
        } else if (attempts.score >= 30 && attempts.score <= 59) {
            if (!flair) {
                service.assignSilverFlair({context:context,username:attempts.username})
                context.redis.set(`${attempts?.username}:flare`,'Silver')
              } else {
                console.log("Already have a flair",flair);
              }
        } else if (attempts.score >= 60 && attempts.score <= 89) {
            if (!flair) {
                service.assignGoldFlair({context:context,username:attempts.username})
                context.redis.set(`${attempts?.username}:flare`,'Gold')
              } else {
                console.log("Already have a flair",flair);
              }
        } else if (attempts.score >= 90) {
            if (!flair) {
                service.assignDiamondFlair({context:context,username:attempts.username})
                context.redis.set(`${attempts?.username}:flare`,'Diamond')
              } else {
                console.log("Already have a flair",flair);
              }
        }

        return (<text color="black">{flair&&flair}</text>)

}