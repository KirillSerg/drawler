import { useState } from 'react';
import { useAtom } from 'jotai';
import { creatingElementTypeAtom, initialElementAtom } from '../store/store';
import { Element } from '../types/CommonTypes';

const elementsType = {
  free: 'free',
  rect: 'rect',
  ellipse: 'ellipse',
  polygon: 'polygon',
  line: 'line',
  arrow_line: 'line',
};

const Toolbar = () => {
  const [elementTypeName, setElementTypeName] =
    useState<keyof typeof elementsType>('free');
  const [, setCreatingElementType] = useAtom(creatingElementTypeAtom);
  const [, setInitialElement] = useAtom(initialElementAtom);

  const handlerSetElementTypeName = (typeName: keyof typeof elementsType) => {
    setElementTypeName(typeName);
    setCreatingElementType(elementsType[typeName] as Element['type']);

    if (typeName === 'arrow_line')
      setInitialElement((prev) => {
        return { ...prev, markerEnd: 'url(#arrow)' };
      });
  };

  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <button
        className={`${elementTypeName === 'free' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => handlerSetElementTypeName('free')}
      >
        🖱️
      </button>
      <button
        className={`${elementTypeName === 'rect' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => handlerSetElementTypeName('rect')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>
      <button
        className={`${elementTypeName === 'ellipse' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => handlerSetElementTypeName('ellipse')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="7"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      <button
        className={`${elementTypeName === 'polygon' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => handlerSetElementTypeName('polygon')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="12,2 22,22 2,22"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </button>

      <button
        className={`${elementTypeName === 'line' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => handlerSetElementTypeName('line')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </button>

      <button
        className={`${elementTypeName === 'arrow_line' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => handlerSetElementTypeName('arrow_line')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="5"
              markerHeight="5"
              refX="5"
              refY="2.5"
              orient="auto"
            >
              <path d="M 0 0 L 5 2.5 L 0 5" fill="none" stroke="black" />
            </marker>
          </defs>
          <line
            x1="0"
            y1="12"
            x2="24"
            y2="12"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        </svg>
      </button>
    </header>
  );
};

export default Toolbar;
