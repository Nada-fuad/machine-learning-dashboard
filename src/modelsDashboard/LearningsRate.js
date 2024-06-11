import Plot from "react-plotly.js";
import React, { useState, useEffect } from "react";
import textToJsonObject from "../JsonLToJson";

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
  console.log("🚀 ~ LearningsRate ~ lr_SGDs:", lr_SGDs);
  const epochs = metrics.filter((metric) => metric.epoch !== undefined);
  console.log("🚀 ~ LearningsRate ~ epochs:", epochs);

  const lr_SGD = [];
  console.log("🚀 ~ LearningsRate ~ lr_SGD:", lr_SGD);
  const epoch = [];
  console.log("🚀 ~ LearningsRate ~ epoch:", epoch);
  lr_SGDs.forEach((metric) => {
    if (metric["lr-SGD"] !== undefined) {
      lr_SGD.push(metric["lr-SGD"]);
    }
  });

  epochs.forEach((metric) => {
    if (metric.epoch !== undefined) {
      epoch.push(metric.epoch);
    }
  });

  const data = [
    {
      x: epoch,
      y: lr_SGD,
      type: "scatter",
      mode: "lines+markers",
      line: { color: theme.palette.primary.learnRate },
      marker: { color: theme.palette.primary.learnRate },
      name: "Learning Rate",
    },
  ];
  console.log("🚀 ~ LearningsRate ~ data:", data);

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
    hovermode: "closest",
  };
  const config = { responsive: true };

  return <Plot data={data} layout={layout} config={config} />;
};

export default LearningsRate;
