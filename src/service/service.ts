import { Context, Devvit, useState } from '@devvit/public-api';

Devvit.configure({
    redis: true,
    http: true, 

  });
  
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

  async fetchQuestion(){
    const response = await fetch('https://opentdb.com/api.php?amount=50&category=11&type=multiple&encode=base64')
    if(!response.ok){
      throw Error(`HTTP error ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  }
}

export default new service