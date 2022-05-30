import React, { useContext} from 'react'
import styled from 'styled-components';
import { CommentsContext } from '../../contexts/CommentsContext';
import { PeriodContext } from '../../contexts/PeriodContext';

import LabelButton from './LabelFilter/LabelButton';
import ToggleFilterList from './LabelFilter/ToggleFilterList';

const SentimentLabelList = ['긍정', '중립', '부정']
const ThemeLabelList = ['캐릭터', '아이템', '레이드', '업데이트', '이벤트', '버그', '해킹', '점검', '굿즈', '유저', '회사', '기타']
const DaLabelList = ['질문', '의견', '건의', '인증', '친목', '정보']

const Wrapper = styled.div `
  position: relative;
  width: 100%;
  height: 20%;
  // height: 25%;
  // background-color: pink;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 8px -10px #111;
  // overflow-x: scroll;
`
const SetButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 4;
`
const ShowButton = styled.button`
  position: absolute;
  right: 0;
  top: 15%;
  z-index: 4;
`

export default function LabelFilter() {
  
  const [period, setPeriod] = useContext(PeriodContext)
  const [comments, setComments] = useContext(CommentsContext)
  
  const handleSet = () => {
    const activeSentimentLabels = [];
    const activeThemeLabels = [];
    const activeDaLabels = [];

    const activeEls = document.getElementsByClassName('label active')
    for(const activeEl of activeEls){
      if(SentimentLabelList.includes(activeEl.innerHTML)){
        if(activeEl.innerHTML === '부정')
          activeSentimentLabels.push('-1')
        else if(activeEl.innerHTML === '중립')
          activeSentimentLabels.push('0')
        else if(activeEl.innerHTML === '긍정')
          activeSentimentLabels.push('1')
      }
      if(ThemeLabelList.includes(activeEl.innerHTML))
        activeThemeLabels.push(activeEl.innerHTML)
      if(DaLabelList.includes(activeEl.innerHTML))
        activeDaLabels.push(activeEl.innerHTML)
    }

    setComments(period.filter((comment) => {
      return ( 
        (activeSentimentLabels.length === 0 || activeSentimentLabels.includes(comment['sentiment'])) &&
        (activeThemeLabels.length === 0 || activeThemeLabels.includes(comment['theme'])) &&
        (activeDaLabels.length === 0 || activeDaLabels.includes(comment['da']))
      )
    }))
  }

  const handleReset = () => {
    setComments(period)
    const activeEls = document.getElementsByClassName('label active')
    for(const activeEl of activeEls)
      activeEl.click()
  }

  return (
    <Wrapper>
      
      <SetButton onClick={handleSet}>SET</SetButton>
      <ShowButton onClick={handleReset}>Reset</ShowButton>

      <ToggleFilterList label="Sentiment">
        {SentimentLabelList.map(label => (
          <LabelButton key={label} title={label}/>
        ))}
      </ToggleFilterList>

      <ToggleFilterList label="Theme">
        {ThemeLabelList.map(label => (
          <LabelButton key={label} title={label}/>
        ))}
      </ToggleFilterList>

      <ToggleFilterList label="Dialog Act">
        {DaLabelList.map(label => (
          <LabelButton key={label} title={label}/>
        ))}
      </ToggleFilterList>
    </Wrapper>
  )
}
