const errorPanel = document.getElementById("errorPanel");
const form = document.getElementById("editForm");
const itemId = document.getElementsByName("itemId")[0].value;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`/items/${itemId}`, {
      method: "PATCH",
      body: new URLSearchParams(new FormData(event.target)),
    });

    if (response.status == 400) {
      errorPanel.innerHTML = "";

      const errors = await response.json();

      errors.forEach((error) => {
        const errorNode = document.createElement("li");
        errorNode.textContent = error.msg;

        errorPanel.append(errorNode);
      });
    }

    if (!response.ok) {
      throw response;
    }

    window.location.pathname = `/items/${itemId}`;
  } catch (error) {
    console.error(error);
  }
});
