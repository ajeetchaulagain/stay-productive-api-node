const pickObjectProperty = (sourceObject, properties) => {
  const resultObject = {};

  if (!sourceObject) {
    throw new Error('Source object should be truthy');
  }
  if (typeof sourceObject !== 'object') {
    throw new Error('Source Object should be a object');
  }
  if (Array.isArray(sourceObject)) {
    throw new Error('Source object should not be array');
  }
  if (Object.keys(sourceObject).length === 0) {
    throw new Error('Source object should not be empty');
  }
  if (!properties) {
    throw new Error('properties array should be truthy');
  }
  if (!Array.isArray(properties)) {
    throw new Error('properties should be a array');
  }
  if (properties.length === 0) {
    throw new Error('properties array should be non empty');
  }
  properties.forEach((element) => {
    resultObject[element] = sourceObject[element];
  });

  return resultObject;
};

export default pickObjectProperty;
