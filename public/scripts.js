// VARIABLES
const apiUrl = 'https://script.google.com/macros/s/AKfycbyfTaLVBqHNKLxopi32Wn6G3zonGc_bsjQykNkFIt8vesWCJcGuNrXeMZ426l14srxb/exec';
const adCodeGallery = `
<!-- Google AdSense Gallery Ad -->
<div class="ad-container">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1258549624357094"
     crossorigin="anonymous"></script>
<!-- list ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1258549624357094"
     data-ad-slot="3012017971"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>
`;


// -------------------------------------------------
// MAKE NAV BAR AND FILTERS FRONTEND


function insertNavbarAndFilters() {
  var includeFilters = window.includeFilters; // Default to false if undefined

  // Navbar HTML
  var navbarHtml = `
        <nav class="navbar">
            <div class="logo-and-title">
                <img src="logo.png" alt="Logo" style="height: 40px;">
                <span class="site-title">dancegifs.com</span>
            </div>
            <button class="mobile-toggle" onclick="toggleNav()">☰</button>

            <div class="dropdown-content">
                <a href="/">Home</a>
                <a href="https://forms.gle/mzy3RA9YncWPNvD19" target="_blank">Submit a GIF</a>
                <a href="/about.html">About</a>
                <a href="https://forms.gle/fVt2piGFEk1UcwqDA" target="_blank">Contact</a>
                <a href="/share.html">Share</a>
            </div>

            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="https://forms.gle/mzy3RA9YncWPNvD19" target="_blank">Submit a GIF</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="https://forms.gle/fVt2piGFEk1UcwqDA" target="_blank">Contact</a></li>
                <li><a href="/share.html">Share</a></li>
            </ul>
        </nav>`;

  // Filters HTML
  var filtersHtml = `
        <div class="filter">
            <div class="filter-inputs">
                <label for="stepName">Step Name</label>
                <input type="text" id="stepName" placeholder="Enter Step Name" onchange="applyFilters()">
                <label for="style">Style</label>
                <select id="style" onchange="applyFilters()">
                    <option value="">Select Style</option>
                    <!-- Style options will be populated here -->
                </select>
                <label for="country">Country</label>
                <select id="country" onchange="applyFilters()">
                    <option value="">Select Country</option>
                    <!-- Country options will be populated dynamically -->
                </select>
                <label for="creator">Creator</label>
                <select id="creator" onchange="applyFilters()">
                    <option value="">Select Creator</option>
                    <!-- Creator options will be populated dynamically -->
                </select>
                <label for="sortBy">Sort By</label>
                <select id="sortBy" onchange="applyFilters()">
                    <option value="">Select Sorting</option>
                    <option value="stepName">Step Name</option>
                    <option value="style">Style</option>
                    <option value="country">Country</option>
                    <option value="hasGif">Has Gif</option>
                    <option value="hasNoGif">Has No Gif</option>
                    <option value="hasVideo">Has Video</option>
                    <option value="hasTutorial">Has Tutorial</option>
                    <option value="creator">Creator</option>
                </select>
            </div>
            <div class="filter-buttons">
                <button onclick="applyFilters()">Let's Go!</button>
                <button onclick="resetFilters()">From the top!</button>
            </div>
        </div>`;


  // Insert based on the includeFilters flag
  const combinedHtml = includeFilters ? navbarHtml + filtersHtml : navbarHtml;
  document.body.insertAdjacentHTML('afterbegin', combinedHtml);
}




// Toggle navigation for mobile view
window.toggleNav = function () {
  var dropdown = document.querySelector(".dropdown-content");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
};












// -------------------------------------------------
// EXECUTE FILTERS FUNCTIONS


