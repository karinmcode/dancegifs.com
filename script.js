async function applyFilters() {
  // Get the filter values
  const stepName = document.getElementById('stepName').value;
  const style = document.getElementById('style').value;
  const country = document.getElementById('country').value;
  // Add other filters as needed

  try {
      // Build the URL for the Google Sheets API
      // Note: You need to set up your Google Sheets API and have the URL ready

      // Fetch data from Google Sheets
      const data = getData();

      // Filter the data based on the selected filter values
      const filteredData = data.values.filter(row => {
          // Assuming the structure of your row is [gifUrl, stepName, style, country, ...]
          return (stepName === '' || row[1] === stepName) &&
                 (style === '' || row[2] === style) &&
                 (country === '' || row[3] === country);
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

  // Loop through the filtered data and create elements for each GIF
  filteredData.forEach(row => {
      const gifUrl = row[0]; // Assuming the first column is the GIF URL
      const img = document.createElement('img');
      img.src = gifUrl;
      img.alt = 'Dance Step';
      // Add other attributes or classes as needed

      gallery.appendChild(img);
  });
}



function dispData(){
  fetch('https://script.google.com/macros/s/AKfycbxI2y5PAFn4SwiwsXRUMewDd9ewERubWRh9LgZJCMsHp7gmiS8KyeXroF1t3LVhP1ZF/exec')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Process and display your data here
    })
    .catch(error => console.error('Error K:', error));

}

function getData(){
  fetch('https://script.google.com/macros/s/AKfycbxI2y5PAFn4SwiwsXRUMewDd9ewERubWRh9LgZJCMsHp7gmiS8KyeXroF1t3LVhP1ZF/exec')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Process and display your data here
    })
    .catch(error => console.error('Error K:', error));

}

async function populateCountryOptions() {
  try {
      const data = await getData(); // Wait for data to be fetched

      // Assuming the first row contains headers
      const headers = data[0];
      const countryIndex = headers.indexOf('Country');

      // Extract unique countries
      const countries = data.slice(1).map(row => row[countryIndex])
                                   .filter((value, index, self) => value && self.indexOf(value) === index);

      // Populate the 'country' dropdown
      const countrySelect = document.getElementById('country');
      countries.forEach(country => {
          const option = document.createElement('option');
          option.value = option.textContent = country;
          countrySelect.appendChild(option);
      });
  } catch (error) {
      console.error('Error fetching or processing data:', error);
  }
}

// Call this function when the page loads
//populateCountryOptions();
dispData();