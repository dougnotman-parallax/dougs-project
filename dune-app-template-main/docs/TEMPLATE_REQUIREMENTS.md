Application Requirements Document: [Application Name]

## Introduction

### 1.1 Purpose

This document outlines the functional and non-functional requirements for the [Application Name] application. This application will be a web-based dashboard and reporting tool designed to [describe the application's high-level purpose, e.g., monitor industrial asset performance, track production metrics, etc.].

### 1.2 Scope

The application will focus on providing a centralized view of data from Cognite Data Fusion (CDF), enabling users to [describe key user actions, e.g., visualize time series data, generate reports, and analyze asset relationships].

### 1.3 Target Audience

The primary users of this application are [list target users, e.g., plant managers, maintenance engineers, data analysts], who require a user-friendly interface to gain insights from industrial data.

## 2. Functional Requirements

### 2.1 User Authentication and Authorization

FR-1.1: The application will use the dune-fe-auth package to handle authentication.

FR-1.2: User roles and permissions within the application must map to the security model defined in CDF, ensuring users can only access data they are authorized to see.

### 2.2 Data Interaction with CDF

FR-2.1: The application must retrieve data from CDF using its REST or GraphQL APIs. It must only use data modelling.

### 2.3 Styling

FR-3.1: The application must use components from the cdf-design-system-alpha package. Only when the component does not exist should a new one be made.

[Fill in more functional requirements here]

## 3. Non-Functional Requirements

### 3.1 Security

NFR-1.1: All communication with CDF must be secured using OAuth 2.0 or another secure authentication method.

NFR-1.2: Data access within the application must strictly adhere to the user's permissions configured in CDF.

## 4. Data Models & Integration

### 4.1 CDF Data Model

The application's data model will be built directly on top of the Cognite Data Fusion data model, which links operational technology (OT) and information technology (IT) data. The application will leverage the following core concepts:

### 4.1.1 Existing views

The following existing views will be used to collect data from

[Fill in what existing views will be used]

### 4.1.2 New views

The following new views will be created to support the application requirements.

[Fill in what new views will be created. Use typescript types to represent these new views.]

### 4.1.3 Spaces

[List what spaces will be used in this project. Ensure you know what space the existing data exists in]

## 5. User Stories

[Fill in user stories]

Technology Stack
Frontend: React. React query. Cognite design system (cdf-design-system-alpha) + tailwindcss. Auth package (dune-fe-infra).

Backend & Database: CDF Only. No other backend needed.
