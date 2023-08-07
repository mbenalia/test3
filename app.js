let h_q =
[['あ','a'],
['い','i'],
['う','u'],
['え','e'],
['お','o'],
['か','ka'],
['き','ki'],
['く','ku'],
['け','ke'],
['こ','ko'],
['きゃ','kya'],
['きゅ','kyu'],
['きょ','kyo'],
['さ','sa'],
['し','shi'],
['す','su'],
['せ','se'],
['そ','so'],
['しゃ','sha'],
['しゅ','shu'],
['しょ','sho'],
['た','ta'],
['ち','chi'],
['つ','tsu'],
['て','te'],
['と','to'],
['ちゃ','cha'],
['ちゅ','chu'],
['ちょ','cho'],
['な','na'],
['に','ni'],
['ぬ','nu'],
['ね','ne'],
['の','no'],
['にゃ','nya'],
['にゅ','nyu'],
['にょ','nyo']
];
let error_list=[]//errors that will be displayed in game over screen 
let choice=""; // answer choosen by the user 
let score=0;
let good_answer="initial_value";
let i=0;//counter of question
let unit_seconds=0;
let tens_seconds=0;
let unit_minutes=0;
let tens_minutes=0;
let count=0;
let sound_active="active";
let click_sound = new Audio('sounds/click.mp3');
let right_sound = new Audio('sounds/right.mp3');
let wrong_sound = new Audio('sounds/wrong.mp3');
let error_sound = new Audio('sounds/error.mp3');
let start_sound= new Audio('sounds/start.mp3');
let interval="";

function timekeeper(){
        
    if(unit_seconds<9){
        unit_seconds++;
        }
    else if(tens_seconds<5){
        tens_seconds++;
        unit_seconds=0;
    }else if(unit_minutes<9){
        unit_minutes++;
        tens_seconds=0;
        unit_seconds=0;
    }else if(unit_minutes=10){
    }
        document.getElementById("timekeeper").innerHTML=tens_minutes+unit_minutes+':'+tens_seconds+unit_seconds;
    }   
function reset_timekeeper(){
    unit_seconds=0;
    tens_seconds=0;
    unit_minutes=0;
    tens_minutes=0;
    document.getElementById("timekeeper").innerHTML="00:00";
}
function sound_player(sound_active, sound_name){
    if(sound_active=="active"){
        sound_name.play();
    }
}
function sound_switch(){
    if(sound_active=="active"){
        sound_active= "inactive";
        document.getElementById("sound_button_game").innerHTML='<i class="bi bi-volume-mute-fill"></i>';
        document.getElementById("sound_button_home").innerHTML='<i class="bi bi-volume-mute-fill"></i>';   
    }else{
        sound_active="active";
        document.getElementById("sound_button_game").innerHTML='<i class="bi bi-volume-up-fill"></i>';
        document.getElementById("sound_button_home").innerHTML='<i class="bi bi-volume-up-fill"></i>';
    }
    return sound_active;
}

function reset_display(){
    document.getElementById("next").style.display="none";
    document.getElementById("gameOver").style.display="none";
    document.getElementById("startpage").style.display="none";
    document.getElementById("game").style.display="block";
    score=0;
    document.getElementById("score").innerHTML=score;
    document.getElementById("progressBar_correct").style.width='0%';
    document.getElementById("progressBar_errors").style.width='0%';

    document.getElementById("display_result").innerHTML="";
    document.getElementById("errors_table").innerHTML="";
    enable_buttons();

}
function randomOrder(deck_length){//Returns a list of numbers shuffled from 0.
    let ordered_array=[];
    for (let n=0;n<deck_length;n++){
        ordered_array.push(n);
    }
    let shuffled_array=ordered_array.sort((a, b) => 0.5 - Math.random());
    return shuffled_array;

}
function choose_answer(button){
    choice=button.innerHTML;
    sound_player(sound_active,click_sound)
    document.getElementById("instruction").style.display="none";
    document.getElementById("validate").style.display="block";
}
function start_game(){
    sound_player(sound_active,start_sound)
    reset_timekeeper();
    reset_display();
    error_list=[];
    i=0;
    choice="";
    h_q.sort((a, b) => 0.5 - Math.random());

    
    interval=setInterval(function () {timekeeper()}, 1000);
    good_answer=new_question(i,h_q);
}

