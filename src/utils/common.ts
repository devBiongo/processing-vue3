export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const formatDatePicker = (date: any) => {
    if(!date) return "";
    const year = date.$y;
    const month = fillZero(date.$M + 1);
    const day = fillZero(date.$D);
    return `${year}-${month}-${day}`;
}

export const formatDateToPicker = (date: Date) => {
    const year = date.getFullYear();
    const month = fillZero(date.getMonth() + 1);
    const day = fillZero(date.getDate());
    return `${year}-${month}-${day}`;
}

function fillZero(n: number) {
    if (n < 10) {
        return `0${n}`
    } else {
        return `${n}`
    }
}

export const dateFormat = {
    common: "YYYY-MM-DD",
    showTime: "YYYY-MM-DD HH:mm:SS",
}