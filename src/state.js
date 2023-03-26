import { GameStatus } from "./util";

//초기 상태
export const initialState = {
  enteredCharacters: {},
  charMap: {},
  wordArr: [],
  charsLeft: 0,
  chancesLeft: 7,
  timer: 60,
  gameStatus: GameStatus.READY,
  wordLoading: false,
};

//남은 기회 수 하나씩 감소 시켜주는 함수
export function decreaseChancesLeft(state) {
  return { ...state, chancesLeft: state.chancesLeft - 1 };
}

//게임 실행 상태를 스타트 상태로 바꿔주는 함수
export function startGame(state) {
  return { ...state, gameStatus: GameStatus.START };
}

//setInterval()에서 1초 간격으로 실행할 함수. 타이머 시간을 1씩 감소시켜 준다.
export function decreaseTimer(state) {
  return { ...state, timer: state.timer - 1 };
}

//로딩상태를 바꿔주는 함수. Start버튼 누르면 전체 상태를 초기화 시켜준다.
//wordLoading은 Boolean 값이 들어온다.
export function setWordLoading(state, wordLoading) {
  if (wordLoading) {
    state = { ...initialState };
  }
  return { ...state, wordLoading };
}

//처음 시작시, API 요청으로 받아온 word 값을 이용하여 초기 상태 세팅시켜준다.
export function initializeState(state, word) {
  //charMap 만들기
  const charMap = wordToMap(word);

  //wordArr 만들기
  //prettier-ignore
  const wordArr = Array
    .from({length:word.length})
    .map((_,idx)=>word[idx]=== " " ? " " : "*");

  //charsLeft 만들기
  //-1 은 공백을 키로 가진 것 뺀것
  const charsLeft = Object.keys(charMap).length - 1;

  //초기값 세팅 후 리턴
  return { ...state, charMap, wordArr, charsLeft };
}

//키보드 입력에 따라 변화된 상태값을 반영하여 상태를 갱신하여 반환시켜주는 함수
export function selectCharacter(state, enteredCharacter) {
  //입력받은 알파벳들을 enteredCharacters 상태에 저장한다.
  const enteredCharacters = {
    ...state.enteredCharacters,
    [enteredCharacter]: true,
  };

  //입력한 알파벳이 기존에 들고 있던 charMap에 없을 경우,
  //기회를 -1 해주고 함수를 종료 시킨다.
  if (!state.charMap[enteredCharacter]) {
    const chancesLeft = state.chancesLeft - 1;
    return {
      ...state,
      chancesLeft,
      enteredCharacters,
    };
  }

  //입력한 알파벳이 charMap에 있을 경우 실행된다.
  const wordArr = [...state.wordArr];
  //prettier-ignore
  state
      .charMap[enteredCharacter]
      .forEach((idx)=>{
        wordArr[idx] = enteredCharacter; //기존 * 표시를 실제 알파벳으로 다시 바꿔준다.
      });
  const charsLeft = state.charsLeft - 1; //맞춰야할 글자 수를 -1 시켜준다.

  return {
    ...state,
    wordArr,
    charsLeft,
    enteredCharacters,
  };
}

//상태 변경에 따라 게임 상태 변경해준다.
export function checkGameStatus(state) {
  if (state.charsLeft === 0) {
    return { ...state, gameStatus: GameStatus.WIN };
  } else if (state.chancesLeft === 0 || state.timer === 0) {
    return { ...state, gameStatus: GameStatus.LOSE };
  }
  return state;
}
