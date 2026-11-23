-- /admin/send extra attachments: allow images and Word files besides PDFs in client-reports.
BEGIN;
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'application/pdf',
  'image/png', 'image/jpeg', 'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]
WHERE id = 'client-reports';
COMMIT;
