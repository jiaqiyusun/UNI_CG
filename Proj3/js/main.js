const canvas = document.getElementById("canvas");

const sceneManager = new SceneManager(canvas);

bindEventListeners();
resizeCanvas();
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;
	window.onkeydown = onKeyDown;
	window.onkeyup = onKeyUp;
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}

function onKeyDown(key) {
	sceneManager.onKeyDown(key);
}

function onKeyUp(key) {
	sceneManager.onKeyUp(key);
}

function render() {
	sceneManager.update();
    requestAnimationFrame(render);
}