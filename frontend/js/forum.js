// forum.js

// Sample data for initial discussions
let discussions = [
    { title: "Managing Diabetes Effectively", body: "Here are some tips and tricks for managing your diabetes daily." },
    { title: "Healthy Recipes for Diabetics", body: "Share your favorite healthy and diabetes-friendly recipes here!" },
    { title: "Exercise Tips for Diabetics", body: "Let's talk about how exercise can benefit people with diabetes." },
  ];
  
  // Function to display discussions
  function displayDiscussions() {
    const discussionsList = document.getElementById("discussions");
    discussionsList.innerHTML = ""; // Clear the existing discussions
  
    discussions.forEach(discussion => {
      const listItem = document.createElement("li");
      listItem.innerHTML = 
        <strong>${discussion.title}</strong>
        <p>${discussion.body}</p>;
      discussionsList.appendChild(listItem);
    });
  }
  
  // Function to post a new discussion
  document.getElementById("newDiscussionForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const title = document.getElementById("discussionTitle").value;
    const body = document.getElementById("discussionBody").value;
  
    if (title && body) {
      discussions.push({ title, body }); // Add new discussion
      displayDiscussions(); // Re-render the discussions
      document.getElementById("discussionTitle").value = "";
      document.getElementById("discussionBody").value = "";
    }
  });
  
  // Function to search discussions
  function searchDiscussions() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
  
    const filteredDiscussions = discussions.filter(discussion => {
      return discussion.title.toLowerCase().includes(searchQuery) || discussion.body.toLowerCase().includes(searchQuery);
    });
  
    // Display filtered discussions
    const discussionsList = document.getElementById("discussions");
    discussionsList.innerHTML = ""; // Clear the list
  
    filteredDiscussions.forEach(discussion => {
      const listItem = document.createElement("li");
      listItem.innerHTML = 
      <strong>${discussion.title}</strong><p>${discussion.body}</p>;
      discussionsList.appendChild(listItem);
    });
  }
  
  // Initially display all discussions
  displayDiscussions();
  // Dynamically handle new discussions and search functionality

// Add new discussion
document.getElementById("newDiscussionForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
  
    // Get input values
    const title = document.getElementById("discussionTitle").value.trim();
    const body = document.getElementById("discussionBody").value.trim();
  
    if (title && body) {
      // Create a new discussion item
      const newDiscussion = document.createElement("li");
      newDiscussion.classList.add("discussion-item");
  
      newDiscussion.innerHTML = `
        <h3>${title}</h3>
        <p>Posted by <strong>You</strong>: ${body}</p>
      `;
  
      // Add to the discussions list
      const discussionList = document.getElementById("discussions");
      discussionList.prepend(newDiscussion);
  
      // Clear form inputs
      document.getElementById("discussionTitle").value = "";
      document.getElementById("discussionBody").value = "";
    } else {
      alert("Please fill in both fields.");
    }
  });
  
  // Search discussions
  function searchDiscussions() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const discussions = document.querySelectorAll(".discussion-item");
  
    discussions.forEach((discussion) => {
      const title = discussion.querySelector("h3").textContent.toLowerCase();
      const body = discussion.querySelector("p").textContent.toLowerCase();
  
      if (title.includes(searchQuery) || body.includes(searchQuery)) {
        discussion.style.display = "block";
      } else {
        discussion.style.display = "none";
      }
    });
  }
  