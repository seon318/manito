import React, { useState } from 'react';
import Header from './Header';
import ParticipantInput from './ParticipantInput';
import ManitoAssigner from './ManitoAssigner';
import FileUploader from './FileUploader';
import ResultViewer from './ResultViewer';
import './App.scss';

export default function App() {
  const [participants, setParticipants] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [isAssigned, setIsAssigned] = useState(false);

  const addParticipant = (name) => {
    if (name.trim() !== '') {
      if (!participants.some((participant) => participant.name === name)) {
        setParticipants([
          ...participants,
          {
            id: participants.length + 1,
            name: name,
          },
        ]);
      } else {
        alert('이미 존재하는 이름입니다.');
      }
    }
  };

  const removeParticipant = (id) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== id
    );
    setParticipants(updatedParticipants);
  };

  const assignManitto = () => {
    console.log('배정 시작');
    let isValidAssignment = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!isValidAssignment && attempts < maxAttempts) {
      const shuffledParticipants = [...participants].sort(
        () => 0.5 - Math.random()
      );
      const newAssignments = {};

      isValidAssignment = true;
      for (let i = 0; i < participants.length; i++) {
        const giver = participants[i];
        const receiver = shuffledParticipants[i];

        if (giver.id === receiver.id) {
          isValidAssignment = false;
          break;
        }

        newAssignments[giver.name] = receiver.name;
      }

      attempts++;
      if (isValidAssignment) {
        setAssignments(newAssignments);
        setIsAssigned(true);
      }
    }

    if (attempts >= maxAttempts) {
      console.error(
        '최대 시도 횟수를 초과했습니다. 참가자 수를 줄이거나 시도 횟수를 늘려보세요.'
      );
    }
  };

  const downloadAssignments = () => {
    const blob = new Blob([JSON.stringify(assignments, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assignments.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          setAssignments(parsedData);
          setIsAssigned(true);
        } catch (error) {
          console.error('파일을 읽는 중 오류가 발생했습니다.', error);
        }
      };
      reader.readAsText(file);
    } else {
      alert('올바른 JSON 파일을 업로드해 주세요.');
    }
  };

  const handleBackClick = () => {
    setIsAssigned(false);
  };

  return (
    <div>
      <Header />
      {!isAssigned ? (
        <>
          <ParticipantInput
            addParticipant={addParticipant}
            participants={participants} removeParticipant={removeParticipant}
          />
          <ManitoAssigner assignManitto={assignManitto} />
          <FileUploader handleFileUpload={handleFileUpload} />
        </>
      ) : (
        <>
          <ResultViewer assignments={assignments} />
          <div className='buttons'>
            <button onClick={downloadAssignments} className='download-btn'>
              결과 다운로드
            </button>
            <button onClick={handleBackClick} className='back-btn'>
              뒤로 가기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
