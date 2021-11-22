var Formula = [];
var str_num;
var point = false;

function display() {
    if (String(Formula[Formula.length - 1]).indexOf('.') == -1){
        point = false;
    }
    $('#answer').html(Formula[Formula.length - 1]);
    console.log(Formula);
}

function cancel() {
    if (Formula.length != 0) {
        Formula.pop();
        display();
    }
    if (Formula.length == 0) {
        $('#answer').html(0);
    }
}

function change_code() {
    if(Formula.length != 0) {
        Formula[Formula.length-1] = -((Formula[Formula.length-1]));
    }
    display();
}

function addpoint() {
    if(!point){
    
        if(isNaN(Formula[Formula.length-1]) || Formula.length==0){
            Formula.push('0.');
        }else{
            Formula[Formula.length-1] = Formula[Formula.length-1]+'.';
        }
    }
    display();
    point = true;
}

function per() {
    if(Formula.length != 0) {
        if(!isNaN(Formula[Formula.length-1])){
            //%の直前が数値ならその数値の前の数値✖️直前の数値%
            if(Formula.length == 1) {
                Formula[0] = Formula[0]/100;
                fix_round_error(0);
            }else{
                for(i=Formula.length-2; i<=0; i--) {
                    if(!isNaN(Formula[i])) {
                        Formula[Formula.length-1] = Formula[i] * (Formula[Formula.length-1] / 100);
                        break;
                    }
                }
            }
        }else{
            //%の直前が記号ならその記号の前の数値✖️記号の前の数値%
            for(i=Formula.length-2; i<=0; i--) {
                if(!isNaN(Formula[i])) {
                    Formula.push(Formula[i] * (Formula[i]/100));
                    break;
                }
            }
        }
    }
    display();
}
//数値を入力したときの処理
function add(num) {
    if(Formula.length == 0) {

        Formula.push(num);
    }else{
        //スタックに入っている最後のものが数値か記号かの判断
        //数値の時
        if(!isNaN(Formula[Formula.length-1])) {
            if(Formula[Formula.length-1]<0){
                //負の数の時はそれを取り消し、新たな数値を入れる
                Formula.pop();
                Formula.push(num);
            }else{
                //小数点がついている、いない場合の処理
                if(!point) {
                    Formula[Formula.length-1] = Formula[Formula.length-1]*10 + num;
                }else{
                    //小数点がついているときの処理を書く
                    var pointCnt = String(Formula[Formula.length-1]).split(".")[1];
                    //丸誤差が発生しないための処理
                    str_num = parseFloat(Formula[Formula.length-1]) + (num  * (10 ** -(pointCnt.length+1)));
                    str_num *=  10 ** (pointCnt.length+1);
                    Formula[Formula.length-1] = Math.round(str_num) / (10 ** (pointCnt.length+1));
                }
            }
        }else{
        //記号の時
            Formula.push(num);
        }
    }
    display();
}

function fix_round_error(locate) {
    var count = String(Formula[locate]).split(".")[1];
    Formula[locate] = Math.round(Formula[locate] * (10 ** (count.length+1))) / (10 ** (count.length+1));
}

function addition() {
    formulaCheck();
    if(isNaN(Formula[Formula.length-1])) {
        Formula.pop();
    }
    Formula.push('+');
}

function divide() {
    formulaCheck();
    if(isNaN(Formula[Formula.length-1])) {
        Formula.pop();
    }
    Formula.push('÷');
}

function multiplicate() {
    formulaCheck();
    if(isNaN(Formula[Formula.length-1])) {
        Formula.pop();
    }
    Formula.push('×');
}

function subtract() {
    formulaCheck();
    if(isNaN(Formula[Formula.length-1])) {
        Formula.pop();
    }
    Formula.push('-');
}

function formulaCheck() {
    if(Formula.length == 3 && isNaN(Formula[1])) {
        run(Formula[1]);
    }
}

function run(operator) {
    var result;
    if(operator == '+') {
        result = Formula[0] + Formula[2];
    }
    else if(operator == '-') {
        result = Formula[0] - Formula[2];
    }
    else if(operator == '×') {
        result = Formula[0] * Formula[2];
    }
    else if(operator == '÷') {
        if(Formula[2] == 0){
            $('#answer').html('数値ではありません');
        }else{
            result = Formula[0] / Formula[2];
        }
    }
    Formula.splice(0);
    Formula.push(result);
    display();
}