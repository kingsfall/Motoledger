# Motoledger

Motoledger is a local-first MVP for managing a motorcycle as an asset. It tracks mileage, accessory/service records, workshops, installers, maintenance intervals, health status, next service needs, assistant-style maintenance guidance, and ownership transfer exports.

## Run

Open `index.html` in a browser. No build step or package install is required.

For the auth backend and account sync:

```bash
npm start
```

Then open `http://localhost:4180`. The backend uses only Node built-in modules and stores local development data in `data/motoledger-db.json`.

## Current MVP Features

- Motorcycle profile with brand and model selection.
- Guided text intake that extracts bike profile details from pasted notes.
- Built-in typical maintenance templates for selected motorcycle models.
- Mileage, monthly use, acquisition date, and baseline mileage tracking.
- Accessory / service records with itemized work, accessories, modifications, costs, notes, and odometer readings.
- Bulk accessory/service history import from pasted text with editable draft preview before saving.
- Receipt and dash photo attachments for log records, with upload-triggered auto-fill from readable filenames and photo metadata.
- Health dashboard with overdue and upcoming maintenance.
- Forecast view showing next mileage/date service intervals.
- Manual notes area used by the maintenance assistant.
- Rule-based assistant that can later be connected to a real AI backend.
- JSON ownership package export/import.
- Downloadable sale report for transfer to a buyer or next owner.
- Local Node auth backend with password hashing, signed session cookies, user profile APIs, user-owned Motoledger state sync, and first-class motorcycle plus accessory/service log APIs.

## Backend API Milestone

The backend currently runs without third-party services. It uses Node built-in modules and stores local development data in `data/motoledger-db.json`.

Authenticated API resources:

- `GET /api/motorcycles`
- `POST /api/motorcycles`
- `GET /api/motorcycles/:motorcycleId`
- `PATCH /api/motorcycles/:motorcycleId`
- `DELETE /api/motorcycles/:motorcycleId`
- `GET /api/motorcycles/:motorcycleId/log-records`
- `POST /api/motorcycles/:motorcycleId/log-records`
- `GET /api/motorcycles/:motorcycleId/log-records/:recordId`
- `PATCH /api/motorcycles/:motorcycleId/log-records/:recordId`
- `DELETE /api/motorcycles/:motorcycleId/log-records/:recordId`

The legacy full-profile sync endpoint remains available at `PUT /api/users/me/state`; it also materializes the current motorcycle and accessory/service records into the structured resources above.

No third-party API is required for this milestone. Third-party services become useful later for production database hosting, image/file storage, OCR, LLM parsing, email, and payments.

## Next Product Steps

- Move production data from the local JSON file into a managed database once deployment requirements are clear.
- Upload and parse owner manuals into a model-specific knowledge base.
- Connect the assistant to an AI backend with retrieval over manuals and accessory/service history.
- Add OCR extraction for text inside dash photos and invoice images.
- Add multi-bike garage support and workshop contact management.
