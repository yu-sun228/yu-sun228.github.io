const panel = document.getElementById("panel");
const buttons = document.querySelectorAll(".side-nav button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const targetSection = document.getElementById(targetId);

    panel.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth"
    });
  });
});
