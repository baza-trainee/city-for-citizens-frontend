'use client';

import { useHandleFormData, useHandleFormDataImage } from '@/hooks';

const EventForm = ({ buttonName, onSubmit, eventUk, eventEn }) => {
  const [formDataUk, handleChangeUk] = useHandleFormData('uk_UA', eventUk);
  const [formDataEn, handleChangeEn] = useHandleFormData('en_US', eventEn);
  const [formDataImageUk, handleImageChangeUk] = useHandleFormDataImage();

  const [formDataImageEn, handleImageChangeEn] = useHandleFormDataImage();

  const formInputs = [
    {
      label: 'Event Name',
      name: 'eventTitle',
      type: 'text',
      isDouble: true,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'textarea',
      isDouble: true,
    },
    {
      label: 'Notes',
      name: 'notes',
      type: 'textarea',
      isDouble: true,
    },
    {
      label: 'Event Type',
      name: 'eventType',
      type: 'text',
      isDouble: true,
    },
    {
      label: 'Event Image',
      name: 'eventImage',
      type: 'file',
      isDouble: true,
    },
    {
      label: 'Місто',
      name: 'city',
      type: 'text',
      isDouble: true,
    },
    {
      label: 'Вулиця',
      name: 'street',
      type: 'text',
      isDouble: true,
    },
    {
      label: 'Координати',
      name: 'coordinates',
      type: 'text',
      isDouble: false,
    },
    {
      label: 'Event Url',
      name: 'eventUrl',
      type: 'text',
      isDouble: false,
    },
    {
      label: 'Date',
      name: 'date',
      type: 'date',
      isDouble: false,
    },
    {
      label: 'Time',
      name: 'time',
      type: 'time',
      isDouble: false,
    },
  ];

  return (
    <>
      <form className="mx-auto mb-[30px] flex w-[650px] flex-wrap  gap-[15px] gap-x-[50px]">
        {formInputs.map(({ label, name, type, isDouble }) => {
          if (type === 'file') {
            return (
              <label className="" key={label + name}>
                <span>{label}</span>
                <div className="flex gap-[50px]">
                  <input
                    name={name}
                    onChange={handleImageChangeUk}
                    type={type}
                    accept="image/*"
                  />
                  <input
                    name={name}
                    onChange={handleImageChangeEn}
                    type={type}
                    accept="image/*"
                  />
                </div>
              </label>
            );
          }
          if (type === 'textarea') {
            return (
              <label className="" key={label + name}>
                <span>{label}</span>
                <div className="flex gap-[50px]">
                  <textarea
                    className="w-[300px]"
                    name={name}
                    rows="5"
                    onChange={handleImageChangeUk}
                    value={formDataUk[name]}
                    placeholder="Enter your message here..."
                  ></textarea>
                  <textarea
                    className="w-[300px]"
                    name={name}
                    rows="5"
                    onChange={handleImageChangeEn}
                    value={formDataEn[name]}
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>
              </label>
            );
          }
          if (isDouble) {
            return (
              <label className="" key={label + name}>
                <span>{label}</span>
                <div className="flex gap-[50px]">
                  <input
                    className="w-[300px]"
                    name={name}
                    value={formDataUk[name]}
                    onChange={handleChangeUk}
                    type={type}
                  />
                  <input
                    className="w-[300px]"
                    name={name}
                    value={formDataEn[name]}
                    onChange={handleChangeEn}
                    type={type}
                  />
                </div>
              </label>
            );
          }
          if (!isDouble) {
            return (
              <label className="w-[300px]" key={label + name}>
                <span className="block">{label}</span>
                <input
                  className="min-w-[300px]"
                  name={name}
                  value={formDataUk[name]}
                  onChange={e => {
                    handleChangeEn(e);
                    handleChangeUk(e);
                  }}
                  type={type}
                />
              </label>
            );
          }
        })}
      </form>
      <button
        className="mx-auto my-0 block rounded-[10px] bg-primary/80 px-[40px] py-[10px]"
        onClick={() =>
          onSubmit(formDataUk, formDataEn, formDataImageUk, formDataImageEn)
        }
      >
        {buttonName}
      </button>
    </>
  );
};
export default EventForm;
