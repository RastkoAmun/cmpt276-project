export const getDate = () => {
  let date = new Date();
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  date = date.toLocaleDateString('en-US', options);
  return date;
}

export const getCurrentDateInFormat = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
