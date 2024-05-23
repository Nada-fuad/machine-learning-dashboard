import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
const color = [
  [0, "#00b5ff"],
  [0.5, "#191D87"],
  [1, "#0500ff"],
];
const ConfusionMatrix = ({ path, theme }) => {
  const [confusion, setConfusion] = useState(null);

  const newPath = `/machine-learning-dashboard${path}test_confusion.json`;

  useEffect(() => {
    const confusionData = async () => {
      const response = await fetch(newPath);
      const confusion = await response.json();
      setConfusion(confusion);
    };
    confusionData();
  }, [newPath]);

  if (!confusion || !newPath) return null;

  const { data, categories } = confusion;

  const tickvalIndexes = [];
  for (let i = 0; i < data.length; i++) {
    tickvalIndexes.push(i);
  }

  const layout = {
    title: " Confusion Matrix",
    font: { color: theme.palette.primary.font },
    xaxis: {
      title: "Predicted",
      font: { color: theme.palette.primary.font },
      tickvals: tickvalIndexes,
      ticktext: categories,
      tickfont: { color: theme.palette.primary.font },
    },
    yaxis: {
      title: "Actual",
      font: { color: theme.palette.primary.font },
      tickvals: tickvalIndexes,
      ticktext: categories,
      tickfont: { color: theme.palette.primary.font },
    },
    autosize: true,

    color: theme.palette.primary.font,
    margin: {
      l: 50,
      r: 180,
      b: 50,
      t: 50,
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
