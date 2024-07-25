import Plot from "react-plotly.js";
import React, { useState, useEffect } from "react";

const RecallCurve = ({ path, theme }) => {
  const [curve, setCurve] = useState();

  const newPath = `/machine-learning-dashboard${path}test_pr_curve.json`;

  useEffect(() => {
    const curveData = async () => {
      const response = await fetch(newPath);
      const curve = await response.json();
      setCurve(curve);
    };
    curveData();
  }, [newPath]);
  if (!curve || !newPath) return null;
  //Daten aus dem Pfad der Curve extrahieren

  const { categories, precision, recall } = curve;
  //extrahierte Daten werden mit der push-Methode hinzugefügt, je nach Index der Kategorie.

  const data = [];
  for (let i = 0; i < categories.length; i++) {
    data.push({
      x: recall[i],
      y: precision[i],
      name: categories[i],
      type: "scatter",
      mode: "lines+markers",
    });
  }

  const layout = {
    title: "MultiClass Precision Recall Curve",
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
      b: 60,
      t: 60,
    },
  };
  const config = { responsive: true };

  return <Plot data={data} layout={layout} config={config} />;
};

export default RecallCurve;
