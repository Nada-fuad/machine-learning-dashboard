import { Box } from "@mui/material";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import { useEffect, useState } from "react";

function App() {
  const [expermintData, setExpermintData] = useState();
  console.log("🚀 ~ App ~ expermintData:", expermintData);

  const getExpermintData = () => {
    fetch("/machine-learning-dashboard/dashboard.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log("🚀 ~ response:", response);
        return response.json();
      })
      .then(function (data) {
        console.log("🚀 ~ data:", data);
        setExpermintData(data);
      });
  };
  useEffect(() => {
    getExpermintData();
  }, []);
  return (
    <>
      <Navbar />
      <Box display="flex" flexDirection="column">
        <Content expermintData={expermintData} />
        ok
      </Box>
    </>
  );
}

export default App;
