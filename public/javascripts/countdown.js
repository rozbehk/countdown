function timeReamining(){
    var countdownEl = document.querySelectorAll('.countdown')
    for( let i = 0; i<countdownEl.length ; i++){
        let countdownId = countdownEl[i].getAttribute('id')
        let endTime= new Date(countdownId)
        let currentTime = new Date()
        let remainTime = Math.floor(endTime-currentTime)
        let days = Math.floor(remainTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remainTime % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
        let minutes = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remainTime % (1000 * 60)) / 1000);
        if (remainTime < 0) {
            document.getElementById(countdownId).innerHTML = 'Released';
        }else if(remainTime = 0){
            document.getElementById(countdownId).innerHTML = 'Today Is The Day';
        }else{
             document.getElementById(countdownId).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
         }
    }
}

timeReamining()
setInterval(function(){
    timeReamining();
}, 1000)