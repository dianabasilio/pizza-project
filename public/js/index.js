function addTopping() {
    $.ajax({
        url: 'index.php?action=addTopping',
        data: {
            topping: $("#topping").val()
        },
        success: function(result) {
            try {
                json = jQuery.parseJSON(result);
                console.log(json);
            } catch (e) {
                showError("Invalid JSON returned from server: " + result);
                return;
            }
            if (json["success"] === 0) {
                showError(json["errormsg"]);
            } else {
                $("#topping").val("");
                getToppings();
            }
        },
        error: function() {
            showError('Error Reaching index.php');
        }
    });
}

function getToppings() {
    $.ajax({
        url: 'index.php?action=getToppings',
        dataType:"JSON",
        success: function(json) {

            if (json["success"] === "0") {
                showError(json["errormsg"]);
            } else {
                console.log(json);
                //Excluding last value to compare later the last value with this one
                var arrayWithoutLast=  json.toppings.slice(0,-1);
                //If the topping is already there, show message
                if( ($.inArray(json.toppings[json.toppings.length-1], arrayWithoutLast) != -1)  ){
                    showError('You have already listed that topping');
                } else {
                    if (json.toppings.length > 0) {
                        $("#listToppings").empty();
                        $(".images-ing").empty();
                        $.each(json.toppings, function(key, value) {
                            $("#listToppings").append("<li class='list-group-item d-flex justify-content-between align-items-center'><span>" + value + "</span><span class='badge badge-danger badge-pill' onClick='deleteTopping("+key+")' > Delete<i class='fa-solid fa-xmark'></i></span></li>");
                        });
                        $('p.hasToppings').show();
                        $('p.isEmpty').hide();
                    } else {
                        $("#listToppings").empty();
                        $('p.hasToppings').hide();
                        $('p.isEmpty').show();
                    }
                }
            }
        },
        error: function() {
            showError('Error Reaching Server');
        }
    });
}

function deleteTopping(toppingId){
    console.log(toppingId);

    $.ajax({
        url: 'index.php?action=deleteTopping&toppingId='+toppingId,
        dataType: 'JSON',
        success: function(result) {
            console.log(result);

            if(result.success === 0){
                showError(result.message);
            }else{
                console.log("delete");
                getToppings();
            }
        },
        error: function(xhr) {
            console.log(xhr);
            showError('Error Reaching Server');
        }

    });

}

function checkOut() {

    $.ajax({
        url: 'index.php?action=checkOut',
        dataType:"JSON",
        success: function(json) {

            if (json["success"] === "0") {
                showError(json["errormsg"]);
            } else {
                console.log(json);
                if (json.toppings.length > 0) {
                    $("#listToppings").empty();
                    $.each(json.toppings, function(key, value) {
                        if((value == 'Cheese')&(!($("img.cheese").length))){
                          $(".images-ing").append("<span class='image-ingredient'><img class='cheese' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqVkrydS-kSCf0INc4x-TNCKneWh-vi6WwHApPR76rrMQBaEZs6OlUBZzxwMxQPz_-a8&usqp=CAU' alt='cheese' width='100' height='100'></span>")
                      }

                        if((value == 'Bacon')&(!($("img.bacon").length))){
                            $(".images-ing").append("<span class='image-ingredient'><img class='bacon' src='https://i.pinimg.com/originals/9c/20/61/9c206166c6056b1afb3f13976096e5da.jpg' alt='cheese' width='100' height='100'></span>")
                        }
                        
                        if((value == 'Pineapple')&(!($("img.pineapple").length))){
                            $(".images-ing").append("<span class='image-ingredient'><img class='pineapple' src='https://thumbs.dreamstime.com/b/simple-pineapple-cute-doodle-drawing-vector-isolated-147650469.jpg' alt='cheese' width='100' height='100'></span>")
                        }

                        if((value == 'Onion')&(!($("img.onion").length))){
                            $(".images-ing").append("<span class='image-ingredient'><img class='onion' src='https://img.freepik.com/free-vector/vector-red-onion-isolated-white-background_1284-46819.jpg?size=626&ext=jpg' alt='cheese' width='100' height='100'></span>")
                        }

                        if((value == 'Pepper')&(!($("img.pepper").length))){
                            $(".images-ing").append("<span class='image-ingredient'><img class='pepper' src='https://i.pinimg.com/originals/7a/81/98/7a8198d5a3c162f2dbe764ff34790eba.jpg' alt='cheese' width='100' height='100'></span>")
                        }

                        if((value == 'Pepperoni')&(!($("img.pepperoni").length))){
                            $(".images-ing").append("<span class='image-ingredient'><img class='pepperoni' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKSBekQRUgFhgaJJCtEhdn8knMoO_KwNRQbhfox8V1awAFVoXPDohII6eFqn7UqjDqK74&usqp=CAU' alt='cheese' width='100' height='100'></span>")
                        }

                        if((value == 'Tomato')&(!($("img.Tomato").length))){
                            $(".images-ing").append("<span class='image-ingredient'><img class='Tomato' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRInZMeqIDx7-fqOhdlPeqMt6sq74cqWvLxnqKoRSGR305opfaPuAzKO2rgtRtVbopwQAU&usqp=CAU' alt='cheese' width='100' height='100'></span>")
                        }

                        if((value == 'Champignon')&(!($("img.Champignon").length))){
                            $(".images-ing").append("<span class='image-ingredient'><img class='Champignon' src='https://cdn5.vectorstock.com/i/thumb-large/32/69/appetizing-slices-eco-champignon-mushrooms-vector-34863269.jpg' alt='cheese' width='100' height='100'></span>")
                        }
                  });
                    $('p.hasToppings').show();
                    $('p.isEmpty').hide();
                } else {
                    $("#listToppings").empty();
                    $('p.hasToppings').hide();
                    $('p.isEmpty').show();
                }
            }
        },
        error: function() {
            showError('Error Reaching Server');
        }
    });
        
}

function showError(message) {
    alert("ERROR: " + message);
}

function edit() {
    getToppings();
}



  $(document).ready(function(){
    $(".pizza-small").on({
        click: function(){
            $(this).css("color", "#FC4800");
            $('.pizza-middle').css("color", "black");
            $('.pizza-big').css("color", "black");
            }  
    });
    $(".pizza-middle").on({
        click: function(){
            $(this).css("color", "#FC4800");
            $('.pizza-small').css("color", "black");
            $('.pizza-big').css("color", "black");
            }  
    });
    $(".pizza-big").on({
        click: function(){
            $(this).css("color", "#FC4800");
            $('.pizza-middle').css("color", "black");
            $('.pizza-small').css("color", "black");
            }  
    });
});