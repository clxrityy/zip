# Copilot Instructions

#### Zip `@clxrity/zip` package

This file is used to provide instructions to Copilot on how to complete the code.

---

## Overview

This is a turbo repo that contains the `@clxrity/zip` package. The package is used to zip files within a React ecosystem.

## Project Structure

The project is structured as follows:

```yml
~/
    .github/
        copilot-instructions.md  # Instructions for Copilot
    apps/
        demo/       # React (Next.js) app that uses the @clxrity/zip package
        docs/       # Documentation site for the @clxrity/zip package
    packages/
        eslint-config/       # ESLint configuration package
        typescript-config/   # TypeScript configuration package
        ui/                  # UI components package
        main/                # Main package that contains the core functionality of @clxrity/zip
            src/
                client/
                    zip.ts      # Client-side zipping functionality
                    unzip.ts    # Client-side unzipping functionality
                    index.ts    # Client-side entry point
                server/
                    zip.ts      # Server-side zipping functionality
                    unzip.ts    # Server-side unzipping functionality
                    index.ts    # Server-side entry point
                components/
                    FileUpload.tsx   # File upload component
                    index.ts         # Component entry point
                index.ts            # Main entry point for the @clxrity/zip package
            test/
                # Tests for every function and component in the main package
    turbo.json          # Turbo repo configuration file
    package.json        # Root package.json file
    pnpm-workspace.yaml  # pnpm workspace configuration file
```

The only _package_ that is being published to the npm registry is the `@clxrity/zip` package, which is located in the `packages/main/` directory.

> This is the purpose of the entire repo, to create a package that can be used to zip files within a React ecosystem.
> Other packages in the repo are used for configuration and UI components, but they are not published to npm.
> They are scoped with `@zip/<package-name>` to avoid conflicts with other packages in the npm registry.

- All exportable functions, components, and interfaces from the package should be exported from the `packages/main/src/index.ts` file.

---

## Goals

The goal is to implement the zipping functionality for the `@clxrity/zip` package, ensuring that it works seamlessly in both client-side and server-side environments. The implementation should be type-safe, well-documented, and follow best practices for code organization and maintainability.

- Dynamic and static zipping functionality, allowing users to zip files dynamically in the browser and statically on the server.
- Deconstructable and visibly appealing components that can be used to upload files and trigger zipping functionality.
  - If a component contains _multiple_ functions, ensure that each function is documented and tested individually, or even better, broken down into smaller components if necessary.
  - Ensure the UI reflects the functionality of the zipping process, providing feedback to the user during the zipping and unzipping operations.
- Allow the codebase to be easily extensible, maintainable, testable, and readable.
- Clear and concise documentation that accurately reflects the functionality of the `@clxrity/zip` package.
- Developers should be able to easily understand how to use and contribute to the package.
  - Provide clear guidelines for contributing, including coding standards, testing procedures, and documentation requirements.
- GitHub Actions that:
  - Run tests on every push and pull request to ensure code quality and functionality.
  - Build the package and publish it to npm when changes are merged into the main branch.

---

## Instructions for Copilot

- **Understand the Project Structure**: Familiarize yourself with the project structure, especially the `main/src` directory where the zipping functionality is implemented.
  - The `client/` directory contains client-side zipping and unzipping functionality, utilizing `JSZip` for zipping/unzipping files in the browser.
  - The `server/` directory contains server-side zipping and unzipping functionality, utilizing `adm-zip` for zipping files on the server.
- **Ensure Type Safety**: The code should be written in TypeScript, ensuring type safety throughout the implementation.
  - Use appropriate types for function parameters and return values.
  - Add type annotations for variables and constants where necessary.
  - Include doc comments for functions and classes to explain their purpose and usage.
- **Follow Best Practices**: Adhere to best practices for code organization, readability, and maintainability.
- **Write Tests**: Implement tests for both client-side and server-side functionality.
  - Use `vitest` for testing, ensuring that all functions and components are covered by tests.
  - Write unit tests for individual functions and integration tests for the overall functionality.
- **Use ESLint and Prettier**: Ensure that the code adheres to the ESLint and Prettier configurations provided in the `eslint-config` and `typescript-config` packages.
- **Comment Your Code**: Write clear and concise comments explaining the purpose of complex logic or important sections of code.
- **Documentation**: Ensure that the code is neatly documentated and accurately reflects the functionality of the `@clxrity/zip` package.
  - Update the documentation in the `apps/docs/` directory as necessary to reflect any changes made to the codebase.
- **Reduce Complexity**: Aim to keep the code simple and avoid unnecessary complexity.
  - Break down large functions into smaller, reusable functions.
  - Use descriptive variable and function names to enhance readability.
- **Handle Errors Gracefully**: Implement error handling to manage potential issues during zipping and unzipping processes.
- **Optimize Performance**: Consider performance implications, especially when dealing with large files or multiple files.
  - Use efficient algorithms and data structures where applicable.
  - Avoid blocking the main thread in client-side code, especially during file operations.
- **Follow the Coding Style**: Adhere to the coding style used in the existing codebase, including naming conventions, indentation, and spacing.
- **Use Modern JavaScript Features**: Utilize modern JavaScript features (ES6+) where appropriate, such as arrow functions, destructuring, and async/await for asynchronous operations.

---
