import { twitterSignIn } from "../actions/twitter-sign-in";

export const useTwitter = () => {
    async function handleTwitterSignIn() {
        await twitterSignIn();
    };

    return {
        handleTwitterSignIn
    }
};