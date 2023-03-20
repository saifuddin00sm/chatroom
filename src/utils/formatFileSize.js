function formatFileSize(fileSize) {
  let size;
  let fileSizeKB = fileSize / 1024; // convert to KB
  let fileSizeMB = fileSizeKB / 1024; // convert to MB

  if (fileSizeMB >= 1) {
    size = fileSizeMB.toFixed(2) + " MB"; // format to 2 decimal places and add "MB" suffix
  } else {
    size = fileSizeKB.toFixed(2) + " KB"; // format to 2 decimal places and add "KB" suffix
  }

  return size;
}

export default formatFileSize;
