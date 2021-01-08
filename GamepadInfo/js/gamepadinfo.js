const metainfo = document.getElementById("meta_info");
const buttonsinfo = document.getElementById("buttons_info");
const axesinfo = document.getElementById("axes_info");
const debuginfo = document.getElementById("debug_info");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.height = 750;
canvas.width = 1000;

metainfo.innerHTML = "Please connect a gamepad";
buttonsinfo.innerHTML = "";
debuginfo.innterHTML = "No debug info";

let display_looper;
let controller;

const ControllerDrawSettings = {
	//outline_color: "#ff000f"
	outline_color: "#bbb7b7e6"
};

const drawController = function() {
	ctx.fillStyle = "#201A23";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	//LEFT WHITE PANEL
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(136,125);
	ctx.bezierCurveTo(28,330,38,542,63,615);
	ctx.bezierCurveTo(98,688,120,676,125,673);
	ctx.bezierCurveTo(130,670,137,660,141,646);
	ctx.bezierCurveTo(190,467,244,371,308,300);
	ctx.bezierCurveTo(338,260,333,243,303,120);
	ctx.bezierCurveTo(298,103,288,98,274,96);
	ctx.bezierCurveTo(213,105,195,104,136,125);
	ctx.stroke();
	//RIGHT WHITE PANEL
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(1000-136,125);
	ctx.bezierCurveTo(1000-28,330,1000-38,542,1000-63,615);
	ctx.bezierCurveTo(1000-98,688,1000-120,676,1000-125,673);
	ctx.bezierCurveTo(1000-130,670,1000-137,660,1000-141,646);
	ctx.bezierCurveTo(1000-190,467,1000-244,371,1000-308,300);
	ctx.bezierCurveTo(1000-338,260,1000-333,243,1000-303,120);
	ctx.bezierCurveTo(1000-298,103,1000-288,98,1000-274,96);
	ctx.bezierCurveTo(1000-213,105,1000-195,104,1000-136,125);
	ctx.stroke();
	//BLACK LINE BOTTOM LEFT and WHITECURVE INSIDE HANDLE
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(122,675);
	ctx.bezierCurveTo(172,680,174,680,175,681);
	ctx.bezierCurveTo(239,492,257,483,306,472);
	ctx.moveTo(175,681);
	ctx.bezierCurveTo(224,637,225,491,290,476);
	ctx.stroke();
	//BLACK LINE BOTTOM RIGHT and WHITECURVE INSIDE HANDLE
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(1000-122,675);
	ctx.bezierCurveTo(1000-172,680,1000-174,680,1000-175,681);
	ctx.bezierCurveTo(1000-239,492,1000-257,483,1000-306,472);
	ctx.moveTo(1000-175,681);
	ctx.bezierCurveTo(1000-224,637,1000-225,491,1000-290,476);
	ctx.stroke();
	//UNDER THUMBPAD LEFT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(306,472);
	ctx.bezierCurveTo(330,471,327,483,385,476);
	ctx.bezierCurveTo(409,476,452,477,500,477);
	ctx.stroke();
	//UNDER THUMBPAD RIGHT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(1000-306,472);
	ctx.bezierCurveTo(1000-330,471,1000-327,483,1000-385,476);
	ctx.bezierCurveTo(1000-409,476,1000-452,477,1000-500,477);
	ctx.stroke();
	//LED LEFT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(313,111);
	ctx.bezierCurveTo(296,121,313,150,321,197);
	ctx.bezierCurveTo(332,261,333,301,413,297);
	ctx.bezierCurveTo(458,297,486,297,500,297);
	ctx.stroke();
	//LED RIGHT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(1000-313,111);
	ctx.bezierCurveTo(1000-296,121,1000-313,150,1000-321,197);
	ctx.bezierCurveTo(1000-332,261,1000-333,301,1000-413,297);
	ctx.bezierCurveTo(1000-458,297,1000-486,297,1000-500,297);
	ctx.stroke();
	//TOUCHPAD LEFT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(500,84)
	ctx.bezierCurveTo(420,83,359,87,335,91);
	ctx.bezierCurveTo(302,98,311,109,337,238);
	ctx.bezierCurveTo(354,295,382,284,437,285);
	ctx.bezierCurveTo(437,285,496,285,500,285);
	ctx.stroke()
	//TOUCHPAD RIGHT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(1000-500,84)
	ctx.bezierCurveTo(1000-420,83,1000-359,87,1000-335,91);
	ctx.bezierCurveTo(1000-302,98,1000-311,109,1000-337,238);
	ctx.bezierCurveTo(1000-354,295,1000-382,284,1000-437,285);
	ctx.bezierCurveTo(1000-437,285,1000-496,285,1000-500,285);
	ctx.stroke()
	//LITTLE NOTCH ABOVE LED LEFT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(291,102);
	ctx.bezierCurveTo(303,97,316,95,321,96);
	ctx.stroke();
	//LITTLE NOTCH ABOVE LED RIGHT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(1000-291,102);
	ctx.bezierCurveTo(1000-303,97,1000-316,95,1000-321,96);
	ctx.stroke();
	//DPAD UP
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(185,221);
	ctx.bezierCurveTo(171,168,196,178,206,175);
	ctx.bezierCurveTo(245,174,235,191,232,220);
	ctx.bezierCurveTo(205,250,210,250,185,221);
	ctx.stroke();
	//DPAD RIGHT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(241,229);
	ctx.bezierCurveTo(262,228,288,214,287,253);
	ctx.bezierCurveTo(285,276,285,286,242,277);
	ctx.bezierCurveTo(214,249,212,260,241,229);
	ctx.stroke();
	//DPAD DOWN
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(185,285);
	ctx.bezierCurveTo(180,320,176,332,209,331);
	ctx.bezierCurveTo(240,330,237,318,232,286);
	ctx.bezierCurveTo(201,258,216,257,185,285);
	ctx.stroke();
	//DPAD LEFT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(174,277);
	ctx.bezierCurveTo(141,282,130,285,130,251);
	ctx.bezierCurveTo(132,222,139,224,175,229);
	ctx.bezierCurveTo(204,255,204,251,174,277);
	ctx.stroke();
	//LEFT BUMPER
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(151,119);
	ctx.bezierCurveTo(152,113,153,106,153,105);
	ctx.bezierCurveTo(174,90,221,73,272,83);
	ctx.bezierCurveTo(274,85,275,93,274,96);
	ctx.stroke();
	//RIGHT BUMPER
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(1000-151,119);
	ctx.bezierCurveTo(1000-152,113,1000-153,106,1000-153,105);
	ctx.bezierCurveTo(1000-174,90,1000-221,73,1000-272,83);
	ctx.bezierCurveTo(1000-274,85,1000-275,93,1000-274,96);
	ctx.stroke();
	//SELECT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(271,154);
	ctx.bezierCurveTo(265,137,270,129,278,129);
	ctx.bezierCurveTo(283,129,288,129,292,149);
	ctx.bezierCurveTo(296,164,295,167,286,171);
	ctx.bezierCurveTo(277,171,276,170,271,154);
	ctx.stroke();
	//START
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(1000-271,154);
	ctx.bezierCurveTo(1000-265,137,1000-270,129,1000-278,129);
	ctx.bezierCurveTo(1000-283,129,1000-288,129,1000-292,149);
	ctx.bezierCurveTo(1000-296,164,1000-295,167,1000-286,171);
	ctx.bezierCurveTo(1000-277,171,1000-276,170,1000-271,154);
	ctx.stroke();
	//LSTICK
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.arc(349,381,55,0,2*Math.PI);
	ctx.stroke();
	//RSTICK
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.arc(1000-349,381,55,0,2*Math.PI);
	ctx.stroke();
	//TRIANGLE
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.arc(792,184,30,0,2*Math.PI);
	ctx.stroke();
	//CIRCLE
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.arc(860,253,30,0,2*Math.PI);
	ctx.stroke();
	//X
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.arc(792,322,30,0,2*Math.PI);
	ctx.stroke();
	//SQUARE
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.arc(723,253,30,0,2*Math.PI);
	ctx.stroke();
	//SCREENSHOT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.arc(483,431,6,Math.PI/2,3*Math.PI/2);
	ctx.lineTo(517,425);
	ctx.arc(517,431,6,3*Math.PI/2,Math.PI/2);
	ctx.lineTo(483,437);
	ctx.stroke();
	//PS BUTTON
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(516,392);
	ctx.bezierCurveTo(542,385,527,380,518,377);
	ctx.bezierCurveTo(518,357,516,356,492,350);
	ctx.lineTo(492,375);
	ctx.bezierCurveTo(463,383,464,391,487,392);
	ctx.lineTo(502,396);
	ctx.lineTo(516,392);
	ctx.moveTo(491,384);
	ctx.lineTo(480,387);
	ctx.moveTo(504,389);
	ctx.lineTo(520,383);
	ctx.moveTo(504,395);
	ctx.lineTo(504,360);
	ctx.moveTo(492,393);
	ctx.lineTo(492,374);
	ctx.moveTo(505,374);
	ctx.bezierCurveTo(505,379,515,380,517,372);
	ctx.stroke();

	requestAnimationFrame(drawController);
};

const controllerConnector = function(e) {
	metainfo.innerHTML = "Controller connected!";
	controller = new Controller(e.gamepad);
	display_looper = setInterval(gamepadPoll, 100);
};

const controllerDisconnector = function(e) {
	clearInterval(display_looper);
	metainfo.innerHTML = "Controller disconnected, reconnect to display info";
	buttonsinfo.innerHTML = "";
	debuginfo.innerHTML = "";
};

const gamepadPoll = function() {
	//debuginfo.innerHTML = JSON.stringify(controller.gamepad.buttons[0], null, 4);
	//debuginfo.innerHTML = fullPropertyPrinter(controller.gamepad);
	debuginfo.innerHTML = fullPropertyPrinter(controller.a);
};

requestAnimationFrame(drawController);
window.addEventListener("gamepadconnected", controllerConnector);
window.addEventListener("gamepaddisconnected", controllerDisconnector);
