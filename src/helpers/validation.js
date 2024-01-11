export const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password, t) => {
  const hasMinimumLength = password.length >= 8;
  const hasLettersAndDigits = /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(password);

  if (!hasMinimumLength) {
    return t('errorLength');
  }

  if (!hasLettersAndDigits) {
    return t('errorLettersDigits');
  }

  return true;
};

export const validateInput = (name, value, setErrors, t) => {
  if (name === 'email') {
    validateEmail(value, setErrors, t);
  } else if (name === 'password') {
    validatePassword(value, setErrors, t);
  }
};

export const validateEmail = (email, setErrors, t) => {
  if (!isValidEmail(email) && email.trim() !== '') {
    setErrors(prev => ({ ...prev, email: t('errorEmail') }));
  } else {
    setErrors(prev => ({ ...prev, email: '' }));
  }
};

export const validatePassword = (password, setErrors, t) => {
  const passwordValidationResult = isValidPassword(password, t);

  if (passwordValidationResult !== true && password.trim() !== '') {
    setErrors(prev => ({ ...prev, password: passwordValidationResult }));
  } else {
    setErrors(prev => ({ ...prev, password: '' }));
  }
};
