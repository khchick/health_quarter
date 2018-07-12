const unirest = require('unirest');

    // //calls below are reference, right now all information called goes to console.
    // //call for vegitarian or dessert (one recipe)
    // unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=1&tags=vegetarian%2Cdessert")
    // .header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")//api key 
    // .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")//napi host 
    // .end(function (result) {
    //   console.log(result.status, result.headers, result.body);
    // });

    // //call for two recipes no tags
    // unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=2&limitLicense=false")
    // .header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")
    // .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    // .end(function (result) {
    //   console.log(result.status, result.headers, result.body);
    // });


    // //call for recipe by nutritional demands (many demands)
    // unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByNutrients?minCarbs=0&minProtein=0&offset=0&number=5&random=true&maxCalories=400&maxCarbs=400&maxFat=30&maxProtein=200&minFat=5&minCalories=0&minAlcohol=0&maxAlcohol=50&mincaffeine=0&maxCaffeine=50&mincopper=0&maxcopper=50&mincalcium=0&maxcalcium=50&mincholine=0&maxcholine=50&mincholesterol=0&maxcholesterol=50&minfluoride=0&maxfluoride=50&minSaturatedFat=0&maxSaturatedFat=50&minVitaminA=0&maxVitaminA=50&minvitaminc=0&maxvitaminc=50&minvitamind=0&maxvitamind=50&minvitamine=0&maxvitamine=50&minvitamink=0&maxvitamink=50&minvitaminb1=0&maxvitaminb1=50&minvitaminb2=0&maxvitaminb2=50&minvitaminb5=0&maxvitaminb5=50&minvitaminb3=0&maxvitaminb3=50&minvitaminb6=0&maxvitaminb6=50&minvitaminb12=0&maxvitaminb12=50&minFiber=0&maxFiber=50&minFolate=0&maxFolate=50&minFolicAcid=0&maxFolicAcid=50&minIodine=0&maxIodine=50&miniron=0&maxiron=50&maxmagnesium=50&minmanganese=0&maxmanganese=50&minphosphorus=0&maxphosphorus=50&minpotassium=0&maxpotassium=50&minSelenium=0&maxSelenium=50&minsodium=0&maxsodium=50&minSugar=0&maxSugar=50&minzinc=0&maxzinc=50")
    // .header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")
    // .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    // .end(function (result) {
    //   console.log(result.status, result.headers, result.body);
    // });

//in theory 5 recipes with calories between 400-150
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByNutrients?number=5&random=true&maxCalories=400&minCalories=150")
.header("X-Mashape-Key", "vCWPJf4dnVmsh6TnOwGo3q8oKumOp14Hxw8jsnhOrBKwlELEZm")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
  console.log(result.status, result.headers, result.body); 
  
});





//figure out how to manipulate data received from spoonacular

// retreving a FormData object from a HTML form 

// let formdata = new FormsData(someFormElement);

// EG
// var formElement = document.querySelector("form");
// var request = new XMLHttpRequest();
// request.open("POST", "submitform.php");
// request.send(new FormData(formElement));

// You can also append additional data to the FormData object between retrieving it from a form and sending it, like this:

// var formElement = document.querySelector("form");
// var formData = new FormData(formElement);
// var request = new XMLHttpRequest();
// request.open("POST", "submitform.php");
// formData.append("serialnumber", serialNumber++);
// request.send(formData);
// This lets you augment the form's data before sending it along, to include additional information that's not necessarily user-editable.