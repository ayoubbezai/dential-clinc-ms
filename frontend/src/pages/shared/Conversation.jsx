import React from 'react'
import { useParams } from 'react-router-dom'

const Conversation = () => {
    const { id } = useParams();
    return (
        <div>
            conversation {id}
        </div>
    )
}

export default Conversation
