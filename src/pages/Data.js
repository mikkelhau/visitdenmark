import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css"

export default function DataPage(props) {
    const [formData, setFormData] = useState({ location: "", radius: "1000", categories: [] });
    let navigate = useNavigate();

    function handleChange(event) {
        const value = event.target.value;
        let checkBoxData = formData.categories;

        let i = 0;
        document.querySelectorAll('input[type=checkbox]').forEach(element => {
            checkBoxData[i] = element.checked;
            i++;
        });

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: value
            }
        })
    }

    function submitData(event) {
        event.preventDefault();
        const validForm = formData.location !== "" && formData.radius && formData.categories;
        if (validForm) {
            localStorage.clear();
            localStorage.setItem("userData", JSON.stringify(formData));
            navigate('/result');
        } else {
            // Error message goes here
        }
    }

    return (
        <>
            <section className="hero">
                <div className="border-color"></div>
            </section>
            <form onSubmit={submitData}>
                <h2>Feeling adventurous?</h2>
                <p>Fill in the details, and we'll pick an activity for you!</p>
                <div>
                    <input type="text" value={formData.location} onChange={handleChange} name="location" placeholder="Your location" />
                    <label>
                        <select name="radius" onChange={handleChange} value={formData.radius}>
                            <option value="250">250 m</option>
                            <option value="500">500 m</option>
                            <option value="1000">1 km</option>
                            <option value="2500">2.5 km</option>
                            <option value="5000">5 km</option>
                        </select>
                    </label>
                </div>
                <div>
                    <input type="checkbox" onChange={handleChange} id="museums" name="museums"></input>
                    <label htmlFor="museums">Museums</label><br />
                    <input type="checkbox" onChange={handleChange} id="parks" name="parks"></input>
                    <label htmlFor="parks">Parks & Gardens</label><br />
                    <input type="checkbox" onChange={handleChange} id="architecture" name="architecture"></input>
                    <label htmlFor="architecture">Architecture & Historical Places</label><br />
                    <input type="checkbox" onChange={handleChange} id="placestoeat" name="placestoeat"></input>
                    <label htmlFor="placestoeat">Restaurants & Places to eat</label><br />
                    <input type="checkbox" onChange={handleChange} id="nightlife" name="nightlife"></input>
                    <label htmlFor="nightlife">Nightlife & Clubs</label>
                </div>
                <input type="submit" value="Explore!" />
            </form>
        </>
    )
}