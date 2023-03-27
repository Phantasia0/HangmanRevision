//실제 이제껏 만든 여러 요소들을 종합해서 여기서 동작하게 만든다
import "./app.css"; //디자인 파일
import {
  initializeState,
  initialState,
  startGame,
  decreaseChancesLeft,
  decreaseTimer,
  selectCharacter,
  checkGameStatus,
  setWordLoading,
} from "./state"; //state 갱신 해주는 함수들
import { render } from "./components"; //컴포넌트 정보갱신 후 리랜더링 함수
import { GameStatus, fetchWord, isGameEnded } from "./util"; //util 함수들
import { fetchAllImages } from "./image-util"; //이미지 사전 풀로딩 함수

const App = () => {
  let state = { ...initialState }; //전체 공유 상태
  let imageSources = null;

  //상태 갱신 함수
  //갱신 이후 바로 컴포넌트 리랜더링
  function changeState(cb) {
    state = cb(state);
    render(state, imageSources, onClickItem, onClickStart);
  }

  //Keyboard 컴포넌트 이벤트 리스너 콜백으로 등록할 함수
  function onClickItem(c) {
    changeState((state) => selectCharacter(state, c));
    changeState((state) => checkGameStatus(state));
  }

  //ButtonBox 컴포넌트의 START 버튼의 이벤트 리스너 콜백으로 등록할 함수
  function onClickStart() {
    changeState((state) => setWordLoading(state, true)); //로딩 중으로 상태 변경

    fetchWord().then((word) => {
      const intervalId = setInterval(() => {
        //게임 상태가 GameStatus.START가 아닌 모든 경우에 인터벌 종료 및 함수 종료
        if (isGameEnded(state.gameStatus)) {
          clearInterval(intervalId);
          return;
        }
        changeState((state) => decreaseTimer(state)); //시간 1초씩 감소
        changeState((state) => checkGameStatus(state)); //게임 진행 상태 체크
      }, 1000);
      changeState((state) => setWordLoading(state, false)); //로딩 끝으로 상태 변경
      changeState((state) => initializeState(state, word)); //API요청으로 부터 받은 word를 참조하여 상태 초기화
      changeState((state) => startGame(state)); //게임 진행 상태를, GameStatus.START 상태로 변경
    });
  }

  //전체 이미지 로드
  fetchAllImages().then((images) => {
    imageSources = images;
    changeState((state) => state);
  });
};

export default App;
