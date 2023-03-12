/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

let p = document.getElementById("consultaClima");
let f = document.querySelector('input[type="date"]');
let d = document.getElementById("diaClima");
let c = document.getElementById("pronostico");
let img = document.getElementById("imgClima");

async function Consulta() {
  //ClearElements();
  c.innerHTML = "Pronostico: " + (await Tiempo(f.value).then());
}

function Tiempo(dia) {
  let temp = Math.floor(Math.random() * (30 - 5) + 5);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (temp >= 5 && temp < 13) {
        resolve("Lluvioso");
        img.src = "./img/rainy.png";
      } else if (temp >= 13 && temp < 22) {
        resolve("Nublado");
        img.src = "./img/cloudy.png";
      } else if (temp > 22) {
        resolve("Despejado");
        img.src = "./img/sun.png";
      } else {
        reject(Error("Datos Insuficientes"));
      }
      d.innerHTML = "El Clima para el Día: " + dia;
      p.innerHTML = "Temperatura: " + temp;
    }, 3000);
  });
}

async function ConsultaDia() {
  let fecha = new Date().toLocaleDateString("es-GT");
  c.innerHTML = "Pronostico: " + (await Tiempo(fecha).then());
}

function ClearElements() {
  p.innerHTML = "";
  f.innerHTML = "";
  d.innerHTML = "";
  c.innerHTML = "";
  img.src = "//:0";
}
