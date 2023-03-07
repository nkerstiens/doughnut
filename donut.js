// Define the dimensions of the donut
var A = 1;
var B = 2;

// Define the dimensions of the screen
var width = 800;
var height = 600;

// Define the position and speed of the donut
var x_pos = width / 2;
var y_pos = height / 2;
var z_pos = 0;
var x_speed = 0.1;
var y_speed = 0.1;
var z_speed = 0.3;

// Define the character set to use for the donut
var chars = ".,-~:;=!*#$@";

// Get the canvas element and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define a function to calculate the 3D coordinates of each point on the donut
function calculate_point(i, j) {
    var theta = i * Math.PI / 180;
    var phi = j * Math.PI / 180;

    var x = (A + B * Math.cos(phi)) * Math.cos(theta);
    var y = (A + B * Math.cos(phi)) * Math.sin(theta);
    var z = B * Math.sin(phi);

    return [x, y, z];
}

// Define the main animation loop
function animate() {
    // Clear the screen
    ctx.clearRect(0, 0, width, height);

    // Rotate the donut
    x_pos = x_pos * Math.cos(x_speed) - y_pos * Math.sin(x_speed);
    y_pos = x_pos * Math.sin(x_speed) + y_pos * Math.cos(x_speed);
    y_pos = y_pos * Math.cos(y_speed) - z_pos * Math.sin(y_speed);
    z_pos = y_pos * Math.sin(y_speed) + z_pos * Math.cos(y_speed);
    x_pos = x_pos * Math.cos(z_speed) - z_pos * Math.sin(z_speed);
    z_pos = x_pos * Math.sin(z_speed) + z_pos * Math.cos(z_speed);

    // Loop over each point on the donut
    for (var j = 0; j < 360; j += 5) {
        for (var i = 0; i < 360; i += 5) {
            // Calculate the 3D coordinates of the point
            var point = calculate_point(i, j);

            // Transform the 3D coordinates to 2D screen coordinates
            var x = point[0] * 1 / point[2] + x_pos;
            var y = point[1] * 1 / point[2] + y_pos;

            // If the point is within the screen bounds, plot it
            if (0 <= x && x < width && 0 <= y && y < height) {
                var z = (point[2] + 2) / 3;
                var index = Math.floor(z * chars.length);
                ctx.fillStyle = "rgb(" + index + "," +
