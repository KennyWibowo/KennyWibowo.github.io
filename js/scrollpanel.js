(function() {
    $(window).ready(function() {
        /* http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling */

        var experience_ctx = document.getElementById("experience-items");
        var image_panel = document.getElementById("scroll-panel");
        var languages_ctx = document.getElementById("language-section")
        var experience_title_ctx = document.getElementById("experience-title");

        var scroll_images = $(".scroll-image");
        var experience_items = $(".experience-item-container");

        function update() {
            var windowHeight = $(window).height();
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var experienceTop = $(experience_ctx).offset().top;
            var experienceBottom = experienceTop + $(experience_ctx).height();

            var visible = !(((experienceBottom <= docViewBottom) || (experienceTop >= docViewTop)));

            var bottomPos = ($(languages_ctx).offset().top - $(image_panel).height());
            var topPos = $(experience_ctx).offset().top;

            if(visible) {
                $(image_panel).css("top", "0px");
                $(image_panel).css("position", "fixed");
            } else if(experienceBottom <= docViewBottom) {
                // For when window is below scroll panel
                $(image_panel).css("top", bottomPos + "px");
                $(image_panel).css("position", "absolute");
            } else if(experienceTop >= docViewTop) {
                // For when window is above scrollpanel
                if(windowHeight > topPos) {
                    $(image_panel).css("top", windowHeight*1.2 + "px");
                    $(image_panel).css("position", "absolute");
                } else {
                    $(image_panel).css("top", topPos + "px");
                    $(image_panel).css("position", "absolute");
                }
            }

            for(var i = 0; i < experience_items.length; i++) {
                var itemHeight = $(experience_items[i]).height();
                var itemHeightHalf = itemHeight/2;
                var itemTop = $(experience_items[i]).offset().top;
                var itemBottom = itemTop + itemHeight;

                if(docViewBottom > itemTop) {
                    var visiblePct = (docViewBottom - itemTop)/itemHeight;

                    if(itemTop < docViewTop) {
                        visiblePct = (itemBottom - docViewTop)/itemHeight;

                        if( visiblePct < 0 ) {
                            visiblePct = 0;
                        }
                    }

                    visiblePct *= 2;

                    // start hiding title for first one
                    if( i == 0 ) {
                        $(experience_title_ctx).css("opacity", (1-visiblePct).toString());
                    }

                    $(scroll_images[i]).css("opacity", visiblePct.toString());
                } else {
                    $(scroll_images[i]).css("opacity", "0");
                }
            }
        }

        update();

        window.addEventListener("scroll", update);
        
    })
})();
