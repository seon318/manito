import React, { useState } from 'react';
import './ParticipantInput.scss';

export default function ParticipantInput({ addParticipant, participants }) {
  const [name, setName] = useState('');

  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      addParticipant(name);
      setName('');
    }
  };

  return (
    <>
      <div className='input'>
        <h3>활용방법</h3>
        <hr />
        <p>1. 참가자 이름을 추가해주세요</p>
        <p>2. 마니또 배정 버튼을 눌러주세요.</p>
        <p>3. 결과를 다운로드해주세요.</p>
        <p>4. 한 사람씩 돌아가며 자신의 마니또를 확인해주세요.</p>
        <p>5. 마니또 기간이 종료되면 결과 파일을 올려 결과를 확인해주세요.</p>
        <hr />
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='name-input'
          onKeyDown={handleKeyDown}
        />
        <button
          type='button'
          onClick={() => {
            addParticipant(name);
            setName('');
          }}
          className='submit-btn'
        >
          추가
        </button>
      </div>
      <div className='names'>
        {participants.map((participant) => (
          <button key={participant.id} className='names-btn'>
            {participant.name}
          </button>
        ))}
      </div>
    </>
  );
}
