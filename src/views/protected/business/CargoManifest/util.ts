import dayjs from "dayjs";

const format = "YYYY-MM-DD";

function fillZero(n: number) {
  if (n < 10) {
    return `0${n}`;
  } else {
    return `${n}`;
  }
}

function formatDate(target: string) {
  if (!target) return "";
  const date = new Date(target);
  const year = date.getFullYear();
  const month = fillZero(date.getMonth() + 1);
  const day = fillZero(date.getDate());
  return dayjs(`${year}-${month}-${day}`, format);
}

export function formatData(data: any) {
  const record = data.cargoEntity;
  record.bookingDate = formatDate(record.bookingDate);
  record.departureDate = formatDate(record.departureDate);
  record.cyCut = formatDate(record.cyCut);
  record.fileCut = formatDate(record.fileCut);
  record.openDay = formatDate(record.openDay);
  record.arrivalDate = formatDate(record.arrivalDate);
  record.issuedAt = formatDate(record.issuedAt);
  return record;
}

export const useAssignment = (dataSource: any) => ({
  columns: [
    { label: "会社", dataIndex: "companyName" },
    { label: "担当者", dataIndex: "contactPerson" },
    { label: "連絡Tel", dataIndex: "telNum" },
    { label: "日時", dataIndex: "date" },
    { label: "住所", dataIndex: "address", span: 2 },
    { label: "備考", dataIndex: "note", span: 3 },
  ],
  dataSource:
    dataSource &&
    dataSource.map((item: any) => ({
      companyName: item.companyName,
      contactPerson: item.contactPerson,
      telNum: item.telNum,
      date: item.date,
      address: item.address,
      note: item.note,
    })),
});

export const useContainer = (dataSource: any) => ({
  columns: [
    { label: "発地", dataIndex: "departure" },
    { label: "経由地", dataIndex: "transit" },
    { label: "着地", dataIndex: "arrival" },
    { label: "日時", dataIndex: "date" },
    { label: "VAN No", dataIndex: "vanNo" },
    { label: "シール No", dataIndex: "sheetNo" },
    { label: "サイズ", dataIndex: "size" },
    { label: "FREE TIME(Dev)", dataIndex: "freeTime" },
    { label: "T/W", dataIndex: "tw" },
    { label: "免税運賃(JPY)", dataIndex: "dutyFreeFare" },
    { label: "課税運賃(JPY)", dataIndex: "taxableFare" },
    { label: "通行料(JPY)", dataIndex: "toll" },
    { label: "売上金額(JPY)", dataIndex: "salesAmount" },
    { label: "備考", dataIndex: "note", span: 3 },
  ],
  dataSource:
    dataSource &&
    dataSource.map((item: any) => ({
      departure: item.departure,
      transit: item.transit,
      arrival: item.arrival,
      date: item.date,
      vanNo: item.vanNo,
      sheetNo: item.sheetNo,
      size: item.size,
      freeTime: item.freeTime,
      tw: item.tw,
      dutyFreeFare: item.dutyFreeFare,
      taxableFare: item.taxableFare,
      toll: item.toll,
      uriagekinngaku: item.uriagekinngaku,
      note: item.note,
    })),
});

export const useConsign = (dataSource: any) => ({
  columns: [
    { label: "会社", dataIndex: "companyName" },
    { label: "備考", dataIndex: "note", span: 3 },
  ],
  dataSource:
    dataSource &&
    dataSource.map((item: any) => ({
      companyName: item.companyName,
      note: item.note,
    })),
});

export const useNotify = (dataSource: any) => ({
  columns: [
    { label: "会社", dataIndex: "companyName" },
    { label: "備考", dataIndex: "note", span: 3 },
  ],
  dataSource:
    dataSource &&
    dataSource.map((item: any) => ({
      companyName: item.companyName,
      note: item.note,
    })),
});
