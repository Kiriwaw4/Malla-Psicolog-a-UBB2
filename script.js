const ramos = document.querySelectorAll(".ramo");
const sctTexto = document.getElementById("sct-aprobados");
const barra = document.getElementById("barra-progreso");

function actualizarSCT() {
  let total = 0;
  document.querySelectorAll(".ramo.aprobado").forEach(r => {
    total += parseInt(r.dataset.sct);
  });

  sctTexto.textContent = total;
  barra.style.width = (total / 300) * 100 + "%";
}

function verificarBloqueos() {
  ramos.forEach(ramo => {
    const prereq = ramo.dataset.prereq;
    if (!prereq) return;

    const aprobado = localStorage.getItem(prereq) === "true";
    if (aprobado) {
      ramo.classList.remove("bloqueado");
    }
  });
}

ramos.forEach(ramo => {
  const id = ramo.dataset.id;

  if (localStorage.getItem(id) === "true") {
    ramo.classList.add("aprobado");
  }

  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("bloqueado")) return;

    ramo.classList.toggle("aprobado");
    localStorage.setItem(id, ramo.classList.contains("aprobado"));
    actualizarSCT();
    verificarBloqueos();
  });
});

actualizarSCT();
verificarBloqueos();
