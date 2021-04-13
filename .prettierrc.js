module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    arrowParens: "always",
    useTabs: false,
    "overrides": [
        {
            "files": ["**/*.json", "**/*.css", "**/*.scss", "**/*.html"],
            "options": {
                "singleQuote": false
            }
        }
    ]
};