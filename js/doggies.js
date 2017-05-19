(function() {
    // Prefetch the image
    var image_src = "https://wibow.io/res/doggies.jpg";
    var image = new Image();
    image.src = image_src;

    // Logic to handle flipping between dog and non-dog backgrounds
    var dogflip = function(elem, onDoggify, onNonDoggify) {

        var doggified = false;

        if(window.jQuery) {
            var $ = window.jQuery;
            console.log(elem)

            $(elem).click(function() {
                // Switch between default background and original background
                if(!doggified) {
                    onDoggify($);
                } else {
                    onNonDoggify($);
                }

                doggified = !doggified;
            })
        } else {
            elem.onclick = function() {
                console.log("derp");

                // Switch between default background and original background
                if(!doggified) {
                    onDoggify();
                } else {
                    onNonDoggify();
                }

                doggified = !doggified;
            } 
        }   
    }

    // non-jQuery vanilla functionality of easter egg.
    var noJQ = function() {
        document.addEventListener("DOMContentLoaded", function(event) {
            var dogtext = document.getElementById("dogtext");
            var header = document.getElementById("header");
            var me = document.getElementById("me");
            
            var prev_bkg = header.style.backgroundImage;
            var prev_pos = header.style.backgroundPosition;
            var dogswitch = true;

            dogflip(dogtext,
                function onDoggify() {
                    prev_bkg = header.style.backgroundImage;
                    header.style.backgroundImage = 'url("https://wibow.io/res/doggies.jpg")';

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
                    header.style.backgroundPosition = prev_pos;
                }
            );
        });
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

        $(document).ready(function() {
            var dogtext = document.getElementById("dogtext");
            var header = $('#header');
            var me = $('#me');
            
            var prev_bkg = header.css("background-image");
            var prev_pos = header.css("background-position")
            var dogswitch = true;

            dogflip(dogtext,
                function onDoggify() {
                    prev_bkg = header.css("background-image");
                    header.css("background-image", 'url("' + image_src + '")');

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
                    header.css("background-position", prev_pos);
                }
            );
        });
    }

    // Execute based off of whether we have jQuery.
    if (window.jQuery) {  
        yesJQ(window.jQuery);
    } else {
        noJQ();
    }

})($);