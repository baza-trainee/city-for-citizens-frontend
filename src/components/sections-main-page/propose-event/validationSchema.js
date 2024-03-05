import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Це поле є обов'язковим"),

  email: Yup.string()
    .email('Введіть дійсну електронну адресу')
    .required("Це поле є обов'язковим"),

  phone: Yup.string()
    .matches(/^\+?3?8?(0\d{9})$/, 'Введіть дійсний номер телефону')
    .required("Це поле є обов'язковим"),

  messenger: Yup.string().required("Це поле є обов'язковим"),

  eventDescription: Yup.string()
    .max(300, 'Опис події повинен містити не більше 300 символів')
    .required("Це поле є обов'язковим"),
});

export default validationSchema;
