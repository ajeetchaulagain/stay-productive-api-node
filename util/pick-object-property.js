const pickObjectProperty = (sourceObject, properties) => {
  const resultObject = {};
  properties.forEach((element) => {
    resultObject[element] = sourceObject[element];
  });

  return resultObject;
};

export default pickObjectProperty;
