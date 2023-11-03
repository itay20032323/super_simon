var buttons = $('.btn');
console.log(buttons);

function clickAnimation(param){ // יצירת אנימציה ללחיצה
    $(param).addClass('pressed');
    setTimeout(function(){
        $(param).removeClass('pressed');
    }, 150);
    console.log(param);
    audio = new Audio(`sounds/${param.id}.mp3`);
    audio.play()
}

buttons.click(function(event){ // יצירת אנימציה ללחיצה
    clickAnimation(event.target);
})

var colors = [];

for(let i = 0; i < buttons.length; i++){ // שאיבת שמות צבעים
    colors.push(buttons[i].id);
}


lastMyColors = [];
lastColors = [];
var level = 1;

function generateRandomColor(){
    numColor = Math.floor(Math.random() * colors.length); // יצירת מספר רנדומלי ורשימה ללחיצות המשתמש האחרונות
    lastColors.push(colors[numColor]);
}

async function playRing(){ // יצירת רשימה ללחיצות המחשב הארונות
    $('h1').text(`Level ${level}`);
    generateRandomColor();
    for(i = 0; i < lastColors.length ; i++){
        await new Promise(resolve => setTimeout(resolve, 1000));

        clickAnimation($(`.${lastColors[i]}`)[0]);
        console.log(lastColors[i]);
    }
}

function checkAnswers(){  // בודק את התשובות של אותו השלב
    for(i = 0; i < lastMyColors.length ; i++){
        if(lastColors[i] == lastMyColors[i]){
            console.log('good');
        } else {
            return false;
        }
    }

    return true;
}

//----------- Sounds ---------------

$('#red').click(function(){
    audio = new Audio('sounds/red.mp3');
    audio.play()
})

$('#green').click(function(){
    audio = new Audio('sounds/green.mp3');
    audio.play()
})

$('#yellow').click(function(){
    audio = new Audio('sounds/yellow.mp3');
    audio.play()
})

$('#blue').click(function(){
    audio = new Audio('sounds/blue.mp3');
    audio.play()
})



// ----------- Main ----------------
$(document).keypress(function(){
    lastMyColors = [];
    lastColors = [];
    level = 1;
    playRing();
});

buttons.click(function(event){
    lastMyColors.push(event.target.id);

    if(checkAnswers()){
        if(lastColors.length == lastMyColors.length){
            console.log('Succeded !');
            level++;
            lastMyColors = [];
            playRing();
        } else {
            console.log('countinue...');
        }

    } else {
        console.log('You are Out');
        audio = new Audio('sounds/wrong.mp3');
        audio.play()
        _paq.push(['trackGoal', 1, level]);
        $('h1').text(`Game Over, press any key to Restart. Level ${level}`);

    }
})


// ---------------------------
// function gamePlay(){


//     buttons.click(function(event){
//         if(event.target === buttons[numColor]){
//             console.log('YEY')
//         } else {
//             console.log('NOO')
//         }

//     })



//     buttons[numColor + 1].click();
// }

// gamePlay();



// while(true){
//     if(stillInGame){
//     var numColor = Math.floor(Math.random() * colors.length);
//     // buttons[0].click(function(){
//     //     console.log('clickeddd');
//     // });
//     console.log(numColor);
//     stillInGame = false;
//     }
// }

// stillInGame = true;


