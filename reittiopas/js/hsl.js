$('document').ready(function() {
var url="http://users.metropolia.fi/~junnup/eServices/hsl.php?";
var fromAddress;
var toAddress;
var fromLatLng;
var toLatLng;
var coordArray1=[];
var coordArray2=[];
var coordArray3=[];
var coordArray4=[];
var coordArray5=[];

var multiple1 = false;
var multiple2 = false;

var closeButton1="<button id='close1'>x</button>";
var closeButton2="<button id='close2'>x</button>";

var map;
var poly;
$("#isend").click(function() {
	if(multiple1){
		fromAddress=$("#fromlist").val();
		if(multiple2){
			toAddress=$("#tolist").val();
		}
		else{
			toAddress=$("#ito").val();
		}
	}
	else if(multiple2){
		toAddress=$("#tolist").val();
		if(multiple1){
			fromAddress=$("#fromlist").val();
		}
		else{
			fromAddress=$("#ifrom").val();
		}
	}
	else{
		fromAddress=$("#ifrom").val();
		toAddress=$("#ito").val();
	}
	if(fromAddress.length>0 && toAddress.length>0){
		geocodeFrom(fromAddress);
	}
});

$("#ireset").click(function(){
	location.reload();
});

function geocodeFrom(location){
	request="user=junnupit&pass=inmdnu11x6&request=geocode&key="+location.replace(/ /g,"+");
	$.ajax({
		url: url,
		data: request,
		success: cleaningFrom
	});
}

function geocodeTo(location){
	request="user=junnupit&pass=inmdnu11x6&request=geocode&key="+location.replace(/ /g,"+");
	$.ajax({
		url: url,
		data: request,
		success: cleaningTo
	});
}

function cleaningFrom(data){
	var obj=$.parseJSON(data);
	if(obj.length>1){
		var fromList="<select id='fromlist'>"
		$.each(obj, function(){
			fromList+="<option id='"+this['coords']+"'>"+this['name']+", "+this['city']+"</option>";
		});
		fromList+="</select>";
		$('#fromcell').html(fromList);
		fromLatLng=$('#fromlist option:selected').attr('id');
		multiple1 = true;
		$("#closecell1").html(closeButton1);
		$("#close1").click(function(){
			$("#fromcell").html("<input type='text' name='ifrom' id='ifrom'>");
			$("#closecell1").html("");
			multiple1=false;
		});
	}
	else{
		$.each(obj, function(){
			fromLatLng=this['coords'];
		});
	}
	geocodeTo(toAddress);
}

function cleaningTo(data){
	var obj=$.parseJSON(data);
	if(obj.length>1){
		var toList="<select id='tolist'>"
		$.each(obj, function(){
			toList+="<option id='"+this['coords']+"'>"+this['name']+", "+this['city']+"</option>";
		});
		toList+="</select>";
		$('#tocell').html(toList);
		toLatLng=$('#tolist option:selected').attr('id');
		multiple2 = true;
		$("#closecell2").html(closeButton2);
		$("#close2").click(function(){
			$("#tocell").html("<input type='text' name='ito' id='ito'>");
			$("#closecell2").html("");
			multiple2 = false;
		});
	}
	else{
		$.each(obj, function(){
			toLatLng=this['coords'];
		});	
	}
	routing(fromLatLng, toLatLng);
}

function routing(from, to){
	request="user=junnupit&pass=inmdnu11x6&request=route&from="+from+"&to="+to+"&show=5&epsg_out=4326";
	$.ajax({
		url: url,
		data: request,
		success: builder
	});
}

function builder(data){
	var obj = $.parseJSON(data);
	coordArray1.length=0;
	coordArray2.length=0;
	coordArray3.length=0;
	coordArray4.length=0;
	coordArray5.length=0;
	var bounds1= new google.maps.LatLngBounds();
	var bounds2= new google.maps.LatLngBounds();
	var bounds3= new google.maps.LatLngBounds();
	var bounds4= new google.maps.LatLngBounds();
	var bounds5= new google.maps.LatLngBounds();
	
	var legs1 = obj[0][0].legs;
	var legs2 = obj[1][0].legs;
	var legs3 = obj[2][0].legs;
	var legs4 = obj[3][0].legs;
	var legs5 = obj[4][0].legs;
	
	var duration1 = obj[0][0].duration
	var duration2 = obj[1][0].duration
	var duration3 = obj[2][0].duration
	var duration4 = obj[3][0].duration
	var duration5 = obj[4][0].duration
	
	option1 = optionTable(legs1, 1, coordArray1, bounds1, duration1);
	route1 = routeTable(legs1, 1, coordArray1, bounds1, duration1);
	option2 = optionTable(legs2, 2, coordArray2, bounds2, duration2);
	route2 = routeTable(legs2, 2, coordArray2, bounds2, duration2);
	option3 = optionTable(legs3, 3, coordArray3, bounds3, duration3);
	route3 = routeTable(legs3, 3, coordArray3, bounds3, duration3);
	option4 = optionTable(legs4, 4, coordArray4, bounds4, duration4);
	route4 = routeTable(legs4, 4, coordArray4, bounds4, duration4);
	option5 = optionTable(legs5, 5, coordArray5, bounds5, duration5);
	route5 = routeTable(legs5, 5, coordArray5, bounds5, duration5);
	
	function optionTable(legs, number, coordArray, bounds, duration){
	var option="<table id='option"+number+"' class='option'><tr><th>"+number+"</th>";
	var walking=0;
	for(var i = 0;i < legs.length;i++){
		var depTime = legs[i].locs[0].depTime;
		var stopName = legs[i].locs[0].name;
		var lineName = legs[i].code;
		if (legs[i].type == "walk") {
			option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/walk.gif' class='icon'><br><span class='time'>";
			if(((legs[i].length)/1000).toFixed(1)<0.1){
				option+="<0.1";
				walking=walking+0.1;
			}
			else{
				option+=((legs[i].length)/1000).toFixed(1);
				walking=walking+legs[i].length;
			}
			option+=" km</span><td>";
		}
		else if(legs[i].type == 12){
			option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/train.gif' class='icon'><br><span class='linename'>"+lineName.substr(lineName.length-3).substr(0,1)+"-train</span></td>"

		}
		else if(legs[i].type == 2){
			option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/tram.gif' class='icon'><br><span class='linename'>Tram "+lineName.substr(lineName.length-4).substr(0,1)+"</span></td>";
		}
		else if(legs[i].type == 1 || legs[i].type == 3 || legs[i].type == 4 || legs[i].type == 5 || legs[i].type == 8){
			option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/bus.gif' class='icon'><br><span class='linename'>Bus "+lineName.substr(lineName.length-5).substr(0,2)+"</span></td>"
		}
		else if(legs[i].type == 6){
			option+="<td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/metro.gif' class='icon'><br><span class='linename'>Metro</span></td>";
		}
	}
		option+="<td class='statscell'><span class='statistics'> Walking:<br>"+(walking/1000).toFixed(1)+" km<br>Duration:<br>"+Math.ceil((duration)/60)+" min</span></td></tr></table>"
	return option;
}
function routeTable(legs, number, coordArray, bounds, duration){
	var route="<table class='route'><tr><th colspan='2'>"+number+"</th></tr>";
	for(var i = 0;i < legs.length;i++){
		var depTime = legs[i].locs[0].depTime;
		var stopName = legs[i].locs[0].name;
		var lineName = legs[i].code;
		if (legs[i].type == "walk") {
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/walk.gif' class='icon'></td><td class='stopcell'>";
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+=" <span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
				}
			}
			route+="</td></tr>";
		}
		else if(legs[i].type == 12){
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/train.gif' class='icon'><br><span class='linename'>"+lineName.substr(lineName.length-3).substr(0,1)+"-train</span></td><td class='stopcell'>";
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+="<span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
				}
			}
			route+="</td></tr>";
		}
		else if(legs[i].type == 2){
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/tram.gif' class='icon'><br><span class='linename'>Tram "+lineName.substr(lineName.length-4).substr(0,1)+"</span></td><td class='stopcell'>";
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+=" <span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
				}
			}
			route+="</td></tr>";
		}
		else if(legs[i].type == 1 || legs[i].type == 3 || legs[i].type == 4 || legs[i].type == 5 || legs[i].type == 8){
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/bus.gif' class='icon'><br><span class='linename'>Bus "+lineName.substr(lineName.length-5).substr(0,2)+"</span></td><td class='stopcell'>";
			for (var z=0;z<legs[i].locs.length;z++){
				if(legs[i].locs[z].name !==null){
					route+=" <span class='stopname'>"+legs[i].locs[z].name+"</span><br>";
				}
			}
			route+="</td></tr>";
		}
		else if(legs[i].type == 6){
			route+="<tr><td><span class='time'>"+depTime.substr(depTime.length - 4).substr(0,2)+":"+depTime.substr(depTime.length - 4).substr(2,3)+"</span><br><img src='img/metro.gif' class='icon'>";
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
		route+="<tr><td class='stats'>Duration:<br>Distance:</td><td>"+Math.ceil((duration)/60)+" min<br>"+Math.ceil((obj[0][0].length)/1000)+" km</td></tr></table>";
	return route;
	}
	
	$("#search").css("float", "left");
	$("#search").css("margin", "5px");
	$("#options").css("display", "block");
	$("#directions").css("display", "block");
	$("#map").css("display", "block");
	$("#directions").html(route1);
	var content = option1+"<hr>"+option2+"<hr>"+option3+"<hr>"+option4+"<hr>"+option5;
	$("#options").html(content);
	$(".stopcell span:first-child").addClass("highlight");
	
	var mapOptions = {
    zoom: 16,
    center: coordArray1[0],
    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
	
	mapping(coordArray1, bounds1);
	
	$('#option1').click(function(){
		$("#directions").html(route1);
		mapping(coordArray1, bounds1);
	});

	$('#option2').click(function(){
		$("#directions").html(route2);
		mapping(coordArray2, bounds2);
	});

	$('#option3').click(function(){
		$("#directions").html(route3);
		mapping(coordArray3, bounds3);
	});

	$('#option4').click(function(){
		$("#directions").html(route4);
		mapping(coordArray4, bounds4);
	});

	$('#option5').click(function(){
		$("#directions").html(route5);
		mapping(coordArray5, bounds5);
	});
}

function mapping(coordArray, bounds){

	if(poly){
		poly.setMap(null);
	}
	
	$(".stopcell span:first-child").addClass("highlight");
	
	poly = new google.maps.Polyline({
		path: coordArray,
		geodesic: false,
		strokeColor: '#444444',
		strokeOpacity: 1.0,
		strokeWeight: 2
  });
	poly.setMap(map);
	map.fitBounds(bounds);
}

});