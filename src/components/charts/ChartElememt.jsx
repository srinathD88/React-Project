import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import hcMore from "highcharts/highcharts-more";
import data from "highcharts/modules/data";
import exportData from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import patternFill from "highcharts/modules/pattern-fill";
import coloraxis from "highcharts/modules/coloraxis";

import { forwardRef, memo } from "react";

exporting(Highcharts);
patternFill(Highcharts);
data(Highcharts);
hcMore(Highcharts);
exportData(Highcharts);
offlineExporting(Highcharts);
coloraxis(Highcharts);

const ChartElememt = forwardRef(({ options }, ref) => {
  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={ref} />
  );
});

export default memo(ChartElememt);
