window.onload = () =>{
	let windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
	let rem;
	if(windowWidth < 540) {
		rem = windowWidth * 0.2;
	}else{
		rem = 108;
	}
	let html = document.getElementsByTagName('html')[0];
	html.style.fontSize = rem + 'px';	
	window.onresize = () => {
		let windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
		let rem;
		if(windowWidth > 540){
			rem = 108;
		}else{
			rem = windowWidth * 0.2;
		}
		let html = document.getElementsByTagName('html')[0];
		html.style.fontSize = rem + 'px';
	}
}