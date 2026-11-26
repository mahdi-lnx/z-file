# Z-File

Z-File is a full-stack SaaS application designed to provide cloud-based file storage, management, encryption, conversion, and PDF processing 
through a unified platform with tier-based feature access.

> [!IMPORTANT]
> **Development Status:** Z-File is currently under active development 
> and is not production-ready yet. Features, APIs, architectural 
> decisions, and implementation details are subject to change.

## Overview

Z-File aims to provide a centralized platform for storing, managing, securing, and processing files, eliminating the need to rely on multiple 
independent file management tools and services.

The project adopts a monorepo structure with a modular React SPA frontend and a modular monolithic Go backend, emphasizing type safety,
reusability, separation of concerns, and maintainability.

## Planned Features

- **Authentication and Authorization:** User registration, login, session management, and protected resources.

- **Cloud Storage:** Upload, download, store, organize, and manage files through a centralized interface.

- **File Encryption and Decryption:** Encrypt and decrypt files to protect sensitive information.

- **File Conversion:** Convert files between supported file formats.

- **PDF Processing:** Perform various PDF manipulation and processing operations.

- **Tier-Based Feature Access:** Provide different levels of functionality and resource access based on subscription tiers.

- **Account Management:** Manage user profiles, account settings, and subscriptions.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend development |
| TypeScript | Static typing and type-safe abstractions |
| React-Router | Client-side routing |
| Tailwindcss | Styling and responsive design |
| Zod | Schema validation |
| Vite | Frontend development and build tooling |
| Vitest | Frontend testing |
| Go | Backend development |
| PostgreSQL | Relational data persistence (planned) |

## Current Progress

The current implementation primarily focuses on establishing a modular frontend architecture, developing reusable abstractions, and laying 
the foundations for backend development.

### UI Component Library

A custom, reusable React component library built with TypeScript and Tailwind CSS, featuring:

- Strongly typed component APIs.
- Component composition and configurable styling.
- Responsive layouts and navigation components.
- Reusable form inputs, buttons, drawers, notifications, and 
  loading indicators.
- Theme management.
- Consistent keyboard focus styling.

### Form Management

A generic, type-safe form management abstraction built using custom React hooks and Zod, featuring:

- TypeScript generics for reusable form logic.
- Discriminated unions for representing form submission states.
- Field-level state and error management.
- Schema-based validation using Zod.
- Type-safe field controllers.
- Separation of form logic from UI components.

### Application Infrastructure

- Client-side routing using React Router.
- Context-based shared state management.
- Custom hooks for reusable application logic.
- Local storage and theme management.
- Centralized notification infrastructure.
- Navigation locking.
- Utility functions for composing and merging CSS classes.
- Unit testing using Vitest.
- Initial Go HTTP server implementation.

## Development Roadmap (Tentative)

- [x] Frontend architecture foundation
- [x] Reusable UI component library foundation
- [x] Generic, type-safe form management
- [x] Schema-based form validation
- [x] Client-side routing
- [x] Shared state management infrastructure
- [x] Initial Go HTTP server
- [ ] Backend API development
- [ ] PostgreSQL integration
- [ ] User authentication and session management
- [ ] Authorization and access control
- [ ] Account management
- [ ] Cloud storage and file management
- [ ] File encryption and decryption
- [ ] File conversion
- [ ] PDF processing
- [ ] Subscription and tier-based feature access
- [ ] Comprehensive testing
- [ ] Production deployment

## License

Z-File is licensed under the GNU Affero General Public License v3.0. See the [LICENSE](LICENSE) file for the full license text.
