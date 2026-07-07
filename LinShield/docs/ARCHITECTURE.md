# LinShield Architecture

LinShield is organised as a small defensive Linux review project.

## Flow

1. Run the command-line entry point.
2. Collect basic system information.
3. Run selected configuration review checks.
4. Store results in a structured report file.
5. Display a short terminal summary.

## Modules

- `linshield.py` - command-line entry point
- `checks.py` - individual review checks
- `report.py` - report formatting and saving
- `scripts/run_audit.sh` - helper runner

## Design Goals

- Keep the code simple and readable
- Use Python standard library where possible
- Make output easy to understand
- Document every check clearly
- Keep usage limited to authorised systems
