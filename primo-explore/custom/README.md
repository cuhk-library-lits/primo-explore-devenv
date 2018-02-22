
# The Primo New UI Customization Workflow Development Environment

## Development guidelines

- Develop modular Features in separate ODF packages instead of putting everything in one big view based package.

- File structure:
    - js ->
        - custom.module.js 
        - primo-explore-{{feature}}.js
        - primo-explore-{{service-name}}-service.js
    - scss ->
        - main.scss
        - primo-explore-{{feature}}.scss
        - primo-explore-{{service-name}}-service.scss
