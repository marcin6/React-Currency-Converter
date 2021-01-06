import React from 'react'

export default function Select({
  elements,
  currencyName,
  currencySelected,
  currencyOnChange
}) {

  return (
    <div>
      <select name={currencyName} value={currencySelected} onChange={currencyOnChange}>
        {elements.map((el, idx) => (
          <option key={idx} value={el.value}>{el.text}</option>
        ))}
      </select>
    </div>
  )
}