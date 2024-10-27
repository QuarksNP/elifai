import { googleSignIn } from "../actions/google-sign-in"

export const useGoogle = () => {
    async function handleGoogleSignIn() {
        await googleSignIn();
    }

    return {
       handleGoogleSignIn 
    }
}