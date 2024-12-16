// Learn more at developers.reddit.com/docs
import { Devvit, useState , Context, useAsync, FormField } from '@devvit/public-api';
import { RulesPage } from './pages/rules.js';
import { LeaderboardPage } from './pages/leaderboard.js';
import { PlayPage } from './pages/play.js';
import { MenuPage } from './pages/menu.js';
import service from './service/service.js';
import { addIsAvailableProperty } from './utils/addIsAvailableField.js';
import { shuffleArray } from './utils/shuffleOptions.js';
import { themes } from './utils/themes.js';
import { generateRandomId } from './utils/generateEventID.js';
import { Button } from './components/button.js';
import { SmallButton } from './components/smallButton.js';
import { CustomPost } from './pages/customPost.js';
import { Badges } from './pages/badges.js';

Devvit.configure({
  redditAPI: true,
  redis:true,
  http:true
});



const addQuestions=async(context:Context,theme:string) =>{
  const eventId = generateRandomId(12)
  await context.redis.set('eventId',eventId)
  const questions = await service.fetchQuestion({theme:theme})
  const shuffledQuestions = questions && shuffleArray(questions)
  const strQuestions = JSON.stringify(shuffledQuestions)
  await context.redis.set('questions',strQuestions)
  
  for(let i =0;i<49;i++){
   const data =  await context.redis.zAdd('questionNumber',{member:`${i}`,score:0})
  }
  
  }


  const themeSelector : FormField = {
    type: 'select',
    name: 'theme',
    label: 'Select the theme',
    required: true,
    options: themes,
  };
  
const myForm = Devvit.createForm(
  {
    fields: [ 
      themeSelector
    ],
  },
  (event, context) => {
    // onSubmit handler

    addQuestions(context,event.values.theme[0]) 
    const selectedOption = themes.find(option => option.value === event.values.theme[0]);
    const selectedLabel = selectedOption ? selectedOption.label : 'Unknown';
    context.redis.set('theme',selectedLabel)
    context.ui.showToast({ text: 'New event started!' });
  }
);

// menu Item to start a new Event
Devvit.addMenuItem({
  label: 'Start a new event',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showForm(myForm)
  },
})

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context; 
    const subreddit = await reddit.getCurrentSubreddit();
    await reddit.submitPost({
      title: 'Trivia Event',  
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
  name: 'Trivia Post',
  height: 'tall',
  render: (_context) => {
    const {redis} = _context;
    let results : any = []

     
    const { data: currentPost, loading: postLoading } = useAsync(

      async () => {
      return await redis.get(_context.postId!) as string;
      
    });

    const formattedData = currentPost && JSON.parse(currentPost)
   
  
      const [page,setPage] = useState('')
      if(currentPost){
        return <CustomPost formattedData={formattedData} context={_context}/>
      }
      else{
      switch(page) {
        case 'play': 
        return <PlayPage setPage={setPage} context={_context}></PlayPage>

        case 'leaderboard':
          return <LeaderboardPage context={_context} setPage={setPage} />

        case 'rules':
          return RulesPage(_context,setPage)

        case 'menu':
          return MenuPage(_context,setPage)
          
        case 'badge':
          return <Badges context={_context} setPage={setPage} />

        default:
          return MenuPage(_context,setPage)
      }
     
    }
    }

    
  },
);

export default Devvit;
