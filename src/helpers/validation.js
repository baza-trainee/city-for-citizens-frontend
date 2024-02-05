export const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = password => {
  const hasLength = password.length >= 8 && password.length <= 32;
  const hasLettersAndDigits = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(
    password
  );

  if (!hasLength) {
    return 'Пароль повинен містити від 8 до 32 символів';
  }

  if (!hasLettersAndDigits) {
    return 'Пароль має містити цифру, маленьку і велику літери.';
  }

  return true;
};

export const validateInput = (name, value, setErrors) => {
  if (name === 'email') {
    validateEmail(value, setErrors);
  } else if (name === 'password') {
    validatePassword(value, name, setErrors);
  } else if (name === 'password1') {
    validatePassword(value, name, setErrors);
  } else if (name === 'password2') {
    validatePassword(value, name, setErrors);
  }
};

export const validateEmail = (email, setErrors) => {
  if (!email.trim()) {
    setErrors(prev => ({ ...prev, email: "Це поле обов'язкове" }));
  } else if (!isValidEmail(email)) {
    setErrors(prev => ({ ...prev, email: 'Введено невірну адресу ел. пошти' }));
  } else {
    setErrors(prev => ({ ...prev, email: '' }));
  }
};

export const validatePassword = (password, name, setErrors) => {
  if (password.trim() === '') {
    setErrors(prev => ({ ...prev, [name]: "Це поле обов'язкове" }));
  } else {
    const passwordValidationResult = isValidPassword(password);

    if (passwordValidationResult !== true) {
      setErrors(prev => ({ ...prev, [name]: passwordValidationResult }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }
};
