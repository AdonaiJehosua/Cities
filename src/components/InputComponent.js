import {useDispatch, useSelector} from "react-redux";
import {onTextChange, fetchCities} from "../store/commonSlice";
import {useEffect} from "react";


export const InputComponent = () => {
    const dispatch = useDispatch()
    const inputText = useSelector(state => state.common.inputText)
    const showHelper = useSelector(state => state.common.showHelper)
    const helper = document.getElementById('helper')
    const textInput = document.getElementById('textInput')

    const onChange = (e) => {
        dispatch(onTextChange(e.target.value))
    }

    useEffect(() => {
        if (showHelper) {
            helper.show()
            textInput.focus()
        }
        try {
            !showHelper && helper.close()
        } catch (e) {}
    }, [showHelper, helper, textInput])

    useEffect(() => {
        dispatch(fetchCities())

    }, [inputText, dispatch])

    return (
        <>
            <input placeholder={'Start input city name...'} onChange={onChange} value={inputText} id={'textInput'} autoComplete={'off'}/>
        </>
    )
}