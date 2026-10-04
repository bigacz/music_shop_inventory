const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", async () => {
  const producerId = deleteButton.getAttribute("data-producer-id");

  try {
    const response = await fetch(`/producers/${producerId}`, {
      method: "DELETE",
    });

    let json;
    if (!response.ok) {
      if (response.headers.get("content-type").includes("application/json")) {
        json = await response.json();
        if (json.errors.length > 0) {
          return console.error(json.errors);
        } else {
          return console.error(`Couldn't delete producer`);
        }
      }
    }

    window.location.reload();
  } catch (error) {
    console.error(error);
    console.log("Something went wrong when deleting producer");
  }

  window.location.pathname = "producers";
});
