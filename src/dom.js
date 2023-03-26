//DOM 관련 함수

//HTML 요소를 편하게 만드는 함수
export function h(tag) {
  return document.createElement(tag);
}

//HTML 요소를 편하게 찾는 함수
export function id(id) {
  return document.getElementById(id);
}
