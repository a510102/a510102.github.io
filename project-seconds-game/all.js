const banner = document.querySelector('.banner');
const bottom = document.querySelector('.bottom');
  

const button = document.querySelector('.button');
let a , b ,count, str, gameclick, score;
let corrertanser ;
let counts = ['+', '-', '×', '÷' ];
let scoll = 0;
let time = 0;

 
function startGame(){
  str = ` <div class='game-title'>
            <p class='title'>60 SECONDS CHALLENGE</p>
            <p class="score-title">SCORE</p><span class="score"></span>
          </div>
          <p class="game-click">
          </p>
  `
  banner.innerHTML = str;
  score = document.querySelector('.score');
  gameclick = document.querySelector('.game-click');
  banner.classList.add('banner-page-two');
  bottom.classList.add('bottom-page-two');
  gameclick.innerHTML = `00 : 0${time}`;
  timecount();
 
}

function yourscoll(){
  switch(true){
    case scoll >99:
      str = `${scoll}`;
      console.log('100')
        break;
    case (scoll < 100 && scoll > 9):
      str = `0${scoll}`;
      console.log('10')
        break;
    default:
      str = `00${scoll}`;           
  }
  score.textContent = str;
}

function print() {
  random();
  str = `<p class="count"><span class="font-b">${a}</span> ${count} <span class="font-b">${b}<span> <span class="font-w">=</span></p>
        <div class="answer-area">
        <input type="text" onchange="check(event)" class="answer">
        <p>press enter to answer</p>
        </div>
        `;
  bottom.innerHTML = str;
}

function check(e) {
  let playanswer = e.target.value;
  corrertanser = corrertanser.replace('×','*')
  corrertanser = corrertanser.replace('÷','/')

  corrertanser = eval(corrertanser).toFixed();
  switch(true){
    case (time <= 40 && time >= 0):
    if (corrertanser.toString() === playanswer){
        scoll += 1;
    } else{
      scoll -= 1;
    }
    yourscoll();
    print();
        break;
    case time === 60 && (corrertanser.toString() !== playanswer):
      scoll -= 1;
      str=`<div class='final-title'>
            <p class='title'>60 SECONDS CHALLENGE</p>
            <p class="score-title">YOUR FINAL SCORE</p>
          </div>
          <p>${scoll}</p>
          `
      banner.innerHTML = str;
      str = `<button onclick="location.reload()">TRY AGAIN!</button>`  
      bottom.innerHTML = str;  
      banner.classList.remove('banner-page-two');    
      bottom.classList.remove('bottom-page-two');
      banner.classList.add('banner-page-three');

          break;    
    case (time >= 41 && time <= 60):
      if (corrertanser.toString() === playanswer){
         scoll += 5;
      } else{
       scoll -= 1;
      }
      yourscoll();
      print();
      break;
    }
}

function random() {
    let index = Math.floor((Math.random()*counts.length));
    count = counts[index];
    switch(true){
      case time >=0 && time < 21 :
        a = Math.floor(Math.random() * 10) +1;
        b = Math.floor(Math.random() * 10) +1;
          break;
      case time >20 && time < 41 :
        a = Math.floor(Math.random() * 1000) +101;
        b = Math.floor(Math.random() * 1000) +101;
          break;  
    }
    
    corrertanser = `${a} ${count} ${b}`;
    
}  

function timecount(){
  print();
  yourscoll();
  let countdown = setInterval(() => {
    time++;
    switch(true){
      case time  < 10:
        str = `00 : 0${time}`;
          break;
      default:
        str =`00 : ${time}`;
    }
    gameclick.innerHTML = str;
    if(time === 60){
      clearInterval(countdown);
      console.log('times up');
      return
    }
  }, 1000);
}