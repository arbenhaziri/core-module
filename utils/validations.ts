export const getRegExp = (type) => {
  let regex = null;
  switch (type) {
    case "email":
      regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
      break;
    case "password":
      regex = /[\S]{4,}/;
      break;
    default:
      break;
  }
  return regex;
};

export const getSentenceFromCamelCase = (message) => {
  let pattern = /[A-Za-z]/g;
  let messages = message.match(pattern);
  let errorMessage = "";
  for (let i = 0; i < messages.length; i++) {
    errorMessage += messages[i] === messages[i].toUpperCase() ? " " + messages[i].toLowerCase() : messages[i];
  }
  return errorMessage.trim();
};
