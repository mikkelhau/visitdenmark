import { useEffect, useState } from "react"
import "../css/activity.css"
import redline from "../img/red-line.png"
import stockImg from "../img/filter-hero.png"

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // Funktion der genererer et tal mellem to satte værdier
}

const activityIDs = {
    museum: [6, 10, 12, 13],
    parks: [5, 7, 14, 18, 50],
    architect: [4, 8, 15, 16],
    eatery: [63, 64, 65],
    nightlife: [107]
}

export default function Result(props) {
    const [result, setResult] = useState({}); // Final result
    const [userData, setUserData] = useState({}); // User data
    const [userCategories, setUserCategories] = useState([]);
    const [activityData, setActivityData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("userData");
        setUserData(JSON.parse(data));
    }, [])

    useEffect(() => {
        async function getData() {
            const res = await fetch("data/data.json");
            const data = await res.json();
            setActivityData(data);
        }
        getData();
    }, [])

    useEffect(() => {
        let selectedCategories = userData.categories;
        if (selectedCategories) {
            let modCategory = "";
            for (let i = 0; i < selectedCategories.length; i++) {
                if (selectedCategories[i] === true) {
                    switch (i) {
                        case 0:
                            modCategory += activityIDs.museum;
                            break;
                        case 1:
                            modCategory += activityIDs.parks;
                            break;
                        case 2:
                            modCategory += activityIDs.architect;
                            break;
                        case 3:
                            modCategory += activityIDs.eatery;
                            break;
                        case 4:
                            modCategory += activityIDs.nightlife;
                            break;
                        default:
                            break;
                    }
                    if (modCategory[modCategory.length - 1] !== ",") {
                        modCategory += ","
                    }
                }
            }
            if (modCategory[modCategory.length - 1] === ",") {
                modCategory = modCategory.slice(0, -1)
            }
            modCategory = modCategory.split(",")
            let toInt = []
            for (let i = 0; i < modCategory.length; i++) {
                toInt.push(parseInt(modCategory[i]))
            }
            setUserCategories(toInt);
        }
    }, [userData])

    useEffect(() => {
        if (activityData != null) {
            let sortedArray = [];
            let randomInt = null;
            let data = null;
            for (const activity of activityData) {
                let n = activity.Category.Id;
                if (userCategories.includes(n)) {
                    sortedArray.push(activity)
                }
            }
            randomInt = getRandomInt(0, sortedArray.length)
            const i = sortedArray[randomInt];
            data = { name: i.Name, img: i.Files[0], category: i.Category.Name, description: i.Descriptions[0].Text, address: i.Address.AddressLine1, city: i.Address.PostalCode + " " + i.Address.City };
            setResult(data);
        }
    }, [activityData])

    // console.log(userData, activityData, userCategories)
    return (
        <>
            <section className="hero" style={{backgroundImage: `url(${result.img ? result.img.Uri : stockImg})`}}>
                <div className="border-color"></div>
            </section>
            <div className="info-box">
                <div className="top">
                    <h1>{result.name}</h1>
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                        </svg>
                    </a>
                </div>
                <h2>{result.category}</h2>
                <div className="red-line">
                    <img src={redline} alt="red line divider" />
                </div>
                <p>{result.description}</p>
                <div className="address">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                    </svg>
                    <p>{result.address + ", " + result.city}</p>
                </div>
                <button>Reroll</button>
                <button>Navigate</button>
            </div>
        </>
    )
}