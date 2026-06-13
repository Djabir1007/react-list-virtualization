import { Fragment, useState, type ReactNode } from "react";

import {
  columnsCount,
  cardHeight,
  rowGap,
  containerHeight,
  overscanRows,
} from "./constants";

import styles from "./VirtualList.module.css";

type VirtualListProps<T extends { id: number }> = {
  data: T[];
  children: (item: T) => ReactNode;
};

export const VirtualList = <T extends { id: number }>({
  data,
  children,
}: VirtualListProps<T>) => {
  const [scroll, setScroll] = useState<number>(0);

  const rowHeight = cardHeight + rowGap;

  const startRowIndex = Math.floor(scroll / rowHeight);
  const visibleRowsCount = Math.ceil(containerHeight / rowHeight);

  const totalRows = Math.ceil(data.length / columnsCount);
  const totalHeight = totalRows * rowHeight;

  const visibleStartRowIndex = Math.max(startRowIndex - overscanRows, 0);
  const visibleEndRowIndex = Math.min(
    startRowIndex + visibleRowsCount + overscanRows,
    totalRows,
  );

  const startIndex = visibleStartRowIndex * columnsCount;
  const endIndex = visibleEndRowIndex * columnsCount;

  const visibleItems = data.slice(startIndex, endIndex);

  const offsetY = visibleStartRowIndex * rowHeight;

  return (
    <div
      className={styles.list}
      onScroll={(event) => setScroll(event.currentTarget.scrollTop)}
    >
      <div className={styles.spacer} style={{ height: totalHeight }}>
        <div
          className={styles.visibleList}
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleItems.map((item) => (
            <Fragment key={item.id}>{children(item)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
