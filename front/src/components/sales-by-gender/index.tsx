import ReactApexChart from "react-apexcharts";
import { buildPieChartConfig } from "./helpers";
import "./styles.css";

type Props = {
  labels?: string[];
  series?: number[];
};

export default function SalesByGenderChart({
  labels = [],
  series = [],
}: Props) {
  return (
    <div className="sales-by-gender-chart-container">
      <ReactApexChart
        options={buildPieChartConfig(labels)}
        type="donut"
        width={300}
        height={300}
        series={series}
      />
    </div>
  );
}
