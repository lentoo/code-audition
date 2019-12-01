import client from "@/utils/graphql-client";

export function scanLogin(unicode: string, loginToken: string) {
  return client({
    qgl: `
    mutation ($unicode: String!, $loginToken: String!) {
      scanLogin (
        unicode: $unicode, 
        loginToken: $loginToken
      ) {
        code
        msg
        data
      }
    }
    `,
    variables: {
      unicode,
      loginToken
    }
  });
}

export function confirmLogin(unicode: string, token: string) {
  return client({
    qgl: `
    mutation ($unicode: String!, $token: String!) {
      confirmLogin (unicode: $unicode, token: $token) {
        code
        msg
      }
    }
    `,
    variables: {
      unicode,
      token
    }
  });
}

export function cancelLogin(unicode: string) {
  return client({
    qgl: `
    mutation ($unicode: String!) {
      cancelLogin (unicode: $unicode) {
        code
        msg
        data
      }
    }
    `,
    variables: {
      unicode
    }
  });
}

export function loginOut() {
  return client({
    qgl: `
    mutation {
      loginOut {
        code
        msg
        data
      }
    }
    `
  });
}
