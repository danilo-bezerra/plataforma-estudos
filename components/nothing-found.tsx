import React, { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

export default function NothingFound({ title, description, children }: Props) {
  return (
    <div className="mx-auto flex max-w-xl w-full flex-col items-center rounded-md border-4 bg-white px-6 py-6 text-center  border-purple-500/50 shadow-md space-y-4 dark:bg-neutral-800">
      <h2 className="text-neutral-600 dark:text-neutral-100">
        {title ? title : "Nada foi encontrado!"}
      </h2>
      <p className="text-gray-500 dark:text-neutral-300 text-sm">
        {description
          ? description
          : "Não encontramos nada correspondente ao que você procura."}
      </p>
      {children}
    </div>
  );
}
