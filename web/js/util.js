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
    },

    queryString: function(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  },

  ajax: function(params){

    if (!params.contentType) {
      params.contentType = 'application/json';
    }

    if (!params.error){
      params.error = function(r, x, h){
        if (r.status == 401){
          window.location = "/login.html?returnUrl=" + encodeURIComponent(window.location.pathname);
        }
      }
    }

    $.ajax(params);
  }

}


$.ajaxSetup({
  beforeSend: function(xhr) {
    var token;
    var cookies = document.cookie.split(';');
    for(var i=0; i<cookies.length; i++) {
      var parts = cookies[i].split('=');
      if (parts[0] == 'authToken'){
        token = parts[1];
      }
    }

    if (token){
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  }
});