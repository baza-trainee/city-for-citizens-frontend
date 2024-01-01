import { useEffect, useRef, useState } from 'react';
import ImageComponent from './ImageComponent';
import NoImageComponent from './NoImageComponent';
import UploadInputComponent from './UploadInputComponent';
import ErrorMessage from '../ErrorMessage';

const ImageUpload = ({
  handleImageChange,
  imageName,
  imageTitle,
  attributes,
  errorMessage,
}) => {
  const [imageForPreview, setImageForPreview] = useState(null);
  const [imageData, setImageData] = useState({
    src: '',
    alt: '',
  });

  const inputFileRef = useRef(null);

  useEffect(() => {
    setImageData({ src: imageName, alt: imageTitle });
  }, [imageName, imageTitle]);

  const handleChange = evt => {
    setImageData({ src: '', alt: '' });
    setImageForPreview(URL.createObjectURL(evt.target.files[0]));
    let bodyFormData = new FormData();
    bodyFormData.append('file', evt.target.files[0]);

    handleImageChange(bodyFormData);
  };

  const resetImage = () => {
    setImageForPreview(null);
    setImageData({ src: '', alt: '' });
    inputFileRef.current.value = null;
  };

  return (
    <div className="flex w-full max-w-[300px] flex-col gap-[20px] rounded-[15px] bg-gray/10 p-[20px] dark:bg-gray/80">
      {imageForPreview || imageData.src ? (
        <ImageComponent
          resetImage={resetImage}
          src={imageData.src ? imageData.src : imageForPreview}
          alt={imageData.alt ? imageData.alt : ''}
        />
      ) : (
        <NoImageComponent />
      )}

      <div className="relative">
        <UploadInputComponent
          attributes={attributes}
          inputFileRef={inputFileRef}
          isImageUpload={imageForPreview || imageData.src}
          onChange={handleChange}
        />
        {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
      </div>
    </div>
  );
};

export default ImageUpload;
