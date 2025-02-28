# Paragóne Signature and Associates website ui

# React + TypeScript + Vite

# Few things to NOTE to ensure continuity:
Folder structure:

- Folders are structured based on App features or/and pages.

- Top level folder for page or feature
    - /components
    - /hooks
    - /reducers
    - /selectors
    - /helpers <!-- for helper functions per feature or page -->
    - /types
    - /__data__  <!-- if needed -->
    - /__fixtures__  <!-- if needed -->
  
- We don't use css files, all styling is done via the sx prop in MUI components find example in App.tsx.

- Api calls are made inside hooks and dispatched to the store(if needed) through a reducer.

- Do NOT push to the `main/master` branch rather create a new branch `git checkout -b <new-branch>`.

- Do a pull/merge request into the `main/master` branch that'd be approved by the lead