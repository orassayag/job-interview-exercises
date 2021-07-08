/*
1. You have 2 components: app and events list, how would you implement it by components? Where do you keep the state?
2. You have 3 components: app, and 2 events list, how would you implement it by components? Where do you keep the state?
3. You now have 4 components: app, toolbar to filter the events, and 2 events list. how would you implement it by components? Where do you keep each state?
4. What are the 4 cases of rendering componet?
5. Do you know the useMemo and the useCallback hooks? explain what's the difference between them.
6. How do you work with CSS?
7. Do you know styled components? What is it?
8. What is memorization in Redux?
9. Redux Saga / Redux Thunk - How do you do async calls
10. Layers in Node.js, Explain. What is the advantage of this?
11. How does JWT work?
12. Explain the flow of creation JWT. Where do you keep it? Do you use salt? What does the JWT look like? What is created from?
    What's the token hold? What are the parts of the token? The token will be created with expiration? What about refresh tokens?
13. How do you keep the password? Do you hash with salt?
14. Where do you keep the token in React?
15. Where do you keep the token in jQuery? (cookies / localStorage).
16. What is the disadvantage to keeping the token in the localStorage?
17. You sent me the token in the email, do you have something to do with it? Can you read it?
18. What is the concept of JWT? What is the main advantage?
19. What are the differences between a relations database and non-relational database?
20. What are the advantages of relational databases and what are the advantages of non-relational databases?
21. What is the difference between MongoDB and a key-value database?
22. How do you fetch one object from an array of objects in JavaScript?
23. How do you fetch many objects with conditions from an array of objects in JavaScript?
24. How do you sum numbers in JavaScript?
25. What is the difference between doing async await in a loop to use Promise.all.
*/

