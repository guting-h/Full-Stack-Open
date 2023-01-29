describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Kagami",
      username: "Hiiragi",
      password: "Kagami"
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://GuTings-MacBook-Pro.local:3000")
  })

  // 5.17
  it("Login form is shown", function() {
    cy.contains("Log in to your account")
    cy.get("#loginForm")
      .should("be.visible")
  })

  // 5.18
  describe("Login",function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("Hiiragi")
      cy.get("#password").type("Kagami")
      cy.get("#loginButton").click()

      cy.contains("Hiiragi logged in")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("Hiiragi")
      cy.get("#password").type("1234")
      cy.get("#loginButton").click()

      cy.contains("Wrong username or password")
    })
  })

  // 5.19
  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: "Hiiragi", password: "Kagami" })
    })

    it("A blog can be created", function() {
      cy.contains("new blog").click()
      cy.get("#title").type("a new blog")
      cy.get("#author").type("an author")
      cy.get("#url").type("urlexample.com")
      cy.contains("post blog").click()

      cy.contains("a new blog by an author")
    })

    describe("When list has one blog", function() {
      beforeEach(function() {
        cy.postBlog({
          title: "a new blog",
          author: "an author",
          url: "urlexample.com"
        })
      })

      // 5.20
      it("A blog can be liked", function() {
        cy.contains("view").click()
        cy.get(".blog")
          .contains("like").click()

        cy.get(".blog")
          .contains("likes: 1")
      })

      //5.21
      it("A blog can be deleted by user who created it", function() {
        cy.contains("view").click()
        cy.get(".blog")
          .contains("remove blog").click()

        cy.get(".blog").should("not.exist")
      })

      // 5.21 optional
      it("A blog cannot be deleted by other users", function() {
        cy.contains("Logout").click()
        const user = {
          name: "anonymous",
          username: "anonymous",
          password: "anonymous"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.login({ username: "anonymous", password: "anonymous" })
        cy.get(".blog")
          .should("not.contain", "remove blog")
      })
    })

    // 5.22
    it("Blogs are sorted by likes in descending order", function() {
      cy.postBlog({ title: "one", author: "one", url: "one" })
      cy.postBlog({ title: "two", author: "two", url: "two" })
      cy.postBlog({ title: "three", author: "three", url: "three" })

      cy.get(".blog").eq(1)
        .contains("view").click()
      cy.get(".blog").eq(1).contains("like").click()
      cy.get(".blog").eq(0).contains("like").click()

      cy.get(".blog").eq(2)
        .contains("view").click()
      cy.get(".blog").eq(2).contains("like").click()
      cy.get(".blog").eq(1).contains("like").click()
      cy.get(".blog").eq(1).contains("like").click()

      cy.get(".blog").eq(0).should("contain", "three")
      cy.get(".blog").eq(1).should("contain", "two")
    })
  })
})