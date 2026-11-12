# Architecture rules

- Keep confirmation spam decisions in the email function before either email is sent; client fields are signals, not enforcement.
- Capture multi-step form honeypots before showing processing screens, because those screens unmount the form.