/*
1. In the app component you will fetch the events by axios/fetch within the useEffect hook (no dependencies).
   Once you got the events list from the server, you will keep the events list in the state, by using the useState hook.
2. In the app component you will fetch the events by axios/fetch within the useEffect hook (no dependencies).
   Once you got the events list from the server, you will keep the events list in the state, by using the useState hook.
   You can pass the events list array as property to the 2 lists, or can store in Redux, and inside the components
   to use useSelector to get the events list array from Redux state piece.
3. In the app component you will fetch the events by axios/fetch within the useEffect hook.
   You will do this by filtering parameters what will be kept in the state, also in the app component (or in Redux).
   The filter state will be pass to the toolbar by props/Redux.
   You will have dependencies, that only relevant filter changes will cause to re-use the useEffect hook.
   You will wraps the events lists components within React.memo not to re-render when filter state will changes.
4. a. Parent component changed.
   b. Relevant state changes.
   c. Props that the components received has been changed.
   d. useContext has been changed.
5. -With useCallback you can define a function that has referential equality between renders.
   -You can use useMemo to calculate a value that has referential equality between renders.
   In other words, useCallback returns a memoized callback. It gives you referential equality between renders for functions,
   and useMemo returns a memoized value. It gives you referential equality between renders for values.
   useCallback and useMemo both expect a function and an array of dependencies.
   The difference is that useCallback returns its function when the dependencies change while
   useMemo calls its function and returns the result.
   So what is the difference? useCallback returns its function uncalled so you can call it later,
   while useMemo calls its function and returns the result.
6. You can work either with inline styling (withStyle or inline objects), you can use css-modules, or with simple SCSS files.
7. styled-components allows you to write actual CSS code to style your components.
   It also removes the mapping between components and styles – using components as a
   low-level styling construct could not be easier.
8. A 'selector' is any function that accepts the Redux state tree as an argument, and
   returns some extracted or derived data. That includes plain functions like you showed.
   In many cases, you want to memoize the calculation of the results, such as mapping
   over an array of items, so that it's not re-calculated unless the inputs have changed.
   Reselect's createSelector creates memoized selector functions that only recalculate
   the output if the inputs change. Reselect is a great library for doing that. You have it
   also in redux toolkit.
9.
   You'd still use an async middleware (typically redux-thunk), fetch data, and dispatch actions with the results.
   As of Redux Toolkit 1.3, we do have a helper method called createAsyncThunk that generates
   the action creators and does request lifecycle action dispatching for you, but it's still the same standard process.
   This sample code from the docs sums up the usage;

   import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
   import { userAPI } from './userAPI'

    // First, create the thunk
    const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
        const response = await userAPI.fetchById(userId)
        return response.data
      }
    )

   // Then, handle actions in your reducers:
   const usersSlice = createSlice({
   name: 'users',
   initialState: { entities: [], loading: 'idle' },
   reducers: {
        // standard reducer logic, with auto-generated action types per reducer
   },
   extraReducers: {
   // Add reducers for additional action types here, and handle loading state as needed
   [fetchUserById.fulfilled]: (state, action) => {
     // Add user to the state array
     state.entities.push(action.payload)
       }
    }
    })

   // Later, dispatch the thunk as needed in the app
   dispatch(fetchUserById(123))

   ///////////////////

   createAsyncThunk vs useEffect hook:
   The two setups are essentially similar. You can do the same thing with both approaches.
   With the codes exactly as you have them written here, there is a major advantage to the createAsyncThunk
   approach because it will catch any errors that occur in the API call. It will respond to those errors
   by dispatching a fetchUserById.rejected action instead of a fetchUserById.fulfilled action. Your reducer
   doesn't responded to the rejected case which is fine. The error is still caught. With your useEffect
   you run the risk of "uncaught error in Promise" errors.
   Now of course you can catch the errors on your own. You can also dispatch a pending action at the start
   of the effect. But once you start doing that, the createAsyncThunk might feel a lot easier by comparison
   since it automatically dispatches pending, fulfilled, and rejected actions.

    useEffect(() => {
    dispatch({ type: "fetchUsers/pending" });
    axios
        .get(userAPI)
        .then((response) =>
        dispatch({ type: "fetchUsers", payload: response.data })
        )
        .catch((error) =>
        dispatch({ type: "fetchUsers/rejected", payload: error.message })
        );
    }, []);

10.
The main objective of any Node.js project structure is to help you:
-Write clean and readable code.
-Write reusable pieces of code across our application.
-Avoid repetition.
-Add new features without disrupting existing code.
-Reffer to nodejs-layered-architecture project.

11 + 12 + 14 + 15 + 17 + 18.
JSON Web Token is a standard used to create access tokens for an application.
It works this way: the server generates a token that certifies the user identity, and sends it to the client.
The client will send the token back to the server for every subsequent request, so the server knows the request comes from a particular identity.
This architecture proves to be very effective in modern Web Apps, where after the user
is authenticated we perform API requests either to a REST or a GraphQL API.

Who uses JWT? Google, for example. If you use the Google APIs, you will use JWT.
A JWT is cryptographically signed (but not encrypted, hence using HTTPS is mandatory when storing user data in the JWT),
so there is a guarantee we can trust it when we receive it, as no middleman can intercept and modify it, or the data it holds, without invalidating it.
That said, JWTs are often criticized for their overuse, and especially for them being used when less problematic solutions can be used.

You need to form your opinion around the subject. I’m not advocating for a technology over another,
just presenting all the opportunities and tools you have at your disposal.

What are they good for? Mainly API authentication, and server-to-server authorization.

How is a JWT token generated?
Using Node.js you can generate the first part of the token by using this code:

const header = { "alg": "HS256", "typ": "JWT" }
const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')

We set the signing algorithm to be HMAC SHA256 (JWT supports multiple algorithms),
then we create a buffer from this JSON-encoded object, and we encode it using base64.

The partial result is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.

Next we add the payload, which we can customize with any kind of data. There are reserved keys,
including iss and exp which identify the issuer and the expiration time of the token.

You can add your own data to the token by using an object:

const payload = { username: 'Flavio' }
We convert this object, JSON-encoded, to a Buffer and we encode the result using base64, just like we did before:

const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
In this case the partial result is eyJ1c2VybmFtZSI6IkZsYXZpbyJ9.

Next, we get a signature from the header and payload content, which makes sure our content can’t be changed
even if intercepted as our signature will be invalidated. To do this, we’ll use the crypto Node module:

const crypto = require('crypto')
const jwtSecret = 'secretKey'

const signature = crypto.createHmac('sha256', jwtSecret).update(encodedHeader + '.' + encodedPayload).digest('base64')
We use the secretKey secret key and create a base64 encoded representation of the encrypted signature.

The value of the signature in our case is
MQWECYWUT7bayj8miVgsj8KdYI3ZRVS+WRRZjfZrGrw=

We are almost done, we just need to concatenate the 3 parts of header, payload and signature by separating them with a dot:
const jwt = `${encodedHeader}.${encodedPayload}.${signature}`

API authentication
This is probably the only sensible way to use JWT.

A common scenario is: you sign up for a service and download a JWT from the service dashboard.
This is what you will use from now on to authenticate all your requests to the server.

Another use case, which is the opposite, is sending the JWT when you manage the API and clients connect to you,
and you want your users to send subsequent requests by just passing the token.

In this case, the client needs to store the token somewhere. Where is the best place? In an HttpOnly cookie.
The other methods are all prone to XSS attacks and as such they should be avoided. An HttpOnly cookie is
not accessible from JavaScript, and is automatically sent to the origin server upon every request, so it
perfectly suits the use case.

Choose the best JWT library
Depending on the language and environment you use, you can choose from a number of libraries. The most popular are listed in the jwt.io website.

Don’t use JWTs as session tokens
You should not use JWTs for sessions. Use a regular server-side session mechanism, as it’s much more efficient and less prone to data exposure.

16. You can steal the token from the localStorage and do some attacks with it, unlike keeping the token in the state.
    Everyone can read it. Signature of the hash of the content + key within base64, and then you can know if this token is valid.

19 + 20.
Relational:
A relational database is structured, meaning the data is organized in tables. Many times,
the data within these tables have relationships with one another, or dependencies. A non
relational database is document-oriented, meaning, all information gets stored in more of
a laundry list order. Within a single construct, or document, you will have all of your
data listed out.

Non-Relational:
In contrast to a relational database, a NoSQL database is one that is less structured/confined in format,
and thus, allows for more flexibility and adaptability. If you are going to be dealing with a dataset that
isn’t clearly defined, meaning not organized or structured, you likely won’t have the luxury of establishing
defined tables and relationships amongst the dataset.

SQL Pros:
-It is highly suitable for relational databases.
-Has a predefined schema which is helpful in many cases.
-Normalization can be greatly used here, thus it also helps in removing redundancy and organizing data in a better way.
-Transactions in SQL databases are ACID compliant, thereby guarantees security and stability.
-Follows well-defined standards like ISI and ANSI which are accepted worldwide.
-Code-free.
-Unbeatable speed in retrieving database records with great ease.
-Uses single standardized language i.e SQL across different RDBMS.

SQL Cons:
-The process of interfacing is complex.
-As SQL is an object, it occupies space.
-Handling Big data is very costly as you will have to increase the hardware for scaling.
-When a table is dropped, the view becomes inactive.

NoSQL Pros:
-Capable of handling big data.
-As it is schema-less and table free, it offers a high level of flexibility with data models.
-It is a low-cost database and the open source NoSQL databases provide very affordable solutions to small enterprises.
-Easier and low-cost scalability. You don’t need to increase the hardware for scaling. You just need to add more servers
 to the pool as NoSQL is schema-free and built on distributed systems.
-Detailed database modeling is not required here. Hence it saves time and effort.

NoSQL Cons:
-The benefits of NoSQL come at the cost of relaxing ACID properties. NoSQL offers only eventual consistency.
-Relatively less community support.
-Lacks standardization, unlike SQL, which in turn creates some issues during migration.
-Inter-operability is also a concern in the case of NoSQL databases.

22. Find.
23. Filter.
24. Reduce.
*/