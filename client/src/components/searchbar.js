import React from "react";
import "./searchbar.css";
import Image from "next/image";
import { useEffect } from "react";
export const Searchbar = ({
  searchKey,
  setSearchKey,
  processedData,
  setTableData,
}) => {
  const searchInputHandler = (e) => {
    console.log(processedData);
    setSearchKey(() => {
      return e.target.value;
    });
  };

  const onClickHandler = () => {
    let resArr = [];
    processedData.forEach((data) => {
      const sentenceArray = data.content
        .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
        .split("\n");
      // Filter our array by checking if each sentence includes the word, then immedietly returns it
      let newSentenceArray = [];
      (newSentenceArray = sentenceArray.filter((sentence) =>
        sentence.toLowerCase().includes(searchKey.toLowerCase())
      )),
        newSentenceArray.forEach((item) => {
          let result = {
            filename: data.filename,
            content: item,
          };
          resArr.push(result);
        });
    });
    console.log(resArr);
    setTableData(() => {
      return resArr;
    });
  };

  return (
    <div className="searchBar">
      <input
        placeholder="search"
        className="searchInput"
        value={searchKey}
        onChange={searchInputHandler}
      ></input>
      <Image
        src="/search.png"
        width={50}
        height={50}
        alt="search icon"
        className="searchIcon"
        onClick={onClickHandler}
      />
    </div>
  );
};
