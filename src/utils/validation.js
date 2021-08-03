/* eslint-disable */
export const validateEmailId = (emailId) => {
  return emailId.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateDigits = (digits) => {
  if (digits.length !== 10) return false;

  return digits.match(/^\d{1,}(\.?\d{0,2})$/);
};
