const forms = document.forms;
const formArray = Array.from(forms);
const buttons = document.querySelectorAll("button[type=submit]");
const headerButton = document.querySelectorAll("header > button");
const navButtons = document.querySelectorAll(".nav-btn-cont button");
const fileInputs = document.querySelectorAll(".file-upload-container input");
const uploadButtons = document.querySelectorAll(
  ".file-upload-container button"
);
let currentForm;
let cValue = 0;

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    let nextForm = button.closest("form").nextElementSibling;
    currentForm = nextForm;
    changeForm(nextForm);
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
    reader.onload = (e) => {
      img.src = reader.result;
      parentImgArea.append(img);
    };
  });
});
