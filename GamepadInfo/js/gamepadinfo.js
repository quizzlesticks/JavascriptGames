const metainfo = document.getElementById("meta_info");
const buttonsinfo = document.getElementById("buttons_info");
const axesinfo = document.getElementById("axes_info");
//const debuginfo = document.getElementById("debug_info");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.height = 750;
canvas.width = 1000;

let controller_looper;
let anim_looper;
let controller;

const ControllerDrawSettings = {
	//outline_color: "#ff000f"
	large_white_plate: "#bbb7b7e6",
	white_plate_gradient_left: ctx.createLinearGradient(120, 200,-400,1000),
	white_plate_gradient_right: ctx.createLinearGradient(880, 200,1400,400),
	inside_white_curve: "#969292e6",
	led_gradient: ctx.createLinearGradient(0, 0, 0,280),
	led_color: "#473bf3",
	outline_color: "#bbb7b7e6",
	background_color: "#201A23",
	x_color: "#b1afafe6",
	triangle_color: "#b1afafe6",
	square_color: "#b1afafe6",
	circle_color: "#b1afafe6",
	button_fill_color: "#b1afafe6",
	button_outline_color: "#969292e6",
	start_color: "#b3b1b1e6",
	select_color: "#b3b1b1e6",
	sel_start_button_outline_color: "#969292e6",
	letter_color: "#868282e6",
	touchpad_color: "#bbb7b7e6",
	lstick_color: "#201A23",
	rstick_color: "#201A23",
	screenshot_color: "#201A23",
	dpad_u_color: "#b1afafe6",
	dpad_d_color:"#b1afafe6",
	dpad_l_color:"#b1afafe6",
	dpad_r_color:"#b1afafe6",
	rb_color: "#201A23",
	lb_color: "#201A23",
	ps_logo_color: "#201A23",
	ps_logo_outline_color: "#bbb7b7e6",
	lt_color: "#201A23",
	rt_color: "#201A23",
	lt_text_color: "#bbb7b7e6",
	rt_text_color: "#bbb7b7e6",
	lstick_x_pos_dead: 349,
	lstick_y_pos_dead: 381,
	lstick_x_pos: 349,
	lstick_y_pos: 381,
	rstick_x_pos_dead: 651,
	rstick_y_pos_dead: 381,
	rstick_x_pos: 651,
	rstick_y_pos: 381,
	stick_movement_multiplier: 20
};
ControllerDrawSettings.white_plate_gradient_left.addColorStop(0, ControllerDrawSettings.large_white_plate);
ControllerDrawSettings.white_plate_gradient_left.addColorStop(1, ControllerDrawSettings.inside_white_curve);
ControllerDrawSettings.white_plate_gradient_right.addColorStop(0, ControllerDrawSettings.large_white_plate);
ControllerDrawSettings.white_plate_gradient_right.addColorStop(1, ControllerDrawSettings.inside_white_curve);
ControllerDrawSettings.led_gradient.addColorStop(0, ControllerDrawSettings.led_color);
ControllerDrawSettings.led_gradient.addColorStop(1, ControllerDrawSettings.background_color);


