import React, { useEffect, useState } from "react";
import CardList from "../components/CardList";
import { exploreList } from "../constants/MockupData";
import "../styles/Explore.css";
import Header from "../components/Header";
import Search from "../components/Search";
import { Grid } from "@material-ui/core";
import MyButton from "../components/base/MyButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { FaFilter } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    background: "white",
    borderRadius: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MyCollections = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    level: "",
    sellType: "",
  });
  const [isFilter, setFilter] = useState(false);
  const [list, setList] = useState(exploreList);
  const [keyword, setKeyword] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleClickFilter = () => {
    setFilter(!isFilter);
  };

  useEffect(() => {
      let tmpList = [...exploreList];
      tmpList = tmpList.filter((item) => {
        return  keyword != '' ? 
                    item.name.includes(keyword) || item.level.includes(keyword) ||
                    item.price.includes(keyword) || item.owner.includes(keyword) ||
                    item.vote.includes(keyword) || item.sellType.includes(keyword)
                : item;
      });
    if (state.level == '' && state.sellType == '') {

    } else {
        if (state.level != "" && state.sellType != "") {
            tmpList = tmpList.filter((item) => {
                return (
                  item.level == state.level && item.sellType == state.sellType
                );
            });
        } else {
            if (state.level.length != 0) {
                tmpList = tmpList.filter((item) => {
                    return item.level == state.level;
                });
            }

            if (state.sellType.length != 0) {
                tmpList = tmpList.filter((item) => {
                    return item.sellType == state.sellType;
                });
            }
        }
    }
    setList(tmpList);

  }, [state, keyword]);

  const handleClickSearch = (val) => {
    setKeyword(val);
  }

  useEffect(() => {
    
  });

  return (
    <div id="explore">
      <Header />

      <Grid container direction="row-reverse" style={{ marginTop: 100 }}>
        <Grid item style={{ marginRight: 20 }}>
          {!isFilter ? (
            <MyButton
              name={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaFilter style={{ marginRight: 5 }} />
                  Filters
                </span>
              }
              color="1"
              onClick={handleClickFilter}
            />
          ) : (
            <MyButton
              name={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaFilter style={{ marginRight: 5 }} />
                  Filters
                </span>
              }
              bgColor="#00C9FF"
              onClick={handleClickFilter}
            />
          )}
        </Grid>
      </Grid>
      {isFilter ? (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-level-native-simple">
                Level
              </InputLabel>
              <Select
                native
                value={state.level}
                onChange={handleChange}
                inputProps={{
                  name: "level",
                  id: "filled-level-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value="starter">Starter</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Search handleClickSearch={handleClickSearch}/>
          </Grid>
          <Grid item>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-sell-type-native-simple">
                Sell Type
              </InputLabel>
              <Select
                native
                value={state.sellType}
                onChange={handleChange}
                inputProps={{
                  name: "sellType",
                  id: "filled-sell-type-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value="sold">Sold</option>
                <option value="not_sale">Not Sale</option>
                <option value="listed">Listed</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      <div id="list-container">
        <CardList list={list} />
      </div>
    </div>
  );
};

export default MyCollections;
