import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import {
	Route,
	Link,
	Switch,
	Redirect,
} from 'react-router-dom'

import Resume from './views/Resume'
import Home from './views/Home'
import About from './views/About'
import Contact from './views/Contact'
import Projects from './views/Projects'
import Cats from './views/Cats'
import Bookmarks from './views/Bookmarks'

import DarkModeToggle from './components/Toggle'
import Navbar from './components/NavBar'

import Svg from './svg'
import { getRandomHslColorScheme } from './utils'

import './App.css'

const light_palette = {
	theme: 'light',
	primary: '#fafafa',
	secondary: 'whitesmoke',
	top_bar_shadow: 'lightgrey',
	signature: '#1a1a1a',
	bg: '#fafafa',
	text: '#1a1a1a',
}
const dark_palette = {
	theme: 'dark',
	primary: '#1a1a1a',
	secondary: '#1a1a1a',
	top_bar_shadow: '#1a1a1a',
	signature: '#fafafa',
	bg: '#1a1a1a',
	text: '#fafafa',
}

const Block = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
`
const StyledLink = styled(Link)`
	display: flex;
	transition: 0.025s linear;
	&:hover {
		transform: scale(0.95);
	}
	-webkit-tap-highlight-color: transparent;
	&:focus {
		outline: none;
	}
	&:active {
		background-color: none;
	}
`
const Icon = styled.svg`
	display: flex;
	margin: 1em;
	fill: ${props => (props.fill ? props.fill : '#1a1a1a')};
	width: ${props => (props.width ? props.width : '4em')};
	@media (max-width: 350px) {
		margin: 1em 0.5em;
	}
`
const Content = Block.extend`
	position: relative;
	display: block;
	overflow-x: hidden;
	font-size: 1em;
	padding-top: ${window.location.search ? 0 : '4em'};
	background-color: ${props => props.bg_color};
`
class App extends Component {
	constructor() {
		super()
		this.state = {
			darkMode: false,
			colors: getRandomHslColorScheme(8),
		}
		this.toggleDarkMode = this.toggleDarkMode.bind(this)
		this.NoMatch = this.NoMatch.bind(this)
	}

	toggleDarkMode() {
		this.setState({
			darkMode: !this.state.darkMode,
			colors: getRandomHslColorScheme(
				8,
				!this.state.darkMode
			),
		})
	}

	NoMatch(location) {
		return (
			<div>404 | {location.pathname} does not exist</div>
		)
	}

	render() {
		console.log(window.location.search)
		const palette = this.state.darkMode
			? dark_palette
			: light_palette
		return (
			<Fragment>
				<Content bg_color={palette.bg}>
					<Switch>
						<Route exact path='/'>
							<Home
								palette={palette}
								colors={this.state.colors}
							/>
						</Route>
						<Route exact path='/about'>
							<About palette={palette} />
						</Route>
						<Route exact path='/contact'>
							<Contact palette={palette} />
						</Route>
						<Route exact path='/projects'>
							<Projects palette={palette} />
						</Route>
						<Route exact path='/resume'>
							<Resume palette={palette} />
						</Route>
						<Route exact path='/cat-pics'>
							<Cats palette={palette} />
						</Route>
						<Route exact path='/links'>
							<Bookmarks palette={palette} />
						</Route>
						<Redirect from='/mathtutor' to='/mathtutor' />
						<Redirect
							from='/resume-sas-20029284'
							to='/resume-sas-20029284'
						/>
						<Route component={this.NoMatch} />
					</Switch>
				</Content>
				<Navbar
					style={{ border: '1px solid red' }}
					left_color={palette.primary}
					right_color={palette.secondary}
					logo_color={palette.signature}
					shadow_color={palette.top_bar_shadow}
				>
					<StyledLink to='/about'>
						<Icon
							width={Svg.about.width}
							fill={palette.signature}
							viewBox={Svg.about.viewbox}
						>
							<path d={Svg.about.path} />
						</Icon>
					</StyledLink>
					<StyledLink to='/contact'>
						<Icon
							width={Svg.contact.width}
							fill={palette.signature}
							viewBox={Svg.contact.viewbox}
						>
							<path d={Svg.contact.path} />
						</Icon>
					</StyledLink>
					<StyledLink to='/projects'>
						<Icon
							width={Svg.projects.width}
							fill={palette.signature}
							viewBox={Svg.projects.viewbox}
						>
							<path d={Svg.projects.path} />
						</Icon>
					</StyledLink>
					<StyledLink to='/resume'>
						<Icon
							width={Svg.resume.width}
							fill={palette.signature}
							viewBox={Svg.resume.viewbox}
						>
							<path d={Svg.resume.path} />
						</Icon>
					</StyledLink>
				</Navbar>
				<DarkModeToggle
					toggle={this.toggleDarkMode}
					isDarkModeOn={this.state.darkMode}
				/>
			</Fragment>
		)
	}
}

export default App
