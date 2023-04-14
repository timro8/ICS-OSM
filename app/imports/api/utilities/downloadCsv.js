function jsonToCsv(jsonData) {
  const headers = Object.keys(jsonData[0]);
  let csvString = '';

  // Add header row to CSV string
  csvString += `${headers.join(',')} \n`;

  // Loop through each object and add its values to the CSV string
  jsonData.forEach(obj => {
    const values = headers.map(header => obj[header]);
    csvString += `${values.join(',')} \n`;
  });

  return csvString;
}

export const downloadCsv = (collection) => {
  const csv = jsonToCsv(collection.dumpAll().contents);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${collection.getCollectionName()}.csv`;
  link.href = url;
  link.click();
};
