var dog,dogImg;
var food,food_Img;
var happyDog,dogImg2;
var database = firebase.database();
var foodS = 20;
var lastFed = 0;
var foodStock;
var milk_1;
var foodObj = null;

var button1, button2;

function preload(){
dogImg= loadImage("images/dogImg.png")
dogImg2=loadImage("images/dogImg1.png")


}

function setup() {
database= firebase.database();
createCanvas(1000, 400);

foodObj=new Food()
dog= createSprite(750,200,20,20)
dog.addImage(dogImg)
dog.scale=0.15;
dog.visible = true;

happyDog = createSprite(700,210,20,20)
happyDog.scale = 0.15;
happyDog.addImage(dogImg2)
happyDog.visible = false;

button1 = createButton("Feed The Dog");
button1.position(850,60)
button1.mousePressed(feedDog)

button2 = createButton("Add Food");
button2.position(950,60);
button2.mousePressed(addFood);

var title = createElement('h2')
title.html("Virtual Pet")
title.position(800,0)

foodStock= database.ref('Food');
foodStock.on("value",readStock)

}

function draw() { 
background("lightgreen")

fill("white");
textSize(15)
if(lastFed>=12){
  text("Last Fed :"+lastFed%12+"PM",350,25);
}else if(lastFed===0){
  text("Last Fed : 12 AM",350,25);
}else{
  text("Last Fed :"+lastFed+"AM",350,25)
}

foodObj.display()
drawSprites();
}

 function readStock(data){
foodS=data.val();
}

function writeStock(x){
if(x<=0){
x=0;
}
else{
x=x-1;
}
database.ref('/').update({
Food:x
})

}

function addFood(){
  foodS++;
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  happyDog.visible = true;
  dog.visible = false;
  foodS--;
  foodObj.updateFoodStock(foodS);
  lastFed = hour();
  foodObj.updateLastFed(lastFed);
}
