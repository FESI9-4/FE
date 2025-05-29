export default function dateConverter(
    timestamp: number,
    type: 'korea' | 'utc' | 'korea-short'
) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (type === 'korea') {
        return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
    }
    if (type === 'utc') {
        return `${year}.${month}.${day}. `;
    }
    if (type === 'korea-short') {
        return `${month}월 ${day}일 ${hour}:${minute}`;
    }
}
