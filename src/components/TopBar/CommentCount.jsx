import React, { useContext } from 'react'
import styled from 'styled-components';
import { CommentsContext } from '../../contexts/CommentsContext';

const Wrapper = styled.div`
  position: absolute;
  width: 20%;
  height: 100%;
  right: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Counts = styled.div`
  position: absolute;
  height: 40%;
  // width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5%;
  background-color: #FFE4C4;
  font-size: 1.4em;
  border-radius: 40%
`
export default function CommentCount() {
  const [comments] = useContext(CommentsContext);

  return (
    <Wrapper>
      <Counts>{comments.length} Comments</Counts>
    </Wrapper>
  )
}