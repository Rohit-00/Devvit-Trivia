import { Devvit, Context, useChannel, useState, useAsync } from '@devvit/public-api';
import { Attempts } from '../components/attempts.js';

type RealtimeMessage = {
  payload : {question:number},
  session : string
}
Devvit.configure({
  redditAPI:true,
  redis:true
})

const mySession = Math.random().toString(36).substring(2, 10);

export const MenuPage = (context: Context,setPage:any,questions:any[]) => {
  const { data:attempts, loading:attemptLoading} = useAsync(async() => {
    const userData = await context.reddit.getCurrentUser()
    const userName = userData?.username
    return userName && await context.redis.zScore('attempts',userName+context.postId?.toString()) as any
  })
  
  const { data, loading } = useAsync(async () => {
    return await context.redis.zRange('questionNumber',0,0,{by:'score'})
  });

  
  const progress : any = data && 50 - data.length

    const changePage = (page:string) => {
        setPage(page)
    }

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
        <text color="#343434" weight="bold">Theme: Films</text>
        <spacer/>
     <Attempts context={context}/>
     <spacer/>
     {attempts >= 5 && 
     <text color="white">attempts will be restored in next event</text>
     }
     
          <spacer size="medium"/>
          
        <vstack width="100%" alignment="middle center" gap="small">
        {attemptLoading &&
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
             <hstack width="250px" height="50px" backgroundColor="grey" cornerRadius="full" alignment="middle center" borderColor="black" border="thick">
                 <text color="black" size="large" weight="bold">Wait please...</text>
             </hstack>
           </zstack>
           </hstack>
          }
          {attempts &&  <hstack width="260px" height="60px" alignment="middle center" >
         <zstack alignment="start top">
      {/* Shadow */}
      <vstack width="100%" height="100%">
        <spacer height="4px" />
        <hstack width="100%" height="100%">
          <spacer width="4px" />
            <hstack height={"50px"} width={'250px'} backgroundColor={'black'} cornerRadius="full"/>
        </hstack>
      </vstack>
      {attempts>=5?
       <hstack width="250px" height="50px" backgroundColor="grey" cornerRadius="full" alignment="middle center" borderColor="black" 
         
       border="thick">
         
           <text color="white" size="large" weight="bold">Out of attempts</text>
       </hstack>:
       <hstack width="250px" height="50px" backgroundColor="#F84301" cornerRadius="full" alignment="middle center" borderColor="black" 
       onPress={()=>{if(attempts===undefined || attempts<=5){changePage("play")}}}  
       border="thick">
         
           <text color="white" size="large" weight="bold">Play</text>
       </hstack>
       
    }
         
        </zstack>
            
        </hstack>}
         
        
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
  
        <text color="black" weight="bold"  
        onPress={async()=>{
          const subreddit = await context.reddit.getCurrentSubreddit()
          const post = await context.reddit.submitPost({
            title: 'My devvit post',
            subredditName: subreddit.name,
            // The preview appears while the post loads
            preview: (
              <vstack height="100%" width="100%" alignment="middle center">
                <text size="large">Loading ...</text>
              </vstack>
            ),
          });
          await context.redis.set(post.id, "yes");
        }}>Level: 5</text>
  
        </vstack>
      </vstack>

            )

  }