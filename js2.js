$(document).ready(function () {
    (function (a) {
        a.l.j = function () {
            var e = [], h = [], d = [], c = 0, l = 1, m, g;
            this.submit(function (u) {
                function n(b) {
                    if ("all" === b || 1 === b)a(".elementList").show(), l = 1; else if ("active" === b || 2 === b)a(".elementList").show(), a(".completed").b(), l = 2; else if ("completed" === b || 3 === b)a(".elementList").b(), a(".completed").show(), l = 3
                }

                if ("" !== a("input").g()) {
                    var r = function () {
                        "filter activeThis" === a("#completed").a("class") ? c === e.length ? a("#doneAll").b() : a("#doneAll").show() : "filter activeThis" === a("#active").a("class") ?
                            0 === c ? a("#doneAll").b() : a("#doneAll").show() : a("#doneAll").show()
                    }, k = function () {
                        c !== e.length ? a("#ClearCompleted").show() : a("#ClearCompleted").b();
                        "filter activeThis" === a("#active").a("class") ? n("active") : "filter activeThis" === a("#completed").a("class") ? n("completed") : "filter activeThis" === a("#all").a("class") && n("all")
                    }, p = function (b) {
                        1 === b ? a("#item_left").text(b + " item left") : a("#item_left").text(b + " items left")
                    };
                    a("#itemList").remove();
                    a("#doneAll").remove();
                    c = 0;
                    var q;
                    a("ul").is("#itemList") || (a("#inputForm input").h("<em id='doneAll' class='glyphicon glyphicon-ok'></em>"),
                        q = "<ul id='itemList'>%date%</ul>".replace("%date%", "<li id='down_li'><div class='col-md-12'><span id='item_left'></span><span class='filter activeThis' id='all'>All</span><span class='filter' id='active' >Active</span><span class='filter' id='completed' >Completed</span><span id='ClearCompleted'>ClearCompleted</span></div></li>"), a("#inputForm").append(q));
                    a("#ClearCompleted").b();
                    a(".filter").parent().children().c("activeThis");
                    a("#down_li span:eq(" + l + ")").f("activeThis");
                    e.push(a("input").g());
                    (function (b) {
                        for (var f in b)q = "<li class='elementList'><div class='col-md-12 '><span class='done'></span><span class='textItem'>%date%</span><span class='close glyphicon glyphicon-remove'></span></div></li>".replace("%date%", b[f]), a("#down_li").h(q), a("input").g(""), "done" !== d[f] ? (d[f] = "", c++, h[f] = b[f]) : h[f] = ""
                    })(e);
                    p(c);
                    for (var t in d)"done" === d[t] && a(".elementList:eq( " + t + " )").f("completed");
                    a(".close").click(function () {
                        m = a(this).parent().parent().index();
                        "elementList completed" !== a(this).parent().parent().a("class") &&
                        c--;
                        p(c);
                        e.splice(m, 1);
                        d.splice(m, 1);
                        h.splice(m, 1);
                        k();
                        a(this).m("li").remove()
                    });
                    a(".done").click(function () {
                        g = a(this).parent().parent().index();
                        "elementList completed" === a(this).parent().parent().a("class") ? (c++, p(c), a(".elementList:eq( " + g + " )").c("completed"), d[g] = "", h[g] = e[g]) : (c--, p(c), a(".elementList:eq( " + g + " )").f("completed"), d[g] = "done", h[g] = "");
                        k()
                    });
                    a(".filter").click(function () {
                        a(this).parent().children().c("activeThis");
                        a(this).f("activeThis");
                        var b = a(this).a("id");
                        n(b);
                        r()
                    });
                    a("#ClearCompleted").click(function () {
                        for (var b =
                            0, c = d.length; b < c; b++)"done" === d[b] && (d.splice(b, 1), e.splice(b, 1), h.splice(b, 1), b--, c--);
                        a(".completed").remove();
                        0 === e.length && (a("#itemList").remove(), a("#doneAll").remove(), a("#inputForm input").focus());
                        k()
                    });
                    k();
                    a("#doneAll").click(function () {
                        d.sort();
                        "" === d.sort()[0] && a(".elementList").c("completed");
                        if ("elementList completed" !== a(".elementList").a("class")) {
                            a(".elementList").c("completed");
                            a(".elementList").f("completed");
                            a("#doneAll").i("color", "#999999");
                            for (var b = 0, f = e.length; b < f; b++)d[b] =
                                "done", h[b] = "";
                            c = 0
                        } else for (a(".elementList").c("completed"), c = e.length, a("#doneAll").i("color", "#D6D6D6"), b = 0, f = e.length; b < f; b++)d[b] = "";
                        r();
                        k();
                        a("#item_left").text(c + " item left")
                    })
                }
                return u.preventDefault()
            })
        }
    })(jQuery);
    $("#inputForm").j()
});