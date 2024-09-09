import React from "react";
import { useParams } from "react-router-dom";
import AddEmployee from "./AddEmployee";

const EditEmployee = () => {
  const { id } = useParams();

  return <AddEmployee isEditing={true} employeeId={id} />;
};

export default EditEmployee;
