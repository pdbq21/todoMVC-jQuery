/**
 * Created by ruslan on 26.07.16.
 */

$(document).ready(function () {

    (function ($) {
        $.fn.myPlugin = function () {
            var itemObject = {
                textInput: {
                    all: [],
                    active: [],
                    completed: []
                }

            };

            var HTMLTagUl = "<ul id='itemList'>%date%</ul>",


                HTMLTag_down_ul = "<li id='down_li'><div class='col-md-12'>" +
                    "<span id='item_left'># item left</span><span class='filter activeThis' id='All'>All</span>" +
                    "<span class='filter' id='Active' >Active</span>" +
                    "<span class='filter' id='Completed' >Completed</span>" +
                    "<span id='ClearCompleted'>ClearCompleted</span>" +
                    "</div></li>",
                HTMLTag_li = "<li class='elementList'><div class='col-md-12 '>" +
                    "<span class='done'>" +
                    "</span><span class='textItem'>%date%" +
                    "</span><span class='close'>" +
                    "<em class='glyphicon glyphicon-remove'></em></span>" +
                    "</div></li>";

            this.submit(function (event) {

                $("li.elementList").remove();                //видаляю весь список щоб перезаписати

                var formatted;

                if (!($("ul").is("#itemList"))) {
                    formatted = HTMLTagUl.replace("%date%", HTMLTag_down_ul);
                    $(".inputForm").append(formatted);

                }


                itemObject.textInput.all.push($("input").val());                //додаю введення з поля

                //формування списку
                for (var key in itemObject.textInput.all) {
                    formatted = HTMLTag_li.replace("%date%", itemObject.textInput.all[key]);
                    $("#down_li").before(formatted);

                    $("input").val("");

                    if (itemObject.textInput.completed[key] !== 'done') {
                        itemObject.textInput.completed[key] = '';
                        //додає в масив відповідне значення
                        itemObject.textInput.active[key] = itemObject.textInput.all[key];
                    }
                    else {
                        itemObject.textInput.active[key] = '';
                    }


                }

                // completed
                for (var key in itemObject.textInput.completed) {
                    if (itemObject.textInput.completed[key] === 'done') {

                        $(".elementList:eq( " + key + " )").addClass("completed");
                    }


                }


                /**************************** delete  *****************************************/
                $(".close").click(function () {
                    itemObject.index_close = $(this).parent().parent().index();


                    //удаляю елемент в масиві з індексом тега
                    itemObject.textInput.all.splice(itemObject.index_close, 1);
                    itemObject.textInput.completed.splice(itemObject.index_close, 1);
                    itemObject.textInput.active.splice(itemObject.index_close, 1);

//delete this tag
                    $(this).parents('li').remove();

                });


                /******************** Action ******************/


                $('.done').click(function () {


                    itemObject.index = $(this).parent().parent().index();

                    // добавити спосіб занесення в масив textInput.completed


                    console.log(itemObject.index);
                    if ($(this).parent().parent().attr('class') === 'elementList completed') {

                        $(".elementList:eq( " + itemObject.index + " )").removeClass("completed");

                        // видалити з масиву
                        itemObject.textInput.completed[itemObject.index] = '';

                        itemObject.textInput.active[itemObject.index] = itemObject.textInput.all[itemObject.index];

                    }
                    else {
                        $(".elementList:eq( " + itemObject.index + " )").addClass("completed");
                        // додати в масив
                        itemObject.textInput.completed[itemObject.index] = 'done';
                        itemObject.textInput.active[itemObject.index] = '';
                        console.log(itemObject.textInput.active);
                    }

                });

                console.log(itemObject.textInput.active);

                /***************************/

                $("#Active").click(function () {
                    $(this).addClass("activeThis");


                });


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
            /*
             *
             *
             * */

            /*
             [0,1,2,3,4,5,6]
             [ , , , , , , ]

             [ ,done, , ,done, , ]


             */


        };// end $.fn.myPlugin

    }(jQuery));

    $(".inputForm").myPlugin();


});// end.
