let frogX = 200;
let bullets = [];
let bugs = [];
let score = 0;
let lives = 3;
let gameOver = false;
let goldCount = 0;
let myFont = "LilyUPC, 'Lily UPC', Itim, sans-serif";

function setup() {
  createCanvas(400, 600);
  textFont(myFont);
}

function draw() {
  background(170, 220, 255);

  noStroke();
  fill(90, 180, 90);
  rect(0, 550, 400, 50);

  if (gameOver == true) {
    fill(0);
    textAlign(CENTER);
    textSize(60);
    text("GAME OVER", 200, 280);
    textSize(32);
    text("คะแนน " + score, 200, 320);
    text("ยิงแมลงทองได้ " + goldCount + " ตัว", 200, 355);
    text("กด R เพื่อเล่นใหม่", 200, 395);
    showHowToPlay();
    return;
  }

  if (keyIsDown(LEFT_ARROW)) {
    frogX = frogX - 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    frogX = frogX + 5;
  }
  frogX = constrain(frogX, 25, 375);

  drawFrog(frogX, 530);

  if (frameCount % 60 == 0) {
    bugs.push({ x: random(20, 380), y: 0, speed: random(1, 3), gold: random(1) < 0.1 });
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y = bullets[i].y - 8;
    fill(255, 100, 150);
    ellipse(bullets[i].x, bullets[i].y, 10, 10);

    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }

  for (let i = bugs.length - 1; i >= 0; i--) {
    bugs[i].y = bugs[i].y + bugs[i].speed;
    drawBug(bugs[i].x, bugs[i].y, bugs[i].gold);

    let hit = false;
    for (let j = bullets.length - 1; j >= 0; j--) {
      let d = dist(bugs[i].x, bugs[i].y, bullets[j].x, bullets[j].y);
      if (d < 20) {
        hit = true;
        bullets.splice(j, 1);
        break;
      }
    }

    if (hit == true) {
      if (bugs[i].gold == true) {
        score = score + 5;
        goldCount = goldCount + 1;
      } else {
        score = score + 1;
      }
      bugs.splice(i, 1);
    } else if (bugs[i].y > 550) {
      lives = lives - 1;
      bugs.splice(i, 1);
      if (lives <= 0) {
        gameOver = true;
      }
    }
  }

  fill(0);
  textAlign(LEFT);
  textSize(28);
  text("คะแนน: " + score, 10, 28);
  text("ชีวิต: " + lives, 10, 56);
  text("แมลงชายนี่สีทอง: " + goldCount, 10, 84);
  showHowToPlay();
}

function showHowToPlay() {
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("← → เดิน   |   Space ยิง   |   R เล่นใหม่", 200, 583);
}

function keyPressed() {
  if (key == " " && gameOver == false) {
    bullets.push({ x: frogX, y: 505 });
  }
  if ((key == "r" || key == "R") && gameOver == true) {
    score = 0;
    lives = 3;
    goldCount = 0;
    bullets = [];
    bugs = [];
    gameOver = false;
  }
}

function drawFrog(x, y) {
  fill(80, 170, 80);
  ellipse(x, y, 50, 36);
  fill(255);
  ellipse(x - 12, y - 18, 16, 16);
  ellipse(x + 12, y - 18, 16, 16);
  fill(0);
  ellipse(x - 12, y - 18, 6, 6);
  ellipse(x + 12, y - 18, 6, 6);
  stroke(0);
  noFill();
  arc(x, y, 24, 12, 0, PI);
  noStroke();
}

function drawBug(x, y, gold) {
  fill(255, 255, 255, 180);
  ellipse(x - 8, y - 6, 14, 10);
  ellipse(x + 8, y - 6, 14, 10);
  if (gold == true) {
    fill(255, 200, 0);
  } else {
    fill(60, 40, 30);
  }
  ellipse(x, y, 16, 20);
}
