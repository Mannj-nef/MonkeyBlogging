import * as Yup from "yup";

export const theme = {
  color: {
    primary: "#2EBAC1",
    secondary: "#A4D96C",
    blueDack: "#293554",
    gray: "#E0E0E0",
    gray6B: "#6B6B6B",
    grayDack: "#292D32",
    grayLight: "#E7ECF3",
    grayF7: " #f7f7f8",
    grayF3: "#F3EDFF",
    grayD2: "#d2c8e7",
    white: "#fff",
    red: "red",
    tertiary: "#3A1097",
    accent: "#00D1ED",
    green23: "#23BB86",
    black: "#000",
    black23: "#232323",
  },
};

export const VALIDATE_YUP = {
  TEXT: Yup.string()
    .required()
    .min(2, "Must be 2 characters or more")
    .max(80, "Must be 80 characters or less"),
  EMAIL: Yup.string().required().email("Invalid email address"),
  PASSWORD: Yup.string().required().min(8, "PassWord minimum 8 characters"),
};

export const TOAST_TYPE = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

export const SLUG_SLUGIFY = {
  lower: true,
};

export const POST_STATUS = {
  APPROVED: 1,
  PENDING: 2,
  REJECT: 3,
};

export const POST_HOT = {
  TRUE: true,
  FALSE: false,
};

export const CATEGORY_STATUS = {
  APPROVED: 1,
  UNAPPROVED: 2,
};

export const ROLE = {
  USER: 1,
  ADMIN: 2,
  MODERATOR: 3,
};

export const USER_STATUS = {
  ACTIVE: 1,
  PENDING: 2,
  BANNED: 3,
};

export const FIREBASE_COLLECTION = {
  USER: "user",
  CATEGRORIES: "categories",
  POST: "post",
};
