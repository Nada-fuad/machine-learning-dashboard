export const textToJsonObject = (textContent) => {
  const jsonObjects = textContent
    .split("\n")
    .map((line) => {
      if (line.trim() === "") {
        return null;
      }

      const parsedJSON = JSON.parse(line);
      return parsedJSON;
    })
    .filter((obj) => {
      if (!obj) {
        return null;
      }
      for (const i in obj) {
        if (typeof obj[i] === "number" && isNaN(obj[i])) {
          return false;
        }
      }
      return true;
    });

  return jsonObjects;
};

export default textToJsonObject;
