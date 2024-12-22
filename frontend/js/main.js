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
