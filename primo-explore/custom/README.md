
# The Primo New UI Customization Workflow Development Environment

## Development guidelines

1. Generate site color
    - Update `primo-explore-devenv/primo-explore/<VIEW>/colos.json`, for example
    > {
    >   "primary": "#BBBBBB",
    >   "secondary" : "#FFFFFF",
    >   "backgroundColor" : "white",
    >   "links": "#3D6E94",
    >   "warning": "tomato",
    >   "positive": "#0F7D00",
    >   "negative": "gray",
    >   "notice": "#E08303"
    > } 

    - `cd` into `primo-explore-devenv` and run command `gulp app-css --view <VIEW>`
    

2. Develop modular Features in separate ODF packages instead of putting everything in one big view based package.

    - Examples of naming convention:

    - File structure:
        - js ->
            - custom.module.js 
            - primo-explore-{{feature}}.js
            - primo-explore-{{service-name}}-service.js
            - primo-explore-{{directive id}}.js
        - scss ->
            - main.scss
            - primo-explore-{{feature}}.scss
            - primo-explore-{{service-name}}-service.scss
            - primo-explore-{{directive id}}.scss
