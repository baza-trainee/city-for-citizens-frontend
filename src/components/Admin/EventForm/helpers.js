import { formatTime } from '@/helpers/formatDate';
import * as yup from 'yup';

export function isValidFileType(fileName, validFile) {
  return fileName && validFile.indexOf(fileName.split('.').pop()) > -1;
}
export const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg'];
export const MAX_FILE_SIZE = 2048000;
export function getValidationScheme(t) {
  const schemeToTwoLocale = {
    eventTitle: yup
      .string()
      .required(t('requiredMessage'))
      .min(5, t('eventTitle.infoMessage'))
      .max(40),
    city: yup.string().required(t('requiredMessage')),
    street: yup.string().required(t('requiredMessage')),
    description: yup.string().required(t('requiredMessage')),
    notes: yup.string().required(t('requiredMessage')),
    eventType: yup.string().required(t('requiredMessage')),
    eventImageName: yup.string(),
    eventImage: yup.mixed().when('eventImageName', {
      is: value => {
        const result = /^event\d{10,20}\.jpg$/.test(value);
        return result;
      },
      then: schema => {
        return schema
          .test('is-valid-type', t('inputImage.isValidType'), ([value]) => {
            if (value?.length === 0 || !value) {
              return true;
            }
            return isValidFileType(
              value.name && value.name.toLowerCase(),
              validFileExtensions
            );
          })
          .test('is-valid-size', t('inputImage.isValidSize'), ([value]) => {
            if (value?.length === 0 || !value) {
              return true;
            }
            return value?.size && value.size <= MAX_FILE_SIZE;
          });
      },
      otherwise: schema =>
        schema
          .test('is-file', t('inputImage.infoMessage'), ([value]) =>
            Boolean(value)
          )
          .test('is-valid-type', t('inputImage.isValidType'), ([value]) => {
            return isValidFileType(
              value?.name && value.name.toLowerCase(),
              validFileExtensions
            );
          })
          .test(
            'is-valid-size',
            t('inputImage.isValidSize'),
            ([value]) => value?.size && value.size <= MAX_FILE_SIZE
          ),
    }),
  };
  //formatTime
  const commonScheme = {
    date: yup
      .string()
      .required(t('requiredMessage'))
      .matches(
        /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        'Невірний формат дати (очікується: YYYY-MM-DD)'
      )
      .test('is-future-date', t('date.infoMessage'), function (value) {
        const currentDate = new Date().setHours(0, 0, 0, 0);
        const enteredDate = new Date(value);
        return enteredDate > currentDate;
      }),

    time: yup
      .string()
      .required(t('requiredMessage'))
      .transform(value => formatTime(value)),
    coordinates: yup
      .string()
      .required(t('requiredMessage'))
      .matches(
        /^(\+|-)?((\d((\.)|\.\d{1,20})?)|(0*?[0-8]\d((\.)|\.\d{1,20})?)|(0*?4?[1-9]|0)((\.)|\.0{1,20})?),\s*(\+|-)?((\d((\.)|\.\d{1,20})?)|(0*?\d\d((\.)|\.\d{1,20})?)|(0*?1[0-7]\d((\.)|\.\d{1,20})?)|(0*?1[0-7][0-9]|[1-8]\d|90)((\.)|\.0{1,20})?)$/,
        {
          message: t('coordinates.infoMessage'),
        }
      ),
    eventUrl: yup
      .string()
      .url(t('eventUrl.infoMessage'))
      .required(t('requiredMessage')),
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
