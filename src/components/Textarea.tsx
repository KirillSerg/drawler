import { useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { isDrawingAtom, updateElementsAtom } from '../store/store';
import { Element } from '../types/CommonTypes';

type Props = {
  element: Element;
};

const Textarea = ({ element }: Props) => {
  const [, updateElements] = useAtom(updateElementsAtom);
  const isDrawing = useAtomValue(isDrawingAtom);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onChangeTexstarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
      updateElements({
        ...element,
        height: textareaRef.current.scrollHeight,
        textvalue: event.target.value,
      });
    }
  };

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      autoFocus={isDrawing}
      style={{
        width: '100%',
        height: '100%',
        resize: 'none',
        border: 'none',
        scrollbarWidth: 'none',
        backgroundColor: element.fill,
      }}
      placeholder="text"
      value={element.textvalue}
      onChange={(event) => onChangeTexstarea(event)}
      name="text-element"
    />
  );
};

export default Textarea;
