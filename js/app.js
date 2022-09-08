const container = document.querySelector(".container");
const mainVideo = document.querySelector("video");
const playPuseBtn = document.querySelector(".play-puse i");
const currentVidTime = document.querySelector(".current-time");
const videoDuration = document.querySelector(".video-duration");
const progressBar = document.querySelector(".progress-bar");
const videoTimeline = document.querySelector(".video-timeline");
const skipForward = document.querySelector(".skip-forward i");
const skipBackward = document.querySelector(".skip-backward i");
const volumeBtn = document.querySelector(".volume i");
const volumeSlider = document.querySelector(".left input");
const speedBtn = document.querySelector(".playback-speed span");
const speedOption = document.querySelector(".speed-option");
const picInPicBtn = document.querySelector(".pic-in-pic span");
const fullscreenBtn = document.querySelector(".fullscreen i");
const menuBar = document.querySelector(".menu-bar i");
const menuHide = document.querySelector(".menu-hide");

let timer;

const hideControls = ()=>{
    if(mainVideo.paused) return;
    timer = setTimeout(()=>{
        container.classList.remove("show-controls")
    }, 3000)
}
hideControls()

container.addEventListener("mousemove", ()=>{
    container.classList.add("show-controls")
    clearTimeout(timer);
    hideControls();
})

const formatTime = time =>{
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time /3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    if(hours == 0 ){
        return `${minutes}:${seconds}`;
    }return `${hours}:${minutes}:${hours}`;
};

mainVideo.addEventListener("timeupdate", (e)=>{
    let {currentTime , duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});
mainVideo.addEventListener("loadeddata", (e)=>{
    videoDuration.innerText = formatTime(e.target.duration);
});


volumeBtn.addEventListener("click", ()=>{
    if(!volumeBtn.classList.contains("fa-volume-high")){
        mainVideo.volume= 0.5 ;
        volumeBtn.classList.replace("fa-volume-xmark" , "fa-volume-high");

    }else{
        mainVideo.volume= 0.0 ;
        volumeBtn.classList.replace("fa-volume-high" , "fa-volume-xmark");

    }
    volumeSlider.value = mainVideo.volume;
});

videoTimeline.addEventListener("click" , (e) => {
    let timelineWidth = e.target.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

const draggableProgressBar = (e)=>{
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innertext = formatTime(mainVideo.currentTime)
}

videoTimeline.addEventListener("mousedown" , (e) => {
    videoTimeline.addEventListener("mousemove" , draggableProgressBar)
})

container.addEventListener("mouseup" , (e) => {
    videoTimeline.removeEventListener("mousemove" , draggableProgressBar)
})

videoTimeline.addEventListener("mousemove", e => {
    const progressTime = videoTimeline.querySelector("span");
    let offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    let timelineWidth = videoTimeline.clientWidth;
    let percent = (e.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(percent);

})

volumeSlider.addEventListener("input", (e) => {
    mainVideo.volume=e.target.value;
    if(e.target.value == 0){
        volumeBtn.classList.replace("fa-volume-high" , "fa-volume-xmark");
    }else{
        volumeBtn.classList.replace("fa-volume-xmark" , "fa-volume-high");

    }
});

fullscreenBtn.addEventListener("click", ()=>{
    container.classList.toggle("fullscreen")
    if(document.fullscreenElement){
        fullscreenBtn.classList.replace( "fa-compress", "fa-expand")
        return document.exitFullscreen();
    }
    fullscreenBtn.classList.replace("fa-expand", "fa-compress")
    container.requestFullscreen();
});

speedBtn.addEventListener("click", ()=>{
    speedOption.classList.toggle("show");
});

speedOption.querySelectorAll('li').forEach(option =>{
    option.addEventListener("click", ()=>{
        mainVideo.playbackRate = option.dataset.speed;
        speedOption.querySelector('.active').classList.remove('active');
        option.classList.add("active")
    })
});

picInPicBtn.addEventListener("click", ()=>{
    mainVideo.requestPictureInPicture();
    
});

document.addEventListener("click", (e) =>{
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded"){
        speedOption.classList.remove("show")
    }
});

skipBackward.addEventListener("click", ()=>{
    mainVideo.currentTime -= 5;
});

skipForward.addEventListener("click", ()=>{
    mainVideo.currentTime += 5;
});

playPuseBtn.addEventListener("click", () =>{
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("click", ()=>{
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
})

mainVideo.addEventListener("play", ()=>{
    playPuseBtn.classList.replace("fa-play" , "fa-pause")
});
mainVideo.addEventListener("pause", ()=>{
    playPuseBtn.classList.replace("fa-pause" , "fa-play")
});

menuBar.addEventListener("click", ()=>{
    menuHide.classList.toggle("menu-show");
});