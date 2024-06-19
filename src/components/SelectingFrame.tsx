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
      {/* top */}
      <line
        className="hover:cursor-ns-resize"
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
      {/* right */}
      <line
        className="hover:cursor-ew-resize"
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
      {/* bottom */}
      <line
        className="hover:cursor-ns-resize"
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
      {/* left */}
      <line
        className="hover:cursor-ew-resize"
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
    </g>
  );
};

export default SelectingFrame;
