$(document).scroll(function(location) {
    //console.log($(window).scrollTop())
    if ($(window).scrollTop() > 0) {
        $("bar").removeClass('undoShadow');
        $("bar").addClass('goShadow');
    } else {
        $("bar").removeClass('goShadow');
        $("bar").addClass('undoShadow');
    }

})

$(document).ready(function() {
    console.log("GOING")
    $.get("../Data/Apps.json", function(data) {
        //console.log(data)
        data.Data.forEach(function(section) {
            var title = section.title;
            var html = "";
            html = html + ('<h1 align="center" style="color: #606060;">' + title + '</h1>\n<line></line>');
            html = html + ('<table>');
            var count = section.items.length;
            var i = 0;
            section.items.forEach(function(app) {
                i++;

                html = html + ('<tr>\n<th style="text-align:initial"><a href="');
                if (app.link) {
                    html = html + app.link;
                }
                html = html + '"><img src="' + app.icon + '"></img></a></th>\n<th><text>\n<h4>' + app.title + '</h4>\n<p>' + app.description + '</p>';
                if(app.date){
                    html = html + '<date>'+app.date+'</date>';
                }
                html = html + '\n</text></th>\n</tr>';


            if (i < (count)) {
                html = html + "<tr style='padding-top:10px; padding-bottom: 10px; display:table-cell;'><th><thinline></thinline></th></tr>";
            }
        })
        html = html + '</table>';
        $("body").append(html);

    })

})
})
