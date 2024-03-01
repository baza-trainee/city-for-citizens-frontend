import * as yup from 'yup';
export function getValidationSchema() {
  return yup
    .object({
      name: yup
        .string('')
        .trim()
        .required('Заповніть, будь ласка, поле')
        .min(2, 'Введіть мінімум 2 символа')
        .max(55, 'Назва партнера має бути не більше 55 символів'),

      link: yup
        .string('')
        .url('Посилання має бути типу http://partner.ua')
        .nullable(),
      image: yup
        .mixed()
        .test('is-file', 'Завантажте, будь ласка, зображення', value => {
          return Boolean(value);
        }),
    })
    .required();
}
