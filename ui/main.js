//console.log('Loaded!');

/*var element=document.getElementById('maintext');
element.innerHTML="bye value!";

//move the image
var element1=document.getElementById('img');

var marginleft=0;
function moveright()
{
    marginleft=marginleft+10;
    element1.style.marginLeft=marginLeft+'px';
}

element1.onclick=function()
{
    var interval=setInterval(moveright,100);
};
*/

var button=document.getElementById('counter');
button.onclick=function()
{
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
}