async function populateMenuOptions() {
  try {
    const data = await getData(); // Wait for data to be fetched

    // Extract and sort unique countries
    const countries = data.map(item => item.country)
      .filter((value, index, self) => value && self.indexOf(value) === index)
      .sort();

    // Populate the 'country' dropdown
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = option.textContent = country;
      countrySelect.appendChild(option);
    });

    // Extract and sort unique styles
    const styles = data.map(item => item.style)
      .filter((value, index, self) => value && self.indexOf(value) === index)
      .sort();

    // Populate the 'style' dropdown
    const styleSelect = document.getElementById('style');
    styles.forEach(style => {
      const option = document.createElement('option');
      option.value = option.textContent = style;
      styleSelect.appendChild(option);
    });

    // Extract and sort unique creators
    const creators = data.map(item => item.creator)
      .filter((value, index, self) => value && self.indexOf(value) === index)
      .sort();

    // Populate the 'creator' dropdown
    const creatorSelect = document.getElementById('creator');
    creators.forEach(creator => {
      const option = document.createElement('option');
      option.value = option.textContent = creator;
      creatorSelect.appendChild(option);
    });

    return data;

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}


async function applyFilters(dataInput = null) {
  // Get the filter values
  const stepName = document.getElementById('stepName').value.toLowerCase();
  const style = document.getElementById('style').value;
  const country = document.getElementById('country').value;
  const creator = document.getElementById('creator').value;
  const sortBy = document.getElementById('sortBy').value;
  try {
    // Fetch data from Google Sheets if not provided as input
    const data = dataInput || await getData();

    // Filter the data based on the selected filter values
    let filteredData = data.filter(item => {
      return (stepName === '' || item.step.toLowerCase().includes(stepName)) &&
        (style === '' || item.style === style) &&
        (creator === '' || item.creator === creator) &&
        (country === '' || item.country === country);
    });

    // Sort the filtered data
    if (sortBy) {
      filteredData = filteredData.sort((a, b) => {
        if (sortBy === 'stepName') {
          return a.step.localeCompare(b.step);

        } else if (sortBy === 'style') {
          return a.style.localeCompare(b.style);

        } else if (sortBy === 'country') {
          return a.country.localeCompare(b.country);

        } else if (sortBy === 'creator') {
          return a.creator.localeCompare(b.creator);

        } else if (sortBy === 'hasGif') {
          // Assuming 'hasGif' is a boolean indicating if a gifUrl exists
          return (a.gifUrl ? -1 : 1) - (b.gifUrl ? -1 : 1);

        } else if (sortBy === 'hasNoGif') {
          // Assuming 'hasNoGif' is a boolean indicating if a gifUrl exists
          return (a.gifUrl ? 1 : -1) - (b.gifUrl ? 1 : -1);

        } else if (sortBy === 'hasVideo') {
          // Assuming 'hasVideo' is a boolean indicating if a gifUrl exists
          return (a.videos ? -1 : 1) - (b.videos ? -1 : 1);

        } else if (sortBy === 'hasTutorial') {
          // Assuming 'hasVideo' is a boolean indicating if a gifUrl exists
          return (a.tutorial ? -1 : 1) - (b.tutorial ? -1 : 1);
        }
      });
    }

    // Update the gallery with the filtered data
    updateGallery(filteredData);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
    // Handle errors, such as by displaying a message to the user
  }
}













function resetFilters() {
  document.getElementById('stepName').value = '';
  document.getElementById('style').selectedIndex = 0;
  document.getElementById('country').selectedIndex = 0;
  document.getElementById('creator').selectedIndex = 0;
  document.getElementById('sortBy').selectedIndex = 0;

  // Optionally, re-apply filters to update the gallery
  applyFilters();
}


