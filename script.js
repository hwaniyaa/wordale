const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart(){

  const displayGameOver =()=> {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:43vw; background-color: white;";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown",handleKeyDown);
    displayGameOver();
    clearInterval(timer);
  }

  const nextLine = () => {
    if(attempts === 6) {
      return gameOver();
    }
    attempts++;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은갯수 = 0;

    for(let i = 0; i < 5; i++) {
      const block = document.querySelector(`.board-block[date-index='${attempts}${i}']`);
      const 입력한글자 = block.innerText;
      const 정답글자 = 정답[i];
      if(입력한글자 === 정답글자) {
        맞은갯수++;
        block.style.background = '#6AAA64';
        block.style.color = 'White';
      } else if(정답.includes(입력한글자)) {
        block.style.background = '#C9B458';
        block.style.color = 'White';
      } else {
        block.style.background = '#787C7E';
        block.style.color = 'White';
      }
    }
    
    if(맞은갯수 === 5){
      gameOver();
    } else {
      nextLine();
    }
  };

  const handleBackspace =()=> {
    if(index > 0){
      const preBlock = document.querySelector(`.board-block[date-index='${attempts}${index - 1}']`);
      preBlock.innerText = "";
    }
    if(index !== 0){
      index--;
    }
    
  };

  const handleKeyDown = (e) => {

    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(`.board-block[date-index='${attempts}${index}']`);

    if(e.key === 'Backspace'){
      handleBackspace();
    } else if(index === 5) {
      if(e.keyCode === 13) {
        handleEnterKey();
      } else {
        return;
      }
    } else if(65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }

  };

  const startTime =()=> {
    const 시간시간 = new Date();

    function setTime(){
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시간시간);
      const 분 = 흐른시간.getMinutes().toString().padStart(2,'0');
      const 초 = 흐른시간.getSeconds().toString().padStart(2,'0');
      const timeh1 = document.querySelector(".time");
      timeh1.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTime();

  window.addEventListener("keydown",handleKeyDown);
}

appStart();
