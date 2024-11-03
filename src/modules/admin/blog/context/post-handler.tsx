import { createContext, useReducer } from "react";

type State = {
    title: string;
    content: string;
    step: number;
}

type Action = {
    type: "SET_TITLE";
    payload: string;
} | {
    type: "SET_CONTENT";
    payload: string;
} | {
    type: "SET_STEPS";
    payload: number;
}

const reducer = (state: State, action: Action) => {
    if (action.type === "SET_TITLE") {
        return {
            ...state,
            title: action.payload,
        }
    } else if (action.type === "SET_CONTENT") {
        return {
            ...state,
            content: action.payload,
        }
    } else if (action.type === "SET_STEPS") {
        return {
            ...state,
            step: action.payload,
        }
    }

    return state;
}

const PostHandlerContext = createContext<{
    title: string;
    content: string;
    step: number;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setSteps: (step: number) => void;
}>({
    title: "",
    content: "",
    step: 0,
    setTitle: () => void {},
    setContent: () => void {},
    setSteps: () => void {},
});

const PostHandlerProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, {
        title: "",
        content: "",
        step: 0,
    });

    return (
        <PostHandlerContext.Provider
            value={{
                title: state.title,
                content: state.content,
                step: state.step,
                setTitle: (title: string) => dispatch({ type: "SET_TITLE", payload: title }),
                setContent: (content: string) => dispatch({ type: "SET_CONTENT", payload: content }),
                setSteps: (steps: number) => dispatch({ type: "SET_STEPS", payload: steps }),
            }}>
            {children}
        </PostHandlerContext.Provider>
    )
}

export { PostHandlerProvider, PostHandlerContext };