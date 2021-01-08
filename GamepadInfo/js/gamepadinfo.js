metainfo = document.getElementById("meta_info");
buttonsinfo = document.getElementById("buttons_info");
axesinfo = document.getElementById("axes_info");
debuginfo = document.getElementById("debug_info");

metainfo.innerHTML = "Please connect a gamepad";
buttonsinfo.innerHTML = "";
debuginfo.innterHTML = "No debug info";

let display_looper;

const controller = {
	gamepad: null,
	x: null,
	printButtons() {
		let string = "";
		for(let i=0; i<controller.gamepad.buttons.length; i++){
			string += "Button" + i + ": " + controller.gamepad.buttons[i].value + "<br>";
		}
		return string;
	},
	
	printAxes() {
		let string = "";
		for(let i=0; i<controller.gamepad.axes.length; i++){
			string += "Axes" + i + ": " + controller.gamepad.axes[i] + "<br>";
		}
		return string;
	}
}

const controllerConnector = function(e) {
	metainfo.innerHTML = "";
	for (key in e.gamepad) {
		if(["id", "index", "connected"].indexOf(key) >= 0) {
			metainfo.innerHTML += key + ": " + e.gamepad[key] + "<br>";
		}
	}
	controller.gamepad = e.gamepad;
	controller.x = controller.gamepad.buttons[1];
	display_looper = setInterval(gamepadPoll, 100);
};

const controllerDisconnector = function(e) {
	clearInterval(display_looper);
	metainfo.innerHTML = "Controller disconnected, reconnect to display info";
	buttonsinfo.innerHTML = "";
	debuginfo.innerHTML = "";
};

const gamepadPoll = function() {
	controller.gamepad = navigator.getGamepads()[controller.gamepad.index];
	buttonsinfo.innerHTML = controller.printButtons();
	axesinfo.innerHTML = controller.printAxes();
	//debuginfo.innerHTML = JSON.stringify(controller.gamepad.buttons[0], null, 4);
	//debuginfo.innerHTML = fullPropertyPrinter(controller.gamepad);
	debuginfo.innerHTML = controller.gamepad.id.includes("Vendor: 054c");
};

window.addEventListener("gamepadconnected", controllerConnector);
window.addEventListener("gamepaddisconnected", controllerDisconnector);