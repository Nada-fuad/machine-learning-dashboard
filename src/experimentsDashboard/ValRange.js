import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import jsonLtoJson from "../JsonLToJson";

const ValRange = ({ path, theme }) => {
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

  if (!historyMetric || !newPath) return null;

  // Namen der Experimente aus historyMetric zu extrahieren und
  // Falls die Namen der experimentName mehrfach vorkommen, filtere sie auf nur einen.

  const experimentName = historyMetric.map((metric) => metric.experiment);

  const uniqueExperiment = experimentName.filter(
    (name, index) => experimentName.indexOf(name) === index
  );
  // Zuordnung jedes Experiments zu einer einzelnen Farbe.
  const colorPalette = {};

  for (let i = 0; i < uniqueExperiment.length; i++) {
    const experiment = uniqueExperiment[i];
    colorPalette[experiment] = `hsl(${(i * 40) % 360}, 60%, 60%)`;
  }

  // Experimente mit den val_accuracy und dem letzten Datum extrahieren,
  //  um die Range der val_accuracy zu berechnen.
  const experimentHistory = uniqueExperiment.sort().map((experiment) => {
    const dates = [];
    const valAccuracy = [];
    historyMetric.forEach((metric) => {
      if (metric.date !== undefined && metric.experiment === experiment) {
        dates.push(metric.date);
      }
      if (
        metric.test_accuracy !== undefined &&
        metric.experiment === experiment
      ) {
        valAccuracy.push(metric.test_accuracy);
      }
    });
    const lastDate = dates.slice(-1);
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
      name: experiment,
      dates: lastDate,
      valAccuracy: rangeValAccuracy,
    };
  });
  // Informationen auf der x- und y-Achse sortieren, um sie darzustellen.

  const data = experimentHistory.map((a) => ({
    x: a.dates,
    y: a.valAccuracy,
    type: "scatter",
    mode: "lines+markers",

    marker: { color: colorPalette[a.name] },
    name: a.name,
  }));
  // das Aussehen und die Darstellung des Diagramms zu konfigurieren.

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

  const config = { responsive: true };

  return <Plot data={data} layout={layout} config={config} />;
};

export default ValRange;
