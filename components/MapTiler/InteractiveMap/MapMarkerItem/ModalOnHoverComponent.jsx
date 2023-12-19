import ModalOnHover from '../../../eventCard/ModalOnHover';

export const ModalOnHoverComponent = ({ styleObject, event }) => (
  <div
    style={{
      transform:
        styleObject.transform + 'translateY(-50%)' + 'translateY(-30px)',
    }}
    className="absolute z-10"
  >
    <ModalOnHover event={event} />
  </div>
);
