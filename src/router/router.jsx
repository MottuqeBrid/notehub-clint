import { createBrowserRouter } from "react-router";
import RootLayout from "../components/RootLayout/RootLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import Loading from "./../components/Loading/Loading";
import NotesRoutePage from "../components/NotesRoutePage/NotesRoutePage";
import TodosRoutePage from "../components/TodosRoutePage/TodosRoutePage";
import LinksRoutePage from "../components/LinksRoutePage/LinksRoutePage";
import ShowAllNotesPage from "../components/ShowAllNotesPage/ShowAllNotesPage";
import SearchPage from "../components/SearchPage/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/todo/all"),
        hydrateFallbackElement: <Loading />,
        element: <Dashboard />,
      },
      {
        path: "notes",
        loader: () => fetch("http://localhost:3000/todo/all"),
        hydrateFallbackElement: <Loading />,
        element: <NotesRoutePage />,
      },
      {
        path: "search",
        loader: () => fetch("http://localhost:3000/todo/all"),
        hydrateFallbackElement: <Loading />,
        element: <SearchPage />,
      },
      {
        path: "all-notes",
        loader: () => fetch("http://localhost:3000/todo/all"),
        hydrateFallbackElement: <Loading />,
        element: <ShowAllNotesPage />,
      },
      {
        path: "links",
        loader: () => fetch("http://localhost:3000/todo/all"),
        hydrateFallbackElement: <Loading />,
        element: <LinksRoutePage />,
      },
      {
        path: "todos",
        loader: () => fetch("http://localhost:3000/todo/all"),
        hydrateFallbackElement: <Loading />,
        element: <TodosRoutePage />,
      },
      {
        path: "calender",
        element: <h1 className="text-2xl font-bold"> Calender</h1>,
      },
      {
        path: "calculator",
        element: <h1 className="text-2xl font-bold"> Calculator</h1>,
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
]);
