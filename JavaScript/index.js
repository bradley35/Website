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
var sections = {}
$(document).ready(function() {
  console.log("GOING")

  $.ajax({url:"https://api.bitbucket.org/2.0/repositories/BamBucket", type: 'GET', cache:false, success: function(data) {
    //console.log(data)

    data.values.forEach(function(respository){
      $.ajax({
        type: 'GET', url: respository.links.html.href + "/raw/master/WebsiteData.json", cache:false, success: function(respositoryDataPre) {
          var repositoryData = JSON.parse(respositoryDataPre)
          if(repositoryData.sections){
            repositoryData.sections.forEach(function(theSection){
              var sectionName = theSection.name
              var section;
              if(!sections[sectionName]){
                section = {name: sectionName, contents: []}
              }else{
                section = section.sections[sectionName]
              }
              console.log(sectionName)
              console.log("CAT")
              if(theSection.appending == "self"){
                section.contents.push({icon: respository.links.avatar.href, link: respository.links.html.href, title: respository.name, description: respository.description})
              }else{

              theSection.appending.forEach(function(item){
                section.contents.push({icon: item.icon, link: item.link, title: item.title, date: item.date, description: item.description})
              })
            }
              sections[sectionName] = section
              reloadView()

            })
          }else{
            var sectionName = respositoryData.section
            var section;
            if(!sections[sectionName]){
              section = {name: sectionName, contents: []}
            }else{
              section = section.sections[sectionName]
            }
            console.log(sectionName)
            console.log("CAT")
            if(theSection.appending == "self"){
              section.contents.push({icon: respository.links.avatar.href, link: respository.links.html.href, title: respository.name, description: respository.description})
            }else{
              respositoryData.appending.forEach(function(item){
                section.contents.push({icon: item.icon, link: item.link, title: item.title, date: item.date, description: item.description})
              })
            }

            sections[sectionName] = section
            reloadView()
          }




      }, error: function(){
        var sectionName = "Open Source Projects"
        var section;
        if(!sections[sectionName]){
        section = {name: sectionName, contents: []}
        }else{
        section = section.sections[sectionName]
        }
        console.log(sectionName)
        console.log("CAT")
        section.contents.push({icon: respository.links.avatar.href, link: respository.links.html.href, title: respository.name, description: respository.description})
        sections[sectionName] = section
        reloadView()
      }})})}})




  function reloadView(){
      var html = "";
    for(var sectionName in sections){
      var section = sections[sectionName]
        var title = section.name;


        html = html + ('<h1 align="center" style="color: #606060;">' + title + '</h1>\n<line></line>');
        html = html + ('<table>');
        var count = section.contents.length;
        var i = 0;
        section.contents.forEach(function(app) {
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
        console.log("CHEESE")


    }
    $("#contents").html(html);
  }
})
