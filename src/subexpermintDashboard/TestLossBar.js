import React, { useState, useEffect, useMemo } from "react";
import Plot from "react-plotly.js";
import textToJsonObject from "../JsonLToJson";

const TestLossBar = ({ path, jsonSubexperiment, theme }) => {
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
  }, [newPath, jsonSubexperiment.name]);

  const modelData = useMemo(
    () =>
      metrics.filter(
        (metric) =>
          metric.experiment === jsonSubexperiment.name &&
          metric.test_loss !== undefined
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
    y: [model.test_loss],
    type: "bar",
    mode: "bar",
    name: model.model,
  }));

  const layout = {
    title: `Test Loss for Each Model`,
    font: { color: theme.palette.primary.font },
    xaxis: { title: "Date" },
    yaxis: { title: "Test Loss" },

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

export default TestLossBar;
