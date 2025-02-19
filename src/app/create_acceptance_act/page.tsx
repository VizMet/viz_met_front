"use client";

import ActsTable from "@/components/ActsTable";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const AcceptanceActPage = () => {
  return (
    <Page>
      <PageHeader />
      <div className="grid grid-cols-3 grid-rows-2 text-dark">
        <div className="py-1 px-4">
          <div className="text-xl">Контрагент</div>
        </div>
        <div className="py-1 px-4">
          <div className="text-xl">Дата приема на склад</div>
        </div>
        <div className="py-1 px-4">
          <div className="text-xl">Номер акта приема</div>
        </div>

        <div className="bg-light py-1 px-4 rounded-tl-lg rounded-bl-lg">
          <div className="text-lg flex items-center gap-4">
            <Image src={"/icons/user.svg"} alt="Logo" width={16} height={16} />
            Иванов П.С.
          </div>
        </div>
        <div className="bg-light py-1 px-4">
          <div className="text-lg flex items-center gap-4">
            <Image
              src={"/icons/calendary.svg"}
              alt="Logo"
              width={15}
              height={15}
            />
            01.12.2025
          </div>
        </div>
        <div className="bg-light py-1 px-4 rounded-tr-lg rounded-br-lg">
          <div className="text-lg flex items-center gap-4">
            <Image src={"/icons/link.svg"} alt="Logo" width={20} height={10} />
            #ССЫЛКА!
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <ActsTable />
        <div className="flex gap-10">
          <Button className="bg-blue text-white text-lg">
            <Image src={"/icons/print.svg"} alt="Logo" width={20} height={10} />
            Предварительная печать
          </Button>
          <Button className="bg-blue text-white text-lg">
            <Image src={"/icons/up.svg"} alt="Logo" width={20} height={10} />
            Выполнить проводки, согласование и печатать
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default AcceptanceActPage;
