import React, { useState, useEffect } from 'react';
import { CURRENCY_LIST } from './Currency';
import useModal from '../hooks/useModal';
import Modal from './Modal';
import Select from './Select';
import ErrorWall from './Errors';
import './../styles/Modal.css';

const currencyAPI = 'https://api.exchangeratesapi.io/latest';

export default function Converter() {
    const { isShowing, toggle } = useModal();
    const [elements] = useState(CURRENCY_LIST);
    const [date] = useState(new Date().toLocaleString().split(',')[0]);
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState("");
    const [currTo, setCurrTo] = useState("PLN");
    const [currFrom, setCurrFrom] = useState("USD");
    const [currHistory, setCurrHistory] = useState([]);


    const convertCurrency = () => {
        fetch(currencyAPI + '?base=' + currFrom + '&symbols=' + currTo)
            .then(res => res.json())
            .then(data => {
                const amountScore = (amount * (data.rates[currTo])).toFixed(2);
                setResult(amountScore);
                setCurrHistory([...currHistory, { amount, currFrom, amountScore, currTo, date }]);
            })
            .catch(() => setError(true))
    }

    const handleSelectCurrency = e => {
        if (e.target.name === 'currencyFrom') {
            setCurrFrom(e.target.value)
        }
        if (e.target.name === 'currencyTo') {
            setCurrTo(e.target.value)
        }
    }

    const handleInputCurrency = e => {
        setAmount(e.target.value);
        setResult("");
    }

    const clearStorage = () => {
        localStorage.clear();
        setCurrHistory([]);
    }

    useEffect(() => {
        const getHistory = JSON.parse(localStorage.getItem('currencyHistory'))
        if (getHistory) setCurrHistory(getHistory)
    }, [])

    useEffect(() => {
        localStorage.setItem('currencyHistory', JSON.stringify(currHistory))
    }, [currHistory])

    return (
        <div className="converter">
            <h1>Currency Converter</h1>
            <div className="converter-element">
                <button className="btn-option" onClick={toggle}>History</button>
                <Modal
                    isShowing={isShowing}
                    hide={toggle}
                    clearStorage={clearStorage}
                    currHistory={currHistory}
                />
            </div>
            {error === null ?
                <>
                    <input min="1"
                        type="number"
                        onKeyDown={e => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                        placeholder="Amount"
                        value={amount}
                        onChange={e => handleInputCurrency(e)} />
                    <div className="converter-container">
                        <div className="converter-container-select">
                            <div className="converter-label">Convert from {currFrom}</div>
                            <Select
                                currencyName={'currencyFrom'}
                                elements={elements}
                                currencySelected={currFrom}
                                currencyOnChange={e => handleSelectCurrency(e)}
                            />
                        </div>
                        <div className="converter-container-select">
                            <div className="converter-label">Convert to {currTo}</div>
                            <Select
                                currencyName={'currencyTo'}
                                elements={elements}
                                currencySelected={currTo}
                                currencyOnChange={e => handleSelectCurrency(e)}
                            />
                        </div>
                    </div>
                    {result && (
                        <span>{amount}&nbsp;{currFrom}&nbsp;=&nbsp;{result}&nbsp;{currTo}</span>
                    )}
                    <button className="btn-submit" onClick={convertCurrency}>Convert</button>
                </>  : <ErrorWall />}    
        </div>
    )
}