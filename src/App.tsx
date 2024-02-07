import { useState } from 'react';
import Canvas from './components/Canvas';
import Inspector from './components/Inspector';
import Layers from './components/Layers';
import Toolbar from './components/Toolbar';
import { Element } from './types/Common';

const App = () => {
  const [elements, setElements] = useState<Element[]>([]);

  const handleCreateElement = (value: Element) => {
    setElements((prev) => [...prev, { ...value, id: crypto.randomUUID() }]);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <Toolbar onCreate={handleCreateElement} />
      <Canvas elements={elements} setElements={setElements} />
      <Inspector />
      <Layers />
    </div>
  );
};

export default App;
