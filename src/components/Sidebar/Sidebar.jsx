import React, { useState, useCallback } from 'react'
import Styles from './Sidebar.module.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useError } from '../../hooks/error.hook'

const Sidebar = (props) => {
    toast.configure({
        position: "bottom-left",
        autoClose: 3000,
        draggable: true
    })

    const [city, setCity] = useState("")
    const [results, setResults] = useState([])
    const [show, setShow] = useState(false)
    const errorMessage = useError()

    const handleChange = (e) => {
        setCity(e.target.value)
    }

    const geocode = useCallback(async () => {
        const url = `https://nominatim.openstreetmap.org/search/?format=json&q=${city}`
        const response = await fetch(url)
        if (city === "") {
            errorMessage("Enter a location!")
        } else {
            if (response.ok) {
                response.json().then(data => {setResults(data)})
            }
            setShow(true)
        }
    }, [city, errorMessage])

    const functionHandler = (data) => {
        props.passData(data)
    }

    const elems = results.map(({display_name, type, lat, lon}, i) => {
        const label = JSON.stringify(type).toUpperCase().replace(/['"]+/g, '')
        return(
            <div key={i} onClick={() => {functionHandler([lat, lon]); geocode()}} className={!show ? Styles.item : `${Styles.item} ${Styles.opened}`}>
                <h3 className={Styles.heading}>{display_name}</h3>
                <p className={Styles.label}>Type: {label}</p>
            </div>
        )
    })

    return(
        <div className={Styles.sidebar}>
            <h3 className={Styles.heading}>Find a location</h3>
            <div className={Styles.inputBlock}>
                <input type="text" placeholder="Enter a location" className={Styles.input} onChange={handleChange} />
                <a href="/" className={Styles.link} onClick={e => {e.preventDefault(); geocode()}}><i className="material-icons">search</i></a>
            </div>
            <div className={Styles.result}>
                { elems }
            </div>
        </div>
    )
}

export default Sidebar