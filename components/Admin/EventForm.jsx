'use client';

import { useHandleFormData, useHandleFormDataImage } from '@/hooks';

const EventForm = ({ buttonName, onSubmit }) => {
  const [formDataUk, handleChangeUk] = useHandleFormData('uk_UA');
  const [formDataEn, handleChangeEn] = useHandleFormData('en_US');
  const [formDataImageUk, handleImageChangeUk] = useHandleFormDataImage();
  const [formDataImageEn, handleImageChangeEn] = useHandleFormDataImage();

  return (
    <>
      <form className="mx-auto mb-[30px] flex w-[880px] flex-col   gap-[15px]">
        <div className="flex">
          <div className="flex flex-col">
            <label>
              <span>Event Name</span>
              <input
                name="eventTitle"
                value={formDataUk.eventTitle}
                onChange={handleChangeUk}
                type="text"
              />
              <input
                name="eventTitle"
                value={formDataEn.eventTitle}
                onChange={handleChangeEn}
                type="text"
              />
            </label>
            <label>
              <span>description</span>
              <textarea
                name="description"
                value={formDataUk.description}
                onChange={handleChangeUk}
              ></textarea>
              <textarea
                name="description"
                value={formDataEn.description}
                onChange={handleChangeEn}
              ></textarea>
            </label>
            <label>
              <span>notes</span>
              <input
                name="notes"
                value={formDataUk.notes}
                onChange={handleChangeUk}
                type="text"
              />
              <input
                name="notes"
                value={formDataEn.notes}
                onChange={handleChangeEn}
                type="text"
              />
            </label>

            <label>
              <span>eventType</span>
              <input
                name="eventType"
                value={formDataUk.eventType}
                onChange={handleChangeUk}
                type="text"
              />
              <input
                name="eventType"
                value={formDataEn.eventType}
                onChange={handleChangeEn}
                type="text"
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label>
              <span>eventImage</span>
              <input
                name="eventImage"
                onChange={handleImageChangeUk}
                type="file"
                accept="image/*"
              />
              <input
                name="eventImage"
                onChange={handleImageChangeEn}
                type="file"
                accept="image/*"
              />
            </label>
            <label>
              <span>eventUrl</span>
              <input
                name="eventUrl"
                value={formDataUk.eventUrl}
                onChange={e => {
                  handleChangeEn(e);
                  handleChangeUk(e);
                }}
                type="text"
              />
            </label>

            <div className="flex gap-[15px]">
              <label>
                <span>Date</span>
                <input
                  name="date"
                  value={formDataUk.date}
                  onChange={e => {
                    handleChangeEn(e);
                    handleChangeUk(e);
                  }}
                  type="date"
                />
              </label>
              <label>
                <span>Time</span>

                <input
                  name="time"
                  value={formDataUk.time}
                  onChange={e => {
                    handleChangeEn(e);
                    handleChangeUk(e);
                  }}
                  type="time"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label>
            <span>Місто / City</span>
            <input
              name="city"
              value={formDataUk.city}
              onChange={handleChangeUk}
              type="text"
            />
            <input
              name="city"
              value={formDataEn.city}
              onChange={handleChangeEn}
              type="text"
            />
          </label>
          <label>
            <span>Вулиця / Street</span>
            <input
              name="street"
              value={formDataUk.street}
              onChange={handleChangeUk}
              type="text"
            />
            <input
              name="street"
              value={formDataEn.street}
              onChange={handleChangeEn}
              type="text"
            />
          </label>

          <label>
            <span>Координати / Coordinates</span>
            <input
              name="coordinates"
              value={formDataUk.coordinates}
              onChange={e => {
                handleChangeEn(e);
                handleChangeUk(e);
              }}
              type="text"
            />
          </label>
        </div>
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
