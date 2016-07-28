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
                count: 0,
                activeThis : 1

            };

            var HTMLTagUl = "<ul id='itemList'>%date%</ul>",
HTMLdoneAll = "<em id='doneAll' class='glyphicon glyphicon-ok'></em>",

                HTMLTag_down_ul = "<li id='down_li'><div class='col-md-12'>" +
                    "<span id='item_left'></span><span class='filter activeThis' id='all'>All</span>" +
                    "<span class='filter' id='active' >Active</span>" +
                    "<span class='filter' id='completed' >Completed</span>" +
                    "<span id='ClearCompleted'>ClearCompleted</span>" +
                    "</div></li>",
                HTMLTag_li = "<li class='elementList'><div class='col-md-12 '>" +
                    "<span class='done'>" +
                    "</span><span class='textItem'>%date%" +
                    "</span><span class='close glyphicon glyphicon-remove'>" +
                    "</span>" +
                    "</div></li>";
            var done = function (element) {};


            this.submit(function (event) {

                function activeThis(id) {
                    if (id === 'all' || id === 1) {
                        $('.elementList').show();
                        itemObject.activeThis = 1;

                    }
                    else if (id === 'active' ||id ===  2) {

                        $('.elementList').show();
                        $('.completed').hide();
                        itemObject.activeThis = 2;
                    }
                    else if (id === 'completed' || id === 3) {
                        $('.elementList').hide();
                        $('.completed').show();
                        itemObject.activeThis = 3;
                    }
                }




                if ($("input").val() !== '') {

                    $("#itemList").remove();                //видаляю весь список щоб перезаписати
                    $("#doneAll").remove();

                    itemObject.count = 0;
                    var formatted;

                    if (!($("ul").is("#itemList"))) {
                        $('#inputForm input').before(HTMLdoneAll);
                        formatted = HTMLTagUl.replace('%date%', HTMLTag_down_ul);
                        $("#inputForm").append(formatted);

                    }
                    $("#ClearCompleted").hide();


                   function filterWindow() {
                     $(".filter").parent().children().removeClass('activeThis');

                       $("#down_li span:eq("+itemObject.activeThis+")").addClass("activeThis");

                     }

                     filterWindow();


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

                    function showOrHide() {


                        if (itemObject.count !== itemObject.textInput.all.length) {
                            $("#ClearCompleted").show();
                        }
                        else {
                            $("#ClearCompleted").hide();
                        }


                        if ($('#active').attr('class') === 'filter activeThis'){
                            activeThis('active');
                        }else if($('#completed').attr('class') === 'filter activeThis'){
                            activeThis('completed');
                        }else if($('#all').attr('class') === 'filter activeThis'){
                            activeThis('all');
                        }


                        return;
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

                        if ($(this).parent().parent().attr('class') !== 'elementList completed') {
                            itemObject.count--;
                        }

                        countItem(itemObject.count);
                        //удаляю елемент в масиві з індексом тега
                        itemObject.textInput.all.splice(itemObject.index_close, 1);
                        itemObject.textInput.completed.splice(itemObject.index_close, 1);
                        itemObject.textInput.active.splice(itemObject.index_close, 1);
                        showOrHide();
//delete this tag
                        $(this).parents('li').remove();


                    });


                    /******************** Action ******************/

                    function done(element) {


                        if ($(element).parent().parent().attr('class') === 'elementList completed') {
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

                    }


                    $('.done').click(function () {

                        itemObject.index = $(this).parent().parent().index();

                        // добавити спосіб занесення в масив textInput.completed
                        done(this);

//показує або ховає #ClearCompleted

                        showOrHide();


                    });


                    /***************************/

                    /****************************************/


                    function doneAllShow() {



if ($('#completed').attr('class') === 'filter activeThis'){

    if (itemObject.count === itemObject.textInput.all.length){
        $('#doneAll').hide();
    }
    else{
        $('#doneAll').show();
    }


}
else if ($('#active').attr('class') === 'filter activeThis'){
    if (itemObject.count === 0){
        $('#doneAll').hide();
    }
    else{
        $('#doneAll').show();
    }

}
else {
    $('#doneAll').show();
}



                    }


                    /************************************/



                    $(".filter").click(function () {

                        $(this).parent().children().removeClass('activeThis');
                        $(this).addClass("activeThis");
                        var id = $(this).attr('id');
                        activeThis(id);


                        doneAllShow();


                        /*******************************/


                    });


                    $('#ClearCompleted').click(function () {

                        for (var i = 0, lengthCompleted = itemObject.textInput.completed.length; i < lengthCompleted; i++) {

                            if (itemObject.textInput.completed[i] === 'done') {
                                itemObject.textInput.completed.splice(i, 1);
                                itemObject.textInput.all.splice(i, 1);
                                itemObject.textInput.active.splice(i, 1);
                                i--;
                                lengthCompleted--;

                            }

                        }
                        $('.completed').remove();
                        if (itemObject.textInput.all.length === 0){

                            $("#itemList").remove();                //видаляю весь список щоб перезаписати
                            $("#doneAll").remove();
                            $('#inputForm input').focus();
                        }
                        showOrHide();
                    });
                    /************done all********/
                    showOrHide();


                    $('#doneAll').click(function () {

                        function reset() {
                            itemObject.textInput.completed.sort();
                            if (itemObject.textInput.completed.sort()[0] === '') {
                                $('.elementList').removeClass('completed');
                            }

                        }

                        reset();

                        if ($('.elementList').attr('class') !== 'elementList completed') {
                            $('.elementList').removeClass('completed');
                            $('.elementList').addClass("completed");
                            $('#doneAll').css('color', '#999999');
                            for (var i = 0, lengthAll = itemObject.textInput.all.length; i < lengthAll; i++) {

                                itemObject.textInput.completed[i] = 'done';
                                itemObject.textInput.active[i] = '';
                            }
                            itemObject.count = 0;


                        } else {

                            $('.elementList').removeClass('completed');
                            itemObject.count = itemObject.textInput.all.length;
                            $('#doneAll').css('color', '#D6D6D6');
                            for (var i = 0, lengthAll = itemObject.textInput.all.length; i < lengthAll; i++) {
                                itemObject.textInput.completed[i] = '';
                            }

                        }


                        doneAllShow();
                        showOrHide();
                        $("#item_left").text(itemObject.count + ' item left');//# item left



                    });


                    /************end done all*****************/

                }//end if($("input").val() !== '')


                return event.preventDefault();//re-play block

            });//end this.submit(function (event)




        };// end $.fn.myPlugin

    }(jQuery));

    $("#inputForm").myPlugin();


});// end.
