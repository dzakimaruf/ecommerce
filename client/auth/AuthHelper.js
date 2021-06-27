const auth = {
  isAuthenticated() {
      if (typeof window !== "undefined") {
          if (localStorage.getItem('userInfo'))
              return JSON.parse(localStorage.getItem('userInfo'))
          else return false
      }
      else return false
  },
}

export default auth