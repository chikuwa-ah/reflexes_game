/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let time, time_interval, x, y, radius = 15, score, miss;
let game = false;

function before() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = '40px bold sans-serif';
    let text = 'PRESS SPACE TO START';
    let textwidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textwidth) / 2, 320);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    x = Math.floor(Math.random() * (canvas.width - 30)) + 15;
    y = Math.floor(Math.random() * (canvas.height - 30)) + 15;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    document.getElementById('score').textContent = 'CORRECT：' + String(score);
}

function timer() {
    time--;
    if (time < 1) {
        clearInterval(time_interval);
        game = false;
        game_over();
    }

    document.getElementById('time').textContent = 'TIME：' + String(time);
}

function game_over() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '80px bold sans-serif';
    let text = 'TIME UP';
    let textwidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textwidth) / 2, 220);

    let per_seccond = Math.round(score / 15 * 100) / 100;
    let correct_rate = Math.round(score / (score + miss) * 1000) / 1000;

    ctx.font = '30px bold sans-serif';
    text = 'CORRECT PER SECCOND：' + String(per_seccond);
    textwidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textwidth) / 2, 330);
    text = 'CORRECT RATE：' + String(correct_rate * 100) + '%';
    textwidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textwidth) / 2, 400);
}

document.addEventListener('click', click, false);
function click(e) {
    if (game) {
        let mx = e.offsetX;
        let my = e.offsetY;
        if (mx >= 0 && mx <= canvas.width && my >= 0 && my <= canvas.height) {
            let subX = Math.abs(x - mx);
            let subY = Math.abs(y - my);
            let distance = Math.sqrt(subX ** 2 + subY ** 2);
            if (distance <= radius) {
                score++;
                draw();
            } else {
                miss++;
                document.getElementById('miss').textContent = 'MISS：' + String(miss);
            }
        }
    }
}

document.addEventListener('keydown', keydown, false);
function keydown(e) {
    if (e.keyCode === 32 && !game) {
        time = 15, score = 0, miss = 0, game = true;
        time_interval = setInterval(timer, 1000);
        document.getElementById('time').textContent = 'TIME：' + String(time);
        document.getElementById('score').textContent = 'CORRECT：' + String(score);
        document.getElementById('miss').textContent = 'MISS：' + String(miss);
        draw();
    }

    if (e.keyCode === 27) {
        clearInterval(time_interval);
        game = false;
        before();
    }
}

before();