function loadMarkers() {
  window.fetch("http://blockyspaceman.com/map/tiles/_markers_/marker_spacestation.json").then( result => {
    if(result.ok){
      return result.json();
    }
  }).then(markerData => {
    let anchor = document.querySelector("div#world-marker-list");
    let displayFunc = window.jade["marker-list"];
    let output = displayFunc(markerData);
    anchor.innerHTML = output;
  });
}

function loadIcons() {
  window.fetch("http://blockyspaceman.com/map/tiles/_markers_/image_data.json").then(result => {
    if(result.ok){
      return result.json();
    }
  }).then(icons => {
    console.log(icons);
    let anchor = document.querySelector("div.marker-icons-list");
    let displayFunc = window.jade["marker-icon-list"];
    let output = displayFunc(icons);
    anchor.innerHTML = output;
  })
}

document.addEventListener('DOMContentLoaded', function() {
  loadMarkers();
  loadIcons();
}, false);
