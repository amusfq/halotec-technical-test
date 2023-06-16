import Layout from "@/components/layout";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import UsulanProdiBaru from "@/pages/usulan-prodi-baru";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/usulan-prodi-baru",
          element: <UsulanProdiBaru />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
