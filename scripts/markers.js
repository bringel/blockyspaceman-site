function loadMarkers() {
  window.fetch("http://blockyspaceman.com/map/tiles/_markers_/marker_spacestation.json").then( result => {
    if(result.ok){
      return result.json();
    }
  }).then(markerData => {
    let anchor = document.querySelector("div#marker-list");
    let displayFunc = window.jade["marker-list"];
    let output = displayFunc(markerData);
    anchor.innerHTML = output;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadMarkers();
}, false);
