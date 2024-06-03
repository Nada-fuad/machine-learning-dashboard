import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import textToJsonObject from "../ToJsonData";

const AccuracyLearningCurve = ({ path, theme }) => {
  const [learnCurve, setLearnCurve] = useState(null);

  const newPath = `/machine-learning-dashboard${path}metrics.jsonl`;

  useEffect(() => {
    const learnCurveData = async () => {
      const response = await fetch(newPath);
      const text = await response.text();
      const learnCurve = textToJsonObject(text);
      setLearnCurve(learnCurve);
    };

    learnCurveData();
  }, [newPath]);
  if (!learnCurve || !newPath || !path) return null;

  const trainAccuracy = [];
  const valAccuracy = [];
  const trainEpochs = [];
  const valEpochs = [];
  learnCurve.forEach((metric) => {
    if (metric.train_accuracy !== undefined) {
      trainAccuracy.push(metric.train_accuracy);
    }
    if (metric.val_accuracy !== undefined) {
      valAccuracy.push(metric.val_accuracy);
    }

    if (
      metric.epoch !== undefined &&
      metric.val_accuracy !== undefined &&
      valEpochs.indexOf(metric.epoch) === -1
    ) {
      valEpochs.push(metric.epoch);
    }

    if (
      metric.epoch !== undefined &&
      metric.train_accuracy !== undefined &&
      trainEpochs.indexOf(metric.epoch) === -1
    ) {
      trainEpochs.push(metric.epoch);
    }
  });

  function graduallyStandardDeviation(metric) {
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

  const trainGraduallyStandardDeviation =
    graduallyStandardDeviation(trainAccuracy);
  const valGraduallyStandardDeviation = graduallyStandardDeviation(valAccuracy);

  const shadedAreaMaxTrain = trainAccuracy.map(
    (metric, i) => metric + trainGraduallyStandardDeviation[i]
  );
  const shadedAreaMinTrain = trainAccuracy.map(
    (metric, i) => metric - trainGraduallyStandardDeviation[i]
  );

  const shadedAreaMaxVal = valAccuracy.map(
    (metric, i) => metric + valGraduallyStandardDeviation[i]
  );
  const shadedAreaMinVal = valAccuracy.map(
    (metric, i) => metric - valGraduallyStandardDeviation[i]
  );

  const data = [
    {
      x: trainEpochs,
      y: trainAccuracy,
      type: "scatter",
      mode: "lines+markers",
      name: "TrainAcc",
    },
    {
      x: valEpochs,
      y: valAccuracy,
      type: "scatter",
      mode: "lines+markers",
      name: "ValAcc",
    },
  ];

  // const trainEpochsSlice = trainEpochs.slice();
  // for (let i = trainEpochs.length - 1; i >= 0; i--) {
  //   trainEpochsSlice.push(trainEpochs[i]);
  // }
  // const shadedAreaMaxTrainSlice = shadedAreaMaxTrain.slice();
  // for (let i = shadedAreaMinTrain.length - 1; i >= 0; i--) {
  //   shadedAreaMaxTrainSlice.push(shadedAreaMinTrain[i]);
  // }

  const trainArea = [
    {
      x: trainEpochs.concat(trainEpochs.slice().reverse()),
      y: shadedAreaMaxTrain.concat(shadedAreaMinTrain.slice().reverse()),
      fill: "toself",
      fillcolor: "rgba(0, 0, 255, 0.2)",
      line: { color: "rgba(0, 0, 0, 0)" },
      name: "Train",
      marker: {
        size: 800,
      },
    },
  ];

  // const valEpochsSlice = valEpochs.slice();
  // for (let i = valEpochs.length - 1; i >= 0; i--) {
  //   valEpochsSlice.push(valEpochs[i]);
  // }

  // const shadedAreaMaxValSlice = shadedAreaMaxVal.slice();
  // for (let i = 0; (i = shadedAreaMinVal.length - 1); i--) {
  //   shadedAreaMaxValSlice.push(shadedAreaMinVal[i]);
  // }

  const valArea = [
    {
      x: valEpochs.concat(valEpochs.slice().reverse()),
      y: shadedAreaMaxVal.concat(shadedAreaMinVal.slice().reverse()),
      fill: "toself",
      fillcolor: "rgba(255, 200, 0, 0.2)",
      line: { color: "rgba(0, 0, 0, 0)" },
      name: "Val",
    },
  ];

  const layout = {
    title: "Learning Curve:Training vs. Validation Accuracy",
    textposition: "top center",

    font: {
      color: theme.palette.primary.font,
      family: "Arial, sans-serif ",
      size: 16,
    },
    xaxis: { title: "Epoch" },
    yaxis: { title: "TrainAcc and ValAcc" },
    width: "100%",
    height: "100%",
    autosize: true,
    color: theme.palette.primary.font,
    margin: {
      l: 70,
      r: 230,
      b: 40,
      t: 80,
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
  };
  const curveData = [...data, ...trainArea, ...valArea];
  const config = { responsive: true };

  return <Plot data={curveData} layout={layout} config={config} />;
};

export default AccuracyLearningCurve;
