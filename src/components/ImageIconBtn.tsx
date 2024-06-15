import { useRef } from 'react';
import { useAtom } from 'jotai';
import { ElementProps } from '../types/CommonTypes';
import { creationInitialElementAtom } from '../store/store';

interface Props {
  className: string;
  handlerClick: (props: ElementProps) => void;
}

const ImageIconBtn = ({ className, handlerClick }: Props) => {
  const [, setCreationInitialElement] = useAtom(creationInitialElementAtom);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // if (reader.result !== null)
        setCreationInitialElement((prev) => {
          return { ...prev, href: reader.result };
        });
        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <button
      className={className}
      onClick={() => handlerClick({ type_name: 'image' })}
    >
      <label
        htmlFor="image"
        className="absolute top-0 left-0 w-full h-full cursor-pointer"
      ></label>
      <input
        ref={fileInputRef}
        onChange={(e) => handleImageChange(e)}
        id="image"
        type="file"
        className="hidden"
      />
      <svg
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
      </svg>
    </button>
  );
};

export default ImageIconBtn;
