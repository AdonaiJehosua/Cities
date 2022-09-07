import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const method = 'GET'
const headers = {
    'Authorization': 'Bearer dYpU7FZYgROR_UUNMqu7Fx1qRLcuNq',
    'Accept-language': 'en'
}

export const fetchCities = createAsyncThunk(
    'common/fetchCities',
    async function (_, {dispatch, getState}) {
        const searchTerm = getState().common.inputText
        if (searchTerm.length > 2) {
            const fullUrl = `https://data-api.oxilor.com/rest/search-regions?searchTerm=${searchTerm}&type=city&first=100`
            const response = await fetch(fullUrl, {method, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так. Попробуйте снова.')
            }
            dispatch(setFetchedCities(data))
            if (response.ok) {
                dispatch(setShowHelper())
            }
        }
    }
)

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        inputText: '',
        showHelper: false,
        status: null,
        error: null,
        fetchedCities: [],
        cities: []
    },
    reducers: {
        onTextChange(state, action) {
            state.inputText = action.payload
        },
        setFetchedCities(state, action) {
          state.fetchedCities = action.payload
        },
        setShowHelper(state) {
            state.showHelper = true
        },
        addCity(state, action) {
            const examCity = state.cities.find(e => e.id === action.payload)
            if (examCity) {
                state.error = 'Such city already exist'
            } else {
                state.error = null
                const newCity = state.fetchedCities.find(e => e.id === action.payload)
                state.cities.push(newCity)
                state.showHelper = false
                state.fetchedCities = []
                state.inputText = ''
            }

        },
        removeCity(state, action) {
            const index = state.cities.findIndex(el => el.id === action.payload)
            state.cities.splice(index, 1)
        }

    },
    extraReducers: {
        [fetchCities.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchCities.fulfilled]: (state, ) => {
            state.status = 'resolved'
        }
    }
})

export const {onTextChange, setFetchedCities, setShowHelper, addCity, removeCity} = commonSlice.actions

export default commonSlice.reducer