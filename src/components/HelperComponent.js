import {useDispatch, useSelector} from "react-redux";
import {addCity} from "../store/commonSlice";

export const HelperComponent = () => {

    const fetchedCities = useSelector(state => state.common.fetchedCities)
    const dispatch = useDispatch()

    const addCityHandler = (e) => {
        dispatch(addCity(e.target.value))
    }

    if (fetchedCities) {
        return (
            <dialog id='helper'>
                <ul>
                    {fetchedCities.map(el => {
                        return (
                            <li key={el.id}>{el.name}
                            <button value={el.id} onClick={addCityHandler}>Add</button>
                            </li>
                        )
                    })}
                </ul>
            </dialog>
        )
    }
}