import { Devvit, Context, useAsync } from '@devvit/public-api';

export const RulesPage = (context: Context,setPage:any) => {

    const changePage=(name:string)=>{
        setPage(name)
    }
    return ( 
        <blocks>
        <vstack backgroundColor="#56CCF2" height="100%" alignment="center middle" grow>
          <vstack height="80%" width="80%" backgroundColor="white" cornerRadius="small" alignment="center">
            <spacer size="medium" />
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
            <spacer size="medium" />
            <spacer />
            <spacer />
            <spacer />
            <spacer size="xsmall" />
            <text color="black" size="xxlarge" weight="bold">
              RULES
            </text>
            <spacer size="medium" />
            <vstack width="80%">
              <text color="black" size="large" weight="bold" wrap alignment="center">
                1. Everyday there'll be 100 trivias
              </text>
              <spacer />
              <text color="black" size="large" weight="bold" wrap alignment="center">
                2. Everyone gets five lives, one wrong answer and that's four
              </text>
              <spacer />
              <text color="black" size="large" weight="bold" wrap alignment="center">
                3. Answer all of the 100 questions to complete the challenge
              </text>
            </vstack>
            <spacer />
          </vstack>
        </vstack>
      </blocks>

            )

  }