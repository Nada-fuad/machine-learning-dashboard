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

  // Experimente mit den test_accuracy und dem letzten Datum extrahieren,
  //  um die Range der test_accuracy zu berechnen.

  const experimentHistory = uniqueExperiment.sort().map((experiment) => {
    const dates = [];
    const testAccuracy = [];
    historyMetric.forEach((metric) => {
      if (metric.date !== undefined && metric.experiment === experiment) {
        dates.push(metric.date);
      }
      if (
        metric.test_accuracy !== undefined &&
        metric.experiment === experiment
      ) {
        testAccuracy.push(metric.test_accuracy);
      }
    });
    const lastDate = dates.slice(-1);
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
      name: experiment,
      dates: lastDate,
      testAccuracy: rangeTestAccuracy,
    };
  });
  // Informationen auf der x- und y-Achse sortieren, um sie darzustellen.

  const data = experimentHistory.map((a) => ({
    x: a.dates,
    y: a.testAccuracy,
    type: "scatter",
    mode: "lines+markers",
    marker: { color: colorPalette[a.name] },
    name: a.name,
  }));

  // das Aussehen und die Darstellung des Diagramms zu konfigurieren.

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
  return <Plot data={data} layout={layout} config={config} />;
};

export default TestRange;
