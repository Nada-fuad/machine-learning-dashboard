import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import textToJsonObject from "../JsonLToJson";

const ValRange = ({ path, theme }) => {
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

  const experimentName = historyMetric.map((metric) => metric.experiment);

  const uniqueExperiment = experimentName.filter(
    (name, index) => experimentName.indexOf(name) === index
  );

  const expermintData = uniqueExperiment.map((expermint, index) => ({
    myExperiment: expermint,
    color: color[Math.floor(Math.random() * color.length)],
  }));

  const experimentHistory = expermintData.map((experiment) => {
    const dates = [];
    const valAccuracy = [];
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
        valAccuracy.push(metric.test_accuracy);
      }
    });
    const oneDate = dates.slice(0, 1);

    const min = valAccuracy.reduce(
      (acc, val) => Math.min(acc, val),
      valAccuracy[0]
    );
    const max = valAccuracy.reduce(
      (acc, val) => Math.max(acc, val),
      valAccuracy[0]
    );

    const rangeValue = max - min;

    const rangeValAccuracy = [];

    for (let i = 0; i < valAccuracy.length; i++) {
      rangeValAccuracy.push(rangeValue);
    }
    return {
      name: experiment.myExperiment,
      dates: oneDate,
      testAccuracy: rangeValAccuracy,
      color: experiment.color,
    };
  });
  const layout = {
    title: "Range Val Accuracy ",
    font: { color: theme.palette.primary.font },
    xaxis: { title: "Date" },
    yaxis: { title: "Val Accuracy Range" },
    width: "100%",
    height: "100%",
    responsive: true,
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: { l: 100, r: 200, b: 60, t: 60 },
  };

  const data = experimentHistory.map((a) => ({
    x: a.dates,
    y: a.testAccuracy,
    type: "scatter",
    mode: "lines+markers",
    marker: { color: a.color },
    name: a.name,
  }));
  const config = { responsive: true };

  return <Plot data={data} layout={layout} config={config} />;
};

export default ValRange;
