
/**
 * Simple Pan jQuery Plugin
 * ========================
 * Adds Simple Panning of Image Capability to images inside a container.
 * 
 * Options
 * css :        [JSON] Css properties for the Image Container
 * mousewheel:  [BOOLEAN] (Requires jQuery MouseWheel plugin). 
 *              Used for Zooming in and Zooming out
 * zoomDelta:   [FLOAT] Steps to zoom  on each click
 * zoomAnimate: [BOOLEAN] Enable Disable CSS3 Animation
 * maxZoom:     [FLOAT] Maximum zoom
 * minZoom:     [FLOAT] Minimum zoom
 * 
 * initialZoom: [string/FLOAT] Can describe how the image 
 *              should be zoomed and fitted
 * controls:    [BOOLEAN] Flag set to show/hide controls
 */
(function($){

  $.fn.simplePan = function(options){

    // Template for controls to be shown
    // Controls include
    // 1. Zoom IN
    // 2. Zoom Out
    // 3. View Finder
    var controlsTpl = function(){

    };

    var settings = $.extend({
      centerImage: true,
      css: {
        height: '500px',
        width: '600px'
      },
      mousewheel: false,

      zoomDelta : 0.1,
      zoomAnimate: true,
      maxZoom : 1,
      minZoom: 0.5,
      initialZoom : 'center',


    }, options);

    return this.each(function(i, j){
      var $this = $(j);
      // Find Image to pan
      var $img = $("img", $this);

      $this.addClass('simple-pan').css(settings.css);
      $img.addClass('pan-image').css({
        top: 0,
        left: 0
      });

      //Flags to map the position of the image
      $this.move = {
        status : false,
        oldX : 0,
        oldY : 0
      };        
      
      $this.scale = 1;

      // Initialy Position image in center
      if(settings.centerImage){
        $img.css({
          left: $this.width()/2 -($img.width()/2),
          top: $this.height()/2 -($img.height()/2)
        });
      }

      if(settings.initialZoom){

        if( typeof settings.initialZoom == "number"){        
          $this.scale = settings.initialZoom;
          $img.css({
            'transform' : 'scale(' + $this.scale + ')',
            '-webkit-transform' : 'scale(' + $this.scale + ')',
            '-moz-transform' : 'scale(' + $this.scale + ')',
            '-o-transform' : 'scale(' + $this.scale + ')',
            '-ms-transform' : 'scale(' + $this.scale + ')'
          });     
        }
        /**
         * Here we try to fix the zoom level based on image dimensions
         */
        if( typeof settings.initialZoom == "string"){
          switch(settings.initialZoom){
            case 'fit' : 
            break;
            case 'fit-width' : 
            break;
            case 'fit-height' : 
            break;
            case 'fill' : 
            break;
            case 'fill-width' : 
            break;
            case 'fill-height' : 
            break;
          }
        }
      }

      if(settings.mousewheel){      
        if(typeof $.fn.mousewheel !== "undefined"){

          var newScale = $this.scale;

          if(settings.zoomAnimate){
            $img.addClass('animate');
          }


          $this.on('mousewheel', function(e){
            e.preventDefault();
            newScale = $this.scale + e.deltaY * settings.zoomDelta;      

            if(newScale <= settings.maxZoom && newScale >= settings.minZoom){
              $this.scale = newScale;      
              $img.css({
                'transform' : 'scale(' + $this.scale + ')',
                '-webkit-transform' : 'scale(' + $this.scale + ')',
                '-moz-transform' : 'scale(' + $this.scale + ')',
                '-o-transform' : 'scale(' + $this.scale + ')',
                '-ms-transform' : 'scale(' + $this.scale + ')'
              });              
            }


          });



        }
        else{
          alert("jQuery Mousewheel plugin missing");
        }
      }


      //Set the flags and the starting co-ordinates on move down
      $this.on('mousedown', function(e){
        $this.move.status = true;
        $this.move.oldX = (e.pageX - $img.offset().left);
        $this.move.oldY = (e.pageY - $img.offset().top);
        e.preventDefault();
      });
      //Reset the flags on mouse up
      $this.on('mouseup mouseout', function(e){
        $this.move.status = false;
        $this.move.oldX = (e.pageX - $img.offset().left);
        $this.move.oldY = (e.pageY - $img.offset().top);
        e.preventDefault();
      });
      //Check the mouse button and move the image with respect to the cursor position
      $this.on('mousemove', function(e){          
        if($this.move.status){
          //Update position based on drag
          $img.css('left', parseInt($img.css('left')) + (e.pageX - $img.offset().left) - $this.move.oldX);    
          $img.css('top', parseInt($img.css('top')) + (e.pageY - $img.offset().top) - $this.move.oldY);     
        }
        e.preventDefault();
      });      
    });
  };
})(jQuery);