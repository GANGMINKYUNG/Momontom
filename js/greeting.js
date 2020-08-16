//querySelector : 찾는 첫번째 것을 가져옴
//querySelectorAll : 모든 것들을 가져온다.
//local storage : 작은 JS 정보를 유저 컴퓨터에 저장하는 방법.
const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

//입력한 이름 저장.
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  //기본 event 동작을 막는다.
  event.preventDefault();
  //입력한 값을 가져온다.
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

//유저 있는지 물어보는
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

//유저가 있을 시, 이름에 색을 준다.
function paintGreeting(text) {
  //색을 칠할거기때문에 form을 없앤다.
  form.classList.remove(SHOWING_CN); //form 지움
  greeting.classList.add(SHOWING_CN); //greeting 보여줌.
  greeting.innerText = `Hello, ${text}`;
}

//local storage의 정보 가져온다.
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    //Local Storage에 유저가 없을 때!
    askForName();
  } else {
    //Local Storage에 유저가 있을 때!
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
