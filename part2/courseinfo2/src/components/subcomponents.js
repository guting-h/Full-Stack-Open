import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => {
  return <b>Total of {sum.reduce((partialSum, s) => partialSum + s, 0)} exercises </b>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(p => 
      <Part key={p.id} part={p}/>
    )}     
  </>

const Course = ({course}) => 
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.map(p => p.exercises)}/>
  </div>

export default Course