import { Devvit, Context, useState } from '@devvit/public-api';
import { Button } from '../components/button.js';
const question = "Q: What are the names of Zaid's kittens?"



export const PlayPage = (context: Context,setPage:any) => {
    
    const [selected, setSelected] = useState<number | null>(null);
    const changePage = (page:string) => {
        setPage(page)
    }

    const options = [
      { option: 'Loki Poki', background: 'white', text: 'black' },
      { option: 'Anurag Zaid', background: 'white', text: 'black' },
      { option: 'Karan Arjun', background: 'white', text: 'black' },
      { option: 'Larry Lawrie', background: 'white', text: 'black' },
    ];
    return ( 
        <blocks>
        <vstack backgroundColor="#56CCF2" height="100%" alignment="center" grow>
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
                onPress={()=>changePage("none")}
              >
                <icon name="close-fill" color="white" size="large"></icon>
              </hstack>
            </zstack>
          </hstack>

          <hstack>
            <icon name="activity-fill" color="#D93A00" size="large"></icon>
            <icon name="activity-fill" color="#D93A00" size="large"></icon>
            <icon name="activity-fill" color="#D93A00" size="large"></icon>
            <icon name="activity-fill" color="#D93A00" size="large"></icon>
            <icon name="activity" color="#D93A00" size="large"></icon>
          </hstack>

          <spacer />

          <text
            overflow="ellipsis"
            color="white"
            size="xxlarge"
            alignment="center"
            wrap
            width="100%"
            weight="bold"
          >
            {question}
          </text>

          <spacer />

          {options.map((item, index) => {
            return Button(
              item.option,
              index === selected ? '#D93A00' : item.background,
              index === selected ? 'white' : item.text,
              () => setSelected(index)
            );
          })}

          <spacer size="small" />
          {Button('Submit', '#D93A00', 'white', () => setSelected(null))}
        </vstack>
      </blocks>
            )

  }