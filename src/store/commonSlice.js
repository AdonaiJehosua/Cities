import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const method = 'GET'
const headers = {
    'Authorization': 'Bearer dYpU7FZYgROR_UUNMqu7Fx1qRLcuNq',
    'Accept-language': 'en'
}

const fetchCities = createAsyncThunk(
    'common/fetchCities',
    async function (payload, {getState}) {
        getState().common.inputText = payload
        const fullUrl = `https://data-api.oxilor.com/rest/search-regions?searchTerm=${payload}&type=city&first=100`
        console.log('Im here')
        const response = fetch(fullUrl, {method, headers})
        const data = response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Что-то пошло не так. Попробуйте снова.')
        }
        return data
    }
)

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        inputText: '',
        showHelper: false,
        status: null,
        error: null,
        loading: false,
        fetchedCities: [],
        cities: []
    },
    reducers: {
        onTextChange(state, action) {
            state.inputText = action.payload
            console.log(action)
            console.log(state.inputText)
            if (state.inputText) {
                fetchCities(state.inputText)
            }
            state.showHelper = true
        },
        showHelper(state, action) {
        },
        closeHelper(state, action) {
        },
        addCity(state, action) {
        },
        removeCity(state, action) {
        }

    },
    extraReducers: {
        [fetchCities.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchCities.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.fetchedCities = action.payload
        },
        [fetchCities.rejected]: (state, action) => {}
    }
})

export const {onTextChange} = commonSlice.actions

export default commonSlice.reducer