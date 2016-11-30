(function($) {

    // non-jQuery vanilla functionality of easter egg.
    var noJQ = function() {
        var dogtext = document.getElementById("dogtext");
        var header = document.getElementById("header");
        var me = document.getElementById("me");

        var image = new Image();

        var doggified = false;
        var dogswitch = true;

        image.onload = function() {
            var prev_bkg = header.style.backgroundImage;
            dogtext.onclick = function() {

                // Switch between default background and original background
                if(!doggified) {
                    prev_bkg = header.style.backgroundImage;
                    header.style.backgroundImage = 'url("https://wibow.io/res/doggies.png")';

                    me.style.visibility = "hidden";
                    
                    // Switch between Bella and Chewie
                    if(dogswitch) {
                        header.style.backgroundPosition = "left top";
                    } else {
                        header.style.backgroundPosition = "right top";
                    }

                    dogswitch = !dogswitch;
                } else {
                    me.style.visibility = "";
                    header.style.backgroundImage = prev_bkg;
                    header.style.backgroundPosition = "center top";
                }

                doggified = !doggified;
            }
        }

        // Prefetch the image
        image.src = "https://wibow.io/res/doggies.png";
    }

    // TODO: animate using animate.css and jQuery
    var yesJQ = function($) {
        if(!$) {
            return;
        }

        var dogtext = $('#dogtext');
        var header = $('#header');
    }

    // Cache the previous onload and run any passed in one.
    var addOnloadEvent = function(event) {
        if(typeof window.onload != 'function') { 
            window.onload = event;  // If first in chain, just set onload as function itself
        } else {
            // Execute previous onload event
            var prev = window.onload;

            // Can chain caches within caches for multiple onload functions.
            window.onload = function() {
                if(prev) {
                    prev();
                }
                
                event();
            };
        }
    }


    addOnloadEvent(function() {
        // Execute based off of whether we have jQuery.
        /*if (window.jQuery) {  
            yesJQ(window.jQuery);
        } else {
            noJQ();
        }*/

        noJQ();
    });

})();