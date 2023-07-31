import dayjs from "dayjs";

const format = "YYYY-MM-DD";

function fillZero(n: number) {
    if (n < 10) {
        return `0${n}`
    } else {
        return `${n}`
    }
}

function formatDate(target: string){
    if(!target) return "";
    const date = new Date(target);
    const year = date.getFullYear();
    const month = fillZero(date.getMonth() + 1);
    const day = fillZero(date.getDate());
    return dayjs(`${year}-${month}-${day}`,format);
}

export function formatData(data: any){
    const record = data[0];
    record.bookingDate = formatDate(record.bookingDate);
    record.departureDate = formatDate(record.departureDate);
    record.cyCut = formatDate(record.cyCut);
    record.fileCut = formatDate(record.fileCut);
    record.openDay = formatDate(record.openDay);
    record.arrivalDate = formatDate(record.arrivalDate);
    record.issuedAt = formatDate(record.issuedAt);
    return record;
}