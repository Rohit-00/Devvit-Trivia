// Learn more at developers.reddit.com/docs
import { Devvit, useState , Context, useAsync } from '@devvit/public-api';
import { RulesPage } from './pages/rules.js';
import { LeaderboardPage } from './pages/leaderboard.js';
import { PlayPage } from './pages/play.js';
import { MenuPage } from './pages/menu.js';
import service from './service/service.js';
import { addIsAvailableProperty } from './utils/addIsAvailableField.js';

Devvit.configure({
  redditAPI: true,
  redis:true,
  http:true
});
const results =  [
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "U3BvcnRz",
        "question": "SG93IG1hbnkgcG9pbnRzIGRpZCBMZUJyb24gSmFtZXMgc2NvcmUgaW4gaGlzIGZpcnN0IE5CQSBnYW1lPw==",
        "correct_answer": "MjU=",
        "incorrect_answers": [
            "MTk=",
            "Njk=",
            "NDE="
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=",
        "question": "V2hhdCB3YXMgRnJhbmsgV2VzdCdzIGpvYiBpbiAiRGVhZCBSaXNpbmciPw==",
        "correct_answer": "UGhvdG9qb3VybmFsaXN0",
        "incorrect_answers": [
            "SmFuaXRvcg==",
            "Q2hlZg==",
            "VGF4aSBEcml2ZXI="
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "RW50ZXJ0YWlubWVudDogSmFwYW5lc2UgQW5pbWUgJiBNYW5nYQ==",
        "question": "V2hvIGlzIHRoZSBtYWluIGNoYXJhY3RlciB3aXRoIHllbGxvdyBoYWlyIGluIHRoZSBhbmltZSBOYXJ1dG8/",
        "correct_answer": "TmFydXRv",
        "incorrect_answers": [
            "VGVuIFRlbg==",
            "U2FzdWtl",
            "S2FrYXNoaQ=="
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "RW50ZXJ0YWlubWVudDogRmlsbQ==",
        "question": "SW4gdGhlIG1vdmllICJWIGZvciBWZW5kZXR0YSwiIHdoYXQgaXMgdGhlIGRhdGUgdGhhdCBtYXNrZWQgdmlnaWxhbnRlICJWIiB1cmdlcyBwZW9wbGUgdG8gcmVtZW1iZXI/",
        "correct_answer": "Tm92ZW1iZXIgNXRo",
        "incorrect_answers": [
            "Tm92ZW1iZXIgNnRo",
            "Tm92ZW1iZXIgNHRo",
            "U2VwdGVtYmVyIDV0aA=="
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "RW50ZXJ0YWlubWVudDogSmFwYW5lc2UgQW5pbWUgJiBNYW5nYQ==",
        "question": "V2hvIGlzIHRoZSBtYWluIGhlcm9pbmUgb2YgdGhlIGFuaW1lLCBGdWxsIE1ldGFsIFBhbmljIQ==",
        "correct_answer": "S2FuYW1lIENoaWRvcmk=",
        "incorrect_answers": [
            "VGVsZXRoYSBUZXN0YXJvc3Nh",
            "TWVsaXNzYSBNYW8=",
            "S3lva28gVG9raXdh"
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "U3BvcnRz",
        "question": "V2hhdCBpcyB0aGUgbW9zdCBjb21tb24gdHlwZSBvZiBwaXRjaCB0aHJvd24gYnkgcGl0Y2hlcnMgaW4gYmFzZWJhbGw/",
        "correct_answer": "RmFzdGJhbGw=",
        "incorrect_answers": [
            "U2xvd2JhbGw=",
            "U2NyZXdiYWxs",
            "UGFsbWJhbGw="
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "RW50ZXJ0YWlubWVudDogQm9va3M=",
        "question": "V2hvIHdhcyB0aGUgYXV0aG9yIG9mIHRoZSAxOTU0IG5vdmVsLCAiTG9yZCBvZiB0aGUgRmxpZXMiPw==",
        "correct_answer": "V2lsbGlhbSBHb2xkaW5n",
        "incorrect_answers": [
            "U3RlcGhlbiBLaW5n",
            "Ri4gU2NvdHQgRml0emdlcmFsZA==",
            "SHVudGVyIEZveA=="
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "RW50ZXJ0YWlubWVudDogRmlsbQ==",
        "question": "V2hpY2ggYWN0cmVzcyBkYW5jZWQgdGhlIHR3aXN0IHdpdGggSm9obiBUcmF2b2x0YSBpbiAnUHVscCBGaWN0aW9uJz8=",
        "correct_answer": "VW1hIFRodXJtYW4=",
        "incorrect_answers": [
            "S2F0aHkgR3JpZmZpbg==",
            "UGFtIEdyaWVy",
            "QnJpZGdldCBGb25kYQ=="
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=",
        "question": "SW4gdGhlIHZpZGVvIGdhbWUgZnJhbmNoaXNlICJIYWxvIiwgd2hhdCBpcyB0aGUgVU5TQydzIG1haW4gb3Bwb3NpbmcgZmFjdGlvbiBjYWxsZWQ/",
        "correct_answer": "VGhlIENvdmVuYW50",
        "incorrect_answers": [
            "VGhlIFJlY2tvbmluZw==",
            "VGhlIFBlb3BsZXM=",
            "VGhlIFNsYXVnaHRlcmVycw=="
        ]
    },
    {
        "type": "bXVsdGlwbGU=",
        "difficulty": "ZWFzeQ==",
        "category": "Q2VsZWJyaXRpZXM=",
        "question": "V2hpY2ggY2VsZWJyaXR5IGFubm91bmNlZCBoaXMgcHJlc2lkZW5jeSBpbiAyMDE1Pw==",
        "correct_answer": "S2FueWUgV2VzdA==",
        "incorrect_answers": [
            "RG9uYWxkIFRydW1w",
            "TGVvbmFyZG8gRGlDYXByaW8=",
            "TWlsZXkgQ3lydXM="
        ]
    }
]
const updatedResults = addIsAvailableProperty(results)
const str = JSON.stringify(updatedResults) //for storing data on redis
 
const addQuestions=async(context:Context) =>{
await context.redis.set('questions',str)
for (let i = 0; i<=10;i++){
    const newData = await context.redis.zAdd('questionNumber',{member:`${i}`,score:1}) //1 = answered and two = unanswered
    console.log(newData)
}
}

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
          return LeaderboardPage(_context,setPage)

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
