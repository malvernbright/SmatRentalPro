interface Props {
    rawDate: string,
}
export function getFormattedDate (rawDate:string) {
    const date = new Date(rawDate);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
    return formattedDate;
}