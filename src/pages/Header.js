import logo from '../img/logo.png'

export default function Header(props) {
    return (
        <>
            <header>
                <div className="logo">
                    <a href="/">
                        <img src={logo} alt="VisitDenmark Logo" />
                    </a>
                </div>
            </header>
        </>
    )
}