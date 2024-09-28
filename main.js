/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let time, time_interval, before_interval, cd, x, y, radius = 15, score, miss;
let game = false;

function letter_center(text, style, font, y) {
    ctx.fillStyle = style;
    ctx.font = font;
    let textwidth = ctx.measureText(text).width;
    ctx.fillText(text, (canvas.width - textwidth) / 2, y);
}

function before() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    letter_center('PRESS SPACE TO START', '#000', '40px bold sans-serif', 320);

    ctx.beginPath();
    ctx.arc(400, 450, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    document.getElementById('radius').textContent = 'RADIUS：' + radius;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    x = Math.floor(Math.random() * (canvas.width - (radius * 2))) + Number(radius);
    y = Math.floor(Math.random() * (canvas.height - (radius * 2))) + Number(radius);

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

function bcd() {
    cd--;
    if (cd === 0) {
        clearInterval(before_interval);
        game = true;
        time_interval = setInterval(timer, 1000);
        draw();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    letter_center(cd, '#000', '40px bold sans-serif', 320);
}

function game_over() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    letter_center('TIME UP', '#000', '80px bold sans-serif', 220);

    let per_seccond = Math.round(score / 20 * 100) / 100;
    let correct_rate = Math.round(score / (score + miss) * 1000);

    letter_center('CORRECT PER SECCOND：' + String(per_seccond), '#000', '30px bold sans-serif', 330);
    letter_center('CORRECT RATE：' + String(correct_rate / 10) + '%', '#000', '30px bold sans-serif', 400);

    ctx.font = '20px sans-serif';
    ctx.fillText('PRESS SPACE TO RESTART', 5, canvas.height - 5);
}

let slider = document.getElementById('slider');
slider.addEventListener('change', sl_change, false);
function sl_change() {
    if (!game) {
        radius = slider.value;
        before();
    } else {
        slider.value = radius;
    }
}

canvas.addEventListener('click', click, false);
function click(e) {
    if (game) {
        let mx = e.offsetX;
        let my = e.offsetY;
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

document.addEventListener('keydown', keydown, false);
function keydown(e) {
    if (e.keyCode === 32 && !game) {
        time = 20, score = 0, miss = 0;
        cd = 4;
        before_interval = setInterval(bcd, 1000);
        document.getElementById('time').textContent = 'TIME：' + String(time);
        document.getElementById('score').textContent = 'CORRECT：' + String(score);
        document.getElementById('miss').textContent = 'MISS：' + String(miss);
    }

    if (e.keyCode === 27) {
        clearInterval(time_interval);
        game = false;
        before();
    }
}

before();