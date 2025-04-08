import { Navigate, Route, Routes } from "react-router-dom";
import { Paths } from "./consts";
import { Organization } from "../../pages/Organization/Organization";

export const Router = () => {
  return (
    <Routes>
      <Route path={Paths.Organization} element={<Organization />} />
      <Route path={Paths.Any} element={<Navigate to={Paths.Organization} />} />
    </Routes>
  );
};
