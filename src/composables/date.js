 function toLocalDate(utcTimeString) {
    if(utcTimeString===null||utcTimeString===undefined) return '-'
    const utcDate = new Date(utcTimeString)
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'};
    return utcDate.toLocaleString('en-UK',options)
  }
  export {toLocalDate}