import { Link } from "react-router-dom"

export const ErrorPage = () => {
    return (
        <div className="absolute flex flex-col w-screen h-screen items-center justify-center">
            <h1 className="font-extrabold text-9xl text-primary-500/70">404</h1>
            <p className="text-xl mt-4">Lo sentimos, esta página no existe</p>
            <div className="bg-primary-400 text-white w-64 h-8 flex flex-row items-center justify-center rounded mt-16">
                <Link to="/" className="font-semibold text-base">Volver al Inicio</Link>
            </div>
        </div>
    )
}