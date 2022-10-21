import styled from 'styled-components';

const StyledVideo = styled.div`
display: inline-block;
float: left;
margin:2%;
min-width: 20%;
max-width: 300px;
min-height: 150px;
background-color: coral;
border: solid;
margin-bottom: 5px;
`
const Video = ({video}) => (
  <StyledVideo>
    <b>{video.title}</b>
    <br></br>By: {video.author}<br></br><br></br>
  </StyledVideo>  
)

export default Video