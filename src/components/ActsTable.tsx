"use client";

import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import Image from "next/image";
const ActsTable = () => {
  const [items, setItems] = useState([
    { id: 1, material: "Медь", weight: 150, checked: false },
    { id: 2, material: "Аллюминий", weight: 300, checked: false },
    { id: 3, material: "", weight: 0, checked: false },
    { id: 4, material: "", weight: 0, checked: false },
    { id: 5, material: "", weight: 0, checked: false },
  ]);

  const totalWeight = items.reduce(
    (total, item) => (item.checked ? total + item.weight : total),
    0
  );

  const toggleCheck = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="w-full gap-10 flex flex-col">
      <div className="flex justify-between mb-2">
        <Button className="bg-dark text-white text-lg">
          + Добавить позицию
        </Button>
        <Button className="bg-dark text-white text-lg">
          <Image src={"/icons/reset.svg"} alt="Logo" width={20} height={10} />
          Очистить форму
        </Button>
      </div>
      <table className="w-full text-dark text-lg">
        <thead>
          <tr className="bg-light">
            <th className="p-2 rounded-l-lg text-end">№</th>
            <th className="p-2 text-center">Материал</th>
            <th className="p-2 px-4 rounded-r-lg text-end">Вес брутто (кг)</th>
          </tr>
          <tr className="h-8">
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2 flex items-center justify-between">
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={() => toggleCheck(item.id)}
                  className="!bg-light !border-light !text-dark"
                />
                {item.id}
              </td>
              <td className="p-2 text-center">{item.material}</td>
              <td className="p-2 px-4 bg-light text-end">
                {item.weight.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="h-8">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="bg-light">
            <td className="p-2 px-4 rounded-l-lg text-start" colSpan={2}>
              ИТОГО:
            </td>
            <td className="p-2 px-4 rounded-r-lg text-end">
              {totalWeight.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ActsTable;