function new_question(i,h_q){//injection of a new random question and answers
    let name_id;//id of the div 
    document.getElementById("question").innerHTML=h_q[i][0]; //we inject the question
    let four_answers=[h_q[i][1]]; //we'll put 4 choices on answers, the fist is the good answer
    let random_array=randomOrder(h_q.length-1) //we create a numbered array to pick unique numbers in an interval
    let j=0;//
    
    while(four_answers.length<4){
        if(h_q[random_array[j]][1]!=h_q[i][1]){//to  avoid to put the good answer several times.
            four_answers.push(h_q[random_array[j]][1]);
            j++;

        }else{//if the picked answers is the good one, do nothing
            j++;
        }

    }
    four_answers.sort((a, b) => 0.5 - Math.random());//we randomize the order of our answers, if not, the first one will always be the good one 
    for(let k=0; k<4;k++){
        //we the inject the answer in each of the 4 buttons

        name_id="answer"+(k+1);
        document.getElementById(name_id).innerHTML=four_answers[k];
        document.getElementById(name_id).value=four_answers[k];
    }
    return h_q[i][1];   
}
function results(good_answer){//fuction that display the good answer by coloring and disabling cases
    //function that display the good answer in green and the next question button
    document.getElementById("validate").style.display="none"; //We hide the validate div
    document.getElementById("next").style.display="block";//display the next question button
  

    for(let k=0; k<4;k++){
        //we the inject the color red or green in each of the 4 buttons

        let name_id="answer"+(k+1);
        if (document.getElementById(name_id).innerHTML==good_answer){
            document.getElementById(name_id).style.backgroundColor="#28a745";
            document.getElementById(name_id).disabled=true;//disable button to avoid to trigger validate button
        }else{
            document.getElementById(name_id).style.backgroundColor="#dc3545";
            document.getElementById(name_id).disabled=true;
        }
       
    }
     
}
function enable_buttons(){// function to enable answers buttons 
    for(let m=1;m<5;m++){
        let name_id="answer"+m;
        document.getElementById(name_id).disabled=false;
    }
}
function validation(button){//action to do when the validate answer is pushed
    if(choice==""){
        sound_player(sound_active,error_sound)
        alert("You have to choose an answer");
        
    }else if(choice==good_answer){
        clearInterval(interval);
        sound_player(sound_active,right_sound);
        document.getElementById("display_result").innerHTML="CORRECT せかい";
        score++;
        let current_progress=(score/h_q.length)*100;
        document.getElementById("progressBar_correct").style.width=current_progress+'%';//fill progress bar
    
        document.getElementById("score").innerHTML=score;
        results(good_answer);
       
    }else{
        clearInterval(interval);
        sound_player(sound_active,wrong_sound);
        let current_progress=((i-score)/h_q.length)*100;
        document.getElementById("progressBar_errors").style.width=current_progress+'%';//fill progress bar
        document.getElementById("display_result").innerHTML="WRONG まちがった";
        error_list.push([h_q[i][0],h_q[i][1]]);
        results(good_answer)
    }

    }
function reinitialize(button){ //reset the display between questions
    
    
    for(let k=0; k<4;k++){
        let name_id="answer"+(k+1);
        document.getElementById(name_id).style.backgroundColor="#007bff";

        }
    if(i<h_q.length-2){
        choice="";
        i++;
        document.getElementById("instruction").style.display="block";
        document.getElementById("display_result").innerHTML="";//we hide the result div
        document.getElementById("next").style.display="none";//hide the next question button 
        good_answer=new_question(i,h_q);
        interval=setInterval(function () {timekeeper()}, 1000);
        enable_buttons();
    }else{
        
        //document.getElementById("next").style.display="none"; //We display the validate div
        endgame();

    }
    
    } 
function errors_table(){//function that display a table of errors in game over screen
    let table_of_errors
    for (let ket=0;ket<error_list.length;ket++){
        document.getElementById("errors_table").innerHTML+='<tr><th scope="row">'+(ket+1)+'</th><td>'+ error_list[ket][0]+'</td><td>'+ error_list[ket][1]+'</td></tr>'

    }
}
function endgame(){
    errors_table();
    document.getElementById("final_score").innerHTML=(((i-error_list.length)/i)*100).toFixed(2)+' %';
    document.getElementById("game").style.display="none";
    document.getElementById("gameOver").style.display="block";
    clearInterval(interval);


}


//alert(h_q[random_number]);

