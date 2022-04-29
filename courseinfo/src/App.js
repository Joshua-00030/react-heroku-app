const App = () => {  
  const course = 
  {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
  ]
}

  return (
    <div>
      <h1>{course.name}</h1>
      {/*<Content classlist={[part1,part2,part3]} exe={[exercises1,exercises2,exercises3]} />
      <Total exercises={exercises1 + exercises2 + exercises3}/>*/}
      <CInfo list =  {course.parts} />
      <CTotal list = {course.parts} />
    </div>
  )
}

const CInfo = (props) =>{
  return(
      props.list.map(C => 
        <p key={C.name}>
          {C.name} {C.exercises}
        </p>
      )
    )
}

const CTotal = (props =>{
  let count = 0
  props.list.forEach(element => {
    count += element.exercises
  });
  return(
      <p>Number of exercises {count}</p>
    )
})

const Content = (props) => {
  return(
    <>
      <Part class={props.classlist[0]} exe={props.exe[0]} />
      <Part class={props.classlist[1]} exe={props.exe[1]} />
      <Part class={props.classlist[2]} exe={props.exe[2]} />
    </>
  )
}

const Part = (props) =>{
  return(
    <p>
      {props.class} {props.exe}
    </p>

  )
}

const Total = (props)=> {
  return(
    <>
      <p>
      </p>    
    </>
  )
}
export default App