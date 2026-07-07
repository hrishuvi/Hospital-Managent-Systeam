# LinShield - Automated Security Audit Tool

LinShield is a Python and Bash-based automated Linux security audit tool built to perform system configuration checks and generate structured security reports.

This project demonstrates self-driven product learning, technical experimentation, defensive security automation, and knowledge documentation skills.

## Project Summary

LinShield automates common Linux security checks and produces a readable audit report that can be used for learning, internal review, and security documentation.

It is designed as a defensive security and portfolio project, especially useful for demonstrating:

- Linux security fundamentals
- Python and Bash automation
- Audit checklist design
- Report generation
- Technical documentation
- Product-style learning and experimentation

## Key Features

- Automated Linux system checks
- Password policy review
- SSH configuration review
- Firewall status check
- Running services check
- File permission checks
- User and sudo access review
- Structured JSON report output
- Human-readable terminal summary
- Bash runner script for quick execution

## Why This Project Matters

LinShield shows the ability to learn a technical product/domain independently, break security requirements into checks, automate repeatable tasks, and document findings clearly.

This aligns well with roles requiring:

- Product knowledge development
- Technical documentation
- Customer-facing technical explanation
- Troubleshooting mindset
- Security and systems awareness

## Tech Stack

| Area | Tools |
|---|---|
| Language | Python, Bash |
| Platform | Linux |
| Output | JSON, Terminal Summary |
| Focus | Defensive Security Audit |

## Project Structure

```text
LinShield/
├── README.md
├── requirements.txt
├── scripts/
│   └── run_audit.sh
├── src/
│   ├── linshield.py
│   ├── checks.py
│   └── report.py
└── sample_reports/
    └── sample_report.json
```

## Installation

```bash
git clone https://github.com/hrishuvi/Hospital-Managent-Systeam.git
cd Hospital-Managent-Systeam/LinShield
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Usage

```bash
python3 src/linshield.py
```

Or run using the Bash helper:

```bash
bash scripts/run_audit.sh
```

## Sample Output

```text
LinShield Security Audit
Status: Completed
Checks Passed: 5
Warnings: 3
Report: sample_reports/latest_report.json
```

## Checks Included

| Check | Description |
|---|---|
| OS Info | Collects Linux distribution and kernel details |
| SSH Config | Reviews SSH root login and password auth settings |
| Firewall | Checks UFW/firewalld status where available |
| Password Policy | Reviews common password policy files |
| Sudo Users | Lists users with sudo-related access indicators |
| Services | Lists active services for review |
| File Permissions | Checks selected sensitive file permissions |

## Responsible Use

This tool is designed for defensive auditing, learning, and authorized internal review only. Run it only on systems you own or have permission to assess.

## Future Improvements

- CIS benchmark mapping
- HTML report output
- PDF report generation
- Risk scoring
- Remediation recommendations
- Docker lab environment
- GitHub Actions test workflow

## CV Bullet

**LinShield - Automated Security Audit Tool**  
Built a Python/Bash tool that automates Linux system checks and produces structured reports, demonstrating self-driven product learning, technical experimentation, and knowledge documentation skills aligned to product knowledge and technical support requirements.

## Author

Hrishikesh Sathe
