import { User, UserCredentials } from "@/types/user";

export const users: (User & { password: string })[] = [
  {
    id: 1,
    fullName: "Иванов Петр Алексеевич",
    role: { label: "Складовщик", value: "storekeeper" },
    login: "storekeeper",
    password: "123",
    items: [
      {
        id: 1,
        title: "Создать акт приема",
        icon: "/icons/create-act.svg",
        link: "/create_acceptance_act",
      },
      {
        id: 2,
        title: "Отчет по актам приема",
        icon: "/icons/acts-report.svg",
        link: "/acceptance_acts_report",
      },
      {
        id: 3,
        title: "Создать акт отгрузки",
        icon: "/icons/create-shipping.svg",
        link: "/create_shipment_act",
      },
      {
        id: 4,
        title: "Отчет по актам отгрузки",
        icon: "/icons/shipping-report.svg",
        link: "/shipment_acts_report",
      },
    ],
  },
  {
    id: 3,
    fullName: "Конова Инна Аслановна",
    role: { label: "Менеджер по ценам", value: "priceManager" },
    login: "price_manager",
    password: "123",
    items: [
      {
        id: 1,
        title: "Ведение цен приема",
        icon: "/icons/create-act.svg",
        link: "/acceptance_price_management",
      },
      {
        id: 2,
        title: "Отчет по изменению цены",
        icon: "/icons/acts-report.svg",
        link: "/price_change_report",
      },
    ],
  },
  {
    id: 4,
    fullName: "Никулин Тимур Олегович",
    role: { label: "Сортировщик", value: "sorter" },
    login: "sorter",
    password: "123",
    items: [
      {
        id: 1,
        title: "Сортировка номенклатуры",
        icon: "/icons/create-act.svg",
        link: "/sorting_nomenclatures",
      },
    ],
  },
  {
    id: 5,
    fullName: "Золотой Арсен Носович",
    role: { label: "Менеджер по отгрузкам", value: "shipmentManager" },
    login: "shipmentManager",
    password: "123",
    items: [
      {
        id: 1,
        title: "Отчет по актам отгрузки",
        icon: "/icons/create-act.svg",
        link: "/shipment_acts_report",
      },
    ],
  },
  {
    id: 6,
    fullName: "Кадыкоев Вальфрам Правович",
    role: { label: "Менеджер по расходам", value: "expensesManager" },
    login: "expenses_manager",
    password: "123",
    items: [
      {
        id: 1,
        title: "Внести расходы",
        icon: "/icons/create-act.svg",
        link: "/add_expenses",
      },
    ],
  },
  {
    id: 7,
    fullName: "Сонов Сон Сонович",
    role: { label: "Менеджер по расчетным счетам", value: "accountManager" },
    login: "accountManager",
    password: "123",
    items: [
      {
        id: 1,
        title: "Внести деньги на РС",
        icon: "/icons/create-act.svg",
        link: "/deposit_money_on_rs",
      },
      {
        id: 1,
        title: "Перевести деньги между РС",
        icon: "/icons/create-act.svg",
        link: "/transfer_money_between_rs",
      },
    ],
  },
  {
    id: 8,
    fullName: "Бабкин Рубль Еврович",
    role: { label: "Кассир", value: "cashier" },
    login: "cashier",
    password: "123",
    items: [
      {
        id: 1,
        title: "Внести деньги на кассира",
        icon: "/icons/create-act.svg",
        link: "/deposit_money_on_cashier",
      },
      {
        id: 1,
        title: "Перевести деньги между кассирами",
        icon: "/icons/create-act.svg",
        link: "/transfer_money_between_cashiers",
      },
    ],
  },
];

export const authenticateUser = (
  credentials: UserCredentials
): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(
        (u) =>
          u.login === credentials.login && u.password === credentials.password
      );

      if (user) {
        const { ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};
