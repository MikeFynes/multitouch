function routeTable(legs, number, walking, coordArray, bounds, duration){
	//option="<table id='option2' class='option'><tr><th>"+number+"</th>";
	route="<table class='route'><tr><th colspan='2'>"+number+"</th></tr>";
	for(var i = 0;i < legs.length;i++){
		var depTime = legs[i].locs[0].depTime;
		var stopName = legs[i].locs[0].name;
		var lineName = legs[i].code;
		if (legs[i].type == "walk") {
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/walk.gif' class='icon'></td><td class='stopcell'>";
			//option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/walk.gif' class='icon'><br>";
			/*if(((legs[i].length)/1000).toFixed(1)<0.1){
				option+="<0.1";
			}
			else{
				option+=((legs[i].length)/1000).toFixed(1);
			}
			option+=" km<td>";*/
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+=" <span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
					//walking=walking+legs[i].length;
				}
			}
			route+="</td></tr>";
		}
		else if(legs[i].type == 12){
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/train.gif' class='icon'><br><span class='linename'>"+lineName.substr(lineName.length-3).substr(0,1)+"-train</span></td><td class='stopcell'>";
			//option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/train.gif' class='icon'><br><span class='linename'>"+lineName.substr(lineName.length-3).substr(0,1)+"-train</span></td>"
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+="<span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
				}
			}
			route+="</td></tr>";
		}
		else if(legs[i].type == 2){
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/tram.gif' class='icon'><br><span class='linename'>Tram "+lineName.substr(lineName.length-4).substr(0,1)+"</span></td><td class='stopcell'>";
			//option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/tram.gif' class='icon'><br><span class='linename'>Tram "+lineName.substr(lineName.length-4).substr(0,1)+"</span></td>";
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+=" <span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
				}
			}
			route+="</td></tr>";
		}
		else if(legs[i].type == 1 || legs[i].type == 3 || legs[i].type == 4 || legs[i].type == 5 || legs[i].type == 8){
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/bus.gif' class='icon'><br><span class='linename'>Bus "+lineName.substr(lineName.length-5).substr(0,2)+"</span></td><td class='stopcell'>";
			//option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/bus.gif' class='icon'><br><span class='linename'>Bus "+lineName.substr(lineName.length-5).substr(0,2)+"</span></td>"
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+=" <span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
				}
			}
			route+="</td></tr>";
		}
		else if(legs[i].type == 6){
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/metro.gif' class='icon'>";
			//option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/metro.gif' class='icon'><br><span class='linename'>Metro</span></td>";
			if(lineName.substr(lineName.length-1) == "2"){
				route+="<br><span class='linename'>Ruoholahti</span>";
			}
			else if(lineName.substr(lineName.length-1) == 1 && lineName.substr(lineName.length-3).substr(0,1) == "M"){
				route+="<br><span class='linename'>Mellunmäki</span>";
			}
			else if(lineName.substr(lineName.length-1) == 1 && lineName.substr(lineName.length-3).substr(0,1) == "V"){
				route+="<br><span class='linename'>Vuosaari</span>";
			}
			route+="</td><td class='stopcell'>";
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+=" <span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
				}
			}
			route+="</td></tr>";
		}
			var locs = legs[i].locs;
			for(var j = 0;j < locs.length;j++){
				var point = new google.maps.LatLng(locs[j].coord.y, locs[j].coord.x);
				coordArray.push(point);
				bounds.extend(point);
			}
		}
		route+="<tr><td class='stats'>Duration:<br>Distance:</td><td>"+Math.ceil((duration)/60)+" min<br>"+Math.ceil((obj[1][0].length)/1000)+" km</td></tr></table>";
		//option+="<td>Walking:<br>"+(walking/1000).toFixed(1)+" km<br>Duration:<br>"+Math.ceil((duration)/60)+" min</td></tr>"
}

