# Motoledger

Motoledger is a local-first MVP for managing a motorcycle as an asset. It tracks mileage, service records, workshops, maintenance intervals, health status, next service needs, assistant-style maintenance guidance, and ownership transfer exports.

## Run

Open `index.html` in a browser. No build step or package install is required.

## Current MVP Features

- Motorcycle profile with brand and model selection.
- Guided text intake that extracts bike profile details from pasted notes.
- Built-in typical maintenance templates for selected motorcycle models.
- Mileage, monthly use, acquisition date, and baseline mileage tracking.
- Workshop service records with itemized tasks, costs, notes, and odometer readings.
- Bulk service history import from pasted text with editable draft preview before saving.
- Receipt and dash photo attachments for service records, with upload-triggered auto-fill from readable filenames and photo metadata.
- Health dashboard with overdue and upcoming maintenance.
- Forecast view showing next mileage/date service intervals.
- Manual notes area used by the maintenance assistant.
- Rule-based assistant that can later be connected to a real AI backend.
- JSON ownership package export/import.
- Downloadable sale report for transfer to a buyer or next owner.

## Next Product Steps

- Add user accounts and cloud sync.
- Upload and parse owner manuals into a model-specific knowledge base.
- Connect the assistant to an AI backend with retrieval over manuals and service history.
- Add OCR extraction for text inside dash photos and invoice images.
- Add multi-bike garage support and workshop contact management.
