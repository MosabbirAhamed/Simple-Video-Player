const fileInput = document.querySelector(".file-input");
const chooseVidBtn = document.querySelector(".select-btn");
const setVideo = document.querySelector(".container video");
const title = document.querySelector(".title h2")
  

const loadVideo = ()=>{
    let file = fileInput.files[0];
    if(!file) return;
    setVideo.src = URL.createObjectURL(file)
    title.innerText = file.name
}

fileInput.addEventListener("change", loadVideo)
chooseVidBtn.addEventListener("click",() => fileInput.click())