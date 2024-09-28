import React from 'react'
import { Link } from 'react-router-dom'

const LinkComponent = ({classname,to,children,color}) => {
  return (
   <Link className={`${color} rounded text-white font-bold p-2 text-md mt-2 text-center hover:scale-105 ${classname} trasnform transition-transform duration-300`} to={to}>{children}</Link>
  )
}

export default LinkComponent