import Canvas from './components/Canvas';
import Inspector from './components/Inspector';
import Layers from './components/Layers';
import Toolbar from './components/Toolbar';
import Zoom from './components/Zoom';

const App = () => {
  return (
    <div className="flex flex-col h-screen relative">
      <Toolbar />
      <Canvas />
      <Inspector />
      <Layers />
      <Zoom />
    </div>
  );
};

export default App;
