

function send_request_handler(){
    var request_obj = {
        'api-key': "a80bbaccde51425ebd955684ea745fb0",
        'q': "",  //query  
        'sort': "newest",
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
