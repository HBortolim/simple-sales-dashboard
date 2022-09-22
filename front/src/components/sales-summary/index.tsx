import React, { useEffect, useMemo, useState } from "react";
import { FilterData, SalesSummaryData } from "../../types";
import { formatPrice } from "../../utils/formatters";
import { buildFilterParams, makeRequest } from "../../utils/requests";
import "./styles.css";
type Props = {
  filterData?: FilterData;
};

const initialSummary = {
  sum: 0,
  min: 0,
  max: 0,
  avg: 0,
  count: 0,
};

export default function SalesSummary({ filterData }: Props) {
  const [totalSales, setTotalSales] =
    useState<SalesSummaryData>(initialSummary);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesSummaryData>("/sales/summary", { params })
      .then((response) => {
        setTotalSales(response.data);
      });
  }, [params]);

  return (
    <div className="sales-summary-text">
      <h3>{formatPrice(totalSales.sum)}</h3>
      <p>Total de vendas</p>
    </div>
  );
}
