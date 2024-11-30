import { Devvit, Context } from '@devvit/public-api';

export const MenuPage = (context: Context,setPage:any) => {
    const changePage = (page:string) => {
        setPage(page)
    }
    return ( 

        <vstack alignment='center middle' height="100%"  backgroundColor="#56CCF2" gap="none" >
        <text color="black" weight="bold" size="xxlarge">40/100 Answered</text>
        <spacer/>
        <vstack backgroundColor='#FFD5C6' cornerRadius='full' width='80%' border="thick" borderColor="black">
          <hstack backgroundColor='#D93A00' width={`40%`} >
            <spacer size='medium' shape='square' />
          </hstack>
        </vstack>
  
        <spacer/>
        <text color="#343434" weight="bold">Theme: Films</text>
        <spacer/>
        <hstack>
        <icon name="activity-fill" color="#D93A00" size="large"></icon>
          <icon name="activity-fill" color="#D93A00" size="large"></icon>
          <icon name="activity-fill" color="#D93A00" size="large"></icon>
          <icon name="activity-fill" color="#D93A00" size="large"></icon>
          <icon name="activity" color="#D93A00" size="large"></icon>
        </hstack>
          <spacer size="medium"/>
          
        <vstack width="100%" alignment="middle center" gap="small">
          
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
          <hstack width="250px" height="50px" backgroundColor="#F84301" cornerRadius="full" alignment="middle center" borderColor="black" onPress={()=>changePage("play")}  border="thick">
              <text color="white" size="large" weight="bold">Play</text>
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
          <hstack width="250px" height="50px" backgroundColor="white" cornerRadius="full" alignment="middle center" borderColor="black" onPress={()=>changePage("leaderboard")} border="thick">
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