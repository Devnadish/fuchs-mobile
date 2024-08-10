export const regesiterValidation = (email, mobil, password, name) => {
  // validation email
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim().replace(/^\s+|\s+$/gm, ""); // remove leading and trailing whitespace
  const isEmailValid = new RegExp(mailRegex).test(trimmedEmail);
  if (!isEmailValid) {
    return { message: "Enter Valid Email", type: "error" } || false;
  }

  // validation mobile
  const mobileRegex = /^(05)([0-9]{8})$/; // start with 05 and 10 digits
  const isPhoneValid = new RegExp(mobileRegex).test(mobil);
  if (!isPhoneValid) {
    return { message: "Enter Valid Phone", type: "error" } || false;
  }

  // validation password
  const passwordRegex = /^(?=.*\d).{4,8}$/;
  const isPasswordValid = new RegExp(passwordRegex).test(password);
  if (!isPasswordValid) {
    return { message: "Enter Valid Password", type: "error" } || false;
  }

  // validation name
  if (name.length < 5) {
    return (
      { message: "Name must be at least 5 characters", type: "error" } || false
    );
  }
  if (mobil.length < 10) {
    return (
      { message: "Phone  must be at least 10 digit", type: "error" } || false
    );
  }
};
