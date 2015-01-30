
$(function(){
    var model = {

        currentCat: null,
        cats: [],
        init: function(catNames) {
            //this.currentCat = null;
            //this.cats = [];

            var numberOfCatClickers = catNames.length,
                i;

            for(i = 0; i < numberOfCatClickers; i++) {
                model.add(new CatClicker(i, catNames[i]));
            }

        },
        add: function(obj) {
            model.cats.push(obj);
        },
        getAllCats: function() {
            return model.cats;
        },
        getCat: function(index) {
            return model.getAllCats()[index];
        },
        getAllCatNames: function() {
            var catNames = [];
            var allCats = this.getAllCats().forEach(function(cat) {
                catNames.push(cat.name);
            });
            return catNames;
        },

        incrementCatCounter: function(index) {
            model.currentCat.numberOfClicks++;
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
            model.currentCat = model.getCat(index);
            catDisplayView.render(model.currentCat);
        },

        catClicked: function() {
            model.incrementCatCounter();
            catDisplayView.render(model.currentCat);
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
            this.catImage = $('#cat-image');
            this.numberOfClicks = $('#number-of-clicks');
            this.catName = $('#cat-name');

            this.catImage.click(function(event) {
                octopus.catClicked();
            });
        },

        render: function(cat) {
            this.catImage.attr("src",'http://lorempixel.com/500/375/cats/' + (cat.index + 1));
            this.numberOfClicks.html(cat.numberOfClicks);
            this.catName.html(cat.name);
        }
    };

    octopus.init();
});

var CatClicker = function(index, name) {
    this.name = name;
    this.numberOfClicks = 0;
    this.index = index;
};
