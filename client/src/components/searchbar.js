import React from "react";
import "./searchbar.css";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

//toggle switch using meterial ui
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
export const Searchbar = ({
  searchKey,
  setSearchKey,
  processedData,
  setTableData,
  paraToggle,
  setParatoggle,
  noty_handleClick,
  setisLoading,
  isLoading,
}) => {
  const searchInputHandler = (e) => {
    setSearchKey(() => {
      return e.target.value;
    });
  };

  const setSentenceArray = (data) => {
    let sentenceArray = [];
    if (paraToggle == true) {
      sentenceArray = data.content
        .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
        .split("|");
    } else {
      sentenceArray = data.content
        .replace(/([.?!])\s*(?=[A-Z])/g, "\n")
        .split("\n");
    }
    return sentenceArray;
  };

  const onClickHandler = async () => {
    if (searchKey != "") {
      setisLoading(true);
      let resArr = [];
      await processedData.forEach((data) => {
        let sentenceArray = setSentenceArray(data);
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
      setTableData(() => {
        return resArr;
      });

      if (resArr.length == 0) {
        noty_handleClick("No matching stremline found");
      }
      setisLoading(false);
    } else if (searchKey == "" && processedData.length == 0) {
      noty_handleClick("please upload a file & enter search string");
    } else {
      noty_handleClick("enter search string");
    }
  };

  return (
    <div className="searchBar">
      <input
        placeholder="search"
        className="searchInput"
        value={searchKey}
        onChange={searchInputHandler}
      ></input>
      <FormControlLabel
        className="tg_btn"
        control={
          <IOSSwitch
            sx={{ m: 2, ml: 3 }}
            onClick={() => {
              setParatoggle(!paraToggle);
            }}
          />
        }
        label="paragraph"
      />
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
