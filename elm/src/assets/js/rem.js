window.onload = () =>{
	let windowWidth = window.innerWidth;
	let rem;
	if(windowWidth < 980) {
		rem = (windowWidth/980) * 108;
	}else{
		rem = 108;
	}
	let html = document.getElementsByTagName('html')[0];
	html.style.fontSize = rem + 'px';	

	//set meat viewport
	let dpr = window.devicePixelRatio;
	let meta = document.createElement('meta');
	let initialScale = 1 / dpr;
	let maximumScale = 1 / dpr;
	let minimumScale = 1 / dpr;
	meta.setAttribute('name', 'viewport');
	meta.setAttribute('content', `width=device-width, user-scalable=no, initial-scale=${initialScale}, maximum-scale=${maximumScale}, minimum-scale=${minimumScale}`);
	document.head.appendChild(meta);
	
	window.onresize = () => {
		let windowWidth = window.innerWidth;
		let rem;
		if(windowWidth < 980) {
			rem = (windowWidth/980) * 108;
		}else{
			rem = 108;
		}
		let html = document.getElementsByTagName('html')[0];
		html.style.fontSize = rem + 'px';
	}
}