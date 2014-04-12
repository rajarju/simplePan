     $(function(){
      //   $("#simplePan1").simplePan({
      //     css: {
      //       height: '600px',
      //       width: '100%'
      //     },
          
      //   });


        module("bind tests", {
          setup: function(){
            $("#main").html($("#wrapper-template").html());        
          },
          teardown: function(){
            $('#main').empty();
          }
        });

        test("basic use", function(){
            $("#simplePan").simplePan({
              css: {
                height: '600px',
                width: '600px'
              }     
            });

            equal($("#simplePan").hasClass('simple-pan'), true, "Wrapper CSS class assigned");
            equal($("#simplePan img").hasClass('pan-image'), true, "Image CSS class assigned");

            equal($("#simplePan").width(), 600, "Wrapper width set");
            equal($("#simplePan").height(), 600, "Wrapper height set");
        });


        test("Center Image", function(){

          $("#simplePan").simplePan({
              css: {
                height: '600px',
                width: '600px'
              },
              centerImage: true
            });

          $this = $('#simplePan');
          $img = $('img', $this);

          equal($img.css('left'), $this.width()/2 -($img.width()/2) + "px", "Left Position Correct");
          equal($img.css('top'), $this.height()/2 -($img.height()/2) + "px", "Top Position Correct");
        });
      });
