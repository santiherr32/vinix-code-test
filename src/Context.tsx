import { createContext, useReducer, ReactNode, Dispatch } from 'react';


type AppState = typeof initialState;
type Action =
    | { type: 'SET_TOKEN'; payload: string }

const newContext = '';
const initialState = {
    Token: newContext,
};

interface ContextsProviderProps {
    children: ReactNode;
}

const reducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                Token: action.payload,
            };
        default:
            return state;
    }
};

const AppContext = createContext<{
    state: AppState;
    dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => { } });

function ContextProvider({ children }: ContextsProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, ContextProvider };
