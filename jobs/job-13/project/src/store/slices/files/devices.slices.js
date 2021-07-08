import { createSlice } from '@reduxjs/toolkit';

class DevicesSlices {

	constructor() {
		const initialState = {
            devicesList: []
		};
		this.devicesSlice = createSlice({
			name: 'devices',
			initialState,
			reducers: {
				setDevicesList(state, action) {
					state.devicesList = action.payload;
				}
			}
		});
	}
}

export default new DevicesSlices();