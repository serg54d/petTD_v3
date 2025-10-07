import { AppMain } from "@/app/AppMain";
import { Login } from "@/features/auth/ui/Login";
import { Route, Routes, useNavigate } from "react-router";
import { NotFound } from "../components/NotFound";
import { store } from "@/app/store";
import { selectAuth } from "@/features/auth/model/auth-slice";
import { useAppSelector } from "../hooks/useAppSelector";
import { useEffect } from "react";

export const Path = {
  main: "/",
  login: "/login",
  notFound: "*",
} as const;

export const Routing = () => {
  let navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(Path.main);
    } else if (auth.isLoggedIn === false) {
      navigate(Path.login);
    }
  }, [auth.isLoggedIn]);
  return (
    <Routes>
      {auth.isLoggedIn === true && (
        <Route path={Path.main} element={<AppMain />} />
      )}
      <Route path={Path.login} element={<Login />} />
      <Route path={Path.notFound} element={<NotFound />} />
    </Routes>
  );
};
