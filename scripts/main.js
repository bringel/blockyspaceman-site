function loadServerStatus(){
  fetch("http://mcapi.us/server/status?ip=blockyspaceman.com")
    .then((response) => {
      if(response.ok){
        return response.json();
      }
    }).then((json) => {
      let online = moment(json.last_online, "X");
      let updated = moment(json.last_updated, "X");
      let onlineText = online.fromNow();
      let updatedText = updated.fromNow();

      json.onlineText = onlineText;
      json.updatedText = updatedText;

      let jadeOutput = jade.server(json);

      let statusElement = document.querySelector(".server-status-widget");
      statusElement.innerHTML = jadeOutput;
    })
}

document.addEventListener('DOMContentLoaded', function() {
  loadServerStatus();
}, false);
