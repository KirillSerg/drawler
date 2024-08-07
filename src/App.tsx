import { useAtom, useAtomValue } from 'jotai';
import Canvas from './components/Canvas';
import Inspector from './components/Inspector';
import Toolbar from './components/Toolbar';
import Zoom from './components/Zoom';
import { isDrawingAtom, onKeyPressAtom } from './store/store';

const App = () => {
  const [, onKeyPress] = useAtom(onKeyPressAtom);
  const isDrawing = useAtomValue(isDrawingAtom);

  return (
    <div
      className={`h-screen flex flex-col items-center relative ${isDrawing ? 'cursor-crosshair' : ''}`}
      onKeyDown={(e) => {
        if (e.key === '+' || e.key === '-') {
          e.preventDefault();
        }
        onKeyPress({ ctrlKey: e.ctrlKey || e.metaKey, key: e.key });
      }}
      onKeyUp={(e) => {
        if (e.key === '+' || e.key === '-') {
          e.preventDefault();
        }
        onKeyPress({ ctrlKey: e.ctrlKey || e.metaKey, key: '' });
      }}
    >
      <Toolbar />
      <Canvas />
      <Inspector />
      <Zoom />
    </div>
  );
};

export default App;
