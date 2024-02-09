document.addEventListener('DOMContentLoaded', function() {

    function renderComponents() {
        var includeFilters = window.includeFilters; // Default to false if undefined

        // Navbar HTML
        var navbarHtml = `
            <nav class="navbar">
                <div class="logo-and-title">
                    <img src="logo.png" alt="Logo" style="height: 40px;">
                    <span class="site-title">dancegifs.com</span>
                </div>
                <button class="mobile-toggle" onclick="toggleNav()">☰</button>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="https://forms.gle/mzy3RA9YncWPNvD19" target="_blank">Submit a GIF</a></li>
                    <li><a href="/about.html">About</a></li>
                    <li><a href="https://forms.gle/fVt2piGFEk1UcwqDA" target="_blank">Contact</a></li>
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
                    <button onclick="applyFilters()">Apply Filters</button>
                    <button onclick="resetFilters()">Reset Filters</button>
                </div>
            </div>
            
            <!-- Call script to display Gifs -->
            <script src="script.js"></script>`;


        // Insert based on the includeFilters flag
        const combinedHtml = includeFilters ? navbarHtml + filtersHtml : navbarHtml;
        document.body.insertAdjacentHTML('afterbegin', combinedHtml);
    }
  

    // Toggle navigation for mobile view
    window.toggleNav = function() {
        var navLinks = document.querySelector(".nav-links");
        navLinks.style.display = (navLinks.style.display === "block") ? "none" : "block";
    };

    // Placeholder functions for filter actions
    window.applyFilters = function() {
        console.log("Filters applied.");
    };

    window.resetFilters = function() {
        console.log("Filters reset.");
    };

    // Insert components into the page
    renderComponents();

    

});
