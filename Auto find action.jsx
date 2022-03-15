///////////////////////////////////////////////////////////////////////////////
// Auto find action by jazzy
// jazz-y@ya.ru
///////////////////////////////////////////////////////////////////////////////
#target photoshop
/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>Auto find action</name>
<category>actions</category>
<enableinfo>true</enableinfo>
<eventid>368afbab-39f4-415e-af9a-556d1400f4ab</eventid>
<terminology><![CDATA[<< /Version 1
                       /Events <<
                       /368afbab-39f4-415e-af9a-556d1400f4ab [(Auto find action) <<
                       /activeDoc [(Active document) /boolean]
                       /docTitle [(Document title) /boolean]
                       /docPath [(Document folder) /boolean]
                       /activeLr [(Any layer) /boolean]
                       /filter [(Layer label) /string]
                       /beginFromEnd [(Begin from end) /boolean]
                       /reverse [(Inverse direction) /boolean]
                       /restrict [(Active ActionSet) /boolean]
                       /setName [(Search in) /string]
                       >>]
                        >>
                     >> ]]></terminology>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/
$.localize = true
var cfg = new Config,
    AM = new ActionManager,
    str = new Locale,
    v = "2.35",
    GUID = "368afbab-39f4-415e-af9a-556d1400f4ab",
    isCancelled = false;
