import React from "react";
import { IoPencil } from "react-icons/io5";
import { Button } from "./ui/button";
const UpdateBtn = () => {
  return (
    <Button className=" rounded-full">
      <IoPencil size={20} />
    </Button>
  );
};

export default UpdateBtn;
