import { VirtualList } from "@/components/VirtualList/VirtualList";
import { cardData } from "@/data/cardData";
import Card from "@/components/Card/Card";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.title}>Список карточек</h1>
        <VirtualList data={cardData}>
          {(item) => <Card {...item} />}
        </VirtualList>
      </section>
    </div>
  );
}

export default App;
