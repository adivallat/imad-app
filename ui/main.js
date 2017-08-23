console.log('Loaded!');

var element=document.getElementById('maintext');
element.innerHTML="bye value!";

//move the image
var element1=document.getElementById('img');
element1.onclick=function()
{
    element1.style.marginLeft='100px';
};