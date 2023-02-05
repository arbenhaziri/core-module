import Cookies from "js-cookie";

const setKeyValue = (key, value) => {
  let dataToStore = JSON.stringify(value);
  Cookies.set(key, dataToStore, { expires: 2 });
};

const getDataByKey = (key) => {
  const cookies = Cookies.get(key);
  let data = null;
  if (cookies) {
    data = JSON.parse(cookies);
  }
  return data;
};

const updateProductId = (productId: any) => {
  const cookies = Cookies.get("merchantData");
  const data = { ...JSON.parse(cookies), productId: productId };
  Cookies.set("merchantData", JSON.stringify(data), { expires: 2 });
};

const updateProductCalendarItems = (hasCalendarItems: boolean) => {
  const cookies = Cookies.get("merchantData");
  const data = { ...JSON.parse(cookies), hasCalendarItems: hasCalendarItems };
  Cookies.set("merchantData", JSON.stringify(data), { expires: 2 });
};

const removeCookie = (key) => {
  const cookies = Cookies.get(key);
  cookies.remove("key");
};
const StorageService = {
  setKeyValue,
  getDataByKey,
  updateProductId,
  updateProductCalendarItems,
  removeCookie,
};

export default StorageService;
