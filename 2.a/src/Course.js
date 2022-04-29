const Course = (props) =>{
    const ulList = props.course.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
        )
    
    const total = props.course.parts.reduce((sum, part) => sum +part.exercises, 0)

    return(
        <div>
            <h1>
                {props.course.name}
            </h1>
            {ulList}
            <b>total of {total} exercises</b>
        </div>
    )
}
export default Course