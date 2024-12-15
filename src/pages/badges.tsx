import { Context, Devvit, useAsync, useState } from "@devvit/public-api";
import responsiveResult from "../utils/responsiveValues.js";

Devvit.configure({
    redis:true,
    redditAPI:true
})
type BadgesProps = {
    context: Context,
    setPage: (page: string) => void;
};

export const Badges = ({ context, setPage }: BadgesProps) => {
       const [minMax,setMinMax] = useState([0])
       const {data:flair,loading,error} = useAsync(async() => {
          const user= await context.reddit.getCurrentUser()
          const username = user?.username
          return username && await context.redis.get(`${username}:flare`) as any
        }) 

       const {data:score} = useAsync(async()=> {
        const user= await context.reddit.getCurrentUser()
        const username : any = user?.username
        return await context.redis.zScore('ranking',username) as any
       })
    
    const progress = score && score % 10 * 10
    console.log(progress)
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
                                onPress={() => setPage("")}
                            >
                                <icon name="close-fill" color="white" size="large" />
                            </hstack>
                        </zstack>
                    </hstack>
                    <spacer />
                    <zstack width="90%">
                        <hstack width="100%">
                            <text color="black" weight="bold" size="xxlarge">{flair==='Gold'?'20':flair==='Bronze'?'1':flair==='Silver'?'10':flair==='Diamond'?'30':''}</text>
                        </hstack>
                        <hstack width="100%" alignment="end">
                            <text color="black" weight="bold" size="xxlarge">{flair==='Gold'?'29':flair==='Bronze'?'9':flair==='Silver'?'19':flair==='Diamond'?'99':''}</text>
                        </hstack>
                        <hstack width="100%" alignment="center">
                            <text color="black" weight="bold">{flair}</text>
                        </hstack>
                    </zstack>
                    <vstack backgroundColor="#FFD5C6" cornerRadius="full" width="90%" border="thick" height="12px" borderColor="black">
                        <hstack backgroundColor="#D93A00" width={`${score % 10 * 10}%`}>
                            <spacer size="medium" shape="square" />
                        </hstack>
                    </vstack>
                    <text color="black" size="small" weight="bold" height='20px'>{score}</text>
                    <spacer size="large" />
                    <vstack width="100%" alignment="center" height="100%">
                        <hstack alignment="middle center" gap="large" width={responsiveResult(context, 90, 50, 50)}>
                            <hstack width="33%">
                                <image
                                    url="Diamond.png"
                                    imageWidth={20}
                                    imageHeight={20}
                                    description="Generative artwork: Fuzzy Fingers"
                                />
                            </hstack>
                            <hstack width={responsiveResult(context, 25, 33, 33)}>
                                <text color="black" weight="bold" alignment="center" width="100%">30+</text>
                            </hstack>
                            <hstack width={responsiveResult(context, 42, 33, 33)}>
                                <text color="black" weight="bold"  alignment="end" width="100%">Diamond</text>
                            </hstack>
                        </hstack>

                        <spacer size="medium" />

                        <hstack alignment="middle center" gap="large" width={responsiveResult(context, 90, 50, 50)}>
                            <hstack width="33%">
                                <image
                                    url="Gold.png"
                                    imageWidth={20}
                                    imageHeight={20}
                                    description="Generative artwork: Fuzzy Fingers"
                                />
                            </hstack>
                            <hstack width={responsiveResult(context, 25, 33, 33)}>
                                <text color="black" weight="bold" alignment="center" width="100%">20-29</text>
                            </hstack>
                            <hstack width={responsiveResult(context, 42, 33, 33)}>
                                <text color="black" weight="bold"  alignment="end" width="100%">Gold</text>
                            </hstack>
                        </hstack>

                        <spacer size="medium" />

                        <hstack alignment="middle center" gap="large" width={responsiveResult(context, 90, 50, 50)}>
                            <hstack width="33%">
                                <image
                                    url="Silver.png"
                                    imageWidth={20}
                                    imageHeight={20}
                                    description="Generative artwork: Fuzzy Fingers"
                                />
                            </hstack>
                            <hstack width={responsiveResult(context, 25, 33, 33)}>
                                <text color="black" weight="bold" alignment="center" width="100%">10-19</text>
                            </hstack>
                            <hstack width={responsiveResult(context, 42, 33, 33)}>
                                <text color="black" weight="bold"  alignment="end" width="100%">Silver</text>
                            </hstack>
                        </hstack>

                        <spacer size="medium" />

                        <hstack alignment="middle center" gap="large" width={responsiveResult(context, 90, 50, 50)}>
                            <hstack width="33%">
                                <image
                                    url="Bronze.png"
                                    imageWidth={20}
                                    imageHeight={20}
                                    description="Generative artwork: Fuzzy Fingers"
                                />
                            </hstack>
                            <hstack width={responsiveResult(context, 25, 33, 33)}>
                                <text color="black" weight="bold" alignment="center" width="100%">1-9</text>
                            </hstack>
                            <hstack width={responsiveResult(context, 42, 33, 33)}>
                                <text color="black" weight="bold"  alignment="end" width="100%">Bronze</text>
                            </hstack>
                        </hstack>

                        <spacer size="medium" />
                    </vstack>
                </vstack>
            </vstack>
        </blocks>
    );
};
