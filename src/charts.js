import { Chart } from 'chart.js';

// async function prepareStaticData() {
//   return {
//     labels: ['a', 'b', 'c', 'd', 'e'],
//     datasets: [
//       {
//         label: ' dataset 1',
//         borderColor: 'rgba(40, 167, 69, 0.8)',
//         data: [1, 2, 3, 4, 5],
//       },
//       {
//         label: ' dataset 2',
//         borderColor: 'rgba(220, 53, 69, 0.8)',
//         data: [3, 4, 1, 2, 2],
//       },
//       {
//         label: ' dataset 2',
//         borderColor: 'rgba(255, 193, 7, 0.8)',
//         data: [5, 3, 4, 1, 2],
//       },
//     ],
//   };
// }

async function prepareData(fromDate, toDate) {
  const URL = `http://api.nbp.pl/api/cenyzlota/${fromDate}/${toDate}?format=json`;
  const res = await fetch(URL);
  const json = await res.json();

  return {
    labels: json.map((value) => value.data),
    datasets: [
      {
        label: 'Cena',
        data: json.map((value) => value.cena),
        borderColor: 'rgba(255, 193, 7, 0.8)',
      },
    ],
  };
}

async function createChart() {
  const canvas = document.getElementById('chart-canvas');

  const fromDate = document.getElementById('date-from');
  const toDate = document.getElementById('date-to');

  const options = {
    type: 'line',
    data: await prepareData(fromDate.value, toDate.value),
  };

  const chart = new Chart(canvas, options);

  fromDate.addEventListener('change', async () => {
    chart.config.data = await prepareData(fromDate.value, toDate.value);
    chart.update();
  });

  toDate.addEventListener('change', async () => {
    chart.config.data = await prepareData(fromDate.value, toDate.value);
    chart.update();
  });

  console.log(chart);
}

document.addEventListener('DOMContentLoaded', createChart);
