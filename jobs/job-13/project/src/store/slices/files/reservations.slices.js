import { createSlice } from '@reduxjs/toolkit';

class ReservationsSlices {

	constructor() {
		const initialState = {
			reservationsList: [],
			selectedTimes: { startHour: '08', startMinute: '00', endHour: '10', endMinute: '00' },
			checkedDevicesList: {}
		};
		this.reservationsSlice = createSlice({
			name: 'reservations',
			initialState,
			reducers: {
				setReservations(state, action) {
					state.reservationsList = [...state.reservationsList, ...action.payload];
				},
				setCheckedDevice(state, action) {
					const { deviceId, isChecked } = action.payload;
					state.checkedDevicesList[deviceId] = isChecked ? deviceId : null;
				},
				setSelectedTimes(state, action) {
					const { value, name } = action.payload;
					const values = value.split(':');
					state.selectedTimes[`${name}Hour`] = values[0];
					state.selectedTimes[`${name}Minute`] = values[1];
				},
				clearModalData(state) {
					state.selectedTimes = null;
					state.checkedDevicesList = null;
					state.selectedTimes = { ...initialState.selectedTimes };
					state.checkedDevicesList = { ...initialState.checkedDevicesList };
				}
			}
		});
	}
}

export default new ReservationsSlices();