const deleteButtons = document.querySelectorAll("button[data-category-id]");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const id = button.getAttribute("data-category-id");
    try {
      const response = await fetch(
        `/categories/${button.getAttribute("data-category-id")}`,
        {
          method: "DELETE",
        },
      );

      let json;
      if (!response.ok) {
        if (response.headers.get("content-type").includes("application/json")) {
          json = await response.json();
          if (json.errors.length > 0) {
            return console.error(json.errors);
          } else {
            return console.error(`Couldn't delete category`);
          }
        }
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
      console.log(`Something went wrong`);
    }
  });
});
