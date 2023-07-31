import ComponentA from '../components/context/ComponentA';

function ParentContext() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Learn useContext</h1>
      <ComponentA />
    </div>
  );
}

export default ParentContext;
