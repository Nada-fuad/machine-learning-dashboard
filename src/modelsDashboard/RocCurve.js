import Plot from "react-plotly.js";
import React, { useState, useEffect } from "react";

const RocCurve = ({ path, theme }) => {
  const [roc, setRoc] = useState(null);

  const newPath = `/machine-learning-dashboard${path}test_roc.json`;

  useEffect(() => {
    const rocData = async () => {
      const response = await fetch(newPath);
      const roc = await response.json();
      setRoc(roc);
    };
    rocData();
  }, [newPath]);
  if (!roc || !newPath) return null;

  const { categories, fpr, tpr } = roc;

  const data = [];

  for (let i = 0; i < categories.length; i++) {
    data.push({
      x: fpr[i],
      y: tpr[i],
      name: categories[i],
      type: "scatter",
      mode: "lines+markers",

      // marker: { color: theme.palette.primary.marker },
      // line: { color: theme.palette.primary.marker },
    });
  }

  const layout = {
    title: "Multiclass Receiver Operating Characteristic",
    font: {
      color: theme.palette.primary.font,
      family: "Arial, sans-serif ",
      size: 16,
    },
    xaxis: {
      title: "Recall",
    },
    yaxis: {
      title: "Precision",
    },
    autosize: true,
    responsive: true,
    width: "100%",
    height: "100%",

    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: {
      l: 60,
      r: 170,
      b: 50,
      t: 50,
    },
  };
  const config = { responsive: true };
  return <Plot data={data} layout={layout} config={config} />;
};

export default RocCurve;
