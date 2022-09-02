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
            document.getElementById(countdownId).innerHTML = 'Status: Released';
        }else{
             document.getElementById(countdownId).innerHTML = "Status: "+days + "d " + hours + "h " + minutes + "m " + seconds + "s" + " remaining";
         }
    }
}

timeReamining()
setInterval(function(){
    timeReamining();
}, 1000)