import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import jsonLtoJson from "../JsonLToJson";

const ValAccuracyOverwiev = ({ path, jsonSubexperiment, theme }) => {
  const [historyMetric, setHistoryMetric] = useState(null);

  const newPath = `/machine-learning-dashboard${path}history.jsonl`;

  useEffect(() => {
    const historyData = async () => {
      const response = await fetch(newPath);

      const text = await response.text();
      const historyMetric = jsonLtoJson(text);
      setHistoryMetric(historyMetric);
    };
    historyData();
  }, [newPath]);

  if (!historyMetric) return null;

  const modelsName = historyMetric
    .filter((metric) => metric.experiment === jsonSubexperiment.name)
    .map((metric) => metric.model);
  const uniqueModelsName = modelsName.filter(
    (model, index) => modelsName.indexOf(model) === index
  );

  const metricData = uniqueModelsName.map((model) => {
    const metricModel = historyMetric.filter(
      (metric) =>
        metric.model === model &&
        metric.experiment === jsonSubexperiment.name &&
        metric.val_accuracy !== undefined
    );
    const modelDate = metricModel.map((metric) => metric.date);
    const valAccuracy = metricModel.map((metric) => metric.val_accuracy);

    return {
      model,
      date: modelDate,
      val: valAccuracy,
    };
  });

  // Zuordnung jedes Modells zu einer einzelnen Farbe.
  const colorPalette = {};

  for (let i = 0; i < metricData.length; i++) {
    const modell = metricData[i].model;
    colorPalette[modell] = `hsl(${(i * 40) % 360}, 60%, 60%)`;
  }

  const data = metricData.map((metricModel) => ({
    x: metricModel.date,
    y: metricModel.val,

    mode: "markers+text",
    type: "scatter",
    marker: { color: colorPalette[metricModel.model] },

    name: `${metricModel.model} `,
  }));
  const layout = {
    title: `Validation Accuracy of Each Model in ${jsonSubexperiment.name} `,
    font: { color: theme.palette.primary.font },
    xaxis: { title: "Date" },
    yaxis: { title: "Validation Accuracy" },
    autosize: true,
    responsive: true,
    width: "100%",
    height: "100%",
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: { l: 50, r: 230, b: 50, t: 50 },
  };

  return <Plot data={data} layout={layout} />;
};

export default ValAccuracyOverwiev;
