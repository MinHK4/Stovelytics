import React, { useContext } from 'react'
import styled from 'styled-components';

import { PeriodContext } from '../../../contexts/PeriodContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  background-color: yellow;
  padding: 4%;
  width: 300px;
  margin: 1%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15%;
`

const Title = styled.div`
  width: 80px;
  margin: 10px;
  text-align: center;
`

const Icon = styled(FontAwesomeIcon)`
  
`

const Count = styled.div`
  font-weight: 600;

`

export default function IconWithCount({label}) {
  const [period, setPeriod] = useContext(PeriodContext)
  
  var count = 0;
  for(const comment of period){
    if(comment.da === label.name || comment.theme === label.name )
      count++
  }
  
  return (
    <Wrapper style={{backgroundColor: '#E8E0F0'}}>
      <Icon icon={faCoffee} />
      <Title>{label.name}</Title>
      <Count>{count}</Count>
    </Wrapper>
  )
}