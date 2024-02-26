import * as yup from 'yup';
export function getValidationSchema() {
  return yup
    .object({
      name: yup
        .string('')
        .trim()
        .required('Заповніть, будь ласка, поле')
        .min(5, 'Назва типу події має бути не менше 5 літер')
        .max(55, 'Назва типу події має бути не більше 55 літер'),

      link: yup
        .string('')
        .url('Посилання має бути типу http://partner.ua')
        .nullable(),
    })
    .required();
}