main()
isCancelled ? 'cancel' : undefined
function main() {
    if (!app.playbackParameters.count) {
        AM.getScriptSettings(cfg)
        var w = buildWindow(); var result = w.show()
        if (result == 2) { isCancelled = true; return } else  
        {
                AM.putScriptSettings(cfg, true)
                AM.putScriptSettings(cfg)
        }
    }
    else {
        AM.getScriptSettings(cfg, true)
        if (app.playbackDisplayDialogs == DialogModes.ALL) {
            var w = buildWindow(true); var result = w.show()
            if (result == 2) { isCancelled = true; return } else 
            {
                AM.putScriptSettings(cfg, true)
            }
        }
        if (app.playbackDisplayDialogs != DialogModes.ALL) {
            var a = findAction();
            if (a) { AM.runAction(a.SetName, a.AtnName) }
        } 
    }
}
function buildWindow(fromAction) {
    var w = new Window("dialog");
    w.text = str.Message + " " + v;
    w.orientation = "column";
    w.alignChildren = ["fill", "top"];
    w.spacing = 10;
    w.margins = 16;
    var pnDoc = w.add("panel", undefined, undefined, { name: "pnDoc" });
    pnDoc.text = str.Source;
    pnDoc.orientation = "column";
    pnDoc.alignChildren = ["fill", "top"];
    pnDoc.spacing = 10;
    pnDoc.margins = 10;
    pnDoc.add("group")
    var rbActiveDoc = pnDoc.add("radiobutton", undefined, undefined, { name: "rbActiveDoc" });
    rbActiveDoc.text = str.ActiveDoc;
    var rbAnyDoc = pnDoc.add("radiobutton", undefined, undefined, { name: "rbAnyDoc" });
    rbAnyDoc.text = str.AllDoc;
    var pnLr = w.add("panel", undefined, undefined, { name: "pnLr" });
    pnLr.text = str.Normal;
    pnLr.orientation = "column";
    pnLr.alignChildren = ["fill", "top"];
    pnLr.spacing = 10;
    pnLr.margins = 10;
    pnLr.add("group")
    var rbDocTitle = pnLr.add("radiobutton", undefined, undefined, { name: "rbDocTitle" });
    rbDocTitle.text = str.DocNm;
    var rbDocPath = pnLr.add("radiobutton", undefined, undefined, { name: "rbDocPath" });
    rbDocPath.text = str.Path;
    var rbActiveLr = pnLr.add("radiobutton", undefined, undefined, { name: "rbActiveLr" });
    rbActiveLr.text = str.LrNm;
    var rbAnyLr = pnLr.add("radiobutton", undefined, undefined, { name: "rbAnyLr" });
    rbAnyLr.text = str.AnyLr;
    var dlFilter = pnLr.add("dropdownlist", undefined, undefined, { name: "dlFilter", items: str.dlFilter_array });
    dlFilter.selection = 0;
    dlFilter.helpTip = str.Filter
    var pnOpt = w.add("panel", undefined, undefined, { name: "pnOpt" });
    pnOpt.text = str.StartSearch;
    pnOpt.orientation = "column";
    pnOpt.alignChildren = ["left", "top"];
    pnOpt.spacing = 10;
    pnOpt.margins = 10;
    pnOpt.add("group")
    var rbFirstIndexOf = pnOpt.add("radiobutton", undefined, undefined, { name: "rbFirstIndexOf" });
    rbFirstIndexOf.text = str.Begin;
    var rbLastIndexOf = pnOpt.add("radiobutton", undefined, undefined, { name: "rbLastIndexOf" });
    rbLastIndexOf.text = str.End;
    var chReverse = w.add("checkbox", undefined, undefined, { name: "chReverse" });
    chReverse.text = str.Reverse;
    var chRestrict = w.add("checkbox", undefined, undefined, { name: "chRestrict" });
    chRestrict.text = str.Restrict;
    var droplistSet = w.add("dropdownlist")
    var grBn = w.add("group", undefined, { name: "grBn" });
    grBn.orientation = "row";
    grBn.alignChildren = ["center", "center"];
    grBn.spacing = 10;
    grBn.margins = 0;
    var bnOk = grBn.add("button", undefined, undefined, { name: "Ok" });
    bnOk.text = fromAction ? str.Ok : str.TestAndSave;
    var bnCancel = grBn.add("button", undefined, undefined, { name: "Cancel" });
    bnCancel.text = str.Cancel;
    rbActiveDoc.onClick = function () { cfg.activeDoc = this.value }
    rbAnyDoc.onClick = function () { cfg.activeDoc = !this.value }
    rbDocTitle.onClick = function () {
        cfg.docTitle = this.value;
        cfg.docPath = cfg.activeLr = cfg.anyLr = !this.value
        dlFilter.enabled = false
    }
    rbDocPath.onClick = function () {
        cfg.docPath = this.value;
        cfg.docTitle = cfg.activeLr = cfg.anyLr = !this.value
        dlFilter.enabled = false
    }
    rbActiveLr.onClick = function () {
        cfg.docTitle = cfg.docPath = cfg.anyLr = !this.value;
        cfg.activeLr = this.value;
        dlFilter.enabled = false
    }
    rbAnyLr.onClick = function () {
        cfg.docTitle = cfg.docPath = cfg.activeLr = !this.value;
        cfg.anyLr = this.value;
        dlFilter.enabled = true
    }
    rbFirstIndexOf.onClick = function () { cfg.beginFromEnd = !this.value }
    rbLastIndexOf.onClick = function () { cfg.beginFromEnd = this.value }
    chReverse.onClick = function () {
        cfg.reverse = this.value
        pnLr.text = this.value ? str.Normal : str.Rev
        rbDocTitle.text = this.value ? str.DocNm : str.DocNmAlt
        rbActiveLr.text = this.value ? str.LrNm : str.LrNmAlt
        rbAnyLr.text = this.value ? str.AnyLr : str.AnyLrAlt
        rbDocPath.text = this.value ? str.Path : str.PathaAlt
    }
    chRestrict.onClick = function () {
        cfg.restrict = droplistSet.enabled = this.value
        if (this.value == false) { cfg.setName = "" } else { cfg.setName = droplistSet.selection.text }
    }
    dlFilter.onChange = function () { cfg.filter = str.labelsArr[this.selection.index] }
    droplistSet.onChange = function () { if (chRestrict.value == true) cfg.setName = this.selection.text }
    bnOk.onClick = function () {
        if (!fromAction) {
            $.hiresTimer;
            var a = findAction(),
                t = '\n\n' + str.timer + ($.hiresTimer / 1000000) + 's'
            if (a) {
                if (confirm(localize(str.TestOk + t, a.SetName, a.AtnName), false, str.Ok)) w.close(1)
            } else {
                alert(str.TestNotOk + t, str.Err, true)
            }
        } else { w.close(1) }
    }
    bnCancel.onClick = function () { w.close(2) }
    w.onShow = function () {
        cfg.activeDoc ? rbActiveDoc.value = true : rbAnyDoc.value = true
        rbDocTitle.value = cfg.docTitle
        rbDocPath.value = cfg.docPath
        rbActiveLr.value = cfg.activeLr
        rbAnyLr.value = cfg.anyLr
        dlFilter.enabled = cfg.anyLr
        cfg.beginFromEnd ? rbLastIndexOf.value = true : rbFirstIndexOf.value = true
        chReverse.value = cfg.reverse
        chRestrict.value = cfg.restrict
        droplistSet.enabled = cfg.restrict
        pnLr.text = chReverse.value ? str.Normal : str.Rev
        rbDocTitle.text = chReverse.value ? str.DocNm : str.DocNmAlt
        rbActiveLr.text = chReverse.value ? str.LrNm : str.LrNmAlt
        rbAnyLr.text = chReverse.value ? str.AnyLr : str.AnyLrAlt
        rbDocPath.text = chReverse.value ? str.Path : str.PathaAlt
        for (var i = 0; i < str.icoArr.length; i++) { dlFilter.items[i].image = str.icoArr[i] }
        for (var i = 0; i < str.icoArr.length; i++) { if (cfg.filter == str.labelsArr[i]) { dlFilter.selection = i; break } }
        var isFind = -1
        var actions = AM.getActionsList()
        if (actions.length == 0) chRestrict.enabled = droplistSet.enabled = false
        for (var i = 0; i < actions.length; i++) {
            droplistSet.add("item", actions[i][0])
            isFind = actions[i][0] == cfg.setName ? i : isFind
        }
        if (isFind >= 0) {
            droplistSet.selection = isFind
        } else {
            if (cfg.setName != "") {
                droplistSet.add("item", cfg.setName);
                droplistSet.selection = droplistSet.items.length - 1
            } else { droplistSet.selection = 0 }
        }
    }
    return w;
}
function findAction() {
    var output = [],
        actions = AM.getActionsList(cfg.setName),
        names = [];
    names = cfg.docTitle ? AM.getDocumentsList(cfg.activeDoc) : (cfg.docPath ? AM.getDocPathList(cfg.activeDoc) : AM.getLayersList(cfg.activeLr, cfg.activeDoc, cfg.filter))
    for (var i = 0; i < names.length; i++) {
        var a = names[i].toUpperCase()
        for (var x = 0; x < actions.length; x++) {
            for (var y = 0; y < actions[x][1].length; y++) {
                var b = actions[x][1][y].toUpperCase()
                var shift = Math.abs(a.length - b.length)
                if (!cfg.reverse) {
                    if (a.indexOf(b, 0) >= 0) {
                        var idx = !cfg.beginFromEnd ? a.indexOf(b) + shift : a.length - (a.lastIndexOf(b) + b.length) + shift
                        output.push({ SetName: actions[x][0], AtnName: actions[x][1][y], index: idx })
                    }
                } else {
                    if (b.indexOf(a, 0) >= 0) {
                        var idx = !cfg.beginFromEnd ? b.indexOf(a) + shift : b.length - (b.lastIndexOf(a) + a.length) + shift
                        output.push({ SetName: actions[x][0], AtnName: actions[x][1][y], index: idx })
                    }
                }
            }
        }
    }
    if (output.length > 0) { output.sort(sortLayers); return output[0] } else return null
    function sortLayers(a, b) { return a.index >= b.index ? 1 : -1 }
}
function Config() {
    this.activeDoc = false
    this.docTitle = true
    this.docPath = false
    this.activeLr = false
    this.anyLr = false
    this.filter = "none"
    this.beginFromEnd = false
    this.restrict = false
    this.reverse = false
    this.setName = ""
}
function ActionManager() {
    var s2t = stringIDToTypeID,
        t2s = typeIDToStringID,
        gApplication = s2t("application"),
        gClassAction = s2t("action"),
        gClassActionSet = s2t("actionSet"),
        gColor = s2t("color"),
        gItemIndex = s2t("itemIndex"),
        gKeyNumberOfChildren = s2t("numberOfChildren"),
        gLayer = s2t("layer"),
        gProperty = s2t("property"),
        gLayerSection = s2t("layerSection"),
        gName = s2t("name"),
        gNumberOfLayers = s2t("numberOfLayers"),
        gOrdinal = s2t("ordinal"),
        gTitle = s2t("title"),
        gDocument = s2t("document"),
        gHasBackgroundLayer = s2t("hasBackgroundLayer"),
        gTargetEnum = s2t("targetEnum"),
        gTargetLayers = s2t("targetLayers"),
        gTarget = s2t("target"),
        gNumberOfDocuments = s2t("numberOfDocuments"),
        gPlay = s2t("play"),
        gVisible = s2t("visible"),
        gFileReference = s2t('fileReference');
    this.getDocumentsList = function (activeDocument) {
        activeDocument = activeDocument ? true : false
        var output = [];
        (r = new ActionReference()).putProperty(gProperty, gTitle);
        r.putEnumerated(gDocument, gOrdinal, gTargetEnum)
        try { var title = removeExtension(executeActionGet(r).getString(gTitle)) } catch (e) { return output }
        output.push(title);
        if (!activeDocument) {
            (r = new ActionReference()).putProperty(gProperty, gNumberOfDocuments);
            r.putEnumerated(gApplication, gOrdinal, gTargetEnum);
            var len = executeActionGet(r).getInteger(gNumberOfDocuments);
            for (var i = 1; i <= len; i++) {
                (r = new ActionReference()).putProperty(gProperty, gTitle);
                r.putIndex(gDocument, i)
                var title = removeExtension(executeActionGet(r).getString(gTitle))
                if (title == output[0]) continue;
                output.push(title)
            }
        }
        function removeExtension(s) { return s.length - s.lastIndexOf(".") <= 5 && s.lastIndexOf(".") >= 0 ? s.slice(0, s.lastIndexOf(".")) : s }
        return output
    }
    this.getLayersList = function (activeLayer, activeDocument, color) {
        activeLayer = activeLayer ? true : false
        activeDocument = activeDocument ? true : false
        var output = [],
            docCounter,
            docIndex;
        if (!activeDocument) {
            (r = new ActionReference()).putProperty(gProperty, gNumberOfDocuments);
            r.putEnumerated(gApplication, gOrdinal, gTargetEnum)
            docCounter = executeActionGet(r).getInteger(gNumberOfDocuments)
            docIndex = 1;
        } else {
            (r = new ActionReference()).putProperty(gProperty, gItemIndex)
            r.putEnumerated(gDocument, gOrdinal, gTargetEnum)
            docIndex = executeActionGet(r).getInteger(gItemIndex)
            docCounter = 1
        }
        for (var n = 1; n <= docCounter; n++) {
            docIndex = !activeDocument ? n : docIndex
            var current = [];
            try {
                var r = new ActionReference()
                r.putProperty(gProperty, gTargetLayers)
                r.putIndex(gDocument, docIndex)
                executeActionGet(r).getList(gTargetLayers)
                var r = new ActionReference()
                r.putProperty(gProperty, gColor)
                r.putEnumerated(gLayer, gOrdinal, gTargetEnum)
                r.putIndex(gDocument, docIndex)
                try { label = t2s(executeActionGet(r).getEnumerationValue(gColor)) } catch (e) { var label = "none" }
                if (label == color || cfg.activeLr == true) {
                    var r = new ActionReference()
                    r.putProperty(gProperty, gName)
                    r.putEnumerated(gLayer, gOrdinal, gTargetEnum)
                    r.putIndex(gDocument, docIndex)
                    var title = executeActionGet(r).getString(gName)
                    current.push(title)
                }
            } catch (e) { }
            if (!activeLayer) {
                (r = new ActionReference()).putProperty(gProperty, gNumberOfLayers);
                r.putIndex(gDocument, docIndex);
                var len = executeActionGet(r).getInteger(gNumberOfLayers);
                (r = new ActionReference()).putProperty(gProperty, gHasBackgroundLayer);
                r.putIndex(gDocument, docIndex);
                var shift = executeActionGet(r).getBoolean(gHasBackgroundLayer) ? 0 : 1;
                for (var i = shift; i <= len; i++) {
                    (r = new ActionReference()).putProperty(gProperty, gName);
                    r.putIndex(gLayer, i)
                    r.putIndex(gDocument, docIndex)
                    var title = executeActionGet(r).getString(gName);
                    if (current.length > 0) { if (current[0] == title) continue; }
                    (r = new ActionReference()).putProperty(gProperty, gColor);
                    r.putIndex(gLayer, i)
                    r.putIndex(gDocument, docIndex)
                    try { var label = t2s(executeActionGet(r).getEnumerationValue(gColor)) } catch (e) { var label = "none" }
                    if (label != color && cfg.activeLr == false) continue;
                    (r = new ActionReference()).putProperty(gProperty, gLayerSection);
                    r.putIndex(gLayer, i)
                    r.putIndex(gDocument, docIndex)
                    if (t2s(executeActionGet(r).getEnumerationValue(gLayerSection)) == 'layerSectionEnd') continue;
                    (r = new ActionReference()).putProperty(gProperty, gVisible);
                    r.putIndex(gLayer, i)
                    r.putIndex(gDocument, docIndex)
                    if (executeActionGet(r).getBoolean(gVisible) == false) continue;
                    current.push(title)
                }
            }
            output = output.concat(current)
        }
        return output
    }
    this.getActionsList = function (activeSet) {
        var output = [],
            setCounter = activeSet ? getSetIndex(activeSet) : 1;
        while (true) {
            (r = new ActionReference()).putIndex(gClassActionSet, setCounter);
            try { d = executeActionGet(r) } catch (e) { break; }
            output.push([d.getString(gName), []])
            var numberChildren = d.hasKey(gKeyNumberOfChildren) ? d.getInteger(gKeyNumberOfChildren) : 0,
                idx = activeSet ? 0 : setCounter - 1;
            if (numberChildren > 0) output[idx][1] = getActionList(setCounter, numberChildren)
            if (activeSet) break;
            setCounter++
        }
        function getActionList(setIndex, numChildren) {
            var current = []
            for (var i = 1; i <= numChildren; i++) {
                (r = new ActionReference()).putIndex(gClassAction, i);
                r.putIndex(gClassActionSet, setIndex)
                current.push(executeActionGet(r).getString(gName))
            }
            return current
        }
        function getSetIndex(cur) {
            try {
                (r = new ActionReference()).putName(gClassActionSet, cur)
                return executeActionGet(r).getInteger(gItemIndex)
            }
            catch (e) { return 0 }
        }
        return output
    }
    this.getDocPathList = function (activeDocument) {
        activeDocument = activeDocument ? true : false
        var output = [];
        (r = new ActionReference()).putProperty(gProperty, gFileReference);
        r.putEnumerated(gDocument, gOrdinal, gTargetEnum)
        var f = executeActionGet(r).hasKey(s2t('fileReference')) ? executeActionGet(r).getPath(s2t('fileReference')) : null
        if (f) {
            output.push((p = (decodeURI(f.parent)).split('/'))[p.length - 1]);
        }
        if (!activeDocument) {
            (r = new ActionReference()).putProperty(gProperty, gNumberOfDocuments);
            r.putEnumerated(gApplication, gOrdinal, gTargetEnum);
            var len = executeActionGet(r).getInteger(gNumberOfDocuments);
            for (var i = 1; i <= len; i++) {
                (r = new ActionReference()).putProperty(gProperty, gFileReference);
                r.putIndex(gDocument, i)
                var f = executeActionGet(r).hasKey(s2t('fileReference')) ? executeActionGet(r).getPath(s2t('fileReference')) : null
                if (f) {
                    if (output.length) { if (f == output[0]) continue; }
                    output.push((p = (decodeURI(f.parent)).split('/'))[p.length - 1]);
                }
            }
        }
        return output
    }
    this.runAction = function (setName, atnName) {
        (r = new ActionReference()).putName(gClassAction, atnName);
        r.putName(gClassActionSet, setName);
        (d = new ActionDescriptor()).putReference(gTarget, r);
        try {
            executeAction(gPlay, d)
            return true
        }
        catch (e) {
            return false
        }
    }
    this.getScriptSettings = function (settingsObj, fromAction) {
        if (fromAction) {
            var d = app.playbackParameters
        } else {
            try { var d = app.getCustomOptions(GUID) } catch (e) { }
        }
        if (d != undefined) descriptorToObject(settingsObj, d)
        function descriptorToObject(o, d) {
            var l = d.count;
            for (var i = 0; i < l; i++) {
                var k = d.getKey(i);
                var t = d.getType(k);
                strk = app.typeIDToStringID(k);
                switch (t) {
                    case DescValueType.BOOLEANTYPE:
                        o[strk] = d.getBoolean(k);
                        break;
                    case DescValueType.STRINGTYPE:
                        o[strk] = d.getString(k);
                        break;
                    case DescValueType.INTEGERTYPE:
                        o[strk] = d.getDouble(k);
                        break;
                }
            }
        }
    }
    this.putScriptSettings = function (settingsObj, toAction) {
        var d = objectToDescriptor(settingsObj)
        if (toAction) { app.playbackParameters = d }
        else { app.putCustomOptions(GUID, d) }
        function objectToDescriptor(o) {
            var d = new ActionDescriptor;
            var l = o.reflect.properties.length;
            for (var i = 0; i < l; i++) {
                var k = o.reflect.properties[i].toString();
                if (k == "__proto__" || k == "__count__" || k == "__class__" || k == "reflect") continue;
                var v = o[k];
                k = app.stringIDToTypeID(k);
                switch (typeof (v)) {
                    case "boolean": d.putBoolean(k, v); break;
                    case "string": d.putString(k, v); break;
                    case "number": d.putInteger(k, v); break;
                }
            }
            return d;
        }
    }
}
function Locale() {
    var icoRed = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00;IDAT\x18\u0095c\u00FCci\u00F3\u009F\u0081\b\u00C0\x02R\u00C2((\u0084W\u00E5\u00FF\u00F7\u00EF \n\u00C1\u0080\u0087\x17\u00BB\u00AA/\u009F\u00C1\x14\x131\u00D6\x0E\x15\u0085\b_C}\u0087W!(\u009C\u00F0\x02\x06\x06\x06\x00\x18\u00EF\fO\u0083\b\u00CC\u00FD\x00\x00\x00\x00IEND\u00AEB`\u0082",
        icoOrange = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00=IDAT\x18\u0095c\u00FC\u00D2\u00A1\u00FA\u009F\u0081\b\u00C0\x02R\u00C2$\u00C8\u008DW\u00E5\u00BF\u00F7_!\nA\u0080\u0091\u0097\x03\u00AB\u00A2\u00FF\u009F\x7F\u0080i&b\u00AC\x1D*\n\u00E1\u00BE\u0086\u00F9\x0E\u00AFBP8\u00E1\x05\f\f\f\x00\u00D6!\x0E\u0088\x06d\u00F3\x07\x00\x00\x00\x00IEND\u00AEB`\u0082",
        icoYellow = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00;IDAT\x18\u0095c\u00FCp@\u00ED?\x03\x11\u0080\x05\u00A4\u0084\u0089\u0093\x1B\u00AF\u00CA\x7F\u00DF\u00BFB\x14\u0082\x15\u00B3s`W\u00F4\u00F3\x07D\u009E\x18k\u0087\u008AB\u00B8\u00AFa\u00BE\u00C3\u00AB\x10\x14Nx\x01\x03\x03\x03\x00+\u00AA\x0E\u00CA*\u0090\u00C3\u00A2\x00\x00\x00\x00IEND\u00AEB`\u0082",
        icoGreen = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00=IDAT\x18\u0095c\u00F4\u00DEo\u00F8\u009F\u0081\b\u00C0\x02R\"\u00C6\u00C9\u008FW\u00E5\u00AB\u00EF\x1F!\nA@\u0090\u009D\x1B\u00AB\u00A2\u00F7?\u00BF\u0082i&b\u00AC\x1D*\n\u00E1\u00BE\u0086\u00F9\x0E\u00AFBP8\u00E1\x05\f\f\f\x000\x1F\x0E\x05z4V\u0094\x00\x00\x00\x00IEND\u00AEB`\u0082",
        icoBlue = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00=IDAT\x18\u0095c4\u0099\u00F7\u00E1?\x03\x11\u0080\x05\u00A4D\u0080\u009F\t\u00AF\u00CA\x0F\x1F\u00FFA\x14\u0082\x007\x17v\u00C5_\u00BF\u00FD\x03\u00D3\u00F8\u008DB\x02CA!\u00DC\u00D70\u00DF\u00E1U\b\n'\u00BC\u0080\u0081\u0081\x01\x00\b\u00DD\x0E\u00A5\x7F\u00E7e\u008B\x00\x00\x00\x00IEND\u00AEB`\u0082",
        icoViolet = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00=IDAT\x18\u0095c\u00DC\x1Fv\u00FD?\x03\x11\u0080\x05\u00A4\u0084S\u0092\r\u00AF\u00CA\u00EF\u00CF\x7FA\x14\u0082\x00\u00BB\x10\x0BVE?\u00DF\u00FD\x01\u00D3L\u00C4X;T\x14\u00C2\u00BD\n\u00F3\x1D^\u0085\u00A0p\u00C2\x0B\x18\x18\x18\x00KM\x0E\u00C2\u00AA\x19\u00A8d\x00\x00\x00\x00IEND\u00AEB`\u0082",
        icoGray = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00=IDAT\x18\u0095clk\u00EB\u00FC\u00CF@\x04`\x01)\x11\x12\x12\u00C4\u00AB\u00F2\u00DD\u00BB\u00F7\x10\u0085 \u00C0\u00CB\u00CB\u008BU\u00D1\u00E7\u00CF\u009F\u00C14\x131\u00D6\x0E\x15\u0085p_\u00C3|\u0087W!(\u009C\u00F0\x02\x06\x06\x06\x00\u00BE\u00A9\x0ET.#\u00D2&\x00\x00\x00\x00IEND\u00AEB`\u0082",
        icoNone = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\n\x00\x00\x00\n\b\x06\x00\x00\x00\u008D2\u00CF\u00BD\x00\x00\x00\u00CEIDAT\x18\u0095\u008D\u0090A\x0BE@\x14\u0085\u00CFLS\u00A2,D6~\u0083R\u00CAF\u00E4WS\u0094\u0094\u00C8N\u00F9\x19R\u00D6\x12^s\u00DF3\u00CF\u00EA\u00F5NM3\u00E7\u00CE\u0099\u00B9_\u0097\x15Eq\u00E1\x0F\t\x19\t\u0082\x00\u00D7uA\bA\u00FBS\u00D2\u008F\u00E3\b\u008E\u008F\x19\u0086\x01\u0086a\u00C0u]Z\u009A\u00A6\u00A1\u00EB:\u00F5\u0090\u0082\u009CsDQ\u0084\u00B2,\u00B1m\x1B\u00D6uE]\u00D7H\u0092\x04\u008C1\nRk)\u00CF\u00F3\u00E0\u00FB>\u00F2<'\x1F\u00C71\x1C\u00C7\u00C1<\u00CF\u00DF\x1Fo\u0099\u00A6\u00A9\u00CE\x12\u00E3)\u00C5\u00B8,\x0B\u00FA\u00BEG\u009A\u00A6\b\u00C3\x10UU\x11\u00C2-j-9\u00DA\u00B6E\u0096e\u00B0,\x0B\u00B6mC\u00D7u4MC\b\u00F2\u009E\u0082\u00C7qPa\u00DFw\u00C5ts\u009E\u00E7\u00F9\x1E\u009D,L\u00D3\u00F4{\u00E2\x00^\u00D6\u0089Tf\u00E31\u0087\u00CC\x00\x00\x00\x00IEND\u00AEB`\u0082",
        None = { ru: "Без отметки", en: "No color" },
        Red = { ru: "Красный", en: "Red" },
        Orange = { ru: "Оранжевый", en: "Orange" },
        Yellow = { ru: "Желтый", en: "Yellow" },
        Green = { ru: "Зеленый", en: "Green" },
        Blue = { ru: "Синий", en: "Blue" },
        Violet = { ru: "Фиолетовый", en: "Violet" },
        Gray = { ru: "Серый", en: "Gray" };
    this.Message = "Auto find action"
    this.Rev = { ru: "Искать название операции в:", en: "Search action name in:" }
    this.Normal = { ru: "Искать в названии операции:", en: "Search in action name:" }
    this.Source = { ru: "Источник:", en: "Source:" }
    this.ActiveDoc = { ru: "активный документ", en: "active document" }
    this.AllDoc = { ru: "все открытые документы", en: "all openend documents" }
    this.Continue = { ru: "продолжить с команды \"стоп\" внутри операции", en: "continue from the \"stop\" command inside action" }
    this.DocNm = { ru: "имя документа", en: "document title" }
    this.LrNm = { ru: "имя активного слоя", en: "active layer name" }
    this.AnyLr = { ru: "имя любого видимого слоя", en: "name of any visible layer" }
    this.DocNmAlt = { ru: "имени документа", en: "document title" }
    this.LrNmAlt = { ru: "имени активного слоя", en: "active layer name" }
    this.AnyLrAlt = { ru: "имени любого видимого слоя", en: "name of any visible layer" }
    this.Filter = { ru: "искать слои с цветовыми отметками", en: "search layers with color labels" }
    this.StartSearch = { ru: "Начинать поиск:", en: "Start search:" }
    this.Begin = { ru: "с начала строки", en: "from the beginning of line" }
    this.End = { ru: "с конца строки", en: "from the end of line" }
    this.Reverse = { ru: "инвертировать направление поиска", en: "inverse search direction" }
    this.Restrict = { ru: "ограничить поиск группой операций:", en: "search only in action set:" }
    this.TestAndSave = { ru: "Проверить и сохранить настройки", en: "Test and save settings" }
    this.Ok = { ru: "Сохранить настройки", en: "Save settings" }
    this.Err = { ru: "Внимание", en: "Warning" }
    this.Cancel = { ru: "Отмена", en: "Cancel" }
    this.Path = { ru: "имя папки документа", en: "document folder name" }
    this.PathaAlt = { ru: "имени папки документа", en: "document folder name" }
    this.TestOk = { ru: "Найдена операция: %1 > %2\n\nСохранить настройки и закрыть?", en: "Action found: %1 > %2\n\nSave settings and close?" }
    this.TestNotOk = { ru: "Операция не найдена!?", en: "Action not found!" }
    this.labelsArr = ["none", "red", "orange", "yellowColor", "grain", "blue", "violet", "gray"]
    this.icoArr = [icoNone, icoRed, icoOrange, icoYellow, icoGreen, icoBlue, icoViolet, icoGray]
    this.dlFilter_array = [None, Red, Orange, Yellow, Green, Blue, Violet, Gray]
    this.timer = { ru: 'Время срабатывания: ', en: 'Response time: ' }
}