import styles from "./Card.module.css";

type CardProps = {
  title: string;
  text: string;
};

const Card = ({ title, text }: CardProps) => {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
    </article>
  );
};

export default Card;
