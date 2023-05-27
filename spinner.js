/* eslint-disable indent */
/**
 * Copyright 2023 HiroyasuNishiyama
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/


module.exports = (RED) => {
    const path = require("path");
    const fs = require("fs");

    function snippetFor(kind, size) {
        const style = ""; 
        switch (kind) {
        case "plane":
            return String.raw`
<div class='sk-plane sk-center' ${style}></div>
`;
        case "chase":
            return String.raw`
<div class='sk-chase sk-center' ${style}>
  <div class='sk-chase-dot'></div>
  <div class='sk-chase-dot'></div>
  <div class='sk-chase-dot'></div>
  <div class='sk-chase-dot'></div>
  <div class='sk-chase-dot'></div>
  <div class='sk-chase-dot'></div>
</div>
`;
        case "bounce":
            return String.raw`
<div class='sk-bounce sk-center' ${style}>
  <div class='sk-bounce-dot'></div>
  <div class='sk-bounce-dot'></div>
</div>
`;
        case "wave":
            return String.raw`
<div class='sk-wave sk-center' ${style}>
  <div class='sk-wave-rect'></div>
  <div class='sk-wave-rect'></div>
  <div class='sk-wave-rect'></div>
  <div class='sk-wave-rect'></div>
  <div class='sk-wave-rect'></div>
</div>
`;
        case "pulse":
            return String.raw`
<div class='sk-pulse sk-center' ${style}></div>
`;
        case "flow":
            return String.raw`
<div class='sk-flow sk-center' ${style}>
  <div class='sk-flow-dot'></div>
  <div class='sk-flow-dot'></div>
  <div class='sk-flow-dot'></div>
</div>
`;
        case "swing":
            return String.raw`
<div class='sk-swing sk-center' ${style}>
  <div class='sk-swing-dot'></div>
  <div class='sk-swing-dot'></div>
</div>
`;
        case "circle":
            return String.raw`
<div class='sk-circle sk-center' ${style}>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
  <div class='sk-circle-dot'></div>
</div>
`;
        case "circle-fade":
            return String.raw`
<div class='sk-circle-fade sk-center' ${style}>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
  <div class='sk-circle-fade-dot'></div>
</div>
`;
        case "grid":
            return String.raw`
<div class='sk-grid sk-center' ${style}>
  <div class='sk-grid-cube'></div>
  <div class='sk-grid-cube'></div>
  <div class='sk-grid-cube'></div>
  <div class='sk-grid-cube'></div>
  <div class='sk-grid-cube'></div>
  <div class='sk-grid-cube'></div>
  <div class='sk-grid-cube'></div>
  <div class='sk-grid-cube'></div>
  <div class='sk-grid-cube'></div>
</div>
`;
        case "fold":
            return String.raw`
<div class='sk-fold sk-center' ${style}>
  <div class='sk-fold-cube'></div>
  <div class='sk-fold-cube'></div>
  <div class='sk-fold-cube'></div>
  <div class='sk-fold-cube'></div>
</div>
`;
        case "wander":
            return String.raw`
<div class='sk-wander sk-center' ${style}>
  <div class='sk-wander-cube'></div>
  <div class='sk-wander-cube'></div>
  <div class='sk-wander-cube'></div>
</div>
`;
        }
        console.log("unknown spinner kind: ", kind);
        return String.raw`
<div class='sk-plane sk-center' ${style}></div>
`;
    }

    function HTML(config) {
        const id = "spinner-"+config.id;
        const kind = config.kind;
        const overlay = config.overlay;
        const color = config.color;
        const size = config.spinSize;
        const snippet = snippetFor(kind, size).replace(/\r?\n/g, "");
        const path = require.resolve("spinkit/spinkit.min.css");
        const data = fs.readFileSync(path);
        let html = "";
        html +="<style>";
        html += data;
        html +="</style>";
        html += String.raw`
<style>
.ui-spinner-overlay-${id} {
    position: absolute;
    background: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    z-index: 999995;
}

.ui-spinner-container-${id} {
    position: absolute;
    top: calc(50% - ${size/2}px);
    left: calc(50% - ${size/2}px);
    z-index: 999999;
 
    --sk-color: ${color};
    --sk-size: ${size}px;
}

</style>
<div id="spinner-${id}"></div>
<script>
((scope) => {
function init(scope) {
    const gid = "global-spinner-${id}";
    const gcontainer = $("#" +gid);
    const eid = ${overlay} ? gid : "spinner-${id}";
    let container = ${overlay} ? gcontainer : $("#"+eid);

    if (${overlay}) {
        if (gcontainer.length === 0) {
            container = $("<div id='"+gid+"' class='ui-spinner-overlay-${id}'/>").appendTo(document.body);
        }
    }
    gcontainer.empty();
    container.empty();

    $("<div class='ui-spinner-container-${id}'>${snippet}</div>").appendTo(container);

    $("#"+eid).hide();

    scope.$watch("msg", (msg) => {
        if (msg) {
            const command = msg.payload;
            if (command) {
                $("#"+eid).show();
            }
            else {
                $("#"+eid).hide();
            }
        }
    });
}

init(scope);
})(scope)
</script>
`;
        return html;
    }

    function checkConfig(node, conf) {
        if (!conf || !conf.hasOwnProperty("group")) {
            node.error(RED._("ui_spinner.error.no-group"));
            return false;
        }
        return true;
    }

    var ui = undefined;

    function SpinnerNode(config) {
        try {
            var node = this;
            if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }
            RED.nodes.createNode(this, config);

            if (checkConfig(node, config)) {
                var html = HTML(config);
                const width = (config.overlay ? -1 : config.width);
                const height = (config.overlay ? -1 : config.height);
                var done = ui.addWidget({
                    node: node,
                    order: config.order,
                    group: config.group,
                    width: width,
                    height: height,
                    format: html,
                    templateScope: "local",
                    emitOnlyNewValues: false,
                    forwardInputMessages: false,
                    storeFrontEndInputAsState: false,

                    convertBack: function (value) {
                        return value;
                    },

                    beforeEmit: function(msg, value) {
                        return { msg: msg };
                    },

                    beforeSend: function (msg, orig) {
                        if (orig) {
                            return orig.msg;
                        }
                    },

                    initController: function($scope, events) {
                    }
                });
            }
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
        }

        node.on("close", function() {
            if (done) {
                done();
            }
        });
    }

    setImmediate(function() {
        RED.nodes.registerType("ui_spinner", SpinnerNode);
    })
}
