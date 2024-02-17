import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

import Modal from './Modal';

import './styles.css';

const Calculator = () => {
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyPressed = event.key;
      if (!isNaN(keyPressed) || '+-*/.'.includes(keyPressed)) {
        setResult(result + keyPressed);
      } else if (keyPressed === 'Enter') {
        calculateResult();
      } else if (keyPressed === 'Backspace') {
        setResult(result.slice(0, -1));
      } else if (keyPressed === 'Escape') {
        clearResult();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [result]);

//   const ToggleMode = () => {
//     const body = document.body;
//     body.classList.add('dark-mode');
//     }

  const handleClick = (value) => {
    setResult(result + value);
  };

  const clearResult = () => {
    setResult('');
  };

  const calculateResult = () => {
    try {
      const calculatedResult = eval(result).toString();
      setResult(calculatedResult);
      setHistory([...history, { calculation: result, result: calculatedResult }]);
    } catch (error) {
      setResult('Error');
    }
  };

  const insertPreviousResult = () => {
    const previousResult = history.length > 0 ? history[history.length - 1].result : '';
    setResult(previousResult);
  };

  const clearHistory = () => {
    setIsModalOpen(true);
  };

  const confirmClearHistory = () => {
    setHistory([]);
    setIsModalOpen(false);
  };

  const closeClearHistoryModal = () => {
    setIsModalOpen(false);
  };

  const downloadHistory = () => {
    const historyText = history.map((item) => `${item.calculation} = ${item.result}`).join('\n');
    const blob = new Blob([historyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculator_history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="calculator">
      <input type="text" value={result} readOnly />
      <div className="buttons">
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>x</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={clearResult}>C</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={calculateResult}>=</button>
        <button onClick={insertPreviousResult}>
            <Icon icon="pajamas:go-back" />
        </button>
        <button onClick={clearHistory}>
            <Icon icon="healthicons:cleaning" />
        </button>
        <button onClick={downloadHistory}>
            <Icon icon="material-symbols:download" />
        </button>
      </div>
      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <span title={item.calculation}>{item.calculation}</span>
              <span title={item.result}>{item.result}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* <button onClick={ToggleMode} id="mode-toggle">Toggle Mode</button> */}

      <Modal isOpen={isModalOpen} onClose={closeClearHistoryModal} onConfirm={confirmClearHistory} />
    </div>
  );
};

export default Calculator;
