import { createContext, useReducer } from "react";
import { PostSchema } from "../lib/definitions";
import { POST_CATEGORIES } from "../lib/constants/post-categories";

export type Post = {
    title: string;
    content: {
        html: string;
        text: string;
    };
    category: typeof POST_CATEGORIES[number];
}

type State = {
    post: Post;
    step: number;
    isSuccess: boolean;
    errors: {
        title?: string[];
        category?: string[];
        content?: string[];
    } | null;
}

type Action =
    | { type: "SET_POST"; payload: Post }
    | { type: "SET_STEPS"; payload: number }
    | { type: "SET_RESET" };

const initialState: State = {
    post: {
        title: "",
        content: {
            html: "",
            text: "",
        },
        category: "INVESTMENTS",
    },
    isSuccess: false,
    errors: null,
    step: 0,
};

const reducer = (state: State, action: Action): State => {
    console.log(action)
    switch (action.type) {
        case "SET_POST": {
            const validation = PostSchema.safeParse({
                ...action.payload,
                content: action.payload.content.text,
            });

            return {
                ...state,
                post: { ...state.post, ...action.payload },
                isSuccess: validation.success,
                errors: validation.success ? null : validation.error.flatten().fieldErrors,
            };
        }
        case "SET_STEPS":
            return {
                ...state,
                step: action.payload,
            };
        case "SET_RESET":
            return initialState;
        default:
            return state;
    }
};

const PostHandlerContext = createContext<{
    post: Post;
    errors: State["errors"];
    isSuccess: boolean;
    step: number;
    setPost: (post: Post) => void;
    setSteps: (step: number) => void;
    setReset: () => void;
}>({
    post: {
        title: "",
        content: {
            html: "",
            text: "",
        },
        category: "INVESTMENTS",
    },
    errors: {},
    isSuccess: false,
    step: 0,
    setPost: () => { },
    setSteps: () => { },
    setReset: () => { },
});

const PostHandlerProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PostHandlerContext.Provider
            value={{
                post: state.post,
                step: state.step,
                errors: state.errors,
                isSuccess: state.isSuccess,
                setPost: (post: Post) => dispatch({ type: "SET_POST", payload: post }),
                setSteps: (step: number) => dispatch({ type: "SET_STEPS", payload: step }),
                setReset: () => dispatch({ type: "SET_RESET" }),
            }}
        >
            {children}
        </PostHandlerContext.Provider>
    );
};

export { PostHandlerProvider, PostHandlerContext };
