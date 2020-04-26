import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchForm = ({ searchValue = '', submit, placeholder = '' }) => {
  return (
    <Search
      placeholder={placeholder}
      className="search-input"
      defaultValue={searchValue}
      onSearch={value => submit(value)}
      style={{ width: '80%' }}
      enterButton
    />
  );
};

export default SearchForm;
