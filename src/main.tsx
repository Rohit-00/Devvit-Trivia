// Learn more at developers.reddit.com/docs
import { Devvit, useState , Context, useAsync } from '@devvit/public-api';
import { RulesPage } from './pages/rules.js';
import { LeaderboardPage } from './pages/leaderboard.js';
import { PlayPage } from './pages/play.js';
import { MenuPage } from './pages/menu.js';

Devvit.configure({
  redditAPI: true,
  redis:true
});




// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
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
        return PlayPage(_context,setPage)

        case 'leaderboard':
          return LeaderboardPage(_context,setPage)

        case 'rules':
          return RulesPage(_context,setPage)

        case 'menu':
          return MenuPage(_context,setPage)

        default:
          return MenuPage(_context,setPage)
      }
     
     
    }

    
  },
});

export default Devvit;
