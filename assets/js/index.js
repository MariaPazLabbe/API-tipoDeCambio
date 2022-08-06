let inputNumber = document.querySelector("#inputNumber");
let selectIndicator = document.querySelector("#selectIndicator");
let button = document.querySelector("#button");
let dataArray = [];
let myChart = null;
let lastchange = 0;

async function ConectionServer() {
  try {
    currency = selectIndicator.value;

    const res = await fetch(`https://mindicador.cl/api/${currency}`);
    const data = await res.json();
    console.log(res.status);

    lastchange = data.serie[0].valor;
    let test = data.serie;

    calculo();

    dataArray = data.serie;
    const datChange = dataArray.map((x) => x.valor);
    const datLabel = dataArray.map((x) => x.fecha);
    chartRender(datLabel, datChange);
    document.querySelector("#error").innerHTML =
      "Mensaje del Servidor: conexión realizada exitosamente";
  } catch (e) {
    document.querySelector("#error").innerHTML =
      "Mensaje del Servidor: No se pudo establecer la conexión";
     alert("No se pudo establecer la conexión")
    document.querySelector("#resultado").innerHTML = "...";
  }
}


function chartRender(datLabel, datChange) {
  const ctx = document.getElementById("myChart").getContext("2d");
  if (myChart != null) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: datLabel.reverse(),
      datasets: [
        {
          label: `Valor: ${currency.toUpperCase()}`,
          data: datChange.reverse(),
backgroundColor: [
  'rgba(255, 99, 132, 0.2)',  // Bar 1
  'rgba(54, 162, 235, 0.2)',  // Bar 2
  'rgba(255, 206, 86, 0.2)',  // Bar 3
  'rgba(75, 192, 192, 0.2)',  // Bar 4
  'rgba(153, 102, 255, 0.2)', // Bar 5
  'rgba(255, 159, 64, 0.2)'   // Bar 6
],
          borderWidth: 2,
          borderColor: [
  'rgba(255, 99, 132, 1)',    // Bar 1
  'rgba(54, 162, 235, 1)',    // Bar 2
  'rgba(255, 206, 86, 1)',    // Bar 3
  'rgba(75, 192, 192, 1)',    // Bar 4
  'rgba(153, 102, 255, 1)',   // Bar 5
  'rgba(255, 159, 64, 1)'     // Bar 6
],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}

function calculo() {
  let resultado = Number((inputNumber.value / lastchange).toFixed(2));

  document.querySelector("#resultado").innerHTML = "Resultado  :  " + resultado;
}

button.addEventListener("click", () => {
  if (inputNumber.value == "") {
    alert("Debe ingresar un valor");
    return;
  }

  if (isNaN(inputNumber.value)) {
    alert("Solo puedes ingresar valores numéricos en la cantidad a convertir");
    return;
  }

  ConectionServer();
});