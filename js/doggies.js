(function($) {
    // Logic to handle flipping between dog and non-dog backgrounds
    var dogflip = function(src, elem, onDoggify, onNonDoggify) {
        var image = new Image();

        var doggified = false;
        
        elem.onclick = function() {

            // Switch between default background and original background
            if(!doggified) {
                onDoggify();
            } else {
                onNonDoggify();
            }

            doggified = !doggified;
        }

        // Prefetch the image
        image.src = src;
    }

    // non-jQuery vanilla functionality of easter egg.
    var noJQ = function() {
        var dogtext = document.getElementById("dogtext");
        var header = document.getElementById("header");
        var me = document.getElementById("me");
        
        var prev_bkg = header.style.backgroundImage;
        var dogswitch = true;

        dogflip("https://wibow.io/res/doggies.png", dogtext,
            function onDoggify() {
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
            }, function onNonDoggify() {
                me.style.visibility = "";
                header.style.backgroundImage = prev_bkg;
                header.style.backgroundPosition = "center top";
            }
        );
    }

    // Animated version of easter egg that bounces my face in and out
    var yesJQ = function($) {
        if(!$) {
            return;
        } else {
            $.fn.visible = function() {
                return this.css('visibility', 'visible');
            };

            $.fn.invisible = function() {
                return this.css('visibility', 'hidden');
            };

            var animate = function(elem, animationName, next) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                elem.addClass('animated ' + animationName).one(animationEnd, function() {
                    elem.removeClass('animated ' + animationName);
                    
                    if(next) {
                        next();
                    }
                });
            }
        }

        var dogtext = document.getElementById("dogtext");
        var header = $('#header');
        var me = $('#me');
        
        var prev_bkg = header.css("background-image");
        var dogswitch = true;

        dogflip("https://wibow.io/res/doggies.png", dogtext,
            function onDoggify() {
                prev_bkg = header.css("background-image");
                header.css("background-image", 'url("https://wibow.io/res/doggies.png")');

                animate(me, "bounceOut", function() {
                    me.invisible();
                })
                
                // Switch between Bella and Chewie
                if(dogswitch) {
                    header.css("background-position", "left top");
                } else {
                    header.css("background-position", "right top");
                }

                dogswitch = !dogswitch;
            }, function onNonDoggify() {
                me.visible();
                animate(me, "bounceIn", function() {
                    me.visible();
                });

                header.css("background-image", prev_bkg);
                header.css("background-position", "center top");
            }
        );
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

    // Execute based off of whether we have jQuery.
    addOnloadEvent(function() {
        if (window.jQuery) {  
            yesJQ(window.jQuery);
        } else {
            noJQ();
        }
    });

})();