var CatClicker = function(index, name) {
    this.name = name;
    this.numberOfClicks = 0;
    this.numberOfClicksID = 'numberOfClicks' + index.toString();
    this.imageID = 'image' + index.toString();
    this.index = index;
};

CatClicker.prototype.getHtml = function() {
    var catImage = '<img id="' + this.imageID + '" src="http://lorempixel.com/500/375/cats/' + this.index + '" width="500" height="375">',
        clickNumberRendering = '<h2 style="position: absolute; top: 0px; left: 25px; width: 100%"><span id="' + this.numberOfClicksID + '" >' + this.numberOfClicks + '</span></h2>',
        catNameRendering = '<h1 style="position: absolute; bottom: 0px; left: 25px; width: 100%"><span>' + this.name + '</span></h1>';

    return catImage + clickNumberRendering + catNameRendering;
};

CatClicker.prototype.setupClickEvent = function() {
    $( '#' + this.imageID ).click({catClicker: this}, function( event ) {
        event.data.catClicker.incrementAndDisplayCounter();
    });
};

CatClicker.prototype.incrementAndDisplayCounter = function() {
    this.numberOfClicks++;
    $( '#' + this.numberOfClicksID).text(this.numberOfClicks);
};
