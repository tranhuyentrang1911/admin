import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";

import AddCategory from "./Add";
import CategoryInformation from "./Information";
import UpdateCategory from "./Update";

const CategoryManagement = () => {
  return (
    <Suspense fallback={<p> Loading....</p>}>
      <Routes>
        <Route index element={<CategoryInformation />} />
        <Route path="/add" element={<AddCategory />} />
        <Route path="/update/:id" element={<UpdateCategory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default CategoryManagement;
