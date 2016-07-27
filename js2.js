/**
 * Created by ruslan on 27.07.16.
 */

$(document).ready(function() {

    (function ($) {
        $.fn.myPlugin = function () {

            this.submit(function (event) {
                $("#input").css("color","transparent");
                $("#input").blur();


                var textInput;//text input
                var lengthElementsClassElementList = 0;

                //remove input text
                if ($("#input").val() !== textInput) $("li.elementList").remove();

                //Object tags name
                var wordTag = {
                    tags: []
                };

                textInput = $("#input").val();

                var outputTag = function (event) {

                    var wordInTextInput = event.split(' ');
                    //add to Object 'wordTag'
                    for (var i = 0, lengInputText = wordInTextInput.length; i < lengInputText; i++) {
                        if (wordInTextInput[i] === '')continue;
                        var temp = wordInTextInput[i];//temp - intermediate variable

                        wordTag.tags.push(temp);
                    }

                    //template a tag in HTML
                    var HTMLTagLi = "<li class='elementList'>" +
                        "<div class='boxTag'>" +
                        "<span class='nameTag'>%NameTageTest%</span>" +
                        "<span id='%#%' class='closeTag'>" +
                        "<em></em>" +
                        "</span>" +
                        "</div>" +
                        "</li>";

                    /***************************************** add to HTML tags with Object 'wordTag' **************/
                    if (wordTag.tags.length > 0) {
                        for (var key in wordTag.tags) {
                            var formatted = HTMLTagLi.replace("%NameTageTest%", wordTag.tags[key]);
                            var formattedTest = formatted.replace("%#%", key);
                            $("#li1").before(formattedTest);
                            /************** length element class .elementList ******/
                            lengthElementsClassElementList += $(".elementList").width();
                            //console.log(lengthElementsClassElementList);

                        }
                        var widthFullClassListTag = $(".listTag").width() - 50;//50px = min length #li1;
                        var temp;
                        if (lengthElementsClassElementList > widthFullClassListTag){

                            temp = $(".listTag").width() + (lengthElementsClassElementList - widthFullClassListTag);
                            //console.log(temp);

                            $(".listTag").css("width", temp);
                            $("#li1").css("width", "50px");
                            $("input").css("width", "50px");
                            // $(".listTag").css("transform", "translate(-"+ (lengthElementsClassElementList - widthFullClassListTag) +"px,0)");

                        }
                        else{
                            temp = widthFullClassListTag - lengthElementsClassElementList;

                            $("#li1").css("width", "temp");
                            $("input").css("width", "яs");

                        }
                        lengthElementsClassElementList = 0;
                    }


                };//end outpuTag

                outputTag(textInput);

                /**************************** delete input *****************************************/
                $(".closeTag").click(function () {
                    console.log(2);
                    var temp = $("#input").val().split(' ');
                    delete temp[($(this).attr('id'))];
                    temp = temp.join(' ');
                    $("input").val(temp);

                    $(this).parents('li').remove();
                });

                /******************************** Reset input*****************************************/
                $( "#input" ).focus(function() {

                    //$("li").remove(".elementList");

                    $("li.elementList").remove();
                    wordTag.tags.splice(0);

                    textInput = $("#input").val();

                    outputTag(textInput);

                    $("#input").val(wordTag.tags.join(' '));

                });
                /****************************** change background-color ********************************************/
                $(".nameTag").mouseenter(function () {
                    $(this).css("background-color", "#9E30FF");
                });
                $(".nameTag").mouseleave(function () {
                    $(this).css("background-color", "#B15FFF");
                });

                $(".closeTag").mouseenter(function () {
                    $(this).css("background-color", "#CC0000");
                });
                $(".closeTag").mouseleave(function () {
                    $(this).css("background-color", "#FF0000");
                });



                return event.preventDefault();//re-play block

            });//end this.submit(function (event)

            /************ Focus input ***************/
            $("#input").click(function () {
                $(".boxTag").hide();
                $("#input").css("color","black");
            });

        };// end $.fn.myPlugin

    }(jQuery));

    $(".inputForm").myPlugin();


});// end.
