import { useState } from "react";
import styles from "./App.module.css";
import Card from "./components/Card/Card";
import { cardData } from "./data/cardData";

function App() {
  const [scroll, setScroll] = useState<number>(0);

  const columnsCount = 5;
  const cardHeight = 200;
  const rowGap = 30;
  const rowHeight = cardHeight + rowGap;
  const containerHeight = 500;
  const overscanRows = 1;

  const startRowIndex = Math.floor(scroll / rowHeight);
  const visibleRowsCount = Math.ceil(containerHeight / rowHeight);

  const totalRows = Math.ceil(cardData.length / columnsCount);
  const totalHeight = totalRows * rowHeight;

  const visibleStartRowIndex = Math.max(startRowIndex - overscanRows, 0);
  const visibleEndRowIndex = Math.min(
    startRowIndex + visibleRowsCount + overscanRows,
    totalRows,
  );

  const startIndex = visibleStartRowIndex * columnsCount;
  const endIndex = visibleEndRowIndex * columnsCount;

  const visibleCards = cardData.slice(startIndex, endIndex);

  const offsetY = visibleStartRowIndex * rowHeight;

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.title}>Список карточек</h1>

        <div
          className={styles.list}
          onScroll={(event) => setScroll(event.currentTarget.scrollTop)}
        >
          <div className={styles.spacer} style={{ height: totalHeight }}>
            <div
              className={styles.visibleList}
              style={{ transform: `translateY(${offsetY}px)` }}
            >
              {visibleCards.map((item) => {
                return <Card key={item.id} {...item} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
