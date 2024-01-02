'use client';
import { LOCALE } from '@/helpers/constants';

import ImageUpload from './UploadImage/UploadImage';

import { useHandleFormData } from '@/hooks';
import { useState } from 'react';
import AddEventType from './AddEventType/AddEventType';
import { errorMessage, regexPatterns } from './constants';
import { useTranslations } from 'next-intl';

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

  const t = useTranslations('EventForm');

  const inputsAttributes = {
    firstGroup: [
      {
        tag: 'input',
        label: t('eventTitle.title'),
        name: 'eventTitle',
        type: 'text',
        placeholder: t('eventTitle.placeholder'),
        title: t('eventTitle.infoMessage'),
        pattern: '.{3,}',
        required: true,
      },
      {
        tag: 'input',
        label: t('city.title'),
        name: 'city',
        type: 'text',
        placeholder: t('city.placeholder'),
        title: t('city.infoMessage'),
        pattern: '.{2,}',
        required: true,
      },
      {
        tag: 'input',
        label: t('street.title'),
        name: 'street',
        type: 'text',
        placeholder: t('street.placeholder'),
        title: t('street.infoMessage'),
        pattern: '.{2,}',
        required: true,
      },
      {
        tag: 'textarea',
        label: t('description.title'),
        name: 'description',
        type: 'text',
        rows: '5',
        placeholder: t('description.placeholder'),
        required: true,
      },
      {
        tag: 'textarea',
        label: t('notes.title'),
        name: 'notes',
        type: 'text',
        rows: '3',
        placeholder: t('notes.placeholder'),
        required: true,
      },
    ],
    secondGroup: [
      {
        tag: 'input',
        label: t('date.title'),
        name: 'date',
        type: 'date',
        required: true,
      },
      {
        tag: 'input',
        label: t('time.title'),
        name: 'time',
        type: 'time',
        required: true,
      },
      {
        tag: 'input',
        label: t('coordinates.title'),
        name: 'coordinates',
        type: 'text',
        placeholder: '49.0476145113, 31.38737251941',
        title: t('coordinates.infoMessage'),
        pattern: regexPatterns.coordinates,
        required: true,
      },
      {
        tag: 'input',
        label: t('eventUrl.title'),
        name: 'eventUrl',
        type: 'url',
        placeholder: 'https://example.com',
        title: t('eventUrl.infoMessage'),
        pattern: 'https://.*',
        required: true,
      },
    ],

    eventType: {
      name: 'eventType',
      type: 'text',
      rows: '1',
      required: true,
    },
    eventTypePlaceholder: t('eventType.placeholder'),
    eventImage: {
      name: 'eventImage',
      type: 'file',
      accept: 'image/*',
    },
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto mb-[30px] max-w-[650px]">
        <div className="mx-auto mb-[35px] flex flex-wrap items-center justify-center gap-[15px] gap-x-[50px]">
          {inputsAttributes.firstGroup.map(
            ({ label, placeholder, name, tag, ...attr }) => {
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
                    placeholder={`${placeholder} ${t('language.uk')}`}
                    {...commonProps}
                  />
                  <FormElement
                    value={formDataEn[name]}
                    handleChange={handleChangeEn}
                    placeholder={`${placeholder} ${t('language.en')}`}
                    {...commonProps}
                  />
                </FieldWrapper>
              );
            }
          )}

          <FieldWrapper label={t('eventType.title')}>
            <AddEventType
              attributes={inputsAttributes.eventType}
              initialState={formDataUk.eventType || ''}
              errorMessage={errorMessageUk.eventType}
              setEventTypesSelected={setFormDataEventTypeUk}
              eventTypesSelected={formDataEventTypeUk}
              locale={LOCALE.uk.forRequest}
              eventTypePlaceholder={` ${
                inputsAttributes.eventTypePlaceholder
              } ${t('language.uk')}`}
            />
            <AddEventType
              attributes={inputsAttributes.eventType}
              errorMessage={errorMessageEn.eventType}
              initialState={formDataEn.eventType || ''}
              setEventTypesSelected={setFormDataEventTypeEn}
              eventTypesSelected={formDataEventTypeEn}
              locale={LOCALE.en.forRequest}
              eventTypePlaceholder={` ${
                inputsAttributes.eventTypePlaceholder
              } ${t('language.en')}`}
            />
          </FieldWrapper>
          <FieldWrapper label={t('inputImage.title')}>
            <ImageUpload
              attributes={inputsAttributes.eventImage}
              errorMessage={errorMessageUk.eventImage}
              imageName={formDataUk.eventImage || ''}
              imageTitle={formDataUk.eventTitle || ''}
              handleImageChange={setFormDataImageUk}
              formDataImage={formDataImageUk}
              lang={t('language.uk')}
            />
            <ImageUpload
              attributes={inputsAttributes.eventImage}
              errorMessage={errorMessageEn.eventImage}
              imageName={formDataEn.eventImage || ''}
              imageTitle={formDataEn.eventTitle || ''}
              handleImageChange={setFormDataImageEn}
              formDataImage={formDataImageEn}
              lang={t('language.en')}
            />
          </FieldWrapper>
          {inputsAttributes.secondGroup.map(
            ({ label, placeholder, name, tag, ...attr }) => (
              <FieldWrapper label={label} key={label}>
                <FormElement
                  value={formDataUk[name]}
                  name={name}
                  tag={tag}
                  placeholder={placeholder}
                  handleChange={e => {
                    handleChangeEn(e);
                    handleChangeUk(e);
                  }}
                  attributes={attr}
                />
              </FieldWrapper>
            )
          )}
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
    <div className="">
      <h3 className="mb-[10px] text-center text-[20px]">{label}</h3>
      <div className="flex flex-col gap-[10px] tablet:flex-row tablet:gap-[50px]">
        {children}
      </div>
    </div>
  );
};

const FormElement = ({
  handleChange,
  value,
  placeholder,
  name,
  attributes,
  tag,
}) => {
  const Tag = tag === 'input' ? 'input' : 'textarea';
  return (
    <Tag
      className="w-[300px] max-w-[300px] resize-none rounded-[5px] border-[1px] border-gray/50 bg-gray/0 px-[16px] py-[8px] dark:border-gray/20 dark:bg-gray/80"
      {...attributes}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};
