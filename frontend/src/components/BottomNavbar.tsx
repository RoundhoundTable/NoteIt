import { Actions } from "./Actions"

export const BottomNavbar = () => {
    return (
        <div className="sticky bottom-0 w-full bg-white shadow shadow-primary-500">
            <Actions className="flex flex-row align-middle w-full justify-around"/>
        </div>
    )
}