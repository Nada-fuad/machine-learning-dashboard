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
    .filter((obj) => obj !== null);

  return jsonObjects;
};

export default textToJsonObject;
