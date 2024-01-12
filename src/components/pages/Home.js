import styles from "./Home.module.css";
import savings from "../../img/savings.svg";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Welcome to<span>Costs</span>
      </h1>
      <p>Start managing your projects right now!</p>
      <a href="/">Criar projeto</a>
      <img src={savings} alt="Costs" />
    </section>
  );
}

export default Home;
