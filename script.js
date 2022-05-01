const isRequredSuffix = "は必ず入力してください。";
const isInvalidEmailSuffix = "が正しくありません。";
const isInvalidTextLengthSuffix = "の文字数が正しくありません。";
const isNotMatchedPasswordsSuffix = "が確認用パスワードと一致しません。";

const form = document.getElementById("form");

const fields = [
  {
    label: document.querySelector('label[for="username"]'),
    input: document.getElementById("username"),
  },
  {
    label: document.querySelector('label[for="email"]'),
    input: document.getElementById("email"),
  },
  {
    label: document.querySelector('label[for="password"]'),
    input: document.getElementById("password"),
  },
  {
    label: document.querySelector('label[for="password-confirm"]'),
    input: document.getElementById("password-confirm"),
  },
];

function showInputFeedback(isError, input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  if (isError === true) {
    formControl.classList.remove("success");
    formControl.classList.add("error");
    small.innerText = message;
  } else {
    formControl.classList.remove("error");
    formControl.classList.add("success");
  }
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.trim().toLowerCase());
}

function isValidLength(inputText, minLength, maxLength) {
  return minLength <= inputText.trim().length && inputText.trim().length <= maxLength;
}

function isMatchedPasswords(password1, password2) {
  return password1.trim() === password2.trim();
}

function validateInput(field) {
  const fieldLabel = field.label.innerText;
  const fieldId = field.input.id;
  let isError = false;
  let feedBackMessage = "";

  if (!isError && field.input.value === "") {
    isError = true;
    feedBackMessage += `${fieldLabel} ${isRequredSuffix}`;
  }

  if (!isError && ["email"].includes(fieldId)) {
    if (!isValidEmail(field.input.value)) {
      isError = true;
      feedBackMessage += `${fieldLabel} ${isInvalidEmailSuffix}`;
    }
  }

  if (!isError && ["username", "password"].includes(fieldId)) {
    let minLegnth, maxLength;

    if (fieldId === "username") {
      minLegnth = 3;
      maxLength = 15;
    } else if (fieldId === "password") {
      minLegnth = 6;
      maxLength = 25;
    }

    if (!isValidLength(field.input.value, minLegnth, maxLength)) {
      isError = true;
      feedBackMessage += `${fieldLabel} ${isInvalidTextLengthSuffix}`;
    }
  }

  if (!isError && ["password"].includes(fieldId)) {
    const passwordConfirm = fields.filter((field) => {
      return field.input.id === "password-confirm";
    });

    if (!isMatchedPasswords(field.input.value, passwordConfirm[0].input.value)) {
      isError = true;
      feedBackMessage += `${fieldLabel} ${isNotMatchedPasswordsSuffix}`;
    }
    
  }

  return [isError, feedBackMessage];
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let validationResults = [];
  let isError = false;

  fields.forEach((field) => {
    const [isError, feedBackMessage] = validateInput(field);
    showInputFeedback(isError, field.input, feedBackMessage);
    validationResults.push(isError);
  });

  isError = validationResults.reduce((prev, current) => prev || current);

  if (!isError) {
    alert("登録しました！");
  }
});
