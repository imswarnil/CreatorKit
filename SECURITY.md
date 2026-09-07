# Security

## Reporting

Email **swarnilsinghaicse@gmail.com** with what you found, how to reproduce it, and what an
attacker could do with it. Please do not open a public issue for anything exploitable.

Expect an acknowledgement within a few days. If a fix is warranted you will be credited in
the release notes unless you would rather not be.

## Scope

CreatorKit is a CSS and React component library. The realistic issues are:

- Markup or class combinations that break out of their container in a way a page cannot
  contain — e.g. a component that escapes `overflow: hidden` on a user-content boundary.
- A component that renders caller-supplied content without the escaping its API implies.
- A build tool in `tools/` that executes or writes something it should not, given a
  crafted package.

Out of scope: the styling of a site built with the kit, anything requiring a compromised
build machine, and the local Ghost install under `ghost/` — that is a preview harness with
a throwaway database, not a deployment.

## Supported versions

Pre-1.0. Fixes land on `main` and go out in the next release; there are no backports.
