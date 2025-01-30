export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }
    return date.toLocaleDateString("en-GB", options)
}