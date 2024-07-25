import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import jsonLtoJson from "../JsonLToJson";

const ValOverview = ({ path, theme }) => {
  const [metrics, setMetrics] = useState(null);

  const newPath = `/machine-learning-dashboard${path}history.jsonl`;

  useEffect(() => {
    const historyData = async () => {
      const response = await fetch(newPath);

      const text = await response.text();
      const metrics = jsonLtoJson(text);
      setMetrics(metrics);
    };
    historyData();
  }, [newPath]);

  if (!metrics || !newPath) return null;

  const c = [
    "#95D2B3",
    "#FF7D29",
    "#E5E483",
    "#C69749",
    "#38E54D",
    "#D24545",
    "#556B2F",
    "#F6B17A",
    "#BED754",
    "#D4ADFC",
    "#FF3FA4",
    "#C40C0C",
  ];

  const experimentName = metrics.map((metric) => metric.experiment);

  const uniqueExperiment = experimentName.filter(
    (name, index) => experimentName.indexOf(name) === index
  );

  const colorMap = {};
  uniqueExperiment.forEach((experiment, index) => {
    colorMap[experiment] = c[Math.floor(Math.random() * c.length)];
  });

  const neueMetricsData = metrics.reduce((acc, current) => {
    const { experiment, val_accuracy, model, date } = current;

    if (!val_accuracy) {
      return acc;
    }
    const metric = acc.find(
      (metric) => metric.experiment === experiment && metric.model === model
    );

    if (metric) {
      metric.data.push({ date, val_accuracy });
    } else {
      acc.push({
        experiment,
        // color: colors[experiment],
        model,
        data: [{ date, val_accuracy }],
      });
    }

    return acc;
  }, []);
  console.log("🚀 ~ neueMetricsData ~ neueMetricsData:", neueMetricsData);

  const sortierteMetricsData = neueMetricsData.sort((a, b) => {
    if (a.experiment < b.experiment) return -1;
    if (a.experiment > b.experiment) return 1;
    return 0;
  });
  const plotData = sortierteMetricsData.map((expermint) => ({
    mode: "markers+text",
    type: "scatter",
    x: expermint.data.map((metric) => metric.date),
    y: expermint.data.map((metric) => metric.val_accuracy),
    marker: { color: colorMap[expermint.experiment] },
    name: `${expermint.model} (${expermint.experiment})`,
  }));

  const layout = {
    title: "Validation Accuracy of Each Model in Experiment by Date",
    font: { color: theme.palette.primary.font },
    xaxis: { title: "Date" },
    yaxis: { title: "Validation Accuracy" },

    width: "100%",
    height: "100%",
    responsive: true,
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: { l: 60, r: 350, b: 60, t: 60 },
  };
  const config = { responsive: true };

  return <Plot data={plotData} layout={layout} config={config} />;
};

export default ValOverview;
