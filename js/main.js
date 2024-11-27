(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector ("#material-list");
  const loader = document.querySelector("#loader");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"
  
  //functions
  function loadInfoBoxes() {
    loader.classList.toggle("hidden");
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;
  
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;
  
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
        loader.classList.toggle("hidden");
      });
   
    })
    .catch(error => {
      console.log(error);
    
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Oops, something went wrong!";

      // Style the background of the error message
  errorMessage.style.backgroundColor = "#E89B36"; // Light red background
  errorMessage.style.padding = "10px"; // Add some padding
  errorMessage.style.borderRadius = "5px"; // Rounded corners
  errorMessage.style.textAlign = "center"; // Center the text

    
      // Append the error message to the first hotspot, if it exists
      if (hotspots.length > 0) {
        hotspots[0].appendChild(errorMessage); 
      } else {
        console.error("No hotspots available to display the error message.");
      }
    });
    
  }
loadInfoBoxes();

function loadMaterialInfo(){
  loader.classList.toggle("hidden");
  fetch("https://swiftpixel.com/earbud/api/infoboxes")
  .then(response =>response.json()) 
  .then(materialListData => {
    materialListData.forEach(material => {
      //clone the template
      const clone = materialTemplate.content.cloneNode(true);
      //populate template
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;

      const materialP = clone.querySelector(".material-description");
      materialP.textContent = material.description;

      materialList.appendChild(clone);
    })
    loader.classList.add("hidden");
  })
  .catch(error => {
    console.error(error);

    // Create an error message element
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Oops, something went wrong. Unable to load material information.";
    
    // Append the error message to the materialList
    materialList.innerHTML = ""; // Clear any existing content
    materialList.appendChild(errorMessage);
    loader.classList.remove("hidden");
  });
}
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();
