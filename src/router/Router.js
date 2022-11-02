import { lazy } from "react";

const Home = lazy(() => import("../pages/HomePage"));
const Sing_In = lazy(() => import("../pages/SingInPage"));
const Sing_up = lazy(() => import("../pages/SingUpPage"));
const Page_not_fould = lazy(() => import("../pages/PageNotfould"));
const Detail = lazy(() => import("../pages/PostDetailPage"));
const Dashboard = lazy(() => import("../pages/DashboardPage"));
const Dashboard_post = lazy(() => import("../module/posts/PostManage"));
const Dashboard_add_post = lazy(() => import("../module/posts/PostAddNew"));
const Dashboard_update_post = lazy(() => import("../module/posts/PostUpdate"));
const Dashboard_category = lazy(() =>
  import("../module/category/CategoryManage")
);
const Dashboard_add_category = lazy(() =>
  import("../module/category/CategoryAddNew")
);
const Category_update = lazy(() => import("../module/category/CategoryUpdate"));
const Dashboard_user = lazy(() => import("../module/user/UserManage"));
const Dashboard_add_user = lazy(() => import("../module/user/UserAddNew"));
const Dashboard_update_user = lazy(() => import("../module/user/UserUpdate"));
const AuthorPage = lazy(() => import("../pages/AuthorPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));

export const ROUTERLINK = {
  HOME: {
    id: 1,
    path: "/",
    name: "Home",
  },
  BLOG: {
    id: 2,
    path: "/blog",
    name: "Blog",
  },
  CONTACT: {
    id: 3,
    path: "/contact",
    name: "Contact",
  },
  SING_IN: {
    id: 4,
    path: "/sign-in",
    name: "Sign in Page",
  },
  SING_UP: {
    id: 5,
    path: "/sign-up",
    name: "Sign up Page",
  },
  NOT_FOUND: {
    id: 6,
    path: "*",
    name: "oops 404",
  },
  DETAIL: {
    id: 7,
    path: "/:slug",
    name: "detail",
  },
  DASHBOARD: {
    id: 8,
    path: "/dashboard",
    name: "dashboard",
  },
  DASHBOARD_POST: {
    id: 9,
    path: "/manage/post",
    name: "manage-post",
  },
  DASHBOARD_ADD_POST: {
    id: 10,
    path: "/manage/add-post",
    name: "manage-add-post",
  },
  DASHBOARD_UPDATE_POST: {
    id: 11,
    path: "/manage/update-post",
    name: "manage-update-post",
  },
  DASHBOARD_CATEGORY: {
    id: 12,
    path: "/manage/category",
    name: "manage-category",
  },
  DASHBOARD_ADD_CATEGORY: {
    id: 13,
    path: "/manage/add-category",
    name: "manage-add-category",
  },
  DASHBOARD_UPDATE_CATEGORY: {
    id: 14,
    path: "/manage/update-category",
    name: "manage-update-category",
  },
  DASHBOARD_USER: {
    id: 15,
    path: "/manage/user",
    name: "manage/user",
  },
  DASHBOARD_ADD_USER: {
    id: 16,
    path: "/manage/add-user",
    name: "manage-add-user",
  },
  DASHBOARD_UPDATE_USER: {
    id: 17,
    path: "/manage/update-user",
    name: "manage-update-user",
  },
  AUTHOR_PAGE: {
    id: 18,
    path: "/author/:slug",
    name: "author",
  },
  CATEGORY_PAGE: {
    id: 19,
    path: "/category/:slug",
    name: "category",
  },
};

export const ROUTES = [
  {
    path: ROUTERLINK.HOME.path,
    id: ROUTERLINK.HOME.id,
    element: Home,
  },
  {
    path: ROUTERLINK.SING_IN.path,
    id: ROUTERLINK.SING_IN.id,
    element: Sing_In,
  },
  {
    path: ROUTERLINK.SING_UP.path,
    id: ROUTERLINK.SING_UP.id,
    element: Sing_up,
  },
  {
    path: ROUTERLINK.NOT_FOUND.path,
    id: ROUTERLINK.NOT_FOUND.id,
    element: Page_not_fould,
  },
  {
    path: ROUTERLINK.DETAIL.path,
    id: ROUTERLINK.DETAIL.id,
    element: Detail,
  },
  {
    path: ROUTERLINK.AUTHOR_PAGE.path,
    id: ROUTERLINK.AUTHOR_PAGE.id,
    element: AuthorPage,
  },
  {
    path: ROUTERLINK.CATEGORY_PAGE.path,
    id: ROUTERLINK.CATEGORY_PAGE.id,
    element: CategoryPage,
  },
];

export const ROUTER_DASHBOARD = [
  {
    path: ROUTERLINK.DASHBOARD.path,
    id: ROUTERLINK.DASHBOARD.id,
    element: Dashboard,
  },
  {
    path: ROUTERLINK.DASHBOARD_POST.path,
    id: ROUTERLINK.DASHBOARD_POST.id,
    element: Dashboard_post,
  },
  {
    path: ROUTERLINK.DASHBOARD_ADD_POST.path,
    id: ROUTERLINK.DASHBOARD_ADD_POST.id,
    element: Dashboard_add_post,
  },
  {
    path: ROUTERLINK.DASHBOARD_UPDATE_POST.path,
    id: ROUTERLINK.DASHBOARD_UPDATE_POST.id,
    element: Dashboard_update_post,
  },
  {
    path: ROUTERLINK.DASHBOARD_CATEGORY.path,
    id: ROUTERLINK.DASHBOARD_CATEGORY.id,
    element: Dashboard_category,
  },
  {
    path: ROUTERLINK.DASHBOARD_ADD_CATEGORY.path,
    id: ROUTERLINK.DASHBOARD_ADD_CATEGORY.id,
    element: Dashboard_add_category,
  },
  {
    path: ROUTERLINK.DASHBOARD_UPDATE_CATEGORY.path,
    id: ROUTERLINK.DASHBOARD_UPDATE_CATEGORY.id,
    element: Category_update,
  },
  {
    path: ROUTERLINK.DASHBOARD_USER.path,
    id: ROUTERLINK.DASHBOARD_USER.id,
    element: Dashboard_user,
  },
  {
    path: ROUTERLINK.DASHBOARD_ADD_USER.path,
    id: ROUTERLINK.DASHBOARD_ADD_USER.id,
    element: Dashboard_add_user,
  },
  {
    path: ROUTERLINK.DASHBOARD_UPDATE_USER.path,
    id: ROUTERLINK.DASHBOARD_UPDATE_USER.id,
    element: Dashboard_update_user,
  },
];
