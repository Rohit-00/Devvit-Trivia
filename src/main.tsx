// Learn more at developers.reddit.com/docs
import { Devvit, useState , Context, useAsync } from '@devvit/public-api';
import { RulesPage } from './pages/rules.js';
import { LeaderboardPage } from './pages/leaderboard.js';
import { PlayPage } from './pages/play.js';
import { MenuPage } from './pages/menu.js';
import service from './service/service.js';
import { addIsAvailableProperty } from './utils/addIsAvailableField.js';
import { shuffleArray } from './utils/shuffleOptions.js';

Devvit.configure({
  redditAPI: true,
  redis:true,
  http:true
});


 //for storing data on redis
 
const addQuestions=async(context:Context) =>{
const questions = await service.fetchQuestion()
const shuffledQuestions = questions && shuffleArray(questions)
const strQuestions = JSON.stringify(shuffledQuestions)
await context.redis.set('questions',strQuestions)

for(let i =0;i<49;i++){
 const data =  await context.redis.zAdd('questionNumber',{member:`${i}`,score:0})
  console.log(data)
}

}

//menu item for resetting the trivia

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    addQuestions(context) //make it a cron job after the api gets approved
    const subreddit = await reddit.getCurrentSubreddit();
    await reddit.submitPost({
      title: 'My devvit post',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: 'Created post!' });
  },
});


// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'tall',
  render: (_context) => {
    const {redis} = _context;
    let results : any = []

     
    const { data: currentPost, loading: postLoading } = useAsync(

      async () => {
      return await redis.get(_context.postId!) as any;
      
    });
    if(currentPost){
      return (<text>same post rendering different data. Yay! :)</text>)
    }else{

      const [page,setPage] = useState('')

      switch(page) {
        case 'play': 
        return <PlayPage setPage={setPage} context={_context}></PlayPage>

        case 'leaderboard':
          return <LeaderboardPage context={_context} setPage={setPage} />

        case 'rules':
          return RulesPage(_context,setPage)

        case 'menu':
          return MenuPage(_context,setPage,results)

        default:
          return MenuPage(_context,setPage,results)
      }
     
     
    }

    
  },
});

export default Devvit;
