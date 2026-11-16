# Architecture rules

- Keep confirmation spam decisions in the email function before either email is sent; client fields are signals, not enforcement.
- Capture multi-step form honeypots before showing processing screens, because those screens unmount the form.
- Read the public portfolio through an isolated session-free CMS client and one shared home/all component; this keeps catalog reads separate from the site's backend and grouping consistent.