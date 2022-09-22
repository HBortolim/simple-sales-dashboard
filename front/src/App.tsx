import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Filter from "./components/filter";
import Navbar from "./components/navbar";
import SalesByGenderChart from "./components/sales-by-gender";
import { buildSalesByGenderChart } from "./components/sales-by-gender/helpers";
import SalesSummary from "./components/sales-summary";
import { FilterData, PieChartConfig, SalesByGenderData } from "./types";
import { buildFilterParams, makeRequest } from "./utils/requests";

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

  const handleFilterChange = (filterData: FilterData) => {
    console.log(filterData);
    setFilterData(filterData);
  };

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByGenderData[]>("/sales/by-gender", { params })
      .then((response) => {
        console.log(response.data);
        const newSalesByGender = buildSalesByGenderChart(response.data);
        setSalesByGender(newSalesByGender);
      });
  }, [params]);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Filter onFilterChange={handleFilterChange} />
        <div className="sales-container base-card">
          <SalesSummary filterData={filterData} />
          <SalesByGenderChart
            labels={salesByGender?.labels}
            series={salesByGender?.series}
          />
        </div>
      </div>
    </>
  );
}

export default App;
