function ProjectForm() {
  var valueSubmit = "Create Project";
  return (
    <form>
      <div>
        <input type="text" placeholder="Enter the name project" />
      </div>
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
