console.log('Loaded!');

var element=document.getElementById('maintext');
element.innerHTML="bye value!";

//move the image
var element1=document.getElementById('img');

var marginleft=0;
function moveright()
{
    marginleft=marginleft+10;
    element1.style.marginleft=marginleft+'px';
}

element1.onclick=function()
{
    var interval=setInterval(moveright,100);
};

