import {useCallback, useState} from "react";

const rootUrl = 'https://data-api.oxilor.com/rest'
const apiKey = 'dYpU7FZYgROR_UUNMqu7Fx1qRLcuNq'

const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Accept-language': 'en'
}

const method = 'GET'


export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchCities = useCallback(async (searchTerm) => {
        if (searchTerm) {
            setLoading(true)
            try {
                const fullUrl = `${rootUrl}/search-regions?searchTerm=${searchTerm}&type=city&first=100`
                const response = await fetch(fullUrl, {method, headers})
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Что-то пошло не так. Попробуйте снова.')
                }
                setLoading(false)
                return data
            } catch (e) {
                setLoading(false)
                setError(e.message)
                throw e
            }
        }

    }, [])

    const fetchCity = useCallback(async (id = '') => {
        setLoading(true)
        try {
            const fullUrl = `${rootUrl}/region?id=${id}`
            const response = await fetch(fullUrl, {method, headers})
            const data = await response.json()
            if (!response.ok) {throw new Error(data.message || 'Что-то пошло не так. Попробуйте снова.')}
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }

    }, [])

    const clearError = () => setError(null)

    return {loading, fetchCities, fetchCity, error, clearError}
}