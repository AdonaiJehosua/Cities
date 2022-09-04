import {useDispatch, useSelector} from "react-redux";
import {onTextChange} from "../store/commonSlice";


export const InputComponent = () => {
    const dispatch = useDispatch()
    const inputText = useSelector(state => state.common.inputText)
    const onChange = (e) => dispatch(onTextChange(e.target.value))

    return (
        <>
            <input onChange={onChange} list={'helper'} value={inputText}/>
            <button>Add city</button>
        </>
    )
}