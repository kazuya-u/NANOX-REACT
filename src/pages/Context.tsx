import { createContext, useState } from 'react';
import ComponentA from '../components/context/ComponentA';

export type ContextType = string;
export const Context = createContext<ContextType>("");

function ParentContext() {
  const [state, setState] = useState<ContextType>("");
  const updateContext = () => setState("Contextを更新！");
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Learn useContext</h1>
      <button onClick={updateContext}>Contextを更新する</button>
      <Context.Provider value={state}>
        <ComponentA />
      </Context.Provider>
    </div>
  );
}

export default ParentContext;
