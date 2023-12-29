## Recommendation for Production

### Development Policy

- The developer ("the dev" in short) must use TypeScript with no escape hatches. The use of `any` keyword and all type-assertions without runtime validations such as with `as` keyword and use of `!` are strictly forbidden. Asserting with `unknown` keyword instead of `any` is allowed.
- The dev has to format the code using the Prettier configuration in the workspace.
- The dev needs to lint the code using ESLint & TSLint rules configured in the same workspace.
- The dev should use the most common and industry-standard naming conventions of TypeScript/ECMAScript community.
- The developer should use only a single source of truth for the local storage unless it causes a significant performance issues.

### Defensive Programming Tips

- Use static types.
- Avoid directly setting `null` or `undefined`. Instead, wrap them in an `Option` or `Maybe` type.
- Handle errors using a `Result` or `Either` type.
- Prefer exhaustive pattern matching over conditional statements.
- Prefer early returns.
- Isolate side effects from pure functions with a clear separation between the two.
- Mutation is fine only if your function/component is idempotent.
- Declare variables as close to their usage as possible. Avoid setting global variables.
- Your code must explicitly show at compile time what can fail or throw exceptions. You can use type-level abstraction for this.
- Make your code auto-testable or provable. Don't depend on manual tests.
- Write tests. Not too many. Mostly integration tests.
- Prefer generating tests over writing tests whenever possible.
- Use state machines.
- Use defensive copying for time-travel debugging. Avoid copying if it causes unnecessary overhead.
