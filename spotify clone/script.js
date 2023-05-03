// doc objects and required variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let next = document.getElementById('next')
let prev = document.getElementById('previous')
let myProgressbar = document.getElementById('MyProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('song-items'));
let mastersongname = document.getElementById('mastersongname')


// songlist array
let songs = [
    {songName:'Crystals',filePath : 'songs/1.mp3',coverPath :'covers/1.jpg'},
    {songName:'Call me',filePath : 'songs/2.mp3',coverPath :'covers/2.jpg'},
    {songName:'Metamorphosis',filePath : 'songs/3.mp3',coverPath :'covers/3.jpg'},
    {songName:'shootout',filePath : 'songs/4.mp3',coverPath :'covers/4.jpg'},
    {songName:'Janji-heroes',filePath : 'songs/5.mp3',coverPath :'covers/5.jpg'},
    {songName:'After dark',filePath : 'songs/6.mp3',coverPath :'covers/6.jpg'}
]

// adding song names and covers to deck
songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('span')[0].innerText = songs[i].songName;
})

// handling play/pause clicks
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        anim1 = document.getElementById('anim1');
        anim = document.getElementsByClassName('anim')
        if(anim.style.opacity==0){
            anim1.style.opacity = 1;
        }
    }else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        if(anim.style.opacity==1){
            anim1.style.opacity = 0;
        }
    }
})

// updating the progress bar
audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressbar.value = progress;
})

// change in audio currentime with change of progress bar value
myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime = parseInt((myProgressbar.value * audioElement.duration)/100)
})

// playing other songs in the deck


const readdplay=()=>{
    Array.from(document.getElementsByClassName('songsitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle')
    })
}
Array.from(document.getElementsByClassName('song-items')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        readdplay();
        if(audioElement.paused || audioElement.currentTime <= 0){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            index = parseInt(e.target.id);
            audioElement.src = `songs/${index+1}.mp3`
            audioElement.currentTime = 0
            audioElement.play() 
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            anim = document.getElementById(`anim${index+1}`)
            anim.style.opacity = 1;
            mastersongname.innerText = songs[index].songName

        }else{
            audioElement.pause()
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            anim = document.getElementById(`anim${index+1}`);
            anim.style.opacity = 0;
        }
        // e.target.classList.remove('fa-play-circle');
        // e.target.classList.add('fa-pause-circle');
        // index = parseInt(e.target.id);
        // audioElement.src = `songs/${index+1}.mp3`
        // audioElement.currentTime = 0
        // audioElement.play() 
        // masterplay.classList.remove('fa-play-circle');
        // masterplay.classList.add('fa-pause-circle');
    })
})

// fast-forward/backword functionality

next.addEventListener('click',()=>{
    audioElement.currentTime += 5    
})

prev.addEventListener('click',()=>{
    audioElement.currentTime -=5
})