function updateGallery(filteredData) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear existing content

  const adCode = adCodeGallery;

  for (let index = 0; index < filteredData.length; index++) {
    const item = filteredData[index];

    // Create a container for each item
    const container = document.createElement('div');
    container.className = 'gallery-item'; // Add a class for styling

    // Create a container for the step name and style
    const stepAndStyleContainer = document.createElement('div');
    stepAndStyleContainer.className = 'step-and-style-container'; // Add a class for styling

    // Create and append the step name
    const stepNameElement = document.createElement('span');
    if (item.year) {
      stepNameElement.textContent = item.step + ' (' + item.year + ')'; // Add a class for styling
    } else {
      stepNameElement.textContent = item.step; // Add a class for styling
    }

    stepNameElement.className = 'step-name'; // Add a class for styling
    stepAndStyleContainer.appendChild(stepNameElement);

    // Create and append the style
    const styleElement = document.createElement('span');
    styleElement.textContent = item.style + ' ' + getFlagEmoji(item.country);
    styleElement.className = 'style-name'; // Add a class for styling
    styleElement.title = item.country; // Set the title attribute to display the country name on hover

    stepAndStyleContainer.appendChild(styleElement);
    container.appendChild(stepAndStyleContainer);

    // Check if gifUrl is provided
    if (item.gifUrl) {
      let gifUrl = item.gifUrl;
      gifUrl = transformGoogleDriveURL(gifUrl);
      const img = document.createElement('img');
      img.src = gifUrl;
      img.alt = item.step;
      img.className = 'responsive-gif'; // Add a class for styling
      container.appendChild(img);
    }

    // Create and append info about step (src of the gif and tutorial links)
    const info = document.createElement('p');
    info.className = 'info'; // Add a class for styling

    // Check if gifSrc value is not empty
    if (item.gifSrc) {
      // Create link for gifSrc
      const gifSrcLink = document.createElement('a');
      gifSrcLink.href = item.gifSrc; // Set link URL
      gifSrcLink.textContent = 'source'; // Set link text
      gifSrcLink.target = '_blank'; // Open in a new tab
      info.appendChild(gifSrcLink);
      info.appendChild(document.createTextNode('  |  ')); // Add space
    }

    // Check if tutorial value is not empty
    if (item.tutorial) {
      appendLinks(info, item.tutorial, 'tutorial');
    }

    // Check if song value is not empty
    if (item.song) {
      appendLinks(info, item.song, 'song');
    }

    // Check if creator value is not empty
    if (item.creator) {
      appendLinks(info, item.creatorUrl, 'by ' + item.creator);
    }

    // Check if creator value is not empty
    if (item.dancer) {
      appendLinks(info, item.dancerUrl, 'dancer: ' + item.dancer);
    }


    // Check if videos value is not empty
    if (item.videos) {
      appendLinks(info, item.videos, 'video');
    }

    // Check if shop value is not empty
    if (item.shop) {
      appendLinks(info, item.shop, 'shop');
    }


    // EDIT STEP
    const editLink = document.createElement('a');
    editLink.href = generatePreFilledFormUrl(item); // Set link URL, trimming any extra whitespace
    editLink.textContent = 'edit';
    editLink.target = '_blank'; // Open in a new tab
    editLink.title = 'Click to edit this dance step.'; // Tooltip text that will appear on hover

    // Append the edit button to the container or info element
    info.appendChild(editLink);

    // EDIT SHOP
    // If the HTML page is 'collab.html', add an 'edit_shop' link
    if (window.location.pathname.includes('collab.html')) {
      const shopLinkContainer = document.createElement('span');

      info.appendChild(document.createTextNode('  |  ')); // Add space

      const editShopLink = document.createElement('a');
      editShopLink.href = "#"; // It's good practice to set the href attribute for anchor tags
      editShopLink.textContent = 'edit shop'; // Set link text
      editShopLink.title = 'Click to edit this shop link.'; // Tooltip text that will appear on hover
      editShopLink.className = 'edit-shop-link'; // Add a class for styling

      // Create the tooltip container
      const tooltipContainer = document.createElement('div');
      tooltipContainer.className = 'tooltip';

      // Create the input field
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.placeholder = 'Paste shop link...';
      inputField.className = 'shop-link-input'; // Add a class for the input

      // Append the input field to the tooltip container
      tooltipContainer.appendChild(inputField);

      // Append the tooltip container to the shop link container
      shopLinkContainer.appendChild(tooltipContainer);

      // Append the "edit_shop" link to the shop link container
      shopLinkContainer.appendChild(editShopLink);

      // Append the shop link container to the info
      info.appendChild(shopLinkContainer);

      // Add event listener for the "edit_shop" link
      editShopLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default action of the anchor tag

        // Get the input field value (shop link)
        const shopLink = inputField.value.trim();

        // Validate shopLink if necessary
        if (!shopLink) {
          alert('Please enter a valid shop link.');
          return;
        }

        // Send HTTP request to server
        fetch('/update-shop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ shopLink: shopLink, stepName: item.step  })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update shop link.');
          }
          return response.json();
        })
        .then(data => {
          // Handle success, e.g., show a success message to the user
          alert('Shop link updated successfully!');
        })
        .catch(error => {
          // Handle error, e.g., show an error message to the user
          console.error('Error updating shop link:', error);
          alert('An error occurred while updating the shop link. Please try again later.');
        });
      });
    }




    container.appendChild(info);



    // Append the container to the gallery
    gallery.appendChild(container);


    // GALLERY AD Check if it's the 4th item and not the last item, then insert the ad
    if ((index + 1) % 4 === 0 && (index + 1) !== filteredData.length) {
      const adContainer = document.createElement('div');
      adContainer.innerHTML = adCode;
      gallery.appendChild(adContainer);
    } else if ((index + 1) === filteredData.length && (index + 1) % 4 !== 0) {
      // If it's the last item and the total number of items is not a multiple of 4, insert the ad
      const adContainer = document.createElement('div');
      adContainer.innerHTML = adCode;
      gallery.appendChild(adContainer);
    }

  };
}


