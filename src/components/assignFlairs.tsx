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

    if(attempts.username !== 'blood_lust097'){   //Mod
        if (attempts.score >= 1 && attempts.score <= 9) {
            if (!flair) {
                service.assignBronzeFlair({context:context,username:attempts.username})
                context.redis.set(`${attempts?.username}:flare`,'Bronze')
              } else {
                console.log("Already have a flair",flair);
              }
        } else if (attempts.score >= 10 && attempts.score <= 19) {
            if (flair==="Bronze") {
                service.assignSilverFlair({context:context,username:attempts.username})
                context.redis.set(`${attempts?.username}:flare`,'Silver')
              } else {
                console.log("Already have a flair",flair);
              }
        } else if (attempts.score >= 20 && attempts.score <= 29) {
            if (flair==="Silver") {
                service.assignGoldFlair({context:context,username:attempts.username})
                context.redis.set(`${attempts?.username}:flare`,'Gold')
              } else {
                console.log("Already have a flair",flair);
              }
        } else if (attempts.score >= 30) {
            if (flair==="Gold") {
                service.assignDiamondFlair({context:context,username:attempts.username})
                context.redis.set(`${attempts?.username}:flare`,'Diamond')
              } else {
                console.log("Already have a flair",flair);
              }
            }
        }

        return (       
         
          <vstack alignment="center middle">
            <spacer/>
    <image
    url={`${flair&&flair}.png`}
    imageWidth={30}
    imageHeight={30}
    description="Rank Badge"/>
        <text color="black" weight="bold">{flair&&flair}</text>
    
        </vstack>
      )

}