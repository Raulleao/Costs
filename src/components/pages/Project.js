import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";

function Project() {
  let { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log);
    }, 0);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  // function toggleServiceForm() {
  //   setShowServiceForm(!showServiceForm)
  // }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Edit project" : "Close"}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Category:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total Budget:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Used budget:</span> {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <p>project details</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
