import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import jsonLtoJson from "../JsonLToJson";

const LossLearningCurve = ({ path, theme }) => {
  const [learnCurve, setLearnCurve] = useState(null);

  const newPath = `/machine-learning-dashboard${path}metrics.jsonl`;

  useEffect(() => {
    const learnCurveData = async () => {
      const response = await fetch(newPath);
      const text = await response.text();
      const learnCurve = jsonLtoJson(text);
      setLearnCurve(learnCurve);
    };

    learnCurveData();
  }, [newPath]);

  if (!learnCurve || !newPath || !path) return null;

  const trainLoss = [];
  const valLoss = [];
  const trainEpochs = [];
  const valEpochs = [];
  learnCurve.forEach((metric) => {
    if (metric.train_loss !== undefined) {
      trainLoss.push(metric.train_loss);
    }
    if (metric.val_loss !== undefined) {
      valLoss.push(metric.val_loss);
    }

    if (metric.epoch !== undefined && metric.val_loss !== undefined) {
      valEpochs.push(metric.epoch);
    }

    if (metric.epoch !== undefined && metric.train_loss !== undefined) {
      trainEpochs.push(metric.epoch);
    }
  });

  function graduallyStd(metric) {
    const gradually = [];

    for (let i = 0; i < metric.length; i++) {
      const a = Math.max(0, i - 2);
      const b = Math.min(i + 1, metric.length);
      const graduallyMetric = metric.slice(a, b);
      const mean =
        graduallyMetric.reduce((acc, curr) => acc + curr, 0) /
        graduallyMetric.length;
      const graduallyDiff = graduallyMetric.map((m) => (m - mean) ** 2);
      const variance =
        graduallyDiff.reduce((acc, curr) => acc + curr, 0) /
        graduallyMetric.length;
      const n = Math.sqrt(variance);
      gradually.push(n);
    }
    return gradually;
  }
  const trainGraduallyStd = graduallyStd(trainLoss);
  const valGraduallyStd = graduallyStd(valLoss);

  const shadedAreaMaxTrain = trainLoss.map(
    (metric, i) => metric + trainGraduallyStd[i]
  );
  const shadedAreaMinTrain = trainLoss.map(
    (metric, i) => metric - trainGraduallyStd[i]
  );

  const shadedAreaMaxVal = valLoss.map(
    (metric, i) => metric + valGraduallyStd[i]
  );
  const shadedAreaMinVal = valLoss.map(
    (metric, i) => metric - valGraduallyStd[i]
  );

  const xTrainArea = trainEpochs.concat(trainEpochs.slice().reverse());
  const yTrainArea = shadedAreaMaxTrain.concat(
    shadedAreaMinTrain.slice().reverse()
  );
  const xValArea = valEpochs.concat(valEpochs.slice().reverse());
  const yValArea = shadedAreaMaxVal.concat(shadedAreaMinVal.slice().reverse());

  const data = [
    {
      x: trainEpochs,
      y: trainLoss,
      type: "scatter",
      mode: "lines+markers",
      name: "TrainLoss",
      line: { color: theme.palette.primary.learnLine1 },
      marker: { color: theme.palette.primary.learnLine1 },
    },
    {
      x: valEpochs,
      y: valLoss,
      type: "scatter",
      mode: "lines+markers",
      name: "ValLoss",
      line: { color: theme.palette.primary.learnLine },
      marker: { color: theme.palette.primary.learnLine },
    },
  ];

  const trainArea = [
    {
      x: xTrainArea,
      y: yTrainArea,
      fill: "toself",
      fillcolor: theme.palette.primary.shadedLearnLine1,
      line: { color: "rgba(0, 0, 0, 0)" },
      name: "Train",
      marker: {
        size: 800,
      },
    },
  ];
  const valArea = [
    {
      x: xValArea,
      y: yValArea,
      fill: "toself",
      fillcolor: theme.palette.primary.shadedLearnLine,
      line: { color: "rgba(0, 0, 0, 0)" },
      name: "Val",
    },
  ];

  // Layout für die Plotly-Grafik
  const layout = {
    title: "Learning Curve: Training vs. Validation Loss",
    font: {
      color: theme.palette.primary.font,
      family: "Arial, sans-serif ",
      size: 16,
    },
    xaxis: { title: "Epoch" },
    yaxis: { title: "TrainLoss and ValLoss" },
    autosize: true,

    responsive: true,
    width: "100%",
    height: "100%",
    color: "#d1d3da",
    margin: {
      l: 70,
      r: 150,
      b: 40,
      t: 80,
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
  };
  const CurveData = [...data, ...trainArea, ...valArea];
  const config = { responsive: true };

  return <Plot data={CurveData} layout={layout} config={config} />;
};

export default LossLearningCurve;
