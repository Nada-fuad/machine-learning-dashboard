import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import jsonLtoJson from "../JsonLToJson";

const TestRange = ({ path, theme }) => {
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
  const color = [
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

  if (!historyMetric || !newPath) return null;

  const experimentName = historyMetric.map((metric) => metric.experiment);

  const uniqueExperiment = experimentName.filter(
    (name, index) => experimentName.indexOf(name) === index
  );

  const expermintData = uniqueExperiment.map((expermint) => ({
    myExperiment: expermint,
    color: color[Math.floor(Math.random() * color.length)],
  }));
  console.log("🚀 ~ expermintData ~ expermintData:", expermintData);

  const experimentHistory = expermintData.map((experiment) => {
    const dates = [];
    const testAccuracy = [];
    historyMetric.forEach((metric) => {
      if (
        metric.date !== undefined &&
        metric.experiment === experiment.myExperiment
      ) {
        dates.push(metric.date);
      }
      if (
        metric.test_accuracy !== undefined &&
        metric.experiment === experiment.myExperiment
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
    console.log("🚀 ~ experimentHistory ~ rangeValue:", rangeValue);

    const rangeTestAccuracy = [];
    console.log(
      "🚀 ~ experimentHistory ~ rangeTestAccuracy:",
      rangeTestAccuracy
    );

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
    margin: { l: 100, r: 200, b: 60, t: 60 },
  };
  const config = { responsive: true };
  const data = experimentHistory.map((a) => ({
    x: a.dates,
    y: a.testAccuracy,
    type: "scatter",
    mode: "lines+markers",
    marker: { color: a.color },
    name: a.name,
  }));
  return <Plot data={data} layout={layout} config={config} />;
};

export default TestRange;
