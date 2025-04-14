export interface FormFilter {
  label: string;
  icon_url: string;
  type: "text" | "date";
  value: string;
  is_active: boolean;
}

export interface FormAction {
  name: string;
  icon_url: string;
  style: {
    color: string;
    background_color: string;
    fontSize?: string;
    fontStyle?: string;
    fontWeight?: string;
  } | null;
  is_active: boolean;
  tooltip: string;
}

export interface FormData {
  id: string;
  filters: FormFilter[];
  actions: FormAction[];
}

export interface FormsResponse {
  forms: FormData[];
}

export const formsData: FormsResponse = {
  forms: [
    {
      id: "act_receipt_report",
      filters: [
        {
          label: "Создал",
          icon_url: "/icons/user.svg",
          type: "text",
          value: "",
          is_active: true,
        },
        {
          label: "Дата ввода",
          icon_url: "/icons/calendary.svg",
          type: "date",
          value: "",
          is_active: true,
        },
        {
          label: "Номер акта",
          icon_url: "/icons/create-act.svg",
          type: "text",
          value: "",
          is_active: true,
        },
        {
          label: "Контрагент",
          icon_url: "/icons/profile.svg",
          type: "text",
          value: "",
          is_active: true,
        },
        {
          label: "Статус",
          icon_url: "/icons/shipping-report.svg",
          type: "text",
          value: "",
          is_active: true,
        },
      ],
      actions: [
        {
          name: "Запустить отчет",
          icon_url: "/icons/search.svg",
          style: {
            color: "#FFFFFF",
            background_color: "#4094F7",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
          },
          is_active: true,
          tooltip: "Запустить отчет по выбранным параметрам",
        },
      ],
    },
  ],
};
