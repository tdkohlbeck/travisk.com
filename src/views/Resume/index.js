import React, { Component } from 'react'
import my from '../../personal.config.js'
import styled from 'styled-components'
import './Resume.css';

import Page from '../../components/Page'

const Header = () => (
  <div className='header'>
    <h1>Travis Kohlbeck</h1>
    <div className='contact-info'>
      <span>github.com/tdkohlbeck</span>
      <span>me@travisk.com</span>
    </div>
  </div>
)

const Section = (props) => (
  <div className='section'>
    <h2 className='section title'>{props.title}</h2>
    {props.children}
  </div>
)

const Details = (props) => (
  <div className='details'>
    <span className='left'>
      <b>{props.credential}</b>
      <br />
      <span>{props.organization}, </span><wbr />
      <span>{props.location}</span>
    </span>
    <span className='right'>
      <i>
        <span>{props.start}—</span>
        <wbr />
        <span>{props.end}</span>
      </i>
    </span>
  </div>
)

const Heart = styled.span`
  position: relative;
  font-size: .5em;
  color: ${props => props.color ? props.color : '#1a1a1a'};
  top: -0.3em;
  padding: ${props => props.first ? '.33em' : '1em'};
`
function HeartSeparatedList(list, color) {
  let items = list.map( (item, i) => (
    i === 0 ? <span style={{overflowWrap: 'break-word'}} key={i}><Heart color={color}></Heart>{item}</span> :
      <span style={{overflowWrap: 'break-word'}} key={i}><Heart color={color}><span aria-label='heart' role='img'>♥</span></Heart>{item}</span>
  ))
  return (
    <span>
      {items}
    </span>
  )
}

class Resume extends Component {
  render() {
    return (
      <Page palette={this.props.palette}>
      <div className="resume">
        <Header />
        <Section title='Experience'>
          <Details
            credential={my.job.title}
            organization={my.job.company}
            location={my.job.location}
            start={my.job.duration[0]}
            end={my.job.duration[1]}
          />
          <ul>
            {my.job.bullets.map( (item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Section>
        <Section title='Portfolio'>
          <ul>
            <li><b>{my.portfolio.names[0]}: </b>{my.portfolio.bullets[0]}</li>
            <li><b>{my.portfolio.names[1]}: </b>{my.portfolio.bullets[1]}</li>
            <li>{my.portfolio.bullets[2]}</li>
            <li>{my.portfolio.bullets[3]}</li>
          </ul>
        </Section>
        <Section title='Technical'>
          <ul>
            <li>
              <b>Languages: </b>{HeartSeparatedList(my.knowledge.languages, this.props.palette.text)}
            </li>
            <li><b>Practices: </b>{HeartSeparatedList(my.knowledge.practices, this.props.palette.text)}</li>
            <li><b>Technologies: </b>{HeartSeparatedList(my.knowledge.technologies, this.props.palette.text)}</li>
          </ul>
        </Section>
        <Section title='Education'>
          <Details
            credential={my.education.degree}
            organization={my.education.institute}
            location={my.education.location}
            start={my.education.duration[0]}
            end={my.education.duration[1]}
          />
          <ul>
            {my.education.bullets.map( (bullet, i) => <li key={i}>{bullet}</li>)}
          </ul>
        </Section>
      </div>
      </Page>
    );
  }
}

export default Resume;