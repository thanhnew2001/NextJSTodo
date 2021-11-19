import { useRouter } from "next/dist/client/router"
export default function Todo({entry}){

    return (
      <>
        <h1>Page for specific todo: </h1>
        <li> {entry.id}, {entry.title}, {entry.completed} </li>
      </>
    )
}


// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const entries = await res.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = entries.map((entry) => ({
      params: { id: entry.id.toString() },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
    const entry = await res.json()
  
    // Pass post data to the page via props
    return { props: { entry } }
  }
  
