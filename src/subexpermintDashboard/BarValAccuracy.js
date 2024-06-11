import React, { useState, useEffect, useMemo } from "react";
import Plot from "react-plotly.js";
import textToJsonObject from "../JsonLToJson";

const BarValAccuracy = ({ path, jsonSubexperiment, theme }) => {
  const [metrics, setMetrics] = useState([]);
  const newPath = `/machine-learning-dashboard${path}history.jsonl`;

  useEffect(() => {
    const metricsData = async () => {
      const response = await fetch(newPath);
      const text = await response.text();
      const metrics = textToJsonObject(text);

      setMetrics(metrics);
    };
    metricsData();
  }, [newPath, jsonSubexperiment]);

  const modelData = useMemo(
    () =>
      metrics.filter(
        (metric) =>
          metric.experiment === jsonSubexperiment.name &&
          metric.val_accuracy !== undefined
      ),
    [metrics, jsonSubexperiment.name]
  );

  const sortedModelDate = useMemo(
    () => modelData.sort((a, b) => new Date(b.date) - new Date(a.date)),
    [modelData]
  );

  const uniqueModels = useMemo(
    () =>
      sortedModelDate.filter(
        (metric, index, self) =>
          index === self.findIndex((model) => model.model === metric.model)
      ),
    [sortedModelDate]
  );

  const plotData = uniqueModels.map((model) => ({
    x: [model.date],
    y: [model.val_accuracy],
    type: "bar",
    mode: "bar",
    name: model.model,
  }));

  const layout = {
    title: `Val Accuracy for Each Model`,
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
  if (!metrics || !newPath) return null;
  return <Plot data={plotData} layout={layout} />;
};

export default BarValAccuracy;
