import * as yup from 'yup';
export function getValidationSchemaCreate() {
  return yup
    .object({
      ukTypeName: yup
        .string('Використовуйте літери українського алфавіту')
        .trim()
        .required('Заповніть, будь ласка, поле')
        .matches(
          /((?![эъ])[а-яіїє'])+$/i,
          'Використовуйте літери українського алфавіту'
        )
        .min(5, 'Назва типу події має бути не менше 5 літер')
        .max(55),

      enTypeName: yup
        .string('Використовуйте літери англійського алфавіту')
        .trim()
        .required('Заповніть, будь ласка, поле')
        .matches(/[a-z]+$/i, 'Використовуйте літери англійського алфавіту')
        .min(5, 'Назва типу події має бути не менше 5 літер')
        .max(55),
    })
    .required();
}

export function getValidationSchemaEdit(locale) {
  const ukSchema = yup
    .object({
      typeName: yup
        .string('Використовуйте літери українського алфавіту')
        .trim()
        .required('Заповніть, будь ласка, поле')
        .matches(
          /((?![эъ])[а-яіїє'])+$/i,
          'Використовуйте літери українського алфавіту'
        )
        .min(5, 'Назва типу події має бути не менше 5 літер')
        .max(55),
    })
    .required();
  const enSchema = yup
    .object({
      typeName: yup
        .string('Використовуйте літери англійського алфавіту')
        .trim()
        .required('Заповніть, будь ласка, поле')
        .matches(/[a-z]+$/i, 'Використовуйте літери англійського алфавіту')
        .min(5, 'Назва типу події має бути не менше 5 літер')
        .max(55),
    })
    .required();
  return locale === 'uk_UA' ? ukSchema : enSchema;
}
