import { useAtom } from 'jotai';
import { onMouseUpAtom, resizeVectorAtom } from '../store/store';
import { Element } from '../types/CommonTypes';

interface Props {
  element: Element;
}

const SelectingFrame = ({ element }: Props) => {
  const [, setResizeVector] = useAtom(resizeVectorAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);

  return (
    <g>
      {/* top side */}
      <line
        className="hover:cursor-n-resize"
        onMouseDown={() => setResizeVector('nord')}
        onMouseUp={onMouseUp}
        x1={element.x - element.strokeWidth / 2 - 2}
        y1={element.y - element.strokeWidth / 2 - 2}
        x2={element.x + element.width + element.strokeWidth / 2 + 2}
        y2={element.y - element.strokeWidth / 2 - 2}
        stroke="red"
        strokeWidth={2}
      />
      {/* right side */}
      <line
        className="hover:cursor-e-resize"
        onMouseDown={() => setResizeVector('east')}
        onMouseUp={onMouseUp}
        x1={element.x + element.width + element.strokeWidth / 2 + 2}
        y1={element.y - element.strokeWidth / 2 - 2}
        x2={element.x + element.width + element.strokeWidth / 2 + 2}
        y2={element.y + element.height + element.strokeWidth / 2 + 2}
        stroke="red"
        strokeWidth={2}
      />
      {/* bottom side */}
      <line
        className="hover:cursor-s-resize"
        onMouseDown={() => setResizeVector('south')}
        onMouseUp={onMouseUp}
        x1={element.x - element.strokeWidth / 2 - 2}
        y1={element.y + element.height + element.strokeWidth / 2 + 2}
        x2={element.x + element.width + element.strokeWidth / 2 + 2}
        y2={element.y + element.height + element.strokeWidth / 2 + 2}
        stroke="red"
        strokeWidth={2}
      />
      {/* left side */}
      <line
        className="hover:cursor-w-resize"
        onMouseDown={() => setResizeVector('west')}
        onMouseUp={onMouseUp}
        x1={element.x - element.strokeWidth / 2 - 2}
        y1={element.y - element.strokeWidth / 2 - 2}
        x2={element.x - element.strokeWidth / 2 - 2}
        y2={element.y + element.height + element.strokeWidth / 2 + 2}
        stroke="red"
        strokeWidth={2}
      />
      <g>
        {/* top-left */}
        <rect
          className="hover:cursor-nwse-resize"
          onMouseDown={() => setResizeVector('nordwest')}
          onMouseUp={onMouseUp}
          x={element.x - element.strokeWidth / 2 - 6}
          y={element.y - element.strokeWidth / 2 - 6}
          width="6"
          height="6"
          stroke="blue"
          fill="white"
        />

        {/* top-right */}
        <rect
          className="hover:cursor-nesw-resize"
          onMouseDown={() => setResizeVector('nordeast')}
          onMouseUp={onMouseUp}
          x={element.x + element.width - element.strokeWidth / 2 + 4}
          y={element.y - element.strokeWidth / 2 - 6}
          width="6"
          height="6"
          stroke="blue"
          fill="white"
        />

        {/* bottom-right */}
        <rect
          className="hover:cursor-nwse-resize"
          onMouseDown={() => setResizeVector('southeast')}
          onMouseUp={onMouseUp}
          x={element.x + element.width - element.strokeWidth / 2 + 4}
          y={element.y + element.height - element.strokeWidth / 2 + 4}
          width="6"
          height="6"
          stroke="blue"
          fill="white"
        />

        {/* bottom-left */}
        <rect
          className="hover:cursor-nesw-resize"
          onMouseDown={() => setResizeVector('southwest')}
          onMouseUp={onMouseUp}
          x={element.x - element.strokeWidth / 2 - 6}
          y={element.y + element.height - element.strokeWidth / 2 + 4}
          width="6"
          height="6"
          stroke="blue"
          fill="white"
        />
      </g>
    </g>
  );
};

export default SelectingFrame;
