'use client';
import { LOCALE } from '@/helpers/constants';

import ImageUpload from './UploadImage/UploadImage';

import { useHandleFormData } from '@/hooks';
import { useState } from 'react';
import AddEventType from './AddEventType/AddEventType';
import { errorMessage, regexPatterns } from './constants';

const EventForm = ({ buttonName, onSubmit, eventUk, eventEn }) => {
  const [formDataUk, handleChangeUk, resetFormUk] = useHandleFormData(
    'uk_UA',
    eventUk
  );

  const [formDataEn, handleChangeEn, resetFormEn] = useHandleFormData(
    'en_US',
    eventEn
  );

  const [formDataImageUk, setFormDataImageUk] = useState(null);
  const [formDataImageEn, setFormDataImageEn] = useState(null);

  const [formDataEventTypeUk, setFormDataEventTypeUk] = useState([]);
  const [formDataEventTypeEn, setFormDataEventTypeEn] = useState([]);
  const [errorMessageUk, setErrorMessageUk] = useState({
    eventType: '',
    eventImage: '',
  });
  const [errorMessageEn, setErrorMessageEn] = useState({
    eventType: '',
    eventImage: '',
  });

  const resetForm = () => {
    setFormDataImageUk(null);
    setFormDataImageEn(null);
    setFormDataEventTypeUk([]);
    setFormDataEventTypeEn([]);
    resetFormUk();
    resetFormEn();
  };

  const handleSubmit = e => {
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
      setErrorMessageUk(prev => ({
        ...prev,
        eventType: errorMessage.eventType,
      }));
      return;
    } else if (formDataEventTypeEn.length === 0) {
      setErrorMessageEn(prev => ({
        ...prev,
        eventType: errorMessage.eventType,
      }));
      return;
    } else {
      setErrorMessageEn('');
      setErrorMessageUk('');
    }

    if (!formDataUk.eventImage && !formDataImageUk) {
      setErrorMessageUk(prev => ({
        ...prev,
        eventImage: errorMessage.eventImage,
      }));
      return;
    } else if (!formDataEn.eventImage && !formDataImageEn) {
      setErrorMessageEn(prev => ({
        ...prev,
        eventImage: errorMessage.eventImage,
      }));
      return;
    } else {
      setErrorMessageEn('');
      setErrorMessageUk('');
    }

    onSubmit(e, dataUk, dataEn, formDataImageUk, formDataImageEn, resetForm);
  };

  const inputsAttributes = {
    firstGroup: [
      {
        tag: 'input',
        label: 'Назва Події / Event name',
        name: 'eventTitle',
        type: 'text',
        placeholder: 'Введіть назву',
        title: 'Назва події не може бути меншим за 3 символа',
        pattern: '.{3,}',
        required: true,
      },
      {
        tag: 'input',
        label: 'Місто / City',
        name: 'city',
        type: 'text',
        placeholder: 'Вкажіть місто',
        title: 'Місто не може бути меншим за 2 символа',
        pattern: '.{2,}',
        required: true,
      },
      {
        tag: 'input',
        label: 'Вулиця / Street',
        name: 'street',
        type: 'text',
        placeholder: 'Вкажіть вулицю',
        title: 'Вулиця не може бути меншим за 2 символа',
        pattern: '.{2,}',
        required: true,
      },
      {
        tag: 'textarea',
        label: 'Опис / Description',
        name: 'description',
        type: 'text',
        rows: '5',
        placeholder: 'Додайте опис',
        required: true,
      },
      {
        tag: 'textarea',
        label: 'Примітки / Notes',
        name: 'notes',
        type: 'text',
        rows: '3',
        placeholder: 'Опишіть детально про місце',
        required: true,
      },
    ],
    secondGroup: [
      {
        tag: 'input',
        label: 'Дата / Date',
        name: 'date',
        type: 'date',
        required: true,
      },
      {
        tag: 'input',
        label: 'Час / Time',
        name: 'time',
        type: 'time',
        required: true,
      },
      {
        tag: 'input',
        label: 'Координати / Coordinates',
        name: 'coordinates',
        type: 'text',
        placeholder: '49.04761451133044, 31.387372519412626',
        title:
          'Координати мають бути у такому форматі: "-12.3456789, +112.3456789", "45.123456, 87.654321", "0.0, 0.0" (можна скористатися онлайн картами, наприклад "Google Maps")',
        pattern: regexPatterns.coordinates,
        required: true,
      },
      {
        tag: 'input',
        label: 'URL-адреса події/ Event Url',
        name: 'eventUrl',
        type: 'url',
        placeholder: 'https://example.com',
        title: 'Введіть URL-адресу наприклад: https://example.com',
        pattern: 'https://.*',
        required: true,
      },
    ],

    eventType: {
      name: 'eventType',
      type: 'text',
      rows: '1',
      placeholder: 'Введіть новий тип тут...',
      required: true,
    },
    eventImage: {
      name: 'eventImage',
      type: 'file',
      accept: 'image/*',
    },
  };

  return (
    <>
      <div className="mb-[30px] flex justify-center gap-[70px] text-[26px]">
        <p>Деталі події українською</p>
        <p>Деталі події англійською</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mb-[30px] w-[650px]">
        <div className="mb-[35px] flex flex-wrap gap-[15px] gap-x-[50px]">
          {inputsAttributes.firstGroup.map(({ label, name, tag, ...attr }) => {
            const commonProps = {
              name: name,
              tag: tag,
              attributes: attr,
            };

            return (
              <FieldWrapper label={label} key={label}>
                <FormElement
                  value={formDataUk[name]}
                  handleChange={handleChangeUk}
                  {...commonProps}
                />
                <FormElement
                  value={formDataEn[name]}
                  handleChange={handleChangeEn}
                  {...commonProps}
                />
              </FieldWrapper>
            );
          })}

          <FieldWrapper label={'Тип події / Event type'}>
            <AddEventType
              attributes={inputsAttributes.eventType}
              initialState={formDataUk.eventType || ''}
              errorMessage={errorMessageUk.eventType}
              setEventTypesSelected={setFormDataEventTypeUk}
              eventTypesSelected={formDataEventTypeUk}
              locale={LOCALE.uk.forRequest}
            />
            <AddEventType
              attributes={inputsAttributes.eventType}
              errorMessage={errorMessageEn.eventType}
              initialState={formDataEn.eventType || ''}
              setEventTypesSelected={setFormDataEventTypeEn}
              eventTypesSelected={formDataEventTypeEn}
              locale={LOCALE.en.forRequest}
            />
          </FieldWrapper>
          <FieldWrapper label={'Зображення події / Event image'}>
            <ImageUpload
              attributes={inputsAttributes.eventImage}
              errorMessage={errorMessageUk.eventImage}
              imageName={formDataUk.eventImage || ''}
              imageTitle={formDataUk.eventTitle || ''}
              handleImageChange={setFormDataImageUk}
              formDataImage={formDataImageUk}
            />
            <ImageUpload
              attributes={inputsAttributes.eventImage}
              errorMessage={errorMessageEn.eventImage}
              imageName={formDataEn.eventImage || ''}
              imageTitle={formDataEn.eventTitle || ''}
              handleImageChange={setFormDataImageEn}
              formDataImage={formDataImageEn}
            />
          </FieldWrapper>
          {inputsAttributes.secondGroup.map(({ label, name, tag, ...attr }) => (
            <FieldWrapper label={label} key={label}>
              <FormElement
                value={formDataUk[name]}
                name={name}
                tag={tag}
                handleChange={e => {
                  handleChangeEn(e);
                  handleChangeUk(e);
                }}
                attributes={attr}
              />
            </FieldWrapper>
          ))}
        </div>

        <button
          type="submit"
          className="mx-auto my-0 block cursor-pointer rounded-[10px] bg-primary/100 
           px-[40px] py-[10px]  
          text-center text-[16px]  text-gray/5 transition-colors 
    hover:bg-primary/80"
        >
          {buttonName}
        </button>
      </form>
    </>
  );
};
export default EventForm;

const FieldWrapper = ({ children, label }) => {
  return (
    <div>
      <h3 className="mb-[10px] text-center text-[20px]">{label}</h3>
      <div className="flex gap-[50px]">{children}</div>
    </div>
  );
};

const FormElement = ({ handleChange, value, name, attributes, tag }) => {
  const Tag = tag === 'input' ? 'input' : 'textarea';
  return (
    <Tag
      className="w-[300px] resize-none rounded-[5px] border-[1px] border-gray/50 bg-gray/0 px-[16px] py-[8px] dark:border-gray/20 dark:bg-gray/80"
      {...attributes}
      value={value}
      name={name}
      onChange={handleChange}
    />
  );
};
