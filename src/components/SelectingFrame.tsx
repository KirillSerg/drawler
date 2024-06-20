import { useAtom } from 'jotai';
import { onMouseUpAtom, resizeAtom } from '../store/store';
import { Element } from '../types/CommonTypes';

interface Props {
  element: Element;
}

const SelectingFrame = ({ element }: Props) => {
  const [, setIsResize] = useAtom(resizeAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);

  return (
    <g>
      {/* top side */}
      <line
        className="hover:cursor-n-resize"
        onMouseDown={() =>
          setIsResize(() => ({
            resizeVector: 'nord',
            isResize: true,
          }))
        }
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
        onMouseDown={() =>
          setIsResize(() => ({
            resizeVector: 'east',
            isResize: true,
          }))
        }
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
        onMouseDown={() =>
          setIsResize(() => ({
            resizeVector: 'south',
            isResize: true,
          }))
        }
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
        onMouseDown={() =>
          setIsResize(() => ({
            resizeVector: 'west',
            isResize: true,
          }))
        }
        onMouseUp={onMouseUp}
        x1={element.x - element.strokeWidth / 2 - 2}
        y1={element.y - element.strokeWidth / 2 - 2}
        x2={element.x - element.strokeWidth / 2 - 2}
        y2={element.y + element.height + element.strokeWidth / 2 + 2}
        stroke="red"
        strokeWidth={2}
      />

      {/* top-left */}
      <rect
        className="hover:cursor-nwse-resize"
        onMouseDown={() =>
          setIsResize(() => ({
            resizeVector: 'nordwest',
            isResize: true,
          }))
        }
        onMouseUp={onMouseUp}
        x={element.x - element.strokeWidth / 2 - 4}
        y={element.y - element.strokeWidth / 2 - 4}
        width="4"
        height="4"
        fill="lightgray"
      />

      {/* top-right */}
      <rect
        className="hover:cursor-nesw-resize"
        onMouseDown={() =>
          setIsResize(() => ({
            resizeVector: 'nordeast',
            isResize: true,
          }))
        }
        onMouseUp={onMouseUp}
        x={element.x + element.width - element.strokeWidth / 2 + 4}
        y={element.y - element.strokeWidth / 2 - 4}
        width="4"
        height="4"
        fill="lightgray"
      />

      {/* bottom-right */}
      <rect
        className="hover:cursor-nwse-resize"
        onMouseDown={() =>
          setIsResize(() => ({
            resizeVector: 'southeast',
            isResize: true,
          }))
        }
        onMouseUp={onMouseUp}
        x={element.x + element.width - element.strokeWidth / 2 + 4}
        y={element.y + element.height - element.strokeWidth / 2 + 4}
        width="4"
        height="4"
        fill="lightgray"
      />

      {/* bottom-left */}
      <rect
        className="hover:cursor-nesw-resize"
        onMouseDown={() =>
          setIsResize(() => ({
            resizeVector: 'southwest',
            isResize: true,
          }))
        }
        onMouseUp={onMouseUp}
        x={element.x - element.strokeWidth / 2 - 4}
        y={element.y + element.height - element.strokeWidth / 2 + 4}
        width="4"
        height="4"
        fill="lightgray"
      />
    </g>
  );
};

export default SelectingFrame;
