import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

const RandomPosts = props => {
  const randomSelect = (array, num) => {
    let newArray = []

    while (newArray.length < num && array.length > 0) {
      const rand = Math.floor(Math.random() * array.length)
      newArray.push(array[rand])
      array.splice(rand, 1)
    }

    return newArray
  }

  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost {
        nodes {
          title
          slug
          id
        }
      }
    }
  `)

  const baseposts = data.allContentfulBlogPost.nodes.filter(
    node => node.id !== props.id
  )
  const randomposts = randomSelect(baseposts, props.a_number)

  return (
    <div className="randomposts">
      <h3>おすすめ記事（Random Pickup）</h3>
      <ul>
        {randomposts.map(node => {
          return (
            <li key={node.slug}>
              <Link to={`/blog/post/${node.slug}/`}>{node.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RandomPosts
