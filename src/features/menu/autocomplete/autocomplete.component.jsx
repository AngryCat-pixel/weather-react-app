import { Autocomplete as AutocompleteMaterial, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { weatherAPI } from "../../weather/weatherAPI";

const Autocomplete = () => {
  const { t } = useTranslation(["weather", "profile", "errors"]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const {
    data: autocomplete,
    isLoading,
    error,
  } = weatherAPI.useFetchSearchQuery(debouncedSearchValue, {
    skip: debouncedSearchValue === "",
  });
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  const onChangeQuery = (event, value) => {
    setSearchValue(value);
  };

  const selectHandler = (event, value) => {
    const newValue = value ? value.name : "";
    setSearchValue(newValue);
    if (newValue.length > 3) {
      navigate(`/weather?cityName=${value.name}`);
    }
  };
  return (
    <AutocompleteMaterial
      freeSolo
      value={searchValue}
      onChange={selectHandler}
      onInputChange={onChangeQuery}
      filterOptions={(x) => {
        if (x.length === 0) {
          return [{ id: "1", name: t("noOptions", { ns: "weather" }) }];
        }
        return x;
      }}
      getOptionDisabled={(option) => option.id === "1"}
      selectOnFocus
      clearOnBlur
      noOptionsText={t("noOptions", { ns: "weather" })}
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      loading={isLoading}
      options={autocomplete || []}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={t("searchInput")} />
      )}
    />
  );
};

export default Autocomplete;
