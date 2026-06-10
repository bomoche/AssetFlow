# AssetFlow — Investment Withdrawal Management System

A full-stack investment withdrawal management system built for Enviro365 Investments. The system allows investors to view their portfolios, submit withdrawal requests, view transaction history, and download CSV statements.

---

## Repository Structure

This is a monorepo containing both the frontend and backend:

assetflow/
├── frontend/          ← React.js application
├── backend/           ← Spring Boot REST API
├── .github/
│   └── workflows/
│       └── build-and-test.yml
└── README.md

---

## Development History

During development, separate repositories were maintained to demonstrate proper Git branching strategy, feature-based commits, and professional version control practices:

- **Frontend development history:** https://github.com/bomoche/Investment-management-system
- **Backend development history:** https://github.com/bomoche/enviro365-backend

Both repositories contain full commit histories with feature branches including:
- `feature/project-setup`
- `feature/layout-components`
- `feature/portfolio-page`
- `feature/withdraw-page`
- `feature/history-page`
- `feature/api-integration`
- `feature/separate-ui-logic`
- `feature/routing`
- `feature/auth`
- `feature/unit-tests`
- `feature/swagger`
- `feature/data-seeder`
- `feature/exception-handling`
- `feature/validation`
- `feature/github-actions`

The final combined solution is in this repository on the main branch as required by the submission guidelines.

---

## Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Tailwind CSS
- Custom hooks architecture

**Backend:**
- Spring Boot 3.5.x
- Spring Security + JWT Authentication
- Spring Data JPA
- H2 File-Based Database
- Lombok
- Swagger / OpenAPI

**DevOps:**
- GitHub Actions CI/CD

---

## Getting Started

### Prerequisites

- Java 17
- Node.js 20+
- Maven

---

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs on: `http://localhost:8080`

H2 Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/enviro365db`
- Username: `sa`
- Password: (leave empty)

Swagger UI: `http://localhost:8080/swagger-ui/index.html`

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## Demo Credentials
Email:    thabo.nkosi@enviro365.co.za
Password: password123

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login and receive JWT | Public |
| POST | `/api/auth/register` | Register new investor | Public |
| GET | `/api/investors/{id}/portfolio` | Get investor portfolio | Required |
| POST | `/api/withdrawals` | Submit withdrawal | Required |
| GET | `/api/withdrawals?investorId={id}` | Get withdrawal history | Required |
| GET | `/api/withdrawals/export?investorId={id}` | Download CSV | Required |

---

## Business Rules

- Retirement fund withdrawals only permitted for investors older than 65
- Withdrawal amount cannot exceed the available balance
- Withdrawal amount cannot exceed 90% of the available balance
- All monetary values handled using `BigDecimal` for financial precision

---

## Architecture

### Backend — Layered Architecture
Controller → Service → Repository → Database

- **Controller** — handles HTTP requests, delegates to service
- **Service** — contains all business logic and validation
- **Repository** — database access only
- **Entity** — JPA mapped database tables
- **DTO** — data transfer objects, entities never exposed directly

### Frontend — Feature-Sliced Architecture

Pages → Hooks → API Layer → Backend

- **Pages** — UI only, no logic
- **Hooks** — all state and business logic
- **API Layer** — all HTTP calls centralised in one file

---

## Advanced Features Implemented

- JWT Authentication with Spring Security
- Global Exception Handler with consistent error responses
- DTO layer — entities never exposed to clients
- Input validation with Bean Validation annotations
- Business rule validation in dedicated validator class
- Unit tests with JUnit and Mockito
- GitHub Actions CI/CD pipeline
- Swagger UI API documentation
- Persistent H2 file-based database
- CSV export with custom headers

---

## Testing

```bash
cd backend
./mvnw test
```

Test coverage includes:
- `WithdrawalServiceTest` — service layer business logic
- `WithdrawalValidatorTest` — all business rule scenarios

---

## AI Tools Disclosure

As permitted by the assessment guidelines, the following AI tools were used:

| Tool | Usage |
|------|-------|
| **Stitch by Google** | UI/UX design — generated the initial HTML/CSS designs for Portfolio, Withdrawal, and History screens |
| **Claude** | Implementation assistance

All AI-assisted code was reviewed, understood, and adapted by the developer. The architecture decisions, business logic implementation, and integration work were directed and executed by the developer.

---

## UI Design

The UI was designed with a mobile-first approach and is fully responsive for both mobile and desktop:

- **Mobile:** Floating bottom navigation bar with active state indicator
- **Desktop:** Fixed sidebar navigation
- Clean financial services aesthetic using navy blue and gold color scheme
- Optimized for mobile devices while maintaining full desktop responsiveness

---

## Assumptions Made

- A single demo investor is seeded on startup for assessment purposes
- The H2 database is file-based and persistent between restarts
- Authentication uses JWT tokens stored in localStorage
- Date of birth is used to calculate investor age dynamically — age is never stored
- `balanceAfterWithdrawal` is snapshotted at the time of withdrawal for accurate historical records

---

## Contact

**Bongani Moche**
bonganimoche@wethinkcode.com
https://github.com/bomoche