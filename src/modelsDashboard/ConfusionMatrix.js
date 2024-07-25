import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const ConfusionMatrix = ({ path, theme }) => {
  const [confusionMetric, setConfusionMetric] = useState(null);

  const newPath = `/machine-learning-dashboard${path}test_confusion.json`;

  useEffect(() => {
    const confusionData = async () => {
      const response = await fetch(newPath);
      const confusionMetric = await response.json();
      setConfusionMetric(confusionMetric);
    };
    confusionData();
  }, [newPath]);

  if (!confusionMetric || !newPath) return null;
  const color = [
    [0, theme.palette.primary.confusion0],
    [0.5, theme.palette.primary.confusion1],
    [1, theme.palette.primary.confusion2],
  ];

  //Daten aus dem Pfad der Confusion Matrix extrahieren
  const { data, categories } = confusionMetric;

  //Für jede Kategorie gibt es ein Data. Hier wird der Index des Data so festgelegt,
  // dass er dem Index der entsprechenden Kategorie entspricht.
  const tickvalIndexes = [];
  for (let i = 0; i < data.length; i++) {
    tickvalIndexes.push(i);
  }

  const layout = {
    title: " Confusion Matrix",
    font: { color: theme.palette.primary.font },
    xaxis: {
      title: "Predicted",
      tickvals: tickvalIndexes,
      ticktext: categories,
    },
    yaxis: {
      title: "Actual",
      tickvals: tickvalIndexes,
      ticktext: categories,
    },
    autosize: true,
    color: theme.palette.primary.font,
    margin: {
      l: 80,
      r: 120,
      b: 60,
      t: 40,
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
  };

  const ConfusionData = [
    {
      z: data,
      type: "heatmap",
      colorscale: color,
    },
  ];

  return (
    <div>
      <Plot
        data={ConfusionData}
        layout={layout}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default ConfusionMatrix;
