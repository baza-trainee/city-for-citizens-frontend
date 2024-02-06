import CloseButton from '@/components/UI/icons/IconClose';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

const FormAddNewType = ({ handleAddNewType }) => {
  const [isFormAddNewTypeVisible, setIsFormAddNewTypeVisible] = useState(false);
  const [inputFormAddNewType, setInputFormAddNewType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addNewTypeRef = useRef(null);

  const t = useTranslations('EventForm');

  const onAddNewType = () => {
    const trimmedText = inputFormAddNewType.trim();
    if (trimmedText !== '') {
      handleAddNewType(trimmedText);
      setInputFormAddNewType('');
      setErrorMessage('');
    } else {
      setErrorMessage(t('eventType.addNewTypeForm'));
    }
  };

  const handleEnterKey = e => {
    if (e.code === 'Enter') {
      e.preventDefault();

      onAddNewType();
    }
  };

  useOnClickOutside(isFormAddNewTypeVisible, addNewTypeRef, () =>
    setIsFormAddNewTypeVisible(false)
  );

  return (
    <>
      <button
        className="absolute right-0 top-[4px]"
        onClick={() => setIsFormAddNewTypeVisible(true)}
        type="button"
      >
        {t('eventType.addNewType')}
      </button>
      {isFormAddNewTypeVisible && (
        <div
          ref={addNewTypeRef}
          className="absolute right-[5px]  top-[30px] flex flex-col gap-[20px] rounded-[4px] border-[1.5px] bg-gray/5 p-[10px] dark:bg-gray/100"
        >
          <div className="relative">
            <input
              autoFocus
              placeholder=""
              className={`   rounded-[4px] border-[1px] bg-gray/0 p-[6px] outline-none placeholder-shown:border-[#000000] dark:border-gray/20 dark:bg-gray/80  ${
                errorMessage ? '!border-[#f94545]' : ''
              }`}
              value={inputFormAddNewType}
              onChange={e => {
                setErrorMessage('');
                setInputFormAddNewType(e.target.value);
              }}
              onKeyDown={handleEnterKey}
            />
            {errorMessage && (
              <p
                className="absolute top-[calc(100%+2px)] text-[14px] text-[#f94545]"
                role="alert"
              >
                {errorMessage}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onAddNewType}>
              <CloseButton className="w-[24px] rotate-[45deg] stroke-[currentColor]" />
            </button>
            <button
              type="button"
              onClick={() => setIsFormAddNewTypeVisible(false)}
            >
              <CloseButton className="w-[24px] stroke-[currentColor]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormAddNewType;
