const sidebarData = {
  user_info: {
    name: "Иванов Петр Алексеевич",
    position: "Складовщик",
  },
  available_actions: [
    {
      name: "Создать акт приема",
      icon_url: "/icons/create-act.svg",
      style: null,
      is_active: true,
      tooltip: "Управление складскими операциями",
      link: "/create_acceptance_act",
    },
    {
      name: "Отчет по актам приема",
      icon_url: "/icons/acts-report.svg",
      style: null,
      is_active: true,
      tooltip: "Настройки пользователя и системы",
      link: "/acceptance_acts_report",
    },
  ],
};

export { sidebarData };
