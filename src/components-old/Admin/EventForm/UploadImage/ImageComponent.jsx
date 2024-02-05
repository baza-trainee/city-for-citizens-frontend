import CloseButton from '@/components-old/UI/icons/IconClose';
import Image from 'next/image';

const ImageComponent = ({ resetImage, src, alt }) => {
  const handleImageError = () => {
    resetImage();
  };

  return (
    <div className="relative">
      <Image
        onError={handleImageError}
        className=" h-[108px] w-[240px] rounded-[10px] border object-cover dark:border-gray/80 mobile:w-[358px]"
        src={src}
        alt={alt}
        width={240}
        height={105}
      />
      <button
        className="absolute -right-[10px] -top-[10px] rounded-[50%] bg-gray/10 dark:bg-gray/50"
        onClick={resetImage}
        type="button"
      >
        <CloseButton className="h-[32px]  w-[32px] stroke-gray/80 transition-colors hover:stroke-[#ff0000] dark:stroke-gray/10 hover:dark:stroke-[#cd4747]" />
      </button>
    </div>
  );
};

export default ImageComponent;
