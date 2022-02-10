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
                          $(".images-ing").append("<img class='cheese' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqVkrydS-kSCf0INc4x-TNCKneWh-vi6WwHApPR76rrMQBaEZs6OlUBZzxwMxQPz_-a8&usqp=CAU' alt='cheese' width='100' height='100'>")
                      }

                        if((value == 'Bacon')&(!($("img.bacon").length))){
                            $(".images-ing").append("<img class='bacon' src='https://i.pinimg.com/originals/9c/20/61/9c206166c6056b1afb3f13976096e5da.jpg' alt='cheese' width='100' height='100'>")
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