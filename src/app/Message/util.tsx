const getDateTime = (timeStamp: string) => {
    let date = new Date(parseInt(timeStamp))

    return (date.getMonth()+1 < 10 ? '0' +
    (date.getMonth()+1) : date.getMonth()+1) + '-' +
    (date.getDate() < 10 ? '0' + date.getDate():date.getDate()) + ' ' +
    date.getHours() + ':' +
    date.getMinutes()
}

export default getDateTime;
