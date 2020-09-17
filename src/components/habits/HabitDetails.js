import React, { useContext, useEffect, useState } from "react"
import { HabitContext } from "./HabitProvider"
import { HabitRepContext } from "../habitReps/HabitRepProvider"


export const HabitDetails = (props) => {
    const { deleteHabit, getHabitById, archiveHabit } = useContext(HabitContext)
    const { addHabitRep } = useContext(HabitRepContext)

    const [habit, setHabit] = useState({ color: {} })


    useEffect(() => {
        const habitId = parseInt(props.match.params.habitId)
        getHabitById(habitId)
            .then(setHabit)
    }, [])

    return (
        <section className="habit">
            <h3 className="habitName">{habit.name}</h3>
            <div className="habitDate">Start Date: {habit.startDate}</div>
            <div className="habitFrequency">Frequency goal: {habit.frequency}</div>
            <div className="habitDetails">Details: {habit.details}</div>
            <div className="habitColor">Color: {habit.color.color} </div>
            <button onClick={() => {
                addHabitRep({
                    habitId: habit.id,
                    dateTimeDone: Date.now()
                })
                    .then(() => props.history.push("/main"))
            }}>Done!</button>
            
            <button onClick={() => {
                props.history.push(`/habits/${habit.id}/addHabitReps`)             
            }}>Add Previous Reps</button>

            <button onClick={() => deleteHabit(habit.id).then(() => props.history.push("/main"))} >Delete</button>
            <button onClick={() => archiveHabit(habit.id).then(() => props.history.push("/habits/archivedHabits"))} >Save for later</button>
            <button onClick={() => {
                props.history.push(`/habits/edit/${habit.id}`)
            }}>Edit</button>
            <button onClick={() => {
                props.history.push(`/habits/${habit.id}/notes/create`)
            }}>Add a note</button>
        </section>
    )
}