import { createContext, useState } from 'react';

export type ContextType = string;
export const Context = createContext<ContextType>("");

export function useParentContext() {
  const [state, setState] = useState<ContextType>("");
  const updateContext = () => setState("Contextを更新！");
  
  return {
    state,
    updateContext,
  };
}
