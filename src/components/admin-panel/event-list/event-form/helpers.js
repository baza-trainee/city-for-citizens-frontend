import { formatTime } from '@/helpers/formatDate';
import * as yup from 'yup';

import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'Заповніть, будь ласка, поле',
  },

  string: {
    min: 'Введіть мінімум ${min} символів.',
    max: 'Максимально ${max} символів.',
  },
});

import dateIcon from '@/assets/icons/common/date-icon.svg';
import timeIcon from '@/assets/icons/common/time-icon.svg';

export function isValidFileType(fileName, validFile) {
  return fileName && validFile.indexOf(fileName.split('.').pop()) > -1;
}
export const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg'];
export const MAX_FILE_SIZE = 409600;

export function getValidationScheme() {
  const schemeToTwoLocale = {
    eventTitle: yup.string().required().min(5).max(40),
    city: yup.string().required().min(2).max(40),
    street: yup.string().required().min(2).max(40),
    description: yup.string().required().min(2).max(180),
    notes: yup.string().max(180).notRequired(),
    eventType: yup.string().required(),
    eventImageName: yup.string(),
    eventImage: yup.mixed().when('eventImageName', {
      is: value => {
        const result = /^event\d{10,20}\.jpg$/.test(value);
        return result;
      },
      then: schema => {
        return schema
          .test('is-valid-type', 'is-valid-type', ([value]) => {
            if (value?.length === 0 || !value) {
              return true;
            }
            return isValidFileType(
              value.name && value.name.toLowerCase(),
              validFileExtensions
            );
          })
          .test('is-valid-size', 'is-valid-size', ([value]) => {
            if (value?.length === 0 || !value) {
              return true;
            }
            return value?.size && value.size <= MAX_FILE_SIZE;
          });
      },
      otherwise: schema =>
        schema
          .test('is-file', 'is-file', ([value]) => Boolean(value))
          .test('is-valid-type', 'is-valid-type', ([value]) => {
            return isValidFileType(
              value?.name && value.name.toLowerCase(),
              validFileExtensions
            );
          })
          .test(
            'is-valid-size',
            'is-valid-size',

            ([value]) => value?.size && value.size <= MAX_FILE_SIZE
          ),
    }),
  };
  //formatTime
  const commonScheme = {
    date: yup
      .string()
      .required()
      .matches(
        /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        'Невірний формат дати (очікується: YYYY-MM-DD)'
      )
      .test('is-future-date', 'is-future-date', function (value) {
        const currentDate = new Date().setHours(0, 0, 0, 0);
        const enteredDate = new Date(value);
        return enteredDate > currentDate;
      }),

    time: yup
      .string()
      .required()
      .transform(value => formatTime(value)),
    coordinates: yup
      .string()
      .required()
      .matches(
        /^(\+|-)?((\d((\.)|\.\d{1,20})?)|(0*?[0-8]\d((\.)|\.\d{1,20})?)|(0*?4?[1-9]|0)((\.)|\.0{1,20})?),\s*(\+|-)?((\d((\.)|\.\d{1,20})?)|(0*?\d\d((\.)|\.\d{1,20})?)|(0*?1[0-7]\d((\.)|\.\d{1,20})?)|(0*?1[0-7][0-9]|[1-8]\d|90)((\.)|\.0{1,20})?)$/,
        {
          message:
            "Координати мають бути у такому форматі: '-12.3456789, +112.3456789', '45.123456, 87.654321', '0.0, 0.0' (можна скористатися онлайн картами, наприклад 'Google Maps')",
        }
      ),
    eventUrl: yup
      .string()

      .required(),
  };

  const globalSchema = yup
    .object({
      firstLocale: yup.object(schemeToTwoLocale),
      secundLocale: yup.object(schemeToTwoLocale),
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
      rows: 1,
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
