$('document').ready(function() {

function animate(obj, delay)
{
setTimeout(function() {
$(obj).children('img:nth-child('+currentImageNumber+')').css('display','block');
if((currentImageNumber-1)== 0)
{
$(obj).children('img:nth-child('+imageNumber+')').css('display','none');
}
else
{
$(obj).children('img:nth-child('+(currentImageNumber-1)+')').css('display','none');
}
currentImageNumber++;
if(currentImageNumber > imageNumber)
{

currentImageNumber = 1;
}

animate(obj, delay);
}, delay);
}

var posterWidths = 0;

var currentImageNumber = 2;

var imageNumber = 0;

$('#poster_carousel').append('<div id="images"><div id="image_container"></div></div>');

$('#poster_carousel').children('img').each(function (index, obj) {
$(obj).attr('id','poster'+(index+1));


$(obj).appendTo('#image_container');




imageNumber++;

});

$('#image_container').children('img:nth-child('+(currentImageNumber-1)+')').css('display','block');
animate($('#image_container'),4000);

});