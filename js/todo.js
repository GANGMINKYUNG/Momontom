const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

//ToDo내용들 빈 Array로 생성하기.
let toDos = [];

//ToDo목록 삭제 함수.
function deleteToDo(event) {
  //이벤트가 일어날 곳.
  const btn = event.target;
  //li가 btn의 부모라는겋 알려줌
  const li = btn.parentNode;
  //버튼 클릭시 toDoList에서 li가 삭제되도록!
  toDoList.removeChild(li);

  //filter: forEach를 실행하는 것 같이 각각의 item과 같이 실행된다.
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//toDo값들 저장.
function saveToDos() {
  //LocalStorage는 String으로 값을 저장하기 때문에
  //Odject를 String으로 형변환해야한다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//화면에 입력받은 내용을 리스트로 보여주는 함수.
//왜 이렇게 만드냐? LocalStorage에 저장하기 위해서!
function paintToDo(text) {
  //li, 삭제 버튼, 리스트 내용, ID생성
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1; //배열의 인덱스에 +1 한 걸 ID로 사용.

  //삭제 버튼, 리스트 내용의 값 삽입.
  delBtn.innerText = "✘󠁘󠁘";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;

  //내용, 삭제버튼, ID를 li에 삽입.
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;

  //위의 내용을 toDoList-ul에 삽입 생성
  toDoList.appendChild(li);

  //해야할 일 생성할 때마다 'toDos'라는 Array에 추가되도록 한다.
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos(); //꼭 push후에 savetoDos()작성해야함.
}

//Input창에서 엔터쳤을때 상황
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  //엔터 누를 시 toDo생성하고 그 내용 삭제해주는 역할.(like submit)
  toDoInput.value = "";
}

//로컬스토리지에서 Todo목록을 가져오는 함수.
function loadToDo() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //toDoList를 가져옴.
    //JSON : JavaScript Object Notation.
    //String으로 저장된 loadedToDos를 다시 Object로 변환!
    const parsedToDos = JSON.parse(loadedToDos);

    //
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  } else {
    //아무것도 하지 않음.
  }
}

//초기화
function init() {
  loadToDo();
  //todo생성
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
