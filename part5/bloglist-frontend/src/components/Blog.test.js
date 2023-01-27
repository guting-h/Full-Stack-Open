import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
  let container

  const blog = {
    title: "an example blog",
    author: "me",
    url: "https://fullstackopen.com/en/part5/",
    likes: 10,
    user: { name: "Tomato", username: "carrot2" }
  }

  const user = {
    name: "Carrot Tomatoson",
    userID: "63a02f1d273621e4bf0c18cf",
    username: "carrot2"
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user}/>).container
  })

  // 5.13
  test("renders blog's title and author only", () => {
    const div = container.querySelector(".blog")
    const hiddenPart = container.querySelector(".toggledContent")

    expect(div).toHaveTextContent(
      "an example blog"
    )
    expect(div).toHaveTextContent(
      "me"
    )
    expect(hiddenPart).not.toBeVisible()
  })

  // 5.14
  test("clicking show button causes URL and likes to be visible", async () => {
    // check first that the hidden part is not visible
    let hiddenPart = container.querySelector(".toggledContent")
    expect(hiddenPart).not.toBeVisible()

    const user1 = userEvent.setup()
    const button = screen.getByText("view")
    await user1.click(button)

    // check that after the view button is clicked the contents are visible
    hiddenPart = container.querySelector(".toggledContent")
    expect(hiddenPart).toBeVisible()
  })

})

// 5.15
test("clicking like button correctly calls the event handler", async () => {
  const mockHandler = jest.fn()

  const blog = {
    title: "an example blog",
    author: "me",
    url: "https://fullstackopen.com/en/part5/",
    likes: 10,
    user: { name: "Tomato", username: "carrot2" }
  }

  const user = {
    name: "Carrot Tomatoson",
    userID: "63a02f1d273621e4bf0c18cf",
    username: "carrot2"
  }

  render(<Blog blog={blog} user={user} incrementLikes={mockHandler}/>)

  const user1 = userEvent.setup()
  const button = screen.getByText("like")
  await user1.click(button)
  await user1.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
