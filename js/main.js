var CatClicker = function(index, name, image, color) {
    this.name = name;
    this.image = image;
    this.numberOfClicks = 0;
    this.numberOfClicksID = 'numberOfClicks' + index.toString();
    this.imageID = 'image' + index.toString();
    if(color) {
        this.color = color;
    }
    else {
        this.color = 'black';
    }
};

CatClicker.prototype.getHtml = function() {
    return '<div style="position: relative; width: 100%">' +
        '<img id="' + this.imageID + '" src="images/' + this.image + '" width="500" height="375">' +
        '<h2 id="' + this.numberOfClicksID + '" style="position: absolute; top: 0px; left: 25px; width: 100%; color: '+ this.color +'">0</h2>' +
        '</div>';
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
