import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import AddItems from './AddItems';
import ItemsDisplay from './ItemsDisplay';
//import styled from "styled-components";

/*
import Test from "./Class.js"
{showTest ? <Test destroy={setShowTest} /> : null}

*/

/*
const Title = styled.h1`
  color: ${(props) => (props.color) ? (props.color) : "black"};
`;
*/

/*
import { PropTypes } from "prop-types";
import Info from "./Info.js";
import { useState } from "react";
*/

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] })
  //const [showTest, setShowTest] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/items").then((response) => response.json()).then((data) => setData({ items: data }));
  }, []);

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const deleteItem = (item) => {
    const items = data["items"];

    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then((response) => {
      if (response.ok) {
        const idx = items.indexOf(item);
        items.splice(idx, 1);
        setData({ items: items });
      }
    });
  }


  const addItemToData = (item) => {
    let items = data["items"];
    //item.id = items.length;

    //storing the data in db
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:3000/items", requestOptions).then((response) => response.json()).then((data) => { items.push(data); setData({ items: items }); });

    //items.push(item);
    //setData({ items: items });
    //console.log(data);

  };

  const filterData = (data) => {
    const filteredData = [];

    if (!filters.name) {
      return data;
    }

    for (const item of data) {
      if (filters.name !== "" && item.name !== filters.name) {
        continue;
      }

      if (filters.price !== "" && item.price > filters.price) {
        continue;
      }
      if (filters.type !== "" && item.type !== filters.type) {
        continue;
      }
      if (filters.brand !== "" && item.brand !== filters.brand) {
        continue;
      }

      filteredData.push(item);

    }

    return filteredData;
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemsDisplay deleteItem={deleteItem} items={filterData(data["items"])} />
      </div>

      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>

      <div className="row mt-3">
        <AddItems addItem={addItemToData} />
      </div>

    </div>
  );
}

/*
function ButtonState() {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  const updateTitleClicked = () => {
    setTitle("NewTitle");
  }

  const updateCounterClicked = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <Data title={title} count={count} />
      <button onClick={updateTitleClicked}>Update Title</button>
      <button onClick={updateCounterClicked}>Update Counter</button>
    </div>
  );
}

function Data(props) {
  return (
    <div>
      <p>Title: {props.title}</p>
      <p>count: {props.count}</p>
    </div>
  )
}

/*

function Additem(props) {
  //const value = props.text;
  return (
    <div>
      <form>
        <label for="text-form">Type somethhing:</label>
        <input type="text" value={props.text} id="text-form" />
        <p>{props.number}</p>
      </form>
    </div>
  )
}

Additem.defaultProps = {
  number: 69,
  text: "default",
};

Additem.propTypes = {
  number: PropTypes.number,
  text: PropTypes.string,
}

*/

export default App;
