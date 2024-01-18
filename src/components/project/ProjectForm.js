import { useEffect, useState } from "react";

import styles from "./ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Project name:"
        name="name"
        placeholder="Enter the project name"
      />
      <Input
        type="number"
        text="Project budget:"
        name="budget"
        placeholder="Enter the budget"
      />
      <Select
        name="category_id"
        text="Select an category"
        options={categories}
      />
      <SubmitButton text="Create project" />
    </form>
  );
}

export default ProjectForm;
