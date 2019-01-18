import config_json = require("dojo/text!./app/config.json");

class Application {
    constructor() {
        let config = JSON.parse(config_json);

    }
}

(function () {
    let app = new Application();
})();


