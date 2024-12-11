import { Context, Devvit, SetFlairOptions, useState } from '@devvit/public-api';
import { bronze } from '../utils/userFlairs.js';

Devvit.configure({
    redis: true,
    http: true, 

  });
  
type FetchQuestionsProps = {
  theme:string
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

  async assignUserFlair(context:Context,username:string){
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
}

export default new service