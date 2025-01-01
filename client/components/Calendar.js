import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserStore';

const Calendar = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth); // Get the logged-in user ID
  const user = useSelector((state) => state.singleUser); // Assume single user is stored in Redux
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch the user and associated events/tests
      dispatch(fetchSingleUser(id));
    }
  }, [dispatch, id]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const renderDays = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const dayString = dayDate.toISOString().split('T')[0];

      const dayEvents = user?.events?.filter((event) => event.date === dayString) || [];
      const dayTests = [
        ...(user?.strengthTests?.filter((test) => test.date === dayString) || []),
        ...(user?.cardioTests?.filter((test) => test.date === dayString) || []),
      ];

      days.push(
        <div key={i} className="day" onClick={() => handleDateClick(dayDate)}>
          <span>{i}</span>
          {dayEvents.map((event, index) => (
            <div key={`event-${index}`} className="event-indicator" title={event.name}>
              {event.eventType}
            </div>
          ))}
          {dayTests.map((test, index) => (
            <div key={`test-${index}`} className="test-indicator" title={`Type: ${test.type}, Effort: ${test.effort}`}>
              {test.type}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}>
          &lt;
        </button>
        <h2>
          {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
        </h2>
        <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}>
          &gt;
        </button>
      </header>
      <div className="calendar-grid">{renderDays()}</div>
      {isModalOpen && (
        <div className="modal">
          {/* Event Form */}
          <h3>Add Event for {selectedDate.toDateString()}</h3>
          <button onClick={() => setModalOpen(false)}>Close</button>
          {/* Form component here */}
        </div>
      )}
    </div>
  );
};

export default Calendar;
