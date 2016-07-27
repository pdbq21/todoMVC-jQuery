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
                },
                count: 0

            };

            var HTMLTagUl = "<ul id='itemList'>%date%</ul>",


                HTMLTag_down_ul = "<li id='down_li'><div class='col-md-12'>" +
                    "<span id='item_left'></span><span class='filter activeThis' id='all'>All</span>" +
                    "<span class='filter' id='active' >Active</span>" +
                    "<span class='filter' id='completed' >Completed</span>" +
                    "<span id='ClearCompleted'>ClearCompleted</span>" +
                    "</div></li>",
                HTMLTag_li = "<li class='elementList'><div class='col-md-12 '>" +
                    "<span class='done'>" +
                    "</span><span class='textItem'>%date%" +
                    "</span><span class='close'>" +
                    "<em class='glyphicon glyphicon-remove'></em></span>" +
                    "</div></li>";

            this.submit(function (event) {
                if ($("input").val() !== '') {
                    $("#itemList").remove();                //видаляю весь список щоб перезаписати
                    itemObject.count = 0;
                    var formatted;

                    if (!($("ul").is("#itemList"))) {
                        formatted = HTMLTagUl.replace("%date%", HTMLTag_down_ul);
                        $(".inputForm").append(formatted);

                    }
                    $("#ClearCompleted").hide();

                    itemObject.textInput.all.push($("input").val());                //додаю введення з поля

                    function listItem(element) {

                        //формування списку
                        for (var key in element) {

                            formatted = HTMLTag_li.replace("%date%", element[key]);
                            $("#down_li").before(formatted);

                            $("input").val("");

                            if (itemObject.textInput.completed[key] !== 'done') {
                                itemObject.textInput.completed[key] = '';
                                itemObject.count++;
                                //додає в масив відповідне значення
                                itemObject.textInput.active[key] = element[key];
                            }
                            else {
                                itemObject.textInput.active[key] = '';
                            }


                        }

                    }

                    listItem(itemObject.textInput.all);

                    function countItem(count) {
                        if (count === 1) {
                            $("#item_left").text(count + ' item left');//# item left
                        } else {
                            $("#item_left").text(count + ' items left');//# item left
                        }
                    }

                    countItem(itemObject.count);

                    //формування списку
                    /*for (var key in itemObject.textInput.all) {
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


                     }*/

                    // completed
                    for (var key in itemObject.textInput.completed) {
                        if (itemObject.textInput.completed[key] === 'done') {

                            $(".elementList:eq( " + key + " )").addClass("completed");
                        }


                    }


                    /**************************** delete  *****************************************/
                    $(".close").click(function () {
                        itemObject.index_close = $(this).parent().parent().index();
                        itemObject.count--;
                        countItem(itemObject.count);
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
                            itemObject.count++;
                            countItem(itemObject.count);
                            $(".elementList:eq( " + itemObject.index + " )").removeClass("completed");

                            // видалити з масиву
                            itemObject.textInput.completed[itemObject.index] = '';

                            itemObject.textInput.active[itemObject.index] = itemObject.textInput.all[itemObject.index];

                        }
                        else {

                            itemObject.count--;
                            countItem(itemObject.count);
                            $(".elementList:eq( " + itemObject.index + " )").addClass("completed");
                            // додати в масив
                            itemObject.textInput.completed[itemObject.index] = 'done';
                            itemObject.textInput.active[itemObject.index] = '';

                        }
//показує або ховає #ClearCompleted
                        if (itemObject.count !== itemObject.textInput.all.length){
                            $("#ClearCompleted").show();
                        }
                        else {
                            $("#ClearCompleted").hide();
                        }


                    });


                    /***************************/

                    $(".filter").click(function () {

                        $(this).parent().children().removeClass('activeThis');
                        $(this).addClass("activeThis");
                        var id = $(this).attr('id');


                        if (id === 'all') {

                            $('.elementList').show();

                        }
                        else if (id === 'active') {


                            $('.elementList').show();
                            $('.completed').hide();

                        }
                        else if (id === 'completed') {
                            console.log(id);
                            $('.elementList').hide();
                            $('.completed').show();


                        }


                        /*******************************/


                    });


                    $('#ClearCompleted').click(function () {

                        for (var i = 0, lengthCompleted = itemObject.textInput.completed.length; i < lengthCompleted; i++) {
                            console.log(itemObject.textInput.completed[i]);
                            if (itemObject.textInput.completed[i] === 'done') {
                                itemObject.textInput.completed.splice(i, 1);
                                itemObject.textInput.all.splice(i, 1);
                                itemObject.textInput.active.splice(i, 1);
                                i--;
                                lengthCompleted--;

                            }

                        }
                        $('.completed').remove();
                    });


                }


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
