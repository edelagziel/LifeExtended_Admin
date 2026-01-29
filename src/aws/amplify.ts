import { Amplify } from "aws-amplify";

// אנחנו מריצים את זה ישירות, בלי לעטוף בפונקציה
Amplify.configure({
  API: {
    GraphQL: {
      endpoint: "https://lumxugy7kfeuvkowlqdp4copr4.appsync-api.eu-west-1.amazonaws.com/graphql",
      region: "eu-west-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-p4q37etihjbuhifsro67t3epfm",
    },
  },
});