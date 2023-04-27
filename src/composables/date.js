 function toLocalDate(utcTimeString) {
    if(utcTimeString===null||utcTimeString===undefined) return '-'
    const dateArr = utcTimeString.split(' ')
    const dateISOFormat = dateArr[0]+'T'+dateArr[1]+'.000Z'
    const utcDate = new Date(dateISOFormat)
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'};
    return utcDate.toLocaleString('en-US', options)
  }
  export {toLocalDate}