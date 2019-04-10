module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
    },
    "extends": [
        'plugin:vue/recommended'
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },

    "rules": {
        "indent": [
            "off",
            "tab"
        ],
        "linebreak-style": [
            "off",
            "unix"
        ],
        "quotes": [
            "off",
            "single"
        ],
        "semi": [
            "off",
            "always"
        ],
       "vue/html-indent":[
           "off",
           "always"
       ],
       "vue/max-attributes-per-line":[
           "off"
       ]
       
    }
};