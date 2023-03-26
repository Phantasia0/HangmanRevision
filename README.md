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
