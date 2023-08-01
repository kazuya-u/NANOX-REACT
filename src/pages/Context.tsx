import { useParentContext, Context } from '../feature/context/useContext';
import ComponentA from '../components/context/ComponentA';

function ParentContext() {
  const { state, updateContext } = useParentContext();

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
