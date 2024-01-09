export function Column({ children, leftOffset, width }) {
    const end = leftOffset + width;
    return <div className={`col-start-${leftOffset} col-end-${end}`}>{children}</div>;
  }