import { Context, Devvit } from "@devvit/public-api"
import { SmallButton } from "../components/smallButton.js"
import { Button } from "../components/button.js"

type PostProps = {
    formattedData : {
        question:string,
        answer:string,
        avatar:string
    }
    context:Context
}
export const CustomPost = ({formattedData,context}:PostProps)=> {
    return(
        <blocks>
        <vstack backgroundColor="#56CCF2" height="100%" alignment="center middle" >
        <image
          url={formattedData.avatar}
          imageWidth={200}
          imageHeight={200}
          description="Rank Badge"/>

           <text
           overflow="ellipsis"
           color="white"
           size="xxlarge"
           alignment="center"
           wrap
           width="100%"
           weight="bold"
         >
          {formattedData.question}
           </text>
          <spacer size="medium"/>
         
          <Button label={formattedData.answer} background='white' textColor='black'/>

        <spacer size="medium"/>
          <text color="white" wrap alignment="center" weight="bold">Play Trivia and help the community complete the event</text>
       <spacer/>
          <SmallButton label='PLAY' background='#D93A00' textColor='white' onClick={()=>
            context.ui.navigateTo('https://www.reddit.com/r/test_s0b/')
          } />
       </vstack>
     </blocks>
    )
}