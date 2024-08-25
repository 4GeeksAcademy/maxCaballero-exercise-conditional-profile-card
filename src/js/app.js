import "../style/index.css";

/**  
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION  
 *  This function is called every time the user types or changes any input  
 *   
    {  
        includeCover: true, // if includeCover is true the algorithm should show the cover image  
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover  
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar  
        socialMediaPosition: "right", // social media bar position (left or right)  
        
        twitter: null, // social media usernames  
        github: null,  
        linkedin: null,  
        instagram: null,  

        name: null,  
        lastName: null,  
        role: null,  
        country: null,  
        city: null  
    }  
 */

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

  // Generate cover HTML based on includeCover variable
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) {
    cover = "<div class='cover'></div>";
  }

  // Set default values for personal information
  const name = variables.name || "nombre no especificado";
  const lastName = variables.lastName || "";
  const role = variables.role || "rol no especificado";
  const country = variables.country || "pais no especificado";
  const city = variables.city || "ciudad no especificado";

  // Build social media links
  let socialMediaLinks =
    variables.socialMediaPosition === "right"
      ? `<ul class="position-right">`
      : `<ul class="position-left">`;

  if (variables.twitter) {
    socialMediaLinks += `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`;
  }
  if (variables.github) {
    socialMediaLinks += `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`;
  }
  if (variables.linkedin) {
    socialMediaLinks += `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`;
  }
  if (variables.instagram) {
    socialMediaLinks += `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`;
  }

  socialMediaLinks += `</ul>`;

  // Update the website body with the new HTML output
  document.querySelector("#widget_content").innerHTML = `  
    <div class="widget">  
      ${cover}  
      <img src="${variables.avatarURL}" class="photo" />  
      <h1>${name} ${lastName}</h1>  
      <h2>${role}</h2>  
      <h3>${city}, ${country}</h3>  
      ${socialMediaLinks}  
    </div>  
  `;
}

/**
 * Don't change any of the lines below; here is where we do the logic for the dropdowns
 */

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "right", // corrected to match the comment
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };

  render(window.variables); // Render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // Add a listener to every input
      const attribute = e.target.getAttribute("for"); // Get the input attribute
      let values = {};
      values[attribute] =
        this.value === "" || this.value === "null"
          ? null
          : this.value === "true"
          ? true
          : this.value === "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // Render again the card with new values
    });
  });
};
