import { Devvit, Context, useAsync, User } from '@devvit/public-api';

Devvit.configure({
  redis: true,
  redditAPI:true
});

type LeaderboardPageProps = {
  context: Context;
  setPage: (name:string)=>void
};

type data = {
  user : string,
  rank : number,
  score : number
}
export const LeaderboardPage = ({ context, setPage }: LeaderboardPageProps) => {

  const { data: leaderboard, loading:leaderboardLoading } = useAsync(async () => {
    return await context.redis.zRange('ranking',0,-1,{by:'rank',reverse:true})
  });

  const {data:eventId} = useAsync(async()=>{
    return await context.redis.get('eventId') as string
  })
 
 
  const {data: currentUserRank, loading:currentUserRankLoading} = useAsync(async () => {
    const userData  =  await context.reddit.getCurrentUser() 
    const user : any = userData?.username
    const score = user && await context.redis.zScore('ranking', user);
    const rank = user && await context.redis.zRank('ranking', user);
    const data  = {
      user : user,
      rank : rank,
      score : score
    }
    return data as any
  })

  const changePage = (name: string) => {
    setPage(name);
  };

  return (
    <blocks>
      <vstack height="100%" width="100%" backgroundColor="#56CCF2" alignment="center middle">
        <vstack height="80%" width="80%" backgroundColor="white" alignment="center">
          <spacer />
          <hstack alignment="end" width="90%" gap="large">
            <zstack alignment="start top">
              {/* Shadow */}
              <vstack width="100%" height="100%">
                <spacer height="3px" />
                <hstack width="100%" height="100%">
                  <spacer width="3px" />
                  <hstack height="35px" width="35px" backgroundColor="black" cornerRadius="small" />
                </hstack>
              </vstack>
              <hstack
                backgroundColor="#D93A00"
                padding="xsmall"
                cornerRadius="small"
                border="thick"
                borderColor="black"
                onPress={() => changePage('')}
              >
                <icon name="close-fill" color="white" size="large" />
              </hstack>
            </zstack>
          </hstack>
          <text color="black" size="xxlarge" weight="bold">
            Leaderboard
          </text>
          <vstack height="1px" width="80%" backgroundColor="black" />
          <spacer size="small" />
          {leaderboardLoading && 
          <text color='black' size='large'>loading...</text>
          }
          {leaderboard && leaderboard.map((item,key) => (
            <vstack width="80%">
              <hstack width="100%">
                <vstack width="80%">
                  <text color="black" size="large" weight="bold">
                    {key+1}. {item.member}
                  </text>
                </vstack>
                <vstack width="20%" alignment="end">
                  <text color="black" size="large" weight="bold">
                    {item.score}
                  </text>
                </vstack>
              </hstack>
              <spacer size="small" />
            </vstack>
          ))}
        </vstack>
        <vstack height="10%" width="80%" backgroundColor="white" alignment="center">
          <vstack width="80%" height="1px" backgroundColor="black" />
          <spacer size="small" />
          <hstack width="80%">
            <hstack width="80%">
              <text color="black" size="xlarge" weight="bold">
                { currentUserRank && currentUserRank.rank+1}.&nbsp;
                { currentUserRank && currentUserRank.user}
              </text>
            </hstack>
            <vstack width="20%" alignment="end">
              <text color="black" size="xlarge" weight="bold">
                {currentUserRank?.score}
              </text>
            </vstack>
          </hstack>
        </vstack>
      </vstack>
    </blocks>
  );
};
