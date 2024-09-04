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
    <>
      {element.type !== 'line' ? (
        <g id="frame">
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
              x={element.x - element.strokeWidth / 2 - 7}
              y={element.y - element.strokeWidth / 2 - 7}
              width="10"
              height="10"
              stroke="blue"
              fill="white"
            />

            {/* top-right */}
            <rect
              className="hover:cursor-nesw-resize"
              onMouseDown={() => setResizeVector('nordeast')}
              onMouseUp={onMouseUp}
              x={element.x + element.width - element.strokeWidth / 2 + 7}
              y={element.y - element.strokeWidth / 2 - 7}
              width="10"
              height="10"
              stroke="blue"
              fill="white"
            />

            {/* bottom-right */}
            <rect
              className="hover:cursor-nwse-resize"
              onMouseDown={() => setResizeVector('southeast')}
              onMouseUp={onMouseUp}
              x={element.x + element.width - element.strokeWidth / 2 + 7}
              y={element.y + element.height - element.strokeWidth / 2 + 7}
              width="10"
              height="10"
              stroke="blue"
              fill="white"
            />

            {/* bottom-left */}
            <rect
              className="hover:cursor-nesw-resize"
              onMouseDown={() => setResizeVector('southwest')}
              onMouseUp={onMouseUp}
              x={element.x - element.strokeWidth / 2 - 7}
              y={element.y + element.height - element.strokeWidth / 2 + 7}
              width="10"
              height="10"
              stroke="blue"
              fill="white"
            />
          </g>
        </g>
      ) : (
        <g id="frame">
          {/* XY1 */}
          <rect
            className="hover:cursor-nesw-resize"
            onMouseDown={() => setResizeVector('nordwest')}
            onMouseUp={onMouseUp}
            x={element.x1}
            y={element.y1}
            width="10"
            height="10"
            stroke="blue"
            fill="white"
          />
          {/* XY2 */}
          <rect
            className="hover:cursor-nesw-resize"
            onMouseDown={() => setResizeVector('nordeast')}
            onMouseUp={onMouseUp}
            x={element.x2}
            y={element.y2}
            width="10"
            height="10"
            stroke="blue"
            fill="white"
          />
        </g>
      )}
    </>
  );
};

export default SelectingFrame;
