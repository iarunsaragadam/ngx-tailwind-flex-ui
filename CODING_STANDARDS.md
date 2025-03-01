# ngx-tailwind-flex-ui Coding Standards

This document outlines the coding standards for the `ngx-tailwind-flex-ui` project, ensuring consistency, maintainability, and adherence to best practices.

## Code Style

We follow the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) as the foundation for our coding style, with adjustments to align with ES6 and TypeScript conventions.

## Coding Practices

### General

#### Write Useful Comments

- **What vs. Why**: While comments explaining _what_ code does are helpful, comments elucidating _why_ certain decisions were made are invaluable. They provide context that might not be immediately apparent from the code itself.

  _Not very useful comment:_

  ```ts
  // Set default tabindex.
  if (!$attrs['tabindex']) {
    $element.attr('tabindex', '-1');
  }
  ```

  _More useful comment:_

  ```ts
  // Unless the user specifies otherwise, the calendar should not be a tab stop.
  // This is necessary because ngAria might add a tabindex to anything with an ng-model
  // (based on whether or not the user has turned that particular feature on/off).
  if (!$attrs['tabindex']) {
    $element.attr('tabindex', '-1');
  }
  ```

- **Comment Styles**:
  - **TypeScript**: Use JsDoc-style comments for descriptions (on classes, members, etc.) and `//` style comments for explanations or background information.
  - **SCSS**: Always use `//` style comments.
  - **HTML**: Use `<!-- ... -->` comments, which will be stripped when packaging a build.

#### Prefer Focused, Granular Components Over Complex, Configurable Ones

Design components to have a single responsibility, making them easier to test, maintain, and reuse. For example, instead of creating a single `lib-button` component with multiple configurations:

```html
<lib-button>Basic button</lib-button>
<lib-button class="lib-fab">FAB</lib-button>
<lib-button class="lib-icon-button">Icon</lib-button>
```

Create distinct components for each variation:

```html
<lib-button>Basic button</lib-button>
<lib-fab>FAB</lib-fab>
<lib-icon-button>Icon</lib-icon-button>
```

#### Prefer Small, Focused Modules

Modules should adhere to the single responsibility principle, enhancing testability and maintainability. ES6 modules facilitate organizing code into logical, granular units. Aim for individual files to be between 200 - 300 lines of code. If a file approaches 400 lines, consider refactoring it into smaller pieces.

#### Less is More

Avoid adding features that don't offer significant user value, considering the costs in maintenance, complexity, and payload size. When in doubt, leave it out. This principle also applies to providing multiple APIs for the same functionality; prefer a single, consistent API.

### 100-Column Limit

All code and documentation should not exceed 100 columns in width. This applies to TypeScript, SCSS, HTML, bash scripts, and markdown files.

### API Design

#### Boolean Arguments

Avoid methods with boolean arguments that dictate additional behavior. Instead, separate the behaviors into distinct functions.

_Avoid:_

```ts
function getTargetElement(createIfNotFound = false) {
  // ...
}
```

_Prefer:_

```ts
function getExistingTargetElement() {
  // ...
}

function createTargetElement() {
  // ...
}
```

### TypeScript

#### Typing

Avoid using `any` where possible. If you find yourself using `any`, consider whether a generic type might be more appropriate. For methods and properties that are part of a component's public API, all types must be explicitly specified, as our documentation tooling cannot currently infer types in these cases.

#### Fluent APIs

When creating a fluent or builder-pattern style API, use the `this` return type for methods:

```ts
class ConfigBuilder {
  withName(name: string): this {
    this.config.name = name;
    return this;
  }
}
```

#### Access Modifiers

- **Public**: Omit the `public` keyword, as it is the default behavior.
- **Private**: Use `private` when appropriate, prefixing the name with an underscore.
- **Protected**: Use `protected` when appropriate, without a prefix.
- **Library-Internal**: Prefix properties and methods intended for internal use with an underscore without using the `private` keyword. This is necessary for anything that must be public (to be used by Angular) but should not be part of the user-facing API. This typically applies to symbols used in template expressions, `@ViewChildren` / `@ContentChildren` properties, host bindings, and `@Input` / `@Output` properties (when using an alias). Additionally, the `@docs-private` JsDoc annotation can be used to hide any symbol from the public API docs.

#### Getters and Setters

- Use getters and setters primarily for `@Input` properties or when required for API compatibility.
- Avoid long or complex getters and setters. If the logic exceeds three lines, introduce a new method to contain it.
- A getter should immediately precede its corresponding setter.
- Apply decorators such as `@Input` to the getter, not the setter.
- Prefer using a `readonly` property instead of a getter (with no setter) when possible.

  _Example:_

  ```ts
  /** YES */
  readonly active: boolean;

  /** NO */
  get active(): boolean {
    // Using a getter solely to make the property read-only.
    return this._active;
  }
  ```

#### JsDoc Comments

All public APIs must have user-facing comments. These are extracted and shown in the documentation.
