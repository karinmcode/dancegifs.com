async function applyFilters() {
  // Get the filter values
  const stepName = document.getElementById('stepName').value;
  const style = document.getElementById('style').value;
  const country = document.getElementById('country').value;
  // Add other filters as needed

  try {
    // Fetch data from Google Sheets
    const data = await getData(); // Ensure you await the Promise

    // Filter the data based on the selected filter values
    const filteredData = data.filter(item => {
        return (stepName === '' || item.step === stepName) &&
               (style === '' || item.style === style) &&
               (country === '' || item.country === country);
        // Include additional filters as needed
    });

    // Update the gallery with the filtered data
    updateGallery(filteredData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    // Handle errors, such as by displaying a message to the user
  }
}


function updateGallery(filteredData) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear existing content

  filteredData.forEach(item => {
    // Create a container for each item
    const container = document.createElement('div');
    container.className = 'gallery-item'; // Add a class for styling

    // Create and append the step name
    const stepName = document.createElement('p');
    stepName.textContent =  `${item.step} (${item.style})`;
    stepName.className = 'stepName'; // Add a class for styling
    container.appendChild(stepName);

    // Create and append the image
    const gifUrl = item.gifUrl;
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = item.step;
    img.className = 'responsive-gif'; // Add a class for styling
    container.appendChild(img);

    // Append the container to the gallery
    gallery.appendChild(container);
  });
}





function dispData(){
  fetch('https://script.google.com/macros/s/AKfycbwV3kqF5QBNfUR809OzI0DnUN_dj__t4pW1-zXbuMBVSf_Y0gjYeSX7iVKK9n_uyPg/exec')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Process and display your data here
    })
    .catch(error => console.error('Error Code Karin:', error));

}


function getData(){
  return fetch('https://script.google.com/macros/s/AKfycbwV3kqF5QBNfUR809OzI0DnUN_dj__t4pW1-zXbuMBVSf_Y0gjYeSX7iVKK9n_uyPg/exec')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => console.error('Error K:', error));
}

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

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}


// Call this function when the page loads
populateMenuOptions();
//dispData();