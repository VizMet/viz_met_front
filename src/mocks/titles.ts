export enum TitleLinks {
  create_acceptance_act = "Акт приема",
  create_shipment_act = "Акт отгрузки",

  acceptance_price_management = "Ведение цен приема",

  price_change_report = "Отчет по изменению цены",
  shipment_acts_report = "Отчет по актам отгрузки",
  acceptance_acts_report = "Отчет по актам приема",
  acceptance_acts_report_reason = "Причина отклонения",

  sorting_nomenclatures = "Сортировка номенклатуры",

  add_expenses = "Внести расходы",
  deposit_money_on_rs = "Внести деньги на РС",
  transfer_money_between_rs = "Перевести деньги между РС",
  deposit_money_on_cashier = "Внести деньги на кассира",
  transfer_money_between_cashiers = "Перевести деньги между кассирами",
}

export const specialHeaderStyles: Record<string, string> = {
  acceptance_acts_report_reason: "bg-[#FFC9CA] text-[#9C1111] font-bold",
};
