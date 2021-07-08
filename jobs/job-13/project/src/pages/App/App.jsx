import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reservationsSlices, settingsSlices } from '../../store/slices';
import { coreUtils } from '../../utils';
import reservations from '../../data/reservations';
import { ReservationsPanel, Loader } from '../../components';
import Modal from '../Modal/Modal';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const { reservationsList } = useSelector(state => state.reservations);
  const { timeItems, isAppLoader, isOpenModal } = useSelector(state => state.settings);
  const settingsActions = settingsSlices.settingsSlice.actions;
  const reservationsActions = reservationsSlices.reservationsSlice.actions;

  // Dispatch functions.
  const onSetReservations = useCallback(() => {
    dispatch(reservationsActions.setReservations(reservations.map(r => ({
      ...r, startDate: r.startDate = new Date(r.startDate),
      endDate: r.startDate = new Date(r.endDate)
    }))));
  }, []);

  const onToggleField = (fieldName) => {
    dispatch(settingsActions.toggleField(fieldName));
  };

  const onSetTimeItems = useCallback(() => {
    dispatch(settingsActions.setTimeItems());
  }, []);

  const toggleModalHandler = useCallback(() => {
    onToggleField('isOpenModal');
  }, []);

  const toggleLoader = useCallback(() => {
    onToggleField('isAppLoader');
  }, []);

  useEffect(() => {
    // Simulate fetching existing reservations from the server.
    const simulateFetchReservations = async () => {
      try {
        await coreUtils.simulateAsyncCall();
        onSetReservations(); // You can comment this line to simulate no existing reservations from the database.
      }
      catch (e) { /* Handle error here. Log the error to server + Show message to the user */ }
      finally {
        toggleLoader();
      }
    };
    simulateFetchReservations();
    onSetTimeItems();
  }, []);

  return (
    <div className="container">
      <div className="title">
        Reservations
      </div>
      {isAppLoader && <Loader />}
      {!isAppLoader && timeItems.length > 0 &&
        <>
          <ReservationsPanel
            reservationsList={reservationsList}
            toggleModalHandler={toggleModalHandler}
          />
          {isOpenModal && <Modal />}
        </>}
    </div>
  );
};

export default App;