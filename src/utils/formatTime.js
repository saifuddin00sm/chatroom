function formatTime(time) {
  // Create a new Date object with the given date string
  const date = new Date(time);

  // Get the hours and minutes in 24-hour format
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Convert the hours to 12-hour format and add a leading zero if needed
  const hours12 = hours % 12 || 12;
  const hours12String = hours12 < 10 ? "0" + hours12 : hours12.toString();

  // Add a leading zero to the minutes if needed
  const minutesString = minutes < 10 ? "0" + minutes : minutes.toString();

  // Concatenate the hours and minutes with a colon separator
  const timeString = hours12String + ":" + minutesString;

  return timeString; // Output: "04:21"
}

export default formatTime;
