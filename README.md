# Service Case Automation & Support Console

A Salesforce Service Cloud portfolio project that demonstrates a support console for creating, routing, updating, and escalating service cases with SLA awareness, external status lookup, integration logs, and release-ready Salesforce DX source.

This repository includes:

- **Working web demo:** A React + TypeScript support console that runs without Salesforce org access.
- **Salesforce DX source:** Apex, LWC, and Platform Event examples for a Developer Edition org.

## Live Demo

```text
https://YOUR_GITHUB_USERNAME.github.io/service-case-automation-support-console/
```

## Resume Project Mapping

The resume project says:

> Built a case console using LWC, Apex, SOQL, and Flows to create, route, update, and escalate support cases. Reduced manual case review steps by 31.2% in test scenarios. Added SLA routing, REST API status lookup, and integration logs using Custom Metadata, Platform Events, Batch Apex, Queueable Apex, Named Credentials, and OAuth. Cut overdue case follow up time by 22.8%.

This repo converts that into a public demo plus Salesforce source artifacts.

## Demo Features

- Persistent support console layout with queue navigation.
- Case workspace with account, contact, owner, SLA, product, and update context.
- Recommended automation actions for escalation, external refresh, and operations follow-up.
- External status panel modeled around REST + Named Credential usage.
- Release checklist for Salesforce DX handoff.

## Salesforce Source Included

| Area | Source |
| --- | --- |
| Apex controller | `force-app/main/default/classes/ServiceConsoleController.cls` |
| Apex tests | `force-app/main/default/classes/ServiceConsoleControllerTest.cls` |
| Service update event | `force-app/main/default/objects/Service_Case_Update__e` |
| Case record LWC | `force-app/main/default/lwc/serviceCaseConsole` |

## Local Setup

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Salesforce Developer Edition Deployment

```bash
sf org login web --alias support-console-dev --set-default
sf project deploy start --source-dir force-app --target-org support-console-dev
sf apex run test --target-org support-console-dev --class-names ServiceConsoleControllerTest --result-format human --code-coverage
```

After deployment:

1. Add **Service Case Console** to the Case Lightning Record Page.
2. Create sample Case records with High, Medium, and Low priorities.
3. Confirm the LWC displays stage, owner queue, external status, and next action.
4. Review the `Service_Case_Update__e` Platform Event for downstream workflow handoff.

## Tech Stack

- React 19
- TypeScript
- Vite
- Salesforce DX source format
- Apex
- Lightning Web Components
- Platform Events
- Service Cloud workflow design
- GitHub Actions
- GitHub Pages