function appendLinks(info, linksString, displayName) {
  const links = linksString.split(';').filter(url => url.trim());

  if (links.length === 1) {
    const link = document.createElement('a');
    link.href = links[0].trim();
    link.textContent = displayName;
    link.target = '_blank';
    info.appendChild(link);
    info.appendChild(document.createTextNode('  |  '));

  } else {
    const textNode = document.createTextNode(displayName + ' ');
    info.appendChild(textNode);

    links.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url.trim();
      link.textContent = index + 1;
      link.target = '_blank';
      info.appendChild(link);

      if (index < links.length - 1) {
        info.appendChild(document.createTextNode(', '));
      } else {
        info.appendChild(document.createTextNode('  |  '));
      }
    });
  }
}

//Step	Style	Country	Gif Url	Gif Src	Videos	Tutorial	Creator	Creator Url	Year	Song	Shop	Comments
// https://docs.google.com/forms/d/e/1FAIpQLSfK6ZAifSgM2K6HGxDn1Nt9pHCkz4N8IT5uufGm3yQKEeP7wA/
/*
viewform?usp=pp_url&
entry.457585850=StepName&
entry.1019167680=Sytle&
entry.295619457=Country&
entry.555782816=https://drive.google.com/thumbnail?id%3D10jUsZrpaAYG5dzv7SYcDN-zhQst_OMIN&
entry.1809988814=https://www.youtube.com/watch?v%3DNzdE4jNnTxM&
entry.257844052=Videos&
entry.1583675624=Tutorial&
entry.1908612392=Creator&
entry.950651488=Creator+Url&
entry.1499389267=Year&
entry.820569580=Song&
entry.74962114=Shop&
entry.107256656=Comments
*/
function generatePreFilledFormUrl(item) {
  const basePreFilledLink = "https://docs.google.com/forms/d/e/1FAIpQLSfK6ZAifSgM2K6HGxDn1Nt9pHCkz4N8IT5uufGm3yQKEeP7wA/viewform?usp=pp_url";
  const stepNameEntry = "&entry.457585850=" + encodeURIComponent(item.step);
  const styleEntry = "&entry.1019167680=" + encodeURIComponent(item.style);
  const countryEntry = "&entry.295619457=" + encodeURIComponent(item.country);
  const gifurlEntry = "&entry.555782816=" + encodeURIComponent(item.gifUrl);
  const gifSourceEntry = "&entry.1809988814=" + encodeURIComponent(item.gifUrl);
  let concatFields = basePreFilledLink + stepNameEntry + styleEntry + countryEntry + gifurlEntry + gifSourceEntry

  if (item.videos) {
    const thisEntry = "&entry.257844052=" + encodeURIComponent(item.videos);
    concatFields = concatFields + thisEntry
  }
  if (item.creator) {
    const thisEntry = "&entry.1908612392=" + encodeURIComponent(item.creator);
    concatFields = concatFields + thisEntry
  }
  if (item.creatorLink) {
    const thisEntry = "&entry.950651488=" + encodeURIComponent(item.creatorLink);
    concatFields = concatFields + thisEntry
  }
  if (item.year) {
    const thisEntry = "&entry.1499389267=" + encodeURIComponent(item.year);
    concatFields = concatFields + thisEntry
  }
  if (item.song) {
    const thisEntry = "&entry.820569580=" + encodeURIComponent(item.song);
    concatFields = concatFields + thisEntry
  }

  return concatFields; // Concatenate all fields
}





