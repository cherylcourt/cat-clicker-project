
$(function(){
    var model = {

        currentCat: null,
        cats: [],
        init: function(catNames) {
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
            adminView.init();
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
            adminView.setupAdminEvent(model.currentCat);
        },

        catClicked: function() {
            model.incrementCatCounter();
            catDisplayView.render(model.currentCat);
        },

        updateCurrentCat: function(name, url, clicks) {
            cat = model.getCat(model.currentCat.index);
            cat.name = name;
            cat.url = url;
            cat.numberOfClicks = clicks;

            model.currentCat = cat;

            adminView.setupAdminEvent(model.currentCat);
            catListView.updateCatName(model.currentCat.index, name);
            octopus.displayCat(model.currentCat.index)
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

            octopus.getAllCats().forEach(function(cat) {
                htmlStr += '<li><span id="cat-name' + cat.index + '">' + cat.name + '</span></li>'
            });

            this.catList.html(htmlStr);
        },

        updateCatName: function(index, name) {
            $( '#cat-name'+ index).html(name);
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
            this.catImage.attr("src", cat.url);
            this.numberOfClicks.html(cat.numberOfClicks);
            this.catName.html(cat.name);
        }
    };

    var adminView = {
        init: function() {
            this.adminButton = $("#admin-button");

            $("#cancel-button").click(function () {
                $("#admin-form").hide();
                $("#admin-button").show();
            });

            $("#save-button").click(function() {
                $("#admin-form").hide();
                $("#admin-button").show();
                octopus.updateCurrentCat($("#admin-name").val(), $("#admin-url").val(), parseInt($("#admin-clicks").val()));
            });
        },

        setupAdminEvent: function(currentCat) {
            this.adminButton.click(function() {
                $("#admin-button").hide();
                $("#admin-form").show("fast");

                $("#admin-name").val(currentCat.name);
                $("#admin-url").val(currentCat.url);
                $("#admin-clicks").val(currentCat.numberOfClicks);
            });

        }
    };

    octopus.init();
});

var CatClicker = function(index, name) {
    this.name = name;
    this.numberOfClicks = 0;
    this.index = index;
    this.url = 'http://lorempixel.com/500/375/cats/' + (index + 1);
};
