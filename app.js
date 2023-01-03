const forms = document.forms;
const formArray = Array.from(forms);
const buttons = document.querySelectorAll("button[type=submit]");
const headerButton = document.querySelectorAll("header > button");
const navButtons = document.querySelectorAll(".nav-btn-cont button");
let currentForm;
let cValue;

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    let nextForm = button.closest("form").nextElementSibling;
    currentForm = nextForm;
    changeForm(nextForm);
  });
});

function changeHeaderStyle(value) {
  console.log("Called with: ", value);
  cValue = value;
  headerButton.forEach((button) => button.classList.remove("active"));
  headerButton[value].classList.add("active");
  if (value < 1) navButtons[0].style.display = "none";
  else navButtons[0].style.display = "block";
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
