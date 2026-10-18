import {
  BellRing,
  CheckCircle2,
  Clock3,
  Database,
  GitPullRequestArrow,
  Headphones,
  Link2,
  MessageSquarePlus,
  RadioTower,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import './App.css'

type CaseStage = 'New' | 'Routed' | 'In Progress' | 'Escalated'
type Severity = 'P1' | 'P2' | 'P3'

type ServiceCase = {
  id: string
  account: string
  contact: string
  subject: string
  severity: Severity
  stage: CaseStage
  owner: string
  sla: string
  product: string
  externalStatus: string
  lastUpdate: string
  actions: string[]
  notes: string[]
}

const serviceCases: ServiceCase[] = [
  {
    id: 'SC-22018',
    account: 'Avion Health',
    contact: 'Mina Patel',
    subject: 'Replacement equipment stuck before carrier handoff',
    severity: 'P1',
    stage: 'Escalated',
    owner: 'Service Ops',
    sla: '39 min',
    product: 'Field Service',
    externalStatus: 'Carrier handoff pending',
    lastUpdate: '7 minutes ago',
    actions: ['Publish escalation event', 'Refresh external status', 'Create operations task'],
    notes: ['Healthcare account', 'Replacement approved', 'SLA breach risk'],
  },
  {
    id: 'SC-22024',
    account: 'BrightPath Energy',
    contact: 'Evan Brooks',
    subject: 'Calibration failure after firmware update',
    severity: 'P2',
    stage: 'In Progress',
    owner: 'Product Support',
    sla: '4 hr',
    product: 'Device Cloud',
    externalStatus: 'Firmware status verified',
    lastUpdate: '15 minutes ago',
    actions: ['Attach knowledge article', 'Request diagnostic logs', 'Monitor similar cases'],
    notes: ['Warranty active', 'Known issue candidate', 'Firmware 5.2.1'],
  },
  {
    id: 'SC-22031',
    account: 'Luma Manufacturing',
    contact: 'Jules Kim',
    subject: 'Users missing exception dashboard access',
    severity: 'P3',
    stage: 'Routed',
    owner: 'CRM Platform',
    sla: '1 day',
    product: 'Sales Cloud',
    externalStatus: 'ERP connector healthy',
    lastUpdate: '22 minutes ago',
    actions: ['Validate permission set group', 'Log access review', 'Notify case owner'],
    notes: ['New user cohort', 'Dashboard folder access', 'No outage detected'],
  },
]

const releaseChecklist = [
  'Named Credential endpoint verified',
  'Queueable status refresh covered by test',
  'Platform Event payload reviewed',
  'Permission set changes ready for UAT',
]

function App() {
  const [selectedId, setSelectedId] = useState(serviceCases[0].id)
  const selectedCase = serviceCases.find((item) => item.id === selectedId) ?? serviceCases[0]

  const metrics = useMemo(
    () => [
      { label: 'Manual review reduction', value: '31.2%', icon: Workflow },
      { label: 'Overdue follow-up reduction', value: '22.8%', icon: Clock3 },
      { label: 'Open priority cases', value: '3', icon: BellRing },
      { label: 'Integration checks', value: '4', icon: Link2 },
    ],
    [],
  )

  return (
    <main className="console-shell">
      <aside className="rail" aria-label="Console navigation">
        <div className="rail-brand">
          <Headphones size={24} aria-hidden="true" />
          <span>SupportOps</span>
        </div>
        <nav>
          <a href="#workspace">Workspace</a>
          <a href="#automation">Automation</a>
          <a href="#release">Release</a>
        </nav>
      </aside>

      <section className="main-workspace" id="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">Salesforce Service Cloud project</p>
            <h1>Service Case Automation & Support Console</h1>
            <p>
              A practical support console for creating, routing, updating, and escalating service cases with SLA
              awareness, external status lookup, integration logs, and release-ready Salesforce source.
            </p>
          </div>
          <a href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noreferrer">
            GitHub profile
          </a>
        </header>

        <section className="metrics-strip" aria-label="Project metrics">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <article key={metric.label}>
                <Icon size={19} aria-hidden="true" />
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            )
          })}
        </section>

        <section className="console-grid" aria-label="Support case console">
          <aside className="queue-panel">
            <div className="panel-title">
              <h2>Priority queue</h2>
              <span>{serviceCases.length} active</span>
            </div>
            {serviceCases.map((item) => (
              <button
                className={item.id === selectedId ? 'queue-item selected' : 'queue-item'}
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                type="button"
              >
                <span className={`severity ${item.severity.toLowerCase()}`}>{item.severity}</span>
                <strong>{item.subject}</strong>
                <small>
                  {item.account} | {item.stage}
                </small>
              </button>
            ))}
          </aside>

          <article className="case-workbench">
            <div className="case-heading">
              <div>
                <p>{selectedCase.id}</p>
                <h2>{selectedCase.subject}</h2>
              </div>
              <span className={`stage ${selectedCase.stage.toLowerCase().replaceAll(' ', '-')}`}>
                {selectedCase.stage}
              </span>
            </div>

            <div className="case-facts">
              <Info label="Account" value={selectedCase.account} />
              <Info label="Contact" value={selectedCase.contact} />
              <Info label="Owner" value={selectedCase.owner} />
              <Info label="SLA remaining" value={selectedCase.sla} />
              <Info label="Product" value={selectedCase.product} />
              <Info label="Last update" value={selectedCase.lastUpdate} />
            </div>

            <section className="action-board" id="automation">
              <div>
                <p className="eyebrow">Recommended automation</p>
                <h3>Next actions</h3>
              </div>
              <div className="action-list">
                {selectedCase.actions.map((action) => (
                  <button key={action} type="button">
                    <MessageSquarePlus size={16} aria-hidden="true" />
                    {action}
                  </button>
                ))}
              </div>
            </section>
          </article>

          <aside className="context-stack">
            <article>
              <div className="panel-title">
                <h2>External status</h2>
                <RadioTower size={18} aria-hidden="true" />
              </div>
              <strong>{selectedCase.externalStatus}</strong>
              <p>REST lookup modeled through Named Credential and OAuth configuration.</p>
            </article>
            <article>
              <div className="panel-title">
                <h2>Case signals</h2>
                <Database size={18} aria-hidden="true" />
              </div>
              <ul>
                {selectedCase.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </article>
          </aside>
        </section>

        <section className="release-panel" id="release" aria-label="Release readiness">
          <div>
            <p className="eyebrow">Salesforce DX handoff</p>
            <h2>Release-ready checklist</h2>
          </div>
          <div className="checklist">
            {releaseChecklist.map((item) => (
              <article key={item}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{item}</span>
              </article>
            ))}
          </div>
          <div className="architecture-row">
            <span>
              <ShieldCheck size={18} aria-hidden="true" /> CRUD/FLS-aware Apex
            </span>
            <span>
              <GitPullRequestArrow size={18} aria-hidden="true" /> Salesforce DX source
            </span>
            <span>
              <Workflow size={18} aria-hidden="true" /> Platform Event handoff
            </span>
          </div>
        </section>
      </section>
    </main>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="fact">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default App
