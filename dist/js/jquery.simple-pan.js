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
      }
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