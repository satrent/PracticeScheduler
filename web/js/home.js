var weekOf = new moment();

var formatHeader = function(d){
  var d = new moment(d);
  $('h1').text('Week of ' + d.format("MMM DD") + ' to ' + d.add(6, 'days').format("MMM DD, YYYY"));
}


$(document).ready(function(){

  weekOf = weekOf.add((weekOf.weekday() * -1) + 1, 'days');

  formatHeader(weekOf);

  $.ajax('/api/teams', function(data){
    console.log(data);
  })

  $('.entry.open').click(function(){
    window.location = '/request.html';
  })

  $('#previous').click(function(e){
    weekOf = weekOf.add(-7, 'days');
    formatHeader(weekOf);
  })

  $('#next').click(function(e){
    weekOf = weekOf.add(7, 'days');
    formatHeader(weekOf);
  })
});

