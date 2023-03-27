//앱들을 모아서 구동 파일

import App from "./app";
import "./index.css";

const run = () => {
  window.addEventListener("DOMContentLoaded", () => {
    App();
  });
};

run();
