export const getCurSystemTime = () => {
    const date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth()+1)+""
    if (month.length==1) {
        month = "0"+month
    }
    let day = date.getDate()+""
    if (day.length == 1) {
        day = "0"+day
    }
    return year+month+day
}