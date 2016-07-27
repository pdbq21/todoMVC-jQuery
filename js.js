/**
 * Created by ruslan on 26.07.16.
 */

$(document).ready(function() {

    (function ($) {
        $.fn.myPlugin = function () {
            var itemObject = {};
/*
            itemObject.HTMLTag.ul = "<ul>%date%</ul>";
            itemObject.HTMLTag.down_ul = "<li id='toolbar'>" +
                "<span id='item_left'># item left</span><span id='All'>" +//item / items
                "</span><span id='Active'></span><span id='Completed'></span><span id='ClearCompleted'></span></li>";
            itemObject.HTMLTag.li = "<li class='elementList'>%date%</li>";
            itemObject.HTMLTag.div = "<div>" +
                "<span class='done'>" +
                "</span><span class='textItem'>" +
                "</span><em class='close'>" +
                "</em>" +
                "</div>";*/
            var HTMLTagUl = "<ul id='itemList'>%date%</ul>",

                HTMLTag_down_ul = "<li id='inputForm'><div class='col-md-12'>" +
                    "<span id='item_left'># item left</span><span id='All'></span>" +
                    "<span id='Active'></span>" +
                    "<span id='Completed'></span>" +
                    "<span id='ClearCompleted'></span>" +
                    "</div></li>",
                HTMLTag_li = "<li class='elementList'><div class='col-md-12 '>" +
                    "<span class='done'>" +
                    "</span><span class='textItem'>%date%" +
                    "</span><span class='close'>" +
                    "<em class='glyphicon glyphicon-remove'></em></span>" +
                    "</div></li>";

            this.submit(function (event) {
                var formatted;

                if (!($("ul").is("#itemList"))){
                    formatted = HTMLTagUl.replace("%date%", HTMLTag_down_ul);
                    $(".inputForm").append(formatted);
                }



                itemObject.textInput = $("input").val();

                formatted = HTMLTag_li.replace("%date%", itemObject.textInput);
                $("#inputForm").before(formatted);

                $("input").val("");


                /**************************** delete  *****************************************/
                $(".close").click(function () {
                    console.log($(this).parents('li'));
                    $(this).parents('li').remove();
                });

/******************** Action ******************/





$(".done").click(function () {

    //itemObject.index = $(this).parent().parent().index();

    console.log(1);

    //$( ".elementList:eq( "+itemObject.index+" )" ).addClass("active");

       /* if ($(this).parent().parent().attr('class') === 'elementList active'){

            $( ".elementList:eq( "+itemObject.index+" )" ).removeClass("active");
        }
        else {
            $( ".elementList:eq( "+itemObject.index+" )" ).addClass("active");

        }*/



});





  /*if ($(this).attr('class') === done active)


        if ($(this).parents(".nameCity").attr('class') === "col-md-4 col-sm-4 col-xs-4 nameCity active" ||
            $(this).parents(".nameCity").attr('class') === "nameCity col-md-12 col-sm-12 col-xs-12 active") {
            $(this).parents(".nameCity").removeClass("active");

            for (var i = inputValue.length - 1; i >= 0; i--) {
                if (inputValue[i] === $(this).text()) {

                    inputValue.splice(i, 1);

                    break;
                }
            }
        }
        else {
            $(this).parents(".nameCity").addClass("active");
            var temp = $(this).text();
            inputValue.push(temp);
        }

        $("input").val(inputValue);



});*/


                return event.preventDefault();//re-play block

            });//end this.submit(function (event)


/*********
 * All = A + C;
 *
 * Active
 *  item left/items left = A
 *
 * Completed
 *
 *Clear completed = C
 * ************/








        };// end $.fn.myPlugin

    }(jQuery));

    $(".inputForm").myPlugin();


});// end.
