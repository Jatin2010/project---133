status = false;
TV_image = "";

function preload(){
    light_bulb_image = loadImage("bottle.jfif");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    object_Detector.detect(light_bulb_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error();;
    }
    console.log(results);
}

function draw(){
    image(light_bulb_image,0,0,640,350);
    if (status != false){
        document.getElementById('status').innerHTML = "Status : Objects Detected";

        for (i = 0 ; i < objects.length ; i++ ){
            percent = floor(objects[i].confidence * 100);
            fill('red');
            textSize(20);
            text(objects[i].label + " " + percent + "%",objects[i].x+20,objects[i].y+20 );
            noFill();
            stroke('red');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}