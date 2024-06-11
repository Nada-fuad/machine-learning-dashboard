import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import textToJsonObject from "../JsonLToJson";

const TestOverview = ({ path, theme }) => {
  const [metrics, setMetrics] = useState(null);

  const newPath = `/machine-learning-dashboard${path}history.jsonl`;

  useEffect(() => {
    const historyData = async () => {
      const response = await fetch(newPath);

      const text = await response.text();
      const metrics = textToJsonObject(text);
      setMetrics(metrics);
    };
    historyData();
  }, [newPath]);

  if (!metrics || !newPath) return null;

  const colors = [
    "#0000FF",
    "#458B74",
    "#473C8B",
    "#008000",
    "#008080",
    "#006400",
    "#556B2F",
    "#4682B4",
    "#6495ED",
    "#1E90FF",
    "#483D8B",
    "#6A5ACD",
  ];

  const experimentName = metrics.map((metric) => metric.experiment);

  const uniqueExperiment = experimentName.filter(
    (name, index) => experimentName.indexOf(name) === index
  );

  const colorMap = {};
  uniqueExperiment.forEach((experiment, index) => {
    colorMap[experiment] = `hsl(${(index * 40) % 360}, 50%, 50%)`;
  });

  const neueMetricsData = metrics.reduce((acc, current) => {
    const { experiment, test_accuracy, model, date } = current;

    if (!test_accuracy) {
      return acc;
    }
    const metric = acc.find(
      (metric) => metric.experiment === experiment && metric.model === model
    );
    if (metric) {
      metric.data.push({ date, test_accuracy });
    } else {
      acc.push({
        experiment,
        color: colors[experiment],
        model,
        data: [{ date, test_accuracy }],
      });
    }

    return acc;
  }, []);

  const sortierteMetricsData = neueMetricsData.sort((a, b) => {
    if (a.experiment < b.experiment) return -1;
    if (a.experiment > b.experiment) return 1;
    return 0;
  });
  const plotData = sortierteMetricsData.map((expermint) => ({
    mode: "markers+text",
    type: "scatter",
    x: expermint.data.map((metric) => metric.date),
    y: expermint.data.map((metric) => metric.test_accuracy),
    marker: { color: colorMap[expermint.experiment] },
    name: `${expermint.model} (${expermint.experiment})`,
  }));

  const layout = {
    title: "Test Accuracy of Each Model in Experiment by Date",
    font: { color: theme.palette.primary.font },
    xaxis: { title: "Date" },
    yaxis: { title: "Test Accuracy" },

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

export default TestOverview;
