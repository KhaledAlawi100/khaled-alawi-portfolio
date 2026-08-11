export function initProjectDialogs() {
  const detailButtons = document.querySelectorAll(".project-details-button");

  const dialogs = document.querySelectorAll(".project-dialog");

  
  // Open dialogs
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dialogId = button.dataset.dialogTarget;
      const dialog = document.getElementById(dialogId);

      if (!dialog) {
        console.error(`Project dialog "${dialogId}" was not found.`);
        return;
      }

      dialog.showModal();
    });
  });


  // Close dialogs
  dialogs.forEach((dialog) => {
    const closeButton = dialog.querySelector(".dialog-close");

    if (!closeButton) {
      console.warn(`No close button found for project dialog "${dialog.id}".`);

      return;
    }

    closeButton.addEventListener("click", () => {
      dialog.close();
    });

    
    // Close when clicking backdrop
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
}
