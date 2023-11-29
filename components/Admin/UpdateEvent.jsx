'use client';

import EventForm from './EventForm';

const UpdateEventForm = () => {
  return (
    <>
      <div className="container">
        <h1 className=" mb-[30px] text-center text-[34px]">Update event</h1>
        <EventForm onSubmit={() => {}} buttonName={'Update event'} />
      </div>
    </>
  );
};
export default UpdateEventForm;
