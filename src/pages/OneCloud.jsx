import React, { useState } from 'react';
import { 
  Cloud, 
  Sparkles, 
  Server, 
  Database, 
  Cpu, 
  ShieldCheck, 
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useOne } from '../context/OneContext';

const FOUNDATION_MODELS = [
  { id: "anthropic.claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", context: "200k tokens", latency: "140ms", accuracy: "98.4%", badge: "Most Intelligent" },
  { id: "meta.llama3-70b-instruct", name: "Meta Llama 3 (70B)", provider: "Meta AI", context: "128k tokens", latency: "95ms", accuracy: "95.1%", badge: "Fast Open Weights" },
  { id: "amazon.titan-text-premier", name: "Amazon Titan Premier", provider: "Amazon", context: "32k tokens", latency: "80ms", accuracy: "94.2%", badge: "Cost Efficient" },
  { id: "cohere.command-r-plus", name: "Cohere Command R+", provider: "Cohere", context: "128k tokens", latency: "115ms", accuracy: "96.0%", badge: "Best for RAG" }
];

const COMPUTE_TRAFFIC_DATA = [
  { time: '00:00', requests: 120, latency: 18, cpu: 22 },
  { time: '04:00', requests: 85, latency: 15, cpu: 18 },
  { time: '08:00', requests: 450, latency: 22, cpu: 54 },
  { time: '12:00', requests: 880, latency: 28, cpu: 82 },
  { time: '16:00', requests: 990, latency: 31, cpu: 89 },
  { time: '20:00', requests: 640, latency: 24, cpu: 61 },
  { time: '23:59', requests: 310, latency: 19, cpu: 35 }
];

