export default class CodeblockComponent extends window.HTMLElement {
    constructor () {
        super();
        let codeId = "text_" + this.id;
        let codetmpl = document.createElement('div');
        codetmpl.className += 'code';
        codetmpl.innerHTML = '<a class="button" onclick="document.getElementById(\'' + codeId + '\').show(this)">&lt;/&gt;</a><uniform-modal id="' + codeId + '" class="code-modal"><pre class="prettyprint linenums"></pre></uniform-modal>';                    
        codetmpl.querySelector('.prettyprint').textContent = this.prettyPre(this.innerHTML);
        this.appendChild(codetmpl);                    
        PR.prettyPrint();
    }

    prettyPre(text) {
        //take out the extra spaces and lines 
        text = text.replace(/^[\s]*\n/, "");
        let superfluousSpaceCount = text.search(/\S/);
        let parts = text.split("\n");
        let reformattedText = "";
        let length = parts.length;
    
        for ( let i = 0; i < length; i++ ) {
            reformattedText += parts[i].substring( superfluousSpaceCount ) + ( i == length - 1 ? "" : "\n" );
        }
    
        return reformattedText;                
    }
}