function getFlagEmoji(countryName) {
  // Simple mapping of country names to emojis
  const flags = {
    'USA': '🇺🇸',
    'Angola': '🇦🇴',
    'South Africa': '🇿🇦',
    'Angola/South Africa': '🇦🇴🇿🇦',
    'Ghana': '🇬🇭',
    'Nigeria': '🇳🇬',
    'Gabon': '🇬🇦',
    'Congo': '🇨🇬🇨🇩',
    'Rwanda': '🇷🇼',
    'Jamaica': '🇯🇲',
    'Ivory Coast': '🇨🇮',
    'Uganda': '🇺🇬',
    'Ethiopia': '🇪🇹',
    'Kenya': '🇰🇪',
    'Cameroun': '🇨🇲',
    'Senegal': '🇸🇳',
    'Togo': '🇹🇬',

    // Add more countries as needed
  };
  return flags[countryName] || ''; // Return the emoji or an empty string if not found
}






function getData() {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => console.error('Error K:', error));
}

function setData(apiUrl, stepName, values) {
  RESPONSE = fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
      step: stepName,
      values: values
    })
  });
  return RESPONSE
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to set data.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data set successfully:', data);
      return data;
    })
    .catch(error => {
      console.error('Error setting data:', error);
      throw error;
    });
}






function transformGoogleDriveURL(url) {
  const baseUrl = "https://drive.google.com/thumbnail?id=";
  const match = url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/file\/d\/([a-zA-Z0-9_-]+)/);

  if (match && match[1]) {
    url = baseUrl + match[1];
  } else {
    // Return original URL if no ID is found or the format is incorrect
    return url;
  }
  return url;
}

// Example usage
//const originalUrl = "http://drive.google.com/uc?export=view&id=11eSwhsuU-bFs8at5whcIx93KRzk8AjSI";
//const transformedUrl = transformGoogleDriveURL(originalUrl);
//console.log(transformedUrl);












// Function to call applyFilters when Enter key is pressed
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    applyFilters();
  }
}






// Call this function when the page loads
async function initFilters() {
  const data = await populateMenuOptions();

  // Add event listeners within init to ensure elements are available
  document.getElementById('stepName').addEventListener('keypress', handleKeyPress);
  document.getElementById('style').addEventListener('keypress', handleKeyPress);
  document.getElementById('country').addEventListener('keypress', handleKeyPress);
  document.getElementById('creator').addEventListener('keypress', handleKeyPress);

  // Filter data to include only rows with a GIF URL
  const dataWithGifs = data.filter(item => item.gifUrl && item.gifUrl.trim() !== '');

  // Proceed only if there are rows with GIFs
  if (dataWithGifs.length > 0) {
    // Select a random row from the data with GIFs
    const randomIndex = Math.floor(Math.random() * dataWithGifs.length);
    const randomDataWithGif = [dataWithGifs[randomIndex]]; // Create an array with the randomly selected data row
    
    // Update the gallery with the randomly selected data row that includes a GIF
    updateGallery(randomDataWithGif);
  }


  // Set the default style you want to select
  //const defaultStyle = 'Amapiano';

  // Get the style dropdown element
  //const styleSelect = document.getElementById('style');

  // Loop through the options to find the index of the default style
  /*
  for (let i = 0; i < styleSelect.options.length; i++) {
    if (styleSelect.options[i].textContent === defaultStyle) {
      styleSelect.selectedIndex = i; // Set the selected index to the default style
      break;
    }
  }

  applyFilters(data);
  */


}

document.addEventListener('DOMContentLoaded', function () {

  insertNavbarAndFilters();

  document.querySelector('.nav-links').addEventListener('click', function () {
    var dropdown = document.querySelector('.dropdown-content');
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  });


  var includeFilters = window.includeFilters; // Default to false if undefined
  if (includeFilters) {
    initFilters();
  }
});


