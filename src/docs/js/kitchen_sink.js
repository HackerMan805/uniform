htmlExample();
PR.prettyPrint();

function htmlExample() {
    //code-example using code-prettify
    let codeExamples = document.querySelectorAll('.code-example'), i;
    let length = codeExamples.length;
    for (i = 0; i < length; i++) {
        let codeExample = codeExamples[i];
        let node = document.createElement('div');
        node.className += 'code';
        node.innerHTML = '<a class="button secondary" onclick="document.getElementById(\'code_' + i + '\').show(this)">&lt;/&gt;</a><uniform-modal id="code_' + i + '" class="code-modal"><pre class="prettyprint linenums"></pre></uniform-modal>';                    
        
        node.querySelector('.prettyprint').textContent = prettyPre(codeExample.innerHTML);
        codeExample.appendChild(node);                    
    }
}

function prettyPre(text) {
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
