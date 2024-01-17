import Canvas from './components/Canvas';
import Inspector from './components/Inspector';
import Layers from './components/Layers';
import Toolbar from './components/Toolbar';

const App = () => {
  return (
    <div className="flex flex-col h-[100vh] relative">
      <Toolbar />
      <Canvas />
      <Inspector />
      <Layers />
    </div>
  );
};

export default App;
