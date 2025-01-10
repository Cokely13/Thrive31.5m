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
  const [isKeyModalOpen, setKeyModalOpen] = useState(false);

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

  console.log("users", user)

  const getMoodBackgroundColor = (mood) => {
    if (mood >= 1 && mood <= 3) return '#d3d3d3'; // Light Gray
    if (mood >= 4 && mood <= 6) return '#add8e6'; // Light Blue
    if (mood >= 7 && mood <= 10) return '#ffffe0'; // Light Yellow
    return '#fff'; // Default
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

    console.log('user', user);

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), i));
      const dayString = dayDate.toISOString().split('T')[0]; // Use UTC-based date string
      const dayOfWeek = dayDate.toLocaleString('default', { weekday: 'short' });

      const dayRatings = user?.days?.find((day) => day.date === dayString) || null;
      const moodBackgroundColor = dayRatings ? getMoodBackgroundColor(dayRatings.mood) : '#fff';

      const dayEvents = user?.events?.filter((event) => event.date === dayString) || [];
      const dayTests = [
        ...(user?.strengthTests?.filter((test) => test.date === dayString) || []),
        ...(user?.cardioTests?.filter((test) => test.date === dayString) || []),
      ];

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
            backgroundColor: moodBackgroundColor, // Mood-based background color
          }}
        >
          <Link to={`/day/${dayString}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontWeight: 'bold' }}>{dayOfWeek} {i}</span>
          </Link>

          {dayRatings && <span style={{ fontSize: '0.9rem', color: 'gray' }}>Rated</span>}

          {dayEvents.map((event, index) => (
            <Link to={`/eventdetails/${event.id}`} key={`event-${index}`} style={{ textDecoration: 'none' }}>
              <div
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
                {event.name} - {event.time}
              </div>
            </Link>
          ))}

          {dayTests.map((test, index) => (
            <Link
              to={
                test.type === 'mile' || test.type === '5k'
                  ? `/cardiotestdetails/${test.id}`
                  : `/strengthtestdetails/${test.id}`
              }
              key={`test-${index}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="test-indicator"
                style={{
                  backgroundColor: test.type === 'mile' || test.type === '5k' ? 'purple' : 'orange',
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
            </Link>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container" style={{ position: 'relative' }}>
      <button onClick={() => setKeyModalOpen(true)} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1' }}>
        See Key
      </button>
      {isKeyModalOpen && (
        <div className="modal">
          <h4>Color Key</h4>
          <ul>
            <li>Light Gray: Mood 1-3</li>
            <li>Light Blue: Mood 4-6</li>
            <li>Light Yellow: Mood 7-10</li>
          </ul>
          <button onClick={() => setKeyModalOpen(false)}>Close</button>
        </div>
      )}
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
    </div>
  );
};

export default Calendar;
