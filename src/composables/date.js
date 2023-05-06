 function toLocalDate(utcTimeString) {
    if(utcTimeString===null||utcTimeString===undefined) return '-'
    const utcDate = new Date(utcTimeString)
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'};
    return utcDate.toLocaleString('en-UK',options)
  } 

  function isoToDate(isoDate) {
    if(isoDate==null) return null
    const now = new Date(isoDate);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const monthString = month < 10 ? '0' + month : month.toString();
    const dayString = day < 10 ? '0' + day : day.toString();
    return `${year}-${monthString}-${dayString}`;
  }

  function isoToTime(isoDate) {
    if(isoDate==null) return null
      const now = new Date(isoDate);
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    
  }

  const toDate = (date, time) => {
    if(date==null) return null
    if(time==null) time = '00:00:00'
    const stringDate = `${date} ${time}`
    const dateObj = new Date(stringDate)
    return dateObj.toISOString()
}
  export {toLocalDate, isoToDate, isoToTime, toDate}

