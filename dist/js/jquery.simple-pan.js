/**
 * Simple Pan jQuery Plugin
 * ========================
 * Adds Simple Panning of Image Capability to images inside a container.
 */
(function($){

  $.fn.simplePan = function(options){

    var settings = $.extend({

    }, options);

    return this.each(function(){
      var $this = $(this);

      // Find Image to pan
      $("img", $this);

    });



  };


})(jQuery);