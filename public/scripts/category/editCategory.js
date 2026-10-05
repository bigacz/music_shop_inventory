const errorPanel = document.getElementById("errorPanel");

const form = document.getElementById("editForm");

const path = window.location.pathname.split("/").splice(1, 2).join("/");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const isFormValid = form.checkValidity();

  if (!isFormValid) {
    return;
  }

  try {
    const response = await fetch(`/${path}`, {
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

    window.location.pathname = `${path}`;
  } catch (error) {
    console.log(error);
  }
});
