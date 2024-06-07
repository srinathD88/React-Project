import AreaChart from "./charts/AreaChart";
import BarChart from "./charts/BarChart";
import BubbleChart from "./charts/BubbleChart";
import LineChart from "./charts/LineChart";
import MixCharts from "./charts/MixCharts";
import PieAndDonutChart from "./charts/PieAndDonutChart";
import RadialChart from "./charts/RadialChart";
import ScatterPlotChart from "./charts/ScatterPlotChart";
import Spline from "./demo/Spline";
import StackedBarChart from "./charts/StackedBarChart";
import ContainerWrapper from "./demo/ContainerWrapper";

const CoreCharts = () => {
  return (
    <div className="charts_list1">
      {/* <LineChart />
      <BarChart />
      <StackedBarChart />
      <AreaChart />
      <MixCharts />
      <PieAndDonutChart />
      <RadialChart />
      <ScatterPlotChart />
      <BubbleChart /> */}
      {/* <Spline /> */}
      <ContainerWrapper />
    </div>
  );
};

export default CoreCharts;
