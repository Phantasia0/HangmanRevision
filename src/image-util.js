//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
//이미지를 원하는 스크린 위치 (x,y)좌표에 원하는 사이즈 만큼 이미지 추출
//이미지 로드 기능

//사용할 이미지 url을 assets 폴더에서 가져오기
import GallowsImage from "./assets/gallows.png";
import BodyImage from "./assets/body.png";
import LeftArmImage from "./assets/left-arm.png";
import RightArmImage from "./assets/right-arm.png";
import LeftLegImage from "./assets/left-leg.png";
import RightLegImage from "./assets/right-leg.png";
import HeadImage from "./assets/head.png";

//이미지 사이즈를 원하는 비율만큼 비율을 유지하며 조절하기
//비율적인 사이즈를 계산한 뒤, canvas 태그 -> drawImage(이미지컨텐츠,스크린 x좌표,스크린 y좌표, 보여질 width, 보여질 height )
//마지막 2 매개변수를 쉽게 넣기 위해 함수화 한다.
export function calculateImageSize(width, height, percent) {
  const calculatedPercent = percent / 100;
  const calculatedWidth = width * calculatedPercent;
  const calculatedHeight = height * calculatedPercent;

  return [calculatedWidth, calculatedHeight];
}

//이미지들을 정보를 넣어 데이터화 시킨다.
//name: 이미지 별칭, url: 이미지 주소, dx: 스크린x좌표, dy: 스크린 y좌표
const imageData = [
  { name: "right-leg", url: RightLegImage, dx: 242, dy: 290 },
  { name: "left-leg", url: LeftLegImage, dx: 193, dy: 290 },

  { name: "right-arm", url: RightArmImage, dx: 240, dy: 200 },
  { name: "left-arm", url: LeftArmImage, dx: 135, dy: 200 },

  { name: "body", url: BodyImage, dx: 185, dy: 180 },
  { name: "head", url: HeadImage, dx: 190, dy: 60 },
  { name: "gallows", url: GallowsImage, dx: 10, dy: 20 },
];

//이미지 로드하는 함수
//로드하는데 시간이 얼마나 걸릴지 모르므로, 비동기적으로 처리해준다.
//비동기에 관해 설명한 끝판왕 블로그
//https://springfall.cc/post/7
export function loadImage({ url, name, dx, dy }) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;

    image.addEventListener("load", () => resolve({ image, name, dx, dy }));
    image.addEventListener("error", () => reject(new Error(`Error on Loading ${url}`)));
  });
}

// 모두 풀로드하는 함수
// 순서 상관있이 로드 할경우, for await 문
// 이 경우에는 상관이 없이 모두 풀로드 하기때문에
// Promise.all을 사용한다.
//그런데 이거 async await를 load 함수에 적용하고
//fetchAll에도 적용하려니 잘 안돼었다.
//load 이벤트 발생 전에 Promise.all이 먼저 다 resolve되는 사태 발생...
//추후 다시 생각각
export function fetchAllImages() {
  return Promise.all(imageData.map((item) => loadImage(item)));
}
