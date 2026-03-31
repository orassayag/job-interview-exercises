import { createSlice } from '@reduxjs/toolkit';
import { timeUtils } from '../../../utils';

class SettingsSlices {

	constructor() {
		const initialState = {
			timeItems: [],
			isAppLoader: true,
			isModalLoader: false,
			modalError: null,
			isOpenModal: false
		};
		this.settingsSlice = createSlice({
			name: 'settings',
			initialState,
			reducers: {
				setField(state, action) {
					const { fieldName, fieldValue } = action.payload;
					state[fieldName] = fieldValue;
				},
				toggleField(state, action) {
					state[action.payload] = !state[action.payload];
				},
				setTimeItems(state) {
					state.timeItems = timeUtils.getDayTimes();
				}
			}
		});
	}
}

export default new SettingsSlices();