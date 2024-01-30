import styles from "./ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function ProjectCard({ id, name, budget, category, handleRemove }) {
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Budget:</span>R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span>
        {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to="/">
          <BsPencil />
          Edit
        </Link>

        <button>
          <BsFillTrashFill /> Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
