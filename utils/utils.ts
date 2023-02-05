export function addMenuChildItems(list, val, splitIndex) {
  const parentTag = val.parents.substring(0, splitIndex);
  const itemFound = list.find((item) => item.parents === parentTag);
  if (itemFound) {
    if (itemFound.hasOwnProperty("childItems")) {
      itemFound.childItems.push({ ...val });
    } else {
      itemFound.childItems = [{ ...val }];
    }
  }
}

export const menuItemsMapped = (menuItems: any[]) => {
  return menuItems
    .sort((a, b) => a.product_category_id - b.product_category_id)
    .reduce((acc, val) => {
      if (val.level !== 0) {
        if (val.level === 1) {
          acc.push({ ...val });
        } else if (val.level === 2) {
          addMenuChildItems(acc, val, 3);
        } else if (val.level === 3) {
          acc.forEach((mItem) => {
            if (mItem.childItems) addMenuChildItems(mItem.childItems, val, 5);
          });
        }
      }
      return acc;
    }, []);
};

export const filteredProductsCategorized = (products: any[]) => {
  return products?.reduce((acc, val) => {
    if (acc[val.type_of_test]) acc[val.type_of_test].push(val);
    else acc[val.type_of_test] = [val];
    return acc;
  }, {});
};

export const totalPrice = (array: any[]) =>
  array?.reduce((acc, val) => {
    acc += val.price;
    return acc;
  }, 0);

export const toObject = (arr) =>
  arr.reduce(function (acc, cur, i) {
    acc[cur] = cur;
    return acc;
  }, {});

export const numberOfDays = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
export const daysArray = Array.from(Array(numberOfDays).keys());

export const days = () => {
  let days = [];
  for (let i: number = 1; i <= 31; i++) {
    days.push(i);
  }
  return toObject(days);
};

export const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const weekDays = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];

export const currentDate = () => {
  let today: Date = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = String(today.getFullYear());
  return `${yyyy}-${mm}-${dd}`;
};

export const years = () => {
  let years = [];
  for (let i: number = 1900; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  return toObject(years);
};

export const getSelectOptions = (list: any) => {
  let keys = Object.keys(list);
  const result = keys.map((item) => {
    return { value: item, label: list[item] };
  });
  return result;
};

const replaceLanguageString = (data: string) => {
  switch (data) {
    case "de":
      return "German";
    case "en":
      return "English";
    case "fr":
      return "French";
    case "el":
      return "Greek";
    case "es":
      return "Spanish";
    case "nl":
      return "Dutch";
    case "ru":
      return "Russian";
    case "tr":
      return "Turkish";
    case "zh":
      return "Chinese";
    default:
      return "English";
  }
};

export const iterateLanguageString = (data: any[]) => {
  let remappedData = data.map((element) => {
    return replaceLanguageString(element);
  });
  return remappedData.join(", ");
};

export const weekdayFromNumberToString = (weekDayAsNumber: number): string => {
  if (weekDayAsNumber < 0 || weekDayAsNumber > 6) return "";
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][weekDayAsNumber];
};

export const handleQuantity = (id: string, operation: string, shoppingCart: any) => {
  return shoppingCart.map((el) => {
    if (el.product_id === id) {
      if (operation === "increment") {
        let quantity = el._quantity + 1;
        return {
          ...el,
          _quantity: quantity,
          _subtotal: (el.price / 100) * quantity,
        };
      } else {
        if (el._quantity === 1) return el;
        let quantity = el._quantity - 1;
        return {
          ...el,
          _quantity: quantity,
          _subtotal: (el.price / 100) * quantity,
        };
      }
    }
    return el;
  });
};

export const reMapUserProfile = (data: any) => {
  let result = {
    address: [],
    phone: null,
    person: null,
    settings: null,
  };
  data.forEach((el, idx) => {
    if (idx === 0) {
      result = { ...el.data };
    }
    if (idx === 1) {
      result.address = [...el.data];
    }
    if (idx === 2) {
      result.phone = { ...el.data[0] };
    }
    if (idx === 3) {
      result.person = {
        ...el.data,
      };
    }
    if (idx === 3) {
      result.settings = {
        ...el.data,
      };
    }
  });
  return result;
};

export const filterByProductGroup = (data: any, productGroup: string) => {
  return data.filter((el) => el.product_group === productGroup);
};
export const getBiomarkerLevelImage = (level: string) => {
  switch (level) {
    case "Very low":
      return "biomarker-very-low";
    case "Low":
      return "biomarker-low";
    case "Normal":
      return "biomarker-normal";
    case "High":
      return "biomarker-high";
    case "Very high":
      return "biomarker-very-high";
    default:
      return "biomarker-normal";
  }
};
