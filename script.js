/* scripts.js */
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const backwardBtn = document.getElementById('backwardBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const resolutionBtn = document.getElementById('resolutionBtn');

    let currentResolution = 0;
    const resolutions = [
        {src: 'video-1.mp4', resolution: '144p'},
        {src: 'video-2.mp4', resolution: '240p'},
        {src: 'video-3.mp4', resolution: '320p'},
        {src: 'video-1.mp4', resolution: '480p'},
        {src: 'video-2.mp4', resolution: '720p'},
        {src: 'video-3.mp4', resolution: '1080p'}
    ];

    playPauseBtn.addEventListener('click', () => {
        if(video.paused){
            video.play();
            playPauseBtn.textContent = 'pause';
        }
        else {
            video.pause();
            playPauseBtn.textContent = 'play';
        } 
    });

    backwardBtn.addEventListener('click', () =>{
        video.currentTime -= 5;
    });

    forwardBtn.addEventListener('click', () => {
        video.currentTime += 10;
    });

    resolutionBtn.addEventListener('click', () => {
        currentResolution =(currentResolution + 1)% resolutions.length;
        const currentTime = video.currentTime;
        video.src = resolutions[currentResolution].src;
        video.currentTime= currentTime;
        video.play();
    });

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let touchTimer;

    video.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchTimer = new Date().getTime();
    });

    video.addEventListener('touchend', (e) => {
        const touch = e.changedTouches[0];
        touchEndX = touch.clientX;
        touchEndY = touch.clientY;
        handleGesture();
    });

    function handleGesture() {
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        const dt = new Date().getTime() - touchTimer;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                // Swipe right
                video.currentTime += 10;
            } else {
                // Swipe left
                video.currentTime -= 5;
            }
        } else {
            if (dy > 0) {
                // Swipe down
                video.playbackRate = 1.0;
            } else {
                // Swipe up
                video.playbackRate = 1.0;
            }
        }
        // Tap gestures
        if (dt < 300) {
            const middleThird = window.innerWidth / 3;
            if (touchStartX < middleThird) {
                // Double tap on left
                video.currentTime -= 5;
            } else if (touchStartX > 2 * middleThird) {
                // Double tap on right
                video.currentTime += 10;
            } else {
                // Double tap in middle
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
    }

    let holdInterval;
    video.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        if (touch.clientX < window.innerWidth / 3) {
            holdInterval = setInterval(() => {
                video.currentTime -= 0.1 * video.playbackRate;
            }, 100);
        } else if (touch.clientX > 2 * window.innerWidth / 3) {
            holdInterval = setInterval(() => {
                video.currentTime += 0.1 * video.playbackRate;
            }, 100);
        }
    });

    video.addEventListener('touchend', () => {
        clearInterval(holdInterval);
    });
});