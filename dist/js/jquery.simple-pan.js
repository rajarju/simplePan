/**
 * Simple Pan jQuery Plugin
 * ========================
 * Adds Simple Panning of Image Capability to images inside a container.
 */
(function($){

  $.fn.simplePan = function(options){

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
      

      if(settings.centerImage){
        $img.css({
          left: $this.width()/2 -($img.width()/2),
          top: $this.height()/2 -($img.height()/2)
        });
      }

      if(settings.mousewheel){      
        if(typeof $.fn.mousewheel !== "undefined"){

          var scale, newScale = 1;

          if(settings.zoomAnimate){
            $img.addClass('animate');
          }


          $this.on('mousewheel', function(e){
            e.preventDefault();
            console.log(e.deltaY, e.deltaX);
            newScale = scale + e.deltaY * settings.zoomDelta;      

            if(newScale <= settings.maxZoom && newScale >= settings.minZoom){
              scale = newScale;      
              $img.css({
                'transform' : 'scale(' + scale + ')',
                '-webkit-transform' : 'scale(' + scale + ')',
                '-moz-transform' : 'scale(' + scale + ')',
                '-o-transform' : 'scale(' + scale + ')',
                '-ms-transform' : 'scale(' + scale + ')'
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
        console.log($this.move);
        e.preventDefault();
      });
      //Reset the flags on mouse up
      $this.on('mouseup mouseout', function(e){
        $this.move.status = false;
        $this.move.oldX = (e.pageX - $img.offset().left);
        $this.move.oldY = (e.pageY - $img.offset().top);
        e.preventDefault();
        console.log($this.move);
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