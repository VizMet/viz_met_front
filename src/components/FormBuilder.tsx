"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormData, FormFilter } from "@/mocks/forms";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "./DatePickerRange";

interface FormBuilderProps {
  formData: FormData;
  onSubmit: (filters: Record<string, string>) => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const FormBuilder = ({ formData, onSubmit }: FormBuilderProps) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleFilterChange = (filter: FormFilter, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [filter.label]: value,
    }));
    if (errors[filter.label]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[filter.label];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    formData.filters.forEach((filter) => {
      if (
        !filterValues[filter.label] ||
        filterValues[filter.label].trim() === ""
      ) {
        newErrors[filter.label] = "Обязательное поле";
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

  return (
    <form onSubmit={handleSubmit} className="space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10 w-1/2">
        {formData.filters.map((filter, index) => (
          <div
            key={index}
            className={cn(
              "grid grid-cols-2",
              !filter.is_active && "opacity-50 pointer-events-none"
            )}
          >
            <div className="flex items-center gap-2">
              <Image
                src={filter.icon_url}
                alt={filter.label}
                width={15}
                height={15}
                className="object-contain"
              />
              <p>{filter.label}</p>
            </div>

            <div className="flex flex-col gap-1 relative">
              {filter.type === "date" ? (
                <DatePickerWithRange
                  onDateChange={(value) => handleFilterChange(filter, value)}
                  value={filterValues[filter.label]}
                  error={errors[filter.label]}
                />
              ) : (
                <Input
                  type="text"
                  placeholder={filter.label}
                  value={filterValues[filter.label] || ""}
                  onChange={(e) => handleFilterChange(filter, e.target.value)}
                  disabled={!filter.is_active}
                  className={cn(
                    "flex-1 bg-[#E4E2E2] hover:bg-accent",
                    errors[filter.label] && "border-red-500"
                  )}
                />
              )}
              {errors[filter.label] && (
                <span className="text-red-500 text-sm absolute -bottom-5">
                  {errors[filter.label]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        {formData.actions.map((action, index) => (
          <Button
            key={index}
            type="submit"
            disabled={!action.is_active}
            title={action.tooltip}
            style={
              action.style
                ? {
                    color: action.style.color,
                    backgroundColor: action.style.background_color,
                    fontSize: action.style.fontSize,
                    fontStyle: action.style.fontStyle,
                    fontWeight: action.style.fontWeight,
                  }
                : undefined
            }
            className="flex items-center gap-2"
          >
            <Image
              src={action.icon_url}
              alt={action.name}
              width={20}
              height={20}
              className="object-contain"
            />
            {action.name}
          </Button>
        ))}
      </div>
    </form>
  );
};

export default FormBuilder;
