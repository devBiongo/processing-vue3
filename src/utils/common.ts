export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



export function formatDatePicker(date: string){
    return date;
}

export const dateFormat = {
    common: "YYYY-MM-DD",
    showTime: "YYYY-MM-DD HH:mm:SS",
}