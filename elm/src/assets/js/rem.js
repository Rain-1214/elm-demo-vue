window.onload = () =>{
	let windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
	let rem;
	if(windowWidth < 1080) {
		rem = windowWidth/1080 * 162;
	}else{
		rem = 162;
	}
	let html = document.getElementsByTagName('html')[0];
	html.style.fontSize = rem + 'px';	
	window.onresize = () => {
		let windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
		let rem;
		if(windowWidth < 1080) {
			rem = windowWidth/1080 * 162;
		}else{
			rem = 162;
		}
		let html = document.getElementsByTagName('html')[0];
		html.style.fontSize = rem + 'px';
	}
}