var practice = {
  utils: {
    formatTime: function(n){
      var h = Number(String(n).substr(0, String(n).length - 2));
      var m = String(n).substr(String(n).length - 2, 2);
      var x = 'am';

      if (h > 12){
        h = h - 12;
        x = 'pm';
      }

      return h + ':' + m + x;
    }
  },

  ajax: function(params){

    if (!params.contentType) {
      params.contentType = 'application/json';
    }

    $.ajax(params);
  }

}
