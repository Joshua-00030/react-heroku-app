const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="josh"/>
    </>    
  )
}
export default App