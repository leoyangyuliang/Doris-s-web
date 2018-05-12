var data;
var paragraph;
var info = "";
var jsondata="";
var style_start ="<label style=" + " border-collapse:collapse;border-style:solid;border-width:medium;height:10px;"+ " >";
var style_end = "</label>";
var table;
var items;
var fetchTest;
var clock;
var china_clock;
var time = "";
var china_time = "";
var img;
var canvas;
var hr;
var mn;
var sc;
var angle =0;


function calcTime(city, offset) {
    // create Date object for current location
    var d = new Date();
    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return city +"<br>"+ nd.toLocaleString();
}

 // alert(calcTime('洛杉矶', '0'));
 // alert(calcTime('广州', '8'));



function fetchData123(fetchTest, name){
		  $.ajax({
		    type:'GET',
		    dataType :'json',
        data: {"name":name},
		    url:'/check',
				async: false,
		    success: myCallback,
			});
}

function myCallback(fetch) {
 		//alert("ajax callaback response:"+JSON.stringify(fetch));
  fetchTest =JSON.stringify(fetch);
}

//console.log(fetchTest);

function preload(){
  //fetchData123(fetchTest);
	// data = loadJSON("sample.json");
	// sun = loadImage("/sun.png");
	// moon = loadImage("/moon.png");
	earth = loadImage("/earth2.jpg");
}

function setup() {
  //
	// angleMode(DEGREES);
	//   hr = hour();
	//   mn = minute();
	//   sc = second();

	clock = createP(time);
	clock.id('clock');
	clock.position(100,120);
  china_clock = createP(china_time);
  china_clock.id('china_clock');
  china_clock.position(400,120);


	 //draw moon and sun
	 canvas = createCanvas(1000	,450,WEBGL);
	 // if(sc < 50)
	 // {
		//  texture(moon)
		//  plane(50);
	 // }
	 // else{
	 // 	image(sun,0,-30,400,400);
	 // }


	paragraph = createDiv(info);

	// dataSection = createP(jsondata);
	/*
	dropzone = createP("Drag and Drop Files here");
	dropzone.style("border-style","dashed");
	dropzone.style("background-color","gray");
	dropzone.style("padding","40px");
	dropzone.style("width", "50%");
	dropzone.style("text-align","center");
	*/
	//paragraph.hide();
	//get value from user input to js
	var names = document.getElementById("name");



	names.addEventListener("keypress", function (e) {
		var key = e.which || e.keyCode;
 		if (key === 13) { // 13 is enter
    fetchData123(fetchTest, names.value);
	 	showInfo();
 }

	});



	var findbotton = document.getElementById("find");
	//check if button clicked
	findbotton.addEventListener("click",function(){
    fetchData123(fetchTest, names.value);
    showInfo();
  });
	// render results

	function showInfo(){


		paragraph.remove();
		/*

		if(names.value=="wtf")
		{
			dropzone.show();
			uploadData();
		}
		else{
		*/
		info = "查询结果："+"<br>";
		info += "<table style="+"border-collapse:collapse;width:100%"+">";
		info += "<tr>"+
		"<th>"+"时间"+"</th>"+
		"<th>"+"地址"+"</th>"+
		"<th>"+"快递单号"+"</th>"+
		"<th>"+"查询网址"+"</th>"+
		"</tr>";

		names.value = names.value.replace( /\s/g, "")


		var data = JSON.parse(fetchTest);
		for(var i =0; i<data.length; i++)
		{
			//console.log(fetchTest[i]);

			if(names.value == data[i].收件人姓名)
			{
				//<label>Click me <input type="text"></label>
				var tracking = data[i].第三方单号;
				var shen = data[i].收件人所在省;
				var	shi = data[i].收件人所在市;
				var time = "";
				for(var j=0;j<10;j++)
				{
					time += data[i].创建时间[j];
				}

        if(data[i].快递公司.toLowerCase()=='y')
        {
				//var time = data[i].创建时间;
				info += "<tr>"+
				"<td>"+time+"</td>"+
				"<td>"+shen+shi+"</td>"+
				"<td>"+tracking+"</td>"+
				"<td>"+ "<a style="+"color:DodgerBlue;"+" href="
				+ "http://shiningogo.com/batchWaybillQuery?waybillNum="+tracking+" "
				+" target="+"_blank"+ ">" + "<img src=" + "link.png" +" width="+"16"+" height="+"16"+ ">" + " 查询网址" + "</a>" +"</td>"+
				"</tr>";
        }
        else if(data[i].快递公司.toLowerCase()=='h')
        {
        //var time = data[i].创建时间;
        info += "<tr>"+
        "<td>"+time+"</td>"+
        "<td>"+shen+shi+"</td>"+
        "<td>"+tracking+"</td>"+
        "<td>"+ "<a style="+"color:DodgerBlue;"+" href="
        + "http://www.highsince.com/track/index.php?track_number="+tracking+" "
        +" target="+"_blank"+ ">" + "<img src=" + "link.png" +" width="+"16"+" height="+"16"+ ">" + " 查询网址" + "</a>" +"</td>"+
        "</tr>";
        }
				//"<tr>"+"<th>"+"Firstname"+"</th>"+"<th>"+"Lastname"+"</th>"+"<th>"+"Age"+"</th>"+"</tr>";
				// info += style_start + "快递单号: " + style_end + tracking
				// + "<br>" + style_start + "时间: " + style_end + time
				// + " 地址： "
				//   + shen+shi + "</br>"
				// + "<a href=" + "https://www.shiningexpress.com/r/index.html"
				// +" target="+"_blank"+ ">" + "查询网址" + "</a>" + "<br>";
				//itemname = json.item[i].物品名称(中文);
			}
	}
	info += "</table>";
paragraph = createDiv(info);
paragraph.show();
info ="";
	//tip.hide();
}
// createCanvas(400,400,WEBGL)
}

