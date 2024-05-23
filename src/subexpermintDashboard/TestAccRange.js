import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import textToJsonObject from "../ToJsonData";

const TestRange = ({ path, theme }) => {
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

  const color = [
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

  const experimentName = historyMetric.map((metric) => metric.experiment);

  const uniqueExperiment = experimentName.filter(
    (name, index) => experimentName.indexOf(name) === index
  );

  const expermintData = uniqueExperiment.map((expermint, index) => ({
    myExperiment: expermint,
    myModel: model,
    color: color[Math.floor(Math.random() * color.length)],
  }));
  console.log("🚀 ~ expermintData ~ expermintData:", expermintData);

  const experimentHistory = expermintData.map((experiment, model) => {
    const dates = [];
    const testAccuracy = [];
    historyMetric.forEach((metric) => {
      if (
        metric.date !== undefined &&
        metric.experiment === experiment.myExperiment &&
        metric.model === model.myModel
      ) {
        dates.push(metric.date);
      }
      if (
        metric.test_accuracy !== undefined &&
        metric.experiment === experiment.myExperiment &&
        metric.model === model.myModel
      ) {
        testAccuracy.push(metric.test_accuracy);
      }
    });
    const oneDate = dates.slice(0, 1);

    const min = testAccuracy.reduce(
      (acc, val) => Math.min(acc, val),
      testAccuracy[0]
    );
    const max = testAccuracy.reduce(
      (acc, val) => Math.max(acc, val),
      testAccuracy[0]
    );

    const rangeValue = max - min;

    const rangeTestAccuracy = [];

    for (let i = 0; i < testAccuracy.length; i++) {
      rangeTestAccuracy.push(rangeValue);
    }
    return {
      name: experiment.myExperiment,
      dates: oneDate,
      testAccuracy: rangeTestAccuracy,
      color: experiment.color,
    };
  });
  console.log("🚀 ~ experimentHistory ~ experimentHistory:", experimentHistory);
  console.log("🚀 ~ experimentHistory ~ experimentHistory:", experimentHistory);
  const layout = {
    title: "Range Test Accuracy ",
    font: { color: theme.palette.primary.font },
    xaxis: { title: "Date" },
    yaxis: { title: "Test Accuracy Range" },
    width: "100%",
    height: "100%",
    responsive: true,
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: { l: 60, r: 300, b: 50, t: 70 },
  };

  const data = experimentHistory.map((a) => ({
    x: a.dates,
    y: a.testAccuracy,
    type: "scatter",
    mode: "lines+markers",
    marker: { color: a.color },
    name: a.name,
  }));
  return <Plot data={data} layout={layout} />;
};

export default TestRange;
