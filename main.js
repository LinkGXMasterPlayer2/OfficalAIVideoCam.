video = "";
status ="";
objects = [];


function preload(){

    video = createVideo('video.mp4');
    video.hide();

}

function setup(){

    canvas = createCanvas(480,300);
    canvas.center();

}


function start(){

    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects ";
    
}

function modelLoaded(){

    console.log("model is loaded...");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){

    image(video, 0, 0, 480, 300);
    if(status !=""){

        objectDetecter.detect(video,gotResult);
        for(i=0; i<objects.length; i++){

            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number 0f 0bjects Detected are: " + objects.length;
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    
}

function gotResult(error,results){

    if(error){
        console.log(error);
    }
    else {
        console.log(results);
    }
    objects = results;
}