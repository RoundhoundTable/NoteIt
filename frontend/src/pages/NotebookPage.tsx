import { NotebookHeader } from "../components/NotebookHeader"
import { Feed } from "../components/Feed"
import { NotebookDetails } from "../components/NotebookDetails"
import { useState } from "react"

export const NoteBookPages = () => {
    const [ editMode, setEditMode ] = useState<boolean>(false)
    
    const editModeToggler = () => setEditMode(!editMode)

    return (
        <div>
            <NotebookHeader isEditMode={editMode} editModeToggler={editModeToggler}/>
            <div className="flex flex-col-reverse md:flex-row">
                <div className="w-full md:w-2/3">
                    <Feed/>
                </div>
                <NotebookDetails isEditMode={editMode}/>
            </div>
        </div>
    )
}