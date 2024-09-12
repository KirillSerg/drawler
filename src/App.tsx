import { useAtom, useAtomValue } from 'jotai';
import Canvas from './components/canvas/Canvas';
import Inspector from './components/inspector/Inspector';
import Toolbar from './components/toolbar/Toolbar';
import Zoom from './components/canvas/canvasElements/Zoom';
import { isDrawingAtom, onKeyPressAtom } from './store/store';
import HistoryControls from './components/canvas/canvasElements/HistoryControls';

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
      <div className="w-full flex justify-between absolute bottom-4 right-5 min-w-[10%] max-w-[20%] h-fit">
        <HistoryControls />
        <Zoom />
      </div>
    </div>
  );
};

export default App;
