export const calculateDays = (dateInput: Date | string | number): number => {
  // 1. Convert input to a Date object.
  // This handles Date objects, strings, and timestamps gracefully.
  const pastDate = new Date(dateInput);
  const currentDate = new Date();

  // 2. Normalize to midnight (00:00:00) to ensure the comparison is based on full days.
  // We use Math.floor() for the past date to make sure we don't count a partial day unless it's a full 24 hours.
  pastDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // 3. Calculate the difference in milliseconds.
  // Note: currentDate.getTime() will always be greater than or equal to pastDate.getTime()
  // if the pastDate is in the past or today.
  const timeDifferenceMs = currentDate.getTime() - pastDate.getTime();

  // Define milliseconds in one day
  const msPerDay = 1000 * 60 * 60 * 24;

  // 4. Convert the difference from milliseconds to days.
  // Math.floor ensures we only count full 24-hour periods that have passed.
  const daysDifference = Math.floor(timeDifferenceMs / msPerDay);
  
  // Return the difference, ensuring it is not negative (in case the date is in the future)
  return Math.max(0, daysDifference);
};