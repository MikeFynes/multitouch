	var isIE = document.all ? true : false;
	
	var playAreaX = window.innerWidth;
	var playAreaY = window.innerHeight;

	var enemyWidth = 96; // width of enemy
	var enemyHeight = 92; // height of the enemy
	var enemyX = 141; // midpoint x-coordinate of enemy
	var enemyY = 156; // midpoint y-coordinate of enemy
	var enemyMaxX = (playAreaX-(enemyWidth/2)); // maximum x-value of enemy
	var enemyMaxY = (playAreaY-(enemyHeight/2)); // maximum y-value of enemy
	var enemyMinX = (enemyWidth/2); // minimum x-value
	var enemyMinY = (enemyHeight/2); //minimum y-value
	var enemySpeed = 3; // how many pixels enemy moves per time unit
	var enemyDir = 1; // initial direction of the moving hag
	var myVar = setInterval(mouseControl, 20); //call a function with an interval
  function rand_range(a, b) { //function for randomizing
    return Math.floor(Math.random()*(b-a+1))+a;
  }
   
  function hideExplosion() { //a function to hide the explosion on score
    document.getElementById("id_explosion").style.display = "none";
  }

  function anim() { //animates the enemy
    if (rand_range(0,20)==0){ //randomizes the direction of the enemy
    enemyDir = rand_range(1, 4);
    }
    if (enemyDir==1 && enemyY>enemyMinY) { //up
        enemyY -= enemySpeed;
    } 
    else if (enemyDir==2 && enemyX<enemyMaxX) { //right
        enemyX += enemySpeed;
    } 
    else if (enemyDir==3 && enemyY<enemyMaxY) { //down
        enemyY += enemySpeed;
    } 
    else if (enemyDir==4 && enemyX>enemyMinX) { //left
        enemyX -= enemySpeed;
    }
    var enemy = document.getElementById("id_enemy"); //define the enemy html-element
    enemy.style.left = (enemyX-(enemyWidth/2))+"px"; //move it right or left
    enemy.style.top = (enemyY-(enemyHeight/2))+"px"; //move it up or down
  }
  
  var flagWidth = 72; // width of the flag
  var flagHeight = 72; // height of the flag
  var flagX = 236; // midpoint x-coordinate of the flag in starting position
  var flagY = 236; // midpoint y-coordinate of the flag in starting position
  var flagMaxX = (playAreaX-(flagWidth/2));
  var flagMaxY = (playAreaY-(flagHeight/2));
  var flagMinX = (flagWidth/2);
  var flagMinY = (flagHeight/2);
  var flagSpeed = 10; // how many pixels flag moves per time unit
  var flagSpeed2 = 10; // how many pixels flag moves per time unit
  
  var explosionX = -745;
  var explosionY = -580;
  var explosionWidth = 71;
  var explosionHeight = 100;
  
  var mouseX;
  var mouseY;
  
  function getMousePosition(m){ //get mouse position
	if (!isIE){
  	mouseX = m.pageX;
	mouseY = m.pageY;
	}
	if (isIE){
	mouseX = event.clientX + document.body.scrollLeft;
	mouseY = event.clientY + document.body.scrollTop;
	}
	
	clearInterval(myVar); //clear the interval
	myVar = setInterval(mouseControl, 20); //set the interval for the function again
  }
  
  function mouseControl(){ //change the x and y coordinates of the flag
		if (mouseX <= flagX && mouseY<=flagY){ 
		flagX -= flagSpeed2;
		flagY -= flagSpeed2;
		}
		if (mouseX >= flagX && mouseY>=flagY){
		flagX += flagSpeed2;
		flagY += flagSpeed2;
		}
		if (mouseX <= flagX && mouseY>=flagY){
		flagX -= flagSpeed2;
		flagY += flagSpeed2;
		}
		if (mouseX >= flagX && mouseY<=flagY){ 
		flagX += flagSpeed2;
		flagY -= flagSpeed2;
		}
    var flag = document.getElementById("id_flag"); //define the html element the variable flag refers to
    flag.style.left = (flagX-(flagWidth/2))+"px"; //change it's position usin
    flag.style.top = (flagY-(flagHeight/2))+"px";
    
    var point = document.getElementById("id_score").value; //get current score
   
    for (;;){ //increase the score
    point++;
    break
    }   
    if (flagX<(enemyX+(enemyWidth/2)+(flagWidth/2)) && flagX>(enemyX-(enemyWidth/2)-(flagWidth/2)) && flagY<(enemyY+(enemyHeight/2)+(flagHeight/2)) && flagY>(enemyY-(enemyHeight/2)-(flagHeight/2))){ //check if the flag touches the enemy
    document.getElementById("id_score").value = point; //set the new score
    explosionX = enemyX; //set the explosion's coordinates
    explosionY = enemyY; 
    enemyX = rand_range(enemyMinX, enemyMaxX); //select randomly a new position for the enemy
    enemyY = rand_range(enemyMinY, enemyMaxY);	
	
    var explosion = document.getElementById("id_explosion"); //get the explosion
    explosion.style.display = "block"; //make it visible
    explosion.style.left = (explosionX-(explosionWidth/2))+"px"; //set it's position using the x and y -coordinates
    explosion.style.top = (explosionY-(explosionHeight/2))+"px";  
    setTimeout(hideExplosion, 1400); //hide the explosion after 1400ms
	} 
  }
	function ProcessKeydown(e){ //arrow key controls for the flag
		if (e.keyCode){
		keycode=e.keyCode;
		clearInterval(myVar);
		}
		else{
		keycode=e.which;
		clearInterval(myVar);
		}
	  
		if (keycode == 37 && flagX>flagMinX){ //left
			flagX -= flagSpeed;
		}
		else if (keycode == 38 && flagY>flagMinY){ //up
			flagY -= flagSpeed;
		}
		else if (keycode == 39 && flagX<flagMaxX){ //right
			flagX += flagSpeed;
		}		
		else if (keycode == 40 && flagY<flagMaxY){ //down
			flagY += flagSpeed;
		}	
    var flag = document.getElementById("id_flag"); //get the flag
    flag.style.left = (flagX-(flagWidth/2))+"px"; //set it's position using the x and y
    flag.style.top = (flagY-(flagHeight/2))+"px";
    
    var point = document.getElementById("id_score").value; //get current score
   
    for (;;){ //increase the score
    point++;
    break
    }   
    if (flagX<(enemyX+41) && flagX>(enemyX-41) && flagY<(enemyY+56) && flagY>(enemyY-56)){
    document.getElementById("id_score").value = point; //set the new score if the condition above is true (=the flag touches the enemy)
    explosionX = enemyX; //
    explosionY = enemyY; 
    enemyX = rand_range(enemyMinX, enemyMaxX); //change the spot of the enemy
    enemyY = rand_range(enemyMinY, enemyMaxY);	
	
    var explosion = document.getElementById("id_explosion"); //get explosion's corresponding html element
    explosion.style.display = "block"; //make it visible
    explosion.style.left = (explosionX-(explosionWidth/2))+"px"; //set it's position
    explosion.style.top = (explosionY-(explosionHeight/2))+"px";  
    setTimeout(hideExplosion, 1400); //hide it after 1400ms
	}  
  }