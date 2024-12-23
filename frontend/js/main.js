const form = document.getElementById("foodForm");
const resultDiv = document.getElementById("result");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://127.0.0.1:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.error) {
      resultDiv.innerHTML = `<p style="color: red;">Error: ${result.error}</p>`;
    } else {
      resultDiv.innerHTML = `
                <p style="color: green;">Recommendation: ${result.recommendation}</p>
                <p>Glycemic Index: ${result.glycemic_index}</p>
                <p>Calories: ${result.calories}</p>
            `;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Failed to connect to the server.</p>`;
  }
});
//community form
// Add event listener for the new post form
const newPostForm = document.getElementById("newPostForm");
const postList = document.getElementById("postList");

newPostForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the content of the new post
  const postContent = document.getElementById("postContent").value;

  if (postContent.trim() === "") {
    alert("Please write something before posting.");
    return;
  }

  // Create a new post element
  const postItem = document.createElement("div");
  postItem.classList.add("post-item");

  const postTitle = document.createElement("h3");
  postTitle.textContent = "New Discussion";

  const postBody = document.createElement("p");
  postBody.textContent = postContent;

  postItem.appendChild(postTitle);
  postItem.appendChild(postBody);

  // Add the new post to the post list
  postList.insertBefore(postItem, postList.firstChild);

  // Clear the form
  document.getElementById("postContent").value = "";
});
