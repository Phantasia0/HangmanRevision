//유틸 변수 및 함수

// 게임 상태 명시화
export const GameStatus = {
  READY: "READY",
  START: "START",
  LOSE: "LOSE",
  WIN: "WIN",
};

//현재 게임 상태가 GameStatus.START일 경우에만 진행 중이라고 판단
export function isGameEnded(gameStatus) {
  return gameStatus !== GameStatus.START;
}

//API 요청을 통해 문제로 나올 데이터를 받아온다
export async function fetchWord() {
  try {
    const res = await fetch("https://puzzle.mead.io/puzzle?wordCount=2");
    const parsedData = await res.json();
    return parsedData.puzzle;
  } catch (error) {
    console.log(error);
  }
}

//CharMap을 만들어 주는 함수
export function wordToMap(word) {
  return word
    .toUpperCase()
    .split("")
    .reduce((map, cur, idx) => {
      if (!map[cur]) {
        map[cur] = [];
      }
      map[cur].push(idx);
      return map;
    }, {});
}

//게임 상태에 따른 메세지 출력 함수
export function generateGameMessage(gameStatus) {
  if (gameStatus === GameStatus.LOSE) {
    return "게임에 졌습니다. 다시 시작하세요.";
  } else if (gameStatus === GameStatus.WIN) {
    return "단어를 맞췄습니다! 다시 시작하세요.";
  } else if (gameStatus === GameStatus.READY) {
    return "게임을 시작하세요.";
  }
  return "";
}
