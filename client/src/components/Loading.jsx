import gif from "../img/gif.gif"
import "./Loading.css"
export default function Loading(){
    return(
        <div className="loading">
        <img src={gif} alt="loading" width={300}/>
        <h1>Loading...</h1>
        </div>
    )
}