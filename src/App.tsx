import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';

const App = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <Toolbar />
      <Canvas />
    </div>
  );
};

export default App;
