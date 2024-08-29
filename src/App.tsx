import { useAtom, useAtomValue } from 'jotai';
import Canvas from './components/Canvas';
import Inspector from './components/Inspector';
import Toolbar from './components/Toolbar';
import Zoom from './components/Zoom';
import { isDrawingAtom, onKeyPressAtom } from './store/store';
import HistoryControls from './components/HistoryControls';

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
      <div className="w-full flex justify-end px-5">
        <Zoom />
        <HistoryControls />
      </div>
    </div>
  );
};

export default App;
