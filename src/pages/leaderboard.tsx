import { Devvit, Context } from '@devvit/public-api';

const leaderboard = [
    { name: 'Anurag', rank: 1, score: 890 },
    { name: 'Zaid', rank: 2, score: 890 },
    { name: 'Rohit', rank: 3, score: 890 },
    { name: 'Loki', rank: 4, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
    { name: 'Poki', rank: 5, score: 890 },
  ];

export const LeaderboardPage = (context: Context,setPage:any) => {
    const changePage = (name:string) => {
        setPage(name)
    }
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
                  onPress={()=>changePage("")}
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

            {leaderboard.map((item) => (
              <vstack width="80%">
                <hstack width="100%">
                  <vstack width="50%">
                    <text color="black" size="large" weight="bold">
                      {item.rank}. {item.name}
                    </text>
                  </vstack>
                  <vstack width="50%" alignment="end">
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
              <vstack width="50%">
                <text color="black" size="xlarge" weight="bold">
                  1. Rohit
                </text>
              </vstack>
              <vstack width="50%" alignment="end">
                <text color="black" size="xlarge" weight="bold">
                  999
                </text>
              </vstack>
            </hstack>
          </vstack>
        </vstack>
      </blocks>

            )

  }