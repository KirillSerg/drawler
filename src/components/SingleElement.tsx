import { ElemenEvent, Element } from '../types/CommonTypes';
import { transformCoordinates } from '../assets/utilities';
import { useAtom } from 'jotai';
import {
  onDragStartAtom,
  onMouseUpAtom,
  updateElementsAtom,
} from '../store/store';

interface Props {
  element: Element;
  svgContainerRef: SVGSVGElement | null;
}

const SingleElement = ({ element, svgContainerRef }: Props) => {
  const [, onDragStart] = useAtom(onDragStartAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);
  const [, onChangeTextElValue] = useAtom(updateElementsAtom);

  const handleMouseDown = (e: ElemenEvent) => {
    const { transX, transY } = transformCoordinates(
      svgContainerRef,
      e.clientX,
      e.clientY,
    );
    onDragStart({
      element,
      position: {
        x: transX,
        y: transY,
      },
    });
  };

  return (
    <>
      {element.type !== 'free' && (
        <element.type //flexible&dynemic rendering svg-elements
          {...element}
          style={{ cursor: 'pointer' }}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={onMouseUp}
        >
          {element.type === 'foreignObject' && (
            <textarea
              autoFocus
              style={{
                width: '100%',
                height: '100%',
                resize: 'none',
                backgroundColor: 'transparent',
              }}
              value={element.textvalue}
              onChange={(event) =>
                onChangeTextElValue({
                  ...element,
                  textvalue: event.target.value,
                })
              }
              name="text-element"
            />
          )}
        </element.type>
      )}
    </>
  );
};

export default SingleElement;
