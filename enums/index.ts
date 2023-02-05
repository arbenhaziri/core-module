import { mainHostUrl } from "./../helpers/index";
export const ENVIRONMENT = "dit";

export const ORDERED_PRODUCTS_DEFAULT_BEGINING_DATE = "2015-01-01";

export const SNACKBAR_OPTIONS_RED_ALERT = {
  position: "bottom-right",
  style: {
    backgroundColor: "rgba(223, 9, 29, 0.8)",
    color: "rgb(242,227,227)",
    fontSize: "13px",
    textAlign: "center",
  },
  // closeStyle: {
  //   color: 'lightcoral',
  //   fontSize: '16px',
  // },
};

export const SNACKBAR_OPTIONS_BLUE_ALERT = {
  position: "bottom-right",
  style: {
    backgroundColor: "rgba(23, 133, 166, 0.65)",
    color: "rgb(242,227,227)",
    fontSize: "13px",
    textAlign: "center",
  },
};

export const SNACKBAR_OPTIONS_GREEN_ALERT = {
  position: "bottom-right",
  style: {
    backgroundColor: "rgba(7, 188, 12, 0.8)",
    color: "rgb(242,227,227)",
    fontSize: "13px",
    textAlign: "center",
  },
};

export const DRAWER_LINKS = [
  {
    key: "dashboard",
    icon: "icon-dashboard",
    display: "Dashboard",
    target: "/web/dashboard",
  },
  {
    key: "my-appointments",
    icon: "icon-myAppointments",
    display: "My Appointments",
    onClick: (token: string) => (window.location.href = mainHostUrl(`/web/after-booking?token=${token}`)),
    target: undefined,
  },
  {
    key: "my-orders",
    icon: "icon-myOrders",
    display: "My Orders",
    onClick: (token: string) => (window.location.href = mainHostUrl(`/web/after-booking?token=${token}`)),
    target: undefined,
  },
  {
    key: "my-health-profile",
    icon: "icon-myHealthProfile",
    display: "My Health Profile",
    // onClick: (token: string) => (window.location.href = mainHostUrl(`/web/welcome-digital-profile?token=${token}`)),
    target: "/web/my-health-profile",
  },
  // {
  //   key: "my-reviews",
  //   icon: "icon-myReviews",
  //   display: "My Reviews",
  //   target: "/dashboard",
  // },
  // {
  //   key: "my-wishlist",
  //   icon: "icon-myWishlist",
  //   display: "My Wishlist",
  //   target: "/dashboard",
  // },
  {
    key: "my-account",
    icon: "icon-myAccount",
    display: "My Account",
    onClick: (token: string) => (window.location.href = mainHostUrl(`/web/profile?token=${token}`)),
    target: undefined,
  },
  {
    key: "my-qr-code",
    icon: "icon-myQRCode",
    display: "My QR-Code",
    onClick: (token: string) => (window.location.href = mainHostUrl(`/web/check-in?token=${token}`)),
    target: undefined,
  },
  // {
  //   key: "Settings",
  //   icon: "icon-settings",
  //   display: "Settings",
  //   target: "/dashboard",
  // },
];

export const PAGINATE_PER_PAGE = 10;

export const PAGINATE_PAGE_SIZES = [10, 50];
