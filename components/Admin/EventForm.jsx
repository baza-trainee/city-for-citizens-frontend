'use client';
import { IMAGE_BASE_URL, LOCALE } from '@/helpers/constants';

import ImageUpload from './UploadImage/UploadImage';

import { useHandleFormData } from '@/hooks';
import { useState } from 'react';
import AddEventType from './AddEventType/AddEventType';

const EventForm = ({ buttonName, onSubmit, eventUk, eventEn }) => {
  const [formDataUk, handleChangeUk] = useHandleFormData('uk_UA', eventUk);
  const [formDataEn, handleChangeEn] = useHandleFormData('en_US', eventEn);

  const [formDataImageUk, setFormDataImageUk] = useState();
  const [formDataImageEn, setFormDataImageEn] = useState();

  const [formDataEventTypeUk, setFormDataEventTypeUk] = useState([]);
  const [formDataEventTypeEn, setFormDataEventTypeEn] = useState([]);
  const [errorMessageUk, setErrorMessageUk] = useState('');
  const [errorMessageEn, setErrorMessageEn] = useState('');

  const inputClassNames =
    'rounded-[5px] bg-gray/10 px-[16px] py-[8px] dark:bg-gray/80';

  const formInputs = [
    {
      label: 'Назва Події / Event name',
      isDouble: true,
      attributes: {
        required: true,
        placeholder: 'Введіть назву',
        name: 'eventTitle',
        type: 'text',
        title: 'Назва події не може бути меншим за 3 символа',
        pattern: '.{3,}',
      },
    },
    {
      label: 'Опис / Description',
      isDouble: true,
      element: 'textarea',
      attributes: {
        required: true,
        placeholder: 'Додайте опис',
        type: 'text',
        name: 'description',
        rows: '5',
      },
    },
    {
      label: 'Примітки / Notes',
      isDouble: true,
      element: 'textarea',
      attributes: {
        required: true,
        placeholder: 'Опишіть детально про місце',
        type: 'text',
        name: 'notes',
        rows: '3',
      },
    },
    {
      label: 'Тип події / Event type',
      isDouble: true,
      element: 'eventType',
      attributes: {
        required: true,
        name: 'eventType',
        type: 'text',
        rows: 1,
        placeholder: 'Введіть новий тип тут...',
      },
    },
    {
      label: 'Зображення події / Event image',
      isDouble: true,
      element: 'eventImage',
      attributes: {
        required: true,
        name: 'eventImage',
        type: 'file',
        accept: 'image/*',
      },
    },
    {
      label: 'Місто / City',
      isDouble: true,
      attributes: {
        required: true,
        type: 'text',
        title: 'Місто не може бути меншим за 2 символа',
        pattern: '.{2,}',
        name: 'city',
        placeholder: 'Вкажіть місто',
      },
    },
    {
      label: 'Вулиця / Street',
      isDouble: true,
      attributes: {
        required: true,
        name: 'street',
        title: 'Вулиця не може бути меншим за 2 символа',
        pattern: '.{2,}',
        type: 'text',
        placeholder: 'Вкажіть вулицю',
      },
    },
    {
      label: 'Дата / Date',

      isDouble: false,
      attributes: {
        required: true,
        name: 'date',
        type: 'date',
      },
    },
    {
      label: 'Час / Time',

      isDouble: false,
      attributes: {
        required: true,
        name: 'time',
        type: 'time',
      },
    },
    {
      label: 'Координати / Coordinates',

      isDouble: false,
      attributes: {
        required: true,
        name: 'coordinates',
        type: 'text',
        pattern:
          '^(+|-)?((d((.)|.d{1,20})?)|(0*?[0-8]d((.)|.d{1,20})?)|(0*?4?[1-9]|0)((.)|.0{1,20})?),s*(+|-)?((d((.)|.d{1,20})?)|(0*?dd((.)|.d{1,20})?)|(0*?1[0-7]d((.)|.d{1,20})?)|(0*?1[0-7][0-9]|[1-8]d|90)((.)|.0{1,20})?)$',
        title:
          'Координати мають бути у такому форматі: "-12.3456789, +112.3456789", "45.123456, 87.654321", "0.0, 0.0" (можна скористатися онлайн картами, наприклад "Google Maps")',
        placeholder: '50.4302484, 30.4936464',
      },
    },
    {
      label: 'URL-адреса події/ Event Url',

      isDouble: false,
      attributes: {
        required: true,
        name: 'eventUrl',
        placeholder: 'https://example.com',
        type: 'url',
        pattern: 'https://.*',
      },
    },
  ];

  return (
    <>
      <div className="mb-[30px] flex justify-center gap-[70px] text-[26px]">
        <p>Деталі події українською</p>
        <p>Деталі події англійською</p>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          const dataUk = {
            ...formDataUk,
            eventType: formDataEventTypeUk.join(','),
          };
          const dataEn = {
            ...formDataEn,
            eventType: formDataEventTypeEn.join(','),
          };

          if (formDataEventTypeUk.length === 0) {
            setErrorMessageUk('Натисніть на кнопку "Додати "⊕""');
            return;
          } else {
            setErrorMessageUk('');
          }
          if (formDataEventTypeEn.length === 0) {
            setErrorMessageEn('Натисніть на кнопку "Додати "⊕""');
            return;
          } else {
            setErrorMessageEn('');
          }

          onSubmit(e, dataUk, dataEn, formDataImageUk, formDataImageEn);
        }}
        className="mx-auto mb-[30px] flex w-[650px] flex-wrap  gap-[15px] gap-x-[50px]"
      >
        {formInputs.map(({ label, element, isDouble, attributes }) => {
          if (element === 'eventImage') {
            return (
              <div key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <div className="flex gap-[50px]">
                  <ImageUpload
                    attributes={attributes}
                    imageName={
                      formDataUk.eventImage
                        ? `${IMAGE_BASE_URL}${formDataUk.eventImage}`
                        : ''
                    }
                    imageTitle={
                      formDataUk.eventTitle ? formDataUk.eventTitle : ''
                    }
                    handleImageChange={setFormDataImageUk}
                  />
                  <ImageUpload
                    attributes={attributes}
                    imageName={
                      formDataEn.eventImage
                        ? `${IMAGE_BASE_URL}${formDataEn.eventImage}`
                        : ''
                    }
                    imageTitle={
                      formDataEn.eventTitle ? formDataEn.eventTitle : ''
                    }
                    handleImageChange={setFormDataImageEn}
                  />
                </div>
              </div>
            );
          }
          if (element === 'eventType') {
            return (
              <div key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <div className="flex gap-[50px]">
                  <AddEventType
                    initialState={
                      formDataUk.eventType ? formDataUk.eventType : ''
                    }
                    errorMessage={errorMessageUk}
                    setEventTypesSelected={setFormDataEventTypeUk}
                    locale={LOCALE.uk.forRequest}
                    eventTypesSelected={formDataEventTypeUk}
                    attributes={attributes}
                  />
                  <AddEventType
                    errorMessage={errorMessageEn}
                    attributes={attributes}
                    initialState={
                      formDataEn.eventType ? formDataEn.eventType : ''
                    }
                    setEventTypesSelected={setFormDataEventTypeEn}
                    locale={LOCALE.en.forRequest}
                    eventTypesSelected={formDataEventTypeEn}
                  />
                </div>
              </div>
            );
          }
          if (element === 'textarea') {
            return (
              <div key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <div className="flex gap-[50px]">
                  <textarea
                    {...attributes}
                    className={`w-[300px] resize-none ${inputClassNames}`}
                    onChange={handleChangeUk}
                    value={formDataUk[attributes.name]}
                  ></textarea>
                  <textarea
                    {...attributes}
                    className={`w-[300px] resize-none ${inputClassNames}`}
                    onChange={handleChangeEn}
                    value={formDataEn[attributes.name]}
                  ></textarea>
                </div>
              </div>
            );
          }
          if (isDouble) {
            return (
              <div className="" key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <div className="flex gap-[50px]">
                  <input
                    {...attributes}
                    className={`w-[300px] ${inputClassNames}`}
                    value={formDataUk[attributes.name]}
                    onChange={handleChangeUk}
                  />
                  <input
                    {...attributes}
                    className={`w-[300px] ${inputClassNames}`}
                    value={formDataEn[attributes.name]}
                    onChange={handleChangeEn}
                  />
                </div>
              </div>
            );
          }
          if (!isDouble) {
            return (
              <div className="w-[300px]" key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <input
                  {...attributes}
                  className={`min-w-[300px] ${inputClassNames}`}
                  value={formDataUk[attributes.name]}
                  onChange={e => {
                    handleChangeEn(e);
                    handleChangeUk(e);
                  }}
                />
              </div>
            );
          }
        })}
        <button
          type="submit"
          className="mx-auto my-0 block rounded-[10px] bg-primary/80 px-[40px] py-[10px]"
        >
          {buttonName}
        </button>
      </form>
    </>
  );
};
export default EventForm;
