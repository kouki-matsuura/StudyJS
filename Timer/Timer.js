var timer;
var time;
function Start() {
    var d = document.getElementById('day').value;
    var h = document.getElementById('hour').value;
    var m = document.getElementById('minute').value;
    var s = document.getElementById('second').value;
    console.log(d,h,m,s);
    if(d == '' && h == '' && m == '' && s == '') {
        error('NoElementError');
        return;
    }
    
    if(isNaN(d) || isNaN(h) || isNaN(m) || isNaN(s)) {
        error('NumberTypeError');
        return;
    }

    if(d == '')d=0;
    if(h == '')h=0;
    if(m == '')m=0;
    if(s == '')s=0;

    if(Math.sign(d)<0 || Math.sign(h)<0 || Math.sign(m)<0 || Math.sign(s)<0) {
        error('MinusNumberError');
        return;
    }

    d = parseInt(d);
    h = parseInt(h);
    m = parseInt(m);
    s = parseInt(s);
    document.getElementById('error').innerText = "";

    time = (d * (24*60*60*1000)) + (h * (60*60*1000)) + (m * (60*1000)) + (s * 1000);
    countdown();
    timer = setInterval("countdown()", 1000);
}

function error(element) {
    if(element == 'NoElementError') {
        document.getElementById('error').innerText = "どれかに数値を入れてください";
    }
    if(element == 'NumberTypeError'){
        document.getElementById('error').innerText = "数値型以外が入っています";
    }
    if(element == 'MinusNumberError'){
        document.getElementById('error').innerText = "マイナス値は指定できません";
    }
   
}

function Stop() {
    clearInterval(timer);
}

function Reset() {
    clearInterval(timer);
    document.getElementById('day').value = '';
    document.getElementById('hour').value = '';
    document.getElementById('minute').value = '';
    document.getElementById('second').value = '';
}

function countdown() {
    var time_str = time;
    d = Math.floor(time_str / (24*60*60*1000));
    time_str -= (d * (24*60*60*1000));
    h = Math.floor(time_str / (60*60*1000));
    time_str -= (h * (60*60*1000));
    m = Math.floor(time_str / (60*1000));
    time_str -= (m * (60*1000));
    s = Math.floor(time_str / 1000);
    time -= 1000;
    console.log(d,h,m,s);
    displayTime(d,h,m,s);
}

function displayTime(d,h,m,s) {
    if (d<0) {
        clearInterval(timer);
    }else{
        document.getElementById('day').value = d;
        document.getElementById('hour').value = h;
        document.getElementById('minute').value = m;
        document.getElementById('second').value = s;
    }
}

