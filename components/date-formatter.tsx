"use client";

import React from "react";

type Props = { date: Date };

export default function DateFormatter({ date }: Props) {
  const formattedDateTime = date.toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return <span className="text-sm">{formattedDateTime}</span>;
}
