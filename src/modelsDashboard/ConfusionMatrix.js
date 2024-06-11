import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

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
  const color = [
    [0, theme.palette.primary.confusion0],
    [0.5, theme.palette.primary.confusion1],
    [1, theme.palette.primary.confusion2],
  ];
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
  console.log("🚀 ~ ConfusionMatrix ~ layout:", layout);

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
