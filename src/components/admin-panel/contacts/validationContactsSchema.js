import * as Yup from 'yup';

const phoneRegExp = /^\+\d{1,12}$/;
export const validationContactsSchema = Yup.object().shape({
  firstPhone: Yup.string()
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
            message: 'Номер телефону має починатися з +380XXXXXXXXX',
            path: this.path,
          });
        if (!phoneRegExp.test(value))
          return this.createError({
            message: 'Введіть коректний номер телефону у форматі +380XXXXXXXXX',
            path: this.path,
          });
        if (value.length !== 13)
          return this.createError({
            message: 'Введіть коректний номер телефону у форматі +380XXXXXXXXX',
            path: this.path,
          });
        return true;
      }
    ),
  secondPhone: Yup.string()
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
            message: 'Номер телефону має починатися з +380XXXXXXXXX',
            path: this.path,
          });
        if (!phoneRegExp.test(value))
          return this.createError({
            message: 'Введіть коректний номер телефону у форматі +380XXXXXXXXX',
            path: this.path,
          });
        if (value.length !== 13)
          return this.createError({
            message: 'Введіть коректний номер телефону у форматі +380XXXXXXXXX',
            path: this.path,
          });
        return true;
      }
    ),
  email: Yup.string().email('Некоректний email').required('Введіть e-mail'),
});
