export interface Column {
  key: string;
  title: string;
  align?: "left" | "center" | "right";
}

export interface ReportRow {
  id: string;
  customer: string;
  contAgent: string;
  date: string;
  status: string;
  [key: string]: string;
}

export const columns: Column[] = [
  { key: "customer", title: "Создал" },
  { key: "date", title: "Дата" },
  { key: "contAgent", title: "Контрагент" },
  { key: "id", title: "№ Акта" },
  { key: "status", title: "Статус" },
];

export const mockData: ReportRow[] = [
  {
    id: "1",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "01.01.2024",
    status: "Принят",
  },
  {
    id: "2",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Не принят",
  },
  {
    id: "3",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Отклонен",
  },
  {
    id: "4",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Не принят",
  },
  {
    id: "5",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Принят",
  },
  {
    id: "6",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Не принят",
  },
  {
    id: "7",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Отклонен",
  },
  {
    id: "8",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Принят",
  },
  {
    id: "9",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Не принят",
  },
  {
    id: "10",
    customer: "Иванов П.С.",
    contAgent: "ООО 'Рога и копыта'",
    date: "02.01.2024",
    status: "Отклонен",
  },
];