export default function OneCloud() {
  const { showToast } = useOne();
  const [selectedModel, setSelectedModel] = useState(FOUNDATION_MODELS[0]);
  const [prompt, setPrompt] = useState('Build a serverless microservice architecture for high-volume checkout and live order inventory sync.');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [systemPrompt, setSystemPrompt] = useState('You are an AWS Principal Solutions Architect providing production-ready cloud designs.');
  const [generationOutput, setGenerationOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cloudInstances, setCloudInstances] = useState([
    { id: "i-0941bc8", type: "t4g.xlarge (Graviton3)", zone: "us-east-1a", state: "running", ip: "54.210.84.12", app: "API Gateway Proxy" },
    { id: "i-0883fa1", type: "c7i.2xlarge (Compute)", zone: "us-east-1b", state: "running", ip: "3.92.114.77", app: "Inference Worker (Bedrock)" },
    { id: "i-0129ce4", type: "g5.4xlarge (NVIDIA A10G)", zone: "us-east-1c", state: "running", ip: "18.204.66.42", app: "CUDA PyTorch Worker" }
  ]);

  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: "aws bedrock list-foundation-models --by-provider anthropic", out: '[\n  "anthropic.claude-3-5-sonnet",\n  "anthropic.claude-3-opus",\n  "anthropic.claude-3-haiku"\n]' },
    { cmd: "aws ec2 describe-instances --filters 'Name=instance-state-name,Values=running'", out: '{\n  "Reservations": [\n    { "Instances": [ { "InstanceId": "i-0941bc8", "State": "running", "Type": "t4g.xlarge" } ] }\n  ]\n}' }
  ]);

  const handleApplyPreset = (presetPrompt) => {
    setPrompt(presetPrompt);
    showToast("Loaded architecture template into prompt", "info");
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let out = "";

    if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd.includes("s3")) {
      out = "2026-10-20 14:22:01 s3://amazon-one-prod-assets\n2026-10-18 09:12:44 s3://bedrock-embeddings-catalog\n2026-10-15 11:05:19 s3://prime-video-transcodes-archive";
    } else if (cmd.includes("bedrock") || cmd.includes("model")) {
      out = '[\n  { "modelId": "anthropic.claude-3-5-sonnet", "status": "ACTIVE" },\n  { "modelId": "meta.llama3-70b-instruct", "status": "ACTIVE" },\n  { "modelId": "amazon.titan-text-premier", "status": "ACTIVE" }\n]';
    } else if (cmd.includes("ec2") || cmd.includes("instances")) {
      out = `Total Running: 3 Instances\n- i-0941bc8 | t4g.xlarge | us-east-1a | 54.210.84.12 | OK (2/2 checks)\n- i-0883fa1 | c7i.2xlarge | us-east-1b | 3.92.114.77 | OK (2/2 checks)\n- i-0129ce4 | g5.4xlarge | us-east-1c | 18.204.66.42 | OK (2/2 checks)`;
    } else if (cmd.includes("lambda")) {
      out = '[\n  { "FunctionName": "CheckoutProcessor", "Runtime": "python3.14", "MemorySize": 1024 },\n  { "FunctionName": "InventorySyncWorker", "Runtime": "nodejs22.x", "MemorySize": 512 }\n]';
    } else if (cmd === "status") {
      out = "AWS Health Dashboard: All 32 Availability Zones Operational. Zero active service degradations.";
    } else if (cmd === "help") {
      out = "Available AWS CLI Commands:\n- aws s3 ls\n- aws bedrock list-models\n- aws ec2 describe-instances\n- aws lambda list-functions\n- status\n- clear";
    } else {
      out = `aws: command '${terminalInput}' executed successfully in us-east-1. Type 'help' for available commands.`;
    }

    setTerminalHistory(prev => [...prev, { cmd: terminalInput, out }]);
    setTerminalInput('');
  };

  const handleInstanceAction = (instId, action) => {
    setCloudInstances(prev => prev.map(inst => {
      if (inst.id === instId) {
        const nextState = action === 'stop' ? 'stopped' : 'running';
        showToast(`Instance ${instId} ${action} command sent`, 'info');
        return { ...inst, state: nextState };
      }
      return inst;
    }));
  };

  const handleRunModel = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationOutput('');

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationOutput(
`[Amazon Bedrock Execution Stream]
Model: ${selectedModel.name} (${selectedModel.provider})
Latency: ${selectedModel.latency} | Temperature: ${temperature} | Output Tokens: 482

{
  "architecture_recommendation": {
    "tier_1_edge": {
      "service": "Amazon CloudFront + AWS WAF",
      "purpose": "Global SSL edge acceleration with DDoS protection"
    },
    "tier_2_compute": {
      "service": "AWS Lambda (Python 3.14)",
      "provisioned_concurrency": 250,
      "purpose": "Stateless checkout processing with sub-25ms cold starts"
    },
    "tier_3_messaging": {
      "service": "Amazon SQS FIFO + Amazon EventBridge",
      "purpose": "Deduplicated order event queueing guaranteeing exactly-once delivery"
    },
    "tier_4_storage": {
      "database": "Amazon DynamoDB (On-Demand Capacity)",
      "blob_storage": "Amazon S3 Glacier Instant Retrieval",
      "purpose": "Single-digit millisecond latency at petabyte scale"
    }
  },
  "estimated_cost_optimization": "44% savings vs over-provisioned EC2 cluster",
  "durability_sla": "99.999999999% (11 9s)"
}`
      );
      showToast(`Synthesized solution on ${selectedModel.name}`, "success");
    }, 900);
  };

  return (
    <div className="cloud-console-root">
      {/* AWS Cloud Console Header */}
      <div className="aws-header-bar card-base">
        <div className="aws-brand-group">
          <div className="aws-cube-logo">
            <Cloud size={24} />
          </div>
          <div>
            <div className="aws-badge-pill">
              <Sparkles size={13} />
              <span>AWS Cloud Infrastructure & Amazon Bedrock Console</span>
            </div>
            <h1 className="aws-console-title">Cloud Architecture & Generative AI Studio</h1>
          </div>
        </div>

        <div className="aws-quick-actions">
          <span className="region-pill">Region: <strong>us-east-1 (N. Virginia)</strong></span>
          <a href="https://aws.amazon.com" target="_blank" rel="noreferrer" className="btn-navy console-btn">
            <span>AWS Management Console</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* SUB-APP SECTION 1: AMAZON BEDROCK LLM MODEL BENCHMARK & PLAYGROUND */}
      <div className="bedrock-workbench-grid">
        {/* Model Selection Panel */}
        <div className="models-sidebar card-base">
          <h3 className="panel-title">Available Foundation Models</h3>
          <p className="panel-sub">Select model to execute serverless inference</p>

          <div className="model-cards-list">
            {FOUNDATION_MODELS.map(m => (
              <div 
                key={m.id} 
                onClick={() => { setSelectedModel(m); showToast(`Switched to ${m.name}`, 'info'); }}
                className={`model-card ${selectedModel.id === m.id ? 'model-selected' : ''}`}
              >
                <div className="model-head-line">
                  <span className="model-provider-tag">{m.provider}</span>
                  <span className="model-badge-tag">{m.badge}</span>
                </div>
                <h4 className="model-name">{m.name}</h4>
                <div className="model-metrics-line">
                  <span>Context: <strong>{m.context}</strong></span>
                  <span>Latency: <strong>{m.latency}</strong></span>
                  <span className="text-success">{m.accuracy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Bedrock Playground & Code Generator */}
        <div className="playground-main-col card-base">
          <div className="playground-toolbar">
            <div className="active-model-meta">
              <Sparkles size={18} className="text-amber-500" />
              <span>Active Model: <strong>{selectedModel.name}</strong></span>
            </div>
            <div className="slider-controls">
              <label className="param-label">
                Temp: <strong>{temperature}</strong>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={temperature} 
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="param-slider"
                />
              </label>
              <label className="param-label">
                Max Tokens: <strong>{maxTokens}</strong>
              </label>
            </div>
          </div>

          <form onSubmit={handleRunModel} className="playground-form-inner">
            <div className="prompt-field-group">
              <label className="field-label-sm">System Prompt (Guardrails & Persona):</label>
              <input 
                type="text" 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="system-prompt-input"
              />
            </div>

            {/* Architecture Templates */}
            <div className="prompt-presets-bar">
              <span className="preset-label">Architecture Templates:</span>
              <div className="presets-row">
                <button 
                  type="button" 
                  onClick={() => handleApplyPreset("Design a high-throughput serverless checkout pipeline using AWS Lambda, Amazon EventBridge, and DynamoDB.")}
                  className="preset-chip"
                >
                  ⚡ Serverless Checkout
                </button>
                <button 
                  type="button" 
                  onClick={() => handleApplyPreset("Architect a multi-region active-active DynamoDB Global Table with single-digit millisecond read/write replication.")}
                  className="preset-chip"
                >
                  🗄️ DynamoDB Global
                </button>
                <button 
                  type="button" 
                  onClick={() => handleApplyPreset("Build a zero-trust enterprise AWS WAF and GuardDuty security posture for public API endpoints.")}
                  className="preset-chip"
                >
                  🛡️ Zero Trust Security
                </button>
              </div>
            </div>

            <div className="prompt-field-group">
              <label className="field-label-sm">User Instruction / Architecture Prompt:</label>
              <textarea 
                rows="3"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Bedrock for cloud architectures, Lambda functions, or DynamoDB schemas..."
                className="user-prompt-textarea"
              />
            </div>

            <div className="execute-bar">
              <button type="submit" disabled={isGenerating} className="btn-primary execute-btn">
                <Play size={16} />
                <span>{isGenerating ? "Synthesizing with Bedrock..." : "Run Serverless Model"}</span>
              </button>
              <span className="sim-notice">Simulated AWS Bedrock Foundation API • Zero charges incurred</span>
            </div>
          </form>

          {/* Terminal Code Output */}
          {generationOutput && (
            <div className="bedrock-terminal-box">
              <div className="terminal-bar">
                <Terminal size={14} />
                <span>Output Console ({selectedModel.id})</span>
              </div>
              <pre className="terminal-code">{generationOutput}</pre>
            </div>
          )}
        </div>
      </div>

      {/* SUB-APP SECTION 2: LIVE EC2 COMPUTE CLUSTERS & NETWORK TELEMETRY */}
      <div className="infrastructure-section-grid">
        {/* Real-time Telemetry Graph */}
        <div className="chart-telemetry-card card-base">
          <div className="telemetry-header">
            <div>
              <h3 className="panel-title">AWS Global Infrastructure Telemetry</h3>
              <p className="panel-sub">Inbound HTTP/3 API Gateway throughput and CPU utilization</p>
            </div>
            <span className="badge-pass">All Regions Operational</span>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={COMPUTE_TRAFFIC_DATA}>
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" fill="#ede9fe" name="Throughput (req/s)" />
                <Area type="monotone" dataKey="cpu" stroke="#f59e0b" fill="#fef3c7" name="CPU Utilization %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live EC2 Virtual Server Instances */}
        <div className="instances-card card-base">
          <div className="telemetry-header">
            <div>
              <h3 className="panel-title">Active EC2 Instances</h3>
              <p className="panel-sub">Virtual server compute nodes</p>
            </div>
            <span className="badge-pass">3 Nodes</span>
          </div>

          <div className="instances-list">
            {cloudInstances.map(inst => (
              <div key={inst.id} className="instance-item">
                <div className="instance-head">
                  <div className="inst-lead">
                    <Server size={16} className="text-amber-500" />
                    <strong>{inst.id}</strong>
                    <span className={inst.state === 'running' ? "badge-pass" : "badge-fail"} style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                      {inst.state.toUpperCase()}
                    </span>
                  </div>
                  <div className="instance-btn-group">
                    <button 
                      type="button" 
                      onClick={() => handleInstanceAction(inst.id, 'reboot')} 
                      className="inst-action-btn"
                      title="Reboot node"
                    >
                      <RotateCcw size={12} /> Reboot
                    </button>
                    {inst.state === 'running' ? (
                      <button 
                        type="button" 
                        onClick={() => handleInstanceAction(inst.id, 'stop')} 
                        className="inst-action-btn text-danger"
                        title="Stop instance"
                      >
                        Stop
                      </button>
                    ) : (
                      <button 
                        type="button" 
                        onClick={() => handleInstanceAction(inst.id, 'start')} 
                        className="inst-action-btn text-success"
                        title="Start instance"
                      >
                        Start
                      </button>
                    )}
                  </div>
                </div>
                <div className="instance-meta">
                  <span>Type: <strong>{inst.type}</strong></span>
                  <span>Zone: {inst.zone}</span>
                  <span>App: <strong>{inst.app}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SUB-APP SECTION 3: AWS CLOUDSHELL INTERACTIVE CLI TERMINAL */}
      <div className="cloudshell-terminal-card card-base">
        <div className="cloudshell-top-bar">
          <div className="shell-brand">
            <Terminal size={16} className="text-emerald-400" />
            <strong>AWS CloudShell Terminal (Bash CLI)</strong>
          </div>
          <span className="shell-user">ganesh@aws-cloudshell:us-east-1 ~ $</span>
        </div>

        <div className="shell-body">
          <div className="shell-welcome-line">
            Amazon Linux 2026.4.0 (x86_64) • AWS CLI 2.22.8 • Amazon Bedrock SDK Active
            <br />
            Type <code>help</code>, <code>aws s3 ls</code>, <code>aws bedrock list-models</code>, <code>aws ec2 describe-instances</code>, or <code>status</code>.
          </div>

          <div className="shell-history-flow">
            {terminalHistory.map((h, i) => (
              <div key={i} className="shell-history-block">
                <div className="shell-cmd-line">
                  <span className="shell-prompt">$</span> <strong>{h.cmd}</strong>
                </div>
                <pre className="shell-output">{h.out}</pre>
              </div>
            ))}
          </div>

          <form onSubmit={handleTerminalSubmit} className="shell-prompt-input-row">
            <span className="shell-prompt-live">$</span>
            <input 
              type="text" 
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type AWS CLI command (e.g. 'aws s3 ls', 'status', 'help')..."
              className="shell-terminal-input"
            />
          </form>
        </div>
      </div>

      <style>{`
        .cloud-console-root {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .aws-header-bar {
          background: #0f172a;
          color: #ffffff;
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-left: 5px solid #f59e0b;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .aws-brand-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .aws-cube-logo {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .aws-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: #f59e0b;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }
        .aws-console-title {
          font-size: 1.6rem;
          color: #ffffff;
          line-height: 1.2;
        }
        .aws-quick-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .region-pill {
          font-size: 0.8rem;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-md);
        }
        .region-pill strong {
          color: #ffffff;
        }
        .console-btn {
          padding: 0.65rem 1.15rem;
          font-size: 0.85rem;
        }
        /* Bedrock Grid */
        .bedrock-workbench-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.9fr;
          gap: 1.5rem;
        }
        .models-sidebar, .playground-main-col {
          padding: 1.5rem;
          background: #ffffff;
        }
        .panel-title {
          font-size: 1.15rem;
          color: var(--color-navy-dark);
        }
        .panel-sub {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-bottom: 1.25rem;
        }
        .model-cards-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .model-card {
          padding: 0.85rem 1rem;
          background: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .model-card:hover {
          background: #e2e8f0;
        }
        .model-selected {
          background: #fffbeb !important;
          border-color: var(--color-amber) !important;
          box-shadow: 0 0 0 1px var(--color-amber);
        }
        .model-head-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.2rem;
        }
        .model-provider-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }
        .model-badge-tag {
          font-size: 0.68rem;
          font-weight: 600;
          background: #f1f5f9;
          color: #334155;
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-sm);
        }
        .model-name {
          font-size: 0.95rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.35rem;
        }
        .model-metrics-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .playground-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .active-model-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-navy-dark);
        }
        .slider-controls {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .param-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .param-slider {
          width: 80px;
        }
        .playground-form-inner {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .prompt-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .field-label-sm {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-navy-dark);
          text-transform: uppercase;
        }
        .system-prompt-input {
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          outline: none;
          background: #f8fafc;
        }
        .user-prompt-textarea {
          padding: 0.85rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          outline: none;
          font-family: inherit;
          resize: vertical;
        }
        .execute-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .execute-btn {
          padding: 0.75rem 1.5rem;
        }
        .sim-notice {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .bedrock-terminal-box {
          margin-top: 1.25rem;
          background: #020617;
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .terminal-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #0f172a;
          color: #94a3b8;
          font-size: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .terminal-code {
          padding: 1rem;
          color: #38bdf8;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.82rem;
          line-height: 1.6;
          white-space: pre-wrap;
          margin: 0;
          max-height: 300px;
          overflow-y: auto;
        }
        /* Infrastructure Telemetry */
        .infrastructure-section-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 1.5rem;
        }
        .chart-telemetry-card, .instances-card {
          padding: 1.5rem;
          background: #ffffff;
        }
        .telemetry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .instances-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .instance-item {
          padding: 0.85rem;
          background: var(--color-surface-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .instance-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--color-navy-dark);
        }
        .instance-meta {
          display: flex;
          flex-direction: column;
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .prompt-presets-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        .preset-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
        }
        .presets-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .preset-chip {
          background: #f1f5f9;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          padding: 0.25rem 0.65rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-navy-dark);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .preset-chip:hover {
          background: #f59e0b;
          color: #0f172a;
          border-color: #f59e0b;
        }
        .inst-lead {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
        }
        .instance-btn-group {
          display: flex;
          gap: 0.35rem;
        }
        .inst-action-btn {
          border: 1px solid var(--color-border);
          background: #ffffff;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        .inst-action-btn:hover {
          background: #f1f5f9;
        }
        /* CloudShell Terminal */
        .cloudshell-terminal-card {
          background: #0c1017;
          border: 1px solid #1e293b;
          border-radius: var(--radius-lg);
          overflow: hidden;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .cloudshell-top-bar {
          background: #161e2e;
          padding: 0.75rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #243247;
          font-size: 0.85rem;
        }
        .shell-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ffffff;
        }
        .shell-user {
          font-family: monospace;
          color: #64748b;
          font-size: 0.75rem;
        }
        .shell-body {
          padding: 1.25rem;
          font-family: monospace;
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #090d14;
        }
        .shell-welcome-line {
          color: #94a3b8;
          font-size: 0.78rem;
          line-height: 1.5;
          padding-bottom: 0.75rem;
          border-bottom: 1px dashed #243247;
        }
        .shell-welcome-line code {
          background: #1e293b;
          padding: 0.1rem 0.35rem;
          border-radius: 3px;
          color: #38bdf8;
        }
        .shell-history-flow {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-height: 280px;
          overflow-y: auto;
        }
        .shell-cmd-line {
          display: flex;
          gap: 0.5rem;
          color: #f1f5f9;
        }
        .shell-prompt {
          color: #10b981;
          font-weight: 800;
        }
        .shell-output {
          color: #cbd5e1;
          margin-top: 0.35rem;
          white-space: pre-wrap;
          font-size: 0.8rem;
          line-height: 1.4;
          background: rgba(255, 255, 255, 0.03);
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
        }
        .shell-prompt-input-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid #1e293b;
        }
        .shell-prompt-live {
          color: #10b981;
          font-weight: 800;
          font-size: 1rem;
        }
        .shell-terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #ffffff;
          font-family: monospace;
          font-size: 0.9rem;
          outline: none;
        }
        @media (max-width: 960px) {
          .bedrock-workbench-grid {
            grid-template-columns: 1fr;
          }
          .infrastructure-section-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
