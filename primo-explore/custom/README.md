
# The Primo New UI Customization Workflow Development Environment

## Development guidelines

1. Generate site color
    - Update `primo-explore-devenv/primo-explore/<VIEW>/colos.json`, for example
        ```css
        {
        "primary": "#CCCCCC",
        "secondary" : "#FFFFFF",
        "backgroundColor" : "white",
        "links": "#3D7E94",
        "warning": "tomato",
        "positive": "#0F7D00",
        "negative": "gray",
        "notice": "#E08303"
        }
        ```

    - `cd` into `primo-explore-devenv` and run command `gulp app-css --view <VIEW>`
    

2. Develop modular Features in separate ODF packages instead of putting everything in one big view based package.

    - Examples of naming convention:

    - File structure:
        - js ->
            - custom.js
            - custom.module.js
            - controller
                - primo-explore-{{prm-directive}}-controller.js
            - service
                - primo-explore-{{service-name}}-service.js
        - scss ->
            - main.scss
            - primo-explore-{{prm-directive}}.scss
            - primo-explore-{{feature}}.scss

3. To inspect angular scope
    - Use the following commands
        ```javascript
        angular.reloadWithDebugInfo() 
        angular.element($0).scope().$ctrl 
        ```