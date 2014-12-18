$(document).ready(function(){
  $('#btnSubmit').click(function(){

    $(this).prop('disabled', true);

    var list = $('#pendingRequests');
    list.find('.none').remove();

    var newItem = $('<li>').text("4/26, 7pm: U10 Wilshire Park");
    list.append(newItem);

    $('#message').text('thanks! your request has been submitted.');
  })

  $('#btnBack').click(function(e){
    window.location = "/";
  })
})