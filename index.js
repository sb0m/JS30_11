const playSymbol = '&#9205';
const pauseSymbol = '&#9208';

window.onload = function () {
    let mousedown = false;
    const player = document.querySelector('.player');
    const video = document.querySelector('.viewer');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress__filled');
    const toggle = document.querySelector('.toggle');
    const skipButtons = document.querySelectorAll('[data-skip]');
    const volumeRange = document.querySelector('input[name=volume]');
    const speedRange = document.querySelector('input[name=speed]');

    // canvas.addEventListener('mousemove', function (e) { draw(e, isDrawing, ctx); });    
    video.addEventListener("timeupdate", function () { setProgressBar(video, progressBar); });
    video.addEventListener("click", function () { togglePlay(video, toggle); });
    toggle.addEventListener("click", function () { togglePlay(video, toggle); });
    skipButtons.forEach(button => button.addEventListener('click', function () { skip(video, button); }));
    volumeRange.addEventListener('change', function () { changeVolume(video, volumeRange); });
    speedRange.addEventListener('change', function () { changeSpeed(video, speedRange); });
    progress.addEventListener('click', function (e) { progressBarClicked(e, video, progress); });
    progress.addEventListener('mousemove', (e) => mousedown && progressBarClicked(e, video, progress));
    progress.addEventListener('mousedown', (e) => mousedown = true);
    progress.addEventListener('mouseup', (e) => mousedown = false);
    video.playbackRate = speedRange.value;
    video.volume = volumeRange.value;
}

function progressBarClicked(e, video, progress) {
    const progressWidth = progress.offsetWidth;
    const clickX = e.layerX;
    const pos = (clickX / progressWidth);
    video.currentTime = video.duration * pos;
}

function togglePlay(video, toggle) {
    video.paused ? setVideoPlay(video, toggle) : setVideoPause(video, toggle);
}

function setVideoPlay(video, toggle) {
    video.play();
    toggle.innerHTML = pauseSymbol;
}

function setVideoPause(video, toggle) {
    video.pause();
    toggle.innerHTML = playSymbol;
}

function skip(video, button) {
    // data-skip has number of skipping seconds in it
    video.currentTime += parseFloat(button.dataset.skip);
}

function setProgressBar(video, progressBar) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

function changeVolume(video, input) {
    video.volume = input.value;
}

function changeSpeed(video, input) {
    video.playbackRate = input.value;
}