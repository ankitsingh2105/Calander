import React from 'react';

export default function Header({ currentDate, handlePrevMonth, handleNextMonth }) {
  return (
    <header>
      <button onClick={handlePrevMonth}>Previous</button>
      <h2>
        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
      </h2>
      <button onClick={handleNextMonth}>Next</button>
    </header>
  );
}
