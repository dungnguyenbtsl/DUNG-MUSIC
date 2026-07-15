const $ = document.querySelector.bind(document);

const songTitle = $('#song-title');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const playIcon = $('.icon-play');
const pauseIcon = $('.icon-pause');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');

// Danh sách bài hát mẫu
const songs = [
    {
        name: "Lofi Song 1",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        image: "https://picsum.photos/200/200?random=1"
    },
    {
        name: "Lofi Song 2",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://picsum.photos/200/200?random=2"
    }
];

let currentIndex = 0;
let isPlaying = false;

// Đĩa nhạc xoay
const cdThumbAnimate = cdThumb.animate([
    { transform: 'rotate(360deg)' }
], {
    duration: 10000, // 10 giây một vòng
    iterations: Infinity
});
cdThumbAnimate.pause();

function loadCurrentSong() {
    const currentSong = songs[currentIndex];
    songTitle.textContent = currentSong.name;
    cdThumb.style.backgroundImage = `url('${currentSong.image}')`;
    audio.src = currentSong.path;
}

// Xử lý Play/Pause
playBtn.onclick = function() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
};

audio.onplay = function() {
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    cdThumbAnimate.play();
};

audio.onpause = function() {
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    cdThumbAnimate.pause();
};

// Cập nhật thanh tiến trình chạy theo nhạc
audio.ontimeupdate = function() {
    if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercent;
    }
};

// Tua nhạc khi kéo thanh tiến trình
progress.oninput = function(e) {
    const seekTime = audio.duration / 100 * e.target.value;
    audio.currentTime = seekTime;
};

// Next / Prev bài
nextBtn.onclick = function() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadCurrentSong();
    audio.play();
};

prevBtn.onclick = function() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadCurrentSong();
    audio.play();
};

// Tự động chuyển bài khi hết nhạc
audio.onended = function() {
    nextBtn.click();
};

// Khởi chạy ứng dụng
loadCurrentSong();
