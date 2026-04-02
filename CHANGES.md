# Implementation: Why & How

## 1. Skill Schema

- Defined the input schema directly from the API contract (`name`, `category`, `level`) to keep create/edit payloads aligned and avoid over-modeling this simple step.

## 2. Reusable Skill Form

- **Why**: I kept `SkillForm` presentation-only so the same component can be reused by both dialogs without coupling UI fields to mutation behavior.
- **How**: The form receives context from parent dialogs and now accepts `isSubmitting` to block duplicate submits while a mutation is pending.

## 3. Add Skill Dialog

- **Why**: I kept create-side effects in the dialog layer so `SkillForm` stays reusable and mutation concerns stay isolated.
- **How**: The dialog owns `usePostSkill`, reset/close behavior on success, cache invalidation, and pending-state propagation to `SkillForm`.

## 4. Edit Skill Dialog

- **Why**: I mirrored the Add dialog architecture to keep create/edit flows consistent and reduce maintenance overhead.
- **How**: The dialog owns `usePutSkill`, prefilled defaults, close-on-success behavior, cache invalidation, and pending-state propagation to `SkillForm`.

## 5. Delete Skill

- Kept deletion behind a confirmation popover and mutation pending state so destructive actions remain explicit and protected against double-trigger.

## 6. Applications Page

- **Why**: I use a server-side page because the applicants API depends on non-public credentials and must stay off the client.
- **How**: Data is fetched server-side, validated, transformed, and rendered through typed cards with route-level loading/error UI.
