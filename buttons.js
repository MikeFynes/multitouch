/*
Multitouch Project 2014

This project has been created for Media Product Project course 2014 by: Ville Hurme, Junnu Pitkänen, Pauliina Palosaari and Michael Fynes.

UPDATE INSTRUCTIONS:
ADD BUTTON TO INDEX.HTML AS DESCRIBED IN USER MANUAL OR INDEX HTML

To add a new button copy the below to the bottom of this page and change anything in capitals:

replace YOURLINKHERE with the name of your file and its path, for example:

/myFunction/newPage.html

replace YOUR INSTRUCTIONS GO HERE with your own instructions and instructions title this can also be used for credits for an application (as seen in the Espoo GuessR application)


function NEWBUTTON()
{
addOverlay("YOURLINKHERE");
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>Instructions:</b><ol class="instructionList"><li>YOUR INSTRUCTIONS GO HERE </li><li>YOUR INSTRUCTIONS GO HERE</li><li>YOUR INSTRUCTIONS GO HERE</li><li>YOUR INSTRUCTIONS GO HERE</li></ol></div>');

}

*/



var overlay = false;
var idleTime = 0;
var idleInterval;

function addOverlay(url) {

	overlay = true;
	$('body').append('<div id="overlay"><div class="wrap"><div class="left"><div class="wrap"></div></div><div class="mid"><div class="wrap"></div></div><div class="right"><div class="wrap"><div class="info"></div></div></div></div>');

	$('#overlay > .wrap > .right > .wrap').append('<button class="close" onclick="removeOverlay()">Close</button>');
	$('#overlay > .wrap > .mid > .wrap').append('<iframe class="overlayIframe" src="'+url+'" frameborder="0" id="iframeOverlay"><div id="myGrid" class="wrap"></div></iframe>');

	
	$(window.frames['iframeOverlay']).click(function(event){ resetTimer(); console.log("Reset timer on iframe click"); });
	$(window.frames['iframeOverlay']).mousemove(function (event){ resetTimer(); console.log("Reset timer on iframe move");});

	
/*	idleInterval = setInterval(timerIncrement, 60000); // 1 minute
	
	$(document).mousemove(function (e) {
        resetTimer();
		console.log("Reset timer on mouse move");
    });
    $(document).keypress(function (e) {
        resetTimer();
		console.log("Reset timer on keypress");
    });
	*/
	}

	
$(document).ready(function () {
});
/*
function resetTimer()
{
	idleTime = 0;
}

function timerIncrement() {
    idleTime++;
    if (idleTime >= 2) { // 2 minutes
        removeOverlay();
		clearInterval(idleInterval);
    }
}
*/


function removeOverlay() {
	overlay = false;
//	console.log("Removing overlay after" +idleTime+ " seconds");
	 // resetTimer();
	
	$('#overlay').remove();
}

function configToolButton()
{
addOverlay("hammer/notes.html");
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>INSTRUCTIONS:</b><br/><ol class="instructionList"><li> Double tap the canvas to create a note </li><li> Drag notes by holding finger down and dragging </li><li> Use two fingered pinch to resize </li><li> Create multiple notes, rotate and overlap them to test the application </li><li> tap & hold on top of a note to open the note specific menu </li><li> Use available menu buttons to do actions</li></ol></div>');
} 

function lunchButton()
{
addOverlay("lunch/index.html");
}

function clickGameButton()
{
addOverlay("clickgame/index.html");
}
function sketchMultiButton()
{
addOverlay("draw/index.html");
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>INSTRUCTIONS:</b><ol class="instructionList"><li>Single touch drawing board </li><li> Click square to change colours </li><li>Slide bar to increase brush size</li><li> Tap eraser or paint bucket to change brush type</li><li> Press X to clear the canvas</li></ol></div>');


}

function weatherButton()
{
addOverlay("weather/index.html");
$('#overlay > .wrap > .mid').append('<div id="weatherBlock"></div>');
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>Links temporarily disabled</b></div>');

}

function superSeizure()
{
addOverlay("http://gogela.com/tkjsr/");
$('#overlay > .wrap > .mid').append('<div id="weatherBlock"></div>');
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>Links temporarily disabled</b></div>');
}

function ronJeremy()
{
addOverlay("ronJeremy.html");
}
function artButton()
{
addOverlay("draw/sketch/examples/drawing.html");
}
function particleButton()
{
addOverlay("draw/sketch/examples/particles.html");
}
function reittiopasButton()
{
// addOverlay("reittiopas/index.html"); //
addOverlay("reittiopas/");
}
function lepoButton()
{
addOverlay("lepo/index.html");

}
function espooGuesserButton()
{
addOverlay("http://users.metropolia.fi/~semg/Geoguesser/mpp/geoG-02/geoG-02");
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>MADE BY:</b><br/><br/><p>Sem Gebresilassie</p><p>Silas Macharia</p><p>Islam Md Saiful</p><p>Eyob Woldegiorgis</p></div>');
}
function lpButton()
{
addOverlay("http://users.metropolia.fi/~quocle/lp_multitouch/lp_multitouch.html");
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>INSTRUCTIONS:</b><ol class="instructionList"><li>Save your planet! </li><li>Hold to fire more missiles </li><li>Planet gets bigger the longer you survive!</li><li>But it will get smaller the more it gets hit!</li></ol></div>');

}

function feedbackButton()
{
addOverlay("feedback.html");
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>MADE BY:</b><br/><br/><p>Michael Fynes</p><p>Pauliina Palosaari</p><p>Junnu Pitk&auml;nen</p><p>Ville Hurme</p></div>');
}
function flappyButton()
{
addOverlay("Flappy/FlappyWorkerWebFinal.html");
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>MADE BY:</b><br/><br/><p>Badass Penguin</p><p>Tap to begin</p><p>How far can you go?</p><p>Get Flapping!</p></div>');
}