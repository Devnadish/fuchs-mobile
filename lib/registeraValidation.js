export const registerValidation = (email, mobil, password, name) => {
  // validation email
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim().replace(/^\s+|\s+$/gm, ''); // remove leading and trailing whitespace
  const isEmailValid = mailRegex.test(trimmedEmail);
  if (!isEmailValid) {
    return { message: 'Enter Valid Email', type: 'error' }; // Removed || false
  }

  // validation mobile
  const mobileRegex = /^(05)([0-9]{8})$/; // start with 05 and 10 digits
  const isPhoneValid = mobileRegex.test(mobil);
  if (!isPhoneValid) {
    return { message: 'Enter Valid Phone', type: 'error' }; // Removed || false
  }

  // validation password
  const passwordRegex = /^(?=.*\d).{4,8}$/;
  const isPasswordValid = passwordRegex.test(password);
  if (!isPasswordValid) {
    return { message: 'Enter Valid Password', type: 'error' }; // Removed || false
  }

  // validation name
  if (name.length < 5) {
    return { message: 'Name must be at least 5 characters', type: 'error' }; // Removed || false
  }

  if (mobil.length < 10) {
    return { message: 'Phone must be at least 10 digits', type: 'error' }; // Removed || false
  }

  // If all validations pass, return null or a success message
  return null; // Indicate that validation passed
};
