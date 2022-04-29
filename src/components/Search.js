import React, { useState } from "react";
import TextInput from "./base/TextInput";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ handleClickSearch }) => {
  const [keyword, setKeyword] = useState('');
  const OnSearch = () => {
    handleClickSearch(keyword);
  };

  const handleChangeInput = (val) => {
    setKeyword(val);
  }
  return (
    <TextInput
      placeholder="Explore NFTs"
      icon={<AiOutlineSearch size="30" color="rgba(48,118,234,1)" onClick={OnSearch}/>}
      handleChangeSearch={handleChangeInput}
    />
  );
};

export default Search;
