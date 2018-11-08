function send_request_handler(){
    var request_obj = {
        'api-key': "a80bbaccde51425ebd955684ea745fb0",
        'q': "",  //query  
        'sort': "newest",
        'page': 0,
 //       'begin_date': "", //start date
 //       'end_date': ""    //end
    };
    request_obj.q   = $("#query").val();
    var begin_date  = $("#begin_date").val();
    var end_date    = $("#end_date").val();
    if(begin_date.length > 0){
        request_obj.begin_date  = $("#begin_date").val() + "0101";
    }
    if(end_date.length > 0){
        request_obj.end_date    = $("#end_date").val() + "1231";
    }

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param(request_obj);
    $.ajax({
      url: url,
      method: 'GET',
    }).done(receive_request_handler).fail(function(err) {  throw err;    });
}

function receive_request_handler(response){
    var data = response;

    data.response.docs.forEach(element => {
        var headline = element.headline.main;
        var byline  = (element.byline) ? element.byline.original : '';
        var snippet = element.snippet;
        var pub_date = new Date(element.pub_date)
        var temp = pub_date.toDateString();
        console.log(temp)
        var type_of_material = element.type_of_material;
    
        var $wrapper = $('<div>');
        var $headline = $('<h3>');
        var $byline = $('<small>');
        var $snippet = $('<p>');
        var $pub_date = $('<small>');
        var $type = $('<p>');
    
        $headline.addClass('headline').text(headline)
        $byline.addClass('byline').text(byline)
        $snippet.addClass('snippet').text(snippet)
        $pub_date.addClass('pub-date').text(pub_date)
        $type.addClass('type').text(type_of_material)
    
        $wrapper.append($headline, $pub_date, $byline, $snippet)
        $('#top-articles').append($wrapper)
    
    
      });
}
$(document).on("click", "#search", send_request_handler);
