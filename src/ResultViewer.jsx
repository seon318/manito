import React, { useState } from 'react';

export default function ResultViewer({ assignments }) {
  const [selectedName, setSelectedName] = useState(null);

  const handleNameClick = (name) => {
    setSelectedName(name);
  };

  const handleBackClick = () => {
    setSelectedName(null);
  };

  return (
    <div className='result-viewer'>
      {selectedName === null ? (
        <>
          <p>마니또를 확인하려면 이름을 눌러주세요.</p>
          {Object.keys(assignments).map((name) => (
            <div key={name} className='result-name'>
              <button
                onClick={() => handleNameClick(name)}
                className='name-button'
              >
                {name}
              </button>
            </div>
          ))}
        </>
      ) : (
        <div>
          <div className='result-text'>
            <strong>{selectedName}</strong> 님의 마니또는{' '}
            <strong>{assignments[selectedName]}</strong> 님입니다.
          </div>
          <button onClick={handleBackClick} className='result-back'>
            뒤로 가기
          </button>
        </div>
      )}
    </div>
  );
}
