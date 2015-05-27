# multitouch
Multitouch screen interface for minor project

Multi-touch Project

User Manual

Version 1

Contents

1 Introduction

2 Running the application

3 Adding a new function

4 Understanding timeouts and changing them

5 Changing styles

6 Unity Web Player games

________________________________________

1 Introduction

This user manual is intended to be used to update and maintain the application created for the Multitouch Project 2014.
This project was created for use on the NEC Multitouch screen in the main lobby of the A-building of Metropolia UAS Leppävaara campus.
This guide assumes the user is familiar with the application and any new functions to be added are ready to be implemented.
Files used:
index.html - this file is the main page of the application and contains all functions displayed such as clock, buttons etc.
buttons.js - this file is also a critical file, it contains all the functions that allow the buttons on the main page to function, such as the overlay creation and the navigation for the buttons themselves.
style.css - this file contains all the style CSS elements for the project, some functions have individual style sheets for items only used by that function.
2 Running the application
Run from the desktop shortcut for Google Chrome.
The screen is currently configured for optimal use when opening through this shortcut as it defines that Chrome should start with native Chrome touch gestures blocked, full screen enabled by default and inescapable navigation.
If migrating to a standalone mini PC it is imperative that this shortcut is replicated on the new device as without it users will be able to exit the application and access the PC.
________________________________________
3 Adding a new function

To add a new function follow the below steps, these instructions can also be found in the top comments of buttons.js.
The files used should be edited in a text editor such as notepad++
Step 1 - Create the button in the javascript file buttons.js
Open the file buttons.js from the main folder
To add a new button copy the below to the bottom of this page and change anything in capitals:
replace YOURLINKHERE with the name of your file and its path, for example:
/myFunction/newPage.html
replace YOUR INSTRUCTIONS GO HERE with your own instructions and instructions title this can also be used for credits for an application (as seen in the Espoo GuessR application)
function NEWBUTTON()
{
addOverlay("YOURLINKHERE");
$('#overlay > .wrap > .right > .wrap > .info').append('<div><p><b>Instructions:</b><ol class="instructionList"><li>YOUR INSTRUCTIONS GO HERE </li><li>YOUR INSTRUCTIONS GO HERE</li><li>YOUR INSTRUCTIONS GO HERE</li><li>YOUR INSTRUCTIONS GO HERE</li></ol></div>');
}
Save buttons.js
Step 2. 
Open index.html
There are three types of buttons at the time of writing in the application:
•	Art buttons (red) - used for drawing or other artistic purposes
•	Function buttons (blue) - used for practical functions such as the lunch menu, reittiopas and the feedback function
•	Game buttons (orange) - Link to games
To add a new button copy the below to the button section of this page and change anything in capitals:
replace BUTTONTYPE with either artButton, functionButton or gameButton
replace YOURFUNCTIONHERE with the name of your function as defined in buttons.js
<button class="BUTTONTYPE" draggable="true" onclick="YOURFUNCTIONHERE()">BUTTON TEXT HERE</button>
To keep future editing simple place your new button in the correct category.
Save index.html

________________________________________
4 Understanding timeouts and changing them
from index.html:

The timeout function appears twice in the application, for the main page where it forces a reload of the page and on the layout where it monitores touch events (touch/drag) to determine if the user is interacting with the page or not.
idleIntervalMain = setInterval(indexTimer, 60000);
This piece of javascript creates a variable that increases every 60000 milliseconds (the only thing javascript can count, dates for example are the number of milliseconds since 1st of January 1970)
This means that each time 60000milliseconds are counted the function indexTimer is run:
function indexTimer() {
    idleTimeMain++;
    if (idleTimeMain >= 120 ) { 
        location.reload();
                clearInterval(idleIntervalMain);
                resetMainTimer();
        
    }
}
This function increases the variable idleTimeMain (set at 0 on page load) by one each minute, the if statement checks the value of idleTimeMain and if it is greater or equal to 120 (2 hours) it will reload the main page, clear the interval setup (causing it to restart) and reset idleTimeMain to 0 thus beginning the whole sequence again.
The only thing to change here would be the highlighted number as this will affect the timeout interval, please note that under the current setup the minimum timeout interval is 1 minute for the timeouts.
The function works exactly the same on the overlay the script can be found under buttons.js.
________________________________________
5 Changing styles

Styles, colours or shapes are changed in a similar fashion to any webpage as it is all stored in the file name style.css, please ensure any changes to CSS3 are made compatible with webkit to ensure Chrome compatibility
The style.css sheet is clearly commented and has styles for the following functions:

1. MAIN PAGE
2. OVERLAY
3. WEATHER APP
4. FACEBOOK APP
5. POSTERS
6. CLOCK
7. IFRAME & BUTTONS
8. VIDEO PAGES
9. FEEDBACK FORM

________________________________________
6 Unity Web Player games

The original concept for the screen was to involve as many games as possible, this is easily possible by using Unity web player, if a Unity game is built for the Web Player it automatically creates all the necessary HTML.  This allows for rapid updates or new functionality to be added.
Multitouch Project Manual - Version 1
