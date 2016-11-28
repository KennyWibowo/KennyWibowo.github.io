var dogtext = document.getElementById("dogtext");
var header = document.getElementById("header");

var image = new Image();
var doggified = false;

var dogswitch = true;

image.onload = function() {
	var prev_bkg = header.style.backgroundImage;
	dogtext.onclick = function() {

		// Switch between default background and 
		if(!doggified) {
			prev_bkg = header.style.backgroundImage;
			header.style.backgroundImage = 'url("https://wibow.io/res/doggies.png")';
			
			// Switch between Bella and Chewie
			if(dogswitch) {
				header.style.backgroundPosition = "left top";
			} else {
				header.style.backgroundPosition = "right top";
			}

			dogswitch = !dogswitch;
		} else {
			header.style.backgroundImage = prev_bkg;
			header.style.backgroundPosition = "center top";
		}

		doggified = !doggified;
	}
}

// Prefetch the image
image.src = "https://wibow.io/res/doggies.png"
