---
mode: agent
model: Claude Sonnet 4
description: "Creates a HERE AND NOW AI Participant Admin Dashboard clone"
---
 
# Role
 
You are an expert Angular full-stack developer specializing in creating modern, responsive admin dashboards. Your task is to build a complete HERE AND NOW AI Participant Administration interface that manages participants data with full CRUD operations, matching the branding and style of the original application.
 
# Task
 
Create a comprehensive HERE AND NOW AI Participant Admin Dashboard with the following specifications:
 
## 1. Branding & Design
- **Company**: HERE AND NOW AI
- **Logo**: Use HERE AND NOW AI branding (favicon-logo-with-name.png)
- **Contact**: info@hereandnowai.com, +91 996 296 1000
- **Website**: https://hereandnowai.com
- **Tagline**: "designed with passion for innovation"
- **Color Scheme**: Professional AI/tech company theme (blues, whites, grays)
 
## 2. Project Structure
- Generate an Angular application with the following structure:
  ```
  src/
  ├── app/
  │   ├── core/
  │   │   ├── services/
  │   │   ├── models/
  │   │   └── guards/
  │   ├── shared/
  │   │   ├── components/
  │   │   ├── directives/
  │   │   └── pipes/
  │   ├── features/
  │   │   ├── auth/
  │   │   ├── dashboard/
  │   │   └── participants/
  │   │       ├── components/
  │   │       ├── services/
  │   │       └── models/
  │   └── layout/
  │       ├── header/
  │       ├── sidebar/
  │       └── footer/
  ```
 
## 3. Core Features
 
### Authentication & Landing
- **Landing Page**: HERE AND NOW AI branding with company info
- **Login System**: Secure authentication with company branding
- **Route Guards**: Protect admin routes
 
### Main Dashboard Layout
- **Header**:
  - HERE AND NOW AI logo and branding
  - Navigation breadcrumbs
  - User profile dropdown with logout
  - Notifications bell icon
- **Sidebar**:
  - Dashboard overview
  - Participants management
  - Analytics & Reports
  - Settings
  - Help & Support
- **Main Content Area**: Dynamic content based on selected route
- **Footer**:
  - "designed with passion for innovation"
  - Contact information: info@hereandnowai.com, +91 996 296 1000
  - Website link: https://hereandnowai.com
 
### Participant Management Interface
- **Participants List View**:
  - Professional data table with HERE AND NOW AI styling
  - Search and advanced filter functionality
  - Bulk operations (export, status updates, delete)
  - Add new participant CTA button
  - Status indicators (Active, Inactive, Pending, Archived)
 
### Participant Data Model
```typescript
interface Participant {
  id: string;
  participantId: string; // Unique participant identifier
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    avatar?: string;
  };
  status: 'active' | 'inactive' | 'pending' | 'archived';
  enrollment: {
    registrationDate: Date;
    program: string;
    cohort: string;
    facilitator: string;
  };
  activity: {
    lastLogin: Date;
    sessionsCompleted: number;
    totalSessions: number;
    completionRate: number;
  };
  contact: {
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  metadata: {
    tags: string[];
    notes: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
```
 
### CRUD Operations
- **Create**: Multi-step wizard for participant enrollment
- **Read**: Comprehensive participant profile with tabs for different sections
- **Update**: Inline editing with auto-save functionality
- **Delete**: Soft delete with archival system
 
## 4. UI/UX Requirements
 
### HERE AND NOW AI Design System
- **Primary Colors**: AI/tech blues (#0066CC, #004499)
- **Secondary Colors**: Innovation oranges/teals
- **Typography**: Modern, clean fonts (Inter, Roboto)
- **Icons**: Material Design or Feather icons
- **Responsive**: Mobile-first design approach
 
### Advanced Table Features
- **Columns**:
  - Participant ID, Name, Email, Program, Status, Progress, Last Activity, Actions
- **Smart Filtering**:
  - Global search with autocomplete
  - Status multi-select filter
  - Program/Cohort filters
  - Date range filters
  - Progress percentage filters
- **Bulk Actions**:
  - Export to CSV/Excel
  - Status updates
  - Program transfers
  - Archive/Restore
 
### Dashboard Analytics
- **KPI Cards**:
  - Total Participants
  - Active Sessions
  - Completion Rate
  - New Registrations
- **Charts**:
  - Enrollment trends over time
  - Program completion rates
  - Geographic distribution
  - Activity heatmaps
 
## 5. Technical Implementation
 
### State Management
- Angular Signals for reactive state
- Proper loading and error states
- Optimistic updates for better UX
 
### API Integration
- Mock HERE AND NOW AI API service
- RESTful endpoints for participant operations
- Real-time updates using WebSockets (simulated)
- Data caching and offline support
 
### Routing Structure
```typescript
const routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'participants', component: ParticipantsListComponent },
      { path: 'participants/new', component: ParticipantWizardComponent },
      { path: 'participants/:id', component: ParticipantDetailComponent },
      { path: 'participants/:id/edit', component: ParticipantEditComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
];
```
 
## 6. HERE AND NOW AI Specific Features
 
### AI-Powered Features
- **Smart Search**: AI-enhanced participant search
- **Predictive Analytics**: Completion probability indicators
- **Automated Insights**: Pattern recognition in participant data
- **Recommendation Engine**: Suggest optimal programs for participants
 
### Program Management
- **Programs**: List of available AI/training programs
- **Cohorts**: Batch management for participants
- **Facilitators**: Staff management and assignment
- **Progress Tracking**: Detailed learning analytics
 
### Communication Tools
- **Notifications**: System alerts and reminders
- **Messaging**: Internal communication system
- **Reports**: Automated report generation
- **Export Tools**: Data export for external analysis
 
## 7. Testing & Quality
 
### Comprehensive Testing
- Unit tests with Jest for all components
- Integration tests for user workflows
- E2E tests with Cypress for critical paths
- Performance testing for large datasets
- Accessibility compliance (WCAG 2.1 AA)
 
### Code Quality
- TypeScript strict mode
- ESLint and Prettier configuration
- Angular best practices and style guide
- Comprehensive JSDoc documentation
 
# Output Requirements
 
1. **Complete Angular Application**: Fully functional HERE AND NOW AI participant admin system
2. **Branding Compliance**: Proper company branding and styling
3. **Professional Documentation**: Setup guides and user manuals
4. **Mock Data**: Realistic AI training participant data
5. **Responsive Design**: Optimal experience across all devices
6. **Performance Optimized**: Fast loading and smooth interactions
 
# Success Criteria
 
- ✅ Accurate HERE AND NOW AI branding and design
- ✅ Complete participant lifecycle management
- ✅ Advanced analytics and reporting capabilities
- ✅ Professional admin interface with excellent UX
- ✅ Scalable architecture for future enhancements
- ✅ High code quality with comprehensive testing