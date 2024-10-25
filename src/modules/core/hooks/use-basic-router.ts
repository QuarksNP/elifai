import { useRouter } from "next/navigation";

export const useBasicRouter = () => {
    const router = useRouter();

    function handleGoBack() {
        router.back();
    }

    return {
        handleGoBack
    }
}