# Architecture Documentation

## CLEAN Architecture Implementation

This codebase follows **CLEAN Architecture** principles with **SOLID** and **DRY** design patterns.

---

## Architecture Layers

### 1. Domain Layer (Innermost)
**Location:** `domain/`

**Purpose:** Contains business entities and interfaces (abstractions)

**Structure:**
```
domain/
├── entities/
│   └── Building.ts          # Core business object
├── interfaces/
│   ├── IBuildingRepository.ts  # Repository abstraction
│   └── IImageConverter.ts      # Image converter abstraction
└── index.ts
```

**Principles:**
- ✅ **Independent** of frameworks, UI, and external concerns
- ✅ **Pure business logic** - no dependencies on outer layers
- ✅ **Entities** represent core business objects
- ✅ **Interfaces** define contracts (Dependency Inversion)

---

### 2. Application Layer
**Location:** `application/`

**Purpose:** Contains use cases (application-specific business logic)

**Structure:**
```
application/
├── usecases/
│   └── AnalyzeBuildingUseCase.ts  # Orchestrates building analysis
└── index.ts
```

**Principles:**
- ✅ **Use Cases** orchestrate business logic
- ✅ **Single Responsibility** - each use case has one purpose
- ✅ **Depends only on domain** (interfaces, not implementations)

---

### 3. Infrastructure Layer
**Location:** `infrastructure/`

**Purpose:** Implements interfaces and handles external concerns

**Structure:**
```
infrastructure/
├── repositories/
│   └── OpenAIBuildingRepository.ts  # Implements IBuildingRepository
├── services/
│   └── ImageConverterService.ts     # Implements IImageConverter
├── di/
│   └── DependencyContainer.ts       # Dependency injection
└── index.ts
```

**Principles:**
- ✅ **Implements** domain interfaces
- ✅ **Handles** external APIs, file systems, databases
- ✅ **Dependency Injection** manages dependencies
- ✅ **Open/Closed** - easy to swap implementations

---

### 4. Presentation Layer (Outermost)
**Location:** `presentation/`

**Purpose:** UI components and user interaction

**Structure:**
```
presentation/
├── components/
│   ├── BuildingAnalysis.tsx  # Displays analysis results
│   ├── CameraButton.tsx      # Camera interaction
│   └── HomePage.tsx          # Main page
├── context/
│   └── AppContext.tsx        # Provides dependencies via React Context
└── index.ts
```

**Principles:**
- ✅ **Presentation logic only** - no business logic
- ✅ **Depends on use cases** via context
- ✅ **Framework-specific** (React Native)

---

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- ✅ **Building Entity**: Represents building data only
- ✅ **AnalyzeBuildingUseCase**: Orchestrates analysis flow only
- ✅ **OpenAIBuildingRepository**: Handles OpenAI API only
- ✅ **ImageConverterService**: Converts images only
- ✅ **Components**: Display UI only

### Open/Closed Principle (OCP)
- ✅ **Interfaces** allow extension without modification
- ✅ **New repositories** can implement `IBuildingRepository`
- ✅ **New converters** can implement `IImageConverter`
- ✅ **Use cases** don't need changes when swapping implementations

### Liskov Substitution Principle (LSP)
- ✅ **Any implementation** of `IBuildingRepository` can replace `OpenAIBuildingRepository`
- ✅ **Any implementation** of `IImageConverter` can replace `ImageConverterService`
- ✅ **Interfaces** ensure substitutability

### Interface Segregation Principle (ISP)
- ✅ **IBuildingRepository**: Single, focused interface
- ✅ **IImageConverter**: Single, focused interface
- ✅ **No fat interfaces** - each interface has one responsibility

### Dependency Inversion Principle (DIP)
- ✅ **Use cases depend on abstractions** (interfaces), not concretions
- ✅ **Components depend on use cases** via context, not services
- ✅ **Dependency Container** manages concrete implementations
- ✅ **All dependencies point inward** (toward domain)

---

## DRY Principles Applied

- ✅ **No code duplication** - shared logic in use cases
- ✅ **Reusable entities** - Building entity used throughout
- ✅ **Centralized configuration** - API key in config layer
- ✅ **Shared interfaces** - contracts defined once
- ✅ **Index files** - centralized exports

---

## Dependency Flow

```
┌─────────────────────────────────────┐
│   Presentation Layer (UI)          │
│   - Components                      │
│   - Context                         │
└──────────────┬──────────────────────┘
               │ depends on
               ▼
┌─────────────────────────────────────┐
│   Application Layer (Use Cases)     │
│   - AnalyzeBuildingUseCase          │
└──────────────┬──────────────────────┘
               │ depends on
               ▼
┌─────────────────────────────────────┐
│   Domain Layer (Entities/Interfaces)│
│   - Building                        │
│   - IBuildingRepository             │
│   - IImageConverter                 │
└──────────────┬──────────────────────┘
               ▲ implements
               │
┌─────────────────────────────────────┐
│   Infrastructure Layer              │
│   - OpenAIBuildingRepository        │
│   - ImageConverterService           │
│   - DependencyContainer             │
└─────────────────────────────────────┘
```

**Key Rule:** Dependencies always point **inward** (toward domain)

---

## How to Use

### Adding a New Repository Implementation

1. **Create implementation** in `infrastructure/repositories/`
2. **Implement** `IBuildingRepository` interface
3. **Update** `DependencyContainer` to use new implementation
4. **No changes needed** in use cases or components!

### Adding a New Use Case

1. **Create use case** in `application/usecases/`
2. **Inject dependencies** via constructor (interfaces only)
3. **Add to context** if needed by components
4. **Use in components** via context

### Testing

- ✅ **Domain layer**: Pure unit tests (no mocks needed)
- ✅ **Use cases**: Test with mock repositories/converters
- ✅ **Repositories**: Integration tests with real/mock APIs
- ✅ **Components**: Test with mock use cases

---

## Benefits

1. **Testability**: Easy to mock dependencies
2. **Maintainability**: Clear separation of concerns
3. **Flexibility**: Easy to swap implementations
4. **Scalability**: Easy to add new features
5. **Independence**: Business logic independent of frameworks

---

## Migration Notes

- ✅ Old `services/` directory removed
- ✅ Old `components/` directory moved to `presentation/components/`
- ✅ All business logic extracted to use cases
- ✅ All external dependencies abstracted via interfaces
- ✅ Dependency injection via React Context

