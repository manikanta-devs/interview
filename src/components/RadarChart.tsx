import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface RadarChartProps {
  labels: string[];
  values: number[];
}

const RadarChart = ({ labels, values }: RadarChartProps) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Score",
        data: values,
        backgroundColor: "hsla(260, 70%, 60%, 0.2)",
        borderColor: "hsl(260, 70%, 60%)",
        borderWidth: 2,
        pointBackgroundColor: "hsl(210, 80%, 55%)",
        pointBorderColor: "hsl(210, 80%, 55%)",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "hsl(220, 10%, 55%)",
          backdropColor: "transparent",
          font: { size: 10 },
        },
        grid: { color: "hsl(230, 15%, 25%)" },
        angleLines: { color: "hsl(230, 15%, 25%)" },
        pointLabels: {
          color: "hsl(220, 20%, 85%)",
          font: { size: 12, weight: "600" as const },
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "hsl(230, 20%, 12%)",
        titleColor: "hsl(220, 20%, 95%)",
        bodyColor: "hsl(220, 20%, 85%)",
        borderColor: "hsl(230, 15%, 25%)",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
