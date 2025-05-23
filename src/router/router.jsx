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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: true,

        hydrateFallbackElement: <Loading />,
        element: <Dashboard />,
      },
      {
        path: "notes",
        // loader: () => ,
        hydrateFallbackElement: <Loading />,
        element: <NotesRoutePage />,
      },
      {
        path: "search",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/todo/all`),
        hydrateFallbackElement: <Loading />,
        element: <SearchPage />,
      },
      {
        path: "all-notes",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/todo/all`),
        hydrateFallbackElement: <Loading />,
        element: <ShowAllNotesPage />,
      },
      {
        path: "links",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/todo/all`),
        hydrateFallbackElement: <Loading />,
        element: <LinksRoutePage />,
      },
      {
        path: "todos",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/todo/all`),
        hydrateFallbackElement: <Loading />,
        element: <TodosRoutePage />,
      },
      {
        path: "calculator",
        element: <DownloadForm />,
      },
      {
        path: "*",
        element: <h1 className="text-2xl font-bold"> 404 Not Found</h1>,
      },
      {
        path: "profile",
        element: <h1 className="text-2xl font-bold"> Profile</h1>,
      },
    ],
  },
  {
    path: "cover-page",
    element: <CoverLayout />,
    children: [
      {
        index: true,
        element: <CoverPage />,
      },
    ],
  },
  {
    path: "cover-page-generator",
    element: <CoverPageDownload />,
  },
]);
