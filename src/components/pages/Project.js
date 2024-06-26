import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import { parse, v4 as uuidv4 } from "uuid";
import ServiceCard from '../service/ServiceCard'

function Project() {
  let { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [services, setServices] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')

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
        .catch((err) => console.log(err));
    }, 0);
  }, [id]);

  function editPost(project) {
    setMessage("");
    //budget validation
    if (project.budget < project.cost) {
      setMessage(`The budget cannot be less than the project cost`);
      setType("error");
      return false;
      //message
    }

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage(`Updated project!`);
        setType("success");
        return false;
      })
      .catch((err) => console.log(err));
  }

  function createService(project) {
    // last service
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Budget exceeded, check the value of the service!");
      setType("error");
      project.services.pop();
      return false;
    }

    // add service cost to project cost total
    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services)
        setShowServiceForm(!showServiceForm);
        setMessage("Service added!");
        setType("success");
      });
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso!");
      });
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
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
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText={"Continue"}
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Add an service:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Add a service" : "Close"}
              </button>
              <div className={styles.form}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText={"Add service"}
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && (
                <p>There are no registered services.</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
