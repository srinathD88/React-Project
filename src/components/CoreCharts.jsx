import AreaChart from "./charts/AreaChart";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import MixCharts from "./charts/MixCharts";
import PieAndDonutChart from "./charts/PieAndDonutChart";
import RadialChart from "./charts/RadialChart";
import StackedBarChart from "./charts/StackedBarChart";

const CoreCharts = () => {
  return (
    <div className="charts_list">
      <LineChart />
      <BarChart />
      <StackedBarChart />
      <AreaChart />
      <MixCharts />
      <PieAndDonutChart />
      <RadialChart />
    </div>
  );
};

export default CoreCharts;
