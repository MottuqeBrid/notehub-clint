import { createBrowserRouter } from "react-router";
import RootLayout from "../components/Layout/RootLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import Loading from "./../components/Loading/Loading";
import NotesRoutePage from "../components/NotesRoutePage/NotesRoutePage";
import TodosRoutePage from "../components/TodosRoutePage/TodosRoutePage";
import LinksRoutePage from "../components/LinksRoutePage/LinksRoutePage";
import ShowAllNotesPage from "../components/ShowAllNotesPage/ShowAllNotesPage";
import SearchPage from "../components/SearchPage/SearchPage";
import CoverPage from "../components/CoverPage/CoverPage";
import CoverPageGenerator from "../components/CoverPage/CoverPage";
import DownloadForm from "./../lib/Test";
import CoverLayout from "../components/Layout/CoverLayout";
import CoverPageDownload from "../components/CoverPageDownload/CoverPageDownload";
import SignupPage from "../components/SignupPage/SignupPage";
import LoginPage from "../components/LoginPage/LoginPage";
import HomePage from "../components/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import WelcomePage from "../WelcomePage/WelcomePage";
import AccountBlocked from "../components/AccountBlocked/AccountBlocked";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import ProfileUpdateForm from "../components/ProfileUpdateForm/ProfileUpdateForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: true,

        hydrateFallbackElement: <Loading />,
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "notes",
        element: (
          <PrivateRoute>
            <NotesRoutePage />
          </PrivateRoute>
        ),
      },
      {
        path: "search",
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/todo/all`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }),
        hydrateFallbackElement: <Loading />,
        element: (
          <PrivateRoute>
            <SearchPage />
          </PrivateRoute>
        ),
      },
      {
        path: "all-notes",
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/todo/all`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies in the request
          }),
        hydrateFallbackElement: <Loading />,
        element: (
          <PrivateRoute>
            <ShowAllNotesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "links",
        element: (
          <PrivateRoute>
            <LinksRoutePage />
          </PrivateRoute>
        ),
      },
      {
        path: "todos",
        element: (
          <PrivateRoute>
            <TodosRoutePage />
          </PrivateRoute>
        ),
      },
      {
        path: "calculator",
        element: <AccountBlocked />,
      },
      {
        path: "*",
        element: <h1 className="text-2xl font-bold"> 404 Not Found</h1>,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <ProfileUpdateForm />
          </PrivateRoute>
        ),
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "cover-page",
    element: <CoverLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <CoverPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "cover-page-generator",
    element: <CoverPageDownload />,
  },
]);
