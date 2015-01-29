
$(function(){
    var model = {
        init: function(catNames) {
            var numberOfCatClickers = catNames.length,
                catClickers = [],
                i;

            if (!localStorage.cats) {
                console.log('initializing cat data');
                localStorage.cats = JSON.stringify([]);
                for(i = 0; i < numberOfCatClickers; i++) {
                    model.add(new CatClicker(i, catNames[i]));
                }
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.cats);
            data.push(obj);
            localStorage.cats = JSON.stringify(data);
        },
        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },
        getCat: function(index) {
            return this.getAllCats()[index];
        },
        getAllCatNames: function() {
            var catNames = [];
            var allCats = this.getAllCats().forEach(function(cat) {
                catNames.push(cat.name);
            });
            return catNames;
        },

        incrementCatCounter: function(index) {
            var data = JSON.parse(localStorage.cats);
            data[index].numberOfClicks++;
            localStorage.cats = JSON.stringify(data);
        }

    };


    var octopus = {

        init: function() {
            var catNames = ['Fluffy', 'Mr. Whiskers', 'Claws', 'Sandy', 'Steve'];

            model.init(catNames);
            catListView.init(catNames.length);
            catDisplayView.init();
            octopus.displayCat(0);
        },

        getCatNames: function() {
            return model.getAllCatNames();
        },

        getAllCats: function() {
            return model.getAllCats();
        },

        displayCat: function(index) {
            catDisplayView.render(model.getCat(index));
            catDisplayView.registerClickEvent(index);
        },

        catClicked: function(index) {
            model.incrementCatCounter(index);
            octopus.displayCat(index);
        }
    };

    var catListView = {

        init: function(numberOfCatClickers) {
            this.catList = $('#cat-list');
            catListView.render();

            for(var i=0; i < numberOfCatClickers; i++) {
                $( '#cat-name'+i ).click({index: i}, function(event) {
                    octopus.displayCat(event.data.index);
                });
            }
        },

        render: function() {
            var htmlStr = '';
            var allCats = octopus.getAllCats();
            console.log(allCats.toString());
            octopus.getAllCats().forEach(function(cat) {
                htmlStr += '<li><span id="cat-name' + cat.index + '">' + cat.name + '</span></li>'
            });
            console.log(htmlStr);
            this.catList.html(htmlStr);
        }
    };

    var catDisplayView = {

        init: function() {
            this.displayArea = $('#display-area');
        },

        registerClickEvent: function(index) {
            $( '#image'+index ).click({index: index}, function(event) {
                octopus.catClicked(event.data.index);
            });
        },

        render: function(cat) {
            var catImage = '<img id="' + cat.imageID + '" src="http://lorempixel.com/500/375/cats/' + cat.index + '" width="500" height="375">',
                clickNumberRendering = '<h2 style="position: absolute; top: 0px; left: 25px; width: 100%"><span id="' + cat.numberOfClicksID + '" >' + cat.numberOfClicks + '</span></h2>',
                catNameRendering = '<h1 style="position: absolute; bottom: 0px; left: 25px; width: 100%"><span>' + cat.name + '</span></h1>';

            this.displayArea.html(catImage + clickNumberRendering + catNameRendering);
        }
    };

    octopus.init();
});



var CatClicker = function(index, name) {
    this.name = name;
    this.numberOfClicks = 0;
    this.numberOfClicksID = 'numberOfClicks' + index.toString();
    this.imageID = 'image' + index.toString();
    this.index = index;
};
