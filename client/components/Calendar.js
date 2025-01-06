import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';

const Calendar = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
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

  const getDayCategoryColors = (dayRatings) => {
    if (!dayRatings) return { mood: '#fff', exercise: '#fff', goals: '#fff', sleep: '#fff', nutrition: '#fff' };

    return {
      mood: dayRatings.mood <= 3 ? 'red' : dayRatings.mood <= 7 ? 'yellow' : 'green',
      exercise: dayRatings.exercise <= 3 ? 'red' : dayRatings.exercise <= 7 ? 'yellow' : 'green',
      goals: dayRatings.goals <= 3 ? 'red' : dayRatings.goals <= 7 ? 'yellow' : 'green',
      sleep: dayRatings.sleep <= 3 ? 'red' : dayRatings.sleep <= 7 ? 'yellow' : 'green',
      nutrition: dayRatings.nutrition <= 3 ? 'red' : dayRatings.nutrition <= 7 ? 'yellow' : 'green',
    };
  };

  const renderDays = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const days = [];

    // Add blank spaces for days before the start of the month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div
          key={`blank-${i}`}
          className="day blank"
          style={{
            border: '1px solid #ccc',
            height: '120px',
            backgroundColor: '#f9f9f9',
          }}
        ></div>
      );
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const dayString = dayDate.toISOString().split('T')[0];
      const dayOfWeek = dayDate.toLocaleString('default', { weekday: 'short' });

      const dayEvents = user?.events?.filter((event) => event.date === dayString) || [];
      const dayTests = [
        ...(user?.strengthTests?.filter((test) => test.date === dayString) || []),
        ...(user?.cardioTests?.filter((test) => test.date === dayString) || []),
      ];

      const dayRatings = user?.dayRatings?.find((rating) => rating.date === dayString) || null;
      const colors = getDayCategoryColors(dayRatings);

      days.push(
        <div
          key={i}
          className="day"
          style={{
            position: 'relative',
            cursor: 'pointer',
            padding: '10px',
            border: '1px solid #ccc',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: colors.mood, // Default to mood for background
          }}
        >
          <Link to={`/day/${dayString}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontWeight: 'bold' }}>{dayOfWeek}  {i}</span>
          </Link>

          <div style={{ display: 'flex', gap: '2px', justifyContent: 'space-around' }}>
            <div style={{ backgroundColor: colors.mood, width: '15px', height: '15px', borderRadius: '50%' }} title="Mood"></div>
            <div
              style={{ backgroundColor: colors.exercise, width: '15px', height: '15px', borderRadius: '50%' }}
              title="Exercise"
            ></div>
            <div
              style={{ backgroundColor: colors.goals, width: '15px', height: '15px', borderRadius: '50%' }}
              title="Goals"
            ></div>
            <div style={{ backgroundColor: colors.sleep, width: '15px', height: '15px', borderRadius: '50%' }} title="Sleep"></div>
            <div
              style={{ backgroundColor: colors.nutrition, width: '15px', height: '15px', borderRadius: '50%' }}
              title="Nutrition"
            ></div>
          </div>

          {dayEvents.map((event, index) => (
            <div
              key={`event-${index}`}
              className="event-indicator"
              style={{
                backgroundColor: event.eventType === 'Workout' ? 'blue' : event.eventType === 'Race' ? 'red' : 'green',
                margin: '2px',
                padding: '2px',
                borderRadius: '4px',
                color: 'white',
                fontSize: '0.8rem',
              }}
              title={event.name}
            >
              {event.eventType}
            </div>
          ))}

          {dayTests.map((test, index) => (
            <div
              key={`test-${index}`}
              className="test-indicator"
              style={{
                backgroundColor: test.type === 'mile' ? 'purple' : 'orange',
                margin: '2px',
                padding: '2px',
                borderRadius: '4px',
                color: 'white',
                fontSize: '0.8rem',
              }}
              title={`Type: ${test.type}, Effort: ${test.effort}`}
            >
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
      <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
        {renderDays()}
      </div>
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