/*for(var i = 0;i < legs1.length;i++){
	var depTime = legs1[i].locs[0].depTime;
	var stopName = legs1[i].locs[0].name;
	var lineName = legs1[i].code;
	if (legs1[i].type == "walk") {
		route1+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/walk.gif' class='icon'></td><td class='stopcell'>";
		option1+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/walk.gif' class='icon'><br>";
		if(((legs1[i].length)/1000).toFixed(1)<0.1){
			option1+="<0.1";
		}
		else{
			option1+=((legs1[i].length)/1000).toFixed(1);
		}
		option1+=" km<td>";
		for (var z=0;z<legs1[i].locs.length;z++){
			if(legs1[i].locs[z].name !==null){
				route1+=" <span class='stopname'>"+legs1[i].locs[z].name+"</span><br>";
				walking1=walking1+legs1[i].length;
			}
		}
		route1+="</td></tr>";
	}
	else if(legs1[i].type == 12){
		route1+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/train.gif' class='icon'><br><span class='linename'>"+lineName.substr(lineName.length-3).substr(0,1)+"-train</span></td><td class='stopcell'>";
		option1+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/train.gif' class='icon'><br><span class='linename'>"+lineName.substr(lineName.length-3).substr(0,1)+"-train</span></td>"
		for (var z=0;z<legs1[i].locs.length;z++){
			if(legs1[i].locs[z].name !==null){
				route1+="<span class='stopname'>"+legs1[i].locs[z].name+"</span><br>";
			}
		}
		route1+="</td></tr>";
	}
	else if(legs1[i].type == 2){
		route1+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/tram.gif' class='icon'><br><span class='linename'>Tram "+lineName.substr(lineName.length-4).substr(0,1)+"</span></td><td class='stopcell'>";
		option1+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/tram.gif' class='icon'><br><span class='linename'>Tram "+lineName.substr(lineName.length-4).substr(0,1)+"</span></td>";
		for (var z=0;z<legs1[i].locs.length;z++){
			if(legs1[i].locs[z].name !==null){
				route1+=" <span class='stopname'>"+legs1[i].locs[z].name+"</span><br>";
			}
		}
		route1+="</td></tr>";
	}
	else if(legs1[i].type == 1 || legs1[i].type == 3 || legs1[i].type == 4 || legs1[i].type == 5 || legs1[i].type == 8){
		route1+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/bus.gif' class='icon'><br><span class='linename'>Bus "+lineName.substr(lineName.length-5).substr(0,2)+"</span></td><td class='stopcell'>";
		option1+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/bus.gif' class='icon'><br><span class='linename'>Bus "+lineName.substr(lineName.length-5).substr(0,2)+"</span></td>"
		for (var z=0;z<legs1[i].locs.length;z++){
			if(legs1[i].locs[z].name !==null){
				route1+=" <span class='stopname'>"+legs1[i].locs[z].name+"</span><br>";
			}
		}
		route1+="</td></tr>";
	}
	else if(legs1[i].type == 6){
		route1+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/metro.gif' class='icon'>";
		option1+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/metro.gif' class='icon'><br><span class='linename'>Metro</span></td>";
		if(lineName.substr(lineName.length-1) == "2"){
			route1+="<br><span class='linename'>Ruoholahti</span>";
		}
		else if(lineName.substr(lineName.length-1) == 1 && lineName.substr(lineName.length-3).substr(0,1) == "M"){
			route1+="<br><span class='linename'>Mellunmäki</span>";
		}
		else if(lineName.substr(lineName.length-1) == 1 && lineName.substr(lineName.length-3).substr(0,1) == "V"){
			route1+="<br><span class='linename'>Vuosaari</span>";
		}
		route1+="</td><td class='stopcell'>";
		for (var z=0;z<legs1[i].locs.length;z++){
			if(legs1[i].locs[z].name !==null){
				route1+=" <span class='stopname'>"+legs1[i].locs[z].name+"</span><br>";
			}
		}
		route1+="</td></tr>";
	}
		var locs = legs1[i].locs;
		for(var j = 0;j < locs.length;j++){
			var point = new google.maps.LatLng(locs[j].coord.y, locs[j].coord.x);
			coordArray1.push(point);
			bounds1.extend(point);
		}
	}
	route1+="<tr><td class='stats'>Duration:<br>Distance:</td><td>"+Math.ceil((obj[0][0].duration)/60)+" min<br>"+Math.ceil((obj[0][0].length)/1000)+" km</td></tr></table>";
	option1+="<td class='optionstats'>Walking:<br>"+(walking1/1000).toFixed(1)+" km<br>Duration:<br>"+Math.ceil((obj[0][0].duration)/60)+" min</td></tr></table>"
	
	for(var i = 0;i < legs2.length;i++){
	var depTime = legs2[i].locs[0].depTime;
	var stopName = legs2[i].locs[0].name;
	var lineName = legs2[i].code;
	if (legs2[i].type == "walk") {
		route2+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/walk.gif' class='icon'></td><td class='stopcell'>";
		option2+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/walk.gif' class='icon'><br>";
		if(((legs2[i].length)/1000).toFixed(1)<0.1){
			option2+="<0.1";
		}
		else{
			option2+=((legs2[i].length)/1000).toFixed(1);
		}
		option2+=" km<td>";
		for (var z=0;z<legs2[i].locs.length;z++){
			if(legs2[i].locs[z].name !==null){
				route2+=" <span class='stopname'>"+legs2[i].locs[z].name+"</span><br>";
				walking2=walking2+legs2[i].length;
			}
		}
		route2+="</td></tr>";
	}
	else if(legs2[i].type == 12){
		route2+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/train.gif' class='icon'><br><span class='linename'>"+lineName.substr(lineName.length-3).substr(0,1)+"-train</span></td><td class='stopcell'>";
		option2+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/train.gif' class='icon'><br><span class='linename'>"+lineName.substr(lineName.length-3).substr(0,1)+"-train</span></td>"
		for (var z=0;z<legs2[i].locs.length;z++){
			if(legs2[i].locs[z].name !==null){
				route2+="<span class='stopname'>"+legs2[i].locs[z].name+"</span><br>";
			}
		}
		route2+="</td></tr>";
	}
	else if(legs2[i].type == 2){
		route2+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/tram.gif' class='icon'><br><span class='linename'>Tram "+lineName.substr(lineName.length-4).substr(0,1)+"</span></td><td class='stopcell'>";
		option2+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/tram.gif' class='icon'><br><span class='linename'>Tram "+lineName.substr(lineName.length-4).substr(0,1)+"</span></td>";
		for (var z=0;z<legs2[i].locs.length;z++){
			if(legs2[i].locs[z].name !==null){
				route2+=" <span class='stopname'>"+legs2[i].locs[z].name+"</span><br>";
			}
		}
		route2+="</td></tr>";
	}
	else if(legs2[i].type == 1 || legs2[i].type == 3 || legs2[i].type == 4 || legs2[i].type == 5 || legs2[i].type == 8){
		route2+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/bus.gif' class='icon'><br><span class='linename'>Bus "+lineName.substr(lineName.length-5).substr(0,2)+"</span></td><td class='stopcell'>";
		option2+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/bus.gif' class='icon'><br><span class='linename'>Bus "+lineName.substr(lineName.length-5).substr(0,2)+"</span></td>"
		for (var z=0;z<legs2[i].locs.length;z++){
			if(legs2[i].locs[z].name !==null){
				route2+=" <span class='stopname'>"+legs2[i].locs[z].name+"</span><br>";
			}
		}
		route2+="</td></tr>";
	}
	else if(legs2[i].type == 6){
		route2+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/metro.gif' class='icon'>";
		option2+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/metro.gif' class='icon'><br><span class='linename'>Metro</span></td>";
		if(lineName.substr(lineName.length-1) == "2"){
			route2+="<br><span class='linename'>Ruoholahti</span>";
		}
		else if(lineName.substr(lineName.length-1) == 1 && lineName.substr(lineName.length-3).substr(0,1) == "M"){
			route2+="<br><span class='linename'>Mellunmäki</span>";
		}
		else if(lineName.substr(lineName.length-1) == 1 && lineName.substr(lineName.length-3).substr(0,1) == "V"){
			route2+="<br><span class='linename'>Vuosaari</span>";
		}
		route2+="</td><td class='stopcell'>";
		for (var z=0;z<legs2[i].locs.length;z++){
			if(legs2[i].locs[z].name !==null){
				route2+=" <span class='stopname'>"+legs2[i].locs[z].name+"</span><br>";
			}
		}
		route2+="</td></tr>";
	}
		var locs = legs2[i].locs;
		for(var j = 0;j < locs.length;j++){
			var point = new google.maps.LatLng(locs[j].coord.y, locs[j].coord.x);
			coordArray2.push(point);
			bounds2.extend(point);
		}
	}
	route2+="<tr><td class='stats'>Duration:<br>Distance:</td><td>"+Math.ceil((obj[1][0].duration)/60)+" min<br>"+Math.ceil((obj[1][0].length)/1000)+" km</td></tr></table>";
	option2+="<td class='optionstats'>Walking:<br>"+(walking2/1000).toFixed(1)+" km<br>Duration:<br>"+Math.ceil((obj[1][0].duration)/60)+" min</td></tr></table>"
	*/