song = "";
liftrix = 0;
liftrey = 0;
ritrix = 0;
ritrey = 0;

function preload() {
    song = loadSound("Europe - The Final Countdown.mp3")
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

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
    }
}

function modelLoaded() {
    console.log("PoseNet is Initialized!");
}

function draw() {
    image(video, 0, 0, 600, 500);
}

function play() {
    song.play();
    song.setVolume(2.5);
    song.rate(0.7);
}