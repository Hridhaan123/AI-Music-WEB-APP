song = "";
liftrix = 0;
liftrey = 0;
ritrix = 0;
ritrey = 0;
scoreliftrix = 0;
scoreritrix = 0;

function preload() {
    song = loadSound("Europe - The Final Countdown.mp3")
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(400,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        liftrix = results[0].pose.leftWrist.x;
        liftrey = results[0].pose.leftWrist.y;
        console.log("Left WristX = " + liftrix + "Left WristY = " + liftrey);
        ritrix = results[0].pose.rightWrist.x;
        ritrey = results[0].pose.rightWrist.y;
        console.log("Right WristX = " + ritrix + "Right WristY = " + ritrey);
        scoreliftrix = results[0].pose.keypoints[9].score;
        scoreritrix = results[0].pose.keypoints[10].score;
    }
}

function modelLoaded() {
    console.log("PoseNet is Initialized!");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("blue");
    if (scoreritrix>0.2) {
        
    
    circle(ritrix, ritrey, 20);
    if (ritrey>0 && ritrey<=100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if (ritrey>100 && ritrey<=200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if (ritrey>200 && ritrey<=300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if (ritrey>300 && ritrey<=400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if (ritrey>400 && ritrey<=500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }
    if (scoreliftrix>0.2) {
        
    

    circle(liftrix, liftrey, 20);
    NewNumber = Number(liftrey);
    decimal_remover = floor(NewNumber);
    volume  = decimal_remover/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}}

function play() {
    song.play();
    song.setVolume(2.5);
    song.rate(0.7);
}