import { Actions } from "./Actions"

export const BottomNavbar = () => {
    return (
        <div className="fixed bottom-0 w-full bg-white shadow shadow-primary-500">
            <Actions className="flex flex-row align-middle md:hidden h-12 w-full justify-around"/>
        </div>
    )
}