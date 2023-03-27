# 행맨 Study 와 Git Flow 연습 중

# Feature/framework 브랜치 - 전체적인 폴더화, 디자인 틀 작업

- ## 전체 디자인 영역화
  - ### App
    - hangman-image-container
      - hangman-image
    - controller-container
      - button-box
      - word
      - keyboard-layout
- ## 프로젝트 소스파일 폴더화

# Feature/state 브랜치 - 상태 관리 작업

- ## Think Flow

  - 관리해야할 상태들이 뭐가 있을까?
  - 컴포넌트 간에 어떤 상태들이 커뮤니케이션 해야할까?

- ## 구체화 [작업 설계 문서화]
  - ### 전역적으로 접근 가능한 게임 상태
    - #### GameStatus
      - READY
      - START
      - LOSE
      - WIN
  - ### 컴포넌트 간 공유되어야 할 상태
    - ### Component Communication State
      - enteredCharacters
        - 입력된 알파벳
        - 키보드에서 공유받을 상태 ( 두번 눌리기 방지 )
      - charMap
        - 요청한 API의 결과를 해시구조 형식으로 데이터 저장
        - 키보드, 게임 진행 체크, 문제 표시 등 대부분 필요한 곳에서 공유 받을 상태
      - WordArr
        - API response 결과를 '\*' 문제 표시하기 위해 배열 데이터로 저장
        - 문제 표시 컴포넌트에서 공유받을 상태
      - charsLeft
        - 맞춰야할 남은 '\*' 처리된 문자 수
        - 게임 진행 체크를 하기 위해 숫자 데이터 형식으로 데이터 저장
        - 헤더 컴포넌트에서 공유 받을 상태
      - chancesLeft
        - 남은 기회 수
        - 게임 진행 체크를 하기 위해 숫자 데이터 형식으로 데이터 저장
        - 헤더 컴포넌트에서 공유 받을 상태
      - timer
        - 남은 시간
        - 게임 진행 체크를 하기 위해 숫자 데이터 형식으로 카운트 다운 데이터 저장
        - 헤더 컴포넌트에서 공유 받을 상태
      - gameStatus
        - 게임의 현 진행 상황
        - GameStatus 객체 데이터 형식으로 저장
        - 실시간 게임 진행 체크 상태에 따라 변하는 모든 컴포넌트에서 공유 받을 상태
      - wordLoading
        - API 요청이 완료되기 전까지 표시해줄 Message 컴포넌트를 위해 Boolean 데이터 저장
        - Message 컴포넌트가 공유 받을 상태 및 전체 게임 시작과 끝을 위해 필요한 상태 데이터

# Feature/image-util 브랜치 - 이미지 에디터 기능 작업

- ## Think Flow

  - 어떤 상태에 대해 의존성을 가져야할까?
  - 이미지를 어떻게 띄워야 할까?

- ## 구체화 [작업 설계 문서화]
  - ### 상태 의존
    - chancesLeft
      - 남은 기회 수에 따라 보여질 이미지 개수 조절
  - ### 이미지 로드 방식
    - 미리 풀로드
      - 전체 이미지를 매칭되는 부위에 미리 먼저 로드 해놓는다.
      - 이 후, 상태에 따라 보여질 이미지 순서대로 지정해서 띄운다.
      - 위치는 canvas 영역에 위치시킨다.

# Feature/image-component 브랜치 - 컴포넌트 기능 작업

- ## Think Flow

  - 어떤 컴포넌트들을 어떻게 구현해야할까?
  - 컴포넌트들은 어떤 상태에 의존할까?
  - 컴포넌트들에 어떤 이벤트 기능을 줘야할까?

- ## 구체화 [작업 설계 문서화]

  - ### 공통 속성

    - controller-container 영역에 위치

  - ### KeyboardLayout
    - 기능 1 : 알파벳데이터를 클릭하여 선택할 수 있게 하고, 그 데이터를 상태에 반영시킨다
      - 제한 1 : 이미 누른 문자일 경우, 비활성화시킨다
        - 관련된 상태
          - enteredCharacters
      - 제한 2 : 게임이 종료되었거나,시작하지 않았다면 비활성화시킨다
        - 관련된 상태
          - gameStatus
  - ### Word
    - 기능 1 : 게임 진행 상태에 따른 메세지를 출력해준다
      - 관련된 상태
        - gameStatus
    - 기능 2 : wordArr에 담긴 암호화된 배열데이터를 문제형식으로 보여준다
      - 관련된 상태
        - wordArr
  - ### ButtonBox
    - 기능 1 : 남은 기회를 보여준다
      - 관련된 상태
        - chancesLeft
    - 기능 2 : 남은 시간을 보여준다
      - 관련된 상태
        - timer
    - 기능 3 : 게임 시작 버튼을 보여준다
      - 제한 1 : 문제 단어가 API 요청 중 로딩 상태일때 비활성화시킨다
        - 관련된 상태
          - wordLoading
      - 제한 2 : 게임이 진행 중일때 비활성화시킨다
        - 관련된 상태
          - gameStatus
  - ### HangmanImage
    - 기능 1 : 2D 이미지 랜더링으로 남은 찬스 수에 따라 다른 이미지를 보여준다
      - 제한 1 : 길로틴 -> 머리 -> 몸통 -> 왼팔 -> 오른팔 -> 왼다리 -> 오다리
        - 관련된 상태
          - chancesLeft, ImageData(끝 순으로 정렬)
      - 제한 2 : 캔버스 사이즈에 전체가 다 들어가는 비율로 이미지를 2D로 랜더링한다
        - 관련된 상태
          - 이미지 사이즈 비율

# Feature/loopPlay 브랜치 - 메인 App.js 작업 및 루프화

- ## Think Flow

  - 만든 컴포넌트들을 어떤 식으로 랜더링해야할까?
  - 컴포넌트에 상태 변경되었다는 걸 어떤식으로 말해줘야할까?

- ## 구체화 [작업 설계 문서화]
  - ### Loop
    - setInterval 함수 이용
      - 게임 시작이 아니라면 끝내고, 시작일 경우 1초마다 실행시킨다
    - Render
  - ### 상태 변경 감지
    - 상태 변경하는 특정 함수를 어떤 기능이 작동하고, 그 뒤에 바로 상태를 업데이트한다
    - 상태 업데이트 이후, 다시 컴포넌트들을 리랜더링한다
  - ### 초기 시작시, 모든 이미지 로드
    - image-util에서 구현 완료된 fetchAllImage함수를 이용해서 먼저 모두 로드한다
    - 비동기적 로드 이후 랜더링 함수를 호출하여, 오류가 나지 않게 한다.
  - ### 로딩관련 상태를 제어
    - 초기 시작시 wordLoading = true / 이후 상태가 word를 참조하여 초기화가 되면 false로 바꾼다
  - ### 게임 재시작
    - 만약 로딩상태가 다시 false가 될 경우 gameStatus를 GameStatus.READY로 상태 변경
    - 그리고 모든 상태를 다시 처음 상태로 초기화시킨다

# Feature/design 브랜치 - 디자인 작업
