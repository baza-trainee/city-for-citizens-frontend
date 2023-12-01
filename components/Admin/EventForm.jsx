'use client';

import { useHandleFormData, useHandleFormDataImage } from '@/hooks';

const EventForm = ({ buttonName, onSubmit, eventUk, eventEn }) => {
  const [formDataUk, handleChangeUk] = useHandleFormData('uk_UA', eventUk);
  const [formDataEn, handleChangeEn] = useHandleFormData('en_US', eventEn);
  const [formDataImageUk, handleImageChangeUk] = useHandleFormDataImage();

  const [formDataImageEn, handleImageChangeEn] = useHandleFormDataImage();

  const formInputs = [
    {
      label: 'Назва Події / Event name',
      isDouble: true,
      attributes: {
        required: true,
        name: 'eventTitle',
        type: 'text',
      },
    },
    {
      label: 'Опис / Description',
      isDouble: true,
      type: 'textarea',
      attributes: {
        required: true,
        placeholder: 'Enter your message here...',
        type: 'text',
        name: 'description',
        rows: '5',
      },
    },
    {
      label: 'Примітки / Notes',
      isDouble: true,
      type: 'textarea',
      attributes: {
        required: true,
        placeholder: 'Enter your message here...',
        type: 'text',
        name: 'notes',
        rows: '5',
      },
    },
    {
      label: 'Тип події / Event type',
      isDouble: true,
      attributes: {
        required: true,
        name: 'eventType',
        type: 'text',
      },
    },
    {
      label: 'Зображення події / Event image',
      isDouble: true,
      attributes: {
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
        name: 'city',
      },
    },
    {
      label: 'Вулиця / Street',
      isDouble: true,
      attributes: {
        required: true,
        name: 'street',
        type: 'text',
      },
    },
    {
      label: 'Координати / Coordinates',

      isDouble: false,
      attributes: {
        required: true,
        name: 'coordinates',
        type: 'text',
      },
    },
    {
      label: 'URL-адреса події/ Event Url',

      isDouble: false,
      attributes: {
        required: true,
        name: 'eventUrl',
        type: 'text',
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
  ];

  return (
    <>
      <div className="mb-[30px] flex justify-center gap-[70px] text-[26px]">
        <p>Деталі події українською</p>
        <p>Деталі події англійською</p>
      </div>
      <form
        onSubmit={e =>
          onSubmit(e, formDataUk, formDataEn, formDataImageUk, formDataImageEn)
        }
        className="mx-auto mb-[30px] flex w-[650px] flex-wrap  gap-[15px] gap-x-[50px]"
      >
        {formInputs.map(({ label, type, isDouble, attributes }) => {
          if (attributes.type === 'file') {
            return (
              <label key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <div className="flex gap-[50px]">
                  <input {...attributes} onChange={handleImageChangeUk} />
                  <input {...attributes} onChange={handleImageChangeEn} />
                </div>
              </label>
            );
          }
          if (type === 'textarea') {
            return (
              <label key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <div className="flex gap-[50px]">
                  <textarea
                    {...attributes}
                    className="w-[300px]"
                    onChange={handleChangeUk}
                    value={formDataUk[attributes.name]}
                  ></textarea>
                  <textarea
                    {...attributes}
                    className="w-[300px]"
                    onChange={handleChangeEn}
                    value={formDataEn[attributes.name]}
                  ></textarea>
                </div>
              </label>
            );
          }
          if (isDouble) {
            return (
              <label className="" key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <div className="flex gap-[50px]">
                  <input
                    {...attributes}
                    className="w-[300px]"
                    value={formDataUk[attributes.name]}
                    onChange={handleChangeUk}
                  />
                  <input
                    {...attributes}
                    className="w-[300px]"
                    value={formDataEn[attributes.name]}
                    onChange={handleChangeEn}
                  />
                </div>
              </label>
            );
          }
          if (!isDouble) {
            return (
              <label className="w-[300px]" key={label + attributes.name}>
                <span className="mb-[10px] block text-center text-[20px]">
                  {label}
                </span>
                <input
                  {...attributes}
                  className="min-w-[300px]"
                  value={formDataUk[attributes.name]}
                  onChange={e => {
                    handleChangeEn(e);
                    handleChangeUk(e);
                  }}
                />
              </label>
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
