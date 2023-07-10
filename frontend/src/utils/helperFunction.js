const getDate = () => {
  let date = new Date();
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  date = date.toLocaleDateString('en-US', options);
  return date;
}

export default getDate();