const drawController = function() {
	ctx.fillStyle = ControllerDrawSettings.background_color;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	//LEFT WHITE PANEL
	ctx.fillStyle = ControllerDrawSettings.white_plate_gradient_left;
	ctx.beginPath();
	ctx.moveTo(136,125);
	ctx.bezierCurveTo(28,330,38,542,63,615);
	ctx.bezierCurveTo(98,688,120,676,125,673);
	ctx.bezierCurveTo(130,670,137,660,141,646);
	ctx.bezierCurveTo(190,467,244,371,308,300);
	ctx.bezierCurveTo(338,260,333,243,303,120);
	ctx.bezierCurveTo(298,103,288,98,274,96);
	ctx.bezierCurveTo(213,105,195,104,136,125);
	ctx.fill();
	//RIGHT WHITE PANEL
	ctx.fillStyle = ControllerDrawSettings.white_plate_gradient_right;
	ctx.beginPath();
	ctx.moveTo(864,125);
	ctx.bezierCurveTo(972,330,962,542,937,615);
	ctx.bezierCurveTo(902,688,880,676,875,673);
	ctx.bezierCurveTo(870,670,863,660,859,646);
	ctx.bezierCurveTo(810,467,756,371,692,300);
	ctx.bezierCurveTo(662,260,667,243,697,120);
	ctx.bezierCurveTo(702,103,712,98,726,96);
	ctx.bezierCurveTo(787,105,805,104,864,125);
	ctx.fill();
	//BLACK LINE BOTTOM LEFT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(122,675);
	ctx.bezierCurveTo(172,680,174,680,175,681);
	ctx.stroke();
	//BLACK LINE BOTTOM RIGHT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(878,675);
	ctx.bezierCurveTo(828,680,826,680,825,681);
	ctx.stroke();
	//WHITECURVE INSIDE HANDLE LEFT
	ctx.fillStyle = ControllerDrawSettings.inside_white_curve;
	ctx.beginPath();
	ctx.moveTo(306,472);
	ctx.bezierCurveTo(257,483,239,492,175,681);
	ctx.bezierCurveTo(224,637,225,491,290,476);
	ctx.fill();
	ctx.stroke();
	//WHITE CURVE INSIDE HANDLE RIGHT
	ctx.fillStyle = ControllerDrawSettings.inside_white_curve;
	ctx.beginPath();
	ctx.moveTo(1000-306,472);
	ctx.bezierCurveTo(743,483,761,492,825,681);
	ctx.bezierCurveTo(776,637,775,491,710,476);
	ctx.fill();
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
	ctx.bezierCurveTo(670,471,673,483,615,476);
	ctx.bezierCurveTo(591,476,548,477,500,477);
	ctx.stroke();
	//LED
	ctx.fillStyle = ControllerDrawSettings.led_gradient;
	ctx.strokeStyle = ControllerDrawSettings.led_color;
	ctx.beginPath();
	ctx.moveTo(313,111);
	ctx.bezierCurveTo(296,121,313,150,321,197);
	ctx.bezierCurveTo(332,261,333,301,413,297);
	ctx.bezierCurveTo(458,297,486,297,500,297);
	ctx.bezierCurveTo(514,297,542,297,587,297);
	ctx.bezierCurveTo(667,301,668,261,679,197);
	ctx.bezierCurveTo(687,150,704,121,687,111);
	ctx.fill();
	//TOUCHPAD
	ctx.beginPath();
	ctx.moveTo(500,84)
	ctx.bezierCurveTo(420,83,359,87,335,91);
	ctx.bezierCurveTo(302,98,311,109,337,238);
	ctx.bezierCurveTo(354,295,382,284,437,285);
	ctx.bezierCurveTo(437,285,496,285,500,285);
	ctx.bezierCurveTo(504,285,563,285,563,285);
	ctx.bezierCurveTo(618,284,646,295,663,238);
	ctx.bezierCurveTo(689,109,698,98,665,91);
	ctx.bezierCurveTo(641,87,580,83,500,84);
	ctx.fillStyle = ControllerDrawSettings.background_color;
	ctx.strokeStyle = ControllerDrawSettings.background_color;
	ctx.fill()
	ctx.stroke()
	ctx.fillStyle = ControllerDrawSettings.touchpad_color;
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.fill()
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
	ctx.strokeStyle = ControllerDrawSettings.button_outline_color;
	ctx.fillStyle = ControllerDrawSettings.dpad_u_color;
	ctx.beginPath();
	ctx.moveTo(185,221);
	ctx.bezierCurveTo(171,168,196,178,206,175);
	ctx.bezierCurveTo(245,174,235,191,232,220);
	ctx.bezierCurveTo(205,250,210,250,185,221);
	ctx.stroke();
	ctx.fill();
	//DPAD RIGHT
	ctx.fillStyle = ControllerDrawSettings.dpad_r_color;
	ctx.beginPath();
	ctx.moveTo(241,229);
	ctx.bezierCurveTo(262,228,288,214,287,253);
	ctx.bezierCurveTo(285,276,285,286,242,277);
	ctx.bezierCurveTo(214,249,212,260,241,229);
	ctx.stroke();
	ctx.fill();
	//DPAD DOWN
	ctx.fillStyle = ControllerDrawSettings.dpad_d_color;
	ctx.beginPath();
	ctx.moveTo(185,285);
	ctx.bezierCurveTo(180,320,176,332,209,331);
	ctx.bezierCurveTo(240,330,237,318,232,286);
	ctx.bezierCurveTo(201,258,216,257,185,285);
	ctx.stroke();
	ctx.fill();
	//DPAD LEFT
	ctx.fillStyle = ControllerDrawSettings.dpad_l_color;
	ctx.beginPath();
	ctx.moveTo(174,277);
	ctx.bezierCurveTo(141,282,130,285,130,251);
	ctx.bezierCurveTo(132,222,139,224,175,229);
	ctx.bezierCurveTo(204,255,204,251,174,277);
	ctx.stroke();
	ctx.fill();
	//LEFT BUMPER
	ctx.fillStyle = ControllerDrawSettings.lb_color;
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.beginPath();
	ctx.moveTo(151,120);
	ctx.bezierCurveTo(152,113,153,106,153,105);
	ctx.bezierCurveTo(174,90,221,73,272,83);
	ctx.bezierCurveTo(274,85,275,93,274,96);
	ctx.bezierCurveTo(213,105,151,119,151,120);
	ctx.stroke();
	ctx.fill();
	//RIGHT BUMPER
	ctx.fillStyle = ControllerDrawSettings.rb_color;
	ctx.beginPath();
	ctx.moveTo(849,120);
	ctx.bezierCurveTo(848,113,847,106,847,105);
	ctx.bezierCurveTo(826,90,779,73,728,83);
	ctx.bezierCurveTo(726,85,725,93,726,96);
	ctx.bezierCurveTo(787,105,849,119,849,120);
	ctx.stroke();
	ctx.fill();
	//SELECT
	ctx.strokeStyle = ControllerDrawSettings.sel_start_button_outline_color;
	ctx.fillStyle = ControllerDrawSettings.select_color;
	ctx.beginPath();
	ctx.moveTo(271,154);
	ctx.bezierCurveTo(265,137,270,129,278,129);
	ctx.bezierCurveTo(283,129,288,129,292,149);
	ctx.bezierCurveTo(296,164,295,167,286,171);
	ctx.bezierCurveTo(277,171,276,170,271,154);
	ctx.stroke();
	ctx.fill();
	//START
	ctx.fillStyle = ControllerDrawSettings.start_color;
	ctx.beginPath();
	ctx.moveTo(729,154);
	ctx.bezierCurveTo(735,137,730,129,722,129);
	ctx.bezierCurveTo(717,129,712,129,708,149);
	ctx.bezierCurveTo(704,164,705,167,714,171);
	ctx.bezierCurveTo(723,171,724,170,729,154);
	ctx.stroke();
	ctx.fill();
	//LSTICK
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.fillStyle = ControllerDrawSettings.lstick_color;
	ctx.beginPath();
	ctx.arc(ControllerDrawSettings.lstick_x_pos,ControllerDrawSettings.lstick_y_pos,55,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//RSTICK
	ctx.fillStyle = ControllerDrawSettings.rstick_color;
	ctx.beginPath();
	ctx.arc(ControllerDrawSettings.rstick_x_pos,ControllerDrawSettings.rstick_y_pos,55,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//TRIANGLE
	ctx.strokeStyle = ControllerDrawSettings.button_outline_color;
	ctx.fillStyle = ControllerDrawSettings.triangle_color;
	ctx.beginPath();
	ctx.arc(792,184,30,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//CIRCLE
	ctx.fillStyle = ControllerDrawSettings.circle_color;
	ctx.beginPath();
	ctx.arc(860,253,30,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//X
	ctx.fillStyle = ControllerDrawSettings.x_color;
	ctx.beginPath();
	ctx.arc(792,322,30,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//SQUARE
	ctx.fillStyle = ControllerDrawSettings.square_color;
	ctx.beginPath();
	ctx.arc(723,253,30,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//O Letter
	ctx.strokeStyle = ControllerDrawSettings.letter_color;
	ctx.beginPath();
	ctx.arc(860,253,20,0,2*Math.PI);
	ctx.stroke();
	//X Letter
	ctx.beginPath();
	var adder = 14;
	ctx.moveTo(792-adder,322-adder);
	ctx.lineTo(792+adder,322+adder);
	ctx.moveTo(792+adder,322-adder);
	ctx.lineTo(792-adder,322+adder);
	ctx.stroke();
	//Square Letter
	ctx.beginPath();
	adder = 16;
	ctx.rect(723-adder,253-adder,adder*2,adder*2);
	ctx.stroke();
	//Triangle Letter
	ctx.beginPath();
	var adder = 14;
	ctx.moveTo(792,184-adder-2);
	ctx.lineTo(792+adder+2,184+adder-2);
	ctx.lineTo(792-adder-2,184+adder-2);
	ctx.lineTo(792,184-adder-2);
	ctx.stroke();
	//RT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.fillStyle = ControllerDrawSettings.lt_color;
	ctx.beginPath();
	ctx.arc(100,60,40,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//LT
	ctx.fillStyle = ControllerDrawSettings.rt_color;
	ctx.beginPath();
	ctx.arc(900,60,40,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//LT RT Text
	ctx.font = "30px Helvetica";
	ctx.textAlign = "center";
	ctx.fillStyle = ControllerDrawSettings.lt_text_color;
	ctx.fillText("LT",100,71);
	ctx.fillStyle = ControllerDrawSettings.rt_text_color;
	ctx.fillText("RT",900,71);
	//SCREENSHOT
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.fillStyle = ControllerDrawSettings.screenshot_color;
	ctx.beginPath();
	ctx.arc(483,431,6,Math.PI/2,3*Math.PI/2);
	ctx.lineTo(517,425);
	ctx.arc(517,431,6,3*Math.PI/2,Math.PI/2);
	ctx.lineTo(483,437);
	ctx.stroke();
	ctx.fill();
	//PS BUTTON
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	ctx.fillStyle = ControllerDrawSettings.ps_logo_color;
		//RIGHT CURVE
		ctx.beginPath();
		ctx.moveTo(504,396);
		ctx.bezierCurveTo(542,385,527,375,504,380);
		ctx.stroke();
		ctx.fill();
	//Left curve
	ctx.beginPath();
	ctx.moveTo(492,375);
	ctx.bezierCurveTo(463,383,464,396,492,389);
	ctx.stroke();
	ctx.fill();
		//BIG P
		ctx.beginPath();
		//Top curvy part of P
		ctx.moveTo(517,372);
		ctx.bezierCurveTo(517,357,515,356,492,350);
		//Left of P
		ctx.lineTo(492,393);
		//Bottom line of P
		ctx.lineTo(504,396);
		//Right of P
		ctx.lineTo(504,360);
		//Lower P dangle
		ctx.lineTo(504,374);
		ctx.bezierCurveTo(505,379,515,380,517,372);
		ctx.stroke();
		ctx.fill();
	//Right of P again for outlining with fill
	ctx.strokeStyle = ControllerDrawSettings.ps_logo_outline_color;
	ctx.beginPath();
	ctx.moveTo(504,396);
	ctx.lineTo(504,360)
	ctx.stroke();
	//Left of P again for outlining with fill
	var tmp = ctx.strokeStyle;
	ctx.strokeStyle = ControllerDrawSettings.outline_color;
	if(ctx.strokeStyle != tmp) {
		ctx.strokeStyle = tmp;
		ctx.beginPath();
		ctx.moveTo(504,396);
		ctx.lineTo(504,360)
		ctx.moveTo(492,350);
		ctx.lineTo(492,393);
		ctx.stroke();
	}
	//Left dash
	ctx.beginPath();
	ctx.moveTo(491,382);
	ctx.lineTo(480,385);
	ctx.stroke();
	//Right dash
	ctx.beginPath();
	ctx.moveTo(504,387);
	ctx.lineTo(517,384);
	ctx.stroke();
	anim_looper = requestAnimationFrame(drawController);
};

const gamepadPoll = function() {
	controller.updateGamepad();
	if (controller.x.pressed){
		ControllerDrawSettings.x_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.x_color = "#b1afafe6";
	}
	if (controller.square.pressed){
		ControllerDrawSettings.square_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.square_color = "#b1afafe6";
	}
	if (controller.triangle.pressed){
		ControllerDrawSettings.triangle_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.triangle_color = "#b1afafe6";
	}
	if (controller.circle.pressed){
		ControllerDrawSettings.circle_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.circle_color = "#b1afafe6";
	}
	if(controller.select.pressed){
		ControllerDrawSettings.select_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.select_color = "#b3b1b1e6";
	}
	if(controller.start.pressed){
		ControllerDrawSettings.start_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.start_color = "#b3b1b1e6";
	}
	if(controller.touchpad.pressed){
		ControllerDrawSettings.touchpad_color = "#76cd7b";
	} else {
		ControllerDrawSettings.touchpad_color = "#bbb7b7e6";
	}
	if(controller.lstick.pressed){
		ControllerDrawSettings.lstick_color = "#76cd7b";
	} else {
		ControllerDrawSettings.lstick_color = "#201A23";
	}
	if(controller.rstick.pressed){
		ControllerDrawSettings.rstick_color = "#76cd7b";
	} else {
		ControllerDrawSettings.rstick_color = "#201A23";
	}
	if(controller.screenshot.pressed){
		ControllerDrawSettings.screenshot_color = "#66cd6b";
	} else {
		ControllerDrawSettings.screenshot_color = "#201A23";
	}
	if(controller.dpad_up || controller.dpad_up_right || controller.dpad_up_left){
		ControllerDrawSettings.dpad_u_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.dpad_u_color = "#b1afafe6";
	}
	if(controller.dpad_down || controller.dpad_down_left || controller.dpad_down_right){
		ControllerDrawSettings.dpad_d_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.dpad_d_color = "#b1afafe6";
	}
	if(controller.dpad_right || controller.dpad_up_right || controller.dpad_down_right){
		ControllerDrawSettings.dpad_r_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.dpad_r_color = "#b1afafe6";
	}
	if(controller.dpad_left || controller.dpad_up_left || controller.dpad_down_left){
		ControllerDrawSettings.dpad_l_color = "#2cff3c6b";
	} else {
		ControllerDrawSettings.dpad_l_color = "#b1afafe6";
	}
	if(controller.rb.pressed){
		ControllerDrawSettings.rb_color = "#76cd7b";
	} else {
		ControllerDrawSettings.rb_color = "#201A23";
	}
	if(controller.lb.pressed){
		ControllerDrawSettings.lb_color = "#76cd7b";
	} else {
		ControllerDrawSettings.lb_color = "#201A23";
	}
	if(controller.home.pressed){
		ControllerDrawSettings.ps_logo_color = "#76cd7b";
		ControllerDrawSettings.ps_logo_outline_color = ControllerDrawSettings.background_color;
	} else {
		ControllerDrawSettings.ps_logo_color = "#201A23";
		ControllerDrawSettings.ps_logo_outline_color = ControllerDrawSettings.outline_color;
	}
	if(controller.n_lstick_lr != 0){
		ControllerDrawSettings.lstick_x_pos = ControllerDrawSettings.lstick_x_pos_dead + controller.a_lstick_lr * ControllerDrawSettings.stick_movement_multiplier;
	} else {
		ControllerDrawSettings.lstick_x_pos = ControllerDrawSettings.lstick_x_pos_dead;
	}
	if(controller.n_lstick_ud != 0){
		ControllerDrawSettings.lstick_y_pos = ControllerDrawSettings.lstick_y_pos_dead + controller.a_lstick_ud * ControllerDrawSettings.stick_movement_multiplier;
	} else {
		ControllerDrawSettings.lstick_y_pos = ControllerDrawSettings.lstick_y_pos_dead;
	}
	if(controller.n_rstick_lr != 0){
		ControllerDrawSettings.rstick_x_pos = ControllerDrawSettings.rstick_x_pos_dead + controller.a_rstick_lr * ControllerDrawSettings.stick_movement_multiplier;
	} else {
		ControllerDrawSettings.rstick_x_pos = ControllerDrawSettings.rstick_x_pos_dead;
	}
	if(controller.n_rstick_ud != 0){
		ControllerDrawSettings.rstick_y_pos = ControllerDrawSettings.rstick_y_pos_dead + controller.a_rstick_ud * ControllerDrawSettings.stick_movement_multiplier;
	} else {
		ControllerDrawSettings.rstick_y_pos = ControllerDrawSettings.rstick_y_pos_dead;
	}
	if(controller.n_lt){
		ControllerDrawSettings.lt_color = `rgba(118, 205, 123, ${controller.n_lt}`;
		ControllerDrawSettings.lt_text_color = ControllerDrawSettings.background_color;
	} else {
		ControllerDrawSettings.lt_color = "#201A23";
		ControllerDrawSettings.lt_text_color = ControllerDrawSettings.outline_color;
	}
	if(controller.n_rt){
		ControllerDrawSettings.rt_color = `rgba(118, 205, 123, ${controller.n_rt}`;
		ControllerDrawSettings.rt_text_color = ControllerDrawSettings.background_color;
	} else {
		ControllerDrawSettings.rt_color = "#201A23";
		ControllerDrawSettings.rt_text_color = ControllerDrawSettings.outline_color;
	}
};

const controllerConnector = function(e) {
	controller = new Controller(e.gamepad);
	controller_looper = setInterval(gamepadPoll, 100);
	anim_looper = requestAnimationFrame(drawController);
	window.cancelAnimationFrame(loading_circle_anim_looper);
};

const controllerDisconnector = function(e) {
	clearInterval(controller_looper);
	window.cancelAnimationFrame(anim_looper);
	displayConnectController();
};

var loading_circle_radius;
var loading_circle_rotation;
var loading_circle_speed;
var loading_circle_anim_looper;

const displayConnectController = function() {
	ctx.fillStyle = ControllerDrawSettings.background_color;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.font = "30px Helvetica";
	ctx.fillStyle = ControllerDrawSettings.outline_color;
	ctx.textAlign = "center";
	ctx.fillText("Connect a controller.",canvas.width/2,canvas.height/2);
	loadingCircleInit();
};

const loadingCircleInit = function() {
	loading_circle_radius = 30;
	loading_circle_rotation = 270*(Math.PI/180);
	loading_circle_speed = 6;
	displayLoadingCircle();
};

const renderLoadingCircle = function() {
	ctx.save();
	ctx.translate(canvas.width/2+25, 3*canvas.height/4-25-80);
	ctx.rotate(loading_circle_rotation + loading_circle_speed/4);
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = ControllerDrawSettings.background_color;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.arc(0,0,loading_circle_radius+36, 0,Math.PI/3+1/12+1/18, false);
	ctx.fill();
	ctx.restore();
	ctx.save();
	ctx.translate(canvas.width/2, 3*canvas.height/4-80);
	ctx.rotate(loading_circle_rotation);
	ctx.lineWidth = .5;
	ctx.strokeStyle = 'rgba(187,183,183,.75)';
	var i = loading_circle_radius;
	var j = 2;
	while(j--){
		i--;
		ctx.beginPath();
		ctx.arc(0, 0,Math.random()*65, 0, Math.PI/6+(Math.random()/12), false);
		ctx.stroke();
    }
	ctx.restore();
};

const displayLoadingCircle = function() {
	loading_circle_anim_looper = window.requestAnimationFrame(displayLoadingCircle);
	loading_circle_rotation += loading_circle_speed/100;
	renderLoadingCircle();
};

displayConnectController();
window.addEventListener("gamepadconnected", controllerConnector);
window.addEventListener("gamepaddisconnected", controllerDisconnector);
