import { createContext, useReducer } from "react";
import { PostSchema } from "../lib/definitions";

export type Post = {
    title: string;
    content: {
        html: string;
        text: string;
    };
    category: string;
}

type State = {
    post: Post;
    step: number;
    isSuccess: boolean;
    errors: {
        title?: string[];
        category?: string[];
        content?: string[];
    };
}

type Action =
    | { type: "SET_POST"; payload: Post }
    | { type: "SET_STEPS"; payload: number };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_POST": {
            const validation = PostSchema.safeParse({
                ...state.post,
                content: state.post.content.text,
            });
            return {
                ...state,
                post: { ...state.post, ...action.payload },
                isSuccess: validation.success,
                errors: validation.success ? {} : validation.error.flatten().fieldErrors,
            };
        }
        case "SET_STEPS":
            return {
                ...state,
                step: action.payload,
            };
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
}>({
    post: {
        title: "",
        content: {
            html: "",
            text: "",
        },
        category: "",
    },
    errors: {},
    isSuccess: false,
    step: 0,
    setPost: () => {},
    setSteps: () => {},
});

const PostHandlerProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, {
        post: {
            title: "",
            content: {
                html: "",
                text: "",
            },
            category: "",
        },
        isSuccess: false,
        errors: {},
        step: 0,
    });

    return (
        <PostHandlerContext.Provider
            value={{
                post: state.post,
                step: state.step,
                errors: state.errors,
                isSuccess: state.isSuccess,
                setPost: (post: Post) => dispatch({ type: "SET_POST", payload: post }),
                setSteps: (step: number) => dispatch({ type: "SET_STEPS", payload: step }),
            }}
        >
            {children}
        </PostHandlerContext.Provider>
    );
};

export { PostHandlerProvider, PostHandlerContext };
