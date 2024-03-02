async function fetchTravelData() {
    try {
      const response = await fetch("travel_recommendation_api.json"); // Replace with your JSON file name
      if (!response.ok) {
        throw new Error(`Failed to fetch travel data: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching travel data:", error);
      // Handle error gracefully, e.g., display an error message to the user
      return []; // Return empty array to prevent issues downstream
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent form submission
  
      const searchInput = document.getElementById("search-input").value.toLowerCase();
      const loadingIndicator = document.getElementById("loading-indicator");
      const searchResultsContainer = document.getElementById("search-results");
  
      // Show loading indicator
      loadingIndicator.style.display = "block";
      searchResultsContainer.innerHTML = ""; // Clear previous results
  
      try {
        // Fetch travel data asynchronously
        const travelData = await fetchTravelData();
  
        let matchedResults = [];
        travelData.forEach((item) => {
          const name = item.name.toLowerCase();
          const keywords = item.keywords.map((keyword) => keyword.toLowerCase());
  
          if (name.includes(searchInput) || keywords.includes(searchInput)) {
            matchedResults.push(item);
          }
        });
  
        displaySearchResults(matchedResults);
      } catch (error) {
        console.error("Error searching travel data:", error);
        // Handle error gracefully, e.g., display an error message to the user
      } finally {
        // Hide loading indicator regardless of success or failure
        loadingIndicator.style.display = "none";
      }
    });
  });
  
  function displaySearchResults(results) {
    const resultsContainer = document.getElementById("search-results");
  
    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
      results.forEach((result) => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("search-result");
        resultElement.innerHTML = `
          <h3>${result.name}</h3>
          <p>${result.description}</p>
          <img src="${result.imageUrl}" alt="${result.name}">
        `;
        resultsContainer.appendChild(resultElement);
      });
    }
  }
  
  // Task 9: Clear Button
  // Get the clear button element
  const clearButton = document.getElementById('clearButton');
  
  // Add event listener for click event on clear button
  clearButton.addEventListener('click', () => {
    // Clear the displayed results from the DOM
    const searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = "";
  });
  