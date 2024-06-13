var memoryArray = []; //sequence of computers random inputs
let memoryCounter = 0; //used to traverse userinput array to make computer light up colours 
var UserInput = []; //keeps track of users inputs to match against the computers inputs
var userCounter;
let mismatch = false; // check if user has lost
let startcheck = false; //sees if game has started
let power = false;
var input;
let score = 0;
let highscore = 0;
let clock1 = [500, 300, 150, 75];
let clock2 = [1000, 600, 300, 150]
let clockcounter = 0;

const greencolours = ["grey","green"]; //array with light green and dark green to scroll through
const redcolours = ["grey","red"]; // array with light red and dark red to make flashing
const yellowcolours = ["grey","yellow"]; // yellow colours
const bluecolours = ["grey","blue"]; // blue colours

const currenthighscore = document.getElementById("rightbutton");
const currentscore = document.getElementById("leftbutton");

function flashgreen() //function to flash green button
{
    setTimeout(() => 
    { 
        document.getElementById("circlegreen").style.backgroundColor = greencolours[0];
    }, 500);
    setTimeout(() => 
    { 
        document.getElementById("circlegreen").style.backgroundColor = greencolours[1];
    }, 1000);
}
function flashred() //function to flash red button
{
    setTimeout(() => 
    { 
        document.getElementById("circlered").style.backgroundColor = redcolours[0];
    }, 500);
    setTimeout(() => 
    { 
        document.getElementById("circlered").style.backgroundColor = redcolours[1];
    }, 1000);
}
function flashyellow() //flash yellow button
{
    setTimeout(() => 
    { 
        document.getElementById("circleyellow").style.backgroundColor = yellowcolours[0];
    }, 500);    
    setTimeout(() => 
    { 
        document.getElementById("circleyellow").style.backgroundColor = yellowcolours[1];
    }, 1000);
}
function flashblue() //flash blue button
{
    setTimeout(() => 
    { 
        document.getElementById("circleblue").style.backgroundColor = bluecolours[0];
    }, 500);
    setTimeout(() => 
    { 
        document.getElementById("circleblue").style.backgroundColor = bluecolours[1];
    }, 1000);
}

//document.getElementById("start").addEventListener("click",Start );
function Start()
{
    document.getElementById("indicator").style.backgroundColor = "green"; // when user hits start turns indicator green
    setTimeout(() => // waits 3 seconds to execute game
    {
        score = 0;
        currentscore.innerHTML = score;
        newround();
    },1000);
}
function newround()
{
    UserInput = [];
    randomadditiontosequence();
    displaySequence();
}
function randomadditiontosequence() 
{ 
    const randcolour = Math.floor(Math.random() * (4 - 1 + 1) + 1) //random number 1-4
    memoryArray.push(randcolour); //adds random number to user sequence
}
function displaySequence()
{
    let stopper = setInterval(() => 
            {
                let color = memoryArray[memoryCounter];
                if(color == 1) //flash green
                {
                    flashgreen();
                }
                else if(color == 2) //flash red
                {
                    flashred();
                }
                else if(color == 3) //flash yellow
                {
                    flashyellow();
                }
                else if(color == 4) //flash blue
                {
                    flashblue();
                }
                memoryCounter++;
                if(memoryCounter >= memoryArray.length)
                {
                    memoryCounter = 0;
                    clearInterval(stopper);
                }                
            },2000);
}
function userinput(input)
{
    if(power)
    {
        UserInput.push(input);
        if(!checksequence())
        {
            if(score > highscore)
            {
                highscore = score;
                currenthighscore.innerHTML = highscore;
            }
            poweron();
        }
        else if(UserInput.length == memoryArray.length)
        {
            score++;
            currentscore.innerHTML = score;
            newround();
        }
    }
}
function checksequence()
{
    for(let i = 0;i<UserInput.length; i++)
    {
        if(UserInput[i] != memoryArray[i])
        {
            return false;
        }
    }
    return true;
   
}
function poweron()
{
    power = !power;
    if(power == true)
    {
        Start();
    }
    else
    {
        memoryArray = [];
        UserInput = [];
        score = 0;
        document.getElementById("indicator").style.backgroundColor = "red"; // turns indicator back to red

    }
}