/*(function($) {
    var sliderUl = $('div.slider').css('overflow', 'hidden').children('ul'),
        imgs = sliderUl.find('img'),
        imgWidth = imgs[0].width, 
        imgsLen = imgs.length, //number of imgs in collections,
        current = 1,
        totalImgsWidth = imgsLen * imgWidth; //the total size of the slider
        
    $('#slider-nav').show()
                    .find('button')
                    .on('click', function() {
                        var direction = $(this).data('dir'),
                            loc = imgWidth; //600
                        
                        //update current
                        (direction === 'next') ? ++current : --current; //++ & -- before variable increases value THEN reads it
                        
                        //if first img check
                        if (current === 0) { //if they hit the back button from first img
                            current = imgsLen; 
                            direction = 'next'; 
                            loc = totalImgsWidth - imgWidth; 
                        } else if (current - 1 === imgsLen) { //user is on last img
                            current = 1;
                            loc = 0; //resetting slider
                        }
                        
                        transition(sliderUl, loc, direction);
                        console.log('loc');
                    });
                    
                    function transition(container, loc, direction) {
                        var unit; // -= or +=
                        
                        if (direction && loc !== 0) {
                            unit = (direction === 'next') ? '-=' : '+=';
                        }
                        
                        container.animate({
                            'margin-left': unit ? (unit + loc) : loc //is there a unit value?
                        });
                    }
                    
})(jQuery); //making sure the the $ is associated with jQuery in this block*/

function Slider(container, nav) {
    this.container = container;
    this.nav = nav.show();
    this.imgs = this.container.find('img');
    this.imgWidth = this.imgs[0].width; //600
    this.imgsLen = this.imgs.length;
    
    this.current = 0;
    
    this.events.click.call(this); //makes sure "this" is container
}

Slider.prototype.transition = function(coords) {
    this.container.animate({
       'margin-left': coords || -(this.current * this.imgWidth) //2 * width = -1200 
    });
};

Slider.prototype.setCurrent = function ( dir ) {
    var pos = this.current; //is NOT acutally 'this'.current, just the same value
    
    pos += ( ~~(dir === 'next') || -1); //add 1 IF the dir = 'next' using ~~
    
    this.current = ( pos < 0 ) ? this.imgsLen - 1 : pos % this.imgsLen; // making sure that image is updated back to 0 if necessary

    return pos; //for access later if you need it
};

Slider.prototype.events  = {
  click: function() {
      var self = this; //prvent button from being "this"
      self.nav.find('button').on('click', function() {
          var current = self.setCurrent( $(this).data('dir') );
          
          self.transition();
      });
  }  
};
