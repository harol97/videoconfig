const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

const clearObjectKeepFields = (obj, keepFields) => 
{
  const newObj = {};
  for (const key of keepFields) {
    if (key in obj) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

export {
  fileToBase64,
  clearObjectKeepFields
}


