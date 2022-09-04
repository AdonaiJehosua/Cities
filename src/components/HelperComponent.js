import {useSelector} from "react-redux";

export const HelperComponent = () => {

    const fetchedCities = useSelector(state => state.common.fetchedCities)

    if (fetchedCities) {
        return (
            <dialog id='helper'>
                <ul>
                    {fetchedCities.map(el => {
                        return (
                            <li>{el.name}</li>
                        )
                    })}
                </ul>
            </dialog>
        )
    }
}