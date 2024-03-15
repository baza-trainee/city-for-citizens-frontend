import * as Yup from 'yup';

const phoneRegExp = /^\+\d{1,12}$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^\S.*$/, 'Не може починатися з пробілу')
    .min(2, 'Мінімальна кількість символів 2')
    .max(55, 'Максимальна кількість символів 55')
    .required("Це поле є обов'язковим"),

  email: Yup.string()
    .matches(/^\S.*$/, 'Не може починатися з пробілу')
    .email('Введіть дійсну електронну адресу')
    .matches(
      /^[^@]+@[^.@]+\.[^.@]+$/,
      'Email повинен містити крапку перед доменом'
    )
    .max(55, 'Максимальна кількість символів 55')
    .required("Це поле є обов'язковим"),

  phone: Yup.string()
    .required('Введіть номер телефону')
    .test(
      'phone-validation',
      'Введіть номер телефону',
      function checkPhone(value) {
        if (!value.startsWith('+'))
          return this.createError({
            message: 'Номер телефону має починатися з +',
            path: this.path,
          });
        if (!value.startsWith('+380'))
          return this.createError({
            message: 'Номер має починатися з +380XXXXXXXXX',
            path: this.path,
          });
        if (!phoneRegExp.test(value))
          return this.createError({
            message: 'Введіть у форматі +380XXXXXXXXX',
            path: this.path,
          });
        if (value.length !== 13)
          return this.createError({
            message: 'Введіть у форматі +380XXXXXXXXX',
            path: this.path,
          });
        return true;
      }
    ),

  messenger: Yup.string()
    .optional()
    .matches(/^\S.*$/, 'Не може починатися з пробілу')
    .matches(
      /^(?:\s*|(?:(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me)\/([a-zA-Z0-9_]{5,32})|@?([a-zA-Z0-9_]{5,32})))$/,
      'Некоректний нікнейм або посилання Telegram'
    ),

  eventDescription: Yup.string()
    .matches(/^\S.*$/, 'Не може починатися з пробілу')
    .max(300, 'Опис події повинен містити не більше 300 символів')
    .required("Це поле є обов'язковим"),
});

export default validationSchema;
