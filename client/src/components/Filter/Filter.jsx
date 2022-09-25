import React from "react";
import "./Filter.css";
import { useDispatch } from "react-redux";
import { getByDiet } from "../../actions";

export default function Filter(){
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getByDiet());
      }

    return(

        <button onClick={handleSubmit}>vegan</button>
    )

}