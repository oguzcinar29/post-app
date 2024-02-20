import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([{}]);
  const [food, setFood] = useState([{}]);
  const [whichCategoryClicked, setWhichCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [isExitClicked, setExitClicked] = useState(false);
  const [isPassSame, setPassSame] = useState();
  const [cartArr, setCartArr] = useState([
    {
      id: 15,
      name: "Big Mac",
      url: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
      price: 61,
      count: 1,
    },
  ]);

  const [backendCart, setBackendCart] = useState([{}]);
  const [isItLogin, setIsItLogin] = useState();
  const [customers, setCustomers] = useState();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    fetch("/api/get-categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/get-products")
      .then((response) => response.json())
      .then((data) => {
        setFood(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("/api/get-single-category")
      .then((response) => response.json())
      .then((data) => {
        setWhichCategory(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/get-all-carts")
      .then((response) => response.json())
      .then((data) => {
        setBackendCart(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/false-or-true")
      .then((response) => response.json())
      .then((data) => {
        setExitClicked(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/get-pass-control")
      .then((response) => response.json())
      .then((data) => {
        setPassSame(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/get-isItLogin-value")
      .then((response) => response.json())
      .then((data) => {
        setIsItLogin(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/get-customer-info")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/get-username")
      .then((response) => response.json())
      .then((data) => {
        setUserName(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/exit-clicked")
      .then((response) => response.json())
      .then((data) => {
        setUserName(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(customers);
  function getTotal() {
    let total = 0;
    backendCart.map((item) => {
      total += item.count * item.price;
    });

    return total;
  }

  let total = getTotal();
  function handleClick(id, name, url, price) {
    const findItem = cartArr.find((item) => item.id === id);
    const item = {
      id: id,
      name: name,
      url: url,
      price: price,
      count: 1,
    };

    if (typeof findItem === "undefined") {
      setCartArr([...cartArr, item]);
    } else {
      findItem.count += 1;
      setCartArr([...cartArr]);
    }
  }
  const AllContext = {
    categories,
    searchText,
    isItLogin,
    setIsItLogin,
    userName,
    setSearchText,
    whichCategoryClicked,
    setWhichCategory,
    setCategories,
    total,
    customers,
    setCustomers,
    food,
    setFood,
    cartArr,
    setCartArr,
    handleClick,
    backendCart,
    setBackendCart,
    isExitClicked,
    setExitClicked,
    isPassSame,
    setPassSame,
  };
  return (
    <DataContext.Provider value={AllContext}>{children}</DataContext.Provider>
  );
};
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
