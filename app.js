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
console.log(idVerificationInputs);
let cValue = 0;

const personalInfo = {
  firstname: "",
  lastname: "",
  address: "",
  "date-of-birth": "",
  SSN: "",
  email: "",
  "phone-number": "",
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

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  for (let key in idVerification) {
    if (idVerification[key] === "") {
      alert("Please upload all image");
      return;
    }
  }
  console.log(idVerification);
});

submitPersonalInfoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  for (let key in personalInfo) {
    if (personalInfo[key] === "") {
      alert("Please fill all input field");
      return;
    }
  }
  console.log(personalInfo);
  changeHeaderStyle(1);
  newFunction(e.target);
});

submitIdentityIdBtn.addEventListener("click", function (e) {
  e.preventDefault();
  for (let key in identityID) {
    if (identityID[key] === "") {
      alert("Please fill all input field");
      return;
    }
  }
  console.log(identityID);
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
    reader.readAsDataURL(image);
    reader.onload = () => {
      img.src = reader.result;
      console.log(e.target.name);
      idVerification[e.target.name] = reader.result;
      parentImgArea.append(img);
    };
  });
});
