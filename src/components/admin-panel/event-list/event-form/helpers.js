import * as yup from 'yup';
import { setLocale } from 'yup';
import { formatTime } from '@/helpers/formatDate';
import dateIcon from '@/assets/icons/common/date-icon.svg';
import timeIcon from '@/assets/icons/common/time-icon.svg';

export const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg'];
export const MAX_FILE_SIZE = 409600;

setLocale({
  mixed: {
    required: 'Заповніть, будь ласка, поле',
  },

  string: {
    min: 'Введіть мінімум ${min} символів.',
    max: 'Максимально ${max} символів.',
  },
});

export function getValidationScheme() {
  const schemeToTwoLocale = {
    eventTitle: yup.string().trim().required().min(5).max(55),
    city: yup.string().trim().required().min(2).max(40),
    street: yup.string().trim().required().min(2).max(40),
    description: yup.string().trim().required().min(15).max(1300),
    notes: yup.string().trim().max(180).notRequired(),
    eventTypeId: yup.string().required(),
    eventImage: yup
      .mixed()
      .test('is-file', 'Завантажте, будь ласка, зображення', value => {
        return Boolean(value);
      }),
  };

  const commonScheme = {
    date: yup
      .string()
      .required()
      .matches(
        /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        'Невірний формат дати (очікується: YYYY-MM-DD)'
      )
      .test(
        'is-future-date',
        'Дата не може бути в минулому.',
        function (value) {
          const currentDate = new Date().setHours(0, 0, 0, 0);
          const enteredDate = new Date(value);
          return enteredDate > currentDate;
        }
      ),

    time: yup
      .string()
      .required()
      .transform(value => {
        if (!value) return null;

        return formatTime(value);
      }),

    coordinates: yup
      .string()
      .trim()
      .required()
      .matches(
        /^(\+|-)?((\d((\.)|\.\d{1,20})?)|(0*?[0-8]\d((\.)|\.\d{1,20})?)|(0*?4?[1-9]|0)((\.)|\.0{1,20})?),\s*(\+|-)?((\d((\.)|\.\d{1,20})?)|(0*?\d\d((\.)|\.\d{1,20})?)|(0*?1[0-7]\d((\.)|\.\d{1,20})?)|(0*?1[0-7][0-9]|[1-8]\d|90)((\.)|\.0{1,20})?)$/,
        {
          message:
            "Координати мають бути у такому форматі: '-12.3456789, +112.3456789', '45.123456, 87.654321', '0.0, 0.0' (можна скористатися онлайн картами, наприклад 'Google Maps')",
        }
      ),
  };

  const globalSchema = yup
    .object({
      firstLocale: yup.object(schemeToTwoLocale),
      secondLocale: yup.object(schemeToTwoLocale),
      common: yup.object(commonScheme),
    })
    .required();

  return globalSchema;
}

export const inputsSettings = {
  firstGroup: [
    {
      tag: 'input',
      inputLabel: 'Назва події',
      inputName: 'eventTitle',
      type: 'text',
      placeholder: 'Введіть назву',
    },
    {
      tag: 'input',
      inputLabel: 'Місто',
      inputName: 'city',
      type: 'text',
      placeholder: 'Вкажіть місто',
    },
    {
      tag: 'input',
      inputLabel: 'Вулиця',
      inputName: 'street',
      type: 'text',
      placeholder: 'Вкажіть вулицю',
    },
    {
      tag: 'textarea',
      inputLabel: 'Примітки',
      inputName: 'notes',
      type: 'text',
      rows: 2,
      placeholder: 'Опишіть детально про місце',
    },
    {
      tag: 'textarea',
      inputLabel: 'Опис',
      inputName: 'description',
      type: 'text',
      rows: 8,
      placeholder: 'Додайте опис',
    },
  ],
  secondGroup: [
    {
      tag: 'input',
      inputLabel: 'Вкажіть дату',
      inputName: 'date',
      type: 'date',
      customIcon: dateIcon,
    },
    {
      tag: 'input',
      inputLabel: 'Вкажіть час',
      inputName: 'time',
      type: 'time',
      customIcon: timeIcon,
    },
    {
      tag: 'input',
      inputLabel: 'Координати події',
      inputName: 'coordinates',
      type: 'text',
      placeholder: '45.123456, 87.654321',
    },
  ],
};
