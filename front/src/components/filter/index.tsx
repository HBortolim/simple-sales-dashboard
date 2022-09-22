import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { FilterData, Store } from "../../types";
import { makeRequest } from "../../utils/requests";
import "./styles.css";

type Props = {
  onFilterChange: (filterData: FilterData) => void;
};

export default function Filter({ onFilterChange }: Props) {
  const [store, setStore] = useState<Store[]>([]);
  const { handleSubmit, setValue, getValues, control } = useForm<FilterData>();

  const handleChangeStore = (value: Store) => {
    setValue("store", value);
    const obj: FilterData = {
      store: getValues("store"),
    };
    onFilterChange(obj);
  };

  const onSubmit = (formData: FilterData) => {
    onFilterChange(formData);
  };

  useEffect(() => {
    makeRequest
      .get<Store[]>("/stores")
      .then((response) => {
        setStore(response.data);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }, []);

  return (
    <div className="filter-container base-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="store"
          control={control}
          render={({ field }) => (
            <Select
              options={store}
              placeholder="Loja"
              classNamePrefix="store-filter-select"
              isClearable
              getOptionLabel={(store: Store) => store.name}
              getOptionValue={(store: Store) => String(store.id)}
              onChange={(value) => handleChangeStore(value as Store)}
            />
          )}
        />
      </form>
    </div>
  );
}
