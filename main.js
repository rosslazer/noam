$( "#paster" ).click(function() {
  processText($("#rawtext").val());
});

var canvas = document.getElementById('treeCanvas')

var fontheight = 20;


var dragok = false;


canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
  var x = event.x;
  var y = event.y;


  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

for (var i = 0; i < textNodes.length; i++) {

	var currentNode = textNodes[i];

	if ((x >= currentNode.start) && (x <= currentNode.end ))
	{
		
		  alert("Inside: " + currentNode.text);

	}

	}

  //alert("x:" + x + " y:" + y);
}




var textNodes = [];

function processText(text) {

	var starting = 10;
	var padding = 20;
	var words = text.split(' ');
	console.log(words);
	for (var i = 0; i < words.length; i++) {
		console.log(words[i]);
		var width = draw(words[i], starting);
		newstarting = starting + width + padding;


		var newNode = new textNode(starting, newstarting, words[i]);


  var ctx = canvas.getContext('2d');

ctx.fillStyle = "red";
ctx.fillRect(starting, 450, width, -1000 );

		textNodes.push(newNode);

		starting = newstarting

	}
}


function draw(text, offset) {

  var canvas = document.getElementById('treeCanvas')
  var ctx = canvas.getContext('2d');
ctx.fillStyle = "black";

  ctx.font = fontheight +"px serif";

  ctx.fillText(text, offset, 490);
  return ctx.measureText(text).width;


}


var textNode = function (start,end, text) {
  this.start = start;
  this.end = end;
  this.text = text;

  this.label = 0;

};

// Person.prototype.sayHello = function() {
//   console.log("Hello, I'm " + this.firstName);
// };

// var person1 = new Person("Alice");
// var person2 = new Person("Bob");

// // call the Person sayHello method.
// person1.sayHello(); // logs "Hello, I'm Alice"
// person2.sayHello(); // logs "Hello, I'm Bob"


// var c=document.getElementById("treeCanvas");
// var ctx=c.getContext("2d");
// ctx.font="30px Arial";
// var txt="Hello World"
// ctx.fillText("width:" + ctx.measureText(txt).width,10,50)
// ctx.fillText(txt,10,100);



    canvas.onclick = function (event)
    {
        if (event.region) {
            alert('You clicked ' + event.region);
        }
    }


















function myMove(e){
 if (dragok){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
 }
}

function myDown(e){
 if (e.pageX < x + 15 + canvas.offsetLeft && e.pageX > x - 15 +
 canvas.offsetLeft && e.pageY < y + 15 + canvas.offsetTop &&
 e.pageY > y -15 + canvas.offsetTop){
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
  dragok = true;
  canvas.onmousemove = myMove;
 }
}

function myUp(){
 dragok = false;
 canvas.onmousemove = null;
}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
