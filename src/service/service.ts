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
      context.reddit.setUserFlair(
        {
          subredditName: "test_s0b",
          username: username,
          text: "Gold",
          backgroundColor: "#FFD700", 
          textColor: "dark",        
      }
      )
  }

  async assignBronzeFlair({context,username}:AssignFlairProps){
    context.reddit.setUserFlair(
      {
        subredditName: "test_s0b",
        username: username,
        text: "Bronze",
        backgroundColor: "#D85A32", 
        textColor: "dark",        
    }
    )
  }
  async assignSilverFlair({context,username}:AssignFlairProps){
    context.reddit.setUserFlair(
      {
        subredditName: "test_s0b",
        username: username,
        text: "Silver",
        backgroundColor: "#CECECE", 
        textColor: "dark",        
    }
    )
  }
  async assignGoldFlair({context,username}:AssignFlairProps){
    context.reddit.setUserFlair(
      {
        subredditName: "test_s0b",
        username: username,
        text: "Gold",
        backgroundColor: "#FFD700", 
        textColor: "dark",        
    }
    )
  }
  async assignDiamondFlair({context,username}:AssignFlairProps){
    context.reddit.setUserFlair(
      {
        subredditName: "test_s0b",
        username: username,
        text: "Diamond",
        backgroundColor: "#3AD8FF", 
        textColor: "dark",        
    }
    )
  }


}

export default new service