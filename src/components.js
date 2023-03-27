//컴포넌트
import { isGameEnded, generateGameMessage } from "./util";
import { calculateImageSize } from "./image-util";
import { h, id } from "./dom";

//Hangman Component
export const HangmanImage = (chancesLeft, images) => {
  const container = id("hangman-image"); //id="#hangman-image" 영역에 추가
  const context = container.getContext("2d");
  context.clearRect(0, 0, container.width, container.height);

  //결국 끝에서 부터 하나씩 출력된다
  images.slice(chancesLeft).map((item, idx) => {
    //canvas의 drawImage 함수 참조
    context.drawImage(item.image, item.dx, item.dy, ...calculateImageSize(item.image.width, item.image.height, 70));
  });
};

//Word Component
export const Word = (gameStatus, wordArr) => {
  const container = id("word");
  container.innerHTML = "";

  //div 태그 생성 후 효과를 주기 위해 클래스 선택자 추가
  const wordText = h("div");
  wordText.classList.add("word-text");

  //게임이 종료된 상태
  if (isGameEnded(gameStatus)) {
    const message = h("p");
    message.innerHTML = generateGameMessage(gameStatus);
    wordText.appendChild(message);
  }

  //게임이 시작되었다면 wordArr은 더이상 빈배열이 아니므로 실행된다.

  const spans = wordArr.map((c) => {
    const span = h("span");
    if (c !== " ") {
      span.classList.add("chracter"); //밑줄 CSS 효과를 위해 선택자 클래스 추가
    }
    span.innerText = c;
    return span;
  });

  if (!isGameEnded(gameStatus)) {
    wordText.append(...spans);
  }
  container.appendChild(wordText); //id="#word" 영역의 하위요소로 추가
};

//Keyboard Component
export const KeyboardLayout = (gameStatus, enteredCharacters, onClickItem) => {
  const container = id("keyboard-layout");
  container.innerHTML = "";

  const ul = h("ul");
  ul.classList.add("keyboard-layout");

  //키보드 배열 추가
  //prettier-ignore
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split('')
    .map((c)=>{
      const li = h('li');
      const button = h('button');

      button.classList.add('keyboard-button');
      button.innerText = c;
      button.addEventListener('click',()=> {
        onClickItem(c);
      });
      //게임 종료 혹은 이미 누른 문자일 경우 비활성화
      button.disabled =  isGameEnded(gameStatus) || enteredCharacters[c];

      li.append(button);
      return li;
    })
    .forEach((el)=>ul.appendChild(el));

  container.appendChild(ul); //id="#keyboard-layout" 영역의 하위요소로 추가
};

//ButtonBox Component
export const ButtonBox = (wordLoading, gameStatus, chancesLeft, timer, onClickStart) => {
  const container = id("button-box");
  container.innerHTML = "";

  //남은 기회 출력
  const chances = h("div");
  chances.classList.add("chances-text"); //위치 잡기 위해 클래스 선택자 추가
  chances.innerText = `${chancesLeft}`;

  //남은 시간 출력
  const timerText = h("div");
  timerText.classList.add("timer-text"); //위치 잡기 위해 클래스 선택자 추가
  timerText.innerText = `${timer}`;

  //게임 시작 버튼
  const button = h("button");
  button.classList.add("start-button");
  button.innerText = "START";
  button.addEventListener("click", onClickStart);
  //로딩 중이거나 게임 시작상태일 때는 비활성화
  button.disabled = wordLoading || !isGameEnded(gameStatus);

  //appendChild는 오직 하나만 매개변수로 받아야해서 여러줄 써야한다.
  //append는 매개변수에 여러개를 나열해서 넣을 수 있다.
  container.append(chances, timerText, button);
};

//SetInterval을 통해 지속적으로 상태를 매개변수로써 전달 받고, 정보를 갱신해서 리랜더링해주는 함수
export function render(state, imageSources, onClickItem, onClickStart) {
  KeyboardLayout(state.gameStatus, state.enteredCharacters, onClickItem);
  Word(state.gameStatus, state.wordArr);
  ButtonBox(state.wordLoading, state.gameStatus, state.chancesLeft, state.timer, onClickStart);
  HangmanImage(state.chancesLeft, imageSources);
}
