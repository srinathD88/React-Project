import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import patternFill from "highcharts/modules/pattern-fill";
import HC_more from "highcharts/highcharts-more";
import { memo } from "react";

exporting(Highcharts);
patternFill(Highcharts);
HC_more(Highcharts);

const ChartElememt = ({ options }) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default memo(ChartElememt);
