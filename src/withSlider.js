import React from 'react'
import styled , {keyframes} from 'styled-components'
import {partial} from 'ramda'
import {withState, withHandlers, compose} from 'recompose'

const prop = (key, defaultVal) => props => props[key] ? props[key] : defaultVal
const propBoolPred = (key, whenTrue, whenFalse, defaultVal) => props => {
  if (typeof(props[key]) === 'boolean')
    return props[key] ? whenTrue : whenFalse
  else {
    return defaultVal
  }
}

const addOpen = compose(
  withState('open', 'setOpen', false),
  withHandlers({
    onOpen: ({ setOpen }) => () => setOpen(true),
    onClose: ({ setOpen }) => () => setOpen(false),
  })
)

const CloseStyle = styled.a.attrs({
    href: 'javascript:void(0)',
  })`
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    color: #818181;
    text-decoration: none;
`

const slideIn2 = keyframes`
    //0% { transform: translateX(1); }
    100% { transform: translateX(-100%)
`

const slideOut2 = keyframes`
    //0% { transform: translateX(1); }
    100% { transform: translateX(100%)
`

const slideOut = keyframes`
  100% { left: 0; }
`;

const slideOut3 = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
`

const slideIn3 = keyframes`
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const slideIn = keyframes`
  100% { left: ; -600}
`;
const SideNavStyle = styled.div`    
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
//   left: -100%;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  //transition: ${prop('transition', '0.5s')}
  //transform: rotate(90deg);
  animation: ${props => props.open ? `${slideIn3} 1s forwards` : `${slideOut3} 1s forwards`}
//animation: ${props => props.open ? `${slideOut} ${prop('transition', '0.5s')(props)} forwards` : `${slideIn} 1s forwards`}
  padding-top: 60px;
  text-align:center;
`




// const SideNavStyle = styled.div`    
//   height: 100%;
//   width: ${propBoolPred('open', '100%', 0, 0)}
//   position: fixed;
//   z-index: 1;
//   top: 0;
//   left: 0;
//   background-color: white;
//   overflow-x: hidden;
//   transition: ${prop('transition', '0.5s')}
//   padding-top: 60px;
//   text-align:center;
// `

const withSlider = WrappedComponent => props => {
  const { open, onClose, transition, ...passThroughProps } = props;
  return (
    <SideNavStyle transition={transition} open={open} >
      <CloseStyle onClick={partial(onClose, [false])} >x</CloseStyle>
      <WrappedComponent  {...passThroughProps} />
    </SideNavStyle >
  )
}

export {withSlider, addOpen}


