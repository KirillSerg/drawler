import { useAtom } from 'jotai';
import Canvas from './components/Canvas';
import Inspector from './components/Inspector';
import Layers from './components/Layers';
import Toolbar from './components/Toolbar';
import Zoom from './components/Zoom';
import { onKeyPressAtom } from './store/store';

const App = () => {
  const [, onKeyPress] = useAtom(onKeyPressAtom);

  return (
    <div
      className="h-screen flex flex-col items-center relative"
      onKeyDown={(e) => {
        e.preventDefault();
        onKeyPress({ ctrlKey: e.ctrlKey || e.metaKey, key: e.key });
      }}
      onKeyUp={(e) => {
        e.preventDefault();
        onKeyPress({ ctrlKey: e.ctrlKey || e.metaKey, key: '' });
      }}
    >
      <Toolbar />
      <Canvas />
      <Inspector />
      <Layers />
      <Zoom />
    </div>
  );
};

export default App;
