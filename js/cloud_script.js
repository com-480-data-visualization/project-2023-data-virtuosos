class SeededRandom {
    constructor(seed) {
      this.seed = seed % 2147483647;
      if (this.seed <= 0) {
        this.seed += 2147483646;
      }
    }

    next() {
      return this.seed = this.seed * 16807 % 2147483647;
    }

    nextFloat() {
      return (this.next() - 1) / 2147483646;
    }
  }
  function getRandomInt(min, max, seed) {
    const randomGenerator = new SeededRandom(seed);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  fetch("./data/details_data.json")
  .then(response => response.json())
  .then(data => {
    jsonDetailData = data;
    const numberOfItemsToPick = 30;
    selectedLanguages = [];

    // Ensure there are at least 100 items in the data
    if (jsonDetailData.length < numberOfItemsToPick) {
      console.error('Not enough items in the data to pick 100 random items');
      return;
    }

    while (selectedLanguages.length < numberOfItemsToPick) {
      // Get a random index within the data array
      const randomIndex = getRandomInt(0, jsonDetailData.length - 1);
      const item = jsonDetailData[randomIndex];

      // Check if the title is not already in the selectedLanguages array
      if (!selectedLanguages.includes(item)) {
        selectedLanguages.push(item);
      }
    }

    ready_for_pl_cloud(selectedLanguages)}
    )
  
  .catch(error => console.error('Error fetching JSON file:', error));
  
  let tc;
  function ready_for_pl_cloud(selectedLanguages) {
    
    tc = TagCloud('.content', selectedLanguages);
    //console.log(tc);
  }
  
  
  function displayContentMouseOver(e) {
    // Find the element where you want to display the content
    var contentDisplay = document.getElementById("content-display_plCloud");
    //console.log(e);
    for (let j = 0; j < 30; j++) {
        //console.log(e[j])
        //console.log(e,jsonDetailData[j].title)
        if (e==selectedLanguages[j].title){
          // Prepare the content to be displayed based on the input 'e'
          var content = "<strong class='PlCloudDetailStyleName'>Title: </strong><span class='PlCloudDetailStyleVal'>" + selectedLanguages[j].title + "<br></span>"
          +"<strong class='PlCloudDetailStyleName'>Country: </strong><span class='PlCloudDetailStyleVal'>" + selectedLanguages[j].country + "<br></span>" 
          +"<strong class='PlCloudDetailStyleName'>Appeared: </strong><span class='PlCloudDetailStyleVal'>" + selectedLanguages[j].appeared + "<br></span>"
          +"<strong class='PlCloudDetailStyleName'>Rank: </strong><span class='PlCloudDetailStyleVal'>" + selectedLanguages[j].rank + "<br></span>"
          +"<strong class='PlCloudDetailStyleName'>Number of Users: </strong><span class='PlCloudDetailStyleVal'>" + selectedLanguages[j].numberOfUsers + "<br></span>"
          +"<strong class='PlCloudDetailStyleName'>Type: </strong><span class='PlCloudDetailStyleVal'>" + selectedLanguages[j].type + "<br></span>";
          // Update the content display element with the new content
          contentDisplay.innerHTML = content;
          break;
        }
    }
    contentDisplay.classList.add('PlCloudDetailStyle');
    
  }
  function hideContentMouseOut() {
    // Find the element where you want to remove the displayed content
    var contentDisplay = document.getElementById("content-display_plCloud");

    // Clear the content of the content-display element
    contentDisplay.innerHTML = "";
    contentDisplay.classList.remove('PlCloudDetailStyle');
  }

  function ClickOnPLCloud(e) {

    for (let j = 0; j < 30; j++) {
      if (e==selectedLanguages[j].title){
          
            event.preventDefault();
            var targetSection = document.getElementById("tableId"+selectedLanguages[j].id);
            console.log(targetSection);
            if (targetSection) {
              var targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - window.innerHeight / 2 + targetSection.clientHeight / 2;

              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });

              // Add the flash class to the target section
              targetSection.classList.add('flash');

              // Remove the flash class after the animation is completed
              setTimeout(function () {
                targetSection.classList.remove('flash');
              }, 3000); // The duration of the flash animation in milliseconds
            }
        
      }
    }
  }
// switch style
function toDefault() { document.body.classList.remove('light'); }
function toLight() { document.body.classList.add('light'); }
// add / remove tag
function addTag() {
    if (!tc) return;
    texts.push('New');
    tc.update(texts);
}
function removeTag() {
    if (!tc) return;
    texts.pop();
    tc.update(texts);
}
var otherTcs = [];
// create and destroy tagcloud
function toCreate() {
    if (otherTcs.length >= 3) return;
    otherTcs.push(TagCloud('.content', texts));
}
function toDestroy() {
    var last = otherTcs[otherTcs.length - 1];
    if (!last) return;
    last.destroy();
    otherTcs.pop();
}
function toChangeBatch() {
    if (!tc) return;
    const numberOfItemsToPick = 30;
    selectedLanguages = [];

    // Ensure there are at least 100 items in the data
    if (jsonDetailData.length < numberOfItemsToPick) {
      console.error('Not enough items in the data to pick 100 random items');
      return;
    }

    while (selectedLanguages.length < numberOfItemsToPick) {
      // Get a random index within the data array
      const randomIndex = getRandomInt(0, jsonDetailData.length - 1);
      const item = jsonDetailData[randomIndex];

      // Check if the title is not already in the selectedLanguages array
      if (!selectedLanguages.includes(item)) {
        selectedLanguages.push(item);
      }
    }
    console.log("new batch:",selectedLanguages);
    tc.update(selectedLanguages);
}



// add and remove clickEvent
function clickEventHandler(e) {
    if (e.target.className === 'tagcloud--item') {
        window.open(`https://www.google.com/search?q=${e.target.innerText}`, '_blank');
    }
}
function addClickEvent() {
    var rootEl = document.querySelector('.content');

    rootEl.addEventListener('click', clickEventHandler);
}
function removeClickEvent() {
    var rootEl = document.querySelector('.content');
    rootEl.removeEventListener('click', clickEventHandler);
}

function pause() {
  [].concat(tc, otherTcs).forEach(function (e) { return e.pause() });
}
function resume() {
  [].concat(tc, otherTcs).forEach(function (e) { return e.resume() });
}