import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import jsonLtoJson from "../JsonLToJson";

const TestOverview = ({ path, theme }) => {
  const [metrics, setMetrics] = useState(null);

  const newPath = `/machine-learning-dashboard${path}history.jsonl`;

  useEffect(() => {
    const historyData = async () => {
      const response = await fetch(newPath);

      const text = await response.text();
      const metrics = jsonLtoJson(text);
      setMetrics(metrics);
    };
    historyData();
  }, [newPath]);

  if (!metrics || !newPath) return null;

  // Namen der Experimente aus metrics zu extrahieren und
  // Falls die Namen der experimentName mehrfach vorkommen, filtere sie auf nur einen.
  const experimentName = metrics.map((metric) => metric.experiment);

  const uniqueExperiment = experimentName.filter(
    (name, index) => experimentName.indexOf(name) === index
  );

  // Zuordnung jedes Experiments zu einer einzelnen Farbe.
  const colorPalette = {};

  for (let i = 0; i < uniqueExperiment.length; i++) {
    const experiment = uniqueExperiment[i];
    colorPalette[experiment] = `hsl(${(i * 40) % 360}, 60%, 60%)`;
  }
  // Experimente mit ihren Modellen sowie den test_accuracy und Datumsdaten extrahieren.

  const neueMetricsData = metrics.reduce((acc, current) => {
    const { experiment, test_accuracy, model, date } = current;

    if (!test_accuracy) {
      return acc;
    }
    const metric = acc.find(
      (metric) => metric.experiment === experiment && metric.model === model
    );
    if (metric) {
      metric.data.push({ date, test_accuracy });
    } else {
      acc.push({
        experiment,
        model,
        data: [{ date, test_accuracy }],
      });
    }

    return acc;
  }, []);

  // Experimente sortieren.
  const sortierteMetricsData = neueMetricsData.sort((a, b) => {
    if (a.experiment < b.experiment) return -1;
    if (a.experiment > b.experiment) return 1;
    return 0;
  });

  // Informationen auf der x- und y-Achse sortieren, um sie darzustellen.

  const plotData = sortierteMetricsData.map((expermint) => ({
    mode: "markers+text",
    type: "scatter",
    x: expermint.data.map((metric) => metric.date),
    y: expermint.data.map((metric) => metric.test_accuracy),
    marker: { color: colorPalette[expermint.experiment] },
    name: `${expermint.model} (${expermint.experiment})`,
  }));
  // das Aussehen und die Darstellung des Diagramms zu konfigurieren.
  const layout = {
    title: "Test Accuracy of Each Model in Experiment by Date",
    font: { color: theme.palette.primary.font },
    xaxis: { title: "Date" },
    yaxis: { title: "Test Accuracy" },

    width: "100%",
    height: "100%",
    responsive: true,
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: { l: 60, r: 350, b: 60, t: 60 },
  };
  const config = { responsive: true };

  return <Plot data={plotData} layout={layout} config={config} />;
};

export default TestOverview;
