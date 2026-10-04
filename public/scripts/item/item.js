const deleteButtons = document.querySelectorAll("button[data-item-id]");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const id = button.getAttribute("data-item-id");
    try {
      const response = await fetch(`/items/${id}`, {
        method: "DELETE",
      });

      let json;
      if (!response.ok) {
        if (response.headers.get("content-type").includes("application/json")) {
          json = await response.json();
          if (json.errors.length > 0) {
            return console.error(json.errors);
          } else {
            return console.error(`Couldn't delete item`);
          }
        }
      }
      window.location.pathname = "/items";
    } catch (error) {
      console.error(error);
      console.log(`Something went wrong`);
    }
  });
});
