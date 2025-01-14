const validateEmail = (email: string) => {
  return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validatePassowrd = (password: string) => {
  return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
}

const validateArray = (array: any) => {
  return typeof array !== "object" || !array.length;
}

const validateHelper = {
  validateEmail,
  validatePassowrd,
  validateArray
};
export default validateHelper;

