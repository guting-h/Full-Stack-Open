import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

// 5.16
test("<BlogForm /> calls event handler with the right details when submitted", async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const newBlog = {
    title: "a test blog",
    author: "me",
    url: "https://fullstackopen.com/en/part5/",
  }

  const container = render(<BlogForm createBlog={createBlog}/>).container

  const titleInput = container.querySelector("#title")
  const authorInput = container.querySelector("#author")
  const urlInput = container.querySelector("#url")
  const sendButton = screen.getByText("post blog")

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
})
