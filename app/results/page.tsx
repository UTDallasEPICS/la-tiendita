// commentssss

'use client'; 

import { useEffect } from 'react'; 
import { Chart, ArcElement, RadialLinearScale, PolarAreaController, Tooltip, Legend } from 'chart.js';  // Import required components from Chart.js

// Register the necessary components
Chart.register(ArcElement, RadialLinearScale, PolarAreaController, Tooltip, Legend);

export default function Intro() {
  useEffect(() => {
    //ensuring it's not null
    const canvas = document.getElementById('myPolarChart') as HTMLCanvasElement | null;
    
    // Check if canvas is not null
    if (canvas) {
      const ctx = canvas.getContext('2d');
      
     
      if (ctx) {
        new Chart(ctx, {
          type: 'polarArea',
          data: {
            labels: ['career1','career2', 'career3', 'career4', 'career5'], // Example 
            datasets: [{
              data: [11,16,7,4,14], // example
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
              ],
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              r: {
                beginAtZero: true, // Ensure the scale begins at zero
              },
            },
            plugins: {
              tooltip:{
                callbacks: {
                  label: function(tooltipItem) {
                    const dataset =tooltipItem.dataset;
                    const index = tooltipItem.dataIndex;
                    const label = dataset.label || ' ';
                    const description = [
                      'Career 1 description',
                      'Career 2 description',
                      'Career 3 description',
                      'Career 4 description',
                      'Career 5 description',

                    ];
                    return `${label}: ${dataset.data[index]} - ${description[index]}`; 
                  }
                }
              }
            }
          },
        });
      } else {
        console.error('Unable to get context for the canvas');
      }
    } else {
      console.error('Canvas element not found');
    }
  }, []); 

  return ( // not so sure on what to put here 
    <main className="flex justify-between mt-20 pt-10 px-8">
      <div className="w-1/2 p-5">
        <h1 className="text-6xl font-extrabold text-customGray">Results</h1>
        <p className="text-2xl text-customGray mt-4"> 
          Based on your survey results we have....change
        </p>
      </div>

      <div className="flex justify-end p-5">
        {    }
        <canvas id="myPolarChart" width="400" height="400"></canvas>
      </div>
    </main>
  );
}




