import { Context, Devvit, SetFlairOptions, useState } from '@devvit/public-api';
import { bronze } from '../utils/userFlairs.js';

Devvit.configure({
    redis: true,
    http: true, 

  });
  
type FetchQuestionsProps = {
  theme:string
}

type AssignFlairProps = {
  context:Context,
  username:string
}
class service {
    async getQuestions(context:Context) {
        const result = await context.cache(
          async () => {
            const response = await fetch('https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple&encode=base64',{method:'get'});
            if (!response.ok) {
              throw Error(`HTTP error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
          },
          {
            key: context.userId!,
            ttl: 10_000, // millis
          }
        );
        return result
}

  async updateAvailability(context:Context, data:any){
    await context.redis.set('quesions',data)
  }

  async fetchQuestion({theme}:FetchQuestionsProps){
    const response = await fetch(`https://opentdb.com/api.php?amount=50&category=${theme}&type=multiple&encode=base64`)
    if(!response.ok){
      throw Error(`HTTP error ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  }

  async assignUserFlair({context,username}:AssignFlairProps){
     await context.reddit.setUserFlair(
        {
          subredditName: "TriviaTimeEvent",
          username: username,
          text: "Gold",
          backgroundColor: "#FFD700", 
          textColor: "dark",   
               
      }
      )
  }

  async assignBronzeFlair({context,username}:AssignFlairProps){
    await context.reddit.setUserFlair(
      {
        subredditName: "TriviaTimeEvent",
        username: username,    
        flairTemplateId:'7b352748-bc6e-11ef-9d43-ba4e6f12b4a1' 
    }
    )
  }
  async assignSilverFlair({context,username}:AssignFlairProps){
    await context.reddit.setUserFlair(
      {
        subredditName: "TriviaTimeEvent",
        username: username,
        flairTemplateId:'82848160-bc6e-11ef-970b-7aedae1e1874'      
    }
    )
  }
  async assignGoldFlair({context,username}:AssignFlairProps){
    await context.reddit.setUserFlair(
      {
        subredditName: "TriviaTimeEvent",
        username: username,
        flairTemplateId:'89ba4348-bc6e-11ef-ab7b-6626ad36523a'      
    }
    )
  }
  async assignDiamondFlair({context,username}:AssignFlairProps){
    await context.reddit.setUserFlair(
      {
        subredditName: "TriviaTimeEvent",
        username: username,
        flairTemplateId:'905ba854-bc6e-11ef-8002-9e0a18c4c37c'      
    }
    )
  }

  async eventCompletion({context,username}:AssignFlairProps){
    const user = await context.reddit.getCurrentUser()
    await context.reddit.sendPrivateMessageAsSubreddit({
      fromSubredditName:'TriviaTimeEvent',
      to:username,
      subject:"Event Completed!!",
      text:"Thanks for contributing to the trivia event."
    })
  }
}

export default new service