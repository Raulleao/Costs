import styles from "./ProjectForm.module.css";
import Input from "../form/Input";

function ProjectForm() {
  var valueSubmit = "Create Project";
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

      <div>
        <input type="number" placeholder="Enter the budget" />
      </div>
      <div>
        <select name="category_id">
          <option disabled selected>
            Enter the category
          </option>
        </select>
      </div>
      <input type="submit" value={valueSubmit} />
    </form>
  );
}

export default ProjectForm;
