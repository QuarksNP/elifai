import { createContext, useReducer } from 'react';
import { PostSchema } from '../lib/definitions';
import { POST_CATEGORIES } from '../lib/constants/post-categories';

export type Post = {
  title: string;
  content: {
    html: string;
    text: string;
  };
  category: (typeof POST_CATEGORIES)[number];
};

type State = {
  post: Post;
  step: number;
  isSuccess: boolean;
  errors: {
    title?: string[];
    category?: string[];
    content?: string[];
  } | null;
};

type Action =
  | { type: 'SET_POST'; payload: Post }
  | { type: 'SET_STEPS'; payload: number }
  | { type: 'SET_RESET' };

const initialState: State = {
  post: {
    title: '',
    content: {
      html: '',
      text: '',
    },
    category: 'INVESTMENTS',
  },
  step: 0,
  isSuccess: false,
  errors: null,
};

const persistedInitialState = (() => {
  const persistedState = localStorage.getItem('post-handler-state');
  if (persistedState) {
    const parsedState = JSON.parse(persistedState);

    const validation = PostSchema.safeParse({
      ...parsedState,
      content: parsedState.content.text,
    });

    return {
      post: parsedState,
      isSuccess: validation.success,
      errors: validation.success
        ? null
        : validation.error.flatten().fieldErrors,
      step: 0,
    };
  }

  return initialState;
})() as State;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_POST': {
      const validation = PostSchema.safeParse({
        ...action.payload,
        content: action.payload.content.text,
      });

      return {
        ...state,
        post: { ...state.post, ...action.payload },
        isSuccess: validation.success,
        errors: validation.success
          ? null
          : validation.error.flatten().fieldErrors,
      };
    }
    case 'SET_STEPS':
      return {
        ...state,
        step: action.payload,
      };
    case 'SET_RESET':
      return initialState;
    default:
      return state;
  }
};

const PostHandlerContext = createContext<{
  post: Post;
  errors: State['errors'];
  isSuccess: boolean;
  step: number;
  setPost: (post: Post) => void;
  setSteps: (step: number) => void;
  setReset: () => void;
}>({
  ...initialState,
  setPost: () => {},
  setSteps: () => {},
  setReset: () => {},
});

const PostHandlerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, persistedInitialState);

  function persistState(post: Post) {
    localStorage.setItem('post-handler-state', JSON.stringify(post));

    dispatch({ type: 'SET_POST', payload: post });
  }

  function resetState() {
    localStorage.removeItem('post-handler-state');

    dispatch({ type: 'SET_RESET' });
  }

  return (
    <PostHandlerContext.Provider
      value={{
        post: state.post,
        step: state.step,
        errors: state.errors,
        isSuccess: state.isSuccess,
        setPost: (post: Post) => persistState(post),
        setReset: () => resetState(),
        setSteps: (step: number) =>
          dispatch({ type: 'SET_STEPS', payload: step }),
      }}
    >
      {children}
    </PostHandlerContext.Provider>
  );
};

export { PostHandlerProvider, PostHandlerContext };
