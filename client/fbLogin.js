window.fbAsyncInit = function() {
  FB.init({
    appId      : '2143364052556575',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response){
    statusChangeCallback(response);
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback (response) {
  if(response.status === 'connected'){
    FB.api('/me', 'GET', {fields: 'name,id,email'}, function(user) {
      window.localStorage.setItem('username',user.name);
      window.localStorage.setItem('email',user.email);
      window.localStorage.setItem('token',response.authResponse.accessToken);
      axios.get('/')
        .then ((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
      document.getElementById('status').innerHTML = 'we are connected';
  } else if(response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'we are not logged in.';
  } else {
    document.getElementById('status').innerHTML = 'you are not logged in to Facebook';
  }
}

function login(){
  FB.login(function(response){
    if(response.status === 'connected'){
      document.getElementById('status').innerHTML = 'we are connected';
    } else if(response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'we are not logged in.';
    } else {
      document.getElementById('status').innerHTML = 'you are not logged in to Facebook';
    }

  });
}
// get user basic info

function getInfo() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,email'}, function(response) {
    document.getElementById('status').innerHTML = JSON.stringify(response);
});
}

function logout(){
  FB.logout(function(response) {
    document.location.reload();
  });
}

