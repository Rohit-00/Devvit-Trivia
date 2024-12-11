import { SetFlairOptions, SetUserFlairOptions } from "@devvit/public-api";

export const bronze : SetUserFlairOptions = {
    subredditName: "yourSubredditName",
    username: "usernameToAssignFlair",
    text: "Flair Text",
    backgroundColor: "#FFC0CB", 
    textColor: "dark",
    cssClass: "custom-flair-class", 
    flairTemplateId: "template-id" 
};

