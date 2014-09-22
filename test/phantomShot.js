var page = require('webpage').create();

page.viewportSize = {width: 1280, height: 1024};

var defer = function(){
  var finish = 3;
  return function(){

    if(finish == 0){
      phantom.exit();
    }
    else{
      finish--;
      console.log('Finished ' + finish);
    }
  }
}

page.open('http://localhost:9876', function() {
  var fileName = "screenshots/" + (new Date()).getTime() + "/1280.png";
  page.render(fileName);
  defer();
}); 


page.viewportSize = {width: 1024  , height: 720};

page.open('http://localhost:9876', function() {
  var fileName = "screenshots/" + (new Date()).getTime() + "/1024.png";
  page.render(fileName);
  defer();
}); 

page.viewportSize = {width: 800, height: 480};

page.open('http://localhost:9876', function() {
  var fileName = "screenshots/" + (new Date()).getTime() + "/800.png";
  page.render(fileName);
  defer();
}); 