// Dynamically handle new discussions and search functionality

// Add new discussion
document
  .getElementById("newDiscussionForm")
  .addEventListener("submit", function (event) {
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
