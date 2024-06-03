import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import textToJsonObject from "../ToJsonData";

const ValAccRange = ({ path, jsonSubexperiment, theme }) => {
  const [historyMetric, setHistoryMetric] = useState(null);

  const newPath = `/machine-learning-dashboard${path}history.jsonl`;

  useEffect(() => {
    const historyData = async () => {
      const response = await fetch(newPath);

      const text = await response.text();
      const historyMetric = textToJsonObject(text);
      setHistoryMetric(historyMetric);
    };
    historyData();
  }, [newPath]);

  if (!historyMetric || !newPath) return null;

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
    const min = valAccuracy.reduce(
      (acc, val) => Math.min(acc, val),
      valAccuracy[0]
    );
    const max = valAccuracy.reduce(
      (acc, val) => Math.max(acc, val),
      valAccuracy[0]
    );
    const date = modelDate[0];
    const rangeValue = max - min;

    const rangeValAccuracy = [];

    for (let i = 0; i < valAccuracy.length; i++) {
      rangeValAccuracy.push(rangeValue);
    }
    const range = metricModel.map((metric, i) => rangeValAccuracy[i]);
    console.log(range);
    return {
      model,
      date: date,
      val: range,
    };
  });

  const data = metricData.map((metricModel, i) => ({
    x: metricModel.date,
    y: metricModel.val,

    mode: "markers+text",
    type: "scatter",

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
    margin: { l: 60, r: 300, b: 50, t: 70 },
  };

  return <Plot data={data} layout={layout} />;
};

export default ValAccRange;
