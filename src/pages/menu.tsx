import { Devvit, Context, useChannel, useState, useAsync, KVStore } from '@devvit/public-api';
import { Attempts } from '../components/attempts.js';
import service from '../service/service.js';

type RealtimeMessage = {
  payload : {question:number},
  session : string
}
Devvit.configure({
  redditAPI:true,
  redis:true
})

type Obj = {
  username:string,
  attempts:number,
  score:number
}
export const MenuPage = (context: Context,setPage:any) => {

  const { data:attempts, loading:attemptLoading} = useAsync(async() => {
    const userData = await context.reddit.getCurrentUser()
    const eventId = await context.redis.get('eventId')
    const userName : any = userData?.username
    const score = userName && await context.redis.zScore('ranking',userName)
    const attempts =  userName && eventId && await context.redis.zScore('attempts',userName+eventId) as any

    const obj = {
      username : userName,
      attempts : attempts,
      score : score
    }
    return obj as Obj
  })

  
  const { data, loading } = useAsync(async () => {
    return await context.redis.zRange('questionNumber',0,0,{by:'score'})
  });

  const {data: theme} = useAsync(async() => {
    return await context.redis.get('theme') as string
  })

  const progress : any = data && 50 - data.length

    const changePage = (page:string) => {
        setPage(page)
    }
    
  // const {data:flair} = useAsync(async() => {
  //   return await context.kvStore.get(`${attempts?.username}:flare`) as any
  // }) 

  // if(flair===undefined || flair === null){

  //   if (attempts?.score !== undefined) {
  //     if (attempts.score > 1 && attempts.score < 29) {
  //       console.log("You're bronze");
  //     } else if (attempts.score > 30 && attempts.score < 59) {
  //       console.log("You're silver");
  //     } else if (attempts.score > 60 && attempts.score < 99) {
  //       service.assignUserFlair(context,attempts?.username)
  //     }
  //   }
    
  // }else{
  //   console.log("so you have a user flaire")
  // }
    return ( 

        <vstack alignment='center middle' height="100%"  backgroundColor="#56CCF2" gap="none" >
        {loading&&
        <text color="black" weight="bold" size="xxlarge">{progress}loading</text>
        }
        {data&&
        <text color="black" weight="bold" size="xxlarge">{progress}/50 Answered</text>
        }
        <spacer/>
        <vstack backgroundColor='#FFD5C6' cornerRadius='full' width='80%' border="thick" borderColor="black">
          {loading&&
                    <hstack backgroundColor='#D93A00' width={`0%`} >
                    <spacer size='medium' shape='square' />
                  </hstack>
          }
          
         {data && <hstack backgroundColor='#D93A00' width={`${progress*2}%`} >
            <spacer size='medium' shape='square' />
          </hstack>}
        </vstack>
  
        <spacer/>
        <text color="#343434" weight="bold">Theme: {theme&&theme}</text>
        <spacer/>
     <Attempts context={context}/>
     <spacer/>
     {attempts && attempts?.attempts >= 5 && 
     <text color="white">attempts will be restored in next event</text>
     }
     
          <spacer size="medium"/>
          
        <vstack width="100%" alignment="middle center" gap="small">
        {/* {attemptLoading &&
            <hstack width="260px" height="60px" alignment="middle center" >
            <zstack alignment="start top">
         
         <vstack width="100%" height="100%">
           <spacer height="4px" />
           <hstack width="100%" height="100%">
             <spacer width="4px" />
               <hstack height={"50px"} width={'250px'} backgroundColor={'black'} cornerRadius="full"/>
           </hstack>
         </vstack>
             <hstack width="250px" height="50px" backgroundColor="grey" cornerRadius="full" alignment="middle center" borderColor="black" border="thick">
                 <text color="black" size="large" weight="bold">Wait please...</text>
             </hstack>
           </zstack>
           </hstack>
          } */}
      <hstack width="260px" height="60px" alignment="middle center" >
         <zstack alignment="start top">
      {/* Shadow */}
      <vstack width="100%" height="100%">
        <spacer height="4px" />
        <hstack width="100%" height="100%">
          <spacer width="4px" />
            <hstack height={"50px"} width={'250px'} backgroundColor={'black'} cornerRadius="full"/>
        </hstack>
      </vstack>
      {attempts && attempts?.attempts>=5?
       <hstack width="250px" height="50px" backgroundColor="grey" cornerRadius="full" alignment="middle center" borderColor="black" 
         
       border="thick">
         
           <text color="white" size="large" weight="bold">Out of attempts</text>
       </hstack>:
       <hstack width="250px" height="50px" backgroundColor="#F84301" cornerRadius="full" alignment="middle center" borderColor="black" 
       onPress={()=>{changePage("play")}}  
       border="thick">
         
           <text color="white" size="large" weight="bold">PLAY</text>
       </hstack>
       
    }
         
        </zstack>
            
        </hstack>
         
        
       <hstack width="260px" height="60px" alignment="middle center" >
         <zstack alignment="start top">
      {/* Shadow */}
      <vstack width="100%" height="100%">
        <spacer height="4px" />
        <hstack width="100%" height="100%">
          <spacer width="4px" />
            <hstack height={"50px"} width={'250px'} backgroundColor={'black'} cornerRadius="full"/>
        </hstack>
      </vstack>
          <hstack width="250px" height="50px" backgroundColor="white" cornerRadius="full" alignment="middle center" borderColor="black" onPress={()=>{changePage("leaderboard")}} border="thick">
              <text color="black" size="large" weight="bold">LEADERBOARD</text>
          </hstack>
        </zstack>
        </hstack>
  
              <hstack width="260px" height="60px" alignment="middle center" >
         <zstack alignment="start top">
      {/* Shadow */}
      <vstack width="100%" height="100%">
        <spacer height="4px" />
        <hstack width="100%" height="100%">
          <spacer width="4px" />
            <hstack height={"50px"} width={'250px'} backgroundColor={'black'} cornerRadius="full"/>
        </hstack>
      </vstack>
          <hstack width="250px" height="50px" backgroundColor="white" cornerRadius="full" alignment="middle center" borderColor="black" onPress={()=>changePage("rules")} border="thick">
              <text color="black" size="large" weight="bold" >RULES</text>
          </hstack>
        </zstack>
        </hstack>
          <spacer size="large"/>
  
        </vstack>
      </vstack>

            )

  }