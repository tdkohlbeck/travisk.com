import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Svg from '../svg'

function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const row_height = 1

const LinkRowContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`
const Title = styled.div`
	display: flex;
	font-size: 2.5em;
	font-weight: bolder;
	font-family: sans-serif;
	flex: 1 1 auto;
	color: #fafafa
	box-sizing: border-box;
	text-decoration: unset;
	padding-bottom: 0.1em;
	&:hover {
		text-decoration: underline dashed #fafafa;
	}
`
const Space = styled.div`
	font-size: 2.5em;
	font-weight: bolder;
	font-family: sans-serif;
	visibility: hidden;
	flex: 1 1 auto;
`
const SpaceUnbalanced = styled.div`
	font-size: 2.5em;
	font-weight: bolder;
	font-family: sans-serif;
	visibility: hidden;
	width: 4em;
`
function LinkRow(props) {
	let space = <Space>{props.to}</Space>
	if (props.unbalanced) space = null
	return (
		<LinkRowContainer style={{justifyContent: props.unblanced ? 'flex-start' : 'center'}}>
			{ props.left 
				? <Title>{props.to}</Title> 
				: space
			}
			<Icon style={{...props.style}}>{props.children}</Icon>
			{ props.left 
				? space
				: <Title>{props.to}</Title>
			}
		</LinkRowContainer>
	)
}

const Page = styled.div`
position: fixed;
width: 100%;
top: 0;
bottom: 0;
z-index: 1;
display: flex;
flex-direction: column;
justify-content: flex-start;
background-color: #1a1a1a;
`
const Icon = styled.svg`
	display: flex;
	margin: 0em 1em;
	fill: ${props => (props.fill ? props.fill : '#fafafa')};
	width: ${props => (props.width ? props.width : '4em')};
	height: ${props => (props.width ? props.width : '4em')};
	padding-left: ${props => props.paddingLeft}
`
const A = styled.a`
	outline: none;
	text-decoration: none;
`
const SLink = styled(Link)`
	text-decoration: none;
`

function Home(props) {
	const size = useWindowSize()
	const unbalanced = true

	return (
		<Page style={{alignItems: unbalanced ? 'flex-end' : 'center'}}>
			<SLink style={{textDecoration: 'none'}} to='/about'>
				<LinkRow style={{paddingLeft: '0.3em'}} left unbalanced={unbalanced} to='About'>
					<Icon
						width={Svg.about.width}
						fill={props.palette}
						viewBox={Svg.about.viewbox}>
						<path d={Svg.about.path} />
					</Icon>
				</LinkRow>
			</SLink>

			<SLink to='projects'>
				<LinkRow style={{paddingLeft: '0.15em'}} left unbalanced={unbalanced} to='Projects'>
					<Icon
						width={Svg.projects.width}
						fill={props.palette}
						viewBox={Svg.projects.viewbox}>
						<path d={Svg.projects.path} />
					</Icon>
				</LinkRow>
			</SLink>

			<A href='https://hire.travisk.info'>
				<LinkRow left={unbalanced} unbalanced={unbalanced} to='Resume'>
					<Icon
						width={Svg.resume.width}
						fill={props.palette}
						viewBox={Svg.resume.viewbox}>
						<path d={Svg.resume.path} />
					</Icon>
				</LinkRow>
			</A>

			<SLink to='/contact'>
				<LinkRow style={{paddingLeft: '0.5em'}} left={unbalanced} unbalanced={unbalanced} to='Contact'>
					<Icon
						width={Svg.contact.width}
						fill={props.palette}
						paddingLeft='0.3em'
						viewBox={Svg.contact.viewbox}>
						<path d={Svg.contact.path} />
					</Icon>
				</LinkRow>
			</SLink>
		</Page>
	)
}

export default Home
