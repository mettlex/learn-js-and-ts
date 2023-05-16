const f = document.getElementById("text-field");

f.addEventListener("keyup", (event) => {
  const out = document.getElementById("amar-output");

  out.textContent = event.target.value.toUpperCase();
});
