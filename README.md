# graphql-union-types

---

- http://localhost:4000/

```js
query {
  agenda {
    __typename
    name
    start
    end
    ...WorkoutFields
  }
}

fragment WorkoutFields on Workout {
  reps
}
```
