"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "./DatePickerRange";

// Типы для новой структуры данных API
interface IconData {
  url: string;
  width: number;
  height: number;
}

interface FormFieldBase {
  label: string;
  icon_data: IconData;
}

interface TextFormField extends FormFieldBase {
  value: string | null;
}

interface UserFormField extends FormFieldBase {
  user_full_name: string;
}

interface DateRangeFormField extends FormFieldBase {
  from: string | null;
  to: string | null;
}

interface FormAction {
  type: string;
  label: string;
  icon: IconData;
  options_url?: string;
}

interface ReportFormContent {
  title: string;
  form: {
    created_by: UserFormField;
    date_range: DateRangeFormField;
    act_number: TextFormField;
    contractor: TextFormField;
    status: TextFormField;
  };
  actions: FormAction[];
}

interface ReportFormBuilderProps {
  formData: ReportFormContent;
  onSubmit: (filters: Record<string, string>) => void;
  onReturn: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const ReportFormBuilder = ({
  formData,
  onSubmit,
  onReturn,
}: ReportFormBuilderProps) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleFilterChange = (
    fieldKey: string,
    label: string,
    value: string
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));

    if (errors[fieldKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const requiredFields = ["act_number", "contractor", "status"];

    // Проверяем только обязательные поля
    requiredFields.forEach((fieldKey) => {
      const field = formData.form[fieldKey as keyof typeof formData.form];
      if (!filterValues[fieldKey] || filterValues[fieldKey].trim() === "") {
        newErrors[fieldKey] = "Обязательное поле";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Отправка формы со следующими данными:", filterValues);
      onSubmit(filterValues);
    } else {
      console.log("Форма содержит ошибки:", errors);
    }
  };

  // Находим кнопки действий
  const returnAction = formData.actions.find(
    (action) => action.type === "return"
  );
  const submitAction = formData.actions.find(
    (action) => action.type === "zoom-in"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10 w-1/2">
        {/* Поле Created By */}
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-2">
            <Image
              src={"/icons/user.svg"}
              alt={formData.form.created_by.label}
              width={formData.form.created_by.icon_data.width}
              height={formData.form.created_by.icon_data.height}
              className="object-contain"
            />
            <p>{formData.form.created_by.label}</p>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              type="text"
              value={formData.form.created_by.user_full_name}
              disabled
              className="flex-1 bg-[#E4E2E2]"
            />
          </div>
        </div>

        {/* Поле Date Range */}
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-2">
            <Image
              src={"/icons/calendary.svg"}
              alt={formData.form.date_range.label}
              width={formData.form.date_range.icon_data.width}
              height={formData.form.date_range.icon_data.height}
              className="object-contain"
            />
            <p>{formData.form.date_range.label}</p>
          </div>
          <div className="flex flex-col gap-1 relative">
            <DatePickerWithRange
              onDateChange={(value) =>
                handleFilterChange(
                  "date_range",
                  formData.form.date_range.label,
                  value
                )
              }
              value={
                filterValues["date_range"] ||
                (formData.form.date_range.from && formData.form.date_range.to
                  ? `${formData.form.date_range.from} - ${formData.form.date_range.to}`
                  : "")
              }
              error={errors["date_range"]}
            />
          </div>
        </div>

        {/* Текстовые поля */}
        {Object.entries(formData.form)
          .filter(([key]) =>
            ["act_number", "contractor", "status"].includes(key)
          )
          .map(([key, field]) => (
            <div key={key} className="grid grid-cols-2">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/create-act.svg"}
                  alt={(field as TextFormField).label}
                  width={(field as TextFormField).icon_data.width}
                  height={(field as TextFormField).icon_data.height}
                  className="object-contain"
                />
                <p>{(field as TextFormField).label}</p>
              </div>
              <div className="flex flex-col gap-1 relative">
                <Input
                  type="text"
                  placeholder={(field as TextFormField).label}
                  value={filterValues[key] || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      key,
                      (field as TextFormField).label,
                      e.target.value
                    )
                  }
                  className={cn(
                    "flex-1 bg-[#E4E2E2] hover:bg-accent",
                    errors[key] && "border-red-500"
                  )}
                />
                {errors[key] && (
                  <span className="text-red-500 text-sm absolute -bottom-5">
                    {errors[key]}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-between">
        {returnAction && (
          <Button
            type="button"
            onClick={onReturn}
            className="flex items-center gap-2"
          >
            {/* <Image
              src={"/icons/return.svg"}
              alt={returnAction.label}
              width={returnAction.icon.width}
              height={returnAction.icon.height}
              className="object-contain"
            /> */}
            {returnAction.label}
          </Button>
        )}

        <div className="flex-1"></div>

        {submitAction && (
          <Button
            type="submit"
            className="flex items-center gap-2 bg-[#4094F7] text-white"
          >
            <Image
              src={"/icons/search.svg"}
              alt={submitAction.label}
              width={submitAction.icon.width}
              height={submitAction.icon.height}
              className="object-contain"
            />
            {submitAction.label}
          </Button>
        )}
      </div>
    </form>
  );
};

export default ReportFormBuilder;
