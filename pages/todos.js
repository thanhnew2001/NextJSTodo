import { useEffect, useState } from "react"
import Link from 'next/link'

export default function Todos({entries}){

    return (
        <div>
        <h1>List of todos</h1>

        {entries.map(e=>{
           return (
            <>
            <li>{e.id}, {e.title}</li>
            <Link href={`/todo/${e.id}`}>{e.title}</Link>
            </>
           )
        })}
       
        </div>
    )
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const entries = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        entries,
      },
    }
  }