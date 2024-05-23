import Plot from "react-plotly.js";
import React, { useState, useEffect } from "react";
import textToJsonObject from "../ToJsonData";

const LearningsRate = ({ path, theme }) => {
  const [metrics, setMetrics] = useState(null);

  const newPath = `/machine-learning-dashboard${path}metrics.jsonl`;

  useEffect(() => {
    const metricsData = async () => {
      const response = await fetch(newPath);
      const text = await response.text();
      const metrics = textToJsonObject(text);
      setMetrics(metrics);
    };
    metricsData();
  }, [newPath]);

  if (!metrics) return null;

  const lr_SGDs = metrics.filter((metric) => metric["lr-SGD"] !== undefined);

  const lr_SGD = [];
  const epoch = [];
  lr_SGDs.forEach((metric) => {
    if (metric["lr-SGD"] !== undefined) {
      lr_SGD.push(metric["lr-SGD"]);
    }
  });

  const epochs = metrics.filter((metric) => metric.epoch !== undefined);

  epochs.forEach((metric) => {
    if (epoch.indexOf(metric.epoch) === -1) {
      epoch.push(metric.epoch);
    }
  });

  const data = [
    {
      x: epoch,
      y: lr_SGD,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: theme.palette.primary.main },
      line: { color: theme.palette.primary.main },
      name: "Learning Rate",
    },
  ];

  const layout = {
    title: "Learnings Rate with Epoch",
    font: {
      color: theme.palette.primary.font,
      family: "Arial, sans-serif ",
      size: 16,
    },
    xaxis: { title: "Epoch" },
    yaxis: { title: "Learnings Rate" },

    autosize: true,
    responsive: true,
    width: "100%",
    height: "100%",
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: {
      l: 70,
      r: 120,
      b: 80,
      t: 80,
    },
  };
  const config = { responsive: true };

  return <Plot data={data} layout={layout} config={config} />;
};

export default LearningsRate;