//manage database
/*
function uploadData(){
	dropzone.dragOver(hightlight);
	dropzone.dragLeave(unhightlight);
	dropzone.drop(gotFile,unhightlight);
	for(var i=0; i<data.item.length; i++)
	{
		jsondata += i+ data.item[i].收件人姓名+ "<br>";
	}
	dataSection=createP(jsondata);
	dataSection.show();
}
function gotFile(file){

	var parser = new DOMParser();
	var xml = parser.parseFromString(file.data, "text/xml");
	var infoToRender="";
	//var xml1 = xml.getElementsByTagName('Worksheet');
	console.log(typeof(xml));
	console.log(xml.getElementsByTagName("Row")[0].childNodes[0].textContent);
	for(var j = 0; j<xml.getElementsByTagName("Row").length;j++)
	{

	for(var i = 0; i < xml.getElementsByTagName("Row")[0].childNodes.length; i++)
	{
		infoToRender +=xml.getElementsByTagName("Row")[j].childNodes[i].textContent + " ";
	}
	infoToRender +=  "<br>("+(j+1)+ ") " ;
}
	createP(infoToRender);
}
function hightlight(){
		dropzone.style("background-color","red");
}
function unhightlight(){
		dropzone.style("background-color","gray");
}
*/


 function draw() {

	 time = calcTime('美国洛杉矶', '-7');
	 clock.html(time);
	 china_time = calcTime('北京时间', '8');
	 china_clock.html(china_time);
   //
	 // let dx = mouseX - width / 2;
		// let dy = mouseY - height / 2;
  	// let v = createVector(dx, dy, 0);
  	// v.div(100);

 		// //draw 3D earth
	 push();
	 translate(150,0,0);
	 background(0,0,0,0);
	 noStroke();
	 //ambientLight(200,200,200,0,0,1);
	 directionalLight(180,225,255,-1,0.1,0.4);
	 //ambientLight(0,0,255);
	 //normalMaterial(100,200,255);
    angle = angle+1;
	 texture(earth);
	 rotateY(angle*0.005);
	 scale(0.7);
	 sphere(150);
	 pop();

 }
//
// 	 //draw sun
// 	 // push();
// 	 // translate(-300,0,0);
// 	 // directionalLight(255,255,255,1,0,1);
// 	 // texture(sun);
// 	 // plane(400);
// 	 // pop();
//
// 	 // angle = angle+1;
// }
// function mousePressed() {
// 	push();
// 	rotateY(mouseX);
// 	sphere(150);
// 	pop();
// }

 //document.getElementById("clock").innerHTML